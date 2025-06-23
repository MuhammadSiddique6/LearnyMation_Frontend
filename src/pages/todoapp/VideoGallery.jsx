import { useState } from "react";
import { X } from "lucide-react"; // Optional: For close icon
import { title } from "framer-motion/client";

const videoList = [
  { title: "Fruit Animation", path: "/videos/animation1/Fruit_10001-1410.mp4" },
  { title: "Animal Animation", path: "/videos/animation1/voice.mp4" },
  { title: "Bus Animation", path: "/videos/animation1/truck.mp4" },
  { title: "Clap Animation", path: "/videos/animation1/clap.mp4" },
  { title: "ABC Animation", path: "/videos/animation1/ABC.mp4" },
  { title: "Finger Animation", path: "/videos/animation1/finger.mp4" },
  { title: "Sunny Spider Aniamtion", path: "/videos/animation1/octopus.mp4" },
  { title: "123 Animation", path: "/videos/animation1/123.mp4" },
  // Add more videos as needed
];

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="p-6 bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
        🍿 Animation <span className="text-4xl font-bold text-center text-indigo-700">Video</span> <span className="text-4xl font-bold text-center text-green-700">Gallery</span>
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videoList.map((video, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer overflow-hidden"
            onClick={() => setSelectedVideo(video)}
          >
            <video
              className="w-full h-40 object-cover"
              muted
              loop
              autoPlay
              playsInline
            >
              <source src={video.path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-4">
              <p className="text-lg font-semibold text-black">{video.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal View */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 p-4">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
            >
              <X size={28} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-indigo-700">
              {selectedVideo.title}
            </h2>
            <video width="100%" height="auto" controls autoPlay className="rounded-md">
              <source src={selectedVideo.path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
