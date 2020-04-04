import React, { useEffect, useRef } from "react";
import { getAll, update } from "./BooksAPI";
import useGlobal from "./store";
const BookShelfChanger = function ({ book, shelf }) {
  const [, actions] = useGlobal();
  const selected = useRef(null);

  const updateHandler = (value) => {
    update(book, value).then((res) => {
      getAll().then((res) => {
        let result = res.reduce(function (h, obj) {
          h[obj.shelf] = (h[obj.shelf] || []).concat(obj);
          return h;
        }, {});
        actions.setBooks(result);
      });
    });
  };

  useEffect(() => {
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
