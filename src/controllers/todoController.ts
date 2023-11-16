import {Todo} from "../models/todo";
import {Request, Response} from "express";

export class TodoController {
    async add(req: Request, res: Response) {
        try {
            const {title, description} = req.body;
            const todo = await Todo.create({title, description});

            if (!title || !description) {
                return res.status(400).json({ error: 'Title and description are required' });
            }

            return res.json({todo}).status(201);
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(req: Request,res: Response){
        try {
            const todos: Todo[] | null = await Todo.findAll();

            if(todos.length === 0){
                res.json({message: "Not found"}).status(404);
            }

            return res.json({todos}).status(200);
        }catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getOne(req: Request, res: Response){
        const id = req.params.id;
        try{
            const todo: Todo | null = await Todo.findOne({
                where: {id: id},
            });

            if (todo === null){
                res.json({message: `Not found todo with ${id} id`}).status(404);
            }

            res.json({todo}).status(200);
        }catch (e){
            res.json({message: `Error`}).status(400);
        }
    }

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const title: string | null = req.body.title;
        const description: string | null = req.body.description;

        try {
            if (!id) {
                return res.status(400).json({ message: 'ID is required for updating todo' });
            }

            if (title === null && description === null) {
                return res.status(400).json({ message: 'Title or description is required for updating todo' });
            }


            const updatedTodo: [number, Todo[]] = await Todo.update(
                { title, description },
                { where: { id }, returning: true }
            );


            if (updatedTodo[0] === 0) {
                return res.status(404).json({ message: `Todo with ID ${id} not found` });
            }

            const updatedRecord = updatedTodo[1][0];

            return res.status(200).json({ message: 'Todo updated successfully', todo: updatedRecord });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response){
        const id = req.params.id;
        try{
            if (!id) {
                return res.status(400).json({ message: 'ID is required for updating todo' });
            }

            const deletedTodo = await Todo.destroy(
                { where: { id }}
            );

            if(deletedTodo){
                res.json({message: 'Deleted successfully'}).status(201);
            }else{
                res.json({message: 'Not found'}).status(404);
            }
        }catch (e){
            console.log(e);
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

}