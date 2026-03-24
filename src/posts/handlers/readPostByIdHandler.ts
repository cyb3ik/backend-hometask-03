import { Request, Response } from "express"
import { HTTPStatusCode } from "../../utils/statusCodes"
import { postsRepository } from "../postsRepository"
import { Post } from "../models/postType"
import { createErrorsMessages } from "../../utils/errors-utils"

export const readPostById = async (req: Request, res: Response) => {

    const foundPost: Post | null = await postsRepository.findPost(String(req.params.id))

    if (!foundPost) {
        res.status(HTTPStatusCode.NOT_FOUND)
            .send(createErrorsMessages([{ message: 'Post not found', field: 'id' }]))
    } 
    else {
        res.status(HTTPStatusCode.OK).send(foundPost)
    }
}