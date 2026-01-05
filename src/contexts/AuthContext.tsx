import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, testFirebaseConnection } from '../config/firebase';
import { User } from '../types';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
// NotificationService disabled
// import { NotificationService } from '../services/NotificationService';
// import * as Notifications from 'expo-notifications';

const USERS_COLLECTION = KOLEKSIYONLAR.KULLANICILAR;

interface AuthContextType {
  user: User | null;
  firebaseUser: any;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
    // setupNotifications(); // Disabled
  }, []);

  // Push notification kurulumu - DISABLED
  // const setupNotifications = async () => {
  //   try {
  //     const token = await NotificationService.registerForPushNotificationsAsync();
  //     console.log('🔔 Push notification token:', token);
  //     if (token) {
  //       const currentUserId = await AsyncStorage.getItem('currentUserId');
  //       if (currentUserId) {
  //         await NotificationService.savePushTokenToFirestore(currentUserId, token);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Notification setup hatası:', error);
  //   }
  // };

  const loadUser = async () => {
    try {
      const currentUserId = await AsyncStorage.getItem('currentUserId');
      if (currentUserId) {
        if (db) {
          try {
            const userDocRef = doc(db, USERS_COLLECTION, currentUserId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data() as User;
              setUser(userData);
              await AsyncStorage.setItem(`user_${currentUserId}`, JSON.stringify(userData));
              setLoading(false);
              return;
            }
          } catch (firestoreError: any) {
            // Permissions hatası sessizce ignore et
            if (!firestoreError?.code?.includes('permission')) {
              console.warn('Firestore error, using AsyncStorage');
            }
          }
        }
        const savedUser = await AsyncStorage.getItem(`user_${currentUserId}`);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (userData: User) => {
    try {
      console.log('saveUser çağrıldı, kullanıcı ID:', userData.id);
      console.log('Kullanıcı verileri:', JSON.stringify(userData, null, 2));
      
      // Önce AsyncStorage'a kaydet
      await AsyncStorage.setItem(`user_${userData.id}`, JSON.stringify(userData));
      await AsyncStorage.setItem('currentUserId', userData.id);
      setUser(userData);
      console.log('AsyncStorage\'a kaydedildi');
      
      // Firestore'a kaydet
      if (db) {
        try {
          const userDocRef = doc(db, USERS_COLLECTION, userData.id);
          // undefined değerleri null ile değiştir (Firestore undefined kabul etmez)
          const firestoreData = Object.fromEntries(
            Object.entries(userData).map(([key, value]) => [key, value === undefined ? null : value])
          );
          console.log('Firestore\'a kaydedilecek veri:', JSON.stringify(firestoreData, null, 2));
          await setDoc(userDocRef, firestoreData, { merge: true });
          console.log('✅ Kullanıcı Firestore\'a başarıyla kaydedildi:', userData.id);
        } catch (firestoreError: any) {
          console.error('❌ Firestore kaydetme hatası:', firestoreError);
          console.error('Hata kodu:', firestoreError?.code);
          console.error('Hata mesajı:', firestoreError?.message);
          console.error('Hata detayı:', JSON.stringify(firestoreError, null, 2));
        }
      } else {
        console.warn('⚠️ Firestore bağlantısı yok (db = null)');
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const normalizedUsername = username.toLowerCase().trim();
      
      // 1. Önce Firestore'dan kontrol et (cihazlar arası çalışması için)
      if (db) {
        try {
          const usernameQuery = query(
            collection(db, USERS_COLLECTION),
            where('username', '==', normalizedUsername)
          );
          const snapshot = await getDocs(usernameQuery);
          
          if (!snapshot.empty) {
            const userDoc = snapshot.docs[0];
            const userData = userDoc.data();
            
            // Şifre kontrolü
            if (userData.password === password) {
              console.log('✅ Firestore\'dan giriş başarılı:', userData.displayName);
              const user: User = {
                id: userDoc.id,
                username: userData.username,
                email: userData.email,
                displayName: userData.displayName,
                photoURL: userData.photoURL || undefined,
                level: userData.level || 1,
                xp: userData.xp || 0,
                badges: userData.badges || [],
                completedLessons: userData.completedLessons || [],
                completedQuizzes: userData.completedQuizzes || [],
                streak: userData.streak || 0,
                lastActiveDate: userData.lastActiveDate || new Date().toISOString(),
                createdAt: userData.createdAt || new Date().toISOString(),
                preferredLanguage: userData.preferredLanguage || 'tr',
                dailyGoal: userData.dailyGoal || 30,
                weeklyGoalProgress: userData.weeklyGoalProgress || 0,
                totalStudyTime: userData.totalStudyTime || 0,
              };
              
              // Local'a da kaydet
              await AsyncStorage.setItem(`user_${user.id}`, JSON.stringify(user));
              await AsyncStorage.setItem('currentUserId', user.id);
              
              // users listesine de ekle (sonraki girişler için)
              const usersJson = await AsyncStorage.getItem('users');
              const users = usersJson ? JSON.parse(usersJson) : [];
              if (!users.some((u: any) => u.id === user.id)) {
                users.push({ id: user.id, username: user.username, email: user.email, password });
                await AsyncStorage.setItem('users', JSON.stringify(users));
              }
              
              setUser(user);
              return;
            } else {
              throw new Error('Kullanıcı adı veya şifre hatalı');
            }
          }
        } catch (firestoreError: any) {
          if (firestoreError.message?.includes('hatalı')) {
            throw firestoreError;
          }
          console.warn('Firestore giriş hatası, yerel kontrole devam:', firestoreError);
        }
      }
      
      // 2. Firestore'da bulunamazsa veya hata varsa AsyncStorage'dan kontrol et
      const usersJson = await AsyncStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      const existingUser = users.find((u: any) => u.username === normalizedUsername && u.password === password);
      
      if (existingUser) {
        const savedUser = await AsyncStorage.getItem(`user_${existingUser.id}`);
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          await AsyncStorage.setItem('currentUserId', userData.id);
          setUser(userData);
          return;
        }
      }
      
      throw new Error('Kullanıcı adı veya şifre hatalı');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (username: string, email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      console.log('🚀 Kayıt işlemi başlıyor...');
      console.log('📝 Girilen bilgiler:', { username, email, displayName });
      
      // Firebase bağlantı durumunu kontrol et
      const isFirebaseConnected = await testFirebaseConnection();
      console.log('🔌 Firebase bağlantı durumu:', isFirebaseConnected ? 'BAĞLI' : 'BAĞLANAMADI');
      
      if (!isFirebaseConnected) {
        console.warn('⚠️ Firebase bağlantısı yok! Kullanıcı sadece yerel olarak kaydedilecek.');
      }
      
      // Kullanıcı adını küçük harfe çevir (case-insensitive)
      const normalizedUsername = username.toLowerCase().trim();
      const normalizedEmail = email.toLowerCase().trim();
      
      // Kullanıcı adı format kontrolü
      if (normalizedUsername.length < 3) {
        throw new Error('Kullanıcı adı en az 3 karakter olmalıdır');
      }
      if (!/^[a-z0-9_]+$/.test(normalizedUsername)) {
        throw new Error('Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir');
      }
      
      // 1. Firestore'dan kullanıcı adı ve email kontrolü (cihazlar arası)
      if (db) {
        try {
          // Username kontrolü
          const usernameQuery = query(
            collection(db, USERS_COLLECTION),
            where('username', '==', normalizedUsername)
          );
          const usernameSnapshot = await getDocs(usernameQuery);
          if (!usernameSnapshot.empty) {
            throw new Error('Bu kullanıcı adı zaten kullanılıyor');
          }
          
          // Email kontrolü
          const emailQuery = query(
            collection(db, USERS_COLLECTION),
            where('email', '==', normalizedEmail)
          );
          const emailSnapshot = await getDocs(emailQuery);
          if (!emailSnapshot.empty) {
            throw new Error('Bu email zaten kullanılıyor');
          }
          
          console.log('✅ Firestore kontrolü geçti - kullanıcı adı ve email müsait');
        } catch (firestoreError: any) {
          // Eğer hata bizim fırlattığımız bir hata ise tekrar fırlat
          if (firestoreError.message?.includes('zaten kullanılıyor')) {
            throw firestoreError;
          }
          console.warn('Firestore kontrol hatası, yerel kontrole devam ediliyor:', firestoreError);
        }
      }
      
      // 2. Local AsyncStorage kontrolü (yedek)
      const usersJson = await AsyncStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      
      // Kullanıcı adı kontrolü (benzersiz olmalı - yerel)
      if (users.some((u: any) => u.username === normalizedUsername)) {
        throw new Error('Bu kullanıcı adı zaten kullanılıyor');
      }
      
      // Email kontrolü (yerel)
      if (users.some((u: any) => u.email?.toLowerCase() === normalizedEmail)) {
        throw new Error('Bu email zaten kullanılıyor');
      }
      
      const userId = `user_${Date.now()}`;
      const newUser: User = {
        id: userId,
        username: normalizedUsername,
        email: normalizedEmail,
        displayName,
        photoURL: undefined,
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
      
      // Kullanıcı listesine ekle (yerel)
      users.push({ id: userId, username: normalizedUsername, email: normalizedEmail, password });
      await AsyncStorage.setItem('users', JSON.stringify(users));
      
      console.log('📝 Yeni kullanıcı oluşturuldu:', userId, normalizedUsername);
      
      // Firestore'a şifre ile birlikte kaydet
      if (db) {
        try {
          const userDocRef = doc(db, USERS_COLLECTION, userId);
          const firestoreData = {
            ...newUser,
            password: password, // Şifreyi de kaydet
            photoURL: null, // undefined yerine null
          };
          await setDoc(userDocRef, firestoreData);
          console.log('✅ Kullanıcı Firestore\'a şifre ile kaydedildi');
        } catch (firestoreError) {
          console.error('❌ Firestore kaydetme hatası:', firestoreError);
        }
      }
      
      // Local'a kaydet
      await AsyncStorage.setItem(`user_${userId}`, JSON.stringify(newUser));
      await AsyncStorage.setItem('currentUserId', userId);
      setUser(newUser);
      
      console.log('✅ Kayıt tamamlandı - kullanıcı hem yerel hem Firestore\'a kaydedildi');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    throw new Error('Google sign-in not implemented');
  };

  const signInWithApple = async () => {
    throw new Error('Apple sign-in not implemented');
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('currentUserId');
      setUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;
    try {      // PhotoURL kontrolü - local dosyaları kaydetme
      let cleanData = { ...data };
      if (cleanData.photoURL) {
        if (cleanData.photoURL.startsWith('file://') || 
            cleanData.photoURL.startsWith('content://') ||
            cleanData.photoURL.includes('/cache/')) {
          console.log('⚠️ Local fotoğraf URL\'si tespit edildi, Firestore\'a kaydedilmeyecek');
          delete cleanData.photoURL; // Local URL'yi kaydetme
        }
      }
            const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      await AsyncStorage.setItem(`user_${user.id}`, JSON.stringify(updatedUser));
      if (db) {
        try {
          const userDocRef = doc(db, USERS_COLLECTION, user.id);
          // setDoc with merge kullan - document yoksa oluşturur, varsa günceller
          await setDoc(userDocRef, data, { merge: true });
          console.log('✅ Profil Firestore\'a kaydedildi:', user.id, Object.keys(data));
        } catch (firestoreError) {
          console.error('❌ Firestore update error:', firestoreError);
        }
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signInWithApple,
      logout,
      updateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
