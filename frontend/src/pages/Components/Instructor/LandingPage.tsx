import React from "react";

interface Field {
  name: string;
  label: string;
  componentType: "input" | "textarea" | "select";
  type?: string;
  placeholder?: string;
  options?: string[];
}

const LandingPageData: React.FC<{
  landingPageData: Record<string, string>;
  setLandingPageData: (data: Record<string, string>) => void;
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
      label: "Description",
      componentType: "textarea",
      placeholder: "Enter course description",
    },
    {
      name: "pricing",
      label: "Pricing",
      componentType: "input",
      type: "number",
      placeholder: "Enter course pricing",
    },
    {
      name: "objectives",
      label: "Objectives",
      componentType: "textarea",
      placeholder: "Enter course objectives",
    },
    {
      name: "welcomeMessage",
      label: "Welcome Message",
      componentType: "textarea",
      placeholder: "Welcome message for students",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setLandingPageData({ ...landingPageData, [name]: value });
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen mt-10">
      <form className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-sm font-medium mb-2 text-gray-300"
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
      </form>
    </div>
  );
};

export default LandingPageData;
