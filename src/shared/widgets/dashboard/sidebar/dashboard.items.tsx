import { sideBarBottomItems, sideBarItems } from "@/app/configs/constants";
import useRouteChange from "@/shared/hooks/useRouteChange";
import { ICONS } from "@/shared/utils/icons";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import SidebarFotterLogo from "./sidebar.fotter.logo";
import { useEffect } from "react";
import { LayoutProps } from '../../../../../.next/types/app/dashboard/audience/page';

const DashboardItems = ({ bottomContent }: { bottomContent?: boolean }) => {
  const { activeRoute, setActiveRoute } = useRouteChange();
  const { signOut, user } = useClerk();
  const pathName = usePathname();

  const LogoutHandler = () => {
    signOut();
    redirect("/sign-in");
  };

  useEffect(() => {
    setActiveRoute(pathName);
  }, [pathName, setActiveRoute]);

  return (
    <>
      {!bottomContent ? (
        <>
          {sideBarItems.map((item: DashboardSideBarTypes, index: number) => (
            <Link
              key={index}
              href={item.url}
              className="p-2 py-5 flex items-center hover:bg-gray-500/10 transition duration-300"
            >
              <span
                className={`text-3xl mr-2 ${
                  item.url === activeRoute && "text-[#463bbd]"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`text-xl mr-2 ${
                  item.url === activeRoute && "text-[#463bbd]"
                }`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </>
      ) : (
        <>
          {sideBarBottomItems.map(
            (item: DashboardSideBarTypes, index: number) => (
              <Link
                key={index}
                className="p-2 py-5 flex items-center hover:bg-gray-500/10 transition duration-300"
                href={
                  item.url === "/"
                    ? `/subscribe?username=${user?.username}`
                    : item.url
                }
              >
                <span
                  className={`text-3xl mr-2 ${
                    item.url === activeRoute && "text-[#463bbd]"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-xl mr-2 ${
                    item.url === activeRoute && "text-[#463bbd]"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            )
          )}
          {/* sign out */}
          <div className="p-2 py-5 flex items-center cursor-pointer border-b hover:bg-gray-500/10 transition duration-300"
          onClick={LogoutHandler}
          >
            <span className="text-3xl mr-2">{ICONS.logOut}</span>
            <span className="text-xl">Sign Out</span>
          </div>
          {/* footer */}
          <br />
          <br />
          <div className="w-full flex justify-center cursor-pointer">
            <a className="w-full flex justify-center cursor-pointer"
              href={"/"}>
              <SidebarFotterLogo />
            </a>
          </div>
          <p className="text-sm text-center pt-5 pb-10">
            © 2024 BeeClone, Inc. All rights reserved.
          </p>
        </>
      )}
    </>
  );
};

export default DashboardItems;
