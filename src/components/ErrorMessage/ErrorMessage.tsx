import styles from './ErrorMessage.module.scss';

export default function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return (
    <div className={styles.errorContainer}>
      <h2>{errorMessage}</h2>
    </div>
  );
}
