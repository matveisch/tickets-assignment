import styles from './Filter.module.scss';
import CurrencySelector from '../CurrencySelector/CurrencySelector.tsx';

export default function Filter() {
  return (
    <div className={styles.filter}>
      <div className={styles.currency}>
        <span>валюта</span>
        <CurrencySelector />
      </div>
      <div className={styles.stops}>
        <span>количество пересадок</span>
      </div>
    </div>
  );
}
