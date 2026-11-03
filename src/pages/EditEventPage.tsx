import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";
import type { EventFormData } from "../context/EventsContext";

export default function EditEventPage() {
  const { id } = useParams(); // URL'den etkinlik id'sini alıyoruz
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();

  // Düzenlenecek etkinliği listede buluyoruz
  const event = events.find((e) => e.id === id);

  if (!event) {
    return <NotFoundPage />;
  }

  // Veritabanındaki "2026-11-15T14:00" formatındaki tarihi, 
  // formdaki 2 ayrı kutu için tarih ve saat olarak ikiye bölüyoruz
  const [datePart, timePart] = event.date.split("T");

  // Form kutularının içine otomatik dolacak eski bilgiler
  const initialData: EventFormData = {
    title: event.title,
    date: datePart || "",
    time: timePart || "",
    location: event.location,
    category: event.category,
    capacity: event.quota.toString(),
    description: event.description,
    image: event.image || ""
  };

// "Değişiklikleri Kaydet" butonuna basılınca çalışacak
  function handleSubmit(data: EventFormData) {
    if (event) {
      updateEvent(event.id, data); // 1. Havuzdaki veriyi güncelle
      navigate("/admin"); // 2. Tabloya (Yönetim Paneline) geri dön
    }
  }

  return (
    <section>
      <h2 className="bolum-baslik">Etkinliği Güncelle</h2>
      <EventForm
        initialData={initialData}
        submitText="Değişiklikleri Kaydet"
        onSubmit={handleSubmit}
      />
    </section>
  );
}