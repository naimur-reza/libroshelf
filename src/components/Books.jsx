import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Loading from "./Loading";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(
        `https://gutendex.com/books?search=${debouncedSearch}&topic=${filter}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [debouncedSearch, filter]);

  console.log(debouncedSearch, loading);

  return (
    <div className="mt-10 max-w-6xl mx-auto">
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search books"
        className="my-5 px-4 py-3 border border-gray-700/80 rounded-full caret-blue-500 text-gray-200"
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {books?.results?.map((book) => (
            <BookCard key={book.id} bookData={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
