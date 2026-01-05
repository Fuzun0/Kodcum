// Firebase Koleksiyon ve Alan İsimleri (Türkçe)
// Tüm Firestore işlemleri bu sabitler üzerinden yapılmalı

// ==================== KOLEKSİYON İSİMLERİ ====================
export const KOLEKSIYONLAR = {
  // Ana koleksiyonlar
  KULLANICILAR: 'kullanicilar',
  ILERLEME: 'ilerleme',
  KONUSMALAR: 'konusmalar',
  MESAJLAR: 'mesajlar',
  DUELLO_ISTEKLERI: 'duelloIstekleri',
  DUELLOLAR: 'duellolar',
  AKTIF_DUELLOLAR: 'aktivDuellolar', // Gerçek zamanlı düello takibi
  DUELLO_SONUCLARI: 'duelloSonuclari', // Düello sonuçları ve profil kayıtları
  GUNLUK_GOREVLER: 'gunlukGorevler',
  KULLANICI_GOREVLERI: 'kullaniciGorevleri',
  ARKADASLIKLAR: 'arkadasliklar',
  ARKADASLIK_ISTEKLERI: 'arkadaslikIstekleri',
  BILDIRIMLER: 'bildirimler',
  BASARIMLAR: 'basarimlar',
  SOHBET_GECMISI: 'sohbetGecmisi', // AI sohbet geçmişi
} as const;

// ==================== ALAN İSİMLERİ ====================

// Kullanıcı alanları
export const KULLANICI_ALANLARI = {
  ID: 'id',
  KULLANICI_ADI: 'kullaniciAdi',
  GORUNEN_AD: 'gorunenAd',
  EPOSTA: 'eposta',
  FOTO_URL: 'fotoUrl',
  SEVIYE: 'seviye',
  XP: 'xp',
  ROZETLER: 'rozetler',
  TAMAMLANAN_DERSLER: 'tamamlananDersler',
  TAMAMLANAN_QUIZLER: 'tamamlananQuizler',
  SERI: 'seri', // streak
  SON_AKTIF_TARIH: 'sonAktifTarih',
  OLUSTURULMA_TARIHI: 'olusturulmaTarihi',
  GUNCELLEME_TARIHI: 'guncellemeTarihi',
  TERCIH_EDILEN_DIL: 'tercihEdilenDil',
  GUNLUK_HEDEF: 'gunlukHedef',
  HAFTALIK_ILERLEME: 'haftalikIlerleme',
  TOPLAM_CALISMA_SURESI: 'toplamCalismaSuresi',
  CEVRIMICI_MI: 'cevrimiDmi',
} as const;

// İlerleme alanları
export const ILERLEME_ALANLARI = {
  KULLANICI_ID: 'kullaniciId',
  DERS_ID: 'dersId',
  DURUM: 'durum', // 'baslamadi' | 'devam_ediyor' | 'tamamlandi'
  ILERLEME_YUZDESI: 'ilerlemYuzdesi',
  TAMAMLANAN_BOLUMLER: 'tamamlananBolumler',
  SON_ERISIM: 'sonErisim',
  TOPLAM_SURE: 'toplamSure',
  QUIZ_SONUCLARI: 'quizSonuclari',
} as const;

// Konuşma alanları
export const KONUSMA_ALANLARI = {
  KATILIMCILAR: 'katilimcilar',
  KATILIMCI_ADLARI: 'katilimciAdlari',
  KATILIMCI_FOTOLARI: 'katilimciFotolari',
  SON_MESAJ: 'sonMesaj',
  SON_MESAJ_ZAMANI: 'sonMesajZamani',
  OKUNMAMIS_SAYISI: 'okunmamisSayisi',
  OLUSTURULMA_TARIHI: 'olusturulmaTarihi',
} as const;

// Mesaj alanları
export const MESAJ_ALANLARI = {
  KONUSMA_ID: 'konusmaId',
  GONDEREN_ID: 'gonderenId',
  GONDEREN_AD: 'gonderenAd',
  ALICI_ID: 'aliciId',
  ICERIK: 'icerik',
  TIP: 'tip', // 'metin' | 'kod' | 'resim' | 'duello_daveti'
  OKUNDU_MU: 'okunduMu',
  OLUSTURULMA_TARIHI: 'olusturulmaTarihi',
} as const;

// Düello alanları
export const DUELLO_ALANLARI = {
  GONDEREN_ID: 'gonderenId',
  GONDEREN_AD: 'gonderenAd',
  GONDEREN_FOTO: 'gonderenFoto',
  ALICI_ID: 'aliciId',
  ALICI_AD: 'aliciAd',
  ALICI_FOTO: 'aliciFoto',
  KATEGORI: 'kategori',
  DURUM: 'durum', // 'beklemede' | 'kabul_edildi' | 'reddedildi' | 'suruyor' | 'tamamlandi'
  SORULAR: 'sorular',
  CEVAPLAR: 'cevaplar',
  PUANLAR: 'puanlar',
  KAZANAN_ID: 'kazananId',
  OLUSTURULMA_TARIHI: 'olusturulmaTarihi',
  BITIS_TARIHI: 'bitisTarihi',
  GECERLILIK_TARIHI: 'gecerlilikTarihi',
} as const;

// Günlük görev alanları
export const GOREV_ALANLARI = {
  TARIH: 'tarih',
  BASLIK: 'baslik',
  ACIKLAMA: 'aciklama',
  GOREV: 'gorev',
  ZORLUK: 'zorluk', // 'kolay' | 'orta' | 'zor'
  KATEGORI: 'kategori',
  BASLANGIC_KODU: 'baslangicKodu',
  COZUM: 'cozum',
  XP_ODULU: 'xpOdulu',
  AI_TARAFINDAN_MI: 'aiTarafindanMi',
} as const;

// Kullanıcı görev tamamlama alanları
export const TAMAMLAMA_ALANLARI = {
  GOREV_ID: 'gorevId',
  KULLANICI_ID: 'kullaniciId',
  TARIH: 'tarih',
  KULLANICI_KODU: 'kullaniciKodu',
  TAMAMLANMA_ZAMANI: 'tamamlanmaZamani',
  KAZANILAN_XP: 'kazanilanXp',
} as const;

// Başarım alanları
export const BASARIM_ALANLARI = {
  KULLANICI_ID: 'kullaniciId',
  BASARIM_ID: 'basarimId',
  KAZANILMA_TARIHI: 'kazanilmaTarihi',
  TIP: 'tip',
} as const;

// AI Sohbet geçmişi alanları
export const SOHBET_ALANLARI = {
  KULLANICI_ID: 'kullaniciId',
  MESAJLAR: 'mesajlar',
  KONU: 'konu',
  OLUSTURULMA_TARIHI: 'olusturulmaTarihi',
  SON_GUNCELLEME: 'sonGuncelleme',
} as const;

// Durum değerleri (Türkçe)
export const DURUMLAR = {
  // İlerleme durumları
  BASLAMADI: 'baslamadi',
  DEVAM_EDIYOR: 'devam_ediyor',
  TAMAMLANDI: 'tamamlandi',
  
  // Düello durumları
  BEKLEMEDE: 'beklemede',
  KABUL_EDILDI: 'kabul_edildi',
  REDDEDILDI: 'reddedildi',
  SURUYOR: 'suruyor',
  
  // Zorluk seviyeleri
  KOLAY: 'kolay',
  ORTA: 'orta',
  ZOR: 'zor',
  
  // Mesaj tipleri
  METIN: 'metin',
  KOD: 'kod',
  RESIM: 'resim',
  DUELLO_DAVETI: 'duello_daveti',
} as const;

// Tip dönüşümleri (eski İngilizce -> yeni Türkçe)
export const eskiYeniDonusum = {
  // Koleksiyonlar
  'users': KOLEKSIYONLAR.KULLANICILAR,
  'progress': KOLEKSIYONLAR.ILERLEME,
  'conversations': KOLEKSIYONLAR.KONUSMALAR,
  'messages': KOLEKSIYONLAR.MESAJLAR,
  'duelRequests': KOLEKSIYONLAR.DUELLO_ISTEKLERI,
  'dailyChallenges': KOLEKSIYONLAR.GUNLUK_GOREVLER,
  'userChallenges': KOLEKSIYONLAR.KULLANICI_GOREVLERI,
};
