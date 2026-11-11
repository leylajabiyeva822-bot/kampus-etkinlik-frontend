import { useParams, Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import NotFoundPage from "./NotFoundPage";

export default function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return <NotFoundPage />;
  }

  const [tarih, saat] = event.date.split("T");

  return (
    <article className="detay-kapsayici">
      <div className="detay-ust-izgara">
        <div className="detay-sol">
          <figure className="afis-kutu">
            <div className="afis-placeholder">
              <div className="afis-cerceve">
                <h2>{event.title}</h2>
                <p>{tarih} - {saat}</p>
                <p>{event.location}</p>
              </div>
            </div>
            <figcaption>{event.title} Resmi Etkinlik Afişi</figcaption>
          </figure>
        </div>

        <div className="detay-sag">
          <h3>Etkinlik Künyesi</h3>
          <table className="kunye-tablo">
            <tbody>
              <tr>
                <th>Kategori:</th>
                <td>{event.category}</td>
              </tr>
              <tr>
                <th>Tarih:</th>
                <td>{tarih}</td>
              </tr>
              <tr>
                <th>Saat:</th>
                <td>{saat}</td>
              </tr>
              <tr>
                <th>Yer:</th>
                <td>{event.location}</td>
              </tr>
              <tr>
                <th>Kontenjan:</th>
                <td>{event.quota} Kişi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="detay-alt">
        <h3>Etkinlik Açıklaması</h3>
        <p>{event.description}</p>

        <div className="detay-butonlar">
          <Link to="/events" className="tumunu-gor">
            ← Listeye dön
          </Link>
          <Link to={`/admin/${event.id}/edit`} className="buton">
            Bu etkinliği güncelle
          </Link>
        </div>
      </div>
    </article>
  );
}