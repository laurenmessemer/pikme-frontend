import axios from "axios";
import { useState } from "react";
import "../styles/admin/CreateTheme.css";
import { onImageError } from "../utils/RouterUtils";
import { useAuth } from "../context/UseAuth";
import ToastUtils from "../utils/ToastUtils";

const CreateTheme = () => {
  const [themeName, setThemeName] = useState("");
  const [description, setDescription] = useState("");
  const [specialRules, setSpecialRules] = useState("");
  const [coverImage, setCoverImage] = useState(null); // ✅ Store image for preview
  const [coverImageUrl, setCoverImageUrl] = useState(""); // ✅ Store S3 URL
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { token } = useAuth();

  // ✅ Handle Image Upload to S3
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("📤 Uploading image:", file.name);

    // ✅ Generate local preview while uploading
    setCoverImage(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      // Step 1: Get Pre-Signed URL from Backend
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/themes/get-upload-url`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
          params: { fileType: file.type },
        }
      );

      const { uploadURL, fileKey, bucketName, region } = response.data;

      // Step 2: Upload File to S3
      await axios.put(uploadURL, file, {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
          "ngrok-skip-browser-warning": "true",
          "Content-Type": file.type,
          "x-amz-acl": "public-read",
        },
      });

      // Step 3: Store Final Image URL
      const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
      console.log("✅ Image uploaded successfully:", imageUrl);

      setCoverImageUrl(imageUrl);
      setIsUploading(false);
    } catch (error) {
      console.error("❌ Upload failed:", error);
      setError("Failed to upload cover image.");
      setIsUploading(false);
    }
  };

  // ✅ Ensure Image URL is Ready Before Submitting
  const handleSubmit = async () => {
    if (isUploading) {
      ToastUtils.warning("Image is still uploading. Please wait...");
      // alert("Image is still uploading. Please wait...");
      return;
    }

    console.log("🚀 Attempting to submit theme with image URL:", coverImageUrl);

    if (!coverImageUrl) {
      ToastUtils.warning("Please upload a cover image before submitting.");
      // alert("Please upload a cover image before submitting.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/themes/create`,
        {
          themeName,
          description,
          specialRules,
          coverImageUrl, // ✅ Send S3 URL
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      console.log("✅ Theme created successfully:", response.data);
      setSuccess("Theme added successfully!");

      // Reset form
      setThemeName("");
      setDescription("");
      setSpecialRules("");
      setCoverImage(null);
      setCoverImageUrl(""); // Reset for the next theme
    } catch (err) {
      console.error("❌ Error creating theme:", err);
      setError(err.response?.data?.message || "Failed to create theme");
    }
  };

  return (
    <div className="create-theme-container">
      <h2>Manage Themes - Add New Theme</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="form-section">
        <div className="cover-image">
          <label>Cover Image</label>
          <div className="image-upload">
            {coverImage || coverImageUrl ? (
              <img
                src={coverImageUrl || coverImage}
                alt="Cover"
                className="uploaded-image"
                onError={onImageError}
              />
            ) : (
              <div className="image-placeholder">+</div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>

        <div className="theme-details">
          <label>Theme Name:</label>
          <input
            type="text"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
          />

          <label>Theme Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Special Rules:</label>
          <textarea
            value={specialRules}
            onChange={(e) => setSpecialRules(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons">
        <button className="cancel">Cancel</button>
        <button
          className="submit"
          onClick={handleSubmit}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Add Theme"}
        </button>
      </div>
    </div>
  );
};

export default CreateTheme;
