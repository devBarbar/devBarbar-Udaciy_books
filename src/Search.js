import React, { useState } from "react";
import { search } from "./BooksAPI";
import { Book } from "./Book";
import { Link } from "react-router-dom";
export const Search = function({ setShowSearchPage }) {
  const [result, setResult] = useState(null);
  async function doSearch(value) {
    if (value !== "") {
      let res = await search(value);
      console.log(await res);
      if (typeof res["error"] === "undefined") {
        setResult(await res);
        return res;
      } else {
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }
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
            onChange={e => doSearch(e.target.value)}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {result
            ? result.map(book => <Book data={book}></Book>)
            : "no results"}
        </ol>
      </div>
    </div>
  );
};
