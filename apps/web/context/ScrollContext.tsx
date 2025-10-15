"use client";

import { createContext, useContext } from "react";

export const ScrollContext = createContext<(() => void) | null>(null);

export const useScroll = () => useContext(ScrollContext);