import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/.bookinfo.module.scss";
import { parseCookies } from "nookies";

const BookInfo = () => {
  const router = useRouter();
  const { book_id } = router.query;

  const [book, setBook] = React.useState({});

  const fetchBook = async () => {
    const response = await fetch(process.env.API_ORIGIN + "/books/" + book_id);
    const data = await response.json();
    setBook(data);
  };

  React.useEffect(() => {
    fetchBook();
  }, []);

  const cookies = parseCookies();

  console.log(cookies);

  const handleClick = async (e, bookID) => {
    e.preventDefault();
    const response = await fetch(
      process.env.API_ORIGIN +
        "/lendings?book_id=" +
        bookID +
        "&user_id=" +
        cookies.userID,
      {
        method: "POST",
      }
    );

    if (response.status === 201) {
      alert("借りることが完了しました。");
      fetchBook();
    }
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h2>{book.title}</h2>

          <div className={styles.subinfo}>
            <p>{book.authors}</p>
            <p>{book.publishedYear}</p>
          </div>
        </div>
        <img className={styles.thumbnail} src={book.thumbnail} />
      </div>
      <p>{book.status}</p>
      <button onClick={(e) => handleClick(e, book_id)}>借りる</button>
    </div>
  );
};

export default BookInfo;
