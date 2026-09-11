import { Router } from "express";
import { getBooks, createBook, updateBook, deleteBook, getBookById } from "../controllers/books.js";

 const router = Router();

 router.get("/", getBooks);
 router.get("/:id", getBookById)
 router.post("/", createBook);
 router.patch("/:id", updateBook);
 router.delete("/:id", deleteBook);

 export default router;