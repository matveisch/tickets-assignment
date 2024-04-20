import styles from './Stops.module.scss';
import { useContext } from 'react';
import { StopsContext, StopsContextType } from '../../helpers/StopsContext.ts';

export default function Stops() {
  const { stops, setStops } = useContext(StopsContext) as StopsContextType;
  const stopsOptions = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

  const handleOnChange = (position: number) => {
    const updatedCheckedState = stops.map((item, index) => (index === position ? !item : item));
    setStops(updatedCheckedState);
  };

  return (
    <div className={styles.stops}>
      {stopsOptions.map((option, index) => (
        <div key={option} className={styles.outerContainer} onClick={() => handleOnChange(index)}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <label className={styles.container}>
              <input
                type="checkbox"
                checked={stops[index]}
                disabled
                // onChange={() => handleOnChange(index)}
              />
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
          <button className={styles.only}>только</button>
        </div>
      ))}
    </div>
  );
}
