import { prisma } from "../utils";
import { UserPost } from "../interfaces/userPosts";

//GET functions

async function getAllUserPosts() {
    let allPosts;
    try {
        allPosts = await prisma.user_posts.findMany();
    } catch (error) {
        console.log(error);
    }
    const posts: UserPost[] = allPosts.map((x: { id: any; user_id: any; post_title: any; post_content: any }) => ({
        postId: x.id,
        userId: x.user_id,
        postTitle: x.post_title,
        postContent: x.post_content
    }));
    return posts;
}

async function getPostById(postId: number) {
    let post;
    try {
        post = await prisma.user_posts.findUnique({
            where: {id: postId },
        });
    } catch (error) {
        console.log(error);
    }
    const returnedValue = {
        postId: post.id,
        postTitle: post.post_title,
        postContent: post.post_content,
    };
    return returnedValue;
}

async function getPostsByUserId(userId: number) {
    let postsArray;
    try {
        postsArray = await prisma.user_posts.findMany({
            where: { user_id: userId },
        });
    } catch (error) {
        console.log(error);
    }
    const posts: UserPost[] = postsArray.map((x: { id: any; user_id: any; post_title: any; post_content: any }) => ({
        postId: x.id,
        userId: x.user_id,
        postTitle: x.post_title,
        postContent: x.post_content
    }));
    return posts;
}

//CREATE function

async function createUserPost(post: UserPost) {
    let newPost;
    try {
        newPost = await prisma.user_posts.create({
            data: {
                id: post.postId,
                user_id: post.userId,
                post_title: post.postTitle,
                post_content: post.postContent
            },
        });
    } catch (error) {
        console.log(error);
    }
    return newPost;
}

//DELETE function

async function deletePostById(postId: number) {
    let deletedPost;
    try {
        deletedPost = await prisma.user_posts.delete({
            where: {
                id: postId,
            },
        });
    } catch (error) {
        console.log(error);
    }
    return deletedPost;
}

const UserPostService = {
    getAllUserPosts,
    getPostById,
    getPostsByUserId,
    createUserPost,
    deletePostById
};

export { UserPostService };