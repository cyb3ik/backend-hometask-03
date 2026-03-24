import { Collection, Db, MongoClient } from 'mongodb'
import { Post } from '../posts/models/postType'
import { Blog } from '../blogs/models/blogType'

export let client: MongoClient
export let postsCollection: Collection<Post>
export let blogsCollection: Collection<Blog>

const POSTS_COLLECTION_NAME = 'posts'
const BLOGS_COLLECTION_NAME = 'blogs'
 
export async function runDB(url: string): Promise<void> {

    client = new MongoClient(url)
    const db: Db = client.db(process.env.DB_NAME || 'bloggers-platform')
    
    postsCollection = db.collection<Post>(POSTS_COLLECTION_NAME)
    blogsCollection = db.collection<Blog>(BLOGS_COLLECTION_NAME)
    
    try {
        await client.connect()
        await db.command({ ping: 1 })
        console.log('Connected to the database')
    } 
    catch (e) {
        await client.close()
        throw new Error(`Cannot connect to database: ${e}`)
    }
}