import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
import { Progress } from '../types';

export class ProgressService {
  private static progressCollection = KOLEKSIYONLAR.ILERLEME;

  /**
   * Kullanıcının tüm ilerlemelerini getir
   */
  static async getUserProgress(userId: string): Promise<Progress[]> {
    try {
      const q = query(
        collection(db, this.progressCollection),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const progressList: Progress[] = [];
      
      querySnapshot.forEach((doc) => {
        progressList.push(doc.data() as Progress);
      });
      
      return progressList;
    } catch (error) {
      console.error('İlerleme verisi getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Belirli bir ders için ilerlemeyi getir
   */
  static async getLessonProgress(userId: string, lessonId: string): Promise<Progress | null> {
    try {
      const docId = `${userId}_${lessonId}`;
      const progressRef = doc(db, this.progressCollection, docId);
      const progressSnap = await getDoc(progressRef);

      if (progressSnap.exists()) {
        return progressSnap.data() as Progress;
      }
      return null;
    } catch (error) {
      console.error('Ders ilerlemesi getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * İlerleme kaydet veya güncelle
   */
  static async saveProgress(
    userId: string,
    lessonId: string,
    completed: boolean,
    quizScore?: number,
    timeSpent?: number
  ): Promise<void> {
    try {
      const docId = `${userId}_${lessonId}`;
      const progressRef = doc(db, this.progressCollection, docId);

      const progressData: Progress & { userId: string } = {
        userId,
        lessonId,
        completed,
        quizScore,
        completedAt: completed ? new Date().toISOString() : undefined,
        timeSpent: timeSpent || 0,
      };

      await setDoc(progressRef, progressData, { merge: true });
    } catch (error) {
      console.error('İlerleme kaydedilirken hata:', error);
      throw error;
    }
  }

  /**
   * Çalışma süresini güncelle
   */
  static async updateStudyTime(userId: string, lessonId: string, minutes: number): Promise<void> {
    try {
      const docId = `${userId}_${lessonId}`;
      const progressRef = doc(db, this.progressCollection, docId);
      
      const existingProgress = await this.getLessonProgress(userId, lessonId);
      const currentTime = existingProgress?.timeSpent || 0;

      await updateDoc(progressRef, {
        timeSpent: currentTime + minutes,
      });
    } catch (error) {
      console.error('Çalışma süresi güncellenirken hata:', error);
      throw error;
    }
  }

  /**
   * İlerlemeyi sil
   */
  static async deleteProgress(userId: string, lessonId: string): Promise<void> {
    try {
      const docId = `${userId}_${lessonId}`;
      const progressRef = doc(db, this.progressCollection, docId);
      await deleteDoc(progressRef);
    } catch (error) {
      console.error('İlerleme silinirken hata:', error);
      throw error;
    }
  }

  /**
   * Tamamlanan ders sayısını getir
   */
  static async getCompletedLessonsCount(userId: string): Promise<number> {
    try {
      const q = query(
        collection(db, this.progressCollection),
        where('userId', '==', userId),
        where('completed', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Tamamlanan ders sayısı getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Toplam çalışma süresini getir
   */
  static async getTotalStudyTime(userId: string): Promise<number> {
    try {
      const progressList = await this.getUserProgress(userId);
      return progressList.reduce((total, progress) => total + (progress.timeSpent || 0), 0);
    } catch (error) {
      console.error('Toplam çalışma süresi hesaplanırken hata:', error);
      throw error;
    }
  }
}
