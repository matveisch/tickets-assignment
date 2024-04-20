import { createContext, Dispatch, SetStateAction } from 'react';

export interface CurrencyContextType {
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
}

export const CurrencyContext = createContext<CurrencyContextType | null>(null);
