"use server";

import { connectToDatabase } from "../mongoose";

 
export async function createQuestion(){
    try{
        await connectToDatabase();
    }catch(error){
        console.log(error);
    }
}