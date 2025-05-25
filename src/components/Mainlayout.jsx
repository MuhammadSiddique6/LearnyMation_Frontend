// components/MainLayout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-4 px-4">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
