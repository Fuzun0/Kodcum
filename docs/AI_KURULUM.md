# 🤖 Yapay Zeka (AI) Kurulum Rehberi

## ✅ Kurulum Tamamlandı!

Uygulamanıza **Google Gemini AI** entegre edildi!

---

## 🚀 Hızlı Başlangıç

### 1️⃣ API Anahtarı Alın (2 dakika)

1. Tarayıcınızda açın: https://makersuite.google.com/app/apikey
2. Google hesabınızla giriş yapın
3. **"Create API Key"** butonuna tıklayın
4. Üretilen anahtarı kopyalayın (örnek: `AIzaSyC...`)

### 2️⃣ Projeye Ekleyin

`.env` dosyasını açın ve şu satırı bulun:
```env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

Kopyaladığınız anahtarı yapıştırın:
```env
EXPO_PUBLIC_GEMINI_API_KEY=AIzaSyC_BURAYA_KENDI_ANAHTARINIZ
```

### 3️⃣ Uygulamayı Yeniden Başlatın

```bash
# Terminalde:
npm start
# veya
expo start
```

Uygulamayı kapatıp açın (R tuşuna basmanız yeterli)

---

## 🎯 AI Özellikleri

Artık uygulamanızda şunlar çalışıyor:

### 1. **Kod Analizi** 📝
```typescript
// CodeEditorScreen.tsx'de
const analysis = await AIService.analyzeCode(code);
// Kullanıcının kodunu analiz eder, hataları bulur, öneriler sunar
```

### 2. **İpucu Sistemi** 💡
```typescript
const hint = await AIService.getHint(lessonId, currentCode);
// Kullanıcı takıldığında ipucu verir
```

### 3. **Düello Soruları** 🎮
```typescript
const questions = await AIService.generateDuelQuestions('javascript', 5);
// Düellolar için dinamik sorular üretir
```

### 4. **Kavram Açıklama** 📚
```typescript
const explanation = await AIService.explainConcept('closure');
// Programlama kavramlarını açıklar
```

### 5. **Kişisel Mentor** 🎓
```typescript
const advice = await AIService.getMentorAdvice(userProgress);
// Kullanıcının gelişimine göre öneriler sunar
```

---

## 💰 Maliyetler (Güncel - 2025)

### Google Gemini (ÖNERİLEN)
- ✅ **Ücretsiz:** İlk 1500 istek/gün
- ✅ **Sonrası:** $0.35 / 1M token (çok ucuz!)
- 📊 **Örnek:** 10,000 kullanıcı/gün → ~$10/ay

### OpenAI GPT-3.5
- ❌ **Ücretli:** Baştan itibaren
- 💰 **Fiyat:** $0.50 / 1M token
- 📊 **Örnek:** 10,000 kullanıcı/gün → ~$15/ay

### OpenAI GPT-4
- ❌ **Çok pahalı:** $15 / 1M token (30x daha pahalı!)
- 📊 **Örnek:** 10,000 kullanıcı/gün → ~$450/ay

---

## 🔄 Sağlayıcı Değiştirme

Gemini yerine OpenAI kullanmak isterseniz:

**AIService.ts** dosyasında:
```typescript
// 17. satırı değiştirin:
const AI_PROVIDER = 'openai'; // 'gemini' yerine 'openai'
```

**.env** dosyasında:
```env
# OpenAI için
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
```

---

## 🧪 Test Etme

### Demo Mod (API anahtarı olmadan)
API anahtarı eklemeden de test edebilirsiniz. Uygulama otomatik olarak **demo yanıtlar** gösterir.

### Gerçek AI Test
1. Kod editörüne gidin
2. Bir kod yazın
3. "Analiz Et" butonuna basın
4. AI'ın gerçek yanıtını görün!

---

## ⚙️ Gelişmiş Ayarlar

### Model Değiştirme

**AIService.ts** - 20. satır:
```typescript
model: AI_PROVIDER === 'gemini' 
  ? 'gemini-1.5-flash'  // Hızlı ve ucuz
  // ? 'gemini-1.5-pro' // Daha akıllı, biraz pahalı
  : 'gpt-3.5-turbo',
```

### Sıcaklık (Yaratıcılık) Ayarı

**callGemini fonksiyonunda:**
```typescript
temperature: 0.7, // 0.0 = Deterministik, 1.0 = Yaratıcı
```

### Token Limiti

```typescript
maxOutputTokens: 1000, // Yanıt uzunluğu limiti
```

---

## 🐛 Sorun Giderme

### "AI API key tanımlanmamış" uyarısı
✅ `.env` dosyasında API anahtarını kontrol edin
✅ Uygulamayı yeniden başlatın (npm start)

### "Gemini API hatası: 400"
✅ API anahtarının doğru kopyalandığından emin olun
✅ Başında/sonunda boşluk olmamalı

### "Gemini API hatası: 429"
✅ Günlük kota doldu (1500 istek/gün)
✅ Yarın tekrar deneyin veya ücretli plana geçin

### Yanıtlar Türkçe değil
✅ `callGemini` fonksiyonunda sistem mesajına bakın
✅ "Türkçe cevap ver" ibaresi olmalı

---

## 📊 Kullanım İstatistikleri

API kullanımınızı takip edin:

**Gemini:** https://makersuite.google.com/app/usage

**OpenAI:** https://platform.openai.com/usage

---

## 🎓 Ek Kaynaklar

- **Gemini Docs:** https://ai.google.dev/gemini-api/docs
- **OpenAI Docs:** https://platform.openai.com/docs
- **Prompt Engineering:** https://www.promptingguide.ai/tr

---

## 💡 İpuçları

### Daha İyi Prompt'lar Yazın
```typescript
// ❌ Kötü
"kod analiz et"

// ✅ İyi
"Aşağıdaki JavaScript kodunu analiz et. Hataları bul, performans önerilerinde bulun ve best practice'lere uygunluğunu kontrol et."
```

### Hata Yönetimi
AI çağrıları her zaman başarılı olmayabilir. Kod zaten `try-catch` ile korunmuş durumda!

### Cache Kullanımı
Aynı soruları tekrar tekrar AI'a sormayın. Yanıtları cache'leyin:

```typescript
// Örnek:
const cache = new Map();
const cacheKey = `hint_${lessonId}`;

if (cache.has(cacheKey)) {
  return cache.get(cacheKey);
}

const hint = await AIService.getHint(lessonId, code);
cache.set(cacheKey, hint);
```

---

## ✨ Yeni AI Özelliği Eklemek

AIService.ts'e yeni fonksiyon ekleyin:

```typescript
async myNewFeature(input: string): Promise<string> {
  try {
    const response = await this.callAI(`
      Kullanıcı şunu istiyor: ${input}
      Türkçe ve detaylı yanıt ver.
    `);
    return response;
  } catch (error) {
    console.error('AI hatası:', error);
    return 'Varsayılan yanıt';
  }
}
```

Kullanımı:
```typescript
import AIService from '@/services/AIService';

const result = await AIService.myNewFeature('test');
```

---

## 🎉 Hazırsınız!

Artık uygulamanızda yapay zeka çalışıyor! 

Sorularınız için: https://github.com/google/generative-ai-js
