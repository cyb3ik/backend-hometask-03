import { Request, Response } from "express"
import { HTTPStatusCode } from "../../utils/statusCodes"
import { postsRepository } from "../postsRepository"
import { createErrorsMessages } from "../../utils/errors-utils"

export const deletePostById = async (req: Request, res: Response) => {
    
    const isDeleted = await postsRepository.deletePost(String(req.params.id))

    if (!isDeleted) {
        res.status(HTTPStatusCode.NOT_FOUND)
            .send(createErrorsMessages([{ message: 'Post not found', field: 'id' }]))
    }
    else {
        res.sendStatus(HTTPStatusCode.NO_CONTENT)
    }
}