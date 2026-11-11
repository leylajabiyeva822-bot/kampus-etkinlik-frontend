import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();

  // Hocanın slaytındaki gibi tarihi en yakın 2 etkinliği sıralayıp alıyoruz
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <section>
      <h2 className="bolum-baslik">Yaklaşan Etkinlikler</h2>
      <EventList events={upcoming} emptyText="Yakın zamanda etkinlik bulunmuyor." />
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link to="/events" className="buton">Tüm Etkinlikleri Gör</Link>
      </div>
    </section>
  );
}