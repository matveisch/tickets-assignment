import moment from 'moment';
import 'moment/dist/locale/ru';
import styles from './FlightData.module.scss';

interface FlightDataProps {
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  departureDate: string;
  arrivalDate: string;
}

function transformDate(date: string) {
  const formattedDate = moment(date).locale('ru').format('D MMM YYYY, dd');

  const words = formattedDate.split(' ');
  const lastWord = words[words.length - 1];
  const capitalizedLastWord = lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
  const result = formattedDate.slice(0, formattedDate.lastIndexOf(lastWord)) + capitalizedLastWord;

  return result.replace(/[.]/g, '');
}

export default function FlightData(props: FlightDataProps) {
  const { origin, originName, destination, destinationName, arrivalDate, departureDate } = props;

  return (
    <div className={styles.flightData}>
      <div className={styles.container}>
        <span className={styles.direction}>{`${origin}, ${originName}`}</span>
        <span className={styles.timeData}>{transformDate(departureDate)}</span>
      </div>
      <div className={styles.container}>
        <span className={styles.direction}>{`${destination}, ${destinationName}`}</span>
        <span className={styles.timeData}>{transformDate(arrivalDate)}</span>
      </div>
    </div>
  );
}
