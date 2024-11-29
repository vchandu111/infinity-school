import React, { useState } from "react";

interface Lecture {
  id: number;
  title: string;
  file: File | null;
  isFreePreview: boolean;
}

const ContentUploader: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([
    { id: 1, title: "", file: null, isFreePreview: false },
  ]);

  const handleAddLecture = () => {
    setLectures([
      ...lectures,
      { id: lectures.length + 1, title: "", file: null, isFreePreview: false },
    ]);
  };

  const handleInputChange = (
    id: number,
    field: keyof Lecture,
    value: string | File | boolean
  ) => {
    const updatedLectures = lectures.map((lecture) =>
      lecture.id === id ? { ...lecture, [field]: value } : lecture
    );
    setLectures(updatedLectures);
  };

  const handleFileUpload = async (id: number, file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:3000/instructor-routes/media-routes/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("File uploaded successfully:", data.data.url);

        // Update lecture with uploaded file URL
        handleInputChange(id, "file", data.data.url);
      } else {
        console.error("Error uploading file:", data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 mt-10">
      <button
        onClick={handleAddLecture}
        className="mb-6 px-6 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-lg font-medium transition"
      >
        Add Lecture
      </button>

      {lectures.map((lecture) => (
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
                  handleInputChange(
                    lecture.id,
                    "isFreePreview",
                    e.target.checked
                  )
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

          <div className="flex items-center">
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                e.target.files &&
                handleFileUpload(lecture.id, e.target.files[0])
              }
              className="bg-gray-900 text-white file:bg-gray-700 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-none file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentUploader;
