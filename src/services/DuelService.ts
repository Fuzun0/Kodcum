// Düello Sistemi Servisi - AI Soru Üretimi Altyapısı Dahil

import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
// NotificationService disabled
// import { NotificationService } from './NotificationService';
import { 
  Duel, 
  DuelQuestion, 
  DuelAnswer, 
  DuelResult, 
  DuelStats,
  DuelStatus 
} from '../types';
import { lessonQuizzes, QuizQuestion } from '../data/quizzes';

// Storage keys
const DUELS_KEY = 'user_duels';
const DUEL_STATS_KEY = 'duel_stats';
const ACTIVE_DUEL_KEY = 'active_duel';
const DUEL_REQUESTS_COLLECTION = KOLEKSIYONLAR.DUELLO_ISTEKLERI;
const AKTIF_DUELLOLAR_COLLECTION = KOLEKSIYONLAR.AKTIF_DUELLOLAR;

// Düello ayarları
const DUEL_EXPIRY_HOURS = 24; // Düello daveti 24 saat geçerli
export const DUEL_QUESTION_COUNT = 5;
export const DUEL_TOTAL_TIME = 50; // Toplam 50 saniye (tüm sorular için)
export const DUEL_TIME_PER_QUESTION = 50; // Eski - uyumluluk için
export const DUEL_XP_WIN = 50;
export const DUEL_WARNING_TIME = 15; // Son 15 saniyede uyarı
const DUEL_XP_LOSE = 10;
const DUEL_XP_DRAW = 25;

// Soru puanları (kolaydan zora)
export const QUESTION_POINTS = [1, 2, 3, 4, 5]; // 1. soru 1 puan, 5. soru 5 puan

// Aktif düello tipi - Firestore'da saklanacak
export interface AktifDuello {
  id: string;
  player1Id: string;
  player1Name: string;
  player1Photo?: string | null;
  player1Ready: boolean;
  player1Score: number;
  player1Finished: boolean;
  player2Id: string;
  player2Name: string;
  player2Photo?: string | null;
  player2Ready: boolean;
  player2Score: number;
  player2Finished: boolean;
  category: string;
  questions: DuelQuestion[];
  status: 'waiting' | 'ready' | 'playing' | 'finished';
  startTime?: string;
  createdAt: string;
}

// Düello istek tipi
export interface DuelRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string | null;
  receiverId: string;
  receiverName?: string;
  receiverPhoto?: string | null;
  category: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  questions?: DuelQuestion[]; // Her iki oyuncu için aynı sorular
}

export class DuelService {
  
  // ==================== DÜELLO DAVETİ ====================

  /**
   * Düello daveti gönder (Firestore'a kaydet - sorularla birlikte)
   */
  static async sendDuelRequest(
    senderId: string,
    senderName: string,
    senderPhoto: string | undefined,
    receiverId: string,
    receiverName: string,
    receiverPhoto: string | undefined,
    category: string
  ): Promise<DuelRequest> {
    try {
      console.log('🎮 Düello daveti gönderiliyor:', {
        senderId,
        senderName,
        receiverId,
        receiverName,
        category
      });
      
      // Önce soruları oluştur (her iki oyuncu için aynı sorular)
      const questions = await this.generateQuestions(category);
      console.log('📝 Düello soruları oluşturuldu:', questions.length);
      
      const requestId = `duel_req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const duelRequest: DuelRequest = {
        id: requestId,
        senderId,
        senderName,
        senderPhoto: senderPhoto || null,
        receiverId,
        receiverName,
        receiverPhoto: receiverPhoto || null,
        category,
        status: 'pending',
        questions, // Sorular da kaydediliyor
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + DUEL_EXPIRY_HOURS * 60 * 60 * 1000).toISOString()
      };

      // Firestore'a kaydet
      if (db) {
        await setDoc(doc(db, DUEL_REQUESTS_COLLECTION, requestId), {
          ...duelRequest,
          createdAt: serverTimestamp(),
          type: 'duel' // Düello isteği olduğunu belirt
        });
        console.log('✅ Düello daveti Firestore\'a kaydedildi:', requestId);
        
        // 🔔 Push notification gönder (disabled)
        // try {
        //   await NotificationService.sendDuelRequestNotification(
        //     receiverId,
        //     senderName,
        //     category,
        //     requestId
        //   );
        // } catch (notifError) {
        //   console.log('Düello bildirim gönderilemedi:', notifError);
        // }
      } else {
        console.warn('⚠️ Firestore bağlantısı yok, düello daveti gönderilemedi');
        throw new Error('Firestore bağlantısı yok');
      }

      return duelRequest;
    } catch (error) {
      console.error('❌ Düello daveti gönderme hatası:', error);
      throw error;
    }
  }

  /**
   * Bekleyen düello davetlerini getir
   */
  static async getPendingDuelRequests(userId: string): Promise<DuelRequest[]> {
    try {
      const requestsRef = collection(db, DUEL_REQUESTS_COLLECTION);
      const q = query(
        requestsRef,
        where('receiverId', '==', userId),
        where('status', '==', 'pending')
      );
      
      const snapshot = await getDocs(q);
      const requests: DuelRequest[] = [];
      
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        requests.push({
          id: docSnap.id,
          senderId: data.senderId,
          senderName: data.senderName,
          senderPhoto: data.senderPhoto,
          receiverId: data.receiverId,
          receiverName: data.receiverName,
          category: data.category,
          status: data.status,
          questions: data.questions || [], // Soruları da dahil et!
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          expiresAt: data.expiresAt
        });
      });
      
      console.log('📥 Düello istekleri alındı:', requests.length, 'soru sayıları:', requests.map(r => r.questions?.length));
      
      return requests;
    } catch (error) {
      console.error('Düello davetleri getirme hatası:', error);
      return [];
    }
  }

  /**
   * Düello davetini kabul et
   */
  static async acceptDuelRequest(
    requestId: string,
    accepterId: string,
    accepterName: string,
    accepterPhoto?: string
  ): Promise<Duel> {
    try {
      // Daveti getir
      const requestDoc = await getDoc(doc(db, DUEL_REQUESTS_COLLECTION, requestId));
      if (!requestDoc.exists()) {
        throw new Error('Düello daveti bulunamadı');
      }
      
      const requestData = requestDoc.data() as DuelRequest;
      
      // Daveti kabul edildi olarak işaretle
      await setDoc(doc(db, DUEL_REQUESTS_COLLECTION, requestId), {
        ...requestData,
        status: 'accepted'
      });
      
      // Düello oluştur - İSTEKTEKİ SORULARI KULLAN!
      const duel = await this.createDuelWithQuestions(
        requestData.senderId,
        requestData.senderName,
        requestData.senderPhoto,
        accepterId,
        accepterName,
        accepterPhoto,
        requestData.category,
        requestData.questions // İsteğin içindeki soruları kullan
      );
      
      return duel;
    } catch (error) {
      console.error('Düello kabul hatası:', error);
      throw error;
    }
  }

  /**
   * Düello davetini reddet
   */
  static async rejectDuelRequest(requestId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, DUEL_REQUESTS_COLLECTION, requestId));
    } catch (error) {
      console.error('Düello reddetme hatası:', error);
      throw error;
    }
  }

  // ==================== DÜELLO OLUŞTURMA ====================

  /**
   * Yeni düello oluştur (önceden oluşturulmuş sorularla)
   */
  static async createDuelWithQuestions(
    challengerId: string,
    challengerName: string,
    challengerPhoto: string | undefined,
    opponentId: string,
    opponentName: string,
    opponentPhoto: string | undefined,
    category: string,
    existingQuestions?: DuelQuestion[]
  ): Promise<Duel> {
    try {
      // Eğer önceden oluşturulmuş sorular varsa onları kullan, yoksa yeni oluştur
      const questions = existingQuestions && existingQuestions.length > 0 
        ? existingQuestions 
        : await this.generateQuestions(category);

      const duel: Duel = {
        id: `duel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        challengerId,
        challengerName,
        challengerPhoto: challengerPhoto || null,
        opponentId,
        opponentName,
        opponentPhoto: opponentPhoto || null,
        category,
        status: 'in_progress',
        questions,
        challengerAnswers: [],
        opponentAnswers: [],
        challengerScore: 0,
        opponentScore: 0,
        xpReward: DUEL_XP_WIN,
        createdAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + DUEL_EXPIRY_HOURS * 60 * 60 * 1000).toISOString()
      };

      // Kaydet
      await this.saveDuel(challengerId, duel);
      await this.saveDuel(opponentId, duel);

      return duel;
    } catch (error) {
      console.error('Düello oluşturma hatası:', error);
      throw error;
    }
  }

  /**
   * Yeni düello oluştur ve davet gönder
   */
  static async createDuel(
    challengerId: string,
    challengerName: string,
    challengerPhoto: string | undefined,
    opponentId: string,
    opponentName: string,
    opponentPhoto: string | undefined,
    category: string
  ): Promise<Duel> {
    try {
      // Sorular oluştur (AI veya havuzdan)
      const questions = await this.generateQuestions(category);

      const duel: Duel = {
        id: `duel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        challengerId,
        challengerName,
        challengerPhoto: challengerPhoto || null,
        opponentId,
        opponentName,
        opponentPhoto: opponentPhoto || null,
        category,
        status: 'in_progress', // Direkt başlasın
        questions,
        challengerAnswers: [],
        opponentAnswers: [],
        challengerScore: 0,
        opponentScore: 0,
        xpReward: DUEL_XP_WIN,
        createdAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + DUEL_EXPIRY_HOURS * 60 * 60 * 1000).toISOString()
      };

      // Kaydet
      await this.saveDuel(challengerId, duel);
      await this.saveDuel(opponentId, duel);

      return duel;
    } catch (error) {
      console.error('Düello oluşturma hatası:', error);
      throw error;
    }
  }

  /**
   * Sorular üret (AI öncelikli - her zaman benzersiz sorular)
   */
  static async generateQuestions(category: string): Promise<DuelQuestion[]> {
    try {
      // Her zaman önce AI'dan soru üretmeyi dene
      console.log('🤖 AI ile benzersiz düello soruları üretiliyor...');
      const aiQuestions = await this.generateQuestionsWithAI(category);
      
      if (aiQuestions && aiQuestions.length >= DUEL_QUESTION_COUNT) {
        console.log('✅ AI soruları başarıyla üretildi');
        return aiQuestions;
      }
      
      // AI başarısız olursa havuzdan al ama rastgele karıştır
      console.log('⚠️ AI soru üretemedi, havuzdan rastgele sorular alınıyor...');
      return this.generateQuestionsFromPool(category);
    } catch (error) {
      console.error('Soru üretme hatası:', error);
      return this.generateQuestionsFromPool(category);
    }
  }

  /**
   * AI ile soru üret
   */
  static async generateQuestionsWithAI(category: string): Promise<DuelQuestion[]> {
    try {
      // AIService'den soruları al
      const AIService = (await import('./AIService')).default;
      const aiQuestions = await AIService.generateDuelQuestions(category, DUEL_QUESTION_COUNT);
      
      if (aiQuestions && aiQuestions.length >= DUEL_QUESTION_COUNT) {
        return aiQuestions.map((q: any, index: number) => ({
          id: index + 1,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          category,
          difficulty: q.difficulty || 'medium',
          timeLimit: DUEL_TIME_PER_QUESTION
        }));
      }
      
      // AI yeterli soru üretmediyse havuzdan tamamla
      console.log('AI yeterli soru üretemedi, havuzdan tamamlanıyor...');
      return this.generateQuestionsFromPool(category);
    } catch (error) {
      console.error('AI soru üretme hatası:', error);
      return this.generateQuestionsFromPool(category);
    }
  }

  /**
   * Havuzdan soru seç
   */
  static generateQuestionsFromPool(category: string): DuelQuestion[] {
    // Kategori bazlı quiz havuzları - case insensitive
    const categoryMappings: { [key: string]: string[] } = {
      'html': ['html-basic', 'html-elements', 'html-attributes', 'html-headings', 'html-paragraphs'],
      'css': ['css-syntax', 'css-colors', 'css-backgrounds', 'css-fonts', 'css-borders'],
      'javascript': ['js-variables', 'js-data-types', 'js-operators', 'js-functions', 'js-arrays'],
      'python': ['py-print-variables', 'py-data-types', 'py-type-conversion', 'py-arithmetic', 'py-input'],
      'kotlin': ['kt-intro-main', 'kt-variables', 'kt-data-types', 'kt-conditionals', 'kt-loops'],
      'swift': ['sw-playground', 'sw-variables', 'sw-data-types', 'sw-operators', 'sw-arrays'],
      'react': ['react-intro', 'react-jsx', 'react-components', 'react-props', 'react-state']
    };

    // Kategoriyi küçük harfe çevir
    const normalizedCategory = category.toLowerCase();
    const quizIds = categoryMappings[normalizedCategory] || categoryMappings['html'];
    const allQuestions: QuizQuestion[] = [];

    // Tüm ilgili quiz'lerden soruları topla
    for (const quizId of quizIds) {
      const quiz = lessonQuizzes[quizId];
      if (quiz) {
        allQuestions.push(...quiz);
      }
    }

    // Rastgele karıştır ve 5 soru seç
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, DUEL_QUESTION_COUNT);

    // Zorluk sıralaması için difficulty atama (kolaydan zora)
    const difficultyOrder: ('easy' | 'medium' | 'hard')[] = ['easy', 'easy', 'medium', 'medium', 'hard'];

    return selected.map((q, index) => ({
      id: index + 1,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      category,
      difficulty: difficultyOrder[index] || 'medium',
      timeLimit: DUEL_TOTAL_TIME // Toplam süre
    }));
  }

  // ==================== DÜELLO KABUL/RED ====================

  /**
   * Düelloyu kabul et
   */
  static async acceptDuel(userId: string, duelId: string): Promise<Duel> {
    try {
      const duel = await this.getDuel(userId, duelId);
      if (!duel) throw new Error('Düello bulunamadı');
      if (duel.status !== 'pending') throw new Error('Düello artık beklemede değil');
      if (new Date(duel.expiresAt) < new Date()) throw new Error('Düello süresi dolmuş');

      duel.status = 'accepted';
      duel.startedAt = new Date().toISOString();

      await this.updateDuel(duel.challengerId, duel);
      await this.updateDuel(duel.opponentId, duel);

      return duel;
    } catch (error) {
      console.error('Düello kabul hatası:', error);
      throw error;
    }
  }

  /**
   * Düelloyu reddet
   */
  static async declineDuel(userId: string, duelId: string): Promise<void> {
    try {
      const duel = await this.getDuel(userId, duelId);
      if (!duel) throw new Error('Düello bulunamadı');

      duel.status = 'cancelled';

      await this.updateDuel(duel.challengerId, duel);
      await this.updateDuel(duel.opponentId, duel);
    } catch (error) {
      console.error('Düello reddetme hatası:', error);
      throw error;
    }
  }

  // ==================== DÜELLO OYNAMA ====================

  /**
   * Cevap gönder
   */
  static async submitAnswer(
    userId: string,
    duelId: string,
    questionId: number,
    selectedAnswer: number,
    timeSpent: number
  ): Promise<{ isCorrect: boolean; duel: Duel }> {
    try {
      const duel = await this.getDuel(userId, duelId);
      if (!duel) throw new Error('Düello bulunamadı');

      const question = duel.questions.find(q => q.id === questionId);
      if (!question) throw new Error('Soru bulunamadı');

      const isCorrect = selectedAnswer === question.correctAnswer;

      const answer: DuelAnswer = {
        odakionId: questionId,
        selectedAnswer,
        isCorrect,
        answeredAt: new Date().toISOString(),
        timeSpent
      };

      // Hangi kullanıcı cevaplıyor?
      if (userId === duel.challengerId) {
        duel.challengerAnswers.push(answer);
        if (isCorrect) duel.challengerScore++;
      } else {
        duel.opponentAnswers.push(answer);
        if (isCorrect) duel.opponentScore++;
      }

      // Düello durumunu güncelle
      if (duel.status === 'accepted') {
        duel.status = 'in_progress';
      }

      await this.updateDuel(duel.challengerId, duel);
      await this.updateDuel(duel.opponentId, duel);

      return { isCorrect, duel };
    } catch (error) {
      console.error('Cevap gönderme hatası:', error);
      throw error;
    }
  }

  /**
   * Düelloyu tamamla (Eski sistem için - yeni aktif düellolar bu fonksiyonu kullanmaz)
   */
  static async completeDuel(userId: string, duelId: string): Promise<DuelResult | null> {
    try {
      const duel = await this.getDuel(userId, duelId);
      if (!duel) {
        console.log('⚠️ Düello bulunamadı (muhtemelen aktif düello sistemi kullanılıyor):', duelId);
        return null;
      }

      // Kazananı belirle
      let winnerId: string | null = null;
      if (duel.challengerScore > duel.opponentScore) {
        winnerId = duel.challengerId;
      } else if (duel.opponentScore > duel.challengerScore) {
        winnerId = duel.opponentId;
      }
      // Eşitlik = null (berabere)

      duel.winnerId = winnerId || undefined;
      duel.status = 'completed';
      duel.completedAt = new Date().toISOString();

      // XP hesapla
      const xpEarned: { [userId: string]: number } = {};
      if (winnerId === null) {
        // Berabere
        xpEarned[duel.challengerId] = DUEL_XP_DRAW;
        xpEarned[duel.opponentId] = DUEL_XP_DRAW;
      } else {
        // Kazanan/kaybeden
        xpEarned[winnerId] = DUEL_XP_WIN;
        xpEarned[winnerId === duel.challengerId ? duel.opponentId : duel.challengerId] = DUEL_XP_LOSE;
      }

      await this.updateDuel(duel.challengerId, duel);
      await this.updateDuel(duel.opponentId, duel);

      // İstatistikleri güncelle
      await this.updateStats(duel.challengerId, winnerId);
      await this.updateStats(duel.opponentId, winnerId);

      return {
        odakId: duel.id,
        challengerId: duel.challengerId,
        opponentId: duel.opponentId,
        challengerScore: duel.challengerScore,
        opponentScore: duel.opponentScore,
        winnerId,
        isWinner: winnerId === userId,
        isDraw: winnerId === null,
        yourScore: userId === duel.challengerId ? duel.challengerScore : duel.opponentScore,
        xpEarned: xpEarned[userId] || DUEL_XP_LOSE,
        category: duel.category,
        completedAt: duel.completedAt
      };
    } catch (error) {
      console.error('Düello tamamlama hatası:', error);
      throw error;
    }
  }

  // ==================== DÜELLO VERİLERİ ====================

  /**
   * Düello getir
   */
  static async getDuel(userId: string, duelId: string): Promise<Duel | null> {
    const duels = await this.getDuels(userId);
    return duels.find(d => d.id === duelId) || null;
  }

  /**
   * Kullanıcının tüm düellolarını getir
   */
  static async getDuels(userId: string): Promise<Duel[]> {
    try {
      const duels = await AsyncStorage.getItem(`${DUELS_KEY}_${userId}`);
      return duels ? JSON.parse(duels) : [];
    } catch {
      return [];
    }
  }

  /**
   * Bekleyen düello davetlerini getir
   */
  static async getPendingDuels(userId: string): Promise<Duel[]> {
    const duels = await this.getDuels(userId);
    const now = new Date();
    return duels.filter(d => 
      d.status === 'pending' && 
      d.opponentId === userId &&
      new Date(d.expiresAt) > now
    );
  }

  /**
   * Aktif düelloları getir
   */
  static async getActiveDuels(userId: string): Promise<Duel[]> {
    const duels = await this.getDuels(userId);
    return duels.filter(d => 
      d.status === 'accepted' || d.status === 'in_progress'
    );
  }

  /**
   * Düello geçmişini getir (AsyncStorage'dan)
   */
  static async getDuelHistory(userId: string, limit: number = 20): Promise<Duel[]> {
    const duels = await this.getDuels(userId);
    return duels
      .filter(d => d.status === 'completed')
      .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
      .slice(0, limit);
  }

  /**
   * Firestore aktivDuellolar tablosundan düello geçmişini getir
   */
  static async getAktifDuelloHistory(userId: string, limit: number = 50): Promise<AktifDuello[]> {
    try {
      const aktivRef = collection(db, AKTIF_DUELLOLAR_COLLECTION);
      const snapshot = await getDocs(aktivRef);
      
      const duels: AktifDuello[] = [];
      
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as AktifDuello;
        // Kullanıcının dahil olduğu düellolar (tamamlanmış olanlar)
        if ((data.player1Id === userId || data.player2Id === userId) && data.status === 'finished') {
          duels.push({
            ...data,
            id: docSnap.id
          });
        }
      });
      
      // Tarihe göre sırala (en yeniden eskiye)
      duels.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
      
      console.log(`📊 aktivDuellolar'dan ${duels.length} maç bulundu`);
      return duels.slice(0, limit);
    } catch (error) {
      console.error('aktivDuellolar geçmişi hatası:', error);
      return [];
    }
  }

  /**
   * İki kullanıcı arasındaki düello geçmişini getir
   */
  static async getDuelHistoryBetweenUsers(
    userId: string, 
    friendId: string
  ): Promise<{ wins: number; losses: number; draws: number; duels: Duel[] }> {
    try {
      const duels = await this.getDuels(userId);
      
      // Sadece bu arkadaşla olan ve tamamlanmış düellolar
      const friendDuels = duels.filter(d => 
        d.status === 'completed' && 
        (d.opponentId === friendId || d.challengerId === friendId)
      );
      
      let wins = 0;
      let losses = 0;
      let draws = 0;
      
      for (const duel of friendDuels) {
        if (!duel.winnerId) {
          // Beraberlik
          draws++;
        } else if (duel.winnerId === userId) {
          // Kazandı
          wins++;
        } else {
          // Kaybetti
          losses++;
        }
      }
      
      return {
        wins,
        losses,
        draws,
        duels: friendDuels.sort((a, b) => 
          new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
        )
      };
    } catch (error) {
      console.error('Arkadaş düello geçmişi hatası:', error);
      return { wins: 0, losses: 0, draws: 0, duels: [] };
    }
  }

  /**
   * Düelloyu kaydet
   */
  private static async saveDuel(userId: string, duel: Duel): Promise<void> {
    const duels = await this.getDuels(userId);
    duels.push(duel);
    await AsyncStorage.setItem(`${DUELS_KEY}_${userId}`, JSON.stringify(duels));
  }

  /**
   * Düelloyu güncelle
   */
  private static async updateDuel(userId: string, duel: Duel): Promise<void> {
    const duels = await this.getDuels(userId);
    const index = duels.findIndex(d => d.id === duel.id);
    if (index !== -1) {
      duels[index] = duel;
      await AsyncStorage.setItem(`${DUELS_KEY}_${userId}`, JSON.stringify(duels));
    }
  }

  // ==================== İSTATİSTİKLER ====================

  /**
   * Düello istatistiklerini getir
   */
  static async getStats(userId: string): Promise<DuelStats> {
    try {
      const stats = await AsyncStorage.getItem(`${DUEL_STATS_KEY}_${userId}`);
      if (stats) {
        return JSON.parse(stats);
      }
      return this.getEmptyStats();
    } catch {
      return this.getEmptyStats();
    }
  }

  /**
   * İstatistikleri güncelle
   */
  private static async updateStats(userId: string, winnerId: string | null): Promise<void> {
    try {
      const stats = await this.getStats(userId);
      
      stats.totalDuels++;
      
      if (winnerId === null) {
        stats.draws++;
        stats.totalXPFromDuels += DUEL_XP_DRAW;
        stats.currentWinStreak = 0;
      } else if (winnerId === userId) {
        stats.wins++;
        stats.totalXPFromDuels += DUEL_XP_WIN;
        stats.currentWinStreak++;
        if (stats.currentWinStreak > stats.bestWinStreak) {
          stats.bestWinStreak = stats.currentWinStreak;
        }
      } else {
        stats.losses++;
        stats.totalXPFromDuels += DUEL_XP_LOSE;
        stats.currentWinStreak = 0;
      }
      
      stats.winRate = stats.totalDuels > 0 
        ? Math.round((stats.wins / stats.totalDuels) * 100) 
        : 0;

      await AsyncStorage.setItem(`${DUEL_STATS_KEY}_${userId}`, JSON.stringify(stats));
    } catch (error) {
      console.error('İstatistik güncelleme hatası:', error);
    }
  }

  /**
   * Boş istatistik objesi
   */
  private static getEmptyStats(): DuelStats {
    return {
      totalDuels: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      winRate: 0,
      currentWinStreak: 0,
      bestWinStreak: 0,
      longestStreak: 0,
      totalXPFromDuels: 0,
      totalXPEarned: 0
    };
  }

  // ==================== AI AYARLARI ====================

  /**
   * AI soru üretimi açık mı - API key varsa otomatik açık
   */
  static async isAIEnabled(): Promise<boolean> {
    try {
      // Önce manuel ayarı kontrol et
      const setting = await AsyncStorage.getItem('ai_duel_questions_enabled');
      
      // Eğer manuel olarak kapatıldıysa false dön
      if (setting === 'false') {
        return false;
      }
      
      // API key var mı kontrol et (Gemini veya OpenAI)
      const geminiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
      const openaiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';
      
      const hasValidKey = 
        (geminiKey && !geminiKey.includes('your_') && geminiKey.length > 10) ||
        (openaiKey && !openaiKey.includes('your_') && openaiKey.length > 10);
      
      return hasValidKey;
    } catch {
      return false;
    }
  }

  /**
   * AI soru üretimini aç/kapat
   */
  static async setAIEnabled(enabled: boolean): Promise<void> {
    await AsyncStorage.setItem('ai_duel_questions_enabled', enabled.toString());
  }

  // ==================== KATEGORİLER ====================

  /**
   * Düello kategorilerini getir
   */
  static getCategories(): { id: string; name: string; icon: string }[] {
    return [
      { id: 'HTML', name: 'HTML', icon: '🌐' },
      { id: 'CSS', name: 'CSS', icon: '🎨' },
      { id: 'JavaScript', name: 'JavaScript', icon: '⚡' },
      { id: 'Python', name: 'Python', icon: '🐍' },
      { id: 'Kotlin', name: 'Kotlin', icon: '🤖' },
      { id: 'Swift', name: 'Swift', icon: '🍎' },
      { id: 'React', name: 'React', icon: '⚛️' }
    ];
  }

  // ==================== AKTİF DÜELLO SİSTEMİ ====================

  /**
   * Aktif düello oluştur (Firestore'da)
   */
  static async createAktifDuello(
    player1Id: string,
    player1Name: string,
    player1Photo: string | undefined,
    player2Id: string,
    player2Name: string,
    player2Photo: string | undefined,
    category: string,
    questions: DuelQuestion[]
  ): Promise<AktifDuello> {
    const duelId = `aktif_duel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const aktivDuello: AktifDuello = {
      id: duelId,
      player1Id,
      player1Name,
      player1Photo: player1Photo || null,
      player1Ready: false,
      player1Score: 0,
      player1Finished: false,
      player2Id,
      player2Name,
      player2Photo: player2Photo || null,
      player2Ready: false,
      player2Score: 0,
      player2Finished: false,
      category,
      questions,
      status: 'waiting',
      createdAt: new Date().toISOString()
    };

    if (db) {
      await setDoc(doc(db, AKTIF_DUELLOLAR_COLLECTION, duelId), aktivDuello);
      console.log('✅ Aktif düello oluşturuldu:', duelId);
    }

    return aktivDuello;
  }

  /**
   * Oyuncu hazır olduğunu bildir - Race condition'ı önlemek için transaction kullan
   */
  static async playerReady(duelId: string, playerId: string): Promise<void> {
    if (!db) return;

    const duelRef = doc(db, AKTIF_DUELLOLAR_COLLECTION, duelId);
    
    // Birkaç deneme yap (race condition için)
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const duelDoc = await getDoc(duelRef);
        
        if (!duelDoc.exists()) {
          console.log('❌ Aktif düello bulunamadı:', duelId);
          return;
        }
        
        const data = duelDoc.data() as AktifDuello;
        console.log(`🎮 playerReady çağrıldı (deneme ${attempt + 1}):`, {
          playerId,
          player1Id: data.player1Id,
          player2Id: data.player2Id,
          player1Ready: data.player1Ready,
          player2Ready: data.player2Ready,
          currentStatus: data.status
        });
        
        const updates: any = {};
        
        if (data.player1Id === playerId) {
          updates.player1Ready = true;
        } else if (data.player2Id === playerId) {
          updates.player2Ready = true;
        } else {
          console.log('⚠️ Oyuncu düelloda bulunamadı');
          return;
        }
        
        // Her iki oyuncu da hazır mı kontrol et - güncel veriye göre
        const player1Ready = data.player1Id === playerId ? true : data.player1Ready;
        const player2Ready = data.player2Id === playerId ? true : data.player2Ready;
        
        console.log('📊 Hazır durumları:', { player1Ready, player2Ready });
        
        if (player1Ready && player2Ready) {
          updates.status = 'playing';
          updates.startTime = new Date().toISOString();
          console.log('🚀 Her iki oyuncu hazır - status playing olarak ayarlanıyor');
        }
        
        await updateDoc(duelRef, updates);
        console.log('✅ playerReady güncellendi:', updates);
        
        // Başarılı, döngüden çık
        return;
      } catch (error) {
        console.error(`playerReady hatası (deneme ${attempt + 1}):`, error);
        if (attempt < 2) {
          // Kısa bir bekleyip tekrar dene
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }
  }

  /**
   * Oyuncu skorunu güncelle
   */
  static async updatePlayerScore(duelId: string, playerId: string, score: number): Promise<void> {
    if (!db) return;

    const duelRef = doc(db, AKTIF_DUELLOLAR_COLLECTION, duelId);
    const duelDoc = await getDoc(duelRef);
    
    if (!duelDoc.exists()) return;
    
    const data = duelDoc.data() as AktifDuello;
    
    if (data.player1Id === playerId) {
      await updateDoc(duelRef, { player1Score: score });
    } else if (data.player2Id === playerId) {
      await updateDoc(duelRef, { player2Score: score });
    }
  }

  /**
   * Oyuncu bitirdi olarak işaretle ve sonuçları profillere kaydet
   */
  static async playerFinished(duelId: string, playerId: string, finalScore: number): Promise<void> {
    if (!db) return;

    const duelRef = doc(db, AKTIF_DUELLOLAR_COLLECTION, duelId);
    const duelDoc = await getDoc(duelRef);
    
    if (!duelDoc.exists()) return;
    
    const data = duelDoc.data() as AktifDuello;
    
    const updates: any = {};
    
    if (data.player1Id === playerId) {
      updates.player1Finished = true;
      updates.player1Score = finalScore;
    } else if (data.player2Id === playerId) {
      updates.player2Finished = true;
      updates.player2Score = finalScore;
    }
    
    // Her iki oyuncu da bitti mi kontrol et
    const player1Finished = data.player1Id === playerId ? true : data.player1Finished;
    const player2Finished = data.player2Id === playerId ? true : data.player2Finished;
    
    if (player1Finished && player2Finished) {
      updates.status = 'finished';
      updates.completedAt = new Date().toISOString();
      
      // Sonuçları profillere kaydet
      const player1FinalScore = data.player1Id === playerId ? finalScore : data.player1Score;
      const player2FinalScore = data.player2Id === playerId ? finalScore : data.player2Score;
      
      try {
        await this.saveDuelResultToProfiles(
          duelId,
          data.player1Id,
          data.player1Name,
          player1FinalScore,
          data.player2Id,
          data.player2Name,
          player2FinalScore,
          data.category
        );
        console.log('✅ Düello sonuçları profillere kaydedildi');
      } catch (profileError) {
        console.error('Profil kayıt hatası:', profileError);
      }
    }
    
    await updateDoc(duelRef, updates);
  }

  /**
   * Düello sonuçlarını kullanıcı profillerine kaydet
   */
  static async saveDuelResultToProfiles(
    duelId: string,
    player1Id: string,
    player1Name: string,
    player1Score: number,
    player2Id: string,
    player2Name: string,
    player2Score: number,
    category: string
  ): Promise<void> {
    if (!db) return;
    
    // Kazananı belirle
    let winnerId: string | null = null;
    if (player1Score > player2Score) {
      winnerId = player1Id;
    } else if (player2Score > player1Score) {
      winnerId = player2Id;
    }
    // Eşitlik = null (berabere)
    
    const resultData = {
      duelId,
      player1Id,
      player1Name,
      player1Score,
      player2Id,
      player2Name,
      player2Score,
      winnerId,
      category,
      completedAt: new Date().toISOString(),
    };
    
    // Düello sonuçları koleksiyonuna kaydet
    const resultId = `result_${duelId}`;
    await setDoc(doc(db, KOLEKSIYONLAR.DUELLO_SONUCLARI || 'duello_sonuclari', resultId), resultData);
    
    // Her iki oyuncunun istatistiklerini güncelle
    await Promise.all([
      this.updatePlayerDuelStats(player1Id, winnerId),
      this.updatePlayerDuelStats(player2Id, winnerId)
    ]);
    
    // XP ekle
    const player1XP = winnerId === null ? DUEL_XP_DRAW : (winnerId === player1Id ? DUEL_XP_WIN : DUEL_XP_LOSE);
    const player2XP = winnerId === null ? DUEL_XP_DRAW : (winnerId === player2Id ? DUEL_XP_WIN : DUEL_XP_LOSE);
    
    await Promise.all([
      this.addXPToUser(player1Id, player1XP),
      this.addXPToUser(player2Id, player2XP)
    ]);
  }

  /**
   * Oyuncunun düello istatistiklerini güncelle (Firestore'da)
   */
  static async updatePlayerDuelStats(playerId: string, winnerId: string | null): Promise<void> {
    if (!db) return;
    
    try {
      const userRef = doc(db, KOLEKSIYONLAR.KULLANICILAR, playerId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) return;
      
      const userData = userDoc.data();
      const currentStats = userData.duelStats || {
        totalDuels: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winStreak: 0,
        bestWinStreak: 0,
      };
      
      // İstatistikleri güncelle
      const newStats = {
        ...currentStats,
        totalDuels: currentStats.totalDuels + 1,
      };
      
      if (winnerId === null) {
        // Berabere
        newStats.draws = currentStats.draws + 1;
        newStats.winStreak = 0;
      } else if (winnerId === playerId) {
        // Kazandı
        newStats.wins = currentStats.wins + 1;
        newStats.winStreak = currentStats.winStreak + 1;
        if (newStats.winStreak > currentStats.bestWinStreak) {
          newStats.bestWinStreak = newStats.winStreak;
        }
      } else {
        // Kaybetti
        newStats.losses = currentStats.losses + 1;
        newStats.winStreak = 0;
      }
      
      // Kazanma oranını hesapla
      newStats.winRate = newStats.totalDuels > 0 
        ? Math.round((newStats.wins / newStats.totalDuels) * 100) 
        : 0;
      
      await updateDoc(userRef, { duelStats: newStats });
      console.log(`📊 ${playerId} düello istatistikleri güncellendi:`, newStats);
    } catch (error) {
      console.error('Düello istatistik güncelleme hatası:', error);
    }
  }

  /**
   * Kullanıcıya XP ekle
   */
  static async addXPToUser(userId: string, xpAmount: number): Promise<void> {
    if (!db) return;
    
    try {
      const userRef = doc(db, KOLEKSIYONLAR.KULLANICILAR, userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) return;
      
      const userData = userDoc.data();
      const currentXP = userData.xp || 0;
      const newXP = currentXP + xpAmount;
      
      // Seviye hesapla
      const newLevel = this.calculateLevelFromXP(newXP);
      
      await updateDoc(userRef, { 
        xp: newXP,
        level: newLevel,
      });
      
      console.log(`⭐ ${userId} kullanıcısına ${xpAmount} XP eklendi. Yeni XP: ${newXP}, Seviye: ${newLevel}`);
    } catch (error) {
      console.error('XP ekleme hatası:', error);
    }
  }

  /**
   * XP'den seviye hesapla
   */
  private static calculateLevelFromXP(xp: number): number {
    let level = 1;
    let totalXPNeeded = 0;
    
    while (totalXPNeeded + (level * 100) <= xp) {
      totalXPNeeded += level * 100;
      level++;
    }
    
    return level;
  }

  /**
   * Aktif düelloyu getir
   */
  static async getAktifDuello(duelId: string): Promise<AktifDuello | null> {
    if (!db) return null;

    const duelDoc = await getDoc(doc(db, AKTIF_DUELLOLAR_COLLECTION, duelId));
    
    if (!duelDoc.exists()) return null;
    
    return duelDoc.data() as AktifDuello;
  }

  /**
   * Aktif düelloyu dinle (real-time)
   */
  static listenToAktifDuello(
    duelId: string, 
    callback: (duello: AktifDuello | null) => void
  ): () => void {
    if (!db) {
      callback(null);
      return () => {};
    }

    const duelRef = doc(db, AKTIF_DUELLOLAR_COLLECTION, duelId);
    
    return onSnapshot(duelRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as AktifDuello);
      } else {
        callback(null);
      }
    }, (error) => {
      console.error('Aktif düello dinleme hatası:', error);
      callback(null);
    });
  }

  /**
   * 3 günden eski düello sonuçlarını sil
   * Bu fonksiyon periyodik olarak çağrılmalı (ör: uygulama açılışında)
   */
  static async cleanOldDuelResults(daysOld: number = 3): Promise<{ deleted: number; errors: number }> {
    if (!db) return { deleted: 0, errors: 0 };

    let deleted = 0;
    let errors = 0;
    
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);
      const cutoffISO = cutoffDate.toISOString();

      console.log(`🧹 ${daysOld} günden eski düello sonuçları temizleniyor...`);
      console.log(`📅 Kesim tarihi: ${cutoffISO}`);

      // Düello sonuçları koleksiyonundan eski kayıtları sil
      const resultsRef = collection(db, KOLEKSIYONLAR.DUELLO_SONUCLARI || 'duelloSonuclari');
      const oldResultsQuery = query(
        resultsRef,
        where('completedAt', '<', cutoffISO)
      );
      
      const oldResultsSnap = await getDocs(oldResultsQuery);
      
      for (const docSnap of oldResultsSnap.docs) {
        try {
          await deleteDoc(doc(db, KOLEKSIYONLAR.DUELLO_SONUCLARI || 'duelloSonuclari', docSnap.id));
          deleted++;
        } catch (err) {
          console.error(`Düello sonucu silinemedi: ${docSnap.id}`, err);
          errors++;
        }
      }

      // Aktif düellolar koleksiyonundan eski kayıtları sil
      const aktivRef = collection(db, KOLEKSIYONLAR.AKTIF_DUELLOLAR || 'aktivDuellolar');
      const oldAktivQuery = query(
        aktivRef,
        where('createdAt', '<', cutoffISO)
      );
      
      const oldAktivSnap = await getDocs(oldAktivQuery);
      
      for (const docSnap of oldAktivSnap.docs) {
        try {
          await deleteDoc(doc(db, KOLEKSIYONLAR.AKTIF_DUELLOLAR || 'aktivDuellolar', docSnap.id));
          deleted++;
        } catch (err) {
          console.error(`Aktif düello silinemedi: ${docSnap.id}`, err);
          errors++;
        }
      }

      // Düello istekleri koleksiyonundan eski kayıtları sil
      const isteklerRef = collection(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI || 'duelloIstekleri');
      const oldIsteklerQuery = query(
        isteklerRef,
        where('createdAt', '<', cutoffISO)
      );
      
      const oldIsteklerSnap = await getDocs(oldIsteklerQuery);
      
      for (const docSnap of oldIsteklerSnap.docs) {
        try {
          await deleteDoc(doc(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI || 'duelloIstekleri', docSnap.id));
          deleted++;
        } catch (err) {
          console.error(`Düello isteği silinemedi: ${docSnap.id}`, err);
          errors++;
        }
      }

      console.log(`✅ Temizlik tamamlandı: ${deleted} kayıt silindi, ${errors} hata`);
      
      return { deleted, errors };
    } catch (error) {
      console.error('Eski düello temizleme hatası:', error);
      return { deleted, errors: errors + 1 };
    }
  }

  /**
   * Tüm düello verilerini temizle (debug amaçlı)
   */
  static async clearAllDuelData(): Promise<void> {
    if (!db) return;

    try {
      // Düello sonuçları
      const resultsRef = collection(db, KOLEKSIYONLAR.DUELLO_SONUCLARI || 'duelloSonuclari');
      const resultsSnap = await getDocs(resultsRef);
      for (const docSnap of resultsSnap.docs) {
        await deleteDoc(doc(db, KOLEKSIYONLAR.DUELLO_SONUCLARI || 'duelloSonuclari', docSnap.id));
      }

      // Aktif düellolar
      const aktivRef = collection(db, KOLEKSIYONLAR.AKTIF_DUELLOLAR || 'aktivDuellolar');
      const aktivSnap = await getDocs(aktivRef);
      for (const docSnap of aktivSnap.docs) {
        await deleteDoc(doc(db, KOLEKSIYONLAR.AKTIF_DUELLOLAR || 'aktivDuellolar', docSnap.id));
      }

      // Düello istekleri
      const isteklerRef = collection(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI || 'duelloIstekleri');
      const isteklerSnap = await getDocs(isteklerRef);
      for (const docSnap of isteklerSnap.docs) {
        await deleteDoc(doc(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI || 'duelloIstekleri', docSnap.id));
      }

      console.log('🗑️ Tüm düello verileri temizlendi');
    } catch (error) {
      console.error('Düello verileri temizleme hatası:', error);
    }
  }
}
