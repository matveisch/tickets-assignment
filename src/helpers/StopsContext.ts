import { createContext, Dispatch, SetStateAction } from 'react';

export interface StopsContextType {
  stops: boolean[];
  setStops: Dispatch<SetStateAction<boolean[]>>;
}

export const StopsContext = createContext<StopsContextType | null>(null);
