import React, { createContext, useContext, useState, ReactNode } from "react";

const AppModelContext = createContext(undefined);

export const useAppModel = () => {
  const context = useContext(AppModelContext);
  if (context === undefined) {
    throw new Error("useAppModel must be used within a AppModelProvider");
  }
  return context;
};

interface AppModelProviderProps {
  children: ReactNode;
}

export const AppModelProvider: React.FC<AppModelProviderProps> = ({
  children,
}) => {
  const [appModel, setAppModel] = useState(null);

  return (
    <AppModelContext.Provider value={{ appModel, setAppModel }}>
      {children}
    </AppModelContext.Provider>
  );
};
