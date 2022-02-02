import React from "react";
import styles from "../../styles/.mypage.module.scss";

const Delete = () => {
  const [books, setBooks] = React.useState([]);

  const fetchBooks = async () => {
    const response = await fetch(process.env.API_ORIGIN + "/books");
    const data = await response.json();
    setBooks(data);
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  const handleClick = async (e, id) => {
    e.preventDefault();
    const response = await fetch(process.env.API_ORIGIN + "/books?id=" + id, {
      method: "DELETE",
    });

    if (response.status === 204) {
      alert("本の削除が完了しました。");
      fetchBooks();
    } else {
      alert("本の削除に失敗しました。");
    }
  };

  return (
    <div>
      <h2>Delete</h2>
      <ul>
        {books &&
          books.map((book, index) => (
            <li key={book.id}>
              <div className={styles.listContainer}>
                <p>{book.title}</p>
                <button onClick={(e) => handleClick(e, book.id)}>削除</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Delete;
