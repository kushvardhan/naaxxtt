"use server"


import { connectToDatabase } from "../mongoose";

import {
  GetTopInteractedTagsParams
} from "./shared.type";
import User from '../../database/user.model'

export async function getTopInteractedTags(params?:GetTopInteractedTagsParams){
  try{
    await connectToDatabase();
    const {userId, limit=3} = params;

    const user = await User.findById(userId);

    if(!user) throw new Error("User not Found.");


    return [{_id:1,name:'tag1'},{_id:2,name:'tag2'},{_id:3,name:'tag3'}];

  }catch(err){
    console.log("Error getting users: ",err);
    throw err;
  }
}