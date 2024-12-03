import React from "react";

const Banner: React.FC = () => {
  return (
    <div
      className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://miro.medium.com/v2/resize:fit:1400/1*hRNYFuVLN7UfeR2uM43RrA.jpeg')`, // Update this path to your image location
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-gray-900/80"></div>

      {/* Banner Content */}
      <div className="relative max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
          Take the First Step <br /> to Learn With Us
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Unlock your potential with expertly curated courses and hands-on
          learning experiences designed to guide you to success.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/get-started"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition"
          >
            Get Started
          </a>
          <a
            href="/learn-more"
            className="px-6 py-3 bg-transparent border border-orange-500 hover:bg-orange-500 hover:text-white rounded-lg text-orange-500 font-medium transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
