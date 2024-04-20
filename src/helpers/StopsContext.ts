import { createContext, Dispatch, SetStateAction } from 'react';

export interface StopsContextType {
  stops: number | undefined;
  setStops: Dispatch<SetStateAction<number | undefined>>;
}

export const StopsContext = createContext<StopsContextType | null>(null);
