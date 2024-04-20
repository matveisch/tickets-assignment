import styles from './Stops.module.scss';

export default function Stops() {
  const stopsOptions = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

  return (
    <div className={styles.stops}>
      {stopsOptions.map((option) => (
        <div key={option} className={styles.outerContainer}>
          <label className={styles.container}>
            <input type="checkbox" />
            <span className={styles.checkmark}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          </label>
          <div>{option}</div>
        </div>
      ))}
    </div>
  );
}
