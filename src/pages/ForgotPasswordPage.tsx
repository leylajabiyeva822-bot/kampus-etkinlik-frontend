import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [mesaj, setMesaj] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("E-posta adresi zorunludur.");
      setMesaj("");
    } else if (!email.includes("@")) {
      setError("Geçerli bir e-posta adresi giriniz.");
      setMesaj("");
    } else {
      setError("");
      setMesaj("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
    }
  }

  return (
    <section>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      {mesaj && <p style={{ color: "#43a047", fontWeight: 600, marginBottom: "1rem" }}>{mesaj}</p>}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">Kayıtlı E-posta Adresiniz</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="hata-mesaji">{error}</span>}
        </div>

        <button type="submit" className="buton">Sıfırlama Bağlantısı Gönder</button>

        <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
          <Link to="/login" style={{ color: "#43a047" }}>← Giriş Sayfasına Dön</Link>
        </p>
      </form>
    </section>
  );
}