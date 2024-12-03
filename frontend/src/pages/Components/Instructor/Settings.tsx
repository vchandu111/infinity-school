import React from "react";

const Settings: React.FC<{
  settingsData: { courseImage: string | null };
  setSettingsData: (data: { courseImage: string | null }) => void;
}> = ({ settingsData, setSettingsData }) => {
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
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
      } else {
        console.error("Error uploading image:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default Settings;
