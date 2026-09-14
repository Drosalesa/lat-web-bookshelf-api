import express from 'express';
import mongoose from "mongoose";
import bookRoutes from "./routes/books.js";
import reviewRoutes from "./routes/reviews.js"

mongoose.connect("mongodb://127.0.0.1:27017/bookshelfdb")
.then(() => {
  console.log("Conectado a MongoDB");
})
.catch((err) => {
  console.log("Error de conexión", err);
});

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
