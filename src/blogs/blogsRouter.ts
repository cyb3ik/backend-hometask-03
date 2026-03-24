import { Router } from "express"
import { readAllBlogs } from "./handlers/readAllBlogsHandler"
import { readBlogById } from "./handlers/readBlogByIdHandler"
import { createBlog } from "./handlers/createBlogHandler"
import { updateBlogById } from "./handlers/updateBlogByIdHandler"
import { deleteBlogById } from "./handlers/deleteBlogByIdHandler"
import { idValidation } from "../validation/idValidationMiddleware"
import { blogDtoValidationMiddleware } from "./validation/blogDtoValidationMiddleware"
import { inputValidationResultMiddleware } from "../validation/inputValidationResultMiddleware"
import { authGuardMiddleware } from "../validation/authGuardMiddlewate"

export const blogsRouter = Router()

blogsRouter
    .get("/", readAllBlogs)
    .get("/:id", idValidation, inputValidationResultMiddleware, readBlogById)
    .post("/", authGuardMiddleware, blogDtoValidationMiddleware, inputValidationResultMiddleware, createBlog)
    .put("/:id", authGuardMiddleware, idValidation, blogDtoValidationMiddleware, inputValidationResultMiddleware, updateBlogById)
    .delete("/:id", authGuardMiddleware, idValidation, inputValidationResultMiddleware, deleteBlogById)