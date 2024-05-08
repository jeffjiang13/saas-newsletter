"use client";

import Link from "next/link";
import React from "react";
import FooterLogo from "./footer.logo";
import { FaGithub, FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa6";
import { subscribe } from "@/actions/add.subscribe1";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const username: string = searchParams.get("username")!;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      toast.error("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const res = await subscribe({ email: value, username });
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("You are successfully subscribed!");
        setValue(""); // Clear the input only on successful subscription
      }
    } catch (error) {
      console.error(error);
      toast.error("Subscription failed!");
    }
    setLoading(false);
  };
  return (
    <footer className="w-full bg-black text-white pt-10">
      <div className="w-[95%] mx-auto py-5 flex flex-col md:flex-row">
        <div className="flex flex-col items-center md:items-start w-full md:w-[40%]">
          <Link href="/" className="inline-block">
            <FooterLogo />
          </Link>
          <p className="text-xl py-4 text-center md:text-left">
            Get BeeClone updates delivered directly to your inbox.
          </p>
          <div className="flex items-center w-full justify-center md:justify-start">
            <form
              className=" h-[49px] border-2 border-[#3843D0] bg-white rounded-lg shadow-lg overflow-hidden flex"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 w-full h-[48px] text-gray-700 leading-tight focus:outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-[150px] ter cursor-pointer rounded-r h-[49px] bg-[#3843D0] text-white">
                Subscribe
              </button>
            </form>
          </div>
          <br />
          <p className="text-xs text-center md:text-left">
            By subscribing you agree with our Privacy Policy and provide
            consent to receive updates from our company.
          </p>
        </div>
        <div className="w-full md:w-[60%] flex md:justify-end justify-center py-5 md:py-0">
          <div className="md:w-[50%] flex justify-around px-5 md:px-0">
            <div className="mr-10 md:mr-0">
              <ul>
                <li className="text-md pb-4 cursor-pointer">Create</li>
                <li className="text-md pb-4 cursor-pointer">Write</li>
                <li className="text-md pb-4 cursor-pointer">Grow</li>
                <li className="text-md pb-4 cursor-pointer">Monetize</li>
                <li className="text-md pb-4 cursor-pointer">Analyze</li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="text-md pb-4 cursor-pointer">Careers</li>
                <li className="text-md pb-4 cursor-pointer">Pricing</li>
                <li className="text-md pb-4 cursor-pointer">Shop</li>
                <li className="text-md pb-4 cursor-pointer">Compare</li>
                <li className="text-md pb-4 cursor-pointer">Love</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[95%] mx-auto pb-10 flex flex-col text-center space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 border-white-4 border-t-2 mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="py-4">
            <div className="py-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
                <Link href="" className="block md:inline">Terms</Link>
                <Link href="" className="block md:inline">Privacy</Link>
                <Link href="" className="block md:inline">Support</Link>
                <Link href="" className="block md:inline">Sitemap</Link>
              </div>
            </div>
              <p className="text-sm text-gray-400">
                © 2024 BeeClone, Inc. All rights reserved.
              </p>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://twitter.com" className="text-white"><FaTwitter /></a>
            <a href="https://instagram.com" className="text-white"><FaInstagram /></a>
            <a href="https://facebook.com" className="text-white"><FaFacebookF /></a>
            <a href="https://linkedin.com/in/jeffjiang13" className="text-white"><FaLinkedinIn /></a>
            <a href="https://github.com/jeffjiang13" className="text-white"><FaGithub /></a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
