export const setBooks = (store, result) => {
  const books = result;
  store.setState({ books });
};
