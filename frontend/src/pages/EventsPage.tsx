import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

export default function EventsPage() {
  const { events } = useEvents();
  const [aramaMetni, setAramaMetni] = useState("");
  const [secilenKategori, setSecilenKategori] = useState("Tümü");

  const kategoriler = [
    "Tümü", "Konser", "Seminer", "Tiyatro", "Spor", "Sergi", 
    "Atölye", "Söyleşi", "Festival", "Diğer"
  ];

  const filtrelenmisEtkinlikler = events.filter((e) => {
    const kucukArama = aramaMetni.toLowerCase();
    const metinUyuyor =
      e.title.toLowerCase().includes(kucukArama) ||
      e.location.toLowerCase().includes(kucukArama) ||
      e.description.toLowerCase().includes(kucukArama);

    const kategoriUyuyor =
      secilenKategori === "Tümü" || e.category === secilenKategori;

    return metinUyuyor && kategoriUyuyor;
  });

  return (
    <section>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>

      <div className="filtre-alani">
        <input
          type="text"
          placeholder="Etkinlik, yer veya açıklama ara..."
          value={aramaMetni}
          onChange={(e) => setAramaMetni(e.target.value)}
        />
        <select
          value={secilenKategori}
          onChange={(e) => setSecilenKategori(e.target.value)}
        >
          {kategoriler.map((kat) => (
            <option key={kat} value={kat}>
              {kat}
            </option>
          ))}
        </select>
      </div>

      {filtrelenmisEtkinlikler.length === 0 ? (
        <p>Arama kriterlerinize uygun etkinlik bulunamadı.</p>
      ) : (
        <div className="grid">
          {filtrelenmisEtkinlikler.map((e) => (
            <article key={e.id} className="kart">
              <h3>{e.title}</h3>
              <p><strong>Kategori:</strong> {e.category}</p>
              <p><strong>Tarih:</strong> {e.date.replace("T", " ")}</p>
              <p><strong>Yer:</strong> {e.location}</p>
              <p><strong>Kontenjan:</strong> {e.quota}</p>
              <Link to={`/events/${e.id}`}>Detayları gör</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}