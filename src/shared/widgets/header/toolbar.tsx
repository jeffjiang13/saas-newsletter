"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const Toolbar = () => {
  const { user } = useUser();

  return (
    <>
      {!user && (
        <Link className="mr-2" href={"/sign-in"}>Login</Link>
      )}
      <Link href="/dashboard">
        <Button className="flex justify-center items-center gap-2 bg-[#3843D0] text-white border-[#3843D0] border-2 rounded-[10px] py-2 px-4 text-sm md:py-5 md:px-7 md:text-lg hover:bg-[#060419]">
          Start Trial
        </Button>
      </Link>
      {user && (
        <Link href="/dashboard">
          <div className="inline-block cursor-pointer mt-1">
            <Image
              src={user.imageUrl || '/default-avatar.png'} // Fallback to default avatar if user.imageUrl is not available
              alt="User Profile"
              width={45}
              height={45}
              className="rounded-full object-cover"
              style={{ aspectRatio: '1 / 1' }}  // Ensures the width and height are always equal

            />
          </div>
        </Link>
      )}
    </>
  );
};

export default Toolbar;
