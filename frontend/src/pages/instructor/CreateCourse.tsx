import React, { useState } from "react";
import LandingPageData from "../Components/Instructor/LandingPage";
import Settings from "../Components/Instructor/Settings";
import ContentUploader from "../Components/Instructor/ContentUploader";
import InstructorLayout from "../Components/Layout/InstructorLayout";

// Define types for course data
interface LandingPageData {
  title: string;
  category: string;
  level: string;
  primaryLanguage: string;
  subtitle: string;
  description: string;
  pricing: number;
  objectives: string;
  welcomeMessage: string;
}

interface SettingsData {
  courseImage: string | null;
}

interface Lecture {
  id: number;
  title: string;
  videoUrl: string | null;
  public_id: string | null;
  isFreePreview: boolean;
}

interface CourseData {
  settings: SettingsData;
  landingPage: Partial<LandingPageData>; // Allow fields to be optional during editing
  content: Lecture[];
}

const CreateCourse: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Content Uploader");

  const [courseData, setCourseData] = useState<CourseData>({
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
      const response = await fetch(
        "http://localhost:3000/instructor/course/add",
        {
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
        }
      );

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
    <InstructorLayout>
      <div className="min-h-screen mt-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* Submit Course Button */}
        <div className="container mx-auto p-4">
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 text-white rounded-lg font-medium transition ${
              isCourseReady
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-500 cursor-not-allowed"
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
              setContentData={(content: Lecture[]) =>
                setCourseData((prev) => ({ ...prev, content }))
              }
            />
          )}
          {selectedTab === "Landing Page Data" && (
            <LandingPageData
              landingPageData={courseData.landingPage as Record<string, any>} // Adjust type for props
              setLandingPageData={(landingPage: Partial<LandingPageData>) =>
                setCourseData((prev) => ({ ...prev, landingPage }))
              }
            />
          )}
          {selectedTab === "Settings" && (
            <Settings
              settingsData={courseData.settings}
              setSettingsData={(settings: SettingsData) =>
                setCourseData((prev) => ({ ...prev, settings }))
              }
            />
          )}
        </div>
      </div>
    </InstructorLayout>
  );
};

export default CreateCourse;
