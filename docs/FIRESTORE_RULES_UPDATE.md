# Firestore Kurallarını Manuel Güncelleme

## Adımlar:

1. Firebase Console'a gidin: https://console.firebase.google.com/
2. Projenizi seçin: **kodcum-41b19**
3. Sol menüden **Firestore Database** > **Rules** sekmesine gidin
4. Aşağıdaki kuralları kopyalayıp yapıştırın
5. **Publish** (Yayınla) butonuna tıklayın

## Yeni Kurallar:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Kullanıcı profilleri
    match /users/{userId} {
      // Tüm kullanıcıları okuyabilir (arama için gerekli)
      allow read: if true;
      
      // Kendi profilini oluşturabilir/düzenleyebilir
      allow create, update: if request.resource.data.id == userId;
      
      // Silme yasak
      allow delete: if false;
    }
    
    // Arkadaşlık istekleri
    match /friendRequests/{requestId} {
      allow read, write: if true;
    }
    
    // Arkadaşlıklar
    match /friendships/{friendshipId} {
      allow read, write: if true;
    }
    
    // İlerleme kayıtları
    match /progress/{progressId} {
      // İlerleme kayıtlarını okuyabilir/yazabilir
      allow read, write: if true;
    }
    
    // Gelecekte eklenebilecek koleksiyonlar için varsayılan kural
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Değişiklik Özeti:

- ❌ Kaldırıldı: `request.auth != null` kontrolleri (Firebase Auth kullanılmıyor)
- ✅ Eklendi: Kullanıcı profilleri için genel okuma izni (arkadaş aramada gerekli)
- ✅ Eklendi: Arkadaşlık sistemi için yeni koleksiyonlar
- ✅ Basitleştirildi: İlerleme kayıtları için kurallar

## Kuralları güncelledikten sonra:

Uygulamayı yeniden başlatın ve test edin:
- Yeni kullanıcı kaydı Firebase'e kaydedilecek
- Kullanıcı adı ile arama çalışacak
