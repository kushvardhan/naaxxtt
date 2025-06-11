import { Schema } from "mongoose";
import { IUser } from "../../database/user.model";

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface createQuestionsParams {
  title?: string;
  explanation?: string;
  tags?: string[];
  author?: Schema.Types.ObjectId | IUser;
  path?: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture?: string;
  image?: string;
  about?: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetAllUsersParams{
  page? : number,
  pageSize? : number,
  filter? : string,
  searchQuery? : string,
}

export interface ToggleSaveQuestionParams{
  userId: string,
  questionId: string,
  path: string,
}