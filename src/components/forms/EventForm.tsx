interface EventFormProps {
  onSubmit: () => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="form-bilgi">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label htmlFor="title">Etkinlik Adı</label>
        <input id="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />

        <label htmlFor="category">Kategori</label>
        <select id="category">
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>

        <label htmlFor="date">Tarih</label>
        <input id="date" type="date" />

        <label htmlFor="time">Saat</label>
        <input id="time" type="time" />

        <label htmlFor="location">Yer</label>
        <input id="location" placeholder="Örn. A Blok Konferans Salonu" />

        <label htmlFor="capacity">Kontenjan</label>
        <input id="capacity" type="number" />

        <label htmlFor="description">Açıklama</label>
        <textarea id="description" rows={5} />
      </form>
    </>
  );
}