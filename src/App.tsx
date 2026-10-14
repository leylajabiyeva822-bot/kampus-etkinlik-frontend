import { useState, useEffect } from 'react';
import './App.css';
import { events } from './data/events';
import type { CampusEvent, Category } from './types/campus-event';
import { searchEvents, filterByCategory, findEventById } from './utils/filter-events';

type PageName = "home" | "events" | "add" | "detail" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  useEffect(() => {
    let title = "Kampüs Etkinlikleri";
    if (page === "detail" && selectedId) {
      const e = findEventById(events, selectedId);
      if (e) title = `Kampüs Etkinlikleri — ${e.title}`;
    } else if (page === "add") {
      title = "Etkinlik Ekle — Kampüs Etkinlikleri";
    }
    document.title = title;
  }, [page, selectedId]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p><strong>Tarih:</strong> {event.date} | <strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category} | <strong>Kontenjan:</strong> {event.quota}</p>
        <button onClick={() => go("detail", event.id)}>Detayları Gör</button>
      </article>
    );
  }

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const categories = [...new Set(events.map(e => e.category))];

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  return (
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
      </header>
      
      <nav className="menu">
        <button onClick={() => go("home")} style={{ textDecoration: page === "home" ? "underline" : "none" }}>Ana Sayfa</button>
        <button onClick={() => go("events")} style={{ textDecoration: page === "events" ? "underline" : "none" }}>Etkinlikler</button>
        <button onClick={() => go("add")} style={{ textDecoration: page === "add" ? "underline" : "none" }}>Etkinlik Ekle</button>
      </nav>

      <main>
        {page === "home" && (
          <div>
            <h2>Yaklaşan Etkinlikler</h2>
            <section className="etkinlik-listesi">{upcoming.map(renderCard)}</section>
          </div>
        )}

        {page === "events" && (
          <div>
            <h2>Tüm Etkinlikler</h2>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <input type="search" placeholder="Etkinlik ara..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <select value={category} onChange={(e) => setCategory(e.target.value as Category | "")}>
                <option value="">Tüm Kategoriler</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <p>Bulunan sonuç: {filtered.length === 0 ? "Bulunamadı" : filtered.length}</p>
            <section className="etkinlik-listesi">{filtered.map(renderCard)}</section>
          </div>
        )}

        {page === "detail" && selectedEvent && (
          <article className="detay-sayfasi">
            <h2>{selectedEvent.title}</h2>
            <p><strong>Açıklama:</strong> {selectedEvent.description}</p>
            <ul>
              <li><strong>Tarih:</strong> {selectedEvent.date}</li>
              <li><strong>Yer:</strong> {selectedEvent.location}</li>
              <li><strong>Kategori:</strong> {selectedEvent.category}</li>
              <li><strong>Kalan Kontenjan:</strong> {selectedEvent.quota}</li>
            </ul>
            <button onClick={() => go("events")}>Listeye Dön</button>
            <button onClick={() => go("update", selectedEvent.id)} style={{marginLeft: "10px"}}>Bu Etkinliği Güncelle</button>
          </article>
        )}

        {page === "detail" && !selectedEvent && (
          <div>
            <p>Etkinlik bulunamadı.</p>
            <button onClick={() => go("events")}>Listeye Dön</button>
          </div>
        )}

        {(page === "add" || page === "update") && (
          <div>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinliği Güncelle"}</h2>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="title" style={{ display: "block", marginBottom: "0.5rem" }}>Etkinlik Adı</label>
                <input id="title" type="text" maxLength={80} style={{ width: "100%", padding: "0.5rem" }} />
              </div>
              
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="description" style={{ display: "block", marginBottom: "0.5rem" }}>Açıklama</label>
                <textarea id="description" rows={5} style={{ width: "100%", padding: "0.5rem" }}></textarea>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="date" style={{ display: "block", marginBottom: "0.5rem" }}>Tarih</label>
                  <input id="date" type="date" style={{ width: "100%", padding: "0.5rem" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="category" style={{ display: "block", marginBottom: "0.5rem" }}>Kategori</label>
                  <select id="category" style={{ width: "100%", padding: "0.5rem" }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#2ecc71", color: "white", border: "none", cursor: "pointer" }}>
                Kaydet (Sprint 5'te çalışacak)
              </button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}

export default App;