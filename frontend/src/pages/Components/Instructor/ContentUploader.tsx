import React, { useRef, useEffect } from "react";

interface Lecture {
  id: number;
  title: string;
  videoUrl: string | null;
  public_id: string | null;
  isFreePreview: boolean;
}

const ContentUploader: React.FC<{
  contentData: Lecture[];
  setContentData: (data: Lecture[]) => void;
}> = ({ contentData, setContentData }) => {
  const bulkUploadInputRef = useRef<HTMLInputElement | null>(null);

  // Ensure one lecture input box is displayed by default
  useEffect(() => {
    if (contentData.length === 0) {
      setContentData([
        {
          id: 1,
          title: "",
          videoUrl: null,
          public_id: null,
          isFreePreview: false,
        },
      ]);
    }
  }, [contentData, setContentData]);

  const handleAddLecture = () => {
    setContentData([
      ...contentData,
      {
        id: contentData.length + 1,
        title: "",
        videoUrl: null,
        public_id: null,
        isFreePreview: false,
      },
    ]);
  };

  const handleInputChange = (
    id: number,
    field: keyof Lecture,
    value: string | boolean
  ) => {
    const updatedLectures = contentData.map((lecture) =>
      lecture.id === id ? { ...lecture, [field]: value } : lecture
    );
    setContentData(updatedLectures);
  };

  const handleFileUpload = async (id: number, file: File | null) => {
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
        const updatedLectures = contentData.map((lecture) =>
          lecture.id === id
            ? {
                ...lecture,
                videoUrl: data.data.url,
                public_id: data.data.public_id,
              }
            : lecture
        );
        setContentData(updatedLectures);
      } else {
        console.error("Error uploading file:", data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDeleteLecture = (id: number) => {
    const updatedLectures = contentData.filter((lecture) => lecture.id !== id);
    setContentData(updatedLectures);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 mt-10">
      {/* Add and Bulk Upload Controls */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleAddLecture}
          className="px-6 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-lg font-medium transition"
        >
          Add Lecture
        </button>
        <input
          type="file"
          multiple
          ref={bulkUploadInputRef}
          onChange={(e) => {
            if (e.target.files) {
              Array.from(e.target.files).forEach((file, index) => {
                handleFileUpload(contentData.length + index + 1, file);
              });
            }
          }}
          className="hidden"
        />
        <button
          onClick={() => bulkUploadInputRef.current?.click()}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
        >
          Bulk Upload
        </button>
      </div>

      {/* Lectures List */}
      {contentData.map((lecture) => (
        <div
          key={lecture.id}
          className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <label className="text-lg font-medium">Lecture {lecture.id}</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={lecture.isFreePreview}
                onChange={(e) =>
                  handleInputChange(lecture.id, "isFreePreview", e.target.checked)
                }
                className="form-checkbox h-5 w-5 text-orange-500"
              />
              <label className="text-sm font-medium">Free Preview</label>
            </div>
          </div>

          <input
            type="text"
            placeholder="Enter lecture title"
            value={lecture.title}
            onChange={(e) =>
              handleInputChange(lecture.id, "title", e.target.value)
            }
            className="block w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {lecture.videoUrl ? (
            <div className="flex items-center space-x-4">
              <video
                src={lecture.videoUrl}
                controls
                className="w-64 h-36 rounded-md"
              ></video>
              <button
                onClick={() => handleDeleteLecture(lecture.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete Lecture
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                e.target.files && handleFileUpload(lecture.id, e.target.files[0])
              }
              className="bg-gray-900 text-white file:bg-gray-700 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-none file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentUploader;
