/**
 * Geriye dönük uyumluluk katmanı.
 * Tüm marka/işletme ayarları artık tek dosyada: config/site.ts
 * Mevcut "@/lib/config" import'ları çalışmaya devam etsin diye buradan
 * yeniden export edilir. YENİ değer eklemek için config/site.ts'i düzenleyin.
 */
export * from "@/config/site";
