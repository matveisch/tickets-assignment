import { createContext, Dispatch, SetStateAction } from 'react';

export interface ErrorMessageContextType {
  errorMessage: string | undefined;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
}

export const ErrorMessageContext = createContext<ErrorMessageContextType | null>(null);
