import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section style={{ textAlign: "center", padding: "4rem 0" }}>
      <h1 style={{ fontSize: "4rem", color: "var(--renk-ana)", marginBottom: "1rem", marginTop: 0 }}>404</h1>
      <h2 className="bolum-baslik" style={{ border: "none" }}>Sayfa Bulunamadı</h2>
      <p style={{ marginBottom: "2rem" }}>Aradığınız etkinlik veya sayfa silinmiş ya da adresi yanlış yazılmış olabilir.</p>
      <Link to="/" className="buton">Ana Sayfaya Dön</Link>
    </section>
  );
}