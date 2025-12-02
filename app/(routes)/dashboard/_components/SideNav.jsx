import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
  TrendingUp,
  TrendingDownIcon,
  Wallet,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 5,
      name: "Savings",
      icon: Wallet,
      path: "/dashboard/savings",
    },
    // Stuff to add later as more pages for the dashboard
    
    //   id: 6,
    //   name: "Investments",
    //   icon: TrendingUp,
    //   path: "/dashboard/investments", make an invesstments dashboard and add integration with chumz and other local apps
    // },
    // {
    //   id: 7,
    //   name: "Debts", :(
    //   icon: TrendingDownIcon,
    //   path: "/dashboard/debts",
    // },
   // {
     // id: 8, not working properly :(
    //  name: "Upgrade Package",
   //   icon: ShieldCheck,
   //   path: "/dashboard/upgrade",
   // },
  ];
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="h-screen p-5 border shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700">
      {/* <Image src={'/logo.svg'}
        alt='logo'
        width={160}
        height={100}
        /> */}
      <div className="flex flex-row items-center">
        <Image src="/chart-donut.svg" alt="logo" width={40} height={25} />
        <span className="text-blue-800 dark:text-blue-400 font-bold text-xl">My finance tracker</span>
      </div>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center
                    text-gray-500 dark:text-gray-400 font-medium
                    mb-2
                    p-4 cursor-pointer rounded-full
                    hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900
                    ${path == menu.path && "text-primary bg-blue-100 dark:bg-blue-900"}
                    `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div
        className="fixed bottom-10 p-5 flex gap-2
            items-center"
      >
        {/* Profile section removed so that there's no authentication needed */}
      </div>
    </div>
  );
}

export default SideNav;
