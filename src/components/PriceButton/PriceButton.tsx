import styles from './PriceButton.module.scss';
import { useContext, useEffect, useState } from 'react';
import { CurrencyContext, CurrencyContextType } from '../../helpers/CurrencyContext.ts';
import { getData } from '../../App.tsx';
import { ErrorMessageContext, ErrorMessageContextType } from '../../helpers/ErrorMessageContext.ts';

interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
}

export default function PriceButton({ price }: { price: number }) {
  const { currency } = useContext(CurrencyContext) as CurrencyContextType;
  const { setErrorMessage } = useContext(ErrorMessageContext) as ErrorMessageContextType;
  const [updatedPrice, setUpdatedPrice] = useState<number | undefined>(undefined);

  function getCurrencySymbol(activeCurrency: string) {
    switch (activeCurrency) {
      case 'RUB':
        return '₽';
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
    }
  }

  function numberWithSep(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  useEffect(() => {
    getData<ExchangeRateResponse>(
      // `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_API}/pair/${currency}/RUB`
      '123'
    ).then((data) => {
      data && setUpdatedPrice(Math.floor(price / data.conversion_rate));
      if (data) setErrorMessage('Цены недоступны – попробуйте снова');
    });
  }, [currency]);

  if (!updatedPrice) {
    return (
      <button className={styles.button}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-loader"
        >
          <line x1="12" x2="12" y1="2" y2="6" />
          <line x1="12" x2="12" y1="18" y2="22" />
          <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
          <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
          <line x1="2" x2="6" y1="12" y2="12" />
          <line x1="18" x2="22" y1="12" y2="12" />
          <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
          <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
        </svg>
      </button>
    );
  }

  return (
    <button className={styles.button}>
      <span>Купить за</span>
      <span>
        {numberWithSep(updatedPrice)} {getCurrencySymbol(currency)}
      </span>
    </button>
  );
}
