import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import type { EventFormData } from "../context/EventsContext";

export default function AddEventPage() {
  const { addEvent } = useEvents(); // Havuzdan etkinlik ekleme yeteneğini alıyoruz
  const navigate = useNavigate(); // Başarılı olunca başka sayfaya yönlendirmek için

  // Form ilk açıldığında kutuların içi tamamen boş olsun
  const initialData: EventFormData = {
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    capacity: "",
    description: "",
    image: ""
  };

  // Kullanıcı "Kaydet" butonuna bastığında ve formda hata yoksa burası çalışır
  function handleSubmit(data: EventFormData) {
    addEvent(data); // 1. Etkinliği sisteme kaydet
    navigate("/admin"); // 2. Kullanıcıyı Yönetim Paneli tablolarına geri yolla
  }

  return (
    <section>
      <h2 className="bolum-baslik">Yeni Etkinlik Ekle</h2>
      
      {/* Yaptığımız formu sayfaya yerleştiriyoruz */}
      <EventForm
        initialData={initialData}
        submitText="Etkinliği Oluştur"
        onSubmit={handleSubmit}
      />
    </section>
  );
}