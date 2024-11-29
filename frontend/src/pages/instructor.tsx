import React, { useState } from "react";
import { FiHome, FiBook, FiPlusCircle } from "react-icons/fi";
import Dashboard from "./Components/Instructor/Dashboard";
import Courses from "./Components/Instructor/Courses";
import CreateCourse from "./Components/Instructor/CreateCourse";

const Instructor: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState("Dashboard");

  // Sidebar menu items with icons and labels
  const items = [
    { label: "Dashboard", icon: <FiHome size={20} />, color: "text-blue-400" },
    { label: "Courses", icon: <FiBook size={20} />, color: "text-green-400" },
    { label: "Create a New Course", icon: <FiPlusCircle size={20} />, color: "text-orange-400" },
  ];

  return (
    <div className="flex min-h-screen pt-[70px]" >
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white border-r border-gray-700 pt-8">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.label}
              className={`px-4 md:px-6 py-3 cursor-pointer flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3 ${
                selectedSection === item.label
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setSelectedSection(item.label)}
            >
              <span className={`flex justify-center ${item.color}`}>{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
        {selectedSection === "Dashboard" && (
          <Dashboard/>
        )}
        {selectedSection === "Courses" && (
          <Courses/>
        )}
        {selectedSection === "Create a New Course" && (
          <CreateCourse/>
        )}
      </div>
    </div>
  );
};

export default Instructor;
