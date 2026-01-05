# 🚀 Kodcum - İnteraktif Kod Öğrenme Uygulaması

W3Schools tarzı, AI destekli kod öğrenme platformu. React Native ve Expo ile geliştirilmiş, iOS ve Android için hazır.

![Kodcum Banner](assets/banner.png)

## 📱 Özellikler

### 🎓 Eğitim Modülleri
- **HTML, CSS, JavaScript** temel dersler
- **React, Python, Kotlin, Swift** ileri seviye içerikler
- Adım adım öğretici dersler
- İnteraktif kod örnekleri

### 💻 Canlı Kod Editörü
- Gerçek zamanlı kod yazma ve çalıştırma
- Syntax highlighting
- Hata yakalama ve gösterimi
- Kod kopyalama ve paylaşma

### 🤖 AI Asistan
- Kod analizi ve öneriler
- Hata düzeltme yardımı
- Kişisel mentor önerileri
- İpucu ve açıklama sistemi

### 📊 İlerleme Takibi
- Seviye sistemi ve XP puanları
- Günlük seri (streak) takibi
- Tamamlanan dersler
- Kategori bazlı ilerleme

### 🏆 Gamification
- Rozetler ve başarılar
- Günlük hedefler
- Liderlik tablosu
- Haftalık aktivite grafikleri

### 🌍 Çoklu Dil Desteği
- Türkçe
- İngilizce

## 🛠️ Kurulum

### Ön Gereksinimler
- [Node.js](https://nodejs.org/) (v16 veya üzeri)
- [npm](https://www.npmjs.com/) veya [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS için: macOS ve Xcode
- Android için: Android Studio

### Kurulum Adımları

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/Fuzun0/Kodcum.git
   cd Kodcum
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Firebase yapılandırması:**
   - Firebase Console'dan yeni bir proje oluşturun
   - `src/config/firebase.ts` dosyasını kendi Firebase bilgilerinizle güncelleyin
   - Detaylı kurulum için [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md) dosyasına bakın

4. **Uygulamayı başlatın:**
   ```bash
   npm start
   ```
   veya
   ```bash
   npx expo start
   ```

5. **Uygulamayı test edin:**
   - Expo Go uygulamasını telefonunuza indirin
   - QR kodu okutarak uygulamayı çalıştırın
   - Veya terminal üzerinden `a` (Android) veya `i` (iOS) tuşlarına basarak emülatörde çalıştırın

## 📚 Dökümantasyon

Detaylı kurulum ve yapılandırma bilgileri için `docs/` klasörüne bakın:
- [Firebase Kurulumu](docs/FIREBASE_SETUP.md)
- [AI Entegrasyonu](docs/AI_KURULUM.md)
- [Kullanıcı Yönetimi](docs/USER_MANAGEMENT_FEATURES.md)

## 📁 Proje Yapısı

```
Kodcum/
├── App.tsx                 # Ana uygulama dosyası
├── app.json               # Expo yapılandırması
├── package.json           # Bağımlılıklar
├── docs/                  # Dokümantasyon dosyaları
│   ├── AI_KURULUM.md
│   ├── FIREBASE_SETUP.md
│   ├── FIRESTORE_RULES_UPDATE.md
│   ├── KURULUM_TAMAMLANDI.md
│   └── USER_MANAGEMENT_FEATURES.md
├── src/
│   ├── components/        # Yeniden kullanılabilir bileşenler
│   ├── config/
│   │   └── firebase.ts    # Firebase yapılandırması
│   ├── contexts/
│   │   ├── AuthContext.tsx      # Kimlik doğrulama
│   │   ├── ThemeContext.tsx     # Tema yönetimi
│   │   ├── LanguageContext.tsx  # Çoklu dil
│   │   └── ProgressContext.tsx  # İlerleme takibi
│   ├── navigation/
│   │   └── index.tsx      # Navigasyon yapısı
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── CategoriesScreen.tsx
│   │   ├── LessonScreen.tsx
│   │   ├── CodeEditorScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── ProgressScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── AchievementsScreen.tsx
│   │   └── auth/
│   │       └── LoginScreen.tsx
│   ├── services/
│   │   └── AIService.ts   # AI entegrasyonu
│   └── types/
│       └── index.ts       # TypeScript tipleri
└── assets/                # Resimler ve fontlar
```

## 🔧 Firebase Yapılandırması

### Firestore Kuralları
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
    }
    match /quizzes/{quizId} {
      allow read: if request.auth != null;
    }
  }
}
```

### Authentication
- Email/Password authentication etkinleştirin
- (Opsiyonel) Google Sign-In ekleyin

## 🔧 Teknolojiler

- **React Native** - Mobil uygulama geliştirme
- **Expo** - Geliştirme ve dağıtım platformu
- **TypeScript** - Tip güvenliği
- **Firebase** - Backend servisleri (Auth, Firestore, Storage)
- **React Navigation** - Uygulama navigasyonu
- **Context API** - State yönetimi

## 🤖 AI Entegrasyonu

AI asistan için OpenAI veya Google Gemini API kullanabilirsiniz. Detaylı bilgi için [docs/AI_KURULUM.md](docs/AI_KURULUM.md) dosyasına bakın.

## 📱 Uygulama Ekranları

- **Ana Sayfa:** Günlük görevler ve öneriler
- **Kategoriler:** HTML, CSS, JavaScript, React vb.
- **Dersler:** Adım adım öğrenme materyalleri
- **Kod Editörü:** Canlı kod yazma ve test etme
- **Quiz:** İnteraktif sorular
- **Profil:** İlerleme ve başarılar
- **Arkadaşlar:** Sosyal özellikler
- **Düello:** Arkadaşlarla yarışma
- **AI Asistan:** Kod yardımı ve öneriler

## 🚀 Dağıtım

### Android APK Build
```bash
npx expo build:android
```

### iOS Build
```bash
npx expo build:ios
```

### iOS Build
```bash
npx expo build:ios
```

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Geliştirici:** Furkan
- **GitHub:** [github.com/Fuzun0/Kodcum](https://github.com/Fuzun0/Kodcum)

---

Made with ❤️ by Fuzun
