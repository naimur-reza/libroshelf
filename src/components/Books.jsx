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
    try {
      fetch(
        `https://gutendex.com/books?search=${debouncedSearch}&topic=${filter}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearch, filter]);

  console.log(debouncedSearch, loading);
  console.log(books);

  return (
    <div className="mt-10 max-w-6xl mx-auto">
      <div className="flex items-center space-x-1.5">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search books"
          className="my-5 px-4 py-3 border border-gray-700/80 caret-blue-500 text-gray-200 w-1/2"
        />
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-3 border border-gray-700/80 caret-blue-500 text-gray-200 rounded-r"
        >
          <option value="">All</option>
          <option value="children">Children</option>
          <option value="drama">Drama</option>
          <option value="fiction">Fiction</option>
          <option value="history">History</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {books?.results?.map((book) => (
          <BookCard key={book.id} bookData={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
