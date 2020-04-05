import React, { useState, useRef } from "react";
import { search } from "./BooksAPI";
import { Book } from "./Book";
import { Link } from "react-router-dom";
import useGlobal from "./store";

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export const Search = function ({ setShowSearchPage }) {
  const [books] = useGlobal();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const input = useRef();
  const changeHandler = async () => {
    let inputValue = input.current.value;
    try {
      setLoading(true);
      let searchedBooks = await search(inputValue);
      if (searchedBooks) {
        if (typeof searchedBooks["error"] === "undefined") {
          Object.entries(books["books"]).forEach((book) => {
            book[1].forEach((book) =>
              searchedBooks.forEach((newBook) =>
                book.id === newBook.id ? (newBook.shelf = book.shelf) : null
              )
            );
          });
          setLoading(false);
          setResult(await Promise.all(searchedBooks));
          setError("");
        } else {
          setLoading(false);
          setResult([]);
          setError(`Could not Find ${inputValue}`);
        }
      } else {
        setLoading(false);
        setResult([]);
        setError("");
      }
    } catch (e) {
      console.log(e);
      if (inputValue) {
        setError("AN ERROR OCCURED");
      }
      setLoading(false);
      setResult([]);
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={throttle(changeHandler, 500)}
            ref={input}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      {!loading ? (
        <div className="search-books-results">
          <ol className="books-grid">
            {result
              ? result.map((book) => (
                  <Book key={book.id} shelf={book} data={book}></Book>
                ))
              : ""}
            {error && <h3>{error}</h3>}
          </ol>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="lds-dual-ring"></div>
        </div>
      )}
    </div>
  );
};
