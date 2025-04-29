"use client";

import { createContext, useContext } from "react";
import { useUser } from "@clerk/nextjs"; // ✅ Import useUser from Clerk

// Create and export context
export const AppContext = createContext(null);

// Custom hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Context Provider Component
export const AppContextProvider = ({ children }) => {
  const { user } = useUser(); // ✅ Access Clerk user

  const value = {
    user,
  };

  return (
    <AppContext.Provider value={value}> {/* ✅ Correct casing: Provider not provider */}
      {children}
    </AppContext.Provider>
  );
};
