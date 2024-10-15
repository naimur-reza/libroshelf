import { useState, useEffect, useRef, useCallback } from "react";
import BookCard from "./BookCard";
import SearchAndFilter from "./SearchAndFilter";
import Pagination from "./Pagination";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "./ui/Loading";
gsap.registerPlugin(ScrollTrigger);

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
    const url = `https://gutendex.com/books?search=${search}&topic=${filter}&page=${currentPage}`;

    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
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

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardContainerRef.current,
        start: "top bottom-=100",
        toggleActions: "play pause resume pause",
      },
    });

    tl.from(searchFilterRef.current, {
      delay: 2,
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.utils.toArray(".book-card").forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.3,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.3,
          scrollTrigger: {
            trigger: card,
            start: "top 65%",
            end: "bottom 20%",
            toggleActions: "play pause resume pause",
          },
        }
      );
    });
  }, [books]);

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
