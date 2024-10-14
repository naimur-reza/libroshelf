import { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";

import LoadingBar from "react-top-loading-bar";
import SearchAndFilter from "./SearchAndFilter";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const loadingBarRef = useRef(null);

  const [search, setSearch] = useState(() => {
    return localStorage.getItem("search") || "";
  });
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "";
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // Save search and filter to localStorage when they change
  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  useEffect(() => {
    try {
      loadingBarRef.current.continuousStart();
      fetch(
        `https://gutendex.com/books?search=${debouncedSearch}&topic=${filter}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
          loadingBarRef.current.complete();
        });
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearch, filter]);

  console.log(books);

  return (
    <div className="max-w-6xl mx-auto max-lg:px-3">
      <LoadingBar color="#f11946" ref={loadingBarRef} />

      <h1 className="text-3xl lg:text-4xl font-extrabold my-8 lg:my-16 text-center text-gray-200 uppercase">
        Book Explorer
      </h1>

      <SearchAndFilter setFilter={setFilter} setSearch={setSearch} />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {books?.results?.map((book) => (
          <BookCard key={book.id} bookData={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
