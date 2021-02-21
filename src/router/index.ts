import SearchBook from "../pages/SearchBook.svelte";
import BookDetail from "../pages/BookDetail.svelte";

export const routes = {
  "/": SearchBook,
  "/books/:id": BookDetail,
};
