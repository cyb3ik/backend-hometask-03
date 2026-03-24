import { Request, Response } from "express"
import { HTTPStatusCode } from "../../utils/statusCodes"
import { postsRepository } from "../postsRepository"
import { createErrorsMessages } from "../../utils/errors-utils"

export const updatePostById = async (req: Request, res: Response) => {

    const isUpdated = await postsRepository.updatePost(String(req.params.id), req.body)

    if (!isUpdated) {
        res.status(HTTPStatusCode.NOT_FOUND)
            .send(createErrorsMessages([{ message: 'Post not found', field: 'id' }]))
    } 
    else {
        res.sendStatus(HTTPStatusCode.NO_CONTENT)
    }
}