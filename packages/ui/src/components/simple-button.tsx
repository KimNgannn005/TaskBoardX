"use client";

import * as React from "react";
import { cn } from "../lib/utils.js";


interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: "light" | "dark";
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({
                                                              children,
                                                              className,
                                                              theme = "light",
                                                              ...props
                                                          }) => {
    return (
        <button
            className={cn(
                "px-3 md:px-4 py-2 rounded-lg font-medium transition-colors",
                theme === "light"
                    ? "bg-gray-300 text-black hover:bg-gray-400"
                    : "bg-gray-700 text-white hover:bg-gray-600",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
