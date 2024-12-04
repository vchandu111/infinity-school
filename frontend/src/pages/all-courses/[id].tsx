import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  FaPlayCircle,
  FaChalkboardTeacher,
  FaLanguage,
  FaTag,
  FaHeart,
  FaClock,
  FaCheck,
  FaLock,
} from "react-icons/fa";

const CourseDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

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
        .catch(() =>
          setError("An error occurred while fetching course details")
        )
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handlePlayVideo = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
  };

  const handleCloseModal = () => {
    setSelectedVideoUrl(null);
    setShowPurchaseModal(false);
  };

  // Close modal on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };

    if (selectedVideoUrl || showPurchaseModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedVideoUrl, showPurchaseModal]);

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

  const firstFreePreview = course.curriculum.find(
    (lecture: any) => lecture.isFreePreview
  );

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
            <div className="bg-gray-800 px-4 py-4 mt-10 rounded-md">
              <h2 className="text-xl font-semibold mb-4  text-orange-500">
                What You'll Learn
              </h2>
              <ul className="list-none space-y-2">
                {Array.isArray(course.objectives) &&
                  course.objectives.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <FaCheck className="text-green-500 mt-1" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Pricing Card with First Free Preview Video */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {firstFreePreview ? (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <video
                  src={firstFreePreview.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                No free preview available.
              </p>
            )}
            <div>
              <p className="text-2xl font-bold text-orange-500">
                ₹{course.pricing}{" "}
                <span className="line-through text-gray-500">₹3,999</span>{" "}
                <span className="text-green-400">85% off</span>
              </p>
              <p className="text-sm text-red-500 mt-1">
                12 hours left at this price!
              </p>
              <button className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg">
                Buy Now
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
              {lecture.isFreePreview ? (
                <FaPlayCircle
                  className="text-green-500 text-2xl cursor-pointer"
                  onClick={() => handlePlayVideo(lecture.videoUrl)}
                />
              ) : (
                <FaLock
                  className="text-gray-500 text-2xl cursor-pointer"
                  onClick={() => setShowPurchaseModal(true)}
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{`Lecture ${index + 1}: ${
                  lecture.title
                }`}</h3>
                {!lecture.isFreePreview && (
                  <p className="text-sm text-gray-400">
                    Purchase course to unlock.
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Modal */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-gray-900 rounded-lg p-4 w-full max-w-2xl"
          >
            <button
              onClick={handleCloseModal}
              className="text-white text-2xl absolute top-4 right-4"
            >
              ✖
            </button>
            <video src={selectedVideoUrl} controls className="w-full h-full" />
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-gray-900 rounded-lg p-4 w-full max-w-md text-center"
          >
            <h3 className="text-lg font-bold text-white mb-4">
              Purchase the course to unlock this lecture.
            </h3>
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4 mt-10 text-orange-500">
          Description
        </h2>
        <div
          className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6"
          style={{
            width: "100%", // Ensure the block takes the full container width
            maxWidth: "100%", // Avoid exceeding container limits
          }}
        >
          <p
            className="text-md text-gray-300 leading-relaxed"
            style={{
              textAlign: "justify", // Justify text for a polished appearance
            }}
          >
            {course.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
