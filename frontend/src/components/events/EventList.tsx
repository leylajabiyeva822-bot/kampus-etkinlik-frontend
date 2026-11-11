import EventCard from "./EventCard";
import type { CampusEvent } from "../../types/campus-event";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

export default function EventList({ events, emptyText = "Etkinlik bulunamadı." }: EventListProps) {
  if (events.length === 0) {
    return <p>{emptyText}</p>;
  }

  return (
    <div className="grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}