import { Router } from "express"
import { readAllPosts } from "./handlers/readAllPostsHandler"
import { readPostById } from "./handlers/readPostByIdHandler"
import { createPost } from "./handlers/createPostHandler"
import { updatePostById } from "./handlers/updatePostByIdHandler"
import { deletePostById } from "./handlers/deletePostByIdHandler"
import { idValidation } from "../validation/idValidationMiddleware"
import { postDtoValidationMiddleware } from "./validation/postDtoValidationMiddleware"
import { inputValidationResultMiddleware } from "../validation/inputValidationResultMiddleware"
import { authGuardMiddleware } from "../validation/authGuardMiddlewate"

export const postsRouter = Router()

postsRouter
    .get("/", readAllPosts)
    .get("/:id", idValidation, inputValidationResultMiddleware, readPostById)
    .post("/", authGuardMiddleware, postDtoValidationMiddleware, inputValidationResultMiddleware, createPost)
    .put("/:id", authGuardMiddleware, idValidation, postDtoValidationMiddleware, inputValidationResultMiddleware, updatePostById)
    .delete("/:id", authGuardMiddleware, idValidation, inputValidationResultMiddleware, deletePostById)