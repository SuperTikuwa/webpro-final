import Link from "next/link";
import React from "react";
import styles from "../../styles/.booklist.module.scss";

const BookList = () => {
  const [books, setBooks] = React.useState([]);

  const fetchBooks = async () => {
    const response = await fetch(process.env.API_ORIGIN + "/books");

    const data = await response.json();
    setBooks(data);
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2 className={styles.title}>BookList</h2>
      <ul className={styles.list}>
        {books.map((book) => (
          <h2 key={book.id}>
            <Link href={"/books/" + book.id}>{book.title}</Link>
          </h2>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
