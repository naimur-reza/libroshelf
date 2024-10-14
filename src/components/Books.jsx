import { useState, useEffect } from "react";
import BookCard from "./BookCard";
// import Loading from "./Loading";
import SearchAndFilter from "./SearchAndFilter";

const Books = () => {
  const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(true);
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

  console.log(books);

  return (
    <div className="  max-w-6xl mx-auto max-lg:px-3">
      <h1 className="text-3xl lg:text-4xl font-extrabold my-8 lg:my-16  text-center text-gray-200 uppercase ">
        Book Explorer
      </h1>

      <SearchAndFilter setFilter={setFilter} setSearch={setSearch} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {books?.results?.map((book) => (
          <BookCard key={book.id} bookData={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
