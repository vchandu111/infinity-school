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
    <div className=" bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
      {/* Upload Course Image */}
      <div className="mb-6">
        <label htmlFor="courseImage" className="block text-lg mb-6">
          Upload Course Image
        </label>
        <input
          type="file"
          id="courseImage"
          accept="image/*"
          onChange={handleImageUpload}
          className="bg-gray-900 text-white file:bg-gray-700 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-none file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
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
