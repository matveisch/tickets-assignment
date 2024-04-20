import styles from './Ticket.module.scss';
import { TicketType } from '../../App.tsx';
import PriceButton from '../PriceButton/PriceButton.tsx';
import TimeTable from '../TimeTable/TimeTable.tsx';
import FlightData from '../FlightData/FlightData.tsx';

interface TicketProps {
  ticket: TicketType;
}

export default function Ticket({ ticket }: TicketProps) {
  const {
    carrier,
    price,
    departure_time,
    arrival_time,
    stops,
    origin,
    origin_name,
    destination,
    destination_name,
    departure_date,
    arrival_date,
  } = ticket;

  function getAirlineLogo(carrier: string) {
    switch (carrier) {
      case 'TK':
        return '/turkish-airlines.png';
      case 'S7':
        return '/s7.png';
      case 'SU':
        return '/su.png';
      case 'BA':
        return '/ba.png';
    }
  }

  return (
    <div className={styles.ticketContainer}>
      <div className={styles.leftContainer}>
        <img src={getAirlineLogo(carrier)} alt="airline-logo" />
        <PriceButton price={price} />
      </div>
      <div className={styles.mobileLeftContainer}>
        <PriceButton price={price} />
      </div>
      <div className={styles.rightContainer}>
        <TimeTable departureTime={departure_time} arrivalTime={arrival_time} stops={stops} />
        <FlightData
          origin={origin}
          originName={origin_name}
          destination={destination}
          destinationName={destination_name}
          departureDate={departure_date}
          arrivalDate={arrival_date}
        />
      </div>
    </div>
  );
}
