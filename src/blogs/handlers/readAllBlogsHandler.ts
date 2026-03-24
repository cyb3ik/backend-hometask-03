import { Request, Response } from "express"
import { HTTPStatusCode } from "../../utils/statusCodes"
import { blogsRepository } from "../blogsRepository"

export const readAllBlogs = async (req: Request, res: Response) => {

    const allBlogs = await blogsRepository.findAllBlogs()

    res.status(HTTPStatusCode.OK).send(allBlogs)
}