import React from "react";

const TermsAndConditions = () => {
  return (
    <>
    <div className="min-h-screen bg-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 mb-4">
          Welcome to BrightKids! By using our app, you agree to follow these terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold text-blue-500 mb-2">1. Usage</h2>
        <p className="mb-4">
          This app is designed for children aged 2 to 8. Parents or guardians must supervise their child’s use of the app.
        </p>

        <h2 className="text-xl font-semibold text-blue-500 mb-2">2. Content</h2>
        <p className="mb-4">
          All content is child-friendly and educational. You agree not to copy or redistribute any part of the app without permission.
        </p>

        <h2 className="text-xl font-semibold text-blue-500 mb-2">3. Account & Access</h2>
        <p className="mb-4">
          You may need to provide basic information to use some features. We respect your privacy and ensure your data is protected.
        </p>

        <h2 className="text-xl font-semibold text-blue-500 mb-2">4. Updates</h2>
        <p className="mb-4">
          We may update our app to improve performance or add new features. Continued use means you agree to future updates.
        </p>

        <h2 className="text-xl font-semibold text-blue-500 mb-2">5. Contact</h2>
        <p className="mb-4">
          For questions, contact us at <a href="mailto:support@brightkids.com" className="text-blue-600 underline">support@learnymation.com</a>.
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

export default TermsAndConditions;
