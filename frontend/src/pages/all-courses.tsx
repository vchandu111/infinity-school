import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaPlayCircle, FaClock, FaUser, FaFilter } from "react-icons/fa";

interface Course {
  _id: string;
  instructorName: string;
  title: string;
  category: string;
  level: string;
  primaryLanguage: string;
  subtitle: string;
  description: string;
  image: string;
  pricing: number;
  curriculum: { title: string; videoUrl: string }[];
}

const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  // Filters
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Price Range
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500); // Adjust based on your pricing range
  const [selectedPrice, setSelectedPrice] = useState<number>(500);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/instructor/course/get");
        const data = await response.json();

        if (data.success) {
          setCourses(data.data);
          setFilteredCourses(data.data);

          // Extract unique filter values
          const uniqueCategories = [...new Set(data.data.map((course: Course) => course.category))] as string[];
        const uniqueLevels = [...new Set(data.data.map((course: Course) => course.level))] as string[];
        const uniqueLanguages = [...new Set(data.data.map((course: Course) => course.primaryLanguage))] as string[];

          setCategories(uniqueCategories);
          setLevels(uniqueLevels);
          setLanguages(uniqueLanguages);

          // Determine min and max pricing
          const prices = data.data.map((course: Course) => course.pricing);
          setMinPrice(Math.min(...prices));
          setMaxPrice(Math.max(...prices));
          setSelectedPrice(Math.max(...prices));
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

  const handleFilterChange = (
    filter: string,
    filterType: "categories" | "levels" | "languages"
  ) => {
    const selectedFilters =
      filterType === "categories"
        ? selectedCategories
        : filterType === "levels"
        ? selectedLevels
        : selectedLanguages;

    if (selectedFilters.includes(filter)) {
      const updatedFilters = selectedFilters.filter((item) => item !== filter);
      filterType === "categories"
        ? setSelectedCategories(updatedFilters)
        : filterType === "levels"
        ? setSelectedLevels(updatedFilters)
        : setSelectedLanguages(updatedFilters);
    } else {
      const updatedFilters = [...selectedFilters, filter];
      filterType === "categories"
        ? setSelectedCategories(updatedFilters)
        : filterType === "levels"
        ? setSelectedLevels(updatedFilters)
        : setSelectedLanguages(updatedFilters);
    }
  };

  useEffect(() => {
    let filtered = courses;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((course) => selectedCategories.includes(course.category));
    }

    if (selectedLevels.length > 0) {
      filtered = filtered.filter((course) => selectedLevels.includes(course.level));
    }

    if (selectedLanguages.length > 0) {
      filtered = filtered.filter((course) => selectedLanguages.includes(course.primaryLanguage));
    }

    // Apply price range filter
    filtered = filtered.filter((course) => course.pricing <= selectedPrice);

    setFilteredCourses(filtered);
  }, [selectedCategories, selectedLevels, selectedLanguages, selectedPrice]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 sm:p-8 flex">
      {/* Sidebar Filters */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 z-20 w-64 transform md:mt-16 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-orange-500 border-b border-gray-700 pb-2 ">
            Filters
          </h2>

          {/* Filter by Category */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Category</h3>
            {categories.map((category) => (
              <div key={category} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  className="form-checkbox h-5 w-5 text-orange-500 border-gray-700 bg-gray-800 focus:ring-0 checked:bg-orange-500"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleFilterChange(category, "categories")}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-3 text-sm font-medium text-gray-300"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>

          {/* Filter by Level */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Level</h3>
            {levels.map((level) => (
              <div key={level} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id={`level-${level}`}
                  className="form-checkbox h-5 w-5 text-orange-500 border-gray-700 bg-gray-800 focus:ring-0 checked:bg-orange-500"
                  checked={selectedLevels.includes(level)}
                  onChange={() => handleFilterChange(level, "levels")}
                />
                <label
                  htmlFor={`level-${level}`}
                  className="ml-3 text-sm font-medium text-gray-300"
                >
                  {level}
                </label>
              </div>
            ))}
          </div>

          {/* Filter by Language */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Language</h3>
            {languages.map((language) => (
              <div key={language} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id={`language-${language}`}
                  className="form-checkbox h-5 w-5 text-orange-500 border-gray-700 bg-gray-800 focus:ring-0 checked:bg-orange-500"
                  checked={selectedLanguages.includes(language)}
                  onChange={() => handleFilterChange(language, "languages")}
                />
                <label
                  htmlFor={`language-${language}`}
                  className="ml-3 text-sm font-medium text-gray-300"
                >
                  {language}
                </label>
              </div>
            ))}
          </div>

          {/* Filter by Price */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Price Range</h3>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>${minPrice}</span>
              <span>${selectedPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Toggle */}
      <button
        className="fixed top-[80px] right-4 bg-orange-500 text-white p-2 rounded-full z-30 sm:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <FaFilter size={20} />
      </button>

      {/* Courses Grid */}
      <div className="flex-1 ml-0 sm:ml-6">
        <h1 className="text-3xl font-bold text-center mb-8 mt-28 md:mt-0">All Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col justify-between"
            >
              {/* Course Image */}
              <div>
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              </div>

              {/* Course Details */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <div className="flex items-center space-x-2 mt-2">
                  <FaUser className="text-gray-400" />
                  <p className="text-sm text-gray-400">{course.instructorName}</p>
                </div>

                <div className="text-lg font-semibold text-orange-500 mt-2">
                  ${course.pricing}
                </div>

                <div className="mt-4 flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-2">
                  <div className="flex items-center space-x-2">
                    <FaChalkboardTeacher className="text-orange-500" />
                    <p>{course.level}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPlayCircle className="text-green-500" />
                    <p>{course.curriculum.length} Lectures</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-blue-500" />
                    <p>3 months</p>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <div className="p-4">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-lg">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
