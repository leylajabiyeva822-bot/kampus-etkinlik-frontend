import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <span className="kategori">{event.category}</span>
      <p>
        <strong>Tarih:</strong> {formatDate(event.date)}
      </p>
      <p>
        <strong>Yer:</strong> {event.location}
      </p>
      <p>
        <strong>Kontenjan:</strong> {event.quota} kişi
      </p>
      <p>{event.description.substring(0, 80)}...</p>
      
      {/* Eski buton yerine artık Link kullanıyoruz */}
      <Link to={`/events/${event.id}`}>Detayları gör</Link>
    </article>
  );
}