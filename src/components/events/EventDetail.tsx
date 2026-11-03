import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay-kapsayici">
      <div className="detay-ust-izgara">
        <div className="detay-sol">
          {event.image ? (
            <figure className="afis-kutu">
              <img src={event.image} alt={`${event.title} afişi`} />
              <figcaption>{event.title} afişi</figcaption>
            </figure>
          ) : (
            <div className="afis-kutu afis-placeholder">
              <div className="afis-cerceve">
                <h2>{event.title}</h2>
                <p>
                  {formatDate(event.date)} • {event.location}
                </p>
              </div>
              <figcaption>{event.title} afişi</figcaption>
            </div>
          )}
        </div>

        <div className="detay-sag">
          <h3>Etkinlik Künyesi</h3>
          <table className="kunye-tablo">
            <tbody>
              <tr>
                <th>Tarih</th>
                <td>{formatDate(event.date)}</td>
              </tr>
              <tr>
                <th>Yer</th>
                <td>{event.location}</td>
              </tr>
              <tr>
                <th>Kategori</th>
                <td>{event.category}</td>
              </tr>
              <tr>
                <th>Kontenjan</th>
                <td>{event.quota} kişi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="detay-alt">
        <h3>Açıklama</h3>
        <p>{event.description}</p>
        <div className="detay-butonlar">
          {/* Eski butonlar Link oldu */}
          <Link to="/events" className="tumunu-gor">&larr; Listeye dön</Link>
          <Link to={`/admin/${event.id}/edit`} className="tumunu-gor">Bu etkinliği güncelle</Link>
        </div>
      </div>
    </article>
  );
}