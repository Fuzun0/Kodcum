// Uygulama İçi Bildirim Context - Anlık düello/mesaj bildirimleri

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, getDocs, limit, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { DuelService } from '../services/DuelService';
import { FriendService } from '../services/FriendService';

const { width } = Dimensions.get('window');

// Navigation ref - dışarıdan set edilecek
let navigationRef: any = null;

export const setNotificationNavigationRef = (ref: any) => {
  navigationRef = ref;
};

// Bildirim tipi
interface InAppNotification {
  id: string;
  type: 'duel_request' | 'duel_accepted' | 'message' | 'friend_request' | 'achievement';
  title: string;
  message: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  data?: any;
  onAccept?: () => void;
  onReject?: () => void;
  onPress?: () => void;
}

interface NotificationContextType {
  showNotification: (notification: Omit<InAppNotification, 'id'>) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useInAppNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useInAppNotification must be used within NotificationProvider');
  }
  return context;
};

// Bildirim bileşeni
const NotificationBanner: React.FC<{
  notification: InAppNotification | null;
  onHide: () => void;
}> = ({ notification, onHide }) => {
  const translateY = useRef(new Animated.Value(-150)).current;
  const { theme } = useTheme();

  useEffect(() => {
    if (notification) {
      // Göster
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10
      }).start();

      // Kabul/Reddet butonları yoksa 2 saniye sonra gizle
      const hasActions = notification.onAccept || notification.onReject;
      if (!hasActions) {
        const timer = setTimeout(() => {
          hideAnimation();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [notification]);

  const hideAnimation = () => {
    Animated.timing(translateY, {
      toValue: -150,
      duration: 250,
      useNativeDriver: true
    }).start(() => {
      onHide();
    });
  };

  const handlePress = () => {
    if (notification?.onPress) {
      notification.onPress();
    }
    hideAnimation();
  };

  const handleAccept = () => {
    if (notification?.onAccept) {
      notification.onAccept();
    }
    hideAnimation();
  };

  const handleReject = () => {
    if (notification?.onReject) {
      notification.onReject();
    }
    hideAnimation();
  };

  if (!notification) return null;

  const hasActions = notification.onAccept || notification.onReject;

  return (
    <Animated.View 
      style={[
        styles.bannerContainer,
        { 
          transform: [{ translateY }],
          backgroundColor: theme.colors.card,
          borderColor: notification.color,
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.bannerContent}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={[styles.iconContainer, { backgroundColor: notification.color + '20' }]}>
          <Ionicons name={notification.icon} size={22} color={notification.color} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
            {notification.title}
          </Text>
          <Text style={[styles.message, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            {notification.message}
          </Text>
        </View>
        <TouchableOpacity onPress={hideAnimation} style={styles.closeButton}>
          <Ionicons name="close" size={18} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </TouchableOpacity>
      
      {/* Kabul / Reddet Butonları */}
      {hasActions && (
        <View style={styles.actionButtons}>
          {notification.onReject && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.rejectButton]}
              onPress={handleReject}
            >
              <Ionicons name="close" size={16} color="#fff" />
              <Text style={styles.actionButtonText}>Reddet</Text>
            </TouchableOpacity>
          )}
          {notification.onAccept && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.acceptButton]}
              onPress={handleAccept}
            >
              <Ionicons name="checkmark" size={16} color="#fff" />
              <Text style={styles.actionButtonText}>Kabul Et</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </Animated.View>
  );
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentNotification, setCurrentNotification] = useState<InAppNotification | null>(null);
  const notificationQueue = useRef<InAppNotification[]>([]);
  const { user } = useAuth();
  const lastDuelRequestIdRef = useRef<string | null>(null);
  const lastMessageIdRef = useRef<string | null>(null);
  const lastFriendRequestIdRef = useRef<string | null>(null);
  const initialLoadRef = useRef<{ duel: boolean; friend: boolean; message: boolean }>({
    duel: true,
    friend: true,
    message: true
  });

  const showNotification = useCallback((notification: Omit<InAppNotification, 'id'>) => {
    const newNotification: InAppNotification = {
      ...notification,
      id: Date.now().toString()
    };

    if (currentNotification) {
      // Kuyruk varsa ekle
      notificationQueue.current.push(newNotification);
    } else {
      setCurrentNotification(newNotification);
    }
  }, [currentNotification]);

  const hideNotification = useCallback(() => {
    setCurrentNotification(null);
    
    // Kuyrukta bekleyen varsa göster
    if (notificationQueue.current.length > 0) {
      const next = notificationQueue.current.shift();
      if (next) {
        setTimeout(() => setCurrentNotification(next), 300);
      }
    }
  }, []);

  // Düello isteklerini dinle - Composite index olmadan (sadece receiverId ile)
  useEffect(() => {
    if (!user?.id || !db) return;

    console.log('🔔 Düello istekleri dinleniyor...');

    const duelRequestsRef = collection(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI);
    // orderBy kaldırıldı - composite index hatası önleniyor
    const q = query(
      duelRequestsRef,
      where('receiverId', '==', user.id),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // İlk yüklemede mevcut bildirimleri atla
      if (initialLoadRef.current.duel) {
        initialLoadRef.current.duel = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          const requestId = change.doc.id;
          
          // Aynı bildirimi tekrar gösterme
          if (requestId !== lastDuelRequestIdRef.current) {
            lastDuelRequestIdRef.current = requestId;
            
            showNotification({
              type: 'duel_request',
              title: '🎮 Düello Daveti!',
              message: `${data.senderName} seni düelloya davet etti`,
              icon: 'game-controller',
              color: '#f97316',
              data: { requestId, ...data },
              onAccept: async () => {
                try {
                  // Aktif düello oluştur
                  const aktivDuello = await DuelService.createAktifDuello(
                    data.senderId,
                    data.senderName,
                    data.senderPhoto,
                    user.id,
                    user.displayName || 'Oyuncu',
                    user.photoURL,
                    data.category,
                    data.questions || []
                  );
                  
                  // Düello isteğini kabul edildi olarak güncelle
                  const { doc: firestoreDoc, updateDoc } = await import('firebase/firestore');
                  try {
                    await updateDoc(firestoreDoc(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI, requestId), {
                      status: 'accepted',
                      acceptedAt: new Date().toISOString(),
                      aktivDuelloId: aktivDuello.id
                    });
                  } catch (err) {
                    console.log('Düello güncelleme hatası:', err);
                  }
                  
                  // Düello ekranına git
                  if (navigationRef) {
                    navigationRef.navigate('Duel', {
                      aktivDuelloId: aktivDuello.id,
                      opponentId: data.senderId,
                      opponentName: data.senderName,
                      category: data.category,
                      questions: aktivDuello.questions
                    });
                  }
                } catch (error) {
                  console.error('Düello kabul hatası:', error);
                }
              },
              onReject: async () => {
                try {
                  await DuelService.rejectDuelRequest(requestId);
                } catch (error) {
                  console.error('Düello reddetme hatası:', error);
                }
              }
            });
          }
        }
      });
    }, (error) => {
      console.error('Düello dinleme hatası:', error);
    });

    return () => unsubscribe();
  }, [user?.id, showNotification]);

  // Mesajları dinle - Composite index olmadan
  useEffect(() => {
    if (!user?.id || !db) return;

    console.log('🔔 Mesajlar dinleniyor...');

    const conversationsRef = collection(db, KOLEKSIYONLAR.KONUSMALAR);
    // orderBy kaldırıldı - composite index hatası önleniyor
    const q = query(
      conversationsRef,
      where('participants', 'array-contains', user.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // İlk yüklemede mevcut bildirimleri atla
      if (initialLoadRef.current.message) {
        initialLoadRef.current.message = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const data = change.doc.data();
          const lastMessage = data.lastMessage;
          
          // Kendi mesajımız değilse ve yeni bir mesajsa bildir
          if (lastMessage && 
              lastMessage.senderId !== user.id && 
              lastMessage.id !== lastMessageIdRef.current) {
            lastMessageIdRef.current = lastMessage.id;
            
            const senderName = data.participantNames?.[lastMessage.senderId] || 'Birisi';
            const friendId = data.participants.find((p: string) => p !== user.id);
            const friendPhoto = data.participantPhotos?.[friendId];
            
            showNotification({
              type: 'message',
              title: `💬 ${senderName}`,
              message: lastMessage.content?.substring(0, 50) + (lastMessage.content?.length > 50 ? '...' : ''),
              icon: 'chatbubble',
              color: '#3b82f6',
              data: { conversationId: change.doc.id, ...data },
              onPress: () => {
                // Mesaj ekranına git
                if (navigationRef) {
                  navigationRef.navigate('Chat', {
                    friendId: friendId,
                    friendName: senderName,
                    friendPhoto: friendPhoto
                  });
                }
              }
            });
          }
        }
      });
    }, (error) => {
      console.error('Mesaj dinleme hatası:', error);
    });

    return () => unsubscribe();
  }, [user?.id, showNotification]);

  // Arkadaşlık isteklerini dinle - Composite index olmadan
  useEffect(() => {
    if (!user?.id || !db) return;

    console.log('🔔 Arkadaşlık istekleri dinleniyor...');

    const friendRequestsRef = collection(db, KOLEKSIYONLAR.ARKADASLIK_ISTEKLERI);
    // orderBy kaldırıldı - composite index hatası önleniyor
    const q = query(
      friendRequestsRef,
      where('receiverId', '==', user.id),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // İlk yüklemede mevcut bildirimleri atla
      if (initialLoadRef.current.friend) {
        initialLoadRef.current.friend = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          const requestId = change.doc.id;
          
          // Aynı bildirimi tekrar gösterme
          if (requestId !== lastFriendRequestIdRef.current) {
            lastFriendRequestIdRef.current = requestId;
            
            showNotification({
              type: 'friend_request',
              title: '👋 Arkadaşlık İsteği',
              message: `${data.senderName} arkadaş olmak istiyor`,
              icon: 'person-add',
              color: '#10b981',
              data: { requestId, ...data },
              onAccept: async () => {
                try {
                  await FriendService.acceptFriendRequest(user.id, requestId);
                  console.log('✅ Arkadaşlık kabul edildi:', requestId);
                } catch (error) {
                  console.error('Arkadaşlık kabul hatası:', error);
                }
              },
              onReject: async () => {
                try {
                  await FriendService.rejectFriendRequest(user.id, requestId);
                  console.log('❌ Arkadaşlık reddedildi:', requestId);
                } catch (error) {
                  console.error('Arkadaşlık reddetme hatası:', error);
                }
              }
            });
          }
        }
      });
    }, (error) => {
      console.error('Arkadaşlık isteği dinleme hatası:', error);
    });

    return () => unsubscribe();
  }, [user?.id, showNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <NotificationBanner 
        notification={currentNotification}
        onHide={hideNotification}
      />
    </NotificationContext.Provider>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    marginHorizontal: width * 0.075,
    alignSelf: 'center',
    maxWidth: 340,
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 99999,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  message: {
    fontSize: 13,
    marginTop: 2,
  },
  closeButton: {
    padding: 6,
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  acceptButton: {
    backgroundColor: '#10b981',
  },
  rejectButton: {
    backgroundColor: '#ef4444',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default NotificationProvider;
