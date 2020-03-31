import React from "react";
import { Book } from "./Book";
export const Shelf = function({ id, title, children, ...props }) {
  console.log(children);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      {children ? (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {children.map(book => (
              <li key={book.id}>
                <Book data={book}></Book>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
