import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
    <div className="min-h-screen bg-green-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-4">
          At LearnyMation, your privacy is very important to us. This policy explains what data we collect and how we use it.
        </p>

        <h2 className="text-xl font-semibold text-green-500 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect basic details like name, age, and device information to improve learning experiences. We do not collect sensitive personal information.
        </p>

        <h2 className="text-xl font-semibold text-green-500 mb-2">2. How We Use Information</h2>
        <p className="mb-4">
          Your information helps us improve the app and provide personalized content. We never sell or share your data.
        </p>

        <h2 className="text-xl font-semibold text-green-500 mb-2">3. Children's Privacy</h2>
        <p className="mb-4">
          We comply with COPPA and similar child protection laws. Parents can contact us to review or delete their child's data.
        </p>

        <h2 className="text-xl font-semibold text-green-500 mb-2">4. Security</h2>
        <p className="mb-4">
          We use secure methods to store and protect your data from unauthorized access.
        </p>

        <h2 className="text-xl font-semibold text-green-500 mb-2">5. Contact Us</h2>
        <p className="mb-4">
          Questions? Email us at <a href="mailto:privacy@learnymation.com" className="text-green-600 underline">privacy@learnymation.com</a>.
        </p>
      </div>
    </div>
    <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">© 2025 Learnymation. All rights reserved.</p>
        </div>
      </footer>
      </>
  );
};

export default PrivacyPolicy;
