# Kampüs Etkinlikleri - Backend REST API

Node.js ve Express ile geliştirilmiş REST API servisi.

## Çalıştırma

Gereksinimleri yüklemek için:
\`\`\`bash
npm install
\`\`\`

Geliştirme sunucusunu çalıştırmak için:
\`\`\`bash
npm run dev
\`\`\`

## Ortam Değişkenleri (.env)

Sunucu portu `.env` dosyasından okunur:
\`\`\`env
PORT=3000
\`\`\`

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GET | `/health` | Sunucu sağlık ve durum kontrolü | 200 OK | - | Aktif |
| GET | `/events` | Tüm etkinlik listesi (?category=...) | 200 OK | - | Aktif |
| GET | `/events/:id` | ID ile tek etkinlik detayı | 200 OK | 404 Not Found | Aktif |
| POST | `/events` | Yeni etkinlik ekleme | 201 Created | 400 Bad Request | Aktif |
| PATCH | `/events/:id` | Etkinlik güncelleme | 200 OK | 400 / 404 | Sprint 9 |
| DELETE | `/events/:id` | Etkinlik silme | 204 No Content | 404 Not Found | Sprint 9 |

Hata formatı:
\`\`\`json
{
  "error": {
    "message": "Hata açıklaması"
  }
}
\`\`\`