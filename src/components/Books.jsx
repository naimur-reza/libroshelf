import { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";

import LoadingBar from "react-top-loading-bar";
import SearchAndFilter from "./SearchAndFilter";
import Pagination from "./Pagination";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const loadingBarRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(localStorage.getItem("currentPage")) || 1;
  });
  const [search, setSearch] = useState(() => {
    // pagination

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

  const url = `https://gutendex.com/books?search=${debouncedSearch}&topic=${filter}&page=${currentPage}`;

  useEffect(() => {
    try {
      loadingBarRef.current.continuousStart();
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
          loadingBarRef.current.complete();
        });
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearch, filter, currentPage, url]);

  return (
    <div className="max-w-6xl mx-auto max-lg:px-3 lg:pt-28 pt-24">
      <LoadingBar color="#ECDFCC" ref={loadingBarRef} />

      <h1 className="text-4xl font-extrabold text-center mt-8 mb-14">
        <span className="text-white uppercase  ">Explore Latest Books</span>
      </h1>

      <SearchAndFilter
        search={search}
        setFilter={setFilter}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {books?.results?.map((book) => (
          <BookCard key={book.id} bookData={book} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPrevClick={() => {
          setCurrentPage((prev) => prev - 1);
          localStorage.setItem("currentPage", currentPage - 1);
        }}
        onNextClick={() => {
          setCurrentPage((prev) => prev + 1);
          localStorage.setItem("currentPage", currentPage + 1);
        }}
        key={1}
      />
    </div>
  );
};

export default Books;
