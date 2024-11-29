import React from "react";

const Settings = () => {
  return (
    <div>

      {/* Upload Course Image */}
      <div className="mb-6">
        <label htmlFor="courseImage" className="block text-gray-400 mb-2">
          Upload Course Image
        </label>
        <input
          type="file"
          id="courseImage"
          accept="image/*"
        //   onChange={handleImageUpload}
          className=" text-gray-400 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Delete Course */}
      <div>
        <button
        //   onClick={handleDeleteCourse}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium"
        >
          Delete Course
        </button>
      </div>
    </div>
  );
};

export default Settings;
