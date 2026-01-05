import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
import { User } from '../types';

export class UserService {
  private static usersCollection = KOLEKSIYONLAR.KULLANICILAR;

  /**
   * Yeni kullanıcı profili oluştur
   */
  static async createUserProfile(userId: string, data: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, this.usersCollection, userId);
      
      const userData: User = {
        id: userId,
        username: data.username || '',
        email: data.email || '',
        displayName: data.displayName || 'Kullanıcı',
        photoURL: data.photoURL,
        level: 1,
        xp: 0,
        badges: [],
        completedLessons: [],
        completedQuizzes: [],
        streak: 0,
        lastActiveDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        preferredLanguage: data.preferredLanguage || 'tr',
        dailyGoal: data.dailyGoal || 30, // Varsayılan 30 dakika
        weeklyGoalProgress: 0,
        totalStudyTime: 0,
      };

      await setDoc(userRef, userData);
    } catch (error) {
      console.error('Kullanıcı profili oluşturulurken hata:', error);
      throw error;
    }
  }

  /**
   * Kullanıcı profilini getir
   */
  static async getUserProfile(userId: string): Promise<User | null> {
    try {
      const userRef = doc(db, this.usersCollection, userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Kullanıcı profili getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Kullanıcı profilini güncelle
   */
  static async updateUserProfile(userId: string, data: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, this.usersCollection, userId);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Kullanıcı profili güncellenirken hata:', error);
      throw error;
    }
  }

  /**
   * Kullanıcının XP'sini güncelle
   */
  static async updateXP(userId: string, xpToAdd: number): Promise<void> {
    try {
      const userProfile = await this.getUserProfile(userId);
      if (!userProfile) return;

      const newXP = (userProfile.xp || 0) + xpToAdd;
      const newLevel = this.calculateLevel(newXP);

      await this.updateUserProfile(userId, {
        xp: newXP,
        level: newLevel,
      });
    } catch (error) {
      console.error('XP güncellenirken hata:', error);
      throw error;
    }
  }

  /**
   * Ders tamamlandığında güncelle
   */
  static async markLessonCompleted(userId: string, lessonId: string): Promise<void> {
    try {
      const userProfile = await this.getUserProfile(userId);
      if (!userProfile) return;

      const completedLessons = userProfile.completedLessons || [];
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        await this.updateUserProfile(userId, { completedLessons });
      }
    } catch (error) {
      console.error('Ders tamamlama kaydedilirken hata:', error);
      throw error;
    }
  }

  /**
   * Quiz tamamlandığında güncelle
   */
  static async markQuizCompleted(userId: string, quizId: string, score: number): Promise<void> {
    try {
      const userProfile = await this.getUserProfile(userId);
      if (!userProfile) return;

      const completedQuizzes = userProfile.completedQuizzes || [];
      if (!completedQuizzes.includes(quizId)) {
        completedQuizzes.push(quizId);
        await this.updateUserProfile(userId, { completedQuizzes });
      }
    } catch (error) {
      console.error('Quiz tamamlama kaydedilirken hata:', error);
      throw error;
    }
  }

  /**
   * Streak güncelle
   */
  static async updateStreak(userId: string): Promise<number> {
    try {
      const userProfile = await this.getUserProfile(userId);
      if (!userProfile) return 0;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const lastActive = new Date(userProfile.lastActiveDate || '');
      lastActive.setHours(0, 0, 0, 0);

      const dayDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

      let newStreak = userProfile.streak || 0;

      if (dayDiff === 0) {
        // Bugün zaten aktif
        return newStreak;
      } else if (dayDiff === 1) {
        // Dün aktifti, streak devam ediyor
        newStreak += 1;
      } else {
        // Streak bozuldu
        newStreak = 1;
      }

      await this.updateUserProfile(userId, {
        streak: newStreak,
        lastActiveDate: new Date().toISOString(),
      });

      return newStreak;
    } catch (error) {
      console.error('Streak güncellenirken hata:', error);
      throw error;
    }
  }

  /**
   * Günlük hedef güncelle
   */
  static async updateDailyProgress(userId: string, minutesStudied: number): Promise<void> {
    try {
      const userProfile = await this.getUserProfile(userId);
      if (!userProfile) return;

      const totalStudyTime = (userProfile.totalStudyTime || 0) + minutesStudied;
      const weeklyGoalProgress = (userProfile.weeklyGoalProgress || 0) + minutesStudied;

      await this.updateUserProfile(userId, {
        totalStudyTime,
        weeklyGoalProgress,
      });
    } catch (error) {
      console.error('Günlük ilerleme güncellenirken hata:', error);
      throw error;
    }
  }

  /**
   * Haftalık hedef sıfırla (her hafta başında çağrılmalı)
   */
  static async resetWeeklyGoal(userId: string): Promise<void> {
    try {
      await this.updateUserProfile(userId, {
        weeklyGoalProgress: 0,
      });
    } catch (error) {
      console.error('Haftalık hedef sıfırlanırken hata:', error);
      throw error;
    }
  }

  /**
   * XP'den seviye hesapla
   */
  private static calculateLevel(xp: number): number {
    let level = 1;
    let totalXPNeeded = 0;
    
    while (totalXPNeeded + (level * 100) <= xp) {
      totalXPNeeded += level * 100;
      level++;
    }
    
    return level;
  }

  /**
   * Profil fotoğrafını Firebase Storage'a yükle ve URL'i döndür
   */
  static async uploadProfilePhoto(userId: string, localUri: string): Promise<string> {
    try {
      // Local URI'den blob oluştur
      const response = await fetch(localUri);
      const blob = await response.blob();
      
      // Dosya adı oluştur (timestamp ile benzersiz)
      const filename = `profile_photos/${userId}_${Date.now()}.jpg`;
      const storageRef = ref(storage, filename);
      
      // Firebase Storage'a yükle
      await uploadBytes(storageRef, blob);
      
      // Download URL'i al
      const downloadURL = await getDownloadURL(storageRef);
      
      // Firestore'da kullanıcı profilini güncelle
      await this.updateUserProfile(userId, { photoURL: downloadURL });
      
      console.log('✅ Profil fotoğrafı yüklendi:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Profil fotoğrafı yüklenirken hata:', error);
      throw error;
    }
  }
}
