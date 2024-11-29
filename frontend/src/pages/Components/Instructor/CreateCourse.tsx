import React, { useState } from "react";
import LandingPageData from "./LandingPage";
import Settings from "./Settings";
import ContentUploader from "./ContentUploader";

const CreateCourse: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Content Uploader");

  // Tabs
  const tabs = [
    { label: "Content Uploader" },
    { label: "Landing Page Data" },
    { label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Tabs Navigation */}
      <div className="">
        <div className="container mx-auto flex space-x-4 px-8 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`px-4 py-2 text-l font-medium focus:outline-none  ${
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
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {selectedTab === "Content Uploader" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Content Uploader</h1>
            <p>Upload your course content here.</p>
                      {/* Add upload form or components */}
                      <ContentUploader/>
          </div>
        )}
        {selectedTab === "Landing Page Data" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Landing Page Data</h1>
            <p>Provide information for your course landing page here.</p>
                      {/* Add form for landing page data */}
                      <LandingPageData/>
          </div>
        )}
        {selectedTab === "Settings" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
                      {/* Add form for course settings */}
                      <Settings/>
                      
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCourse;
