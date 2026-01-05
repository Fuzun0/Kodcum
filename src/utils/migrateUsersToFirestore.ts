// Users verilerini AsyncStorage'dan Firestore'a aktarma utility

import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';
import { db, testFirebaseConnection } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';

const USERS_COLLECTION = KOLEKSIYONLAR.KULLANICILAR;

/**
 * Mevcut kullanıcının profilini Firestore'a senkronize eder
 */
export const syncCurrentUserToFirestore = async () => {
  try {
    console.log('🔄 Mevcut kullanıcı Firestore\'a senkronize ediliyor...');
    
    // Firebase bağlantısını test et
    const isConnected = await testFirebaseConnection();
    if (!isConnected || !db) {
      console.error('❌ Firebase bağlantısı kurulamadı');
      return { success: false, error: 'Firebase bağlantısı yok' };
    }

    // Mevcut kullanıcı ID'sini al
    const currentUserId = await AsyncStorage.getItem('currentUserId');
    if (!currentUserId) {
      console.error('❌ Giriş yapılmış kullanıcı bulunamadı');
      return { success: false, error: 'Giriş yapılmış kullanıcı yok' };
    }

    // Kullanıcı profilini al
    const userProfileJson = await AsyncStorage.getItem(`user_${currentUserId}`);
    if (!userProfileJson) {
      console.error('❌ Kullanıcı profili bulunamadı');
      return { success: false, error: 'Kullanıcı profili bulunamadı' };
    }

    const userProfile = JSON.parse(userProfileJson);
    console.log('👤 Senkronize edilecek kullanıcı:', userProfile.username, userProfile.displayName);

    // undefined değerleri null'a çevir
    const firestoreData = Object.fromEntries(
      Object.entries(userProfile).map(([key, value]) => [key, value === undefined ? null : value])
    );

    // Firestore'a kaydet
    const userDocRef = doc(db, USERS_COLLECTION, currentUserId);
    await setDoc(userDocRef, firestoreData);
    
    console.log('✅ Kullanıcı başarıyla Firestore\'a senkronize edildi');
    return { success: true, user: userProfile };
    
  } catch (error: any) {
    console.error('❌ Senkronizasyon hatası:', error);
    return { success: false, error: error?.message || 'Bilinmeyen hata' };
  }
};

/**
 * AsyncStorage'daki tüm kullanıcıları Firestore'a aktarır
 * Uygulama başlatıldığında bir kere çalıştırılmalı
 */
export const migrateUsersToFirestore = async () => {
  try {
    console.log('🔄 Kullanıcılar Firestore\'a aktarılıyor...');
    
    // Firebase bağlantısını test et
    const isConnected = await testFirebaseConnection();
    if (!isConnected || !db) {
      console.error('❌ Firebase bağlantısı kurulamadı');
      return { success: 0, error: 1 };
    }

    // AsyncStorage'dan users listesini al
    const usersJson = await AsyncStorage.getItem('users');
    if (!usersJson) {
      console.log('ℹ️ AsyncStorage\'da users listesi bulunamadı');
      return { success: 0, error: 0 };
    }

    const users = JSON.parse(usersJson);
    console.log(`📋 ${users.length} kullanıcı bulundu`);

    // Her kullanıcı için profil verisini al ve Firestore'a kaydet
    let successCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        // Kullanıcının tam profilini AsyncStorage'dan al
        const userProfileJson = await AsyncStorage.getItem(`user_${user.id}`);
        
        if (!userProfileJson) {
          console.warn(`⚠️ ${user.id} için profil bulunamadı, varsayılan veri oluşturuluyor`);
          
          // Varsayılan profil oluştur
          const defaultProfile = {
            id: user.id,
            username: user.username || `user_${user.id.slice(-6)}`,
            email: user.email || `${user.id}@example.com`,
            displayName: `Kullanıcı ${user.id.slice(-6)}`,
            photoURL: null,
            level: 1,
            xp: 0,
            badges: [],
            completedLessons: [],
            completedQuizzes: [],
            streak: 0,
            lastActiveDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            preferredLanguage: 'tr',
            dailyGoal: 30,
            weeklyGoalProgress: 0,
            totalStudyTime: 0,
          };

          // Firestore'a kaydet
          const firestoreData = Object.fromEntries(
            Object.entries(defaultProfile).map(([key, value]) => [key, value === undefined ? null : value])
          );

          const userDocRef = doc(db, USERS_COLLECTION, user.id);
          await setDoc(userDocRef, firestoreData);
          
          console.log(`✅ ${user.id} - varsayılan profil oluşturuldu`);
          successCount++;
          continue;
        }

        // Mevcut profili Firestore'a kaydet
        const userProfile = JSON.parse(userProfileJson);
        
        // undefined değerleri null'a çevir
        const firestoreData = Object.fromEntries(
          Object.entries(userProfile).map(([key, value]) => [key, value === undefined ? null : value])
        );

        const userDocRef = doc(db, USERS_COLLECTION, user.id);
        await setDoc(userDocRef, firestoreData);
        
        console.log(`✅ ${user.id} - ${userProfile.username || userProfile.email} aktarıldı`);
        successCount++;
        
      } catch (userError) {
        console.error(`❌ ${user.id} aktarılamadı:`, userError);
        errorCount++;
      }
    }

    console.log(`\n📊 Aktarım Tamamlandı:`);
    console.log(`   ✅ Başarılı: ${successCount}`);
    console.log(`   ❌ Hatalı: ${errorCount}`);
    
    return { success: successCount, error: errorCount };
    
  } catch (error) {
    console.error('❌ Migration hatası:', error);
    throw error;
  }
};

/**
 * Progress koleksiyonundaki kullanıcılar için users profili oluşturur
 * (Eğer users AsyncStorage'da yoksa ama progress'de varsa)
 */
export const createUsersFromProgress = async () => {
  try {
    console.log('🔄 Progress\'ten users oluşturuluyor...');
    
    if (!db) {
      console.error('❌ Firestore bağlantısı yok');
      return;
    }

    // Progress kaydı olan kullanıcı ID'lerini bul
    const allKeys = await AsyncStorage.getAllKeys();
    const progressKeys = allKeys.filter(k => k.startsWith('progress_'));
    
    console.log(`📋 ${progressKeys.length} progress kaydı bulundu`);

    let successCount = 0;
    let errorCount = 0;

    for (const progressKey of progressKeys) {
      const userId = progressKey.replace('progress_', '');
      
      try {
        // Bu kullanıcı için users kaydı var mı kontrol et
        const userExists = await AsyncStorage.getItem(`user_${userId}`);
        
        if (userExists) {
          console.log(`ℹ️ ${userId} - zaten users kaydı var, atlanıyor`);
          continue;
        }

        // Yeni user profili oluştur
        const newUser = {
          id: userId,
          username: `user${userId.slice(-6)}`,
          email: `user${userId.slice(-6)}@example.com`,
          displayName: `Kullanıcı ${userId.slice(-6)}`,
          photoURL: null,
          level: 1,
          xp: 0,
          badges: [],
          completedLessons: [],
          completedQuizzes: [],
          streak: 0,
          lastActiveDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          preferredLanguage: 'tr',
          dailyGoal: 30,
          weeklyGoalProgress: 0,
          totalStudyTime: 0,
        };

        // AsyncStorage'a kaydet
        await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(newUser));

        // Firestore'a kaydet
        const firestoreData = Object.fromEntries(
          Object.entries(newUser).map(([key, value]) => [key, value === undefined ? null : value])
        );

        const userDocRef = doc(db, USERS_COLLECTION, userId);
        await setDoc(userDocRef, firestoreData);
        
        console.log(`✅ ${userId} için user profili oluşturuldu`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ ${userId} için user oluşturulamadı:`, error);
        errorCount++;
      }
    }

    console.log(`\n📊 Oluşturma Tamamlandı:`);
    console.log(`   ✅ Başarılı: ${successCount}`);
    console.log(`   ❌ Hatalı: ${errorCount}`);
    
    return { success: successCount, error: errorCount };
    
  } catch (error) {
    console.error('❌ User oluşturma hatası:', error);
    throw error;
  }
};
