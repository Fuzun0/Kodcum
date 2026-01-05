// Düello Ekranı

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { KOLEKSIYONLAR } from '../config/firebaseCollections';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { DuelService, DUEL_QUESTION_COUNT, DUEL_TOTAL_TIME, DUEL_XP_WIN, QUESTION_POINTS, AktifDuello } from '../services/DuelService';
import { FriendService } from '../services/FriendService';
import { Duel, DuelQuestion, DuelResult } from '../types';
import { Confetti, SuccessCelebration } from '../components/Celebration';
import { lightHaptic, successHaptic, errorHaptic, mediumHaptic } from '../utils/haptics';

type RouteParams = {
  Duel: {
    opponentId?: string;
    opponentName?: string;
    duelId?: string;
    category?: string;
    duelRequestId?: string;
    questions?: DuelQuestion[]; // Firestore'dan gelen sorular
    aktivDuelloId?: string; // Aktif düello ID
  };
};

type GamePhase = 'category' | 'selectFriend' | 'waitingForOpponent' | 'waitingToStart' | 'playing' | 'result';

const CATEGORIES = [
  { id: 'html', name: 'HTML', icon: '🌐', image: require('../../assets/language-icons/html.png'), color: '#e34c26' },
  { id: 'css', name: 'CSS', icon: '🎨', image: require('../../assets/language-icons/css.png'), color: '#264de4' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', image: require('../../assets/language-icons/javascript.png'), color: '#f0db4f' },
  { id: 'python', name: 'Python', icon: '🐍', color: '#3776ab' },
  { id: 'kotlin', name: 'Kotlin', icon: '🤖', image: require('../../assets/language-icons/kotlin.png'), color: '#7f52ff' },
  { id: 'swift', name: 'Swift', icon: '🍎', image: require('../../assets/language-icons/swift.png'), color: '#fa7343' },
  { id: 'react', name: 'React', icon: '⚛️', color: '#61dafb' },
];

const WAITING_TIMEOUT = 30; // Rakip bekleme süresi (saniye)

const DuelScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'Duel'>>();
  const { theme } = useTheme();
  const { user } = useAuth();
  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  const { opponentId, opponentName, duelId, category: routeCategory, duelRequestId, questions: routeQuestions, aktivDuelloId: routeAktivDuelloId } = route.params || {};

  // Başlangıç phase'ini belirle
  const getInitialPhase = (): GamePhase => {
    if (routeAktivDuelloId) return 'waitingToStart'; // Düello kabul edildi
    if (duelId) return 'waitingForOpponent';
    if (routeCategory) return 'waitingForOpponent';
    return 'category';
  };

  const [phase, setPhase] = useState<GamePhase>(getInitialPhase());
  const [selectedCategory, setSelectedCategory] = useState<string>(routeCategory || '');
  const [friends, setFriends] = useState<any[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<any>(null);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [duel, setDuel] = useState<Duel | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DUEL_TOTAL_TIME);
  const [result, setResult] = useState<DuelResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<{ questionIndex: number; selectedAnswer: number; isCorrect: boolean; timeSpent: number }[]>([]);
  
  // Rakip bekleme state'leri
  const [waitingTimeLeft, setWaitingTimeLeft] = useState(WAITING_TIMEOUT);
  const [currentDuelRequestId, setCurrentDuelRequestId] = useState<string | null>(duelRequestId || null);
  
  // Aktif düello state'leri
  const [aktivDuello, setAktivDuello] = useState<AktifDuello | null>(null);
  const [aktivDuelloId, setAktivDuelloId] = useState<string | null>(routeAktivDuelloId || null);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waitingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const aktivDuelloUnsubRef = useRef<(() => void) | null>(null);
  const startTimeRef = useRef<number>(0);
  const progressAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('🎮 DuelScreen useEffect - params:', { 
      duelId, 
      routeAktivDuelloId, 
      routeCategory, 
      hasQuestions: !!routeQuestions?.length 
    });
    
    if (duelId) {
      loadExistingDuel();
    } else if (routeAktivDuelloId) {
      // Düello kabul edildi - aktif düelloya katıl ve hazır ol
      console.log('🎮 Aktif düelloya katılınıyor:', routeAktivDuelloId);
      joinAktivDuello(routeAktivDuelloId, routeQuestions || []);
    } else if (routeCategory && opponentId && routeQuestions) {
      // Eski yöntem fallback
      startDuelWithQuestions(routeCategory, opponentId, opponentName || 'Rakip', routeQuestions);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (waitingTimerRef.current) clearInterval(waitingTimerRef.current);
      if (unsubscribeRef.current) unsubscribeRef.current();
      if (aktivDuelloUnsubRef.current) aktivDuelloUnsubRef.current();
    };
  }, []);

  const loadExistingDuel = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const existingDuel = await DuelService.getDuel(user.id, duelId!);
      if (existingDuel) {
        setDuel(existingDuel);
        setSelectedCategory(existingDuel.category);
        if (existingDuel.status === 'in_progress') {
          setPhase('playing');
          startTimer();
        }
      }
    } catch (error) {
      Alert.alert('Hata', 'Düello yüklenemedi');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  // Kategori seçildiğinde arkadaş listesini yükle
  const handleCategorySelect = async (categoryId: string) => {
    if (!user) return;
    
    setSelectedCategory(categoryId);
    
    // Eğer opponentId varsa, o arkadaşı seçili olarak ayarla ve davet gönder
    if (opponentId) {
      // Arkadaşı seçili olarak ayarla
      const selectedOpponent = {
        odakId: opponentId,
        displayName: opponentName || 'Rakip',
        photoURL: undefined
      };
      setSelectedFriend(selectedOpponent);
      setLoading(true);
      
      try {
        // Düello daveti gönder (Firestore'a kaydet)
        const duelRequest = await DuelService.sendDuelRequest(
          user.id,
          user.displayName,
          user.photoURL,
          opponentId,
          opponentName || 'Rakip',
          undefined,
          categoryId
        );
        
        setCurrentDuelRequestId(duelRequest.id);
        setPhase('waitingForOpponent');
        setLoading(false);
        startWaitingTimer();
        listenForDuelAcceptance(duelRequest.id);
        
      } catch (error) {
        Alert.alert('Hata', 'Düello daveti gönderilemedi');
        setLoading(false);
      }
      return;
    }
    
    // Arkadaş listesini yükle ve arkadaş seçme ekranına geç
    setLoadingFriends(true);
    try {
      const friendsList = await FriendService.getFriends(user.id);
      setFriends(friendsList);
      setPhase('selectFriend');
    } catch (error) {
      Alert.alert('Hata', 'Arkadaş listesi yüklenemedi');
    } finally {
      setLoadingFriends(false);
    }
  };

  // Arkadaş seçildiğinde düello daveti gönder ve bekleme ekranına geç
  const handleFriendSelect = async (friend: any) => {
    if (!user) return;
    
    setSelectedFriend(friend);
    setLoading(true);
    
    try {
      // Düello daveti gönder (Firestore'a kaydet)
      const duelRequest = await DuelService.sendDuelRequest(
        user.id,
        user.displayName,
        user.photoURL,
        friend.odakId,
        friend.displayName,
        friend.photoURL,
        selectedCategory
      );
      
      setCurrentDuelRequestId(duelRequest.id);
      setPhase('waitingForOpponent');
      startWaitingTimer();
      listenForDuelAcceptance(duelRequest.id);
      
    } catch (error) {
      Alert.alert('Hata', 'Düello daveti gönderilemedi');
      setLoading(false);
    }
  };

  // Rakip bekleme zamanlayıcısı
  const startWaitingTimer = () => {
    setWaitingTimeLeft(WAITING_TIMEOUT);
    
    waitingTimerRef.current = setInterval(() => {
      setWaitingTimeLeft((prev) => {
        if (prev <= 1) {
          // Süre doldu - iptal
          handleWaitingTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Bekleme süresi doldu
  const handleWaitingTimeout = () => {
    if (waitingTimerRef.current) clearInterval(waitingTimerRef.current);
    if (unsubscribeRef.current) unsubscribeRef.current();
    
    Alert.alert(
      'Süre Doldu ⏱️',
      'Rakip 30 saniye içinde yanıt vermedi. Düello iptal edildi.',
      [{ text: 'Tamam', onPress: () => navigation.goBack() }]
    );
  };

  // Düello kabul edildiğini dinle (real-time) - Gönderen taraf
  const listenForDuelAcceptance = (requestId: string) => {
    if (!db || !user) return;
    
    console.log('👀 Düello kabulü dinleniyor:', requestId);
    
    const requestRef = doc(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI, requestId);
    
    unsubscribeRef.current = onSnapshot(requestRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('📬 Düello isteği güncellendi:', data.status, 'aktivDuelloId:', data.aktivDuelloId);
        console.log('📬 Düello isteğindeki soru sayısı:', data.questions?.length);
        
        if (data.status === 'accepted' && data.aktivDuelloId) {
          // Rakip kabul etti!
          if (waitingTimerRef.current) clearInterval(waitingTimerRef.current);
          if (unsubscribeRef.current) unsubscribeRef.current();
          
          successHaptic();
          
          // Düello isteğindeki soruları al (bunlar her zaman mevcut olmalı)
          const requestQuestions = data.questions || [];
          console.log('📝 Düello isteğindeki sorular:', requestQuestions.length);
          
          // Aktif düelloyu Firestore'dan almaya çalış (birkaç deneme yap)
          let aktivDuelloData = null;
          for (let i = 0; i < 5; i++) {
            aktivDuelloData = await DuelService.getAktifDuello(data.aktivDuelloId);
            console.log(`📥 Aktif düello deneme ${i + 1}:`, aktivDuelloData?.id, 'Soru sayısı:', aktivDuelloData?.questions?.length);
            
            if (aktivDuelloData && aktivDuelloData.questions && aktivDuelloData.questions.length > 0) {
              break;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
          // Önce aktif düellodan, yoksa düello isteğinden soruları al
          const questions = aktivDuelloData?.questions?.length > 0 
            ? aktivDuelloData.questions 
            : requestQuestions;
          
          console.log('📝 Kullanılacak soru sayısı:', questions.length);
          
          if (questions.length === 0) {
            console.error('❌ Sorular bulunamadı!');
            Alert.alert('Hata', 'Düello soruları bulunamadı. Lütfen tekrar deneyin.');
            navigation.goBack();
            return;
          }
          
          // Duel objesini oluştur
          const newDuel: Duel = {
            id: data.aktivDuelloId,
            challengerId: user.id,
            challengerName: user.displayName,
            opponentId: selectedFriend?.odakId || data.receiverId,
            opponentName: selectedFriend?.displayName || data.receiverName || 'Rakip',
            category: aktivDuelloData?.category || selectedCategory,
            status: 'in_progress',
            questions: questions,
            createdAt: new Date().toISOString(),
            challengerAnswers: [],
            opponentAnswers: [],
            challengerScore: 0,
            opponentScore: 0,
            startedAt: new Date().toISOString(),
            completedAt: undefined,
            xpReward: DUEL_XP_WIN,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          };
          setDuel(newDuel);
          setAktivDuelloId(data.aktivDuelloId);
          setPhase('waitingToStart');
          
          // gameStartedRef'i sıfırla - yeni düello için
          gameStartedRef.current = false;
          
          // ÖNCE listener'ı başlat, SONRA playerReady çağır
          listenToAktivDuelloUpdates(data.aktivDuelloId);
          
          // Kısa bir gecikme ile playerReady çağır (listener'ın kurulmasını bekle)
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Kendimizi (gönderen taraf) hazır olarak işaretle
          await DuelService.playerReady(data.aktivDuelloId, user.id);
          console.log('✅ Player 1 (gönderen) hazır olarak işaretlendi');
          
        } else if (data.status === 'rejected') {
          // Rakip reddetti
          if (waitingTimerRef.current) clearInterval(waitingTimerRef.current);
          if (unsubscribeRef.current) unsubscribeRef.current();
          
          errorHaptic();
          Alert.alert(
            'Düello Reddedildi 😔',
            'Rakip düello davetini reddetti.',
            [{ text: 'Tamam', onPress: () => navigation.goBack() }]
          );
        }
      }
    }, (error) => {
      console.error('Düello dinleme hatası:', error);
    });
  };

  // Düello davetini iptal et
  const cancelDuelRequest = async () => {
    if (waitingTimerRef.current) clearInterval(waitingTimerRef.current);
    if (unsubscribeRef.current) unsubscribeRef.current();
    
    if (currentDuelRequestId && db) {
      try {
        await updateDoc(doc(db, KOLEKSIYONLAR.DUELLO_ISTEKLERI, currentDuelRequestId), {
          status: 'cancelled'
        });
      } catch (err) {
        console.log('Düello iptal hatası:', err);
      }
    }
    
    navigation.goBack();
  };

  // Direkt düello başlat (davet kabul edildiğinde - önceden oluşturulmuş sorularla)
  const startDuelWithQuestions = async (categoryId: string, oppId: string, oppName: string, questions?: any[]) => {
    if (!user) return;
    
    setLoading(true);

    try {
      const newDuel = await DuelService.createDuelWithQuestions(
        user.id,
        user.displayName,
        user.photoURL,
        oppId,
        oppName,
        undefined,
        categoryId,
        questions // Önceden oluşturulmuş sorular
      );
      setDuel(newDuel);
      setPhase('playing');
      startTimer();
    } catch (error) {
      Alert.alert('Hata', 'Düello oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

  // Aktif düelloya katıl (kabul eden taraf)
  const joinAktivDuello = async (duelloId: string, questionsFromRoute: DuelQuestion[]) => {
    if (!user) return;
    
    setLoading(true);
    setAktivDuelloId(duelloId);
    setPhase('waitingToStart');
    
    // gameStartedRef'i sıfırla - yeni düello için
    gameStartedRef.current = false;
    
    try {
      // Önce aktif düelloyu Firestore'dan al (sorular burada)
      let aktivDuelloData = await DuelService.getAktifDuello(duelloId);
      console.log('📥 Aktif düello alındı:', aktivDuelloData?.id, 'Soru sayısı:', aktivDuelloData?.questions?.length);
      
      // Eğer aktif düello bulunamadıysa, biraz bekleyip tekrar dene
      if (!aktivDuelloData) {
        console.log('⏳ Aktif düello henüz oluşturulmamış, bekleniyor...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        aktivDuelloData = await DuelService.getAktifDuello(duelloId);
        console.log('📥 Tekrar denendi:', aktivDuelloData?.id);
      }
      
      // Soruları al - önce Firestore'dan, yoksa route'dan, yoksa yeni oluştur
      let questions = aktivDuelloData?.questions || questionsFromRoute || [];
      
      // Hala sorular yoksa, kategoriden yeni sorular oluştur
      if (questions.length === 0 && (aktivDuelloData?.category || routeCategory)) {
        console.log('⚠️ Sorular bulunamadı, yeni sorular oluşturuluyor...');
        try {
          questions = await DuelService.generateQuestions(aktivDuelloData?.category || routeCategory || '');
          console.log('✅ Yeni sorular oluşturuldu:', questions.length);
        } catch (genError) {
          console.error('Soru oluşturma hatası:', genError);
        }
      }
      
      if (questions.length === 0) {
        console.error('❌ Sorular bulunamadı ve oluşturulamadı!');
        Alert.alert('Hata', 'Düello soruları bulunamadı. Lütfen tekrar deneyin.');
        navigation.goBack();
        return;
      }
      
      // Duel objesini oluştur
      const newDuel: Duel = {
        id: duelloId,
        challengerId: aktivDuelloData?.player1Id || opponentId || '',
        challengerName: aktivDuelloData?.player1Name || opponentName || 'Rakip',
        opponentId: user.id,
        opponentName: user.displayName,
        category: aktivDuelloData?.category || routeCategory || '',
        status: 'in_progress',
        questions: questions,
        createdAt: new Date().toISOString(),
        challengerAnswers: [],
        opponentAnswers: [],
        challengerScore: 0,
        opponentScore: 0,
        startedAt: new Date().toISOString(),
        completedAt: undefined,
        xpReward: DUEL_XP_WIN,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      setDuel(newDuel);
      setSelectedCategory(aktivDuelloData?.category || routeCategory || '');
      
      // ÖNCE listener'ı başlat, SONRA playerReady çağır
      // Bu sayede status değişikliğini kaçırmayız
      listenToAktivDuelloUpdates(duelloId);
      
      // Kısa bir gecikme ile playerReady çağır (listener'ın kurulmasını bekle)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Kendimizi hazır olarak işaretle
      await DuelService.playerReady(duelloId, user.id);
      console.log('✅ Player 2 hazır olarak işaretlendi');
      
    } catch (error) {
      console.error('Aktif düelloya katılma hatası:', error);
      Alert.alert('Hata', 'Düelloya katılınamadı');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  // Oyun başlatıldı mı kontrolü için ref
  const gameStartedRef = useRef(false);

  // Aktif düello değişikliklerini dinle
  const listenToAktivDuelloUpdates = (duelloId: string) => {
    if (!user) return;
    
    console.log('👀 Aktif düello dinleniyor:', duelloId, 'gameStartedRef:', gameStartedRef.current);
    
    // Önceki listener'ı temizle
    if (aktivDuelloUnsubRef.current) {
      aktivDuelloUnsubRef.current();
    }
    
    aktivDuelloUnsubRef.current = DuelService.listenToAktifDuello(duelloId, (aktivDuelloData) => {
      if (!aktivDuelloData) {
        console.log('❌ Aktif düello bulunamadı');
        return;
      }
      
      console.log('📬 Aktif düello güncellendi:', {
        player1Ready: aktivDuelloData.player1Ready,
        player2Ready: aktivDuelloData.player2Ready,
        status: aktivDuelloData.status,
        player1Score: aktivDuelloData.player1Score,
        player2Score: aktivDuelloData.player2Score,
        gameStarted: gameStartedRef.current,
        questionCount: aktivDuelloData.questions?.length
      });
      
      setAktivDuello(aktivDuelloData);
      
      // Rakip skorunu güncelle
      const isPlayer1 = aktivDuelloData.player1Id === user.id;
      const enemyScore = isPlayer1 ? aktivDuelloData.player2Score : aktivDuelloData.player1Score;
      setOpponentScore(enemyScore);
      
      // Her iki oyuncu da hazır ise oyunu başlat
      // Status kontrolünü 'playing' VEYA (her iki ready true) olarak genişlet
      const bothReady = aktivDuelloData.player1Ready && aktivDuelloData.player2Ready;
      const shouldStart = bothReady && (aktivDuelloData.status === 'playing' || aktivDuelloData.status === 'waiting');
      
      if (shouldStart && !gameStartedRef.current) {
        console.log('🚀 Her iki oyuncu hazır - Düello başlıyor!');
        console.log('📝 Sorular:', aktivDuelloData.questions?.length);
        gameStartedRef.current = true;
        successHaptic();
        
        // Her zaman aktivDuelloData'dan duel objesi oluştur (closure problemi önlenir)
        const newDuel: Duel = {
          id: duelloId,
          challengerId: aktivDuelloData.player1Id,
          challengerName: aktivDuelloData.player1Name,
          opponentId: aktivDuelloData.player2Id,
          opponentName: aktivDuelloData.player2Name,
          category: aktivDuelloData.category,
          status: 'in_progress',
          questions: aktivDuelloData.questions || [],
          createdAt: aktivDuelloData.createdAt,
          challengerAnswers: [],
          opponentAnswers: [],
          challengerScore: 0,
          opponentScore: 0,
          startedAt: new Date().toISOString(),
          completedAt: undefined,
          xpReward: DUEL_XP_WIN,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        };
        
        console.log('📝 Duel objesi oluşturuldu, soru sayısı:', newDuel.questions.length);
        setDuel(newDuel);
        setSelectedCategory(aktivDuelloData.category);
        
        // State güncellemesi için bir sonraki tick'te phase'i değiştir
        setTimeout(() => {
          setPhase('playing');
          startTimer();
        }, 100);
      }
      
      // Rakip oyunu bitirdiyse veya status 'finished' ise sonucu güncelle
      const opponentFinished = isPlayer1 ? aktivDuelloData.player2Finished : aktivDuelloData.player1Finished;
      const myFinished = isPlayer1 ? aktivDuelloData.player1Finished : aktivDuelloData.player2Finished;
      
      // Her iki oyuncu da bitti - anında sonuç ekranına geç
      if (aktivDuelloData.status === 'finished' && opponentFinished && myFinished) {
        console.log('🏁 Her iki oyuncu da bitti - Sonuç ekranı gösteriliyor');
        
        // Eğer henüz sonuç ekranında değilsek, anında geç
        if (phase !== 'result') {
          const myScore = isPlayer1 ? aktivDuelloData.player1Score : aktivDuelloData.player2Score;
          const finalEnemyScore = isPlayer1 ? aktivDuelloData.player2Score : aktivDuelloData.player1Score;
          const isWinner = myScore > finalEnemyScore;
          const isDraw = myScore === finalEnemyScore;
          
          setGameEnded(true);
          stopTimer();
          setScore(myScore);
          setOpponentScore(finalEnemyScore);
          
          setResult({
            odakId: aktivDuelloData.id,
            challengerId: aktivDuelloData.player1Id,
            opponentId: aktivDuelloData.player2Id,
            challengerScore: aktivDuelloData.player1Score,
            opponentScore: aktivDuelloData.player2Score,
            winnerId: isDraw ? null : (isWinner ? user?.id : (isPlayer1 ? aktivDuelloData.player2Id : aktivDuelloData.player1Id)),
            isWinner: isWinner,
            isDraw: isDraw,
            yourScore: myScore,
            xpEarned: isWinner ? DUEL_XP_WIN : (isDraw ? 15 : 10),
            category: aktivDuelloData.category,
            completedAt: new Date().toISOString(),
          });
          setPhase('result');
          setLoading(false);
        }
      } else if (opponentFinished) {
        // Sadece rakip bitti - skorunu güncelle
        console.log('🏁 Rakip oyunu bitirdi, skor:', enemyScore);
        
        // Sonuç ekranındaki rakip skorunu güncelle
        setResult(prev => {
          if (!prev) return prev;
          
          // Kazananı yeniden hesapla
          const myScore = prev.yourScore;
          const isWinner = myScore > enemyScore;
          const isDraw = myScore === enemyScore;
          
          return { 
            ...prev, 
            opponentScore: enemyScore,
            isWinner: isWinner,
            isDraw: isDraw,
            winnerId: isDraw ? null : (isWinner ? user?.id : (isPlayer1 ? aktivDuelloData.player2Id : aktivDuelloData.player1Id)),
            xpEarned: isWinner ? DUEL_XP_WIN : (isDraw ? 15 : 10)
          };
        });
      }
    });
  };

  // Düello başlat (yeni sorularla - eski yöntem)
  const startDuelWithOpponent = async (categoryId: string, oppId: string, oppName: string) => {
    if (!user) return;
    
    setLoading(true);

    try {
      const newDuel = await DuelService.createDuel(
        user.id,
        user.displayName,
        user.photoURL,
        oppId,
        oppName,
        undefined,
        categoryId
      );
      setDuel(newDuel);
      setPhase('playing');
      startTimer();
    } catch (error) {
      Alert.alert('Hata', 'Düello oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    startTimeRef.current = Date.now();
    setTimeLeft(DUEL_TOTAL_TIME);
    progressAnim.setValue(1);

    Animated.timing(progressAnim, {
      toValue: 0,
      duration: DUEL_TOTAL_TIME * 1000,
      useNativeDriver: false,
    }).start();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    progressAnim.stopAnimation();
  };

  const handleTimeUp = () => {
    if (gameEnded) return; // Zaten bitti
    
    // Hemen gameEnded flag'ini ayarla - daha fazla soru gösterme
    setGameEnded(true);
    stopTimer();
    mediumHaptic();
    
    console.log('⏱️ Süre doldu! Düello bitiriliyor... Mevcut skor:', score, 'Duel:', duel?.id);
    
    // Süre doldu - düelloyu anında bitir ve sonuç ekranına git
    // duel null olsa bile sonuç ekranına git
    forceFinishDuel(score);
  };

  // Süre dolduğunda zorla bitirme - duel null olsa bile çalışır
  const forceFinishDuel = (finalScore: number) => {
    if (!user) return;
    if (phase === 'result') return; // Zaten sonuç ekranındayız

    console.log('🏁 Zorla düello bitiriliyor, final skor:', finalScore);

    setGameEnded(true);
    stopTimer();
    setScore(finalScore);
    
    // Sonucu göster
    const isWinner = finalScore > opponentScore;
    const isDraw = finalScore === opponentScore;
    
    setResult({
      odakId: duel?.id || aktivDuelloId || 'unknown',
      challengerId: duel?.challengerId || user.id,
      opponentId: duel?.opponentId || opponentId || '',
      challengerScore: finalScore,
      opponentScore: opponentScore,
      winnerId: isDraw ? null : (isWinner ? user.id : (opponentId || duel?.opponentId || '')),
      isWinner: isWinner,
      isDraw: isDraw,
      yourScore: finalScore,
      xpEarned: isWinner ? DUEL_XP_WIN : (isDraw ? 15 : 10),
      category: selectedCategory,
      completedAt: new Date().toISOString(),
    });
    setPhase('result');

    // Arka planda Firestore'a kaydet
    if (aktivDuelloId) {
      DuelService.playerFinished(aktivDuelloId, user.id, finalScore)
        .then(() => console.log('✅ Süre doldu - skor kaydedildi:', finalScore))
        .catch(err => console.error('Skor kaydetme hatası:', err));
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || gameEnded) return; // Zaten cevaplandı veya oyun bitti
    
    setSelectedAnswer(answerIndex);
    // Timer'ı durdurmuyoruz - devam etmeli

    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    handleAnswerSubmit(answerIndex, timeSpent);
  };

  const handleAnswerSubmit = async (answerIndex: number, timeSpent: number = DUEL_TOTAL_TIME) => {
    if (!duel || gameEnded) return;

    const currentQuestion = duel.questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const questionPoints = QUESTION_POINTS[currentQuestionIndex] || 1;

    let newScore = score;
    if (isCorrect) {
      newScore = score + questionPoints;
      setScore(newScore);
      successHaptic();
      
      // Aktif düelloda skoru güncelle
      if (aktivDuelloId && user) {
        DuelService.updatePlayerScore(aktivDuelloId, user.id, newScore).catch(err => {
          console.error('Skor güncelleme hatası:', err);
        });
      }
    } else {
      errorHaptic();
      // Yanlış cevap animasyonu
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }

    setAnswers((prev) => [
      ...prev,
      { questionIndex: currentQuestionIndex, selectedAnswer: answerIndex, isCorrect, timeSpent },
    ]);

    // 0.8 saniye bekle, sonraki soruya geç (timer sıfırlanmadan)
    setTimeout(() => {
      if (gameEnded) return; // Timer sona erdiyse geç
      
      if (currentQuestionIndex < DUEL_QUESTION_COUNT - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        // Timer sıfırlanmıyor - devam ediyor
      } else {
        finishDuelWithScore(score + (isCorrect ? questionPoints : 0));
      }
    }, 800);
  };

  // Mevcut skoru parametre olarak alan finishDuel
  const finishDuelWithScore = async (finalScore: number) => {
    if (!duel || !user) return;
    if (gameEnded && phase === 'result') return; // Zaten sonuç ekranındayız

    setGameEnded(true);
    stopTimer();

    console.log('🏁 Düello bitiriliyor, final skor:', finalScore);

    // Sonucu göster - rakip skoru aktif düellodan alınacak
    const isWinner = finalScore > opponentScore;
    const isDraw = finalScore === opponentScore;
    
    // Score state'ini de güncelle
    setScore(finalScore);
    
    // ÖNCE sonuç ekranını göster (anında)
    setResult({
      odakId: duel.id,
      challengerId: duel.challengerId,
      opponentId: duel.opponentId,
      challengerScore: user.id === duel.challengerId ? finalScore : opponentScore,
      opponentScore: user.id === duel.challengerId ? opponentScore : finalScore,
      winnerId: isDraw ? null : (isWinner ? user.id : (opponentId || duel.opponentId)),
      isWinner: isWinner,
      isDraw: isDraw,
      yourScore: finalScore,
      xpEarned: isWinner ? DUEL_XP_WIN : (isDraw ? 15 : 10),
      category: selectedCategory,
      completedAt: new Date().toISOString(),
    });
    setPhase('result');

    // SONRA arka planda Firestore'a kaydet (async, bekleme yok)
    if (aktivDuelloId) {
      DuelService.playerFinished(aktivDuelloId, user.id, finalScore)
        .then(() => console.log('✅ Oyuncu düelloyu bitirdi, skor:', finalScore))
        .catch(err => console.error('Skor kaydetme hatası:', err));
    }
  };

  const renderCategorySelection = () => (
    <View style={styles.categoryContainer}>
      <Text style={styles.title}>Kategori Seçin</Text>
      <Text style={styles.subtitle}>
        Düello için bir kategori seçin
      </Text>
      <Text style={[styles.subtitle, { fontSize: 12, marginTop: 4, color: theme.colors.primary }]}>
        ✨ Sorular AI tarafından hazırlanmaktadır
      </Text>

      <View style={styles.categoriesGrid}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryCard, { borderColor: category.color }]}
            onPress={() => handleCategorySelect(category.id)}
            disabled={loading || loadingFriends}
          >
            {category.image ? (
              <Image source={category.image} style={styles.categoryImage} resizeMode="contain" />
            ) : (
              <Text style={styles.categoryIcon}>{category.icon}</Text>
            )}
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {(loading || loadingFriends) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>
            {loadingFriends ? 'Arkadaşlar yükleniyor...' : 'Sorular hazırlanıyor...'}
          </Text>
        </View>
      )}
    </View>
  );

  const renderFriendSelection = () => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity 
        style={styles.friendSelectionBackButton}
        onPress={() => setPhase('category')}
      >
        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        <Text style={styles.backButtonText}>Kategori Seç</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Rakip Seçin</Text>
      <Text style={styles.subtitle}>
        {CATEGORIES.find(c => c.id === selectedCategory)?.icon} {CATEGORIES.find(c => c.id === selectedCategory)?.name} kategorisinde düello
      </Text>

      <ScrollView style={styles.friendsList}>
        {friends.length === 0 ? (
          <View style={styles.emptyFriends}>
            <Ionicons name="people-outline" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyText}>Henüz arkadaşınız yok</Text>
            <Text style={styles.emptySubtext}>Sosyal sekmesinden arkadaş ekleyin</Text>
          </View>
        ) : (
          friends.map((friend) => (
            <TouchableOpacity
              key={friend.odakId}
              style={styles.friendCard}
              onPress={() => handleFriendSelect(friend)}
              disabled={loading}
            >
              <View style={styles.friendAvatar}>
                {friend.photoURL ? (
                  <Image source={{ uri: friend.photoURL }} style={styles.friendAvatarImage} />
                ) : (
                  <Ionicons name="person" size={28} color={theme.colors.textSecondary} />
                )}
              </View>
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{friend.displayName}</Text>
                <Text style={styles.friendUsername}>Seviye {friend.level} • 🔥 {friend.streak} gün</Text>
              </View>
              <Ionicons name="game-controller" size={24} color="#f97313" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#f97313" />
          <Text style={styles.loadingText}>Düello daveti gönderiliyor...</Text>
        </View>
      )}
    </View>
  );

  // Rakip bekleme ekranı
  const renderWaitingForOpponent = () => (
    <View style={styles.waitingContainer}>
      <View style={styles.waitingCard}>
        <View style={styles.waitingIconContainer}>
          <Ionicons name="game-controller" size={64} color="#f97313" />
          <ActivityIndicator 
            size="large" 
            color="#f97313" 
            style={styles.waitingSpinner}
          />
        </View>
        
        <Text style={styles.waitingTitle}>Rakip Bekleniyor...</Text>
        <Text style={styles.waitingSubtitle}>
          {selectedFriend?.displayName || 'Rakip'} düello davetinizi değerlendiriyor
        </Text>
        
        {/* Kategori bilgisi */}
        <View style={styles.waitingCategoryBadge}>
          <Text style={styles.waitingCategoryText}>
            {CATEGORIES.find(c => c.id === selectedCategory)?.icon} {CATEGORIES.find(c => c.id === selectedCategory)?.name}
          </Text>
        </View>
        
        {/* Geri sayım */}
        <View style={styles.waitingTimerContainer}>
          <Ionicons 
            name="time-outline" 
            size={24} 
            color={waitingTimeLeft <= 10 ? '#ef4444' : theme.colors.textSecondary} 
          />
          <Text style={[
            styles.waitingTimerText,
            waitingTimeLeft <= 10 && styles.waitingTimerDanger
          ]}>
            {waitingTimeLeft} saniye
          </Text>
        </View>
        
        {/* Progress bar */}
        <View style={styles.waitingProgressBar}>
          <View 
            style={[
              styles.waitingProgressFill, 
              { width: `${(waitingTimeLeft / WAITING_TIMEOUT) * 100}%` }
            ]} 
          />
        </View>
        
        {/* İptal butonu */}
        <TouchableOpacity 
          style={styles.cancelWaitingButton}
          onPress={cancelDuelRequest}
        >
          <Ionicons name="close-circle" size={20} color="#ef4444" />
          <Text style={styles.cancelWaitingText}>Düelloyu İptal Et</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Oyun başlamadan önce bekleme ekranı (her iki oyuncu da hazır olana kadar)
  const renderWaitingToStart = () => {
    // Oyuncu isimlerini belirle
    const player1Name = aktivDuello?.player1Name || duel?.challengerName || 'Oyuncu 1';
    const player2Name = aktivDuello?.player2Name || duel?.opponentName || 'Oyuncu 2';
    const player1Ready = aktivDuello?.player1Ready || false;
    const player2Ready = aktivDuello?.player2Ready || false;
    
    return (
      <View style={styles.waitingContainer}>
        <View style={styles.waitingCard}>
          <View style={styles.waitingIconContainer}>
            <Ionicons name="flash" size={64} color="#10b981" />
            <ActivityIndicator 
              size="large" 
              color="#10b981" 
              style={styles.waitingSpinner}
            />
          </View>
          
          <Text style={styles.waitingTitle}>Düello Başlıyor! 🎮</Text>
          <Text style={styles.waitingSubtitle}>
            Her iki oyuncu da hazır olunca başlayacak...
          </Text>
          
          {/* Oyuncu durumları */}
          <View style={styles.playersReadyContainer}>
            {/* Player 1 */}
            <View style={styles.playerReadyItem}>
              <View style={[
                styles.playerReadyIcon,
                player1Ready && styles.playerReadyIconActive
              ]}>
                {player1Ready ? (
                  <Ionicons name="checkmark-circle" size={32} color="#10b981" />
                ) : (
                  <ActivityIndicator size="small" color={theme.colors.textSecondary} />
                )}
              </View>
              <Text style={styles.playerReadyName} numberOfLines={1}>
                {player1Name}
              </Text>
              <Text style={[
                styles.playerReadyStatus,
                player1Ready && styles.playerReadyStatusActive
              ]}>
                {player1Ready ? 'Hazır!' : 'Bekleniyor...'}
              </Text>
            </View>
            
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
            </View>
            
            {/* Player 2 */}
            <View style={styles.playerReadyItem}>
              <View style={[
                styles.playerReadyIcon,
                player2Ready && styles.playerReadyIconActive
              ]}>
                {player2Ready ? (
                  <Ionicons name="checkmark-circle" size={32} color="#10b981" />
                ) : (
                  <ActivityIndicator size="small" color={theme.colors.textSecondary} />
                )}
              </View>
              <Text style={styles.playerReadyName} numberOfLines={1}>
                {player2Name}
              </Text>
              <Text style={[
                styles.playerReadyStatus,
                player2Ready && styles.playerReadyStatusActive
              ]}>
                {player2Ready ? 'Hazır!' : 'Bekleniyor...'}
              </Text>
            </View>
          </View>
          
          {/* Kategori bilgisi */}
          <View style={[styles.waitingCategoryBadge, { marginTop: 20 }]}>
            <Text style={styles.waitingCategoryText}>
              {CATEGORIES.find(c => c.id === selectedCategory)?.icon} {CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderQuestion = () => {
    if (!duel || !duel.questions || duel.questions.length === 0) {
      console.log('⚠️ renderQuestion: duel veya questions yok');
      return null;
    }

    const question = duel.questions[currentQuestionIndex];
    
    if (!question) {
      console.log('⚠️ renderQuestion: soru bulunamadı, index:', currentQuestionIndex);
      return null;
    }
    
    const currentQuestionPoints = QUESTION_POINTS[currentQuestionIndex] || 1;
    const maxScore = QUESTION_POINTS.reduce((a, b) => a + b, 0); // 15
    const progressWidth = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <Animated.View 
        style={[
          styles.questionContainer, 
          { transform: [{ translateX: shakeAnim }] }
        ]}
      >
        {/* Header */}
        <View style={styles.gameHeader}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Sen</Text>
            <Text style={styles.scoreValue}>{score}/{maxScore}</Text>
          </View>
          
          <View style={styles.questionNumber}>
            <Text style={styles.questionNumberText}>
              Soru {currentQuestionIndex + 1} • {currentQuestionPoints}p
            </Text>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Rakip</Text>
            <Text style={[styles.scoreValue, { color: '#f97313' }]}>{opponentScore}/{maxScore}</Text>
          </View>
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <View style={styles.timerBox}>
            <Ionicons name="time-outline" size={20} color={timeLeft <= 5 ? '#ef4444' : theme.colors.text} />
            <Text style={[styles.timerText, timeLeft <= 5 && styles.timerDanger]}>
              {timeLeft}s
            </Text>
          </View>
        </View>

        {/* Timer Progress Bar */}
        <View style={styles.timerBar}>
          <Animated.View 
            style={[
              styles.timerProgress, 
              { 
                width: progressWidth,
                backgroundColor: timeLeft <= 5 ? '#ef4444' : theme.colors.primary 
              }
            ]} 
          />
        </View>

        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            let isCorrect = selectedAnswer !== null && index === question.correctAnswer;
            let isWrong = selectedAnswer !== null && index === selectedAnswer && selectedAnswer !== question.correctAnswer;
            let isSelected = index === selectedAnswer;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isCorrect && styles.optionCorrect,
                  isWrong && styles.optionWrong,
                  isSelected && !isCorrect && !isWrong && styles.optionSelected
                ]}
                onPress={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.optionLetter}>
                  {String.fromCharCode(65 + index)}
                </Text>
                <Text style={[styles.optionText, (isCorrect || isWrong) && styles.optionTextSelected]}>
                  {option}
                </Text>
                {isCorrect && (
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                )}
                {isWrong && (
                  <Ionicons name="close-circle" size={24} color="#ef4444" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    );
  };

  // Haptic feedback çalıştırıldı mı kontrolü
  const resultHapticPlayedRef = useRef(false);

  const renderResult = () => {
    if (!result) return null;

    // Kendi skorumuz - result'tan al (state güncellemesi async olabileceği için)
    const myScore = result.yourScore;

    // Rakip skoru - aktif düellodan veya result'tan al
    const displayOpponentScore = aktivDuello 
      ? (aktivDuello.player1Id === user?.id ? aktivDuello.player2Score : aktivDuello.player1Score)
      : opponentScore || result.opponentScore;
    
    // Rakip bitirdi mi?
    const opponentFinished = aktivDuello 
      ? (aktivDuello.player1Id === user?.id ? aktivDuello.player2Finished : aktivDuello.player1Finished)
      : true;
    
    // Kazanan kontrolü - son skorlara göre
    const isWinner = myScore > displayOpponentScore;
    const isDraw = myScore === displayOpponentScore;

    // Kazandıysa kutlama haptic (sadece bir kez ve rakip de bitirdiyse)
    if (opponentFinished && !resultHapticPlayedRef.current) {
      resultHapticPlayedRef.current = true;
      if (isWinner) {
        successHaptic();
      } else if (!isDraw) {
        errorHaptic();
      }
    }

    return (
      <View style={styles.resultContainer}>
        {/* Kazanınca confetti */}
        {isWinner && opponentFinished && <Confetti visible={true} pieceCount={50} />}
        
        <View style={styles.resultCard}>
          <View style={[styles.resultIconContainer, { 
            backgroundColor: !opponentFinished ? '#6b7280' : (isWinner ? '#10b981' : isDraw ? '#f97316' : '#ef4444')
          }]}>
            {!opponentFinished ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Ionicons 
                name={isWinner ? 'trophy' : isDraw ? 'ribbon' : 'sad'} 
                size={64} 
                color="#fff" 
              />
            )}
          </View>

          <Text style={styles.resultTitle}>
            {!opponentFinished ? '⏳ Rakip Bekleniyor...' : (isWinner ? '🎉 Tebrikler!' : isDraw ? '🤝 Beraberlik!' : '😔 Kaybettiniz')}
          </Text>
          <Text style={styles.resultSubtitle}>
            {!opponentFinished ? 'Rakibin tamamlaması bekleniyor' : (isWinner ? 'Düelloyu kazandınız!' : isDraw ? 'Skorlar eşit!' : 'Bir dahaki sefere!')}
          </Text>

          {/* Scores */}
          <View style={styles.resultScores}>
            <View style={styles.resultScoreBox}>
              <Text style={styles.resultScoreLabel}>Siz</Text>
              <Text style={[styles.resultScoreValue, opponentFinished && isWinner && styles.resultScoreWinner]}>
                {myScore}
              </Text>
            </View>
            <Text style={styles.resultVs}>VS</Text>
            <View style={styles.resultScoreBox}>
              <Text style={styles.resultScoreLabel}>{opponentName || 'Rakip'}</Text>
              {!opponentFinished ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ActivityIndicator size="small" color={theme.colors.primary} style={{ marginRight: 8 }} />
                  <Text style={[styles.resultScoreValue, { fontSize: 18 }]}>
                    {displayOpponentScore}
                  </Text>
                </View>
              ) : (
                <Text style={[styles.resultScoreValue, opponentFinished && !isWinner && !isDraw && styles.resultScoreWinner]}>
                  {displayOpponentScore}
                </Text>
              )}
            </View>
          </View>

          {/* XP kazanıldı */}
          <View style={styles.xpEarned}>
            <Text style={styles.xpEarnedText}>
              +{isWinner ? DUEL_XP_WIN : (isDraw ? 15 : 10)} XP
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.resultActions}>
            <TouchableOpacity 
              style={styles.resultButtonPrimary}
              onPress={() => {
                // Tüm state'leri sıfırla
                setPhase('category');
                setCurrentQuestionIndex(0);
                setScore(0);
                setAnswers([]);
                setSelectedAnswer(null);
                setResult(null);
                setDuel(null);
                setAktivDuello(null);
                setAktivDuelloId(null);
                setOpponentScore(0);
                setGameEnded(false);
                setTimeLeft(DUEL_TOTAL_TIME);
                progressAnim.setValue(1);
                gameStartedRef.current = false;
                resultHapticPlayedRef.current = false;
                if (aktivDuelloUnsubRef.current) {
                  aktivDuelloUnsubRef.current();
                  aktivDuelloUnsubRef.current = null;
                }
              }}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.resultButtonText}>Tekrar Oyna</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.resultButtonSecondary}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.resultButtonTextSecondary}>Çık</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {
            if (phase === 'playing') {
              Alert.alert(
                'Düellodan Çık',
                'Düellodan çıkmak istediğinize emin misiniz? Bu mağlubiyet olarak sayılacak.',
                [
                  { text: 'İptal', style: 'cancel' },
                  { 
                    text: 'Çık', 
                    style: 'destructive',
                    onPress: () => navigation.goBack()
                  }
                ]
              );
            } else {
              navigation.goBack();
            }
          }} 
          style={styles.backButton}
        >
          <Ionicons name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {phase === 'category' ? 'Düello' : 
           phase === 'selectFriend' ? 'Rakip Seç' :
           phase === 'playing' ? selectedCategory.toUpperCase() : 
           'Sonuç'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {phase === 'category' && renderCategorySelection()}
        {phase === 'selectFriend' && renderFriendSelection()}
        {phase === 'waitingForOpponent' && renderWaitingForOpponent()}
        {phase === 'waitingToStart' && renderWaitingToStart()}
        {phase === 'playing' && renderQuestion()}
        {phase === 'result' && renderResult()}
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    // Category Selection
    categoryContainer: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 32,
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 16,
    },
    categoryCard: {
      width: '45%',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      borderWidth: 2,
    },
    categoryIcon: {
      fontSize: 40,
    },
    categoryImage: {
      width: 50,
      height: 50,
    },
    categoryName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginTop: 12,
    },
    // Friend Selection
    friendSelectionBackButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 8,
    },
    backButtonText: {
      fontSize: 16,
      color: colors.text,
    },
    friendsList: {
      flex: 1,
    },
    friendCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    friendAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      overflow: 'hidden',
    },
    friendAvatarImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    friendInfo: {
      flex: 1,
    },
    friendName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    friendUsername: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    emptyFriends: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textSecondary,
      marginTop: 16,
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 8,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      color: '#fff',
      fontSize: 16,
      marginTop: 16,
    },
    // Waiting for Opponent
    waitingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    waitingCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 32,
      alignItems: 'center',
      width: '100%',
      maxWidth: 360,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    waitingIconContainer: {
      position: 'relative',
      marginBottom: 24,
    },
    waitingSpinner: {
      position: 'absolute',
      top: -10,
      left: -10,
      right: -10,
      bottom: -10,
    },
    waitingTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    waitingSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 20,
    },
    waitingCategoryBadge: {
      backgroundColor: '#f9731320',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      marginBottom: 24,
    },
    waitingCategoryText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#f97313',
    },
    waitingTimerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    waitingTimerText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    waitingTimerDanger: {
      color: '#ef4444',
    },
    waitingProgressBar: {
      width: '100%',
      height: 6,
      backgroundColor: colors.border,
      borderRadius: 3,
      overflow: 'hidden',
      marginBottom: 24,
    },
    waitingProgressFill: {
      height: '100%',
      backgroundColor: '#f97313',
      borderRadius: 3,
    },
    cancelWaitingButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    cancelWaitingText: {
      fontSize: 16,
      color: '#ef4444',
      fontWeight: '600',
    },
    // Players Ready (waitingToStart)
    playersReadyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
      gap: 16,
    },
    playerReadyItem: {
      alignItems: 'center',
      gap: 8,
    },
    playerReadyIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    },
    playerReadyIconActive: {
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    playerReadyName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      maxWidth: 80,
      textAlign: 'center',
    },
    playerReadyStatus: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    playerReadyStatusActive: {
      color: '#10b981',
      fontWeight: '600',
    },
    vsContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#f97313',
      alignItems: 'center',
      justifyContent: 'center',
    },
    vsText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
    },
    // Question
    questionContainer: {
      flex: 1,
      padding: 16,
    },
    gameHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    scoreBox: {
      alignItems: 'center',
    },
    scoreLabel: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    scoreValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
    },
    questionNumber: {
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    questionNumberText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    timerBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    timerContainer: {
      alignItems: 'center',
      marginBottom: 8,
    },
    timerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    timerDanger: {
      color: '#ef4444',
    },
    timerBar: {
      height: 6,
      backgroundColor: colors.border,
      borderRadius: 3,
      marginBottom: 20,
      overflow: 'hidden',
    },
    timerProgress: {
      height: '100%',
      borderRadius: 3,
    },
    questionCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      marginBottom: 20,
    },
    questionText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      lineHeight: 28,
    },
    optionsContainer: {
      gap: 12,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    optionSelected: {
      borderColor: colors.primary,
    },
    optionCorrect: {
      backgroundColor: '#10b981',
      borderColor: '#10b981',
    },
    optionWrong: {
      backgroundColor: '#ef4444',
      borderColor: '#ef4444',
    },
    optionLetter: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.background,
      textAlign: 'center',
      lineHeight: 32,
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
      marginRight: 12,
    },
    optionText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    optionTextSelected: {
      color: '#fff',
    },
    // Result
    resultContainer: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    resultCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 32,
      alignItems: 'center',
    },
    resultIconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    resultTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    resultSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 8,
    },
    resultScores: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 32,
      marginBottom: 24,
    },
    resultScoreBox: {
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    resultScoreLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    resultScoreValue: {
      fontSize: 48,
      fontWeight: 'bold',
      color: colors.text,
    },
    resultScoreWinner: {
      color: '#10b981',
    },
    resultVs: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.textSecondary,
    },
    xpEarned: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 20,
    },
    xpEarnedText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fbbf24',
    },
    resultActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 32,
    },
    resultButtonPrimary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 12,
    },
    resultButtonSecondary: {
      backgroundColor: colors.background,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 12,
    },
    resultButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    resultButtonTextSecondary: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 16,
    },
  });

export default DuelScreen;
