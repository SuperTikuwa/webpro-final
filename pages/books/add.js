import SearchForm from "../../components/books/searchform";
import React from "react";
import Link from "next/link";

const BookAdd = () => {
  const [search, setSearch] = React.useState([]);

  const handleClick = async (e, index) => {
    e.preventDefault();
    console.log(search);
    const response = await fetch(process.env.API_ORIGIN + "/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: search.items[index].volumeInfo.title,
        authors:
          "authors" in search.items[index].volumeInfo
            ? search.items[index].volumeInfo.authors.join(",")
            : "",
        publishedYear:
          search.items[index].volumeInfo.publishedDate.split("-")[0],
        thumbnail:
          "imageLinks" in search.items[index].volumeInfo
            ? search.items[index].volumeInfo.imageLinks.thumbnail
            : "http://placehold.jp/24/eeeeee/999999/360x270.png?text=%E7%94%BB%E5%83%8F%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93",
      }),
    });

    if (response.status === 201) {
      alert("本の登録が完了しました。");
    } else {
      alert("本の登録に失敗しました。");
    }
  };

  return (
    <div>
      <h2>BookAdd</h2>
      <SearchForm setSearch={setSearch} />
      <ul>
        {search.items &&
          search.items.map((book, index) => (
            <li key={book.id}>
              <button onClick={(e) => handleClick(e, index)}>
                {book.volumeInfo.title}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BookAdd;
