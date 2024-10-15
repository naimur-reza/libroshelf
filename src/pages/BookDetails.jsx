import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Loader2 from "../components/ui/Loader2";

const BookDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some((book) => book.id === Number(id));
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://gutendex.com/books?ids=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookData(data.results[0]);
        setIsLoading(false);
      })
      .catch(() => {
        setError("An error occurred while fetching the book details.");
        setIsLoading(false);
      });
  }, [id]);

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isBookInWishlist = wishlist.some((book) => book.id === Number(id));
    let updatedWishlist;
    if (isBookInWishlist) {
      updatedWishlist = wishlist.filter((book) => book.id !== Number(id));
      setIsWishlisted(false);
    } else {
      updatedWishlist = [...wishlist, bookData];
      setIsWishlisted(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (isLoading) {
    return <Loader2 />;
  }

  if (error) {
    return <div className="text-center text-red-500 py-5">{error}</div>;
  }

  if (!bookData) {
    return (
      <div className="text-center text-gray-200">
        No book details available.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r p-8 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            className="w-48 h-72 object-cover rounded mb-4 md:mb-0 md:mr-6 shadow-lg"
            src={
              bookData?.formats["image/jpeg"] ||
              "https://via.placeholder.com/150"
            }
            alt={`${bookData?.title} cover`}
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-200 mb-2">
              {bookData?.title}
            </h1>
            <p className="text-lg text-gray-400 mb-4 italic">
              By {bookData?.authors.map((author) => author.name).join(", ")}
            </p>
            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
              {bookData?.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-sm shadow-md"
                >
                  {subject}
                </span>
              ))}
            </div>
            <p className="text-gray-400 mb-2">ID: {bookData?.id}</p>
            <p className="text-gray-400 mb-2">
              Languages: {bookData?.languages.join(", ")}
            </p>
            <p className="text-gray-400 mb-2">
              Download Count: {bookData?.download_count}
            </p>
            <div className="flex gap-3 justify-between items-center">
              <Link to="/">
                <button className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-all">
                  Back to Home
                </button>
              </Link>
              <button
                onClick={handleWishlist}
                className="text-red-500 hover:text-red-700 transition-all"
              >
                {isWishlisted ? (
                  <FaHeart size={30} />
                ) : (
                  <FaRegHeart size={30} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
