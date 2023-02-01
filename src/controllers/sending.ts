import { Request, Response } from "express"

export const todoController = (req: Request, res: Response) => {
    res.send('the todo')
}