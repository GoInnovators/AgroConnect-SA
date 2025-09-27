import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from '@supabase/supabase-js'
import { GoogleGenerativeAI } from "@google/generative-ai";

export const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
export const GOOGLE_AI_MODEL = import.meta.env.GOOGLE_AI_MODEL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);


export const getLocation = () => {

  if(!localStorage.getItem("location")){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem("location", JSON.stringify(position.coords));
        return position.coords;
      });
    }
  }
  return JSON.parse(localStorage.getItem("location"));
}
