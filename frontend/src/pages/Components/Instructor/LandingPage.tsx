import React, { useEffect } from "react";

interface Field {
  name: string;
  label: string;
  componentType: "input" | "textarea" | "select";
  type?: string;
  placeholder?: string;
  options?: string[];
}

const LandingPageData: React.FC<{
  landingPageData: Record<string, string | string[]>;
  setLandingPageData: (data: Record<string, string | string[]>) => void;
}> = ({ landingPageData, setLandingPageData }) => {
  const courseCategories = ["Technology", "Business", "Health"];
  const courseLevelOptions = ["Beginner", "Intermediate", "Advanced"];
  const languageOptions = ["English", "Spanish", "French"];

  const fields: Field[] = [
    {
      name: "title",
      label: "Title",
      componentType: "input",
      type: "text",
      placeholder: "Enter course title",
    },
    {
      name: "category",
      label: "Category",
      componentType: "select",
      options: courseCategories,
    },
    {
      name: "level",
      label: "Level",
      componentType: "select",
      options: courseLevelOptions,
    },
    {
      name: "instructorName",
      label: "Instructor Name",
      componentType: "input",
      type: "text",
      placeholder: "Enter instructor name",
    },
    {
      name: "primaryLanguage",
      label: "Primary Language",
      componentType: "select",
      options: languageOptions,
    },
    {
      name: "subtitle",
      label: "Subtitle",
      componentType: "input",
      type: "text",
      placeholder: "Enter course subtitle",
    },
    {
      name: "description",
      label: "Who is this course for?",
      componentType: "textarea",
      placeholder: "Write a clear description of the intended learners for your course",
    },
    {
      name: "pricing",
      label: "Pricing",
      componentType: "input",
      type: "number",
      placeholder: "Enter course pricing",
    },
    {
      name: "welcomeMessage",
      label: "Welcome Message",
      componentType: "textarea",
      placeholder: "Welcome message for students",
    },
  ];

  // Ensure objectives field is initialized with 4 empty inputs
  useEffect(() => {
    if (!Array.isArray(landingPageData.objectives)) {
      setLandingPageData({
        ...landingPageData,
        objectives: ["", "", "", ""], // Initialize with 4 default inputs
      });
    }
  }, [landingPageData, setLandingPageData]);

  const handleAddObjective = () => {
    const currentObjectives = Array.isArray(landingPageData.objectives)
      ? landingPageData.objectives
      : [];
    setLandingPageData({
      ...landingPageData,
      objectives: [...currentObjectives, ""],
    });
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const currentObjectives = Array.isArray(landingPageData.objectives)
      ? landingPageData.objectives
      : [];
    const updatedObjectives = [...currentObjectives];
    updatedObjectives[index] = value;
    setLandingPageData({ ...landingPageData, objectives: updatedObjectives });
  };

  const handleRemoveObjective = (index: number) => {
    const currentObjectives = Array.isArray(landingPageData.objectives)
      ? landingPageData.objectives
      : [];
    const updatedObjectives = currentObjectives.filter((_, i) => i !== index);
    setLandingPageData({ ...landingPageData, objectives: updatedObjectives });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setLandingPageData({ ...landingPageData, [name]: value });
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white  mt-10">
      <form className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-md font-medium mb-2 text-gray-300"
            >
              {field.label}
            </label>
            {field.componentType === "input" && (
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={landingPageData[field.name] || ""}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            )}
            {field.componentType === "textarea" && (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={landingPageData[field.name] || ""}
                onChange={handleChange}
                rows={4}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            )}
            {field.componentType === "select" && (
              <select
                id={field.name}
                name={field.name}
                value={landingPageData[field.name] || ""}
                onChange={handleChange}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="" disabled>
                  Select {field.label}
                </option>
                {field.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {/* Dynamic Objectives */}
        <div className="flex flex-col">
          <label className="text-md font-medium mb-2 text-gray-300">
            What will students learn in your course?
          </label>
          <p className="text-sm font-medium mb-2 text-gray-300">
            You must enter at least 4 learning objectives or outcomes that
            learners can expect to achieve after completing your course.
          </p>
          {Array.isArray(landingPageData.objectives) &&
            landingPageData.objectives.map((objective, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  placeholder={`Objective ${index + 1}`}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 flex-1"
                />
                {index >= 4 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveObjective(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
           <button
            type="button"
            onClick={handleAddObjective}
            className="mt-4 flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium"
          >
            <span className="text-xl">+</span>
            <span>Add more to your response</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandingPageData;
