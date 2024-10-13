import { useState } from "react";
import { useEffect } from "react";
import BookCard from "./BookCard";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gutendex.com/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="mt-10 grid grid-cols-4 gap-3 max-w-6xl mx-auto">
      {books &&
        books?.results?.map((book) => (
          <BookCard key={book.id} bookData={book} />
        ))}
    </div>
  );
};

export default Books;
