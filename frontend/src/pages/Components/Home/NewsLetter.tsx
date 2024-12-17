import React, { useState } from 'react';

const NewsletterSubscribe: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement subscription logic here
    console.log("Subscribed with email:", email);
    alert('Thank you for subscribing!');
    setEmail(''); // Reset email input after subscribing
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-8">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-gray-300 text-center">
          Get the latest updates and offers directly to your email. Join our newsletter today!
        </p>
        <form onSubmit={handleSubscribe} className="w-full max-w-lg">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Enter your email address"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
