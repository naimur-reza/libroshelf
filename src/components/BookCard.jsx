/* eslint-disable react/prop-types */
import { Hash } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const BookCard = ({ bookData }) => {
  const { title, formats, authors, subjects, id } = bookData;
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const coverImage =
    formats["image/jpeg"] ||
    "https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg";

  const authorName = authors?.length ? authors[0].name : "Unknown Author";

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isBookInWishlist = wishlist.some((book) => book.id === id);

    if (isBookInWishlist) {
      const updatedWishlist = wishlist.filter((book) => book.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    } else {
      const updatedWishlist = [...wishlist, bookData];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(true);
    }
  };

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isBookInWishlist = wishlist.some((book) => book.id === id);
    setIsWishlisted(isBookInWishlist);
  }, [id]);

  return (
    <div
      key={id}
      className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/70 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        loading="lazy"
        className="w-full   object-cover transition-transform duration-300 transform hover:scale-105"
        src={coverImage}
        alt={`${title} cover`}
      />

      {/* Book ID */}
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center">
        <Hash size={12} className="mr-1" />
        <span>{id}</span>
      </div>

      {/* Book details */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${
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
              {subject.split(" --")[0]}
            </span>
          ))}
          {subjects.length > 2 && (
            <span className="text-gray-400 text-xs self-center">
              +{subjects.length - 2} more
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
            onClick={handleWishlist}
            className="text-gray-300 hover:text-red-500 transition-colors duration-300"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
