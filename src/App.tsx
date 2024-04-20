import './App.css';
import Ticket from './components/Ticket/Ticket.tsx';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface TicketType {
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
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

  useEffect(() => {
    getData<TicketType[]>('Tickets.json').then((data) => setTickets(data));
  }, []);

  return (
    <>
      {tickets && (
        <div>
          {tickets.map((ticket, index) => (
            <Ticket ticket={ticket} key={`ticket-${index}`} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
