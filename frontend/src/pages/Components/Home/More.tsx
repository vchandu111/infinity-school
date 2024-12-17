import React from 'react';

const AdvancedLearningPrograms: React.FC = () => {
  return (
    <>
      {/* First Section with Image on the Right */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-8">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Advanced Learning Programs</h2>
            <p className="mb-6">
              Specialized training designed to prepare you for future challenges in the industry.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Project-based learning for practical experience</li>
              <li>Access to exclusive webinars and workshops</li>
              <li>Mentorship from industry leaders</li>
              <li>Completion certificate recognized by major corporations</li>
            </ul>
          </div>
          <div className="lg:w-1/3 lg:pl-12 mt-8 lg:mt-0">
            <img
              src="https://img.freepik.com/free-vector/digital-presentation-concept-illustration_114360-8175.jpg?t=st=1720670311~exp=1720673911~hmac=56921e22ddec1d79b446780d154c1a65d0a77848b717341cfde462b0ebfd142b&w=1380"
              alt="Advanced Learning Sessions"
              className="rounded-lg shadow-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* Second Section with Image on the Left */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12 px-8">
        <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center justify-between gap-8">
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              How Progression School Partners with Your Organization
            </h2>
            <p className="mb-6">
              At Progression School, we begin each engagement with a detailed consultation to tailor our training programs specifically to your organizational needs. Our approach includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Evaluating Team Skills:</strong> We assess your team's proficiency with essential technologies to identify key growth areas.</li>
              <li><strong>Real-World Application:</strong> By understanding your operational challenges, we develop practical exercises that reflect your real-life scenarios.</li>
              <li><strong>Role-Specific Customization:</strong> Our curriculum is customized to match the experience levels and roles of your team members.</li>
            </ul>
          </div>
          <div className="lg:w-1/3 lg:pr-12 mt-8 lg:mt-0">
            <img
              src="https://img.freepik.com/free-vector/business-deal-concept-illustration_114360-1103.jpg?t=st=1720670251~exp=1720673851~hmac=fae18e59331762231ff7d83d3fd28b32013ad956d50b3f66a3c285980cf77e44&w=1380"
              alt="Business Deal"
              className="rounded-lg shadow-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AdvancedLearningPrograms;
