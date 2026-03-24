import { PostInputModel } from "./models/postInputModel"
import { Post } from "./models/postType"
import { postsCollection } from "../db/mongo.db"

export const postsRepository = {

    async findAllPosts(): Promise<Post[]> {
        return postsCollection.find({}, { projection: { _id: 0 }} ).toArray()
    },

    async findPost(id: string): Promise<Post | null> {
        return postsCollection.findOne( { id: id }, { projection: { _id: 0 }} )
    },

    async createPost(body: PostInputModel): Promise<Post> {
        const postsArray = await this.findAllPosts()

        const newPost: Post = {
            id: postsArray.length ? String(postsArray.length + 1) : '1',
            blogName: 'blogName',
            createdAt: new Date().toISOString(),
            ...body
        }

        await postsCollection.insertOne( { ...newPost } )

        return newPost
    },

    async updatePost(id: string, body: PostInputModel): Promise<boolean> {
        const updateResult = await postsCollection.updateOne( 
            { id: id },
            { 
                $set: {
                    shortDescription: body.shortDescription,
                    content: body.content,
                    blogId: body.blogId,
                    title: body.title
                }
            }
        )
        
        return updateResult.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean> {

        const deleteResult = await postsCollection.deleteOne( { id: id } )    

        return deleteResult.deletedCount === 1
    }
}