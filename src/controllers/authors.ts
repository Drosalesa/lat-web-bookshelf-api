import type { Request, Response } from "express";
import Author from "../models/author.js";

// CREATE
export const createAuthor = async (req: Request, res: Response) => {
    const author = await Author.create({ name: req.body.name, bio: req.body.bio});
    res.status(201).send(author);
}

// READ
export const getAuthors = async (req: Request, res: Response) => {
    const authors = await Author.find({});
    res.send(authors);
}

export const getAuthorbyId = async (req: Request, res: Response) => {
    const author = await Author.findById(req.params.id);
    res.send(author);
}

// UPDATE
export const updateAuthor = async (req: Request, res: Response) => {
    const author = await Author.findByIdAndUpdate(
        req.params.id,
        {bio: req.body.bio},
        { new: true, runValidators: true},
    );
    res.send(author);
}

// DELETE
export const deleteAuthor = async (req: Request, res: Response) => {
    const author = await Author.findByIdAndDelete(req.params._id);
    if (!author) {
        return res.status(404).send({message: "Autor no encontrado"})
    }
    res.send(author);
}