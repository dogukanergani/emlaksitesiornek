const mongoose = require('mongoose');

// Linki doğrudan buraya koyuyoruz, .env dosyasını aradan çıkarıyoruz
const uri = "mongodb+srv://emlaksitesi0_db_user:Q9JIGXNq2fwAcgb@cluster0.xynegpd.mongodb.net/emlaksitesi?retryWrites=true&w=majority";

console.log("Bağlantı deneniyor...");

mongoose.connect(uri)
  .then(() => {
      console.log("🎉 TEBRİKLER! VERİTABANINA BAĞLANDI!");
      process.exit(0);
  })
  .catch(err => {
      console.log("❌ BAĞLANTI HATASI:");
      console.error(err.message);
      process.exit(1);
  });