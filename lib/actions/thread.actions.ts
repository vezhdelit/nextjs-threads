"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface ThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: ThreadParams) => {
  connectToDB();

  try {
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    //Update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread ${error.message}`);
  }
};

export const fetchThreads = async ({ pageNumber = 1, pageSize = 20 }) => {
  connectToDB();

  //Calulate the number of postsw to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  //Fetch posts that have no parents(top-level threads)
  const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const threads = await threadsQuery.exec();

  const isNext = totalPostsCount > skipAmount + threads.length;

  return { threads, isNext };
};

export const fetchThreadById = async ({ id }: { id: string }) => {
  connectToDB();

  try {
    //TODO: Populate Community
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`);
  }
};

interface CommentParams {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
}

export const addCommentToThread = async ({
  threadId,
  commentText,
  userId,
  path,
}: CommentParams) => {
  connectToDB();

  try {
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) {
      throw new Error("Thread not found");
    }

    //Create new thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    //Save the new thread
    const savedCommentThread = await commentThread.save();

    //Include it to original thread
    originalThread.children.push(savedCommentThread._id);

    //Save the original thread
    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add comment ${error.message}`);
  }
};
