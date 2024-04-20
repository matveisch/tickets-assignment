import styles from './TimeTable.module.scss';

interface TimeTableProps {
  departureTime: string;
  arrivalTime: string;
  stops: number;
}

export default function TimeTable(props: TimeTableProps) {
  const { departureTime, arrivalTime, stops } = props;

  function getPluralForm(value: number, words: string[]) {
    value = Math.abs(value) % 100;
    let num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
  }

  return (
    <div className={styles.timeTable}>
      <span className={styles.time}>{departureTime}</span>
      <div className={styles.separatorContainer}>
        {stops > 0 ? (
          <span>
            {stops} {getPluralForm(stops, ['пересадка', 'пересадки', 'пересадок'])}
          </span>
        ) : (
          <span>прямой</span>
        )}
        <div className={styles.separator}>
          <div className={styles.planeTrace} />
          <img src="/plane-icon.png" alt="plane-icon" />
        </div>
      </div>
      <span className={styles.time}>{arrivalTime}</span>
    </div>
  );
}
