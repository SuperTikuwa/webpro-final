import SearchForm from "../../components/books/searchform";
import React from "react";
import Link from "next/link";

const BookAdd = () => {
  const [search, setSearch] = React.useState([]);

  const handleClick = async (e, index) => {
    e.preventDefault();
    console.log(search[index]);
    const response = await fetch(process.env.API_ORIGIN + "/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: search.items[index].volumeInfo.title,
        authors: search.items[index].volumeInfo.authors.join(","),
        publishedYear:
          search.items[index].volumeInfo.publishedDate.split("-")[0],
        thumbnail: search.items[index].volumeInfo.imageLinks.thumbnail,
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
