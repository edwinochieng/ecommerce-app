import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

function Profile() {
  const { status, data: session } = useSession();

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className=''>
        <Image src='/user.jpg' width='200' height='200' alt='user' />
      </div>
      <div className='text-[20px]'>
        <h1>
          Name: <span>{session?.user.name}</span>
        </h1>
        <h1>
          Email : <span>{session?.user.email}</span>
        </h1>
      </div>
    </div>
  );
}

export default Profile;
