// AI Servis - OpenAI veya Google Gemini API entegrasyonu
// Bu dosyada AI asistan fonksiyonları bulunmaktadır

interface AIConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

// Environment variable'dan API key al (güvenli)
// .env dosyasında EXPO_PUBLIC_GEMINI_API_KEY tanımlanmalı
const getApiKey = (): string => {
  // Expo'nun environment variable'larını kullan
  const key = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
  if (!key || key === 'your_gemini_api_key_here') {
    console.warn('AI API key tanımlanmamış. AI özellikleri çalışmayacak.');
    return '';
  }
  return key;
};

const AI_PROVIDER = 'gemini'; // 'gemini' veya 'openai'

const config: AIConfig = {
  apiKey: getApiKey(),
  model: AI_PROVIDER === 'gemini' ? 'gemini-2.0-flash' : 'gpt-3.5-turbo',
  baseUrl: AI_PROVIDER === 'gemini' 
    ? 'https://generativelanguage.googleapis.com/v1beta/models'
    : 'https://api.openai.com/v1',
};

class AIService {
  private static instance: AIService;

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Kodu analiz et ve öneriler sun
   */
  async analyzeCode(code: string): Promise<string> {
    try {
      // Gerçek API çağrısı yapılacak
      // Şimdilik örnek yanıt döndürüyoruz
      
      const response = await this.callAI(`
        Bu kodu kısaca analiz et (max 3 cümle, emoji kullan):
        ${code}
        
        Sadece: ✅/❌ durum + 1 öneri
      `);

      return response;
    } catch (error) {
      console.error('AI analiz hatası:', error);
      return this.getMockAnalysis(code);
    }
  }

  /**
   * Ders için ipucu al
   */
  async getHint(lessonId: string, currentCode: string): Promise<string> {
    try {
      const response = await this.callAI(`
        ${lessonId} için mini ipucu ver (1-2 cümle, 1 emoji):
        Mevcut kod: ${currentCode}
        
        💡 Direkt ipucu, gereksiz açıklama yapma.
      `);

      return response;
    } catch (error) {
      console.error('AI ipucu hatası:', error);
      return this.getMockHint(lessonId);
    }
  }

  /**
   * Kodu düzelt
   */
  async fixCode(code: string, error: string): Promise<string> {
    try {
      const response = await this.callAI(`
        Bu JavaScript kodu şu hatayı veriyor: ${error}
        
        Kod:
        ${code}
        
        Düzeltilmiş kodu ve açıklamasını ver.
      `);

      return response;
    } catch (error) {
      console.error('AI düzeltme hatası:', error);
      return 'Kod düzeltmesi şu anda kullanılamıyor.';
    }
  }

  /**
   * Kavramı açıkla
   */
  async explainConcept(concept: string): Promise<string> {
    try {
      const response = await this.callAI(`
        "${concept}" nedir? (max 3 cümle + 1 mini kod örneği)
        
        Cool ve anlaşılır açıkla, emoji kullan.
      `);

      return response;
    } catch (error) {
      console.error('AI açıklama hatası:', error);
      return `${concept} kavramı hakkında bilgi şu anda yüklenemiyor.`;
    }
  }

  /**
   * Quiz sorusu üret
   */
  async generateQuizQuestion(topic: string, difficulty: string): Promise<any> {
    try {
      const response = await this.callAI(`
        ${topic} konusunda ${difficulty} seviyede bir çoktan seçmeli soru üret.
        JSON formatında döndür:
        {
          "question": "soru metni",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 0,
          "explanation": "açıklama"
        }
      `);

      return JSON.parse(response);
    } catch (error) {
      console.error('AI soru üretme hatası:', error);
      return null;
    }
  }

  /**
   * Düello için 5 soru üret - Her düello için benzersiz sorular
   */
  async generateDuelQuestions(category: string, count: number = 5): Promise<any[]> {
    console.log(`🤖 AI Düello soruları üretiliyor: ${category} (${count} soru)`);
    
    try {
      // API key kontrolü
      if (!config.apiKey || config.apiKey.includes('your_')) {
        console.log('❌ AI API key bulunamadı, boş dizi dönülüyor');
        return [];
      }
      
      // Kategori isimlerini Türkçe'ye çevir (küçük harfe normalize et)
      const normalizedCategory = category.toLowerCase();
      const categoryNames: { [key: string]: string } = {
        'javascript': 'JavaScript programlama',
        'python': 'Python programlama',
        'html': 'HTML web geliştirme',
        'css': 'CSS stil',
        'java': 'Java programlama',
        'csharp': 'C# programlama',
        'cpp': 'C++ programlama',
        'kotlin': 'Kotlin programlama',
        'swift': 'Swift programlama',
        'react': 'React framework'
      };

      const topicName = categoryNames[normalizedCategory] || category;
      console.log(`📚 Kategori: ${normalizedCategory} -> ${topicName}`);
      
      // Benzersizlik için rastgele seed ve zaman damgası kullan
      const uniqueSeed = Date.now() + Math.random();
      const randomTopics = this.getRandomSubTopics(normalizedCategory);
      
      const response = await this.callAI(`
        ${topicName} konusunda ${count} adet ÖZGÜn ve YENİ çoktan seçmeli soru üret.
        
        ÖNEMLİ KURALLAR:
        - Her soru BENZERSİZ olmalı, daha önce sorulmamış konularda olsun
        - Sorular şu alt konulardan olsun: ${randomTopics.join(', ')}
        - Sorular farklı zorluk seviyelerinde olsun (1 kolay, 2 orta, 2 zor)
        - Her sorunun 4 şıkkı olsun ve sadece 1 doğru cevap olsun
        - Soru numarası: ${uniqueSeed} (benzersizlik için)
        
        SADECE JSON formatında yanıt ver, başka hiçbir şey yazma:
        [
          {
            "question": "soru metni",
            "options": ["şık A", "şık B", "şık C", "şık D"],
            "correctAnswer": 0,
            "difficulty": "easy"
          }
        ]
        
        correctAnswer 0-3 arası bir sayı olmalı (doğru şıkkın index'i).
        difficulty: "easy", "medium" veya "hard" olabilir.
      `);

      console.log(`✅ AI yanıtı alındı: ${response.substring(0, 100)}...`);
      
      // JSON parse et
      const cleanResponse = response.trim();
      const jsonMatch = cleanResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const questions = JSON.parse(jsonMatch[0]);
        console.log(`🎯 ${questions.length} benzersiz soru başarıyla parse edildi`);
        return questions.slice(0, count);
      }
      
      console.log('⚠️ JSON parse edilemedi');
      return [];
    } catch (error) {
      console.error('❌ AI düello soruları üretme hatası:', error);
      return [];
    }
  }

  /**
   * Kategori için rastgele alt konular seç
   */
  private getRandomSubTopics(category: string): string[] {
    const subTopics: { [key: string]: string[] } = {
      'javascript': ['değişkenler', 'fonksiyonlar', 'diziler', 'nesneler', 'döngüler', 'koşullar', 'string metotları', 'array metotları', 'ES6 özellikleri', 'async/await', 'promises', 'DOM manipülasyonu', 'event handling', 'closures', 'hoisting'],
      'python': ['değişkenler', 'veri tipleri', 'listeler', 'sözlükler', 'fonksiyonlar', 'döngüler', 'koşullar', 'string işlemleri', 'dosya işlemleri', 'modüller', 'class ve OOP', 'list comprehension', 'lambda fonksiyonlar', 'hata yönetimi'],
      'html': ['temel etiketler', 'form elemanları', 'tablo yapısı', 'semantik HTML', 'bağlantılar', 'resimler', 'listeler', 'meta etiketleri', 'HTML5 özellikleri', 'input tipleri', 'video/audio', 'iframe'],
      'css': ['seçiciler', 'box model', 'flexbox', 'grid', 'positioning', 'renkler', 'typography', 'animasyonlar', 'transitions', 'media queries', 'pseudo-class', 'pseudo-element', 'CSS değişkenleri'],
      'kotlin': ['değişkenler', 'null safety', 'data class', 'fonksiyonlar', 'extension functions', 'lambdalar', 'collections', 'koşullar', 'döngüler', 'coroutines', 'sealed class'],
      'swift': ['değişkenler', 'optionals', 'struct vs class', 'fonksiyonlar', 'closures', 'protocols', 'extensions', 'enum', 'guard statement', 'collections', 'error handling'],
      'react': ['components', 'props', 'state', 'hooks', 'useEffect', 'useState', 'JSX', 'event handling', 'conditional rendering', 'lists ve keys', 'forms', 'context API', 'refs'],
    };

    const topics = subTopics[category] || subTopics['javascript'];
    // Rastgele 3-4 konu seç
    const shuffled = topics.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }

  /**
   * Kişisel mentor önerisi
   */
  async getMentorAdvice(userProgress: any): Promise<string> {
    try {
      const response = await this.callAI(`
        Kullanıcı profili:
        - Seviye: ${userProgress.level}
        - Tamamlanan dersler: ${userProgress.completedLessons}
        - Zayıf olduğu konular: ${userProgress.weakTopics}
        
        Kişisel bir mentor gibi önerilerde bulun.
      `);

      return response;
    } catch (error) {
      console.error('AI mentor hatası:', error);
      return 'Şu anda öneri üretilemiyor.';
    }
  }

  // ==================== YENİ AI ÖZELLİKLERİ ====================

  /**
   * 💬 AI Sohbet Asistanı - Programlama sorularını cevapla
   */
  async chat(message: string, context?: string): Promise<string> {
    try {
      const contextInfo = context ? `\nBağlam: ${context}` : '';
      
      const response = await this.callAI(`
        Sen Kodcum uygulamasının cool AI asistanısın. Genç ve modern bir yaklaşımla programlama öğretiyorsun.
        
        KURALAR:
        - Türkçe cevap ver
        - MAKSIMUM 3-4 cümle kullan
        - Emoji kullan ama abartma (sadece 1-2 tane)
        - Direkt konuya gir, gereksiz giriş yapma
        - Kod örneği vereceksen çok kısa olsun (2-3 satır max)
        - Samimi ve yakın bir dil kullan (ama saygılı)
        - "Cool bir tip" gibi davran, fazla ciddi olma
        ${contextInfo}
        
        Soru: ${message}
      `);

      return response;
    } catch (error) {
      console.error('AI sohbet hatası:', error);
      return '🤖 Üzgünüm, şu anda yanıt veremiyorum. Lütfen tekrar deneyin.';
    }
  }

  /**
   * 🔄 Kod Çevirisi - Bir dilden diğerine çevir
   */
  async translateCode(code: string, fromLanguage: string, toLanguage: string): Promise<string> {
    try {
      const response = await this.callAI(`
        ${fromLanguage} kodunu ${toLanguage}'e çevir (kısa açıklama + kod):
        
        \`\`\`${fromLanguage}
        ${code}
        \`\`\`
      `);

      return response;
    } catch (error) {
      console.error('Kod çevirisi hatası:', error);
      return '❌ Kod çevirisi yapılamadı. Lütfen tekrar deneyin.';
    }
  }

  /**
   * 🐛 Hata Ayıklama Asistanı - Hata mesajlarını açıkla
   */
  async debugError(errorMessage: string, code?: string): Promise<string> {
    try {
      const codeContext = code ? `\nİlgili kod:\n\`\`\`\n${code}\n\`\`\`` : '';
      
      const response = await this.callAI(`
        Hata: ${errorMessage}
        ${codeContext}
        
        3 madde halinde yanıt ver (her madde max 2 satır):
        🔴 Neden?
        ✅ Çözüm?
        💡 İpucu?
      `);

      return response;
    } catch (error) {
      console.error('Hata ayıklama hatası:', error);
      return '❌ Hata analiz edilemedi. Lütfen tekrar deneyin.';
    }
  }

  /**
   * 📝 Otomatik Kod Açıklama - Kodu satır satır açıkla
   */
  async explainCode(code: string, language?: string): Promise<string> {
    try {
      const langInfo = language ? ` (${language})` : '';
      
      const response = await this.callAI(`
        Bu kodu${langInfo} açıkla (max 5-6 cümle):
        
        \`\`\`
        ${code}
        \`\`\`
        
        📝 Ne yapıyor? (1-2 cümle)
        ✨ Önemli kısımlar? (2-3 madde)
      `);

      return response;
    } catch (error) {
      console.error('Kod açıklama hatası:', error);
      return '❌ Kod açıklanamadı. Lütfen tekrar deneyin.';
    }
  }

  /**
   * ✨ Kod İyileştirme Önerileri
   */
  async improveCode(code: string, language?: string): Promise<string> {
    try {
      const langInfo = language ? ` (${language})` : '';
      
      const response = await this.callAI(`
        Bu kodu${langInfo} iyileştir (kısa ve öz):
        
        \`\`\`
        ${code}
        \`\`\`
        
        🎯 En önemli 2 öneri?
        🛠️ Düzeltilmiş kod? (varsa)
      `);

      return response;
    } catch (error) {
      console.error('Kod iyileştirme hatası:', error);
      return '❌ Kod analiz edilemedi. Lütfen tekrar deneyin.';
    }
  }

  /**
   * 🎯 Pratik Soru Üret - Belirli konuda pratik sorusu
   */
  async generatePracticeQuestion(topic: string, difficulty: 'kolay' | 'orta' | 'zor'): Promise<any> {
    try {
      const difficultyMap = {
        'kolay': 'başlangıç seviyesinde, temel kavramları ölçen',
        'orta': 'orta seviyede, uygulama gerektiren',
        'zor': 'ileri seviyede, problem çözme becerisi gerektiren'
      };
      
      const response = await this.callAI(`
        ${topic} konusunda ${difficultyMap[difficulty]} bir pratik sorusu oluştur.
        
        JSON formatında döndür:
        {
          "soru": "Soru metni",
          "ipucu": "Yardımcı ipucu",
          "baslangicKodu": "// Başlangıç kodu",
          "beklenenCikti": "Beklenen çıktı veya sonuç",
          "cozum": "Tam çözüm kodu",
          "aciklama": "Çözümün açıklaması"
        }
      `);

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return null;
    } catch (error) {
      console.error('Pratik soru üretme hatası:', error);
      return null;
    }
  }

  /**
   * 🎯 Günlük Challenge Üret - AI ile dinamik görev oluşturma
   */
  async generateDailyChallenge(category: string, difficulty: string): Promise<any> {
    try {
      const response = await this.callAI(`
        ${category} konusunda ${difficulty} seviyede bir günlük kodlama görevi oluştur.
        
        Görev pratik ve öğretici olmalı. Kullanıcı verilen görevi tamamlayarak öğrenmeli.
        
        JSON formatında döndür (SADECE JSON, başka hiçbir şey yazma):
        {
          "title": "Görev başlığı (kısa ve açıklayıcı)",
          "description": "Görevin detaylı açıklaması",
          "task": "Kullanıcının yapması gereken görev (net ve anlaşılır)",
          "starterCode": "// Başlangıç kodu - kullanıcı bunu tamamlayacak",
          "solution": "// Doğru çözüm kodu",
          "hints": ["İpucu 1", "İpucu 2"]
        }
        
        Önemli:
        - Başlangıç kodu eksik olmalı, kullanıcı tamamlayacak
        - Çözüm tam ve çalışır olmalı
        - ${category} diline/teknolojisine uygun olmalı
      `);

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return null;
    } catch (error) {
      console.error('Günlük challenge üretme hatası:', error);
      return null;
    }
  }

  /**
   * 🔍 Challenge Kodunu Analiz Et - AI ile kullanıcı kodunu değerlendir
   */
  async analyzeChallengeCode(
    userCode: string, 
    task: string, 
    category: string,
    expectedSolution?: string
  ): Promise<{
    isCorrect: boolean;
    score: number;
    feedback: string;
    suggestions: string[];
    detailedAnalysis: string;
  }> {
    try {
      const solutionHint = expectedSolution 
        ? `\nBeklenen çözüm yapısı:\n${expectedSolution.substring(0, 200)}...`
        : '';
      
      const response = await this.callAI(`
        Bir ${category} kodlama görevini değerlendir.
        
        **Görev:** ${task}
        
        **Kullanıcının Kodu:**
        \`\`\`
        ${userCode}
        \`\`\`
        ${solutionHint}
        
        Bu kodu analiz et ve JSON formatında değerlendir (SADECE JSON döndür):
        {
          "isCorrect": true/false,
          "score": 0-100 arası puan,
          "feedback": "Kullanıcıya kısa geri bildirim",
          "suggestions": ["Öneri 1", "Öneri 2"],
          "detailedAnalysis": "Detaylı analiz ve açıklama"
        }
        
        Değerlendirme kriterleri:
        1. Kod görevi tamamlıyor mu?
        2. Sözdizimi doğru mu?
        3. Mantık doğru mu?
        4. Best practice'lere uygun mu?
        
        70 ve üzeri puan = doğru kabul edilir (isCorrect: true)
      `);

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return {
          isCorrect: result.isCorrect ?? result.score >= 70,
          score: result.score ?? 0,
          feedback: result.feedback ?? 'Değerlendirme tamamlandı.',
          suggestions: result.suggestions ?? [],
          detailedAnalysis: result.detailedAnalysis ?? ''
        };
      }
      
      throw new Error('JSON parse edilemedi');
    } catch (error) {
      console.error('Challenge kod analizi hatası:', error);
      throw error;
    }
  }

  /**
   * API çağrısı yap
   */
  private async callAI(prompt: string): Promise<string> {
    // API anahtarı kontrolü
    if (!config.apiKey || config.apiKey.includes('your_')) {
      return this.getDemoResponse(prompt);
    }

    try {
      if (AI_PROVIDER === 'gemini') {
        return await this.callGemini(prompt);
      } else {
        return await this.callOpenAI(prompt);
      }
    } catch (error) {
      console.error('AI çağrısı hatası:', error);
      return this.getDemoResponse(prompt);
    }
  }

  /**
   * Google Gemini API çağrısı
   */
  private async callGemini(prompt: string): Promise<string> {
    // Güncel Gemini API endpoint - gemini-2.0-flash modeli kullan
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.apiKey}`;
    
    console.log('🔗 Gemini API çağrılıyor...');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Sen bir programlama öğretmenisin. Türkçe cevap ver ve öğretici ol.\n\n${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Hatası:', response.status, errorText);
      throw new Error(`Gemini API hatası: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('Gemini API yanıt formatı beklenmiyor');
  }

  /**
   * OpenAI API çağrısı
   */
  private async callOpenAI(prompt: string): Promise<string> {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: 'Sen bir programlama öğretmenisin. Türkçe cevap ver ve öğretici ol.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API hatası: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Demo yanıtlar (API anahtarı olmadığında)
   */
  private getDemoResponse(prompt: string): string {
    if (prompt.includes('analiz')) {
      return '✅ **Kod Analizi:**\n\nKodunuz genel olarak doğru görünüyor!\n\n**Öneriler:**\n1. Değişken isimlerini daha açıklayıcı yapabilirsiniz\n2. Yorum satırları ekleyerek kodunuzu belgeleyebilirsiniz\n3. const yerine let kullanıyorsanız, değişkenin değişip değişmeyeceğini düşünün';
    }
    
    if (prompt.includes('ipucu')) {
      return '💡 **İpucu:**\n\nconsole.log() fonksiyonu, değerleri konsola yazdırmak için kullanılır. Değişkenlerinizi kontrol etmek için kullanabilirsiniz!';
    }

    return '🤖 AI asistan şu anda demo modunda çalışıyor. Tam işlevsellik için API anahtarı ekleyin.';
  }

  /**
   * Mock analiz
   */
  private getMockAnalysis(code: string): string {
    const hasConsoleLog = code.includes('console.log');
    const hasVariables = code.includes('let') || code.includes('const') || code.includes('var');
    
    let analysis = '🔍 **Kod Analizi:**\n\n';
    
    if (hasConsoleLog) {
      analysis += '✅ console.log() kullanımı doğru\n';
    }
    
    if (hasVariables) {
      analysis += '✅ Değişken tanımlamaları mevcut\n';
    }
    
    analysis += '\n**Öneriler:**\n';
    analysis += '• Kodunuzu daha okunabilir hale getirmek için girintilere dikkat edin\n';
    analysis += '• Değişken isimlerini anlamlı seçin\n';
    analysis += '• Yorum satırları ekleyin\n';
    
    return analysis;
  }

  /**
   * Mock ipucu
   */
  private getMockHint(lessonId: string): string {
    const hints: { [key: string]: string } = {
      javascript_1: '💡 **İpucu:** JavaScript\'te üç tür değişken tanımlama vardır:\n\n• `var` - Eski yöntem (global scope)\n• `let` - Modern yöntem (block scope)\n• `const` - Sabit değerler için\n\nÖnerim: `const` ve `let` kullanmaya öncelik verin!',
      html_1: '💡 **İpucu:** HTML\'de her açılan etiket kapatılmalıdır:\n\n```html\n<p>Bu bir paragraf</p>\n```\n\nKendini kapatan etiketler: `<br>`, `<img>`, `<input>`',
      default: '💡 Pratik yaparak öğrenin! Hata yapmaktan korkmayın.',
    };
    
    return hints[lessonId] || hints.default;
  }
}

export default AIService.getInstance();
