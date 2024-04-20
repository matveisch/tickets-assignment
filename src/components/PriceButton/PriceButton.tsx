import styles from './PriceButton.module.scss';

export default function PriceButton({ price }: { price: number }) {
  return (
    <button className={styles.button}>
      <span>Купить за</span>
      <span>{price}$</span>
    </button>
  );
}
