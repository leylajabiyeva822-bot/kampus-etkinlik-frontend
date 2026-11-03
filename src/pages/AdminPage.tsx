import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    const onay = window.confirm(`"${title}" etkinliğini silmek istediğinizden emin misiniz?`);
    if (onay) {
      deleteEvent(id);
    }
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2 className="bolum-baslik" style={{ margin: 0 }}>Etkinlik Yönetimi</h2>
        <Link to="/admin/new" className="buton">
          + Yeni Etkinlik Ekle
        </Link>
      </div>

      {events.length === 0 ? (
        <p>Henüz kayıtlı etkinlik bulunmuyor.</p>
      ) : (
        <table className="yonetim-tablo">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Kategori</th>
              <th>Tarih</th>
              <th>Yer</th>
              <th>Kontenjan</th>
              <th style={{ textAlign: "right" }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td data-baslik="Başlık:">{e.title}</td>
                <td data-baslik="Kategori:">{e.category}</td>
                <td data-baslik="Tarih:">{e.date.replace("T", " ")}</td>
                <td data-baslik="Yer:">{e.location}</td>
                <td data-baslik="Kontenjan:">{e.quota}</td>
                <td data-baslik="İşlemler:" style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                    <Link
                      to={`/admin/${e.id}/edit`}
                      style={{
                        padding: "0.35rem 0.75rem",
                        backgroundColor: "#f1f5f9",
                        color: "#1e293b",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "0.85rem"
                      }}
                    >
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(e.id, e.title)}
                      style={{
                        padding: "0.35rem 0.75rem",
                        backgroundColor: "#ef4444",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.85rem"
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}