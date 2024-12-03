// components/Layout/InstructorLayout.tsx
import React from "react";
import { useRouter } from "next/router";
import { FiHome, FiBook, FiPlusCircle } from "react-icons/fi";

interface LayoutProps {
  children: React.ReactNode; // Render page content dynamically
}

const InstructorLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const items = [
    {
      label: "Dashboard",
      icon: <FiHome size={20} />,
      color: "text-blue-400",
      route: "/instructor/Dashboard",
    },
    {
      label: "Courses",
      icon: <FiBook size={20} />,
      color: "text-green-400",
      route: "/instructor/Courses",
    },
    {
      label: "Create a New Course",
      icon: <FiPlusCircle size={20} />,
      color: "text-orange-400",
      route: "/instructor/CreateCourse",
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-20 md:w-64 mt-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white border-r border-gray-700 pt-8">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.label}
              className="px-4 md:px-6 py-3 cursor-pointer flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3 hover:bg-gray-700 hover:text-white"
              onClick={() => handleNavigation(item.route)}
            >
              <span className={`flex justify-center ${item.color}`}>
                {item.icon}
              </span>
              <span className="hidden md:inline">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
        {children}
      </div>
    </div>
  );
};

export default InstructorLayout;
