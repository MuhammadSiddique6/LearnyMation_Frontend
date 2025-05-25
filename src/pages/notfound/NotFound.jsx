import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4 bg-white">
      <motion.h1
        className="text-9xl font-extrabold text-gray-800 mb-4 select-none"
        animate={{ y: ["0%", "-20%", "0%"] }}  // Moves up and down
        transition={{
          duration: 0.6,
          repeat: Infinity,      // repeats forever
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-2xl text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Oops! Page not found.
      </motion.p>

      <Link
        to="/signin"
        className="px-6 py-3 bg-black !text-white rounded-lg hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
