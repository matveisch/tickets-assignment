import styles from './styles/App.module.scss';
import Ticket from './components/Ticket/Ticket.tsx';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Filter from './components/Filter/Filter.tsx';
import { CurrencyContext } from './helpers/CurrencyContext.ts';
import { StopsContext } from './helpers/StopsContext.ts';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.tsx';
import { ErrorMessageContext } from './helpers/ErrorMessageContext.ts';

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

export async function getData<T>(url: string): Promise<T | undefined> {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

function App() {
  const [tickets, setTickets] = useState<TicketType[] | undefined>();
  const [filteredTickets, setFilteredTickets] = useState<TicketType[] | undefined>(tickets);
  const [currency, setCurrency] = useState<string>('RUB');
  const [stops, setStops] = useState<boolean[]>([true, false, false, false, false]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [animationOut, setAnimationOut] = useState(false);

  useEffect(() => {
    getData<TicketType[]>('Tickets.json').then((data) => setTickets(data));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setAnimationOut(true);

        setTimeout(() => {
          setErrorMessage(undefined);
          setAnimationOut(false);
        }, 500);
      }, 5000);
    }
  }, [errorMessage]);

  useEffect(() => {
    function filterFlightsByStops(flights: TicketType[], userStopSelection: boolean[]) {
      // Combine stops and no-stops selections
      const stopsToInclude = userStopSelection.slice(1, 5); // Get elements at indices 2, 3, and 4

      return flights.filter((flight) => {
        const flightStops = flight.stops;
        // Check if number of stops in flight matches any selected option (0, 1, 2, or 3)
        return stopsToInclude[flightStops];
      });
    }

    if (!stops[0]) {
      tickets && setFilteredTickets(filterFlightsByStops(tickets, stops));
    } else {
      setFilteredTickets(tickets);
    }
  }, [stops, tickets]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <StopsContext.Provider value={{ stops, setStops }}>
        <ErrorMessageContext.Provider value={{ errorMessage, setErrorMessage }}>
          <div className={styles.App}>
            <img className={styles.logo} src="/plane-logo.png" alt="plane-logo" />
            <div className={styles.mainContainer}>
              <Filter />
              {filteredTickets && (
                <div className={styles.ticketsContainer}>
                  {filteredTickets.map((ticket, index) => (
                    <Ticket ticket={ticket} key={`ticket-${index}`} />
                  ))}
                </div>
              )}
            </div>
            {errorMessage && (
              <div
                className={`${styles.errorWrapper} ${animationOut ? styles.out : styles.in}`}
                style={animationOut ? { bottom: '10vh' } : undefined}
              >
                <ErrorMessage errorMessage={errorMessage} />
              </div>
            )}
          </div>
        </ErrorMessageContext.Provider>
      </StopsContext.Provider>
    </CurrencyContext.Provider>
  );
}

export default App;
