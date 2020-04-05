import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Shelf } from "./Shelf";
import { Search } from "./Search";
import { BrowserRouter } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import useGlobal from "./store";
async function getBooks() {
  let res = await BooksAPI.getAll();
  return res;
}
/**
 * @description Takes the result from the API and generates an object where the Keys == Shelf
 * @param {object} books
 * @returns {object} Sum of a and b
 */
export function sortBooks(books) {
  return books.reduce(function (h, obj) {
    h[obj.shelf] = (h[obj.shelf] || []).concat(obj);
    return h;
  }, {});
}

const App = () => {
  const [state, actions] = useGlobal();
  const [isLoading, setIsLoading] = useState(true);
  const hasBooks = state.books && true;

  useEffect(() => {
    getBooks().then((res) => {
      // Categorize the books into the three shelfs from the beginning
      let booksInShelf = sortBooks(res);
      actions.setBooks(booksInShelf);
    });
  }, [actions]);

  useEffect(() => {
    // loading animation
    hasBooks && setIsLoading(false);
  }, [state, hasBooks]);

  return (
    <BrowserRouter>
      <div className="app">
        <Route path="/search">
          <Search></Search>
        </Route>
        {!isLoading ? (
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
                    <Shelf title="Currently Reading">
                      {hasBooks && state.books["currentlyReading"]}
                    </Shelf>
                    <Shelf title="Want to Read">
                      {hasBooks && state.books["wantToRead"]}
                    </Shelf>
                    <Shelf title="Read">
                      {hasBooks && state.books["read"]}
                    </Shelf>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button />
                  </Link>
                </div>
              </div>
            )}
          />
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
    </BrowserRouter>
  );
};

export default App;
