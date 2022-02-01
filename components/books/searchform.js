import React from "react";

const SearchForm = (props) => {
  const googleBooks = "https://www.googleapis.com/books/v1/volumes?q=";

  const text = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(googleBooks + text.current.value);
    const data = await response.json();

    props.setSearch(data);
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="検索" ref={text} />
        <button type="submit">検索</button>
      </form>
    </div>
  );
};

export default SearchForm;
