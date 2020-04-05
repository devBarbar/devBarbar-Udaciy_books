import React from "react";
import { Book } from "./Book";
/**
 * @description Represents a Shelf in The App
 * @constructor
 * @param {string} title - The Title of the Shelf
 * @param {Object} children - The books as an Object
 */
export const Shelf = function ({ title, children, ...props }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      {children ? (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {children.map((book) => (
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
