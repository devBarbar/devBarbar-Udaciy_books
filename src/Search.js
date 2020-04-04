import React, { useState, useEffect, useRef } from "react";
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
  const [runSearch, setSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [books, setBooks] = useGlobal();
  const [result, setResult] = useState(null);
  const input = useRef();
  useEffect(() => {
    const doSearch = async () => {
      try {
        console.log(input.current.value);
        if (input.current.value === "") {
          setResult([]);
          return;
        }
        let res = await search(input.current.value);

        Object.entries(books["books"]).forEach((book) => {
          book[1].forEach((book) =>
            res.forEach((newBook) =>
              book.id === newBook.id ? (newBook.shelf = book.shelf) : null
            )
          );
        });

        setResult(await res);
        setIsSearching(false);
      } catch (e) {
        setResult([]);
      }
    };

    doSearch();

    return () => {
      setIsSearching(false);
      setSearch(false);
    };
  }, [runSearch]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input
            onChange={(e) => throttle(setSearch(true), 1000)}
            ref={input}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {result
            ? result.map((book) => (
                <Book
                  key={book.id}
                  shelf={console.log(book)}
                  data={book}
                ></Book>
              ))
            : ""}
        </ol>
      </div>
    </div>
  );
};
