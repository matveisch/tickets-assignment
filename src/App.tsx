import styles from './styles/App.module.scss';
import Ticket from './components/Ticket/Ticket.tsx';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Filter from './components/Filter/Filter.tsx';
import { CurrencyContext } from './helpers/CurrencyContext.ts';
import { StopsContext } from './helpers/StopsContext.ts';

export interface TicketType {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  carrier: string;
  stops: number;
  price: number;
}

async function getData<T>(url: string): Promise<T | undefined> {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

function App() {
  const [tickets, setTickets] = useState<TicketType[] | undefined>();
  const [currency, setCurrency] = useState<string>('RUB');
  const [stops, setStops] = useState<number | undefined>(undefined);

  useEffect(() => {
    getData<TicketType[]>('Tickets.json').then((data) => setTickets(data));
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <StopsContext.Provider value={{ stops, setStops }}>
        <div className={styles.App}>
          <Filter />
          {tickets && (
            <div className={styles.ticketsContainer}>
              {tickets.map((ticket, index) => (
                <Ticket ticket={ticket} key={`ticket-${index}`} />
              ))}
            </div>
          )}
        </div>
      </StopsContext.Provider>
    </CurrencyContext.Provider>
  );
}

export default App;
