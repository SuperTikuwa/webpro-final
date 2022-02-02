import BookList from "../../components/books/booklist";
import { parseCookies } from "nookies";
import Router from "next/router";

const Books = () => {
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
  return <BookList />;
};

export default Books;
