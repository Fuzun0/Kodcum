// Günün Meydan Okuması Servisi - AI Entegrasyonu

import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
import { DailyChallenge, challengePool } from '../data/dailyChallenges';
import aiService from './AIService';

// AI tarafından üretilecek challenge için interface
export interface AIGeneratedChallenge extends DailyChallenge {
  generatedAt: string;
  aiModel?: string;
  prompt?: string;
}

// AI analiz sonucu interface
export interface AIAnalysisResult {
  isCorrect: boolean;
  score: number; // 0-100 arası puan
  feedback: string;
  suggestions: string[];
  detailedAnalysis: string;
}

// Challenge completion interface
export interface ChallengeCompletion {
  challengeId: string;
  date: string;
  userCode: string;
  completedAt: string;
  xpEarned: number;
  aiScore?: number;
}

// Firestore collection referansları (Türkçe)
const CHALLENGES_COLLECTION = KOLEKSIYONLAR.GUNLUK_GOREVLER;
const USER_CHALLENGES_COLLECTION = KOLEKSIYONLAR.KULLANICI_GOREVLERI;

export class DailyChallengeService {
  
  /**
   * Bugünün meydan okumasını getir
   * Önce Firestore'dan kontrol et, yoksa oluştur
   */
  static async getTodayChallenge(): Promise<DailyChallenge> {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Firestore'dan bugünün challenge'ını kontrol et
      const challengeRef = doc(db, CHALLENGES_COLLECTION, today);
      const challengeDoc = await getDoc(challengeRef);
      
      if (challengeDoc.exists()) {
        return challengeDoc.data() as DailyChallenge;
      }
      
      // Yeni challenge oluştur ve Firestore'a kaydet
      const newChallenge = await this.generateChallenge(today);
      await setDoc(challengeRef, newChallenge);
      
      return newChallenge;
    } catch (error) {
      console.error('Daily challenge getirme hatası:', error);
      // Fallback: havuzdan rastgele seç
      return this.getFallbackChallenge();
    }
  }

  /**
   * AI ile challenge üret (şimdilik placeholder, AI entegrasyonu için hazır)
   * TODO: AI API entegrasyonu yapılacak
   */
  static async generateChallenge(date: string): Promise<DailyChallenge> {
    // AI entegrasyonu için placeholder
    // Gelecekte bu fonksiyon AI API'ye istek atacak
    
    const aiEnabled = await this.isAIEnabled();
    
    if (aiEnabled) {
      // AI ile üret
      return await this.generateWithAI(date);
    } else {
      // Havuzdan seç
      return this.getFallbackChallenge(date);
    }
  }

  /**
   * AI ile dinamik challenge üretimi
   * Gerçek AI entegrasyonu
   */
  static async generateWithAI(date: string): Promise<AIGeneratedChallenge> {
    const categories = ['HTML', 'CSS', 'JavaScript', 'React', 'Python'];
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    
    // Günün tarihine göre kategori ve zorluk seç
    const dayOfYear = this.getDayOfYear(new Date(date));
    const category = categories[dayOfYear % categories.length];
    const difficulty = difficulties[dayOfYear % difficulties.length];
    
    const difficultyText = difficulty === 'easy' ? 'kolay' : difficulty === 'medium' ? 'orta' : 'zor';
    
    try {
      // AI'dan günlük görev iste
      const response = await aiService.generateDailyChallenge(category, difficultyText);
      
      if (response) {
        return {
          id: `ai-challenge-${date}`,
          date: date,
          title: response.title || `${category} Görevi`,
          description: response.description || `Bugünkü ${category} görevini tamamla`,
          task: response.task || 'Verilen görevi tamamla',
          difficulty: difficulty,
          category: category,
          starterCode: response.starterCode || '// Kodunu buraya yaz',
          solution: response.solution || '',
          xpReward: difficulty === 'easy' ? 20 : difficulty === 'medium' ? 35 : 50,
          generatedAt: new Date().toISOString(),
          aiModel: 'gemini-2.0-flash',
          prompt: `${category} - ${difficultyText}`
        };
      }
    } catch (error) {
      console.error('AI challenge üretim hatası:', error);
    }
    
    // Fallback
    return this.getFallbackChallengeAsAI(date, category, difficulty);
  }

  /**
   * Fallback challenge'ı AI formatına çevir
   */
  static getFallbackChallengeAsAI(date: string, category: string, difficulty: 'easy' | 'medium' | 'hard'): AIGeneratedChallenge {
    const fallback = this.getFallbackChallenge(date);
    return {
      ...fallback,
      generatedAt: new Date().toISOString(),
      aiModel: 'fallback',
      prompt: 'Havuzdan seçildi'
    };
  }

  /**
   * AI ile kullanıcı kodunu analiz et
   */
  static async analyzeUserCode(
    userCode: string, 
    challenge: DailyChallenge
  ): Promise<AIAnalysisResult> {
    try {
      const result = await aiService.analyzeChallengeCode(
        userCode,
        challenge.task,
        challenge.category,
        challenge.solution
      );
      
      return result;
    } catch (error) {
      console.error('AI analiz hatası:', error);
      
      // Fallback: basit karşılaştırma
      return this.fallbackAnalysis(userCode, challenge);
    }
  }

  /**
   * Fallback analiz (AI çalışmazsa)
   */
  static fallbackAnalysis(userCode: string, challenge: DailyChallenge): AIAnalysisResult {
    const normalizeCode = (code: string) => 
      code.replace(/\s+/g, ' ').replace(/\/\/.*$/gm, '').trim().toLowerCase();
    
    const userNormalized = normalizeCode(userCode);
    const solutionNormalized = normalizeCode(challenge.solution);
    
    // Anahtar kelimeleri kontrol et
    const keywords: string[] = challenge.solution.match(/\b\w+\b/g) || [];
    const importantKeywords = keywords.filter((k: string) => k.length > 3);
    const matchedKeywords = importantKeywords.filter((k: string) => 
      userNormalized.includes(k.toLowerCase())
    );
    const matchPercentage = importantKeywords.length > 0 
      ? (matchedKeywords.length / importantKeywords.length) * 100 
      : 0;
    
    const isCorrect = matchPercentage >= 60;
    
    return {
      isCorrect,
      score: Math.round(matchPercentage),
      feedback: isCorrect 
        ? `Tebrikler! Kodun doğru görünüyor. %${Math.round(matchPercentage)} uyumluluk.`
        : `Kodunda bazı eksiklikler var. %${Math.round(matchPercentage)} uyumluluk.`,
      suggestions: isCorrect ? [] : ['Görevi tekrar oku', 'Çözümü kontrol et'],
      detailedAnalysis: `Temel kontrol yapıldı. Eşleşen anahtar kelime: ${matchedKeywords.length}/${importantKeywords.length}`
    };
  }

  /**
   * AI entegrasyonu açık mı kontrol et
   * API key varsa otomatik açık
   */
  static async isAIEnabled(): Promise<boolean> {
    try {
      // API key kontrolü
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
      if (apiKey && !apiKey.includes('your_')) {
        return true;
      }
      
      const setting = await AsyncStorage.getItem('ai_challenges_enabled');
      return setting === 'true';
    } catch {
      return false;
    }
  }

  /**
   * AI entegrasyonunu aç/kapat
   */
  static async setAIEnabled(enabled: boolean): Promise<void> {
    await AsyncStorage.setItem('ai_challenges_enabled', enabled.toString());
  }

  /**
   * Havuzdan fallback challenge seç
   */
  static getFallbackChallenge(date?: string): DailyChallenge {
    const today = date || new Date().toISOString().split('T')[0];
    
    // Bugün için tanımlı challenge var mı?
    const todayChallenge = challengePool.find(c => c.date === today);
    if (todayChallenge) {
      return todayChallenge;
    }
    
    // Tarih bazlı deterministik seçim (aynı gün aynı challenge)
    const dayOfYear = this.getDayOfYear(new Date(today));
    const index = dayOfYear % challengePool.length;
    
    return {
      ...challengePool[index],
      id: `daily-${today}`,
      date: today
    };
  }

  /**
   * Yılın kaçıncı günü
   */
  static getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  /**
   * Challenge tamamlandı mı kontrol et (kullanıcıya özel - Firestore)
   */
  static async isChallengeCompleted(challengeId: string, userId: string): Promise<boolean> {
    if (!userId) {
      console.warn('userId gerekli');
      return false;
    }
    
    try {
      // Kullanıcının bu challenge'ı tamamlayıp tamamlamadığını kontrol et
      const completionRef = doc(db, USER_CHALLENGES_COLLECTION, `${userId}_${challengeId}`);
      const completionDoc = await getDoc(completionRef);
      return completionDoc.exists();
    } catch (error) {
      console.error('Challenge tamamlanma kontrolü hatası:', error);
      return false;
    }
  }

  /**
   * Challenge'ı tamamla ve kaydet (kullanıcıya özel - Firestore)
   */
  static async completeChallenge(
    challengeId: string, 
    userId: string,
    userCode: string, 
    xpEarned: number
  ): Promise<void> {
    if (!userId) {
      console.warn('userId gerekli');
      return;
    }
    
    try {
      const completion: ChallengeCompletion = {
        challengeId,
        date: new Date().toISOString().split('T')[0],
        userCode,
        completedAt: new Date().toISOString(),
        xpEarned
      };
      
      // Firestore'a kullanıcıya özel kaydet
      const completionRef = doc(db, USER_CHALLENGES_COLLECTION, `${userId}_${challengeId}`);
      await setDoc(completionRef, {
        ...completion,
        userId
      });
      
      console.log(`✅ Challenge ${challengeId} kullanıcı ${userId} için tamamlandı`);
    } catch (error) {
      console.error('Challenge tamamlama kaydetme hatası:', error);
    }
  }

  /**
   * Challenge geçmişini getir (kullanıcıya özel - Firestore)
   */
  static async getChallengeHistory(userId: string): Promise<ChallengeCompletion[]> {
    if (!userId) {
      return [];
    }
    
    try {
      const q = query(
        collection(db, USER_CHALLENGES_COLLECTION),
        where('userId', '==', userId),
        orderBy('completedAt', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(q);
      const history: ChallengeCompletion[] = [];
      
      querySnapshot.forEach((doc) => {
        history.push(doc.data() as ChallengeCompletion);
      });
      
      return history;
    } catch (error) {
      console.error('Challenge geçmişi getirme hatası:', error);
      return [];
    }
  }

  /**
   * Bu hafta kaç challenge tamamlandı (kullanıcıya özel)
   */
  static async getWeeklyCompletionCount(userId: string): Promise<number> {
    if (!userId) return 0;
    
    try {
      const history = await this.getChallengeHistory(userId);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      return history.filter(h => new Date(h.completedAt) >= oneWeekAgo).length;
    } catch {
      return 0;
    }
  }

  /**
   * Toplam kazanılan XP (kullanıcıya özel)
   */
  static async getTotalXPFromChallenges(userId: string): Promise<number> {
    if (!userId) return 0;
    
    try {
      const history = await this.getChallengeHistory(userId);
      return history.reduce((total, h) => total + (h.xpEarned || 0), 0);
    } catch {
      return 0;
    }
  }
}
