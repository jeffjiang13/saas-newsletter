import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

const FeatureHighlight = () => {
  return (
    <>
      <div className="border-t-2 border-black border-b-2 text-white w-full flex flex-col md:flex-row items-center justify-center bg-[#3843d0] py-5 text-center md:text-left md:min-h-[45vh]">
        <div className="w-full md:w-[50%] px-20 py-4">
          <h2 className="font-clashDisplay uppercase text-cyber-ink text-2xl md:text-5xl mb-2">
            Come thrive on <br />Beclone
          </h2>
          <p className="text-cyber-ink text-xl md:text-2xl font-[400]">
            The best tools for the best outcomes
          </p>
        </div>
        <div className="w-full md:w-[50%] flex flex-col md:flex-row justify-center md:justify-end items-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="312" height="19" viewBox="0 0 312 19"
              className="mb-4 ml-[55px] md:ml-0" // Ensure it's above the button on mobile
              style={{ mixBlendMode: 'screen' }}>
            <path stroke="#808080" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M1 1c4.426 0 4.426 17 8.858 17s4.426-17 8.857-17 4.427 17 8.858 17 4.426-17 8.857-17 4.427 17 8.858 17 4.426-17 8.857-17 4.427 17 8.858 17 4.426-17 8.857-17 4.427 17 8.858 17 4.426-17 8.853-17 4.426 17 8.857 17 4.427-17 8.858-17 4.431 17 8.853 17 4.426-17 8.857-17 4.427 17 8.858 17 4.431-17 8.853-17 4.426 17 8.857 17 4.431-17 8.858-17 4.426 17 8.857 17 4.432-17 8.858-17 4.431 17 8.858 17 4.431-17 8.853-17 4.426 17 8.857 17 4.431-17 8.858-17 4.426 17 8.857 17 4.431-17 8.863-17 4.431 17 8.857 17" />
          </svg>
          <Link href="/dashboard">
            <Button className="bg-black text-white border-[2px] border-black rounded-lg text-2xl py-7 px-8 md:py-10 md:px-8 mr-0 md:mr-10 hover:bg-opacity-90 transition duration-300 ease-in-out">
              Start 30 day free trial
            </Button>
          </Link>
        </div>
      </div>

      <div className="border-t-2 border-black border-b-2 w-full md:flex items-center bg-[#f0ecff] py-5 text-center md:text-left md:py-0 md:min-h-[83vh]">
        <div className="w-full md:w-[50%] flex justify-center md:justify-start">
          <Image
            src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/homepage/Create.png"
            alt=""
            width={450}
            height={400}
            className="w-[80%] md:w-[90%] mx-auto"
          />
        </div>
        <div className="w-full md:w-[50%] text-left p-6 ml-0 md:ml-14">
          <h2 className="font-clashDisplay uppercase text-cyber-ink text-3xl md:text-5xl mb-2">
            CREATE
          </h2>
          <h3 className="text-cyber-ink text-xl md:text-3xl max-w-xl font-[700] mb-7">
            The most powerful editing and design tools in email.
          </h3>
          <p className="text-cyber-ink text-lg md:text-2xl max-w-xl font-[400] mb-7 ">
            Warning: A writing experience unlike anything you&lsquo;ve ever
            experienced - proceed with caution.
          </p>
          <Link href={"/dashboard"} className="flex justify-center md:justify-start">
            <Button className="bg-white border-[2px] border-[#000] rounded-lg text-xl py-8 px-20 mt-4">
              Start Building
            </Button>
          </Link>
        </div>
      </div>


      <div className="border-black border-b-2 w-full md:flex items-center bg-[#9399F4] py-5 text-center md:py-0 md:text-left md:min-h-[75vh]">
      <div className="w-full md:w-[50%]">
        <Image
          src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/homepage/Publish.png"
          alt=""
          width={400}
          height={400}
          className="w-[85%] ml-5"
        />
      </div>
      <div className="w-full md:w-[50%] text-left p-6 ml-0 md:ml-14">
          <h2 className="font-clashDisplay uppercase text-cyber-ink text-3xl md:text-5xl mb-2">
            Publish
          </h2>
          <h3 className="text-cyber-ink text-xl md:text-3xl max-w-xl font-[700] mb-7">
            Launch the next iconic media brand in minutes. No code needed. Ever.
          </h3>
          <p className="text-cyber-ink text-lg md:text-2xl max-w-xl font-[400] mb-7 ">
            World class newsletters and websites - just like the pros.
          </p>
          <Link href={"/dashboard"} className="flex justify-center md:justify-start">
            <Button className="bg-white border-[2px] border-[#000] rounded-lg text-xl py-8 px-20 mt-4">
              Start Building
            </Button>
          </Link>
        </div>
      </div>

      <div className="border-black border-b-2 w-full md:flex items-center bg-[#ffc8eb] py-5 text-center md:py-0 md:text-left md:min-h-[85vh]">
      <div className="w-full md:w-[50%]">
        <Image
          src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/homepage/Grow.png"
          alt=""
          width={400}
          height={400}
          className="w-[85%] ml-5"
        />
      </div>
      <div className="w-full md:w-[50%] text-left p-6 ml-0 md:ml-14">
          <h2 className="font-clashDisplay uppercase text-cyber-ink text-3xl md:text-5xl mb-2">
            GROW
          </h2>
          <h3 className="text-cyber-ink text-xl md:text-3xl max-w-xl font-[700] mb-7">
            Use the same suite of tools used by the world&apos;s largest newsletters.
          </h3>
          <p className="text-cyber-ink text-lg md:text-2xl max-w-xl font-[400] mb-7 ">
            So effective some would consider it cheating.
          </p>
          <Link href={"/dashboard"} className="flex justify-center md:justify-start">
            <Button className="bg-white border-[2px] border-[#000] rounded-lg text-xl py-8 px-20 mt-4">
              Scale faster
            </Button>
          </Link>
        </div>
      </div>
      <div className="border-black border-b-2 w-full md:flex items-center bg-[#f092dd] py-5 text-center md:py-0 md:text-left md:min-h-[85vh]">
      <div className="w-full md:w-[50%]">
        <Image
          src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/homepage/Monetize-2.png"
          alt=""
          width={400}
          height={400}
          className="w-[85%] ml-5"
        />
      </div>
      <div className="w-full md:w-[50%] text-left p-6 ml-0 md:ml-14">
          <h2 className="font-clashDisplay uppercase text-cyber-ink text-3xl md:text-5xl mb-2">
           MONETIZE
          </h2>
          <h3 className="text-cyber-ink text-xl md:text-3xl max-w-xl font-[700] mb-7">
           Like you have a full sales and revenue team on your staff.
          </h3>
          <p className="text-cyber-ink text-lg md:text-2xl max-w-xl font-[400] mb-7 ">
           ...because you do. You just don't pay them (or need to make small talk).
          </p>
          <Link href={"/dashboard"} className="flex justify-center md:justify-start">
            <Button className="bg-white border-[2px] border-[#000] rounded-lg text-xl py-8 px-20 mt-4">
              Start earning
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FeatureHighlight;
