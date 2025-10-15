"use client";

import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, type = "text", ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}

                <input
                    type={type}
                    className={cn(
                        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                        "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-blue-400",
                        "transition-colors duration-150",
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {error && (
                    <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
