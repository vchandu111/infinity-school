import React from "react";

function Career() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <h2 className="text-3xl font-bold text-center">
        Discover Varied Career Paths
      </h2>
      <p className="text-center mt-4 max-w-2xl mx-auto">
        Unlock your potential with our diverse range of career-oriented
        programs.
      </p>
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {/* Technology Path */}
        <div className="career-path bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm">
          <img
            className="rounded-t-lg"
            src="https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?t=st=1720634901~exp=1720638501~hmac=fedbea0ce6ea5479cb5f947d1255f5af7bf19eb09dad72c5fc641c8abf5679b8&w=2000"
            alt="Technology Career Path"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Technology Path</h3>
            <p>
              Forge a career in technology with courses designed for budding
              developers and IT professionals.
            </p>
          </div>
        </div>

        {/* Business Management Path */}
        <div className="career-path bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm">
          <img
            className="rounded-t-lg"
            src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg?t=st=1720635797~exp=1720639397~hmac=2165ddcb8e8c7a6a365854be29da962056e3bdc94b6cec584648739376840bb7&w=2000"
            alt="Business Management Career Path"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Business Management Path</h3>
            <p>
              Master business fundamentals to lead and innovate in any industry.
            </p>
          </div>
        </div>

        {/* Marketing Path */}
        <div className="career-path bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm">
          <img
            className="rounded-t-lg"
            src="https://img.freepik.com/free-photo/document-marketing-strategy-business-concept_53876-133729.jpg?t=st=1720635907~exp=1720639507~hmac=330a72147b1500a2bef9847a94b35699a967196e15693c5569f5bd6bf9619ec1&w=2000"
            alt="Marketing Career Path"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">Marketing Path</h3>
            <p>
              Dive into the dynamic world of marketing with courses that cover
              digital marketing, strategy, and analytics.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Explore All Paths
        </button>
      </div>
    </section>
  );
}

export default Career;
