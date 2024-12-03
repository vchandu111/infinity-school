import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import InstructorLayout from "../Components/Layout/InstructorLayout";
import { Router, useRouter } from "next/router";

interface Course {
  _id: string;
  title: string;
  students: { studentName: string }[]; // Adjusted based on API response
  pricing: number;
  revenue?: string; // You can calculate revenue based on pricing and student count
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/instructor/course/get"
        );
        const data = await response.json();

        if (data.success) {
          setCourses(
            data.data.map((course: any) => ({
              ...course,
              revenue: `$${course.students.length * course.pricing}`, // Calculate revenue
            }))
          );
        } else {
          setError("Failed to fetch courses");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  console.log(courses);

  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">All Courses</h1>
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">All Courses</h1>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <InstructorLayout>
      <div className="p-8 bg-gradient-to-b mt-20 from-gray-900 to-gray-800 text-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Courses</h1>
          <button
            onClick={() => router.push("/instructor/CreateCourse")}
            className="px-6 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-lg font-medium transition"
          >
            Create New Course{" "}
          </button>
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
                <tr key={course._id} className="hover:bg-gray-700 transition">
                  <td className="py-5 px-6 text-sm font-medium text-gray-300 border-b border-gray-700">
                    {course.title}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-300 border-b border-gray-700">
                    {course.students.length}
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
    </InstructorLayout>
  );
};

export default Courses;
