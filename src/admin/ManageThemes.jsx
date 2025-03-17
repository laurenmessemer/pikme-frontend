import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/admin/ManageThemes.css";

const ManageThemes = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTheme, setEditingTheme] = useState(null);
  const [themeData, setThemeData] = useState({
    name: "",
    description: "",
    specialRules: "",
    coverImageUrl: "", // Store existing cover image URL
    entries: [],
  });
  const [newCoverImage, setNewCoverImage] = useState(null);
  const [newEntryImages, setNewEntryImages] = useState([]); // Store new entry images

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("${import.meta.env.VITE_API_URL}/api/themes");
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
    setThemeData({
      name: theme.name,
      description: theme.description,
      specialRules: theme.special_rules,
      coverImageUrl: theme.cover_image_url || "",
      entries: theme.ThemeEntries || [],
    });
    setNewCoverImage(null);
    setNewEntryImages([]);
  };

  const handleInputChange = (e) => {
    setThemeData({ ...themeData, [e.target.name]: e.target.value });
  };

  // ✅ Upload New Cover Image
  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("📤 Uploading new cover image:", file.name);

    try {
      const response = await axios.get("${import.meta.env.VITE_API_URL}/api/themes/get-upload-url", {
        params: { fileType: file.type },
      });

      const { uploadURL, fileKey, bucketName, region } = response.data;

      await axios.put(uploadURL, file, {
        headers: { "Content-Type": file.type },
      });

      const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
      console.log("✅ Cover Image uploaded successfully:", imageUrl);

      setNewCoverImage(imageUrl);
    } catch (error) {
      console.error("❌ Upload failed:", error);
      setError("Failed to upload cover image.");
    }
  };

  // ✅ Remove Cover Image
  const handleRemoveCoverImage = () => {
    setNewCoverImage(null);
    setThemeData({ ...themeData, coverImageUrl: "" });
  };

  // ✅ Upload Additional Entry Images
  const handleEntryImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewEntryImages((prevImages) => [...prevImages, ...files]);
    }
  };

  // ✅ Remove a selected new entry before saving
  const handleRemoveEntry = (index) => {
    setNewEntryImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // ✅ Save All Changes (Theme + Image Updates)
  const handleSaveChanges = async () => {
    if (!editingTheme) {
      console.error("❌ No theme is being edited.");
      setError("No theme selected for updating.");
      return;
    }

    const updatedThemeData = {
      name: themeData.name,
      description: themeData.description,
      specialRules: themeData.specialRules,
      coverImageUrl: newCoverImage || themeData.coverImageUrl || "",
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/themes/${editingTheme}`, updatedThemeData);

      console.log("✅ Theme updated successfully.");

      // ✅ Upload new entry images if any exist
      if (newEntryImages.length > 0) {
        const formData = new FormData();
        newEntryImages.forEach((image) => {
          formData.append("entries", image);
        });

        await axios.post(`${import.meta.env.VITE_API_URL}/api/themes/${editingTheme}/entries`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("✅ New entry images uploaded successfully.");
      }

      setEditingTheme(null);
      fetchThemes();
    } catch (error) {
      console.error("❌ Error updating theme:", error);
      setError("Failed to update theme.");
    }
  };

  return (
    <div className="manage-themes-container">
      <div className="header">
        <h2>Manage Themes</h2>
      </div>

      {loading ? (
        <p>Loading themes...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="themes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Theme</th>
              <th>Description</th>
              <th>Special Rules</th>
              <th>Cover Image</th>
              <th>Entries</th>
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
                      <input type="text" name="name" value={themeData.name} onChange={handleInputChange} />
                    </td>
                    <td>
                      <textarea name="description" value={themeData.description} onChange={handleInputChange} />
                    </td>
                    <td>
                      <textarea name="specialRules" value={themeData.specialRules} onChange={handleInputChange} />
                    </td>
                    <td>
                      {newCoverImage || themeData.coverImageUrl ? (
                        <div>
                          <img src={newCoverImage || themeData.coverImageUrl} alt="Cover" width="50" />
                          <button onClick={handleRemoveCoverImage}>❌ Remove</button>
                        </div>
                      ) : (
                        <p>No Image</p>
                      )}
                      <input type="file" accept="image/*" onChange={handleCoverImageUpload} />
                    </td>
                    <td>
                      {/* ✅ Existing Entries */}
                      {themeData.entries.length > 0 ? (
                        themeData.entries.map((entry) => (
                          <img key={entry.id} src={entry.image_url} alt="Entry" width="50" />
                        ))
                      ) : (
                        <p>No Entries</p>
                      )}

                      {/* ✅ New Entry Images Preview */}
                      <div className="entry-upload-section">
                        {newEntryImages.length > 0 && (
                          <div className="entry-preview-container">
                            {newEntryImages.map((image, index) => (
                              <div key={index} className="entry-container">
                                <img src={URL.createObjectURL(image)} alt="New Entry" width="50" />
                                <button onClick={() => handleRemoveEntry(index)}>❌ Remove</button>
                              </div>
                            ))}
                          </div>
                        )}
                        <input type="file" accept="image/*" multiple onChange={handleEntryImagesUpload} />
                      </div>
                    </td>
                    <td>
                      <button onClick={handleSaveChanges}>✅ Save</button>
                      <button onClick={() => setEditingTheme(null)}>❌ Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{theme.id}</td>
                    <td>{theme.name}</td>
                    <td>{theme.description}</td>
                    <td>{theme.special_rules}</td>
                    <td>
                      {theme.cover_image_url && <img src={theme.cover_image_url} alt="Cover" width="50" />}
                    </td>
                    <td>
                      <button onClick={() => handleEditClick(theme)}>✏️ Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageThemes;
