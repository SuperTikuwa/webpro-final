import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/.bookinfo.module.scss";
import { parseCookies } from "nookies";
import Router from "next/router";

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
  if (typeof window !== "undefined") {
    if (
      cookies.userID === undefined ||
      cookies.userID === null ||
      cookies.userID === "undefined"
    ) {
      Router.push("/mypage/auth");
    }
  }

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

  console.log(book);

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
      <div className={styles.lendContainer}>
        {book.status !== "" ? (
          <p className={styles.statusText}>{book.status}に貸出中です</p>
        ) : (
          <button
            className={styles.lend}
            onClick={(e) => handleClick(e, book_id)}
          >
            借りる
          </button>
        )}
      </div>
    </div>
  );
};

export default BookInfo;
