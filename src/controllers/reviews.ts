import mongoose from "mongoose";
import type { Request, Response } from "express";
import Review from "../models/review.js";

export const createReview = async (req: Request, res: Response) => {
    const { bookId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(String(bookId))) {
        return res.status(400).send({ message: "ID inválido" });
    }
    const review = await Review.create({
        text: req.body.text,
        rating: req.body.rating,
        book: bookId,
    })
    res.status(201).send(review);
};

export const getReviews = async (req: Request, res: Response) => {
    const reviews = await Review.find({}).populate("book");
    res.status(200).send(reviews);
};
