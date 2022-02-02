import styles from "../../styles/.mypage.module.scss";
import { parseCookies } from "nookies";
import Router from "next/router";
import React from "react";

const MyPage = () => {
  const cookies = parseCookies();
  console.log(cookies.userID);

  if (typeof window !== "undefined") {
    console.log(cookies.userID);
    if (
      cookies.userID === undefined ||
      cookies.userID === null ||
      cookies.userID === "undefined"
    ) {
      Router.push("/mypage/auth");
    }
  }

  const [lendings, setLendings] = React.useState([]);

  const fetchLendings = async () => {
    const response = await fetch(
      process.env.API_ORIGIN + "/users/" + cookies.userID
    );
    const data = await response.json();
    setLendings(data);
  };

  React.useEffect(() => {
    fetchLendings();
  }, []);

  const handleClick = async (e, bookID) => {
    e.preventDefault();
    const response = await fetch(
      process.env.API_ORIGIN + "/lendings?book_id=" + bookID,
      {
        method: "DELETE",
      }
    );

    if (response.status === 204) {
      alert("返却が完了しました。");
      fetchLendings();
    }
  };

  return (
    <div>
      <h2>MyPage</h2>
      <ul>
        {lendings &&
          lendings.map((lending) => (
            <li key={lending.id}>
              <div className={styles.listContainer}>
                <p>{lending.title}</p>
                <button
                  onClick={(e) => {
                    handleClick(e, lending.id);
                  }}
                >
                  返却
                </button>
              </div>
            </li>
          ))}
        {lendings.length === 0 ? (
          <div className={styles.listContainer}>
            <p>借りている本はありません。</p>
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default MyPage;
