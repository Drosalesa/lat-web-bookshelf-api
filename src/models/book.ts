import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  genre: {
    type: String,
    required: true,
    enum: ["fiction", "non-fiction", "biography", "science", "history"],
  },
  year: {type: Number},
  tags: [{type: String, minlength: 2, maxlength: 20}],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }]
});

const Book = mongoose.model("Book", bookSchema);

export default Book;