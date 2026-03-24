import { Blog } from "../models/blogType"
import { Request, Response } from "express"
import { HTTPStatusCode } from "../../utils/statusCodes"
import { blogsRepository } from "../blogsRepository"

export const createBlog = async (req: Request, res: Response) => {

    const newBlog: Blog = await blogsRepository.createBlog(req.body)

    res.status(HTTPStatusCode.CREATED).send(newBlog)
}