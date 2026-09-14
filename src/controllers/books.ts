import mongoose from "mongoose";
import type { Request, Response } from "express";
import Book from "../models/book.js";

export const getBooks = async (req: Request, res: Response) => {
    const books = await Book.find({});
    res.send(books);
};

export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
        return res.status(400).send({ message: "ID inválido" });
    }
    const book = await Book.findById(id);
    res.send(book);
};

export const createBook = async (req: Request, res: Response) => {
    const book = await Book.create({
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
        tags: req.body.tags,
    });
    res.status(201).send(book);
};

export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
        return res.status(400).send({ message: "ID inválido" });
    }
    const book = await Book.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title },
        { new: true, runValidators: true },
    );
    res.status(200).send(book);
};

export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
        return res.status(400).send({ message: "ID inválido" });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        return res.status(404).send({message: "Libro no encontrado"});
    };
    res.send(book);
};