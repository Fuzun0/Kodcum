import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

// Türkçe çeviriler
const tr = {
  // Genel
  app_name: 'Kodcum',
  welcome: 'Hoş Geldiniz',
  continue: 'Devam Et',
  cancel: 'İptal',
  save: 'Kaydet',
  delete: 'Sil',
  edit: 'Düzenle',
  back: 'Geri',
  next: 'İleri',
  finish: 'Bitir',
  loading: 'Yükleniyor...',
  error: 'Hata',
  success: 'Başarılı',
  
  // Kimlik doğrulama
  login: 'Giriş Yap',
  register: 'Kayıt Ol',
  logout: 'Çıkış Yap',
  email: 'E-posta',
  password: 'Şifre',
  confirm_password: 'Şifreyi Onayla',
  forgot_password: 'Şifremi Unuttum',
  display_name: 'Kullanıcı Adı',
  
  // Navigasyon
  home: 'Ana Sayfa',
  categories: 'Kategoriler',
  progress: 'İlerleme',
  profile: 'Profil',
  settings: 'Ayarlar',
  achievements: 'Başarılar',
  
  // Dersler
  lessons: 'Dersler',
  lesson: 'Ders',
  start_lesson: 'Derse Başla',
  continue_lesson: 'Derse Devam Et',
  completed: 'Tamamlandı',
  in_progress: 'Devam Ediyor',
  not_started: 'Başlanmadı',
  
  // Kod Editörü
  code_editor: 'Kod Editörü',
  run_code: 'Kodu Çalıştır',
  reset_code: 'Sıfırla',
  copy_code: 'Kopyala',
  output: 'Çıktı',
  console: 'Konsol',
  
  // Quiz
  quiz: 'Quiz',
  start_quiz: 'Quiz\'e Başla',
  question: 'Soru',
  correct: 'Doğru!',
  incorrect: 'Yanlış!',
  score: 'Puan',
  try_again: 'Tekrar Dene',
  submit: 'Gönder',
  
  // İlerleme
  level: 'Seviye',
  xp: 'XP',
  streak: 'Seri',
  days: 'Gün',
  completed_lessons: 'Tamamlanan Dersler',
  total_xp: 'Toplam XP',
  daily_goal: 'Günlük Hedef',
  weekly_progress: 'Haftalık İlerleme',
  study_time: 'Çalışma Süresi',
  
  // Rozetler
  badges: 'Rozetler',
  badge_first_lesson: 'İlk Ders',
  badge_first_quiz: 'İlk Quiz',
  badge_streak_7: '7 Günlük Seri',
  badge_streak_30: '30 Günlük Seri',
  badge_level_5: 'Seviye 5',
  badge_level_10: 'Seviye 10',
  
  // Kategoriler
  category_html: 'HTML',
  category_css: 'CSS',
  category_javascript: 'JavaScript',
  category_react: 'React',
  category_python: 'Python',
  category_kotlin: 'Kotlin',
  category_swift: 'Swift',
  
  // AI Asistan
  ai_assistant: 'AI Asistan',
  ask_ai: 'AI\'ya Sor',
  ai_hint: 'İpucu Al',
  ai_explain: 'Açıkla',
  ai_fix: 'Düzelt',
  
  // Sosyal
  add_friend: 'Arkadaş Ekle',
  friend_requests: 'Arkadaşlık İstekleri',
  my_friends: 'Arkadaşlarım',
  send_message: 'Mesaj Gönder',
  challenge: 'Düelloya Davet Et',
  accept: 'Kabul Et',
  reject: 'Reddet',
  friends: 'Arkadaşlar',
  social: 'Sosyal',
  
  // Düellolar
  duel: 'Düello',
  start_duel: 'Düello Başlat',
  duel_history: 'Maç Geçmişi',
  wins: 'Galibiyet',
  losses: 'Mağlubiyet',
  draws: 'Berabere',
  win_rate: 'Kazanma Oranı',
  
  // Profil
  edit_profile: 'Profili Düzenle',
  photo: 'Fotoğraf',
  change_photo: 'Fotoğrafı Değiştir',
  remove_photo: 'Fotoğrafı Kaldır',
  language: 'Dil',
  theme: 'Tema',
  dark_mode: 'Koyu Mod',
  light_mode: 'Açık Mod',
  notifications: 'Bildirimler',
  username: 'Kullanıcı Adı',
  
  // Ayarlar
  account: 'Hesap',
  privacy: 'Gizlilik',
  about: 'Hakkında',
  version: 'Sürüm',
  terms: 'Kullanım Şartları',
  privacy_policy: 'Gizlilik Politikası',
  all_lessons: 'Tüm Dersler',
  
  // Mesajlar
  lesson_completed: 'Ders tamamlandı! 🎉',
  quiz_completed: 'Quiz tamamlandı!',
  new_badge: 'Yeni rozet kazandınız!',
  level_up: 'Seviye atladınız!',
  streak_continued: 'Seriniz devam ediyor!',
  no_data: 'Veri bulunmuyor',
  coming_soon: 'Çok yakında',
  
  // Hatalar
  error_generic: 'Bir şeyler yanlış gitti',
  error_network: 'Ağ hatası',
  error_auth: 'Kimlik doğrulama hatası',
  
  // Zaman
  today: 'Bugün',
  yesterday: 'Dün',
  this_week: 'Bu Hafta',
  minutes: 'dakika',
  hours: 'saat',
};

// İngilizce çeviriler
const en = {
  // General
  app_name: 'Kodcum',
  welcome: 'Welcome',
  continue: 'Continue',
  cancel: 'Cancel',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  back: 'Back',
  next: 'Next',
  finish: 'Finish',
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  
  // Authentication
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  email: 'Email',
  password: 'Password',
  confirm_password: 'Confirm Password',
  forgot_password: 'Forgot Password',
  display_name: 'Display Name',
  username: 'Username',
  
  // Navigation
  home: 'Home',
  categories: 'Categories',
  progress: 'Progress',
  profile: 'Profile',
  settings: 'Settings',
  achievements: 'Achievements',
  friends: 'Friends',
  social: 'Social',
  
  // Lessons
  lessons: 'Lessons',
  lesson: 'Lesson',
  start_lesson: 'Start Lesson',
  continue_lesson: 'Continue Lesson',
  completed: 'Completed',
  in_progress: 'In Progress',
  not_started: 'Not Started',
  all_lessons: 'All Lessons',
  
  // Code Editor
  code_editor: 'Code Editor',
  run_code: 'Run Code',
  reset_code: 'Reset',
  copy_code: 'Copy',
  output: 'Output',
  console: 'Console',
  
  // Quiz
  quiz: 'Quiz',
  start_quiz: 'Start Quiz',
  question: 'Question',
  correct: 'Correct!',
  incorrect: 'Incorrect!',
  score: 'Score',
  try_again: 'Try Again',
  submit: 'Submit',
  
  // Progress
  level: 'Level',
  xp: 'XP',
  streak: 'Streak',
  days: 'Days',
  completed_lessons: 'Completed Lessons',
  total_xp: 'Total XP',
  daily_goal: 'Daily Goal',
  weekly_progress: 'Weekly Progress',
  study_time: 'Study Time',
  
  // Badges
  badges: 'Badges',
  badge_first_lesson: 'First Lesson',
  badge_first_quiz: 'First Quiz',
  badge_streak_7: '7 Day Streak',
  badge_streak_30: '30 Day Streak',
  badge_level_5: 'Level 5',
  badge_level_10: 'Level 10',
  
  // Categories
  category_html: 'HTML',
  category_css: 'CSS',
  category_javascript: 'JavaScript',
  category_react: 'React',
  category_python: 'Python',
  category_kotlin: 'Kotlin',
  category_swift: 'Swift',
  
  // AI Assistant
  ai_assistant: 'AI Assistant',
  ask_ai: 'Ask AI',
  ai_hint: 'Get Hint',
  ai_explain: 'Explain',
  ai_fix: 'Fix',
  
  // Social
  add_friend: 'Add Friend',
  friend_requests: 'Friend Requests',
  my_friends: 'My Friends',
  send_message: 'Send Message',
  challenge: 'Challenge',
  accept: 'Accept',
  reject: 'Reject',
  
  // Duels
  duel: 'Duel',
  start_duel: 'Start Duel',
  duel_history: 'Duel History',
  wins: 'Wins',
  losses: 'Losses',
  draws: 'Draws',
  win_rate: 'Win Rate',
  
  // Profile
  edit_profile: 'Edit Profile',
  photo: 'Photo',
  change_photo: 'Change Photo',
  remove_photo: 'Remove Photo',
  language: 'Language',
  theme: 'Theme',
  dark_mode: 'Dark Mode',
  light_mode: 'Light Mode',
  notifications: 'Notifications',
  
  // Settings
  account: 'Account',
  privacy: 'Privacy',
  about: 'About',
  version: 'Version',
  terms: 'Terms of Service',
  privacy_policy: 'Privacy Policy',
  
  // Messages
  lesson_completed: 'Lesson completed! 🎉',
  quiz_completed: 'Quiz completed!',
  new_badge: 'You earned a new badge!',
  level_up: 'Level up!',
  streak_continued: 'Your streak continues!',
  no_data: 'No data available',
  coming_soon: 'Coming soon',
  
  // Errors
  error_generic: 'Something went wrong',
  error_network: 'Network error',
  error_auth: 'Authentication error',
  
  // Time
  today: 'Today',
  yesterday: 'Yesterday',
  this_week: 'This Week',
  minutes: 'minutes',
  hours: 'hours',
};

const i18n = new I18n({ tr, en });
i18n.defaultLocale = 'tr';
i18n.enableFallback = true;

interface LanguageContextType {
  locale: string;
  t: (key: string) => string;
  setLocale: (locale: 'tr' | 'en') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Cihazın dilini al, Türkçe veya İngilizce değilse Türkçe kullan
  let deviceLocale = 'tr';
  try {
    const locales = Localization.getLocales();
    if (locales && locales.length > 0 && locales[0].languageCode) {
      deviceLocale = locales[0].languageCode;
    }
  } catch (error) {
    console.log('Locale detection failed, using Turkish');
  }
  const initialLocale = ['tr', 'en'].includes(deviceLocale) ? deviceLocale : 'tr';
  
  const [locale, setLocaleState] = useState(initialLocale);
  
  const setLocale = (newLocale: 'tr' | 'en') => {
    setLocaleState(newLocale);
    i18n.locale = newLocale;
  };

  i18n.locale = locale;

  const t = (key: string): string => {
    return i18n.t(key);
  };

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};
