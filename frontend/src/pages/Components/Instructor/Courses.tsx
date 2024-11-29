import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Courses: React.FC = () => {
  // Dummy data for courses
  const courses = [
    {
      id: 1,
      title: "React JS Full Course 2025",
      students: 100,
      revenue: "$5000",
    },
    {
      id: 2,
      title: "Node.js Mastery",
      students: 75,
      revenue: "$4000",
    },
    {
      id: 3,
      title: "Mastering TypeScript",
      students: 120,
      revenue: "$6000",
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Courses</h1>
        
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-3 px-6 text-left text-sm font-medium uppercase text-gray-400 border-b border-gray-700">
                Course
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium uppercase text-gray-400 border-b border-gray-700">
                Students
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium uppercase text-gray-400 border-b border-gray-700">
                Revenue
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium uppercase text-gray-400 border-b border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-700 transition" >
                <td  className="py-5 px-6 text-sm font-medium text-gray-300 border-b border-gray-700">
                  {course.title}
                </td>
                <td className="py-3 px-6 text-sm text-gray-300 border-b border-gray-700">
                  {course.students}
                </td>
                <td className="py-3 px-6 text-sm text-gray-300 border-b border-gray-700">
                  {course.revenue}
                </td>
                <td className="py-3 px-6 text-sm text-gray-300 border-b border-gray-700">
                  <div className="flex items-center space-x-4">
                    <button className="text-blue-400 hover:text-blue-500">
                      <FiEdit2 size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-500">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
