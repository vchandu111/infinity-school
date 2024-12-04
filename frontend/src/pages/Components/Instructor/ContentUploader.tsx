import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import MediaProgressbar from "../Common/MediaProgress";

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
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [mediaUploading, setMediaUploading] = useState(false);

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

  const handleFileUpload = (id: number, file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/media/upload");

    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("accessToken")}`
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress((prev) => ({ ...prev, [id]: progress }));
      }
    };

    xhr.onloadstart = () => {
      setMediaUploading(true);
    };

    xhr.onloadend = () => {
      setMediaUploading(false);
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
          setUploadProgress((prev) => ({ ...prev, [id]: 100 }));

          const updatedLectures = contentData.map((lecture) =>
            lecture.id === id
              ? {
                  ...lecture,
                  videoUrl: response.data.url,
                  public_id: response.data.public_id,
                }
              : lecture
          );
          setContentData(updatedLectures);
        } else {
          console.error("Error uploading file:", response.message);
        }
      } else {
        console.error("Error uploading file");
      }
    };

    xhr.onerror = () => {
      console.error("Upload failed");
      setUploadProgress((prev) => ({ ...prev, [id]: 0 }));
    };

    xhr.send(formData);
  };

  const handleDeleteLecture = (id: number) => {
    const updatedLectures = contentData.filter((lecture) => lecture.id !== id);
    setContentData(updatedLectures);
  };

  return (
    <div className=" bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 mt-10">
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

          {lecture.videoUrl ? (
            <div className="flex items-center space-x-4">
              <ReactPlayer
                url={lecture.videoUrl}
                controls
                width="300px"
                height="200px"
              />
              <button
                onClick={() => handleDeleteLecture(lecture.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete Lecture
              </button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  e.target.files &&
                  handleFileUpload(lecture.id, e.target.files[0])
                }
                className="bg-gray-900 text-white file:bg-gray-700 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-none file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
              />
              {uploadProgress[lecture.id] !== undefined && (
                <MediaProgressbar
                  isMediaUploading={mediaUploading}
                  progress={uploadProgress[lecture.id]}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentUploader;
