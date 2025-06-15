import React, { useState } from 'react';
import { FaRocket } from 'react-icons/fa6';

const ReviewPage = () => {
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && review) {
      alert(`Review submitted by ${email}\nTag: ${tag || 'None'}\nReview: ${review}`);
      setEmail('');
      setReview('');
      setTag('');
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800">
          <FaRocket /> Share Your Experience
        </h3>
        <p className="text-gray-700 mb-6">
          Let us know your thoughts about the <span className="font-semibold text-blue-600">JobSpring Job Portal</span>. 
          Your feedback helps us improve the platform for job seekers and recruiters.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Tag/Category */}
          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
              What are you reviewing?
            </label>
            <select
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select a tag --</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Job Listings">Job Listings</option>
              <option value="Performance">Performance</option>
              <option value="Support">Support</option>
              <option value="Features">Features</option>
            </select>
          </div>

          {/* Review */}
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review"
              rows="5"
              placeholder="Share your thoughts..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
