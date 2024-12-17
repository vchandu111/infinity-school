import React from "react";

// Define the team member type
type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
  altText: string;
};

// Team member data
const teamMembers: TeamMember[] = [
  {
    name: "Vivek M Agarwal",
    role: "Director of L&D",
    imageUrl:
      "https://ca.slack-edge.com/T025BADED-U06ET8AFX17-3d4b7cc9063e-512",
    altText: "Vivek M Agarwal, Director of L&D",
  },
  {
    name: "Abhay Saraf",
    role: "Senior L&D Specialist",
    imageUrl: "https://ca.slack-edge.com/T025BADED-UKD1WUJ49-3a7cd4c6d221-512",
    altText: "Abhay Saraf, Senior L&D Specialist",
  },
  {
    name: "Chandra Sekhar",
    role: "Senior L&D Specialist",
    imageUrl:
      "https://ca.slack-edge.com/T025BADED-U0727V6CBJ4-20e8c8ef7ea8-512",
    altText: "Chandra Sekhar, Senior L&D Specialist",
  },
  {
    name: "Naved Khan",
    role: "L&D Specialist",
    imageUrl:
      "https://ca.slack-edge.com/T025BADED-U071CGK3FSA-f25cc6f7913d-512",
    altText: "Naved Khan, L&D Specialist",
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <h2 className="text-3xl font-bold text-center text-orange-500">
        Meet Our Team
      </h2>
      <p className="text-center mt-2 mb-10">
        Our dedicated team of professionals is committed to your success.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="team-member bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs flex flex-col items-center text-center"
          >
            <img
              className="rounded-full mb-4"
              src={member.imageUrl}
              alt={member.altText}
              style={{ width: "100px", height: "100px" }}
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
