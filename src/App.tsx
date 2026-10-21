import { useState, useEffect } from "react";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";
import "./App.css";

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = `Kampüs Etkinlikleri - ${selected.title}`;
    } else if (page === "events") {
      document.title = "Kampüs Etkinlikleri - Tüm Etkinlikler";
    } else if (page === "add") {
      document.title = "Kampüs Etkinlikleri - Etkinlik Ekle";
    } else if (page === "update") {
      document.title = "Kampüs Etkinlikleri - Etkinlik Güncelle";
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selected]);

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
const categories: Category[] = ["Seminer", "Atölye", "Konser"];

  return (
    <>
      <Header
        title={page === "detail" && selected ? selected.title : "Kampüs Etkinlikleri"}
        text={
          page === "home"
            ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
            : undefined
        }
      />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section className="etkinlik-listesi">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <button className="tumunu-gor" onClick={() => go("events")}>
              Tüm etkinlikleri gör
            </button>
          </section>
        )}

        {page === "events" && (
          <section className="etkinlik-listesi">
            <h2>Tüm Etkinlikler</h2>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <p>
              {filtered.length === 0
                ? "Etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı."
            />
          </section>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}