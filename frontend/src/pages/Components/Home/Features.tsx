import React from "react";
import { MdSchool, MdWork, MdPhonelink, MdPeople, MdSchedule, MdExtension } from "react-icons/md";

// Define the feature type
type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
};

// Features data
const featuresData: Feature[] = [
  {
    title: "Targeted Specialization",
    description:
      "Choose from targeted domains such as Corporate Leadership, Advanced Technology, Project Management, each designed to enhance your skills within a specific career path.",
    icon: <MdWork className="text-orange-500 text-3xl" />,
  },
  {
    title: "Dynamic Curriculum",
    description:
      "Our curriculum is crafted by industry experts to adapt to market changes, incorporating case studies and real-world projects that reflect the latest industry standards and practices.",
    icon: <MdSchool className="text-orange-500 text-3xl" />,
  },
  {
    title: "Expert Instructors",
    description:
      "Learn from the finest in the field—our instructors are seasoned professionals from top-tier firms and academic institutions, dedicated to providing you with actionable insights and knowledge.",
    icon: <MdPhonelink className="text-orange-500 text-3xl" />,
  },
  {
    title: "Personalized Mentorship",
    description:
      "Engage in one-on-one mentorship with industry leaders who can provide personalized guidance, career advice, and support tailored to your professional goals.",
    icon: <MdPeople className="text-orange-500 text-3xl" />,
  },
  {
    title: "Professional Network",
    description:
      "Gain access to a vibrant community of over 10,000 professionals worldwide. Expand your network, collaborate on projects, and share insights within our alumni platform.",
    icon: <MdExtension className="text-orange-500 text-3xl" />,
  },
  {
    title: "Flexible Learning Options",
    description:
      "Adapt your education to your life with flexible course schedules, the ability to pause and resume training, and options for remote learning to accommodate your busy lifestyle.",
    icon: <MdSchedule className="text-orange-500 text-3xl" />,
  },
];

const Features: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-8">
      <h1 className="text-4xl font-bold text-center">Discover What Sets Our Courses Apart</h1>
      <div className="flex flex-wrap justify-center items-stretch gap-10 mt-10">
        {featuresData.map((feature, index) => (
          <div key={index} className="feature-box bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm flex flex-col items-center text-center transition duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
