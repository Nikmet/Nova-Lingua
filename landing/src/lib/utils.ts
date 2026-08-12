import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a root-absolute public/ asset path with Vite's BASE_URL.
 * Needed because the GitHub Pages build serves from /Nova-Lingua/, not /,
 * and Vite only rewrites asset URLs it can see in index.html — not string
 * literals inside component source.
 */
export function withBase(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
