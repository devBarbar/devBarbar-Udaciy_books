import { useEffect, useState, useCallback } from "react";
import * as BooksAPI from "./BooksAPI";
/* async function getBooks() {
  let res = await BooksAPI.getAll();
  return res;
}
export const useBooks = function() {
  const [books, setBooks] = useState(null);
  const [reloaded, setreloaded] = useState(false);
  const forceUpdate = useCallback(() => setreloaded(!reloaded), []);
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
    forceUpdate();
  }, [books]);
  return [books, setBooks, reloaded];
};
 */
function setState(newState) {
  this.state = { ...this.state, ...newState };
  this.listeners.forEach(listener => {
    listener(this.state);
  });
}

function useCustom(React) {
  const newListener = React.useState()[1];
  React.useEffect(() => {
    this.listeners.push(newListener);
    return () => {
      this.listeners = this.listeners.filter(
        listener => listener !== newListener
      );
    };
  }, []);
  return [this.state, this.actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === "function") {
      associatedActions[key] = actions[key].bind(null, store);
    }
    if (typeof actions[key] === "object") {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useGlobalHook = (React, initialState, actions) => {
  const store = { state: initialState, listeners: [] };
  store.setState = setState.bind(store);
  store.actions = associateActions(store, actions);
  return useCustom.bind(store, React);
};

export default useGlobalHook;
