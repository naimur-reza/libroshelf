import { useState, useEffect, useRef, useCallback } from "react";
import BookCard from "./BookCard";
import SearchAndFilter from "./SearchAndFilter";
import Pagination from "./Pagination";
import Loading from "./ui/Loading";
import { fetchBooksAPI } from "../api/fetchBooks";
import { animateBooks } from "./Animation/animateBooks";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const paginationRef = useRef(null);
  const cardContainerRef = useRef(null);
  const searchFilterRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(
    () => Number(localStorage.getItem("currentPage")) || 1
  );
  const [search, setSearch] = useState(
    () => localStorage.getItem("search") || ""
  );
  const [filter, setFilter] = useState(
    () => localStorage.getItem("filter") || ""
  );

  const fetchBooks = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const data = await fetchBooksAPI(search, filter, currentPage);
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [search, filter, currentPage]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("filter", filter);
    localStorage.setItem("currentPage", currentPage.toString());
  }, [search, filter, currentPage]);

  animateBooks(cardContainerRef, searchFilterRef, books); // Use animations

  const handleNext = () => {
    if (!books?.next) return;
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!books?.previous) return;
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="max-w-6xl mx-auto max-lg:px-3">
      <SearchAndFilter
        search={search}
        setFilter={setFilter}
        setSearch={setSearch}
        onSearch={() => setCurrentPage(1)}
      />

      {error && (
        <p className="text-red-500 text-center my-4" role="alert">
          Error: {error}
        </p>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <div
          ref={cardContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3"
          aria-live="polite"
        >
          {books?.results?.map((book) => (
            <div key={book.id} className="book-card">
              <BookCard bookData={book} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && books?.results && (
        <div ref={paginationRef}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(books.count / 32)}
            onPrevClick={handlePrev}
            onNextClick={handleNext}
          />
        </div>
      )}
    </div>
  );
};

export default Books;
