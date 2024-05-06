import React from 'react';
import Link from 'next/link'; // Import Link from Next.js for client-side routing
import { Button } from '@nextui-org/react'; // Import Button from NextUI

const Page = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-100'>
        <h5 className='text-2xl text-center text-red-600 font-semibold mb-4'>
          Error occurred, please try again later!
        </h5>
          <Link href={"/"}>
            <Button className="flex justify-center gap-[10px] bg-[#3843D0] text-white border-[#3843D0] border-2 rounded-[10px] py-5 px-4 text-sm mr-2 md:py-5 md:px-8 md:text-lg hover:bg-[#060419] hover:text-white ">
                {/* Simple left arrow icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-15 0l6 6m-6-6l6-6" />
                </svg>
                Back
            </Button>
        </Link>
    </div>
  );
}

export default Page;
