"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './logo';
import Toolbar from './toolbar';
import { FaBars, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import NavItems from './nav.items'
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const { user } = useUser();

  const toggleMenu = (menuName:any) => {
    if (activeMenu === menuName) {
      setActiveMenu('');
    } else {
      setActiveMenu(menuName);
    }
  };
  return (
   <header className='w-full sticky top-0 left-0 z-[999] border-b-2 border-black px-5 md:px-10 flex items-center justify-between h-[98px] md:h-[74px] bg-white text-black'>
      <div>
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div>
        <NavItems />
      </div>
      <div className='flex items-center gap-0 md:gap-3 ml-14 md:ml-0'>
        <Toolbar />
      </div>
      <div className="md:hidden flex items-center justify-between px-1">
        <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute w-[90%] bg-black text-white shadow-lg rounded-lg py-6 px-5 top-20 justify-center">
          <ul className="flex flex-col gap-3">
            <button className="border-b border-gray-200 w-full text-left flex items-center justify-between py-2 font-semibold">
              <Link href="/#pricing">Pricing</Link>
            </button>
            <button className="border-b border-gray-200 w-full text-left flex items-center justify-between py-2 font-semibold">
              <Link href="/#features">Features</Link>
            </button>
            <li>
              <button onClick={() => toggleMenu('adNetwork')} className="border-b border-gray-200 w-full text-left flex items-center justify-between py-2 font-semibold">
                AD NETWORK {activeMenu === 'adNetwork' ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {activeMenu === 'adNetwork' && (
                <ul className="pl-4 mt-2">
                  <li className="py-2"><Link href="#">For Publishers</Link></li>
                  <li className="py-2"><Link href="#">For Advertisers</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => toggleMenu('beeclone')} className="border-b border-gray-200 w-full text-left flex items-center justify-between py-2 font-semibold">
                BEECLONE FOR {activeMenu === 'beeclone' ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {activeMenu === 'beeclone' && (
                <ul className="pl-4 mt-2">
                  <li className="py-2"><Link href="#">Business</Link></li>
                  <li className="py-2"><Link href="#">Content Creators</Link></li>
                  <li className="py-2"><Link href="#">Web 3 and Crypto</Link></li>
                  <li className="py-2"><Link href="#">Health and Fitness</Link></li>
                  <li className="py-2"><Link href="#">Food</Link></li>
                  <li className="py-2"><Link href="#">Pop Culture</Link></li>
                  <li className="py-2"><Link href="#">Podcasters</Link></li>
                  <li className="py-2"><Link href="#">Sports</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => toggleMenu('resources')} className="border-b border-gray-200 w-full text-left flex items-center justify-between py-2 font-semibold">
                RESOURCES {activeMenu === 'resources' ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {activeMenu === 'resources' && (
                <ul className="pl-4 mt-2">
                  <li className="py-2"><Link href="#">Business</Link></li>
                  <li className="py-2"><Link href="#">Content Creators</Link></li>
                  <li className="py-2"><Link href="#">Web 3 and Crypto</Link></li>
                  <li className="py-2"><Link href="#">Health and Fitness</Link></li>
                  <li className="py-2"><Link href="#">Food</Link></li>
                  <li className="py-2"><Link href="#">Pop Culture</Link></li>
                  <li className="py-2"><Link href="#">Sports</Link></li>
                  <li className="py-2"><Link href="#">Support</Link></li>
                  <li className="py-2"><Link href="#">Affiliate</Link></li>
                  <li className="py-2"><Link href="#">About</Link></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => toggleMenu('company')} className="border-b border-gray-200 w-full text-left flex items-center justify-between py-2 font-semibold">
                COMPANY {activeMenu === 'company' ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {activeMenu === 'company' && (
                <ul className="pl-4 mt-2">
                  <li className="py-2"><Link href="#">Careers</Link></li>
                  <li className="py-2"><Link href="#">About</Link></li>
                  <li className="py-2"><Link href="#">Shop</Link></li>
                </ul>
              )}
            </li>
            <>
              {!user && (
               <li className="py-2 font-semibold">
                  <Link href="/sign-in" className="block w-full text-center bg-[#3843D0] py-2 rounded-lg">Login →</Link>
               </li>
              )}
              {user && (
                <Link className="block" href="/dashboard">
                  <div className="flex justify-center cursor-pointer">
                    <Image
                      src={user.imageUrl || '/default-avatar.png'}
                      alt="User Profile"
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                      style={{ aspectRatio: '1 / 1' }}
                    />
                  </div>
                </Link>
              )}
            </>
          </ul>
        </div>
      )}
   </header>
  )
}

export default Header
