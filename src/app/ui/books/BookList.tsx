import BookCard from "./BookCard";

const BookList = ({ books }) => {
  console.log('Books:', books);

  return (
    <div className="flex flex-wrap p-2 justify-center gap-2">
      {Array.isArray(books) ? (
        books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookList;
