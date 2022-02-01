import React from "react";
import Link from "next/link";
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
      <h1>Delete</h1>
      <ul>
        {books &&
          books.map((book, index) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <button onClick={(e) => handleClick(e, book.id)}>削除</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Delete;
