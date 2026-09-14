import { Router } from "express";
import { getBooks, createBook, updateBook, deleteBook, getBookById } from "../controllers/books.js";

 const bookRoutes = Router();

 bookRoutes.get("/", getBooks);
 bookRoutes.get("/:id", getBookById)
 bookRoutes.post("/", createBook);
 bookRoutes.patch("/:id", updateBook);
 bookRoutes.delete("/:id", deleteBook);

 export default bookRoutes;