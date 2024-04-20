import styles from './Ticket.module.scss';
import { TicketType } from '../../App.tsx';

interface TicketProps {
  ticket: TicketType;
}

export default function Ticket({ ticket }: TicketProps) {
  return (
    <div className={styles.ticketContainer}>
      <div>
        <h1>{ticket.carrier}</h1>
        <button>{ticket.price}</button>
      </div>
      <div></div>
    </div>
  );
}
