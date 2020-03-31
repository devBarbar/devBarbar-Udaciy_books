import { useEffect, useState, useDebugValue } from "react";
import * as BooksAPI from "./BooksAPI";
async function getBooks() {
  let res = await BooksAPI.getAll();
  return res;
}
export const useBooks = function() {
  const [books, setBooks] = useState(null);
  useEffect(() => {
    getBooks().then(res => {
      let result = res.reduce(function(h, obj) {
        h[obj.shelf] = (h[obj.shelf] || []).concat(obj);
        return h;
      }, {});
      setBooks(result);
    });
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);
  useDebugValue(books);

  return [books, setBooks];
};
