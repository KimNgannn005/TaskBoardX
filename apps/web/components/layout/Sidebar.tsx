"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckSquare, FolderKanban, User, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);

    const menuItems = [
        { name: "Projects", href: "/projects", icon: FolderKanban },
        { name: "Tasks", href: "/", icon: CheckSquare },
        { name: "Profile", href: "/profile", icon: User },
    ];

    const linkBaseClasses =
        "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors text-left active:scale-95";

    const getLinkClasses = () => {

        return theme === "light"
            ? `${linkBaseClasses} hover:bg-gray-700 text-gray-100`
            : `${linkBaseClasses} hover:bg-gray-700 text-gray-100`;
    };

    return (
        <>

            <div className="md:hidden fixed top-4 left-4 z-50 flex items-center gap-3">
                <button
                    onClick={() => setOpen(true)}
                    className="bg-gray-700 dark:bg-gray-800 text-white p-2 rounded-lg transition-colors active:scale-95"
                >
                    <Menu size={22} />
                </button>

                <div
                    onClick={toggleTheme}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out
                        ${theme === "light" ? "bg-gray-300" : "bg-gray-600"}`}
                >
                    <div
                        className={`w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ease-in-out flex items-center justify-center
                            ${theme === "light" ? "bg-white translate-x-0" : "bg-yellow-400 translate-x-6"}`}
                    >
                        {theme === "light" ? <Moon size={12} className="text-gray-600" /> : <Sun size={12} className="text-white" />}
                    </div>
                </div>
            </div>


            <aside
                className={`fixed top-0 left-0 h-screen w-64 shadow-lg border-r transition-transform transform z-40
                    ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-gray-600 border-gray-700"}
                    ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >

                <div className="flex items-center justify-between px-4 py-4 md:hidden">
                    <button onClick={() => setOpen(false)} className="text-white active:scale-95 transition-transform">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col h-full">
                    <nav className="flex flex-col gap-3 px-4 py-6">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={getLinkClasses()}
                                >
                                    <Icon size={20} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>


                    <div className="p-4 mt-auto hidden md:block">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl transition-all duration-300 ease-in-out bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 text-white font-medium active:scale-95"
                        >
                            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                            {theme === "light" ? "Dark Mode" : "Light Mode"}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
