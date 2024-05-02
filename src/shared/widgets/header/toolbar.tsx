"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const Toolbar = () => {
  const { user } = useUser();

  return (
    <>
      <Link href={"/dashboard"}>
        <Button className="flex justify-center gap-[10px] bg-[#3843D0] text-white border-[#3843D0] border-2 rounded-[10px] py-5 px-4 text-sm mr-2 md:py-5 md:px-8 md:text-lg hover:bg-[#060419] hover:text-white ">
          Start Trial
        </Button>
      </Link>
      {user ? (
        <>
          <Link href={"/dashboard"}>
            <Image
              src={user?.imageUrl}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </>
      ) : (
        <Link href={"/sign-in"}>Login</Link>
      )}
    </>
  );
};

export default Toolbar;
