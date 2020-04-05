import React, { useEffect, useRef } from "react";
import { getAll, update } from "./BooksAPI";
import useGlobal from "./store";
import { sortBooks } from "./App";
/**
 * @description Represents the Change Menu for each Book
 * @constructor
 * @param {object} book - the whole book data
 * @param {string} shelf - the current shelf of the book
 */
const BookShelfChanger = function ({ book, shelf }) {
  const [, actions] = useGlobal();
  const selected = useRef(null);

  const updateHandler = (value) => {
    update(book, value).then((res) => {
      getAll().then((res) => {
        let result = sortBooks(res);
        actions.setBooks(result);
      });
    });
  };

  useEffect(() => {
    // Set the selected value to the matching shelf or to none
    selected.current.value = shelf || "none";
  }, [shelf]);
  return (
    <div className="book-shelf-changer">
      <select ref={selected} onChange={(e) => updateHandler(e.target.value)}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

/**
 * @description Represents each Book
 * @constructor
 * @param {object} data - The data of the book from the API
 */

export const Book = function ({ data }) {
  const { imageLinks, title, authors, shelf } = data;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks && imageLinks.thumbnail})`,
          }}
        ></div>
        <BookShelfChanger book={data} shelf={shelf}></BookShelfChanger>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.join(", ")}</div>
    </div>
  );
};
