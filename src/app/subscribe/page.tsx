"use client";

import { subscribe } from "@/actions/add.subscribe";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
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
    <div className="w-full flex flex-col items-center justify-center h-screen p-4">
      <div>
        <h1 className="text-3xl md:text-7xl pb-8 capitalize">{username} Newsletter</h1>
      </div>
      <form
        className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden flex"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-3 w-full text-gray-700 leading-tight focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-8 bg-blue-500 text-white font-bold py-3 hover:bg-blue-600 disabled:bg-blue-300 transition-colors ease-in-out duration-300`}
        >
          {loading ? 'Loading...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default Page;
