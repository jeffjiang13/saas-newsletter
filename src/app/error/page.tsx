import React from 'react';
import Link from 'next/link'; // Import Link from Next.js for client-side routing
import { Button } from '@nextui-org/react'; // Import Button from NextUI

const Page = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h5 className='text-2xl text-center text-red-600 font-semibold mb-4'>
          Error occurred, please try again later!
        </h5>
          <Link href={"/dashboard"}>
            <Button className="flex justify-center gap-[10px] bg-[#3843D0] text-white border-[#3843D0] border-2 rounded-[10px] py-5 px-4 text-sm mr-2 md:py-5 md:px-8 md:text-lg hover:bg-[#060419] hover:text-white ">
              Go to Dashboard
            </Button>
        </Link>
    </div>
  );
}

export default Page;
