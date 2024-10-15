/* eslint-disable react/prop-types */
import { Hash, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const WishlistCard = ({ bookData, removeFromWishlist }) => {
  const { title, formats, authors, subjects, id } = bookData;
  const [isHovered, setIsHovered] = useState(false);

  const coverImage = formats["image/jpeg"] || "https://via.placeholder.com/150";
  const authorName = authors?.length ? authors[0].name : "Unknown Author";

  return (
    <div
      key={id}
      className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/books/${id}`}>
        <img
          className="w-full  transition-transform duration-300 transform hover:scale-105 cursor-pointer"
          src={coverImage}
          alt={`${title} cover`}
        />
      </Link>

      {/* Book ID */}
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center">
        <Hash size={12} className="mr-1" />
        <span>{id}</span>
      </div>

      {/* Book details */}
      <div
        className={`absolute bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-90"
        }`}
      >
        <h1 className="text-white text-lg font-bold mb-1 line-clamp-2">
          {title}
        </h1>

        <p className="text-gray-300 text-sm mb-2">By {authorName}</p>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1 mb-3">
          {subjects.slice(0, 3).map((subject, index) => (
            <span
              key={index}
              className="text-xs bg-gray-700/80 text-gray-300 rounded-full px-2 py-1"
            >
              {subject}
            </span>
          ))}
          {subjects.length > 3 && (
            <span className="text-gray-400 text-xs self-center">
              +{subjects.length - 3} more
            </span>
          )}
        </div>

        {/* wishlist hover button */}
        <div
          className={`flex justify-end items-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => removeFromWishlist(id)}
            className="mt-3 flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 text-sm text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            <Trash2 size={18} className="mr-2" />
            Remove from wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
