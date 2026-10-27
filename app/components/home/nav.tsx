"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Search, ChevronDown, LogOut } from "lucide-react";
import { useApi } from "@/hooks/useApi";

// Only the fields we use from FreeAPI's /ecommerce/profile response.
type Profile = {
  firstName: string;
  lastName: string;
};

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Comment",
      message: "John commented on your blog.",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "New Follower",
      message: "Sarah started following you.",
      time: "10 min ago",
    },
    {
      id: 3,
      title: "Profile Updated",
      message: "Your profile has been updated.",
      time: "1 hour ago",
    },
  ];

  // Loads the profile on mount through our server proxy (token is added there).
  const { data: profile } = useApi<Profile>("/api/backend/ecommerce/profile", {
    auto: true,
  });

  const { execute: logout } = useApi("/api/auth/logout", { method: "POST" });

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className=" bg-white shadow-sm">
      <div className="flex h-20 w-full items-center justify-between px-10 ">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          BopLevels
        </h1>

        <div className="flex items-center gap-5">
            {/* Search Bar */}
            <div className="hidden w-full max-w-md md:flex">
            <div className="relative w-full">
                <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                />
                <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
                />
            </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">
            {/* Notification */}
            <div className="relative">
                <button
                onClick={() => setOpen(!open)}
                className="relative rounded-full p-2 hover:bg-gray-100"
                >
                <Bell size={22} />
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                </button>

                {open && (
                <div className="absolute right-0 mt-3 w-80 rounded-xl border bg-white shadow-xl">
                    <div className="border-b p-4 font-semibold">
                    Notifications
                    </div>

                    {notifications.map((item) => (
                    <div
                        key={item.id}
                        className="border-b p-4 hover:bg-gray-50"
                    >
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                        {item.message}
                        </p>
                        <span className="text-xs text-gray-400">
                        {item.time}
                        </span>
                    </div>
                    ))}

                    <button className="w-full p-3 text-center text-blue-600 hover:bg-gray-50">
                    View All
                    </button>
                </div>
                )}
            </div>

            {/* User Profile */}
            <button className="flex items-center gap-3 rounded-full hover:bg-gray-100 p-1">
                <Image
                src="/img/01.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
                />

                <div className="hidden text-left md:block">
                <h3 className="text-sm font-semibold">{profile?.firstName} {profile?.lastName}</h3>
                <p className="text-xs text-gray-500">Administrator</p>
                </div>

                <ChevronDown size={18} className="text-gray-500" />
            </button>

            {/* Logout */}
            <button
                onClick={handleLogout}
                title="Logout"
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
            >
                <LogOut size={20} />
            </button>
            </div>

        </div>


      </div>
        
    </header>
  );
}