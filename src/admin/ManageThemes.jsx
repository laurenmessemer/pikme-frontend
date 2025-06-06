import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/admin/ManageThemes.css";
import { useAuth } from "../context/UseAuth";
import ToastUtils from "../utils/ToastUtils";
import TableLoader from "../components/common/TableLoader";
import IconButton from "../components/Buttons/IconButton";
import WinnerImagePopup from "../components/Popups/WinnerImagePopup";

const ManageThemes = () => {
  const { token } = useAuth();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTheme, setEditingTheme] = useState(null);
  const [originalThemeData, setOriginalThemeData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [themeData, setThemeData] = useState({
    name: "",
    description: "",
    coverImageUrl: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/themes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setThemes(response.data);
    } catch (error) {
      console.error("❌ Error fetching themes:", error);
      setError("Failed to load themes.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (theme) => {
    setEditingTheme(theme.id);
    setOriginalThemeData({ ...theme });
    setThemeData({
      name: theme.name,
      description: theme.description,
      coverImageUrl: theme.cover_image_url || "",
    });
  };

  const handleCancel = () => {
    if (originalThemeData) {
      setThemeData({
        name: originalThemeData.name,
        description: originalThemeData.description,
        coverImageUrl: originalThemeData.cover_image_url || "",
      });
    }
    setEditingTheme(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    setThemeData({ ...themeData, [e.target.name]: e.target.value });
  };

  const handleCoverImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("coverImage", file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/themes/direct-upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { imageUrl } = response.data;

      setThemeData((prev) => ({
        ...prev,
        coverImageUrl: imageUrl,
      }));

      console.log("✅ Direct upload successful:", imageUrl);
    } catch (error) {
      console.error("❌ Direct upload failed:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!editingTheme) {
      setError("No theme selected.");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/themes/${editingTheme}`,
        {
          name: themeData.name,
          description: themeData.description,
          coverImageUrl: themeData.coverImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      console.log("✅ Theme updated.");
      setEditingTheme(null);
      setOriginalThemeData(null);
      fetchThemes();
    } catch (error) {
      console.error("❌ Update failed:", error);
      setError("Update failed. Try again.");
    }
  };

  const handleDeleteTheme = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this theme? This cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/themes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      setThemes((prev) => prev.filter((theme) => theme.id !== id));
      console.log("✅ Theme deleted successfully");
    } catch (error) {
      console.error("❌ Failed to delete theme:", error);
      setError("Failed to delete theme. Please try again.");
    }
  };

  const testUpload = async (file) => {
    console.log("🧪 Starting test upload...");
    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("coverImage", file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/themes/direct-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const { imageUrl } = response.data;
      console.log("🧪 Uploaded image URL:", imageUrl);
      // alert(`✅ Uploaded to: ${imageUrl}`);
      ToastUtils.error(`Uploaded to: ${imageUrl}`);
    } catch (error) {
      console.error("❌ Test upload failed:", error);
      // alert("❌ Test upload failed");
      ToastUtils.error("Test upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="manage-themes-container common-admin-container">
      <div className="header new-header p0">
        <h2>Manage Themes</h2>
      </div>

      {/* <div className="test-upload">
        <label htmlFor="test-upload-input">🧪 Test Upload to S3:</label>
        <input
          id="test-upload-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) testUpload(file);
          }}
          disabled={isUploading}
        />
      </div> */}

      {loading ? (
        <TableLoader rows={7} columns={5} />
      ) : error ? (
        <div className="error-message no-space">
          <p>{error}</p>
        </div>
      ) : (
        <div className="common-table-container">
          <table className="themes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cover</th>
                <th>Theme</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {themes.map((theme) => (
                <tr key={theme.id}>
                  {editingTheme === theme.id ? (
                    <>
                      <td>{theme.id}</td>
                      <td>
                        {themeData.coverImageUrl && (
                          <img
                            src={themeData.coverImageUrl}
                            alt="Cover"
                            className="cover-thumbnail"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageUpload}
                          disabled={isUploading}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={themeData.name}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <textarea
                          name="description"
                          value={themeData.description}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <div className="action-buttons">
                          <IconButton
                            icon="SaveIcon"
                            variant="save"
                            onClick={handleSaveChanges}
                            disabled={isUploading}
                            title={isUploading ? "Saving..." : "Save"}
                            size="small"
                          />
                          <IconButton
                            icon="CancelIcon"
                            variant="edit"
                            onClick={handleCancel}
                            title="Cancel"
                            size="small"
                          />
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{theme.id}</td>
                      <td>
                        {theme.cover_image_url && (
                          <img
                            src={theme.cover_image_url}
                            alt="Cover"
                            width="50"
                            className="cursor-pointer"
                            onClick={() =>
                              setSelectedImage(theme.cover_image_url)
                            }
                          />
                        )}
                      </td>
                      <td>{theme.name}</td>
                      <td>{theme.description}</td>
                      <td>
                        <div className="action-buttons">
                          <IconButton
                            icon="EditIcon"
                            variant="edit"
                            onClick={() => handleEditClick(theme)}
                            title="Edit"
                            size="small"
                          />
                          <IconButton
                            icon="DeleteIcon"
                            variant="delete"
                            onClick={() => handleDeleteTheme(theme.id)}
                            title="Delete"
                            size="small"
                          />
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedImage && (
        <WinnerImagePopup
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
          isFullView={true}
        />
      )}
    </div>
  );
};

export default ManageThemes;
