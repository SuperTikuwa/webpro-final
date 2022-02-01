import Link from "next/link";
import styles from "../../styles/.menu.module.scss";
import { parseCookies } from "nookies";
import Router from "next/router";
import React from "react";

const MyPage = () => {
  const cookies = parseCookies();

  if (typeof window !== "undefined") {
    if (cookies.userID === "undefined") {
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
      <h1>MyPage</h1>
      <ul>
        {lendings &&
          lendings.map((lending) => (
            <li key={lending.id}>
              <p>{lending.title}</p>
              <button
                onClick={(e) => {
                  handleClick(e, lending.id);
                }}
              >
                返却
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyPage;
