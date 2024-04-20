import styles from './Stops.module.scss';
import { useContext } from 'react';
import { StopsContext, StopsContextType } from '../../helpers/StopsContext.ts';

export default function Stops() {
  const { stops, setStops } = useContext(StopsContext) as StopsContextType;
  const stopsOptions = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

  const handleOnChange = (position: number) => {
    const updatedCheckedState = [...stops];

    if (position === 0) {
      // Uncheck all checkboxes except the first one
      updatedCheckedState.fill(false, 1); // Starts filling from index 1
      updatedCheckedState[0] = true;
    } else {
      // For any other checkbox:
      // Toggle the clicked checkbox's state only
      updatedCheckedState[position] = !updatedCheckedState[position];
      // If clicked checkbox is now unchecked, uncheck the first one
      if (updatedCheckedState[position] && updatedCheckedState[0]) {
        updatedCheckedState[0] = false;
      }
    }

    setStops(updatedCheckedState);
  };

  return (
    <div className={styles.stops}>
      {stopsOptions.map((option, index) => (
        <div key={option} className={styles.outerContainer} onClick={() => handleOnChange(index)}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <label className={styles.container}>
              <input type="checkbox" checked={stops[index]} disabled />
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
