import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Category } from "../../types/campus-event";
import type { EventFormData } from "../../context/EventsContext";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

export default function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!data.title.trim()) {
      newErrors.title = "Etkinlik adı zorunludur.";
    } else if (data.title.trim().length < 3) {
      newErrors.title = "Etkinlik adı en az 3 karakter olmalıdır.";
    }

    if (!data.category) newErrors.category = "Lütfen bir kategori seçin.";
    if (!data.date) newErrors.date = "Tarih zorunludur.";
    if (!data.time) newErrors.time = "Saat zorunludur.";
    if (!data.location.trim()) newErrors.location = "Yer bilgisi zorunludur.";

    const quotaNum = Number(data.capacity);
    if (!data.capacity || isNaN(quotaNum) || quotaNum < 1 || quotaNum > 1000) {
      newErrors.capacity = "Kontenjan 1 ile 1000 arasında olmalıdır.";
    }

    if (!data.description.trim()) {
      newErrors.description = "Açıklama zorunludur.";
    } else if (data.description.trim().length < 10) {
      newErrors.description = "Açıklama en az 10 karakter olmalıdır.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(data);
    }
  }

  const categories = [
    "Konser", "Seminer", "Tiyatro", "Spor", "Sergi", 
    "Atölye", "Söyleşi", "Festival", "Diğer"
  ] as Category[];

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="title">Etkinlik Adı</label>
        <input type="text" id="title" name="title" value={data.title} onChange={handleChange} />
        {errors.title && <span className="hata-mesaji">{errors.title}</span>}
      </div>

      <div>
        <label htmlFor="category">Kategori</label>
        <select id="category" name="category" value={data.category} onChange={handleChange}>
          <option value="">Seçiniz</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="hata-mesaji">{errors.category}</span>}
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="date">Tarih</label>
          <input type="date" id="date" name="date" value={data.date} onChange={handleChange} />
          {errors.date && <span className="hata-mesaji">{errors.date}</span>}
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="time">Saat</label>
          <input type="time" id="time" name="time" value={data.time} onChange={handleChange} />
          {errors.time && <span className="hata-mesaji">{errors.time}</span>}
        </div>
      </div>

      <div>
        <label htmlFor="location">Yer</label>
        <input type="text" id="location" name="location" value={data.location} onChange={handleChange} />
        {errors.location && <span className="hata-mesaji">{errors.location}</span>}
      </div>

      <div>
        <label htmlFor="capacity">Kontenjan</label>
        <input type="number" id="capacity" name="capacity" value={data.capacity} onChange={handleChange} />
        {errors.capacity && <span className="hata-mesaji">{errors.capacity}</span>}
      </div>

      <div>
        <label htmlFor="description">Açıklama</label>
        <textarea id="description" name="description" rows={4} value={data.description} onChange={handleChange} />
        {errors.description && <span className="hata-mesaji">{errors.description}</span>}
      </div>

      <button type="submit" className="buton">{submitText}</button>
    </form>
  );
}