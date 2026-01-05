import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Progress, Badge } from '../types';
import { useAuth } from './AuthContext';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';

const PROGRESS_COLLECTION = KOLEKSIYONLAR.ILERLEME;

interface ProgressContextType {
  progress: Progress[];
  completedQuizzes: string[];
  addProgress: (lessonId: string, completed: boolean, quizScore?: number) => Promise<void>;
  isLessonCompleted: (lessonId: string) => boolean;
  getLessonProgress: (lessonId: string) => Progress | undefined;
  totalXP: number;
  level: number;
  streak: number;
  checkAndUpdateStreak: () => Promise<void>;
  awardXP: (amount: number) => Promise<void>;
  checkBadges: () => Promise<Badge[]>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: ReactNode;
}

// XP'ye göre seviye hesapla
const calculateLevel = (xp: number): number => {
  // Her seviye için gereken XP: 100 * seviye
  let level = 1;
  let totalXPNeeded = 0;
  
  while (totalXPNeeded + (level * 100) <= xp) {
    totalXPNeeded += level * 100;
    level++;
  }
  
  return level;
};

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const { user, updateUserProfile } = useAuth();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  // Derived list of completed quizzes (by percentage >= 60)
  const completedQuizzes = progress
    .filter(p => typeof p.quizScore === 'number' && (p.quizScore || 0) >= 60)
    .map(p => p.lessonId);

  // Kullanıcı değiştiğinde ilerlemeyi yükle
  useEffect(() => {
    if (user) {
      loadProgress();
      setTotalXP(user.xp || 0);
      setLevel(calculateLevel(user.xp || 0));
      setStreak(user.streak || 0);
    } else {
      // Kullanıcı yoksa sıfırla
      setProgress([]);
      setTotalXP(0);
      setLevel(1);
      setStreak(0);
    }
  }, [user]);

  const loadProgress = async () => {
    if (!user) return;
    
    try {
      // Önce db'nin tanımlı olup olmadığını kontrol et
      if (!db) {
        console.warn('Firestore is not initialized, using AsyncStorage only');
        const savedProgress = await AsyncStorage.getItem(`progress_${user.id}`);
        if (savedProgress) {
          setProgress(JSON.parse(savedProgress));
        }
        return;
      }

      // Firestore'dan yükle
      const progressDocRef = doc(db, PROGRESS_COLLECTION, user.id);
      const progressDoc = await getDoc(progressDocRef);
      
      if (progressDoc.exists()) {
        const data = progressDoc.data();
        setProgress(data.items || []);
        // Backup: AsyncStorage'a da kaydet
        await AsyncStorage.setItem(`progress_${user.id}`, JSON.stringify(data.items || []));
      } else {
        // Belge yoksa boş progress oluştur
        await setDoc(progressDocRef, {
          userId: user.id,
          items: [],
          lastUpdated: new Date().toISOString()
        });
      }
    } catch (error: any) {
      // Firestore permissions hatası bekleniyor, sessizce ignore et
      if (error?.code === 'permission-denied' || error?.message?.includes('permissions')) {
        console.log('Firestore offline mode - using local storage');
      } else {
        console.warn('İlerleme yüklenirken hata:', error?.message);
      }
      // Fallback: AsyncStorage'dan yükle
      try {
        const savedProgress = await AsyncStorage.getItem(`progress_${user.id}`);
        if (savedProgress) {
          setProgress(JSON.parse(savedProgress));
        }
      } catch (e) {
        console.error('AsyncStorage fallback hatası:', e);
      }
    }
  };

  const saveProgress = async (newProgress: Progress[]) => {
    if (!user) return;
    
    try {
      // Her zaman AsyncStorage'a kaydet (offline support)
      await AsyncStorage.setItem(`progress_${user.id}`, JSON.stringify(newProgress));
      
      // Firestore varsa oraya da kaydet
      if (db) {
        try {
          const progressDocRef = doc(db, PROGRESS_COLLECTION, user.id);
          await setDoc(progressDocRef, {
            userId: user.id,
            items: newProgress,
            lastUpdated: new Date().toISOString()
          }, { merge: true });
        } catch (firestoreError: any) {
          // Permissions hatası sessizce ignore et
          if (!firestoreError?.code?.includes('permission')) {
            console.warn('Firestore save error:', firestoreError?.message);
          }
        }
      }
    } catch (error) {
      console.error('İlerleme kaydedilirken hata:', error);
    }
  };

  const addProgress = async (lessonId: string, completed: boolean, quizScore?: number) => {
    if (!user) return;
    
    const existingIndex = progress.findIndex(p => p.lessonId === lessonId);
    
    const newProgressItem: Progress = {
      lessonId,
      completed,
      quizScore,
      quizCompletedAt: typeof quizScore === 'number' ? new Date().toISOString() : undefined,
      completedAt: completed ? new Date().toISOString() : undefined,
      timeSpent: 0,
    };

    let newProgress: Progress[];
    
    if (existingIndex >= 0) {
      newProgress = [...progress];
      newProgress[existingIndex] = { ...newProgress[existingIndex], ...newProgressItem };
    } else {
      newProgress = [...progress, newProgressItem];
    }

    setProgress(newProgress);
    await saveProgress(newProgress);

    // Ders tamamlandıysa XP ve streak güncelle
    if (completed) {
      await awardXP(50); // Her ders için 50 XP
      await checkAndUpdateStreak();
      await checkBadges();
    }
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress.some(p => p.lessonId === lessonId && p.completed);
  };

  const getLessonProgress = (lessonId: string): Progress | undefined => {
    return progress.find(p => p.lessonId === lessonId);
  };

  const awardXP = async (amount: number) => {
    const newXP = totalXP + amount;
    const newLevel = calculateLevel(newXP);
    
    setTotalXP(newXP);
    setLevel(newLevel);

    if (user) {
      await updateUserProfile({ xp: newXP, level: newLevel });
    }
  };

  const checkAndUpdateStreak = async () => {
    if (!user) return;

    const today = new Date().toDateString();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate).toDateString() : null;
    
    if (lastActive === today) {
      // Bugün zaten aktif
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let newStreak = 1;
    if (lastActive === yesterday.toDateString()) {
      // Dün aktifti, seriyi artır
      newStreak = (user.streak || 0) + 1;
    }

    setStreak(newStreak);
    await updateUserProfile({
      streak: newStreak,
      lastActiveDate: new Date().toISOString(),
    });
  };

  const checkBadges = async (): Promise<Badge[]> => {
    if (!user) return [];

    const newBadges: Badge[] = [];
    const existingBadgeIds = user.badges.map(b => b.id);

    // İlk ders rozeti
    if (!existingBadgeIds.includes('first_lesson') && progress.some(p => p.completed)) {
      newBadges.push({
        id: 'first_lesson',
        name: 'İlk Ders',
        description: 'İlk dersini tamamladın!',
        icon: '🎓',
        unlockedAt: new Date().toISOString(),
      });
    }

    // İlk quiz rozeti
    if (!existingBadgeIds.includes('first_quiz') && completedQuizzes.length > 0) {
      newBadges.push({
        id: 'first_quiz',
        name: 'İlk Quiz',
        description: 'İlk quizi tamamladın!',
        icon: '❓',
        unlockedAt: new Date().toISOString(),
      });
    }

    // Mükemmel quiz rozeti (%100)
    if (!existingBadgeIds.includes('perfect_quiz') && progress.some(p => p.quizScore === 100)) {
      newBadges.push({
        id: 'perfect_quiz',
        name: 'Mükemmel Quiz',
        description: 'Bir quizde %100 aldın!',
        icon: '💯',
        unlockedAt: new Date().toISOString(),
      });
    }

    // 7 günlük seri rozeti
    if (!existingBadgeIds.includes('streak_7') && streak >= 7) {
      newBadges.push({
        id: 'streak_7',
        name: '7 Günlük Seri',
        description: '7 gün üst üste çalıştın!',
        icon: '🔥',
        unlockedAt: new Date().toISOString(),
      });
    }

    // 30 günlük seri rozeti
    if (!existingBadgeIds.includes('streak_30') && streak >= 30) {
      newBadges.push({
        id: 'streak_30',
        name: '30 Günlük Seri',
        description: '30 gün üst üste çalıştın!',
        icon: '⚡',
        unlockedAt: new Date().toISOString(),
      });
    }

    // Seviye 5 rozeti
    if (!existingBadgeIds.includes('level_5') && level >= 5) {
      newBadges.push({
        id: 'level_5',
        name: 'Seviye 5',
        description: 'Seviye 5\'e ulaştın!',
        icon: '⭐',
        unlockedAt: new Date().toISOString(),
      });
    }

    // Seviye 10 rozeti
    if (!existingBadgeIds.includes('level_10') && level >= 10) {
      newBadges.push({
        id: 'level_10',
        name: 'Seviye 10',
        description: 'Seviye 10\'a ulaştın!',
        icon: '🏆',
        unlockedAt: new Date().toISOString(),
      });
    }

    // Gece kuşu rozeti (00:00 - 05:00 arası)
    const now = new Date();
    const hour = now.getHours();
    if (!existingBadgeIds.includes('night_owl') && hour >= 0 && hour < 5 && progress.some(p => p.completed)) {
      newBadges.push({
        id: 'night_owl',
        name: 'Gece Kuşu',
        description: 'Gece 12\'den sonra ders çalıştın!',
        icon: '🦉',
        unlockedAt: new Date().toISOString(),
      });
    }

    // Erken kuş rozeti (05:00 - 07:00 arası)
    if (!existingBadgeIds.includes('early_bird') && hour >= 5 && hour < 7 && progress.some(p => p.completed)) {
      newBadges.push({
        id: 'early_bird',
        name: 'Erken Kuş',
        description: 'Sabah erkenden ders çalıştın!',
        icon: '🐦',
        unlockedAt: new Date().toISOString(),
      });
    }

    if (newBadges.length > 0) {
      const allBadges = [...user.badges, ...newBadges];
      await updateUserProfile({ badges: allBadges });
    }

    return newBadges;
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      addProgress,
      completedQuizzes,
      isLessonCompleted,
      getLessonProgress,
      totalXP,
      level,
      streak,
      checkAndUpdateStreak,
      awardXP,
      checkBadges,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};
