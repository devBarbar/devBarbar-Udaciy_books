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
const BooksApp = () => {
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  const [state, actions] = useGlobal();
  const [isLoading, setIsLoading] = useState(true);
  const hasBooks = state.books && true;
  useEffect(() => {
    getBooks().then(res => {
      let result = res.reduce(function(h, obj) {
        h[obj.shelf] = (h[obj.shelf] || []).concat(obj);
        return h;
      }, {});
      actions.setBooks(result);
    });
  }, []);
  useEffect(() => {
    console.log(state);
    hasBooks && setIsLoading(false);
  }, [state]);

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
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            )}
          />
        ) : (
          "...loading"
        )}
      </div>
    </BrowserRouter>
  );
};

export default BooksApp;
