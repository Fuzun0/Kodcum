/**
 * Analytics Service
 * Basit analytics takibi - gelecekte Firebase Analytics, Mixpanel vb. entegre edilebilir
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../utils/logger';

// Event tipleri
export type AnalyticsEvent = 
  | 'screen_view'
  | 'lesson_start'
  | 'lesson_complete'
  | 'quiz_start'
  | 'quiz_complete'
  | 'daily_challenge_complete'
  | 'duel_start'
  | 'duel_complete'
  | 'achievement_unlock'
  | 'level_up'
  | 'friend_add'
  | 'message_send'
  | 'code_run'
  | 'error';

// Event parametreleri
interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

// Kaydedilmiş event yapısı
interface StoredEvent {
  name: AnalyticsEvent;
  params: EventParams;
  timestamp: number;
}

const ANALYTICS_STORAGE_KEY = '@kodcum_analytics';
const MAX_STORED_EVENTS = 100;

class AnalyticsService {
  private enabled: boolean = true;
  private userId: string | null = null;
  private sessionId: string;
  private sessionStartTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = Date.now();
  }

  /**
   * Kullanıcı ID ayarla
   */
  setUserId(userId: string | null): void {
    this.userId = userId;
    logger.log('Analytics user set:', userId);
  }

  /**
   * Analytics'i aktif/pasif yap
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    logger.log('Analytics enabled:', enabled);
  }

  /**
   * Benzersiz session ID oluştur
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Event logla
   */
  async logEvent(name: AnalyticsEvent, params: EventParams = {}): Promise<void> {
    if (!this.enabled) return;

    const event: StoredEvent = {
      name,
      params: {
        ...params,
        user_id: this.userId || 'anonymous',
        session_id: this.sessionId,
        session_duration: Date.now() - this.sessionStartTime,
      },
      timestamp: Date.now()
    };

    logger.log(`📊 Analytics Event: ${name}`, params);

    try {
      // Event'i local storage'a kaydet
      await this.storeEvent(event);
      
      // TODO: Gerçek analytics servisi entegrasyonu
      // Örnek: Firebase Analytics
      // await analytics().logEvent(name, params);
      
      // Örnek: Mixpanel
      // Mixpanel.track(name, params);
      
    } catch (error) {
      logger.error('Analytics log error:', error);
    }
  }

  /**
   * Ekran görüntüleme logla
   */
  async logScreenView(screenName: string, screenClass?: string): Promise<void> {
    await this.logEvent('screen_view', {
      screen_name: screenName,
      screen_class: screenClass || screenName
    });
  }

  /**
   * Ders başlatma logla
   */
  async logLessonStart(lessonId: string, category: string): Promise<void> {
    await this.logEvent('lesson_start', {
      lesson_id: lessonId,
      category
    });
  }

  /**
   * Ders tamamlama logla
   */
  async logLessonComplete(lessonId: string, category: string, score?: number): Promise<void> {
    await this.logEvent('lesson_complete', {
      lesson_id: lessonId,
      category,
      score
    });
  }

  /**
   * Quiz başlatma logla
   */
  async logQuizStart(lessonId: string, questionCount: number): Promise<void> {
    await this.logEvent('quiz_start', {
      lesson_id: lessonId,
      question_count: questionCount
    });
  }

  /**
   * Quiz tamamlama logla
   */
  async logQuizComplete(
    lessonId: string, 
    score: number, 
    totalQuestions: number, 
    passed: boolean
  ): Promise<void> {
    await this.logEvent('quiz_complete', {
      lesson_id: lessonId,
      score,
      total_questions: totalQuestions,
      passed,
      percentage: Math.round((score / totalQuestions) * 100)
    });
  }

  /**
   * Günlük görev tamamlama logla
   */
  async logDailyChallengeComplete(challengeId: string, xpEarned: number): Promise<void> {
    await this.logEvent('daily_challenge_complete', {
      challenge_id: challengeId,
      xp_earned: xpEarned
    });
  }

  /**
   * Düello başlatma logla
   */
  async logDuelStart(category: string, opponentId: string): Promise<void> {
    await this.logEvent('duel_start', {
      category,
      opponent_id: opponentId
    });
  }

  /**
   * Düello tamamlama logla
   */
  async logDuelComplete(
    category: string, 
    opponentId: string, 
    isWinner: boolean, 
    score: number
  ): Promise<void> {
    await this.logEvent('duel_complete', {
      category,
      opponent_id: opponentId,
      is_winner: isWinner,
      score
    });
  }

  /**
   * Başarı açma logla
   */
  async logAchievementUnlock(achievementId: string, achievementName: string): Promise<void> {
    await this.logEvent('achievement_unlock', {
      achievement_id: achievementId,
      achievement_name: achievementName
    });
  }

  /**
   * Seviye atlama logla
   */
  async logLevelUp(newLevel: number, totalXp: number): Promise<void> {
    await this.logEvent('level_up', {
      new_level: newLevel,
      total_xp: totalXp
    });
  }

  /**
   * Hata logla
   */
  async logError(errorMessage: string, errorStack?: string): Promise<void> {
    await this.logEvent('error', {
      error_message: errorMessage,
      error_stack: errorStack?.substring(0, 500) // Stack'i sınırla
    });
  }

  /**
   * Event'i local storage'a kaydet
   */
  private async storeEvent(event: StoredEvent): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(ANALYTICS_STORAGE_KEY);
      let events: StoredEvent[] = stored ? JSON.parse(stored) : [];
      
      // Maksimum event sayısını aşmamak için eski eventleri sil
      if (events.length >= MAX_STORED_EVENTS) {
        events = events.slice(-MAX_STORED_EVENTS + 1);
      }
      
      events.push(event);
      await AsyncStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      logger.error('Failed to store analytics event:', error);
    }
  }

  /**
   * Tüm kaydedilmiş eventleri getir
   */
  async getStoredEvents(): Promise<StoredEvent[]> {
    try {
      const stored = await AsyncStorage.getItem(ANALYTICS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      logger.error('Failed to get stored events:', error);
      return [];
    }
  }

  /**
   * Kaydedilmiş eventleri temizle (sync sonrası)
   */
  async clearStoredEvents(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ANALYTICS_STORAGE_KEY);
    } catch (error) {
      logger.error('Failed to clear stored events:', error);
    }
  }

  /**
   * Basit kullanım istatistikleri
   */
  async getUsageStats(): Promise<{
    totalEvents: number;
    sessionsCount: number;
    lastActiveDate: string | null;
  }> {
    const events = await this.getStoredEvents();
    const sessions = new Set(events.map(e => e.params.session_id));
    const lastEvent = events[events.length - 1];
    
    return {
      totalEvents: events.length,
      sessionsCount: sessions.size,
      lastActiveDate: lastEvent 
        ? new Date(lastEvent.timestamp).toISOString() 
        : null
    };
  }
}

export default new AnalyticsService();
