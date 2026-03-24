import { BlogInputModel } from "./models/blogInputModel"
import { Blog } from "./models/blogType"
import { blogsCollection } from "../db/mongo.db"

export const blogsRepository = {

    async findAllBlogs(): Promise<Blog[]> {
        return blogsCollection.find({}, { projection: { _id: 0 }} ).toArray()
    },

    async findBlog(id: string): Promise<Blog | null> {
        return blogsCollection.findOne( { id: id }, { projection: { _id: 0 }} )
    },

    async createBlog(body: BlogInputModel): Promise<Blog> {
        const blogsArray = await this.findAllBlogs()

        const newBlog: Blog = {
            id: blogsArray.length ? String(blogsArray.length + 1) : "1",
            createdAt: new Date().toISOString(),
            isMembership: false,
            ...body
        }
        
        await blogsCollection.insertOne( { ...newBlog } )
        
        return newBlog
    },

    async updateBlog(id: string, body: BlogInputModel): Promise<boolean> {
        const updateResult = await blogsCollection.updateOne( 
            { id: id },
            { 
                $set: {
                    name: body.name,
                    description: body.description,
                    websiteUrl: body.websiteUrl
                }
            }
        )
        
        return updateResult.matchedCount === 1
    },

    async deleteBlog(id: string): Promise<boolean> {
        const deleteResult = await blogsCollection.deleteOne( { id: id } )    

        return deleteResult.deletedCount === 1
    }
}