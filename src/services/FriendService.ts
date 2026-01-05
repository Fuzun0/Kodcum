// Arkadaşlık Sistemi Servisi

import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
// NotificationService disabled
// import { NotificationService } from './NotificationService';
import { 
  Friend, 
  FriendRequest, 
  FriendProfile, 
  WeeklyActivity,
  FriendshipStatus 
} from '../types';

// Storage keys
const FRIENDS_KEY = 'user_friends';
const FRIEND_REQUESTS_KEY = 'friend_requests';
const BLOCKED_USERS_KEY = 'blocked_users';
const USERS_COLLECTION = KOLEKSIYONLAR.KULLANICILAR;
const FRIEND_REQUESTS_COLLECTION = KOLEKSIYONLAR.ARKADASLIK_ISTEKLERI;

export class FriendService {
  
  // ==================== ARKADAŞ LİSTESİ ====================
  
  /**
   * Arkadaş listesini getir (AsyncStorage + Firestore)
   * Her seferinde Firestore'dan güncel profil bilgilerini çeker
   */
  static async getFriends(userId: string): Promise<Friend[]> {
    try {
      // Firestore'dan arkadaşlıkları çek (Firestore'u kaynak olarak kullan)
      if (db) {
        try {
          const friendsMap = new Map<string, Friend>();
          const arkadasliklarRef = collection(db, KOLEKSIYONLAR.ARKADASLIKLAR);
          
          // user1 olarak kayıtlı arkadaşlıklar
          const q1 = query(arkadasliklarRef, where('user1Id', '==', userId));
          const snapshot1 = await getDocs(q1);
          
          for (const docSnap of snapshot1.docs) {
            const data = docSnap.data();
            // Her zaman profili güncelle (photoURL değişmiş olabilir)
            const friendProfile = await this.getFriendProfile(data.user2Id);
            if (friendProfile) {
              const friend: Friend = {
                id: `friend_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                odakId: data.user2Id,
                odakName: data.user2Name || friendProfile.displayName,
                displayName: friendProfile.displayName,
                photoURL: friendProfile.photoURL, // Güncel photoURL
                level: friendProfile.level,
                xp: friendProfile.xp,
                streak: friendProfile.streak,
                lastActiveDate: friendProfile.lastActiveDate,
                friendshipDate: data.createdAt
              };
              friendsMap.set(data.user2Id, friend);
            }
          }
          
          // user2 olarak kayıtlı arkadaşlıklar
          const q2 = query(arkadasliklarRef, where('user2Id', '==', userId));
          const snapshot2 = await getDocs(q2);
          
          for (const docSnap of snapshot2.docs) {
            const data = docSnap.data();
            // Her zaman profili güncelle (photoURL değişmiş olabilir)
            const friendProfile = await this.getFriendProfile(data.user1Id);
            if (friendProfile) {
              const friend: Friend = {
                id: `friend_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                odakId: data.user1Id,
                odakName: data.user1Name || friendProfile.displayName,
                displayName: friendProfile.displayName,
                photoURL: friendProfile.photoURL, // Güncel photoURL
                level: friendProfile.level,
                xp: friendProfile.xp,
                streak: friendProfile.streak,
                lastActiveDate: friendProfile.lastActiveDate,
                friendshipDate: data.createdAt
              };
              friendsMap.set(data.user1Id, friend);
            }
          }
          
          // Firestore'dan gelen arkadaşları AsyncStorage'a kaydet
          const allFriends = Array.from(friendsMap.values());
          await AsyncStorage.setItem(`${FRIENDS_KEY}_${userId}`, JSON.stringify(allFriends));
          
          return allFriends;
        } catch (firestoreError) {
          console.log('Firestore arkadaş listesi okuma hatası:', firestoreError);
          // Firestore hatası varsa AsyncStorage'dan dön
        }
      }
      
      // Firestore yoksa veya hata varsa AsyncStorage'dan oku
      const localFriends = await AsyncStorage.getItem(`${FRIENDS_KEY}_${userId}`);
      return localFriends ? JSON.parse(localFriends) : [];
    } catch (error) {
      console.error('Arkadaş listesi getirme hatası:', error);
      return [];
    }
  }

  /**
   * Arkadaş ekle (kabul edildikten sonra)
   */
  static async addFriend(userId: string, friend: Friend): Promise<void> {
    try {
      const friends = await this.getFriends(userId);
      
      // Zaten arkadaş mı kontrol et
      if (friends.some(f => f.odakId === friend.odakId)) {
        throw new Error('Bu kullanıcı zaten arkadaşınız');
      }
      
      friends.push(friend);
      await AsyncStorage.setItem(`${FRIENDS_KEY}_${userId}`, JSON.stringify(friends));
    } catch (error) {
      console.error('Arkadaş ekleme hatası:', error);
      throw error;
    }
  }

  /**
   * Arkadaşlıktan çıkar (Firestore + AsyncStorage)
   */
  static async removeFriend(userId: string, friendId: string): Promise<void> {
    try {
      console.log('🗑️ Arkadaşlık siliniyor:', { userId, friendId });
      
      // Firestore'dan arkadaşlığı sil
      if (db) {
        const arkadasliklarRef = collection(db, KOLEKSIYONLAR.ARKADASLIKLAR);
        
        // user1Id-user2Id kombinasyonunu ara
        const q1 = query(
          arkadasliklarRef,
          where('user1Id', '==', userId),
          where('user2Id', '==', friendId)
        );
        const snapshot1 = await getDocs(q1);
        
        for (const docSnap of snapshot1.docs) {
          await deleteDoc(doc(db, KOLEKSIYONLAR.ARKADASLIKLAR, docSnap.id));
          console.log('✅ Firestore arkadaşlık belgesi silindi (user1-user2):', docSnap.id);
        }
        
        // user2Id-user1Id kombinasyonunu ara
        const q2 = query(
          arkadasliklarRef,
          where('user1Id', '==', friendId),
          where('user2Id', '==', userId)
        );
        const snapshot2 = await getDocs(q2);
        
        for (const docSnap of snapshot2.docs) {
          await deleteDoc(doc(db, KOLEKSIYONLAR.ARKADASLIKLAR, docSnap.id));
          console.log('✅ Firestore arkadaşlık belgesi silindi (user2-user1):', docSnap.id);
        }
      }
      
      // AsyncStorage'dan da sil (her iki kullanıcı için)
      const friends = await this.getFriends(userId);
      const filtered = friends.filter(f => f.odakId !== friendId);
      await AsyncStorage.setItem(`${FRIENDS_KEY}_${userId}`, JSON.stringify(filtered));
      
      // Diğer kullanıcının listesinden de sil
      const friendFriends = await this.getFriends(friendId);
      const friendFiltered = friendFriends.filter(f => f.odakId !== userId);
      await AsyncStorage.setItem(`${FRIENDS_KEY}_${friendId}`, JSON.stringify(friendFiltered));
      
      console.log('✅ Arkadaşlık başarıyla silindi');
    } catch (error) {
      console.error('Arkadaş silme hatası:', error);
      throw error;
    }
  }

  /**
   * Arkadaş mı kontrol et
   */
  static async isFriend(userId: string, targetId: string): Promise<boolean> {
    const friends = await this.getFriends(userId);
    return friends.some(f => f.odakId === targetId);
  }

  // ==================== ARKADAŞLIK İSTEKLERİ ====================

  /**
   * Arkadaşlık isteği gönder (Firestore + AsyncStorage)
   */
  static async sendFriendRequest(
    senderId: string, 
    senderName: string,
    senderPhoto: string | undefined,
    senderLevel: number,
    receiverId: string
  ): Promise<FriendRequest> {
    try {
      console.log('📤 Arkadaşlık isteği gönderiliyor:', { senderId, receiverId });
      
      // Zaten arkadaş mı?
      const isFriend = await this.isFriend(senderId, receiverId);
      if (isFriend) {
        throw new Error('Bu kullanıcı zaten arkadaşınız');
      }

      // Zaten istek var mı? (Firestore'dan kontrol)
      if (db) {
        const existingQuery = query(
          collection(db, FRIEND_REQUESTS_COLLECTION),
          where('senderId', '==', senderId),
          where('receiverId', '==', receiverId),
          where('status', '==', 'pending')
        );
        const existingSnapshot = await getDocs(existingQuery);
        if (!existingSnapshot.empty) {
          throw new Error('Zaten bir arkadaşlık isteği gönderilmiş');
        }
        
        // Eski koleksiyondan da kontrol et
        try {
          const oldQuery = query(
            collection(db, 'friendRequests'),
            where('senderId', '==', senderId),
            where('receiverId', '==', receiverId),
            where('status', '==', 'pending')
          );
          const oldSnapshot = await getDocs(oldQuery);
          if (!oldSnapshot.empty) {
            throw new Error('Zaten bir arkadaşlık isteği gönderilmiş');
          }
        } catch (e) {
          // Eski koleksiyon yoksa devam et
        }
      }

      const request: FriendRequest = {
        id: `fr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        senderId,
        senderName,
        senderPhoto: senderPhoto || '', // undefined yerine boş string kullan (Firestore undefined kabul etmez)
        senderLevel,
        receiverId,
        toUserId: receiverId, // Real-time listener için
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Firestore'a kaydet
      if (db) {
        try {
          const requestRef = doc(db, FRIEND_REQUESTS_COLLECTION, request.id);
          // Firestore undefined değerleri kabul etmez, undefined olan alanları temizle
          const cleanRequest = JSON.parse(JSON.stringify(request));
          await setDoc(requestRef, cleanRequest);
          console.log('✅ Arkadaşlık isteği Firestore\'a kaydedildi:', request.id);
        } catch (firestoreError) {
          console.error('❌ Firestore kaydetme hatası:', firestoreError);
        }
      }

      // AsyncStorage'a da kaydet (yedek)
      const requests = await this.getPendingRequests(receiverId);
      requests.push(request);
      await AsyncStorage.setItem(`${FRIEND_REQUESTS_KEY}_${receiverId}`, JSON.stringify(requests));

      // 🔔 Push notification gönder (disabled)
      // try {
      //   await NotificationService.sendFriendRequestNotification(
      //     receiverId,
      //     senderName,
      //     request.id
      //   );
      // } catch (notifError) {
      //   console.log('Bildirim gönderilemedi:', notifError);
      // }

      return request;
    } catch (error) {
      console.error('Arkadaşlık isteği gönderme hatası:', error);
      throw error;
    }
  }

  /**
   * Bekleyen arkadaşlık isteklerini getir (Firestore + AsyncStorage)
   */
  static async getPendingRequests(userId: string): Promise<FriendRequest[]> {
    try {
      const results: FriendRequest[] = [];
      const seenIds = new Set<string>();

      // Firestore'dan çek (her iki koleksiyondan)
      if (db) {
        const collectionsToCheck = [FRIEND_REQUESTS_COLLECTION, 'friendRequests'];
        
        for (const collectionName of collectionsToCheck) {
          try {
            const requestsQuery = query(
              collection(db, collectionName),
              where('receiverId', '==', userId),
              where('status', '==', 'pending')
            );
            const snapshot = await getDocs(requestsQuery);
            
            snapshot.forEach((docSnap) => {
              const data = docSnap.data() as FriendRequest;
              if (!seenIds.has(data.id)) {
                seenIds.add(data.id);
                results.push(data);
              }
            });
            
            console.log(`📬 [${collectionName}] ${snapshot.size} bekleyen istek bulundu`);
          } catch (err) {
            console.log(`ℹ️ ${collectionName} okunamadı`);
          }
        }
      }

      // AsyncStorage'dan da çek (yedek)
      try {
        const requests = await AsyncStorage.getItem(`${FRIEND_REQUESTS_KEY}_${userId}`);
        const parsed: FriendRequest[] = requests ? JSON.parse(requests) : [];
        parsed.filter(r => r.status === 'pending').forEach(r => {
          if (!seenIds.has(r.id)) {
            seenIds.add(r.id);
            results.push(r);
          }
        });
      } catch (err) {
        console.log('AsyncStorage okuma hatası');
      }

      return results;
    } catch (error) {
      console.error('İstek listesi getirme hatası:', error);
      return [];
    }
  }

  /**
   * Gönderilen arkadaşlık isteklerini getir
   */
  static async getSentRequests(userId: string): Promise<FriendRequest[]> {
    try {
      // Tüm storage'dan userId'nin gönderdiği istekleri bul
      // Not: Gerçek uygulamada bu bir veritabanı sorgusu olacak
      const allKeys = await AsyncStorage.getAllKeys();
      const requestKeys = allKeys.filter(k => k.startsWith(FRIEND_REQUESTS_KEY));
      
      const sentRequests: FriendRequest[] = [];
      
      for (const key of requestKeys) {
        const requests = await AsyncStorage.getItem(key);
        if (requests) {
          const parsed: FriendRequest[] = JSON.parse(requests);
          const userSent = parsed.filter(r => r.senderId === userId);
          sentRequests.push(...userSent);
        }
      }
      
      return sentRequests;
    } catch (error) {
      console.error('Gönderilen istekleri getirme hatası:', error);
      return [];
    }
  }

  /**
   * Arkadaşlık isteğini kabul et (Firestore + AsyncStorage)
   */
  static async acceptFriendRequest(userId: string, requestId: string): Promise<void> {
    try {
      console.log('✅ Arkadaşlık isteği kabul ediliyor:', requestId);
      
      let request: FriendRequest | null = null;
      
      // Firestore'dan isteği bul ve güncelle
      if (db) {
        const collectionsToCheck = [FRIEND_REQUESTS_COLLECTION, 'friendRequests'];
        
        for (const collectionName of collectionsToCheck) {
          try {
            const requestRef = doc(db, collectionName, requestId);
            const requestDoc = await getDoc(requestRef);
            
            if (requestDoc.exists()) {
              request = requestDoc.data() as FriendRequest;
              // Firestore'da güncelle
              await updateDoc(requestRef, {
                status: 'accepted',
                updatedAt: new Date().toISOString()
              });
              console.log(`✅ ${collectionName} koleksiyonunda istek güncellendi`);
              break;
            }
          } catch (err) {
            console.log(`ℹ️ ${collectionName} güncellenemedi`);
          }
        }
      }
      
      // AsyncStorage'dan da kontrol et
      const requests = await AsyncStorage.getItem(`${FRIEND_REQUESTS_KEY}_${userId}`);
      const parsed: FriendRequest[] = requests ? JSON.parse(requests) : [];
      
      const requestIndex = parsed.findIndex(r => r.id === requestId);
      if (requestIndex !== -1) {
        if (!request) {
          request = parsed[requestIndex];
        }
        parsed[requestIndex].status = 'accepted';
        parsed[requestIndex].updatedAt = new Date().toISOString();
        await AsyncStorage.setItem(`${FRIEND_REQUESTS_KEY}_${userId}`, JSON.stringify(parsed));
      }
      
      if (!request) {
        throw new Error('İstek bulunamadı');
      }

      // Her iki tarafa da arkadaş ekle
      const friendForReceiver: Friend = {
        id: `friend_${Date.now()}`,
        odakId: request.senderId,
        odakName: request.senderName,
        displayName: request.senderName,
        photoURL: request.senderPhoto,
        level: request.senderLevel,
        xp: 0,
        streak: 0,
        lastActiveDate: new Date().toISOString(),
        friendshipDate: new Date().toISOString()
      };

      await this.addFriend(userId, friendForReceiver);
      
      // Göndericiye de kabul eden kişiyi arkadaş olarak ekle
      // Kabul eden kullanıcının bilgilerini Firestore'dan al
      let accepterProfile: any = null;
      
      if (db) {
        const collectionsToCheck = [USERS_COLLECTION, 'users'];
        
        for (const collectionName of collectionsToCheck) {
          try {
            const userDocRef = doc(db, collectionName, userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              accepterProfile = userDoc.data();
              console.log(`✅ Kabul eden kullanıcı ${collectionName} koleksiyonunda bulundu:`, accepterProfile.displayName);
              break;
            }
          } catch (err) {
            console.log(`ℹ️ ${collectionName} koleksiyonunda kullanıcı arama hatası`);
          }
        }
      }
      
      // Firestore'da yoksa AsyncStorage'dan dene
      if (!accepterProfile) {
        const accepterProfileJson = await AsyncStorage.getItem(`user_${userId}`);
        accepterProfile = accepterProfileJson ? JSON.parse(accepterProfileJson) : null;
      }
      
      if (accepterProfile) {
        const friendForSender: Friend = {
          id: `friend_${Date.now()}_sender`,
          odakId: userId,
          odakName: accepterProfile.displayName || 'Kullanıcı',
          displayName: accepterProfile.displayName || 'Kullanıcı',
          photoURL: accepterProfile.photoURL,
          level: accepterProfile.level || 1,
          xp: accepterProfile.xp || 0,
          streak: accepterProfile.streak || 0,
          lastActiveDate: new Date().toISOString(),
          friendshipDate: new Date().toISOString()
        };
        
        await this.addFriend(request.senderId, friendForSender);
        console.log(`✅ Gönderici (${request.senderId}) arkadaş listesine de eklendi`);
      } else {
        console.log('⚠️ Kabul eden kullanıcı profili bulunamadı, gönderici listesine eklenemedi');
      }
      
      // Firestore'da arkadaşlık ilişkisini de kaydet (çift yönlü senkronizasyon için)
      if (db) {
        try {
          const arkadaslikId = `arkadaslik_${userId}_${request.senderId}`;
          await setDoc(doc(db, KOLEKSIYONLAR.ARKADASLIKLAR, arkadaslikId), {
            user1Id: userId,
            user1Name: accepterProfile?.displayName || 'Kullanıcı',
            user2Id: request.senderId,
            user2Name: request.senderName,
            createdAt: new Date().toISOString()
          });
          console.log('✅ Arkadaşlık Firestore\'a kaydedildi');
        } catch (err) {
          console.log('Arkadaşlık Firestore kaydı hatası:', err);
        }
      }
      
      // 🔔 Gönderene arkadaşlık kabul bildirimi gönder (disabled)
      // try {
      //   await NotificationService.sendFriendAcceptedNotification(
      //     request.senderId,
      //     accepterProfile?.displayName || 'Kullanıcı'
      //   );
      // } catch (notifError) {
      //   console.log('Bildirim gönderilemedi:', notifError);
      // }
      
    } catch (error) {
      console.error('İstek kabul hatası:', error);
      throw error;
    }
  }

  /**
   * Arkadaşlık isteğini reddet
   */
  static async rejectFriendRequest(userId: string, requestId: string): Promise<void> {
    try {
      const requests = await AsyncStorage.getItem(`${FRIEND_REQUESTS_KEY}_${userId}`);
      const parsed: FriendRequest[] = requests ? JSON.parse(requests) : [];
      
      const requestIndex = parsed.findIndex(r => r.id === requestId);
      if (requestIndex === -1) {
        throw new Error('İstek bulunamadı');
      }

      parsed[requestIndex].status = 'rejected';
      parsed[requestIndex].updatedAt = new Date().toISOString();
      
      await AsyncStorage.setItem(`${FRIEND_REQUESTS_KEY}_${userId}`, JSON.stringify(parsed));
    } catch (error) {
      console.error('İstek reddetme hatası:', error);
      throw error;
    }
  }

  // ==================== KULLANICI ARAMA ====================

  /**
   * Kullanıcı ara (username veya displayName ile)
   * Firestore'dan gerçek kullanıcıları arar
   * Hem "kullanicilar" hem "users" koleksiyonlarını kontrol eder
   */
  static async searchUsers(searchQuery: string, currentUserId: string): Promise<FriendProfile[]> {
    try {
      if (!searchQuery || searchQuery.length < 2) {
        return [];
      }

      const normalizedQuery = searchQuery.toLowerCase().trim();
      const results: FriendProfile[] = [];
      const foundUserIds = new Set<string>(); // Tekrar eden kullanıcıları önlemek için

      console.log('🔍 Kullanıcı aranıyor:', normalizedQuery);

      // Firestore'dan her iki koleksiyondan da kullanıcıları çek
      if (db) {
        // Her iki koleksiyonu da kontrol et (Türkçe ve eski İngilizce)
        const collectionsToSearch = [USERS_COLLECTION, 'users'];
        
        for (const collectionName of collectionsToSearch) {
          try {
            console.log(`📡 ${collectionName} koleksiyonundan kullanıcılar çekiliyor...`);
            const usersRef = collection(db, collectionName);
            const usersSnapshot = await getDocs(usersRef);
            
            console.log(`📊 ${collectionName} koleksiyonunda ${usersSnapshot.size} kullanıcı bulundu`);
            
            usersSnapshot.forEach((docSnap) => {
              const userData = docSnap.data();
              
              // Zaten eklendiyse atla
              if (foundUserIds.has(userData.id)) {
                return;
              }
              
              console.log(`👤 [${collectionName}] Kullanıcı:`, {
                id: userData.id,
                username: userData.username,
                displayName: userData.displayName
              });
              
              // Kendini hariç tut
              if (userData.id === currentUserId) {
                console.log('⏭️ Kendi hesabı, atlanıyor');
                return;
              }
              
              // Username veya displayName ile eşleşme kontrolü
              const usernameMatch = userData.username?.toLowerCase().includes(normalizedQuery);
              const displayNameMatch = userData.displayName?.toLowerCase().includes(normalizedQuery);
              
              if (usernameMatch || displayNameMatch) {
                console.log('✅ Eşleşme bulundu:', userData.username, userData.displayName);
                foundUserIds.add(userData.id);
                results.push({
                  userId: userData.id,
                  username: userData.username || '',
                  displayName: userData.displayName || 'Kullanıcı',
                  photoURL: userData.photoURL || userData.fotoUrl, // Hem photoURL hem fotoUrl kontrol et
                  level: userData.level || 1,
                  xp: userData.xp || 0,
                  totalXP: userData.xp || 0,
                  streak: userData.streak || 0,
                  lastActiveDate: userData.lastActiveDate || new Date().toISOString(),
                  badges: userData.badges || [],
                  completedLessonsCount: userData.completedLessons?.length || 0,
                  completedQuizzesCount: userData.completedQuizzes?.length || 0,
                  averageQuizScore: 0,
                  weeklyActivity: this.getEmptyWeeklyActivity(),
                  memberSince: userData.createdAt || new Date().toISOString(),
                  joinedAt: userData.createdAt || new Date().toISOString(),
                  quizStats: {
                    totalQuizzes: userData.completedQuizzes?.length || 0,
                    correctAnswers: 0,
                    successRate: 0
                  }
                });
              }
            });
          } catch (collectionError) {
            console.log(`ℹ️ ${collectionName} koleksiyonu okunamadı:`, collectionError);
          }
        }
        
        console.log(`Firestore'dan toplam ${results.length} kullanıcı bulundu`);
      }

      // Firestore'dan sonuç yoksa AsyncStorage'dan dene
      if (results.length === 0) {
        try {
          const usersJson = await AsyncStorage.getItem('users');
          const users = usersJson ? JSON.parse(usersJson) : [];
          
          for (const u of users) {
            if (u.id === currentUserId) continue;
            
            const usernameMatch = u.username?.toLowerCase().includes(normalizedQuery);
            
            if (usernameMatch) {
              // Kullanıcının profil bilgilerini çek
              const profileJson = await AsyncStorage.getItem(`user_${u.id}`);
              const profile = profileJson ? JSON.parse(profileJson) : null;
              
              if (profile) {
                results.push({
                  userId: profile.id,
                  username: profile.username || '',
                  displayName: profile.displayName || 'Kullanıcı',
                  photoURL: profile.photoURL || profile.fotoUrl, // Hem photoURL hem fotoUrl kontrol et
                  level: profile.level || 1,
                  xp: profile.xp || 0,
                  totalXP: profile.xp || 0,
                  streak: profile.streak || 0,
                  lastActiveDate: profile.lastActiveDate || new Date().toISOString(),
                  badges: profile.badges || [],
                  completedLessonsCount: profile.completedLessons?.length || 0,
                  completedQuizzesCount: profile.completedQuizzes?.length || 0,
                  averageQuizScore: 0,
                  weeklyActivity: this.getEmptyWeeklyActivity(),
                  memberSince: profile.createdAt || new Date().toISOString(),
                  joinedAt: profile.createdAt || new Date().toISOString(),
                  quizStats: {
                    totalQuizzes: profile.completedQuizzes?.length || 0,
                    correctAnswers: 0,
                    successRate: 0
                  }
                });
              }
            }
          }
          
          console.log(`AsyncStorage'dan ${results.length} kullanıcı bulundu`);
        } catch (asyncError) {
          console.error('AsyncStorage arama hatası:', asyncError);
        }
      }

      return results;
    } catch (error) {
      console.error('Kullanıcı arama hatası:', error);
      return [];
    }
  }

  // ==================== ARKADAŞ PROFİLİ ====================

  /**
   * Arkadaş profilini getir
   */
  static async getFriendProfile(friendId: string): Promise<FriendProfile | null> {
    try {
      let userData: any = null;
      
      console.log('🔍 Arkadaş profili getiriliyor:', friendId);
      
      // Önce Firestore'dan dene - her iki koleksiyondan
      if (db) {
        const collectionsToCheck = [USERS_COLLECTION, 'users'];
        
        for (const collectionName of collectionsToCheck) {
          try {
            const userDocRef = doc(db, collectionName, friendId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              userData = userDoc.data();
              console.log(`✅ Kullanıcı ${collectionName} koleksiyonunda bulundu:`, userData.displayName);
              break;
            }
          } catch (err) {
            console.log(`ℹ️ ${collectionName} koleksiyonunda arama hatası:`, err);
          }
        }
      }
      
      // Firestore'da yoksa AsyncStorage'dan dene
      if (!userData) {
        const profileJson = await AsyncStorage.getItem(`user_${friendId}`);
        userData = profileJson ? JSON.parse(profileJson) : null;
        if (userData) {
          console.log('✅ Kullanıcı AsyncStorage\'da bulundu:', userData.displayName);
        }
      }
      
      if (!userData) {
        console.log('❌ Kullanıcı bulunamadı:', friendId);
        return null;
      }
      
      return {
        userId: userData.id || friendId,
        username: userData.username || 'kullanici',
        displayName: userData.displayName || 'Kullanıcı',
        photoURL: userData.photoURL || userData.fotoUrl, // Hem photoURL hem fotoUrl kontrol et
        level: userData.level || 1,
        xp: userData.xp || 0,
        totalXP: userData.xp || 0,
        streak: userData.streak || 0,
        lastActiveDate: userData.lastActiveDate || new Date().toISOString(),
        badges: userData.badges || [],
        completedLessonsCount: userData.completedLessons?.length || 0,
        completedQuizzesCount: userData.completedQuizzes?.length || 0,
        averageQuizScore: 0,
        weeklyActivity: this.getEmptyWeeklyActivity(),
        memberSince: userData.createdAt || new Date().toISOString(),
        joinedAt: userData.createdAt || new Date().toISOString(),
        totalStudyTime: userData.totalStudyTime || 0,
        quizStats: {
          totalQuizzes: userData.completedQuizzes?.length || 0,
          correctAnswers: 0,
          successRate: 0
        }
      };
    } catch (error) {
      console.error('Arkadaş profili getirme hatası:', error);
      return null;
    }
  }

  // ==================== ENGELLİ KULLANICILAR ====================

  /**
   * Kullanıcıyı engelle
   */
  static async blockUser(userId: string, blockedId: string): Promise<void> {
    try {
      const blocked = await this.getBlockedUsers(userId);
      if (!blocked.includes(blockedId)) {
        blocked.push(blockedId);
        await AsyncStorage.setItem(`${BLOCKED_USERS_KEY}_${userId}`, JSON.stringify(blocked));
      }
      
      // Arkadaşlıktan da çıkar
      await this.removeFriend(userId, blockedId);
    } catch (error) {
      console.error('Kullanıcı engelleme hatası:', error);
      throw error;
    }
  }

  /**
   * Engellenmiş kullanıcıları getir
   */
  static async getBlockedUsers(userId: string): Promise<string[]> {
    try {
      const blocked = await AsyncStorage.getItem(`${BLOCKED_USERS_KEY}_${userId}`);
      return blocked ? JSON.parse(blocked) : [];
    } catch {
      return [];
    }
  }

  /**
   * Engeli kaldır
   */
  static async unblockUser(userId: string, blockedId: string): Promise<void> {
    try {
      const blocked = await this.getBlockedUsers(userId);
      const filtered = blocked.filter(id => id !== blockedId);
      await AsyncStorage.setItem(`${BLOCKED_USERS_KEY}_${userId}`, JSON.stringify(filtered));
    } catch (error) {
      console.error('Engel kaldırma hatası:', error);
      throw error;
    }
  }

  // ==================== YARDIMCI FONKSİYONLAR ====================

  /**
   * Boş haftalık aktivite dizisi (WeeklyActivityDay[] formatında)
   */
  static getEmptyWeeklyActivity(): any[] {
    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    return days.map(day => ({
      day,
      activityLevel: 0,
      lessonsCompleted: 0,
      quizzesCompleted: 0,
      minutesStudied: 0
    }));
  }

  /**
   * Arkadaş sayısını getir
   */
  static async getFriendCount(userId: string): Promise<number> {
    const friends = await this.getFriends(userId);
    return friends.length;
  }

  /**
   * Bekleyen istek sayısını getir
   */
  static async getPendingRequestCount(userId: string): Promise<number> {
    const requests = await this.getPendingRequests(userId);
    return requests.length;
  }

  /**
   * Online arkadaşları getir
   */
  static async getOnlineFriends(userId: string): Promise<Friend[]> {
    const friends = await this.getFriends(userId);
    // Son 5 dakika içinde aktif olanları "online" say
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return friends.filter(f => new Date(f.lastActiveDate) >= fiveMinutesAgo);
  }
}
