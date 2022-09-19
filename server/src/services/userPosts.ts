import { prisma } from "../utils";
import { UserPost } from "../interfaces/userPosts";

//GET functions

async function getAllUserPosts() {
    let post;
    let allPosts;
    try {
        allPosts = await prisma.user_posts.findMany();
    } catch (error) {
        console.log(error);
    }
    const getAllPosts: UserPost[] = allPosts.map((x) => ({
        postId: x.id,
        postTitle: x.post_title,
        postContent: x.post_content,
        userId: x.user_id
    }));

    for (post of getAllPosts) {
        const author = await prisma.users.findUnique({
            where: {
                id: post.userId,
            },
        });
        post.authorName = author.user_name;
    }

    return getAllPosts;
}

async function getPostById(postId: number) {
    let postDetails;
    console.log(postId);
    try {
        postDetails = await prisma.user_posts.findUnique({
            where: { id: postId },
        });
    } catch (error) {
        console.log(error);
    }
    const returnedValue = {
        postId: postDetails.id,
        userId: postDetails.user_id,
        postTitle: postDetails.post_title,
        postContent: postDetails.post_content
    };
    return returnedValue;
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
    createUserPost,
    deletePostById
};

export { UserPostService };
