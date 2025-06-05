import { useState } from "react";
import {
  X,
  Brain,
  Joystick,
  SortAsc,
  Puzzle,
  Eye,
  MousePointerClick,
  Palette,
  Search,
  Calculator,
  Circle,
  BookOpen,
  MoveDiagonal,
} from "lucide-react";

const gameList = [
  { title: "ABCd Orders", url: "https://toytheater.com/alphabetical-order/", icon: BookOpen },
  { title: "3D Tower Crash", url: "https://play.famobi.com/wrapper/tower-crash-3d/A1000-10", icon: MoveDiagonal },
  { title: "CArs Traffic FloW", url: "https://toytheater.com/build/?category=15", icon: Joystick },
  { title: "Visual Memory Puzzle", url: "https://toytheater.com/visual-memory/", icon: Eye },
  { title: "ball SORT", url: "https://toytheater.com/ball-sort/", icon: SortAsc },
  { title: "Animation Station", url: "https://toytheater.com/animation-station/", icon: Palette },
  { title: "Fruit Falls", url: "https://toytheater.com/fruit-fall/", icon: Puzzle },
  { title: "Basketball MAths", url: "https://toytheater.com/basketball/", icon: Calculator },
  { title: "Shake and Spill", url: "https://toytheater.com/shake-and-spill/", icon: MousePointerClick },
  { title: "Circle Words", url: "https://toytheater.com/circle-word/", icon: Circle },
  { title: "Finds Hiddens Pictures", url: "https://toytheater.com/hidden-picture-classroom/", icon: Search },
  { title: "Liquid Sort", url: "https://toytheater.com/liquid-sort/", icon: SortAsc },
];

export default function GameGallery() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="p-6 bg-gradient-to-br from-pink-100 via-white to-blue-100 min-h-screen font-sans">
      <h1 className="text-5xl font-bold text-center text-pink-600 mb-10 drop-shadow">
        🎲 Fun & Learning Game Arcade
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gameList.map((game, index) => {
          const Icon = game.icon || Brain;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer p-6 flex flex-col items-center text-center border-2 border-pink-200 hover:border-blue-300"
              onClick={() => setSelectedGame(game)}
            >
              <Icon size={48} className="text-pink-500 mb-3 group-hover:text-blue-500 transition" />
              <p className="font-semibold text-lg text-blue-700">{game.title}</p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-5xl h-[85vh] mx-4 overflow-hidden border-4 border-pink-200">
            <button
              onClick={() => setSelectedGame(null)}
              className="absolute top-3 right-3 text-gray-700 hover:text-red-500 z-50"
            >
              <X size={28} />
            </button>
            <h2 className="text-2xl font-bold text-center mt-4 mb-2 text-blue-700">
              {selectedGame.title}
            </h2>
            <iframe
              src={selectedGame.url}
              title={selectedGame.title}
              className="w-full h-full rounded-b-xl border-t border-pink-300"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
