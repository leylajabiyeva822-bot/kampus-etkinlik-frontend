# Kampüs Etkinlikleri - Backend REST API

Node.js, Express ve MongoDB ile geliştirilmiş REST API servisi.

## Çalıştırma

Gereksinimleri yüklemek için:
```bash
npm install
Veritabanını örnek verilerle doldurmak için:


npm run seed
Geliştirme sunucusunu çalıştırmak için:


npm run dev
Ortam Değişkenleri (.env)
Sunucu portu ve veritabanı bağlantısı .env dosyasından okunur (örnek için .env.example dosyasına bakın):


PORT=3000
MONGODB_URI=mongodb+srv://<kullanici>:<sifre>@<cluster>.mongodb.net/kampus
REST Sözleşmesi
Method	Endpoint	Amaç	Başarılı	Hata	Durum
GET	/health	Sunucu sağlık ve durum kontrolü	200 OK	-	çalışıyor
GET	/events	Tüm etkinlik listesi (?search= & ?category=)	200 OK	-	çalışıyor
GET	/events/upcoming	Yaklaşan etkinlikler (tarihe göre artan sıralı)	200 OK	-	çalışıyor
GET	/events/:id	ID ile tek etkinlik detayı	200 OK	404 Not Found	çalışıyor
POST	/events	Yeni etkinlik ekleme	201 Created	400 Bad Request	çalışıyor
PATCH	/events/:id	Etkinlik kısmi güncelleme	200 OK	400 / 404	çalışıyor
DELETE	/events/:id	Etkinlik silme	204 No Content	404 Not Found	çalışıyor


Hata formatı:


{
  "error": {
    "message": "Hata açıklaması"
  }
}

