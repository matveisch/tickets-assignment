import { useContext } from 'react';
import { CurrencyContext, CurrencyContextType } from '../../helpers/CurrencyContext.ts';
import styles from './CurrencySelector.module.scss';

export default function CurrencySelector() {
  const { currency, setCurrency } = useContext(CurrencyContext) as CurrencyContextType;
  const currencyOptions = ['RUB', 'USD', 'EUR'];

  return (
    <div className={styles.currencySelector}>
      {currencyOptions.map((option) => (
        <button
          onClick={() => setCurrency(option)}
          className={`${styles.currencyOption} ${option === currency && styles.activeOption}`}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
