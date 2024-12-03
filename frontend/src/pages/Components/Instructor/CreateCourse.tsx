import React, { useState } from "react";
import LandingPageData from "./LandingPage";
import Settings from "./Settings";
import ContentUploader from "./ContentUploader";

const CreateCourse: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Content Uploader");

  const [courseData, setCourseData] = useState({
    settings: { courseImage: null },
    landingPage: {},
    content: [],
  });

  // Check if all required data is filled before submitting
  const isCourseReady = Boolean(
    courseData.settings.courseImage &&
    courseData.landingPage.title &&
    courseData.landingPage.category &&
    courseData.content.length > 0
  );

  const handleSubmit = async () => {
    if (!isCourseReady) {
      alert("Please complete all tabs before submitting the course.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/instructor/course/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          ...courseData.landingPage,
          curriculum: courseData.content,
          image: courseData.settings.courseImage,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Course added successfully!");
      } else {
        console.error("Error adding course:", result.message);
      }
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };

  const tabs = [
    { label: "Content Uploader" },
    { label: "Landing Page Data" },
    { label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Submit Course Button */}
      <div className="container mx-auto p-4">
        <button
          onClick={handleSubmit}
          className={`px-6 py-2 text-white rounded-lg font-medium transition ${
            isCourseReady ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!isCourseReady}
        >
          Submit Course
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="container mx-auto flex space-x-4 px-8 py-4">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-l font-medium focus:outline-none ${
              selectedTab === tab.label
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-400 hover:text-orange-400"
            }`}
            onClick={() => setSelectedTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="container mx-auto p-8">
        {selectedTab === "Content Uploader" && (
          <ContentUploader
            contentData={courseData.content}
            setContentData={(content: any) =>
              setCourseData((prev) => ({ ...prev, content }))
            }
          />
        )}
        {selectedTab === "Landing Page Data" && (
          <LandingPageData
            landingPageData={courseData.landingPage}
            setLandingPageData={(landingPage: any) =>
              setCourseData((prev) => ({ ...prev, landingPage }))
            }
          />
        )}
        {selectedTab === "Settings" && (
          <Settings
            settingsData={courseData.settings}
            setSettingsData={(settings: any) =>
              setCourseData((prev) => ({ ...prev, settings }))
            }
          />
        )}
      </div>
    </div>
  );
};

export default CreateCourse;
