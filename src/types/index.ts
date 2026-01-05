// Kullanıcı tipi
export interface User {
  id: string;
  username: string; // Benzersiz kullanıcı adı
  email: string;
  displayName: string;
  photoURL?: string;
  level: number;
  xp: number;
  badges: Badge[];
  completedLessons: string[];
  completedQuizzes: string[];
  streak: number;
  lastActiveDate: string;
  createdAt: string;
  preferredLanguage: 'tr' | 'en';
  dailyGoal?: number; // Günlük hedef (dakika cinsinden)
  weeklyGoalProgress?: number; // Haftalık ilerleme (dakika)
  totalStudyTime?: number; // Toplam çalışma süresi (dakika)
}

// Rozet tipi
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

// Ders kategorisi
export interface Category {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  image?: any; // Kategori görseli
  color: string;
  description: string;
  descriptionEn: string;
  lessonsCount: number;
  order: number;
}

// Ders tipi
export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  content: string;
  contentEn: string;
  codeExample: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  order: number;
  estimatedTime: number; // dakika
}

// Quiz tipi
export interface Quiz {
  id: string;
  lessonId: string;
  questions: QuizQuestion[];
}

// Quiz sorusu
export interface QuizQuestion {
  id: string;
  question: string;
  questionEn: string;
  options: string[];
  optionsEn: string[];
  correctAnswer: number;
  explanation: string;
  explanationEn: string;
  codeSnippet?: string;
}

// Kod çalıştırma sonucu
export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime?: number;
}

// AI asistan yanıtı
export interface AIResponse {
  message: string;
  suggestions?: string[];
  codeCorrection?: string;
  explanation?: string;
}

// İlerleme durumu
export interface Progress {
  lessonId: string;
  completed: boolean;
  quizScore?: number;
  quizCompletedAt?: string;
  completedAt?: string;
  timeSpent: number; // saniye
}

// Tema tipi
export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    error: string;
    warning: string;
    code: string;
    codeBackground: string;
  };
}

// Navigasyon parametreleri
export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  Login: undefined;
  Lesson: { lessonId: string; categoryId: string };
  LessonDetail: { lessonId: string; categoryId?: string };
  CodeEditor: { lessonId: string; initialCode?: string };
  Quiz: { lessonId: string; quizId: string };
  LessonQuiz: { lessonId: string };
  Project: { projectId: string };
  DailyChallenge: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Achievements: undefined;
  Friends: undefined;
  FriendProfile: { odakId: string };
  Chat: { friendId: string; friendName: string; friendPhoto?: string };
  Duel: { opponentId?: string; opponentName?: string; duelId?: string };
  AIAssistant: undefined; // AI Asistan ekranı
};

export type MainTabParamList = {
  Home: undefined;
  Categories: undefined;
  Social: undefined;
  Progress: undefined;
  Profile: undefined;
};

// ==================== ARKADAŞLIK SİSTEMİ ====================

// Arkadaşlık durumu
export type FriendshipStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

// Arkadaşlık isteği
export interface FriendRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  senderLevel: number;
  receiverId: string;
  toUserId?: string; // Real-time listener için (receiverId ile aynı)
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
}

// Arkadaş bilgisi
export interface Friend {
  id: string;
  odakId: string; // Karşı tarafın userId'si
  odakName: string;
  displayName: string;
  photoURL?: string;
  level: number;
  xp: number;
  streak: number;
  lastActiveDate: string;
  friendshipDate: string; // Arkadaş olma tarihi
  isOnline?: boolean;
}

// Arkadaş profil detayları (profil görüntülemede kullanılacak)
export interface FriendProfile {
  userId: string;
  username: string;
  displayName: string;
  photoURL?: string;
  level: number;
  xp: number;
  totalXP: number;
  streak: number;
  isOnline?: boolean;
  lastActiveDate: string;
  badges: Badge[];
  completedLessonsCount: number;
  completedQuizzesCount: number;
  averageQuizScore: number;
  weeklyActivity: WeeklyActivityDay[];
  memberSince: string;
  joinedAt: string;
  totalStudyTime?: number;
  quizStats: {
    totalQuizzes: number;
    correctAnswers: number;
    successRate: number;
  };
}

// Haftalık aktivite günlük
export interface WeeklyActivityDay {
  day: string;
  activityLevel: number; // 0-100
  lessonsCompleted: number;
  quizzesCompleted: number;
  minutesStudied: number;
}

// Haftalık aktivite
export interface WeeklyActivity {
  monday: number;    // dakika
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  totalMinutes: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
}

// ==================== MESAJLAŞMA SİSTEMİ ====================

// Mesaj tipi
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  type: 'text' | 'duel_invite' | 'duel_result' | 'achievement' | 'system';
  read: boolean;
  createdAt: string;
  updatedAt?: string;
  metadata?: MessageMetadata;
}

// Mesaj metadata (düello davetleri, başarımlar için)
export interface MessageMetadata {
  duelId?: string;
  duelStatus?: 'pending' | 'accepted' | 'declined' | 'completed';
  status?: 'pending' | 'accepted' | 'declined' | 'completed';
  duelCategory?: string;
  achievementId?: string;
  achievementName?: string;
  isWinner?: boolean;
  isDraw?: boolean;
  yourScore?: number;
  opponentScore?: number;
}

// Konuşma (sohbet)
export interface Conversation {
  id: string;
  participants: string[]; // userId'ler
  participantNames: { [userId: string]: string };
  participantPhotos: { [userId: string]: string | undefined };
  messages: Message[];
  lastMessage?: Message;
  lastMessageAt: string;
  unreadCount: { [userId: string]: number };
  createdAt: string;
}

// ==================== DÜELLO SİSTEMİ ====================

// Düello durumu
export type DuelStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'expired';

// Düello
export interface Duel {
  id: string;
  challengerId: string;
  challengerName: string;
  challengerPhoto?: string;
  opponentId: string;
  opponentName: string;
  opponentPhoto?: string;
  category: string;
  status: DuelStatus;
  questions: DuelQuestion[];
  challengerAnswers: DuelAnswer[];
  opponentAnswers: DuelAnswer[];
  challengerScore: number;
  opponentScore: number;
  winnerId?: string;
  xpReward: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  expiresAt: string; // Düello daveti süresi
}

// Düello sorusu
export interface DuelQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // saniye
}

// Düello cevabı
export interface DuelAnswer {
  odakionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  answeredAt: string;
  timeSpent: number; // saniye
}

// Düello sonucu
export interface DuelResult {
  odakId: string;
  challengerId: string;
  opponentId: string;
  challengerScore: number;
  opponentScore: number;
  winnerId: string | null; // null = berabere
  isWinner: boolean;
  isDraw: boolean;
  yourScore: number;
  xpEarned: number;
  category: string;
  completedAt: string;
}

// Düello istatistikleri
export interface DuelStats {
  totalDuels: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  currentWinStreak: number;
  bestWinStreak: number;
  longestStreak: number;
  totalXPFromDuels: number;
  totalXPEarned: number;
  favoriteCategory?: string;
}

// ==================== NAVİGASYON PARAMETRELERİ (Güncellenmiş) ====================

// Stack navigasyon parametreleri
export type AppStackParamList = {
  Main: undefined;
  Auth: undefined;
  Lesson: { lessonId: string; categoryId: string };
  LessonDetail: { lessonId: string; categoryId?: string };
  LessonQuiz: { lessonId: string };
  CodeEditor: { lessonId: string; initialCode?: string };
  Quiz: { lessonId: string; quizId: string };
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Achievements: undefined;
  DailyChallenge: undefined;
  // Yeni ekranlar
  Friends: undefined;
  FriendProfile: { odakId: string };
  Chat: { conversationId: string; friendId: string; friendName: string };
  Duel: { duelId?: string; opponentId?: string };
  DuelResult: { duelId: string };
};
