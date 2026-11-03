import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mesaj, setMesaj] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};

    if (!name.trim()) {
      err.name = "Ad Soyad zorunludur.";
    } else if (name.trim().length < 3) {
      err.name = "Ad Soyad en az 3 karakter olmalıdır.";
    }

    if (!email.trim()) {
      err.email = "E-posta adresi zorunludur.";
    } else if (!email.includes("@")) {
      err.email = "Geçerli bir e-posta adresi giriniz.";
    }

    if (!password) {
      err.password = "Şifre zorunludur.";
    } else if (password.length < 6) {
      err.password = "Şifre en az 6 karakter olmalıdır.";
    }

    if (password !== confirmPassword) {
      err.confirmPassword = "Şifreler birbiriyle eşleşmiyor.";
    }

    setErrors(err);

    if (Object.keys(err).length === 0) {
      setMesaj("Kayıt başarılı! Giriş yapabilirsiniz.");
    }
  }

  return (
    <section>
      <h2 className="bolum-baslik">Kayıt Ol</h2>
      {mesaj && <p style={{ color: "#43a047", fontWeight: 600, marginBottom: "1rem" }}>{mesaj}</p>}
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Ad Soyad</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="hata-mesaji">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="hata-mesaji">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="hata-mesaji">{errors.password}</span>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Şifre Tekrar</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <span className="hata-mesaji">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="buton">Kayıt Ol</button>

        <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#64748b" }}>
          Zaten hesabınız var mı? <Link to="/login" style={{ color: "#43a047" }}>Giriş Yap</Link>
        </p>
      </form>
    </section>
  );
}