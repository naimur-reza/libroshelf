/* eslint-disable react/prop-types */
const BookCard = ({ bookData }) => {
  const { title, formats, authors, name, genre, id } = bookData;

  console.log(bookData);

  return (
    <div key={id} className="border border-gray-700/80 p-4 h-96">
      {/* <h1>Name:{name}</h1> */}
      {/* <h1>Genre:{genre}</h1> */}
      {/* <h1>Authors:{authors.map((auth) => auth.name)}</h1> */}
      <img
        className="w-full h-full"
        src={formats["image/jpeg"]}
        alt="book_cover"
      />
    </div>
  );
};

export default BookCard;
