"use client";
import { useState } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import DashboardSidebar from "@/shared/widgets/dashboard/sidebar/dashboard.sidebar";
import { Toaster } from "react-hot-toast";
import { addStripe } from "@/actions/add.stripe";
import { Button } from "@nextui-org/react";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  const pathname = usePathname();
  const { isLoaded, user } = useUser();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const isStripeCustomerIdHas = async () => {
    await addStripe();
  };

  if (!isLoaded) {
    return null;
  } else {
    if (user) {
      isStripeCustomerIdHas();
    }
  }

  return (
    <NextUIProvider>
      {pathname !== "/dashboard/new-email" &&
      pathname !== "/" &&
      pathname !== "/sign-up" &&
      pathname !== "/subscribe" &&
      pathname !== "/success" &&
      pathname !== "/error" &&
      pathname !== "/sign-in" ? (
        <div className="w-full flex flex-col lg:flex-row">
          <Button className="lg:hidden font-bold flex justify-center items-center gap-2 bg-[#3843D0] text-white border-[#3843D0] border-2 rounded-[10px] py-2 px-4 text-sm lg:py-5 lg:px-7 lg:text-lg hover:bg-[#060419]" onClick={toggleSidebar}>Menu</Button>
          <div className={`fixed lg:relative z-20 w-[290px] h-screen overflow-y-scroll bg-white shadow-md transform ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <DashboardSidebar />
          </div>
          {sidebarVisible && <div className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden" onClick={() => setSidebarVisible(false)}></div>}
          <div className="flex-1 min-h-screen">
            {children}
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </NextUIProvider>
  );
}
