import { Request, Response } from "express"
import { HTTPStatusCode } from "../../utils/statusCodes"
import { blogsRepository } from "../blogsRepository"
import { createErrorsMessages } from "../../utils/errors-utils"

export const updateBlogById = async (req: Request, res: Response) => {

    const isUpdated = await blogsRepository.updateBlog(String(req.params.id), req.body)

    if (!isUpdated) {
        res.status(HTTPStatusCode.NOT_FOUND)
            .send(createErrorsMessages([{ message: 'Blog not found', field: 'id' }]))
    } 
    else {
        res.sendStatus(HTTPStatusCode.NO_CONTENT)
    }
}