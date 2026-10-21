import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <h2>{event.title}</h2>
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} afişi`} />
        </figure>
      )}
      <div className="kunye">
        <h3>Etkinlik Künyesi</h3>
        <p>
          <strong>Tarih:</strong> {formatDate(event.date)}
        </p>
        <p>
          <strong>Yer:</strong> {event.location}
        </p>
        <p>
          <strong>Kategori:</strong> {event.category}
        </p>
        <p>
          <strong>Kontenjan:</strong> {event.quota} kişi
        </p>
      </div>
      <div className="aciklama">
        <h3>Açıklama</h3>
        <p>{event.description}</p>
      </div>
      <div className="detay-butonlar">
        <button onClick={onBack}>&larr; Listeye dön</button>
        <button onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
      </div>
    </article>
  );
}