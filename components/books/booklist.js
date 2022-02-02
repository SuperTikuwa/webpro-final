import Link from "next/link";
import React from "react";
import styles from "../../styles/.booklist.module.scss";

const BookList = () => {
  const [books, setBooks] = React.useState([]);
  const [text, setText] = React.useState("");
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
      <h2 className={styles.pageTitle}>BookList</h2>
      <div className={styles.search}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="検索"
        />
      </div>
      <ul className={styles.list}>
        {books.map((book) =>
          book.title.toLowerCase().includes(text.toLowerCase()) ? (
            <h2 key={book.id}>
              <Link href={"/books/" + book.id}>{book.title}</Link>
            </h2>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default BookList;
