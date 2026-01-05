# Kullanıcı Yönetim Sistemi Özellikleri

Bu belge, uygulamaya eklenen kullanıcı yönetim, profil ve ilerleme takip sisteminin özelliklerini açıklar.

## 🎯 Eklenen Özellikler

### 1. Firebase Entegrasyonu
- ✅ Firebase Authentication ile kullanıcı girişi
- ✅ Firestore Database ile veri saklama
- ✅ Firebase Storage ile profil fotoğrafları (hazır)
- ✅ Offline desteği (AsyncStorage fallback)

### 2. Kullanıcı Kimlik Doğrulama
- ✅ Email/Password ile kayıt olma
- ✅ Email/Password ile giriş yapma
- ✅ Güvenli çıkış yapma
- ✅ Auth state yönetimi
- 🔜 Google Sign-In (hazır altyapı)
- 🔜 Apple Sign-In (hazır altyapı)

### 3. Kullanıcı Profili
- ✅ Profil görüntüleme ekranı
- ✅ Profil düzenleme ekranı
- ✅ Avatar/Profil fotoğrafı (UI hazır, paket gerekli)
- ✅ Kullanıcı adı değiştirme
- ✅ Email görüntüleme (değiştirilemez)
- ✅ Seviye ve XP gösterimi
- ✅ İstatistikler (tamamlanan dersler, streak, toplam süre)

### 4. İlerleme Takip Sistemi
- ✅ Ders tamamlama kaydı
- ✅ Quiz sonuçları kaydı
- ✅ Çalışma süresi takibi
- ✅ Firebase senkronizasyonu
- ✅ Offline mod desteği
- ✅ Otomatik XP kazanımı (ders başına 50 XP)
- ✅ Seviye sistemi (100 XP = 1 seviye)

### 5. Günlük Hedef Sistemi
- ✅ Günlük çalışma hedefi (dakika)
- ✅ Günlük ilerleme takibi
- ✅ Haftalık aktivite grafiği
- ✅ Hedef tamamlama bildirimleri
- ✅ Kişiselleştirilebilir hedefler (5-240 dakika)

### 6. Streak (Günlük Seri) Sistemi
- ✅ Günlük aktiflik takibi
- ✅ Streak sayacı
- ✅ Otomatik streak güncelleme
- ✅ Streak kaybetme kontrolü

### 7. Rozet (Badge) Sistemi
- ✅ İlk ders rozeti
- ✅ 7 günlük seri rozeti
- ✅ 30 günlük seri rozeti
- ✅ Seviye rozetleri (5, 10, vb.)
- ✅ Otomatik rozet kazanımı

### 8. İstatistikler ve Analizler
- ✅ Haftalık aktivite grafiği
- ✅ Kategori bazlı ilerleme
- ✅ Toplam çalışma süresi
- ✅ Tamamlanan ders sayısı
- ✅ XP ve seviye gösterimi

## 📁 Dosya Yapısı

```
src/
├── config/
│   └── firebase.ts                 # Firebase yapılandırması
├── services/
│   ├── UserService.ts             # Kullanıcı işlemleri
│   └── ProgressService.ts         # İlerleme işlemleri
├── contexts/
│   ├── AuthContext.tsx            # Auth state yönetimi (güncellendi)
│   └── ProgressContext.tsx        # İlerleme state (güncellendi)
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx        # Giriş/Kayıt ekranı
│   │   └── RegisterScreen.tsx     # Kayıt ekranı
│   ├── ProfileScreen.tsx          # Profil görüntüleme (güncellendi)
│   ├── EditProfileScreen.tsx      # Profil düzenleme (YENİ)
│   └── ProgressScreen.tsx         # İlerleme ekranı (güncellendi)
└── types/
    └── index.ts                   # Tip tanımları (güncellendi)
```

## 🚀 Kullanım

### Kullanıcı Kayıt Olma
```typescript
import { useAuth } from '../contexts/AuthContext';

const { signUp } = useAuth();
await signUp('email@example.com', 'password123', 'Kullanıcı Adı');
```

### Kullanıcı Girişi
```typescript
const { signIn } = useAuth();
await signIn('email@example.com', 'password123');
```

### Profil Güncelleme
```typescript
const { updateUserProfile } = useAuth();
await updateUserProfile({
  displayName: 'Yeni Ad',
  dailyGoal: 45
});
```

### İlerleme Kaydetme
```typescript
import { useProgress } from '../contexts/ProgressContext';

const { addProgress } = useProgress();
await addProgress('lesson-id', true, 85); // completed, quizScore
```

### XP Kazanma
```typescript
const { awardXP } = useProgress();
await awardXP(50); // 50 XP ekle
```

### Streak Güncelleme
```typescript
const { checkAndUpdateStreak } = useProgress();
await checkAndUpdateStreak();
```

## 🔧 Yapılandırma

### Firebase Kurulumu
1. `FIREBASE_SETUP.md` dosyasını takip edin
2. Firebase config bilgilerinizi `src/config/firebase.ts` dosyasına ekleyin
3. Authentication ve Firestore'u etkinleştirin

### Offline Mod
Uygulama otomatik olarak offline modda çalışır. Veriler:
1. Önce Firebase'e kaydedilir
2. Başarısızlıkta AsyncStorage'a kaydedilir
3. Bağlantı sağlandığında otomatik senkronize olur

## 📊 Veri Modelleri

### User Model
```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  level: number;
  xp: number;
  badges: Badge[];
  completedLessons: string[];
  completedQuizzes: string[];
  streak: number;
  lastActiveDate: string;
  createdAt: string;
  preferredLanguage: 'tr' | 'en';
  dailyGoal?: number;
  weeklyGoalProgress?: number;
  totalStudyTime?: number;
}
```

### Progress Model
```typescript
interface Progress {
  lessonId: string;
  completed: boolean;
  quizScore?: number;
  completedAt?: string;
  timeSpent: number;
}
```

### Badge Model
```typescript
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}
```

## 🔐 Güvenlik

- Firebase Authentication ile güvenli kullanıcı yönetimi
- Firestore güvenlik kuralları ile veri koruması
- Kullanıcılar sadece kendi verilerine erişebilir
- Password şifreleme Firebase tarafından yönetilir

## 🎨 UI/UX İyileştirmeleri

### Profil Ekranı
- Modern card tasarımı
- Avatar ile kişiselleştirme
- İstatistik kartları
- Hızlı erişim menüsü

### İlerleme Ekranı
- Günlük hedef kartı
- Seviye ilerleme çubuğu
- Haftalık aktivite grafiği
- Rozet koleksiyonu
- Kategori bazlı ilerleme

### Profil Düzenleme
- Avatar değiştirme (UI hazır)
- Günlük hedef seçimi
- Kullanıcı adı güncelleme
- Gerçek zamanlı önizleme

## 📱 Ekran Akışı

```
Login Screen
    ↓
Main App (Tab Navigation)
    ├── Home
    ├── Categories → Lessons → Lesson Detail
    ├── Progress (Günlük hedef, istatistikler)
    └── Profile → Edit Profile
```

## 🔄 Veri Akışı

```
User Action → Context → Service → Firebase → Firestore/Auth
                ↓                      ↓
         AsyncStorage (offline)    Success/Error
                ↓                      ↓
            UI Update ← State Update ←
```

## 🎯 Gelecek Geliştirmeler

- [ ] Profil fotoğrafı yükleme (expo-image-picker kurulumu)
- [ ] Google Sign-In entegrasyonu
- [ ] Apple Sign-In entegrasyonu
- [ ] Push notifications (hedef hatırlatıcıları)
- [ ] Arkadaş sistemi ve liderlik tablosu
- [ ] Haftalık/Aylık raporlar
- [ ] Rozet koleksiyonu genişletme
- [ ] Başarım sistemi (achievements)

## 🐛 Bilinen Sorunlar

- expo-image-picker paketi kurulu değil (profil fotoğrafı için)
- Google/Apple Sign-In henüz implemente edilmedi
- Offline senkronizasyon queue sistemi yok (manuel)

## 💡 İpuçları

1. İlk kullanımda Firebase config'i mutlaka güncelleyin
2. Firestore güvenlik kurallarını production'a geçmeden önce gözden geçirin
3. Offline mod için AsyncStorage limitlerini göz önünde bulundurun
4. XP ve seviye hesaplamalarını ihtiyaca göre özelleştirin
5. Badge koşullarını genişletmek için `ProgressContext.checkBadges()` metodunu güncelleyin
