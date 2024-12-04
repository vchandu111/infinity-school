import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FaPlayCircle,
  FaChalkboardTeacher,
  FaLanguage,
  FaTag,
  FaHeart,
  FaClock,
} from "react-icons/fa";

const CourseDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the course ID from the route
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/instructor/course/get/details/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCourse(data.data);
          } else {
            setError("Failed to fetch course details");
          }
        })
        .catch((err) =>
          setError("An error occurred while fetching course details")
        )
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400">
        <p>{error || "Course not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b pt-20 from-gray-900 to-gray-800 text-white">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Title and Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-white">{course.title}</h1>
            <p className="text-lg text-gray-400 mt-4">{course.subtitle}</p>
            <div className="flex items-center space-x-2 mt-10">
              <FaChalkboardTeacher className="text-orange-500" />
              <span>Created by {course.instructorName}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <FaTag className="text-orange-500" />
                <span>{course.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaLanguage className="text-orange-500" />
                <span>{course.primaryLanguage}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-orange-500" />
                <span>Last updated 11/2024</span>
              </div>
            </div>
            {/* What You'll Learn */}
            <h2 className="text-xl font-semibold mb-4 mt-10 text-orange-500">
              What You'll Learn
            </h2>
            <p>{course.objectives}</p>
          </div>

          {/* Pricing Card with Video */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* First Video */}
            {course.curriculum.length > 0 && (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <video
                  src={course.curriculum[0].videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Pricing Section */}
            <div className="">
              <p className="text-2xl font-bold text-orange-500">
                ₹{course.pricing}{" "}
                <span className="line-through text-gray-500">₹3,999</span>{" "}
                <span className="text-green-400">85% off</span>
              </p>
              <p className="text-sm text-red-500 mt-1">
                12 hours left at this price!
              </p>
              <button className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg">
                Add to cart
              </button>

              <p className="text-sm text-gray-400 mt-4">
                30-Day Money-Back Guarantee | Full Lifetime Access
              </p>
              <div className="mt-6 flex items-center">
                <input
                  type="text"
                  placeholder="Enter Coupon"
                  className="w-3/4 mt-2 px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <button className="w-1/4 mt-2 bg-gray-700 text-white py-2 px-4 rounded-lg ml-2">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">
          Course Content
        </h2>
        <ul className="space-y-4">
          {course.curriculum.map((lecture: any, index: number) => (
            <li
              key={lecture._id}
              className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <FaPlayCircle className="text-green-500 text-2xl cursor-pointer" />
              <div>
                <h3 className="text-lg font-semibold">{`Lecture ${index + 1}: ${
                  lecture.title
                }`}</h3>
                <p className="text-sm text-gray-400">
                  Click the play icon to watch.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4 mt-10 text-orange-500">
          Description
        </h2>
        <p className="text-md text-gray-400 mt-2">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseDetails;
