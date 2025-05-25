import { Schema } from "mongoose";
import { IUser } from "../../database/user.model";

export interface GetQuestionsParams{
    page?:number,
    pageSize?:number,
    searchQuery?:string,
    filter?:string,
}

export interface createQuestionsParams{
    title?:string,
    explanation?:string,
    tags?:string[],
    author?:Schema.Types.ObjectId | IUser,
    path?:string,
}