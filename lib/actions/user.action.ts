"use server"

import User from "../../database/user.model";
import { connectToDatabase } from "../mongoose"

export async function getUserById(params:any){
    try{
        connectToDatabase();
        const userId = 'clerk_123abc456';
        const user = await User.findById({clerkId:userId});
        return user; 
    }catch(error){
        console.log(error);
        throw error;
    }
}