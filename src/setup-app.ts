import express, { Express, Request, Response } from "express"
import { blogsRouter } from "./blogs/blogsRouter"
import { postsRouter } from "./posts/postsRouter"
import { testingRouter } from "./testing/testingRouter"
import { HTTPStatusCode } from "./utils/statusCodes"
import { TESTING_PATH, POSTS_PATH, BLOGS_PATH } from "./utils/config"
 
export const setupApp = (app: Express) => {
    app.use(express.json())

    app.get("/", (req: Request, res: Response) => {
          res.status(HTTPStatusCode.OK).send("Hello World!");
    });

    app.use(POSTS_PATH, postsRouter)
    app.use(BLOGS_PATH, blogsRouter)
    app.use(TESTING_PATH, testingRouter)
    
    return app
}