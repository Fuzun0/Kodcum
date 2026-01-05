# Firebase Kurulum Rehberi

Uygulamada kullanıcı girişi, profil yönetimi ve ilerleme takibi için Firebase kullanılmaktadır.

## Adım 1: Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Proje Ekle" butonuna tıklayın
3. Proje adını girin (örn: "kodcum-app")
4. Google Analytics'i etkinleştirin (isteğe bağlı)
5. Projeyi oluşturun

## Adım 2: Web Uygulaması Ekleme

1. Firebase Console'da projenizi seçin
2. Sol menüden "Project Overview" > ⚙️ (Ayarlar) seçin
3. "Uygulamalarınız" bölümünde Web ikonuna (</>)  tıklayın
4. Uygulama adını girin (örn: "kodcum-web")
5. "Firebase Hosting" seçeneğini işaretlemeyin
6. "Uygulamayı kaydet" butonuna tıklayın

## Adım 3: Firebase Config'i Kopyalama

Firebase size bir config objesi verecek:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "kodcum-app.firebaseapp.com",
  projectId: "kodcum-app",
  storageBucket: "kodcum-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

Bu bilgileri kopyalayın.

## Adım 4: Config Dosyasını Güncelleme

`src/config/firebase.ts` dosyasını açın ve `firebaseConfig` değişkenini güncelleyin:

```typescript
const firebaseConfig = {
  apiKey: "BURAYA_KENDI_API_KEY_INIZI_YAPIŞTIRIN",
  authDomain: "BURAYA_KENDI_AUTH_DOMAIN_INIZI_YAPIŞTIRIN",
  projectId: "BURAYA_KENDI_PROJECT_ID_NIZI_YAPIŞTIRIN",
  storageBucket: "BURAYA_KENDI_STORAGE_BUCKET_INIZI_YAPIŞTIRIN",
  messagingSenderId: "BURAYA_KENDI_MESSAGING_SENDER_ID_NIZI_YAPIŞTIRIN",
  appId: "BURAYA_KENDI_APP_ID_NIZI_YAPIŞTIRIN"
};
```

## Adım 5: Authentication'ı Etkinleştirme

1. Firebase Console'da "Build" > "Authentication" seçin
2. "Get Started" butonuna tıklayın
3. "Sign-in method" sekmesine geçin
4. "Email/Password" seçeneğini etkinleştirin
5. "Save" butonuna tıklayın

## Adım 6: Firestore Database Oluşturma

1. Firebase Console'da "Build" > "Firestore Database" seçin
2. "Create database" butonuna tıklayın
3. "Start in production mode" seçin (güvenlik kurallarını sonra yapılandıracağız)
4. Bölge seçin (Europe West için: eur3)
5. "Enable" butonuna tıklayın

## Adım 7: Firestore Güvenlik Kurallarını Ayarlama

Firestore Database sayfasında "Rules" sekmesine geçin ve aşağıdaki kuralları yapıştırın:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcı profilleri
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // İlerleme kayıtları
    match /progress/{progressId} {
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      allow write: if request.auth != null && 
                      request.resource.data.userId == request.auth.uid;
    }
  }
}
```

"Publish" butonuna tıklayın.

## Adım 8: Storage Oluşturma (Profil Fotoğrafları İçin)

1. Firebase Console'da "Build" > "Storage" seçin
2. "Get Started" butonuna tıklayın
3. "Start in production mode" seçin
4. Bölge seçin (Firestore ile aynı)
5. "Done" butonuna tıklayın

Storage kurallarını güncelleyin:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile_images/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Test Etme

1. Uygulamayı başlatın: `npm start`
2. Kayıt ol ekranından yeni bir hesap oluşturun
3. Giriş yapın ve profilinizi görüntüleyin
4. Bir ders tamamlayın ve ilerlemenizin kaydedildiğini kontrol edin

## Sorun Giderme

### "Firebase: Error (auth/configuration-not-found)"
- Firebase config değerlerini doğru kopyaladığınızdan emin olun
- Authentication'ı etkinleştirdiğinizden emin olun

### "Firebase: Missing or insufficient permissions"
- Firestore güvenlik kurallarını doğru yapılandırdığınızdan emin olun
- Kullanıcının giriş yaptığından emin olun

### "Network request failed"
- İnternet bağlantınızı kontrol edin
- Firebase projesinin aktif olduğundan emin olun

## Önemli Notlar

- **GÜVENLİK**: Firebase config bilgilerinizi asla GitHub gibi public repository'lere yüklemeyin
- **FATURA**: Firebase'in ücretsiz Spark planında günlük okuma/yazma limitleri vardır
- **BACKUP**: Firestore verilerinizi düzenli olarak yedekleyin

## Ek Özellikler (İsteğe Bağlı)

### Google Sign-In Ekleme
1. Authentication > Sign-in method > Google'ı etkinleştirin
2. `expo-auth-session` paketini kullanarak OAuth flow'unu implemente edin

### Apple Sign-In Ekleme
1. Authentication > Sign-in method > Apple'ı etkinleştirin
2. `expo-apple-authentication` paketini kullanarak implemente edin

### Push Notifications
1. Firebase Cloud Messaging (FCM) kullanın
2. `expo-notifications` paketi ile entegre edin
