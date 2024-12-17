import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6" id="about-head">ABOUT US</h1>
        <div className="about-container space-y-4 text-center">
          <h2 className="text-2xl font-semibold">We're here to help you find the best way to success.</h2>
          <p>
            Progression School dedicated to helping professionals excel in their careers by providing ongoing, relevant
            training tailored to their specific industry needs. Our goal is to enable continuous professional development
            through a curriculum designed for real-world application, covering everything from leadership skills to the
            latest technological advancements.
          </p>
          <p>
            Our approach integrates theoretical knowledge with practical exercises, ensuring that our learners are not
            only prepared to meet the challenges of today but are also equipped to innovate for tomorrow. We focus on
            nurturing critical thinking, problem-solving abilities, and adaptive learning to ensure every professional can
            achieve their career aspirations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
