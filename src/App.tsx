import React, { useState } from 'react';
import { EventCard } from './components/EventCard';
import { ChevronDown } from 'lucide-react';
import { Event } from './types/eventTypes';
import { events } from './data/events';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  React.useEffect(() => {
    if (events.length > 0) {
      setSelectedEvent(events[0]);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Event Security Management</h1>
          <p className="text-lg text-gray-600">Select an event to view its security profile</p>
        </header>

        <div className="mb-8">
          <div className="max-w-4xl mx-auto mb-8 relative">
            <select
              value={selectedEvent?.event_id || ''}
              onChange={(e) => {
                const eventId = Number(e.target.value);
                const event = events.find(ev => ev.event_id === eventId);
                if (event) {
                  setSelectedEvent(event);
                }
              }}
              className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {events.map(event => (
                <option key={event.event_id} value={event.event_id}>
                  {event.event_name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {selectedEvent && <EventCard event={selectedEvent} />}
      </div>
    </div>
  );
}

export default App;