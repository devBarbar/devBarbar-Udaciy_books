import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Shelf } from "./Shelf";
import { Search } from "./Search";
import { BrowserRouter } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import { useBooks } from "./hooks";
async function getBooks() {
  let res = await BooksAPI.getAll();
  return res;
}
const BooksApp = () => {
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  const [books, setBooks] = useBooks();

  return (
    <BrowserRouter>
      <div className="app">
        <Route path="/search">
          <Search></Search>
        </Route>
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {books && (
                    <>
                      <Shelf title="Currently Reading">
                        {Object.values(books)[0]}
                      </Shelf>
                      <Shelf title="Want to Read">
                        {Object.values(books)[1]}
                      </Shelf>
                      <Shelf title="Read">{Object.values(books)[2]}</Shelf>
                    </>
                  )}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    </BrowserRouter>
  );
};

export default BooksApp;
