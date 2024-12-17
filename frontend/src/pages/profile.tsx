import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';  // Importing FontAwesome Icons

const UserProfile: React.FC = () => {
  // State for storing user details
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    userId: ""
  });

  // Effect to load user data from local storage
  useEffect(() => {
    const userData = {
      email: localStorage.getItem('userEmail') || "No email found",
      userId: localStorage.getItem('userId') || "No ID found",
      name: localStorage.getItem('userName') || "No name found"
    };
    setUserDetails(userData);
  }, []);

  // Functionality to handle edit and delete can be added here
  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex items-center justify-center py-12 px-8">
      <div className="bg-gray-800 shadow-xl rounded-lg p-8 flex flex-col items-center justify-center">
        <FaUserCircle className="text-6xl text-teal-500 mb-4" />
        <h2 className="text-3xl font-bold mb-2">{userDetails.name}</h2>
        <p className="text-gray-300 mb-6">{userDetails.email}</p>
        <div className="flex gap-4">
          <button
            className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            onClick={handleEdit}>
            <FaEdit className="mr-2" />Edit
          </button>
          <button
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            onClick={handleDelete}>
            <FaTrashAlt className="mr-2" />Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
