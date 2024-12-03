import React, { useState } from "react";

interface SettingsProps {
  settingsData: { courseImage: string | null };
  setSettingsData: (data: { courseImage: string | null }) => void;
}

const Settings: React.FC<SettingsProps> = ({ settingsData, setSettingsData }) => {
  const [uploadProgress, setUploadProgress] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadProgress(true);
      setUploadPercentage(0);

      const response = await fetch("http://localhost:3000/media/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSettingsData({ courseImage: data.data.url });
        console.log("Image uploaded successfully:", data.data.url);
      } else {
        console.error("Error uploading image:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadProgress(false);
      setUploadPercentage(100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      {/* Upload Course Image */}
      <div className="mb-6">
        <label htmlFor="courseImage" className="block text-gray-400 mb-2">
          Upload Course Image
        </label>
        <input
          type="file"
          id="courseImage"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-gray-400 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {uploadProgress && (
        <div className="mb-4">
          <p>Uploading... {uploadPercentage}%</p>
        </div>
      )}

      {settingsData.courseImage && (
        <div className="mb-6">
          <p className="text-gray-400 mb-2">Image Preview:</p>
          <img
            src={settingsData.courseImage}
            alt="Course Preview"
            className="w-64 h-auto border border-gray-700 rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default Settings;
