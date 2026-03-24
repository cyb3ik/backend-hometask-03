import { Post } from "../models/postType"
import { Request, Response } from "express"
import { HTTPStatusCode } from "../../utils/statusCodes"
import { postsRepository } from "../postsRepository"

export const createPost = async (req: Request, res: Response) => {

    const newPost: Post = await postsRepository.createPost(req.body)

    res.status(HTTPStatusCode.CREATED).send(newPost)
}