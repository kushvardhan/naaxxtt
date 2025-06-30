import { getUserById } from '../../../../../lib/actions/user.action';
import {  auth } from '@clerk/nextjs/server'


interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

const ProfilePage=async({params})=>{

    const { userId: clerkId } = await auth();
    console.log('clerkId', clerkId);


    const user = await getUserById({ userId: params.id});

    console.log("User PROFILE: ", user);

    return(
        <div className='w-full h-[calc(100vh-130px)] mt-20 overflow-y-scroll scrollbar-hidden'>
            <h1>Profile Page</h1>
        </div>
    )
}

