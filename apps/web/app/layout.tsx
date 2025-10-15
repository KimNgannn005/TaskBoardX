"use client";

import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { ProjectProvider } from "@/context/ProjectContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider>
            <InnerLayout>{children}</InnerLayout>

            <Toaster position="top-right" />
        </ThemeProvider>
        </body>
        </html>
    );
}

function InnerLayout({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <ProjectProvider>
            <div
                className={`flex min-h-screen transition-colors duration-300 ${
                    theme === "dark"
                        ? "bg-gray-900 text-gray-100"
                        : "bg-gray-50 text-gray-900"
                }`}
            >

                <div className="w-full md:w-[15%]">
                    <Sidebar />
                </div>
                <div className="hidden md:block w-full md:w-[85%]">
                    <div className="flex-1 w-full px-6">{children}</div>
                </div>
                <div className="block md:hidden lg:hidden">
                    <div className="flex-1 w-[100vw]">{children}</div>
                </div>
            </div>
        </ProjectProvider>
    );
}
