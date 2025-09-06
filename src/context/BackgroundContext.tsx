"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type BackgroundState = 'visible' | 'dimmed' | 'hidden';

interface BackgroundContextType {
  backgroundState: BackgroundState;
  setBackgroundState: (state: BackgroundState) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundState, setBackgroundState] = useState<BackgroundState>('visible');

  return (
    <BackgroundContext.Provider value={{ backgroundState, setBackgroundState }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};
