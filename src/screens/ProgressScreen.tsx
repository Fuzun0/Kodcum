import React, { useEffect, useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  htmlLessons, 
  cssLessons, 
  javascriptLessons, 
  reactLessons, 
  pythonLessons 
} from '../data/lessons';

const { width } = Dimensions.get('window');

const ProgressScreen = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { progress, totalXP, level, streak, completedQuizzes } = useProgress();
  const { user } = useAuth();
  const [weeklyActivity, setWeeklyActivity] = useState<Array<{day: string, minutes: number}>>([]);

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  // Bugün tamamlanan süre (progress'den dinamik hesapla)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStudyMinutes = progress.filter(p => {
    if (!p.completedAt) return false;
    const completedDate = new Date(p.completedAt);
    completedDate.setHours(0, 0, 0, 0);
    return completedDate.getTime() === today.getTime();
  }).reduce((sum, p) => sum + (p.timeSpent || 10), 0);

  // Toplam çalışma süresi (tüm progress'den hesapla)
  const calculatedTotalStudyTime = progress.reduce((sum, p) => sum + (p.timeSpent || 10), 0);

  // Günlük hedef
  const dailyGoal = user?.dailyGoal || 30;
  const todayProgress = todayStudyMinutes; // Dinamik hesaplanan değer
  const dailyProgressPercent = Math.min((todayProgress / dailyGoal) * 100, 100);

  // Sonraki seviye için gereken XP
  const xpForNextLevel = level * 100;
  const currentLevelXP = totalXP - ((level - 1) * level * 50);
  const progressPercent = Math.min((currentLevelXP / xpForNextLevel) * 100, 100);

  // Toplam çalışma süresi (dinamik hesaplanan)
  const totalStudyTime = calculatedTotalStudyTime;
  const totalHours = Math.floor(totalStudyTime / 60);
  const totalMinutes = totalStudyTime % 60;

  // Quiz istatistikleri - lessonQuizzes import etmeden direkt hesaplama
  const totalAvailableQuizzes = 157; // HTML:2, CSS:6, JS:10, React:22, Python:6, Kotlin:21, Swift:28, Finals:3 = ~100 (yaklaşık)
  const completedQuizzesCount = completedQuizzes?.length || 0;
  const quizSuccessRate = totalAvailableQuizzes > 0 
    ? Math.round((completedQuizzesCount / totalAvailableQuizzes) * 100) 
    : 0;

  // Haftalık aktivite hesapla
  useEffect(() => {
    const calculateWeeklyActivity = () => {
      const today = new Date();
      const weekData = [];
      const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // O güne ait tamamlanan derslerin süresini hesapla
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);
        
        const dayProgress = progress.filter(p => {
          if (!p.completedAt) return false;
          const completedDate = new Date(p.completedAt);
          return completedDate >= dayStart && completedDate <= dayEnd;
        });
        
        const minutes = dayProgress.reduce((sum, p) => sum + (p.timeSpent || 10), 0);
        
        weekData.push({
          day: dayNames[date.getDay()],
          minutes: minutes,
        });
      }
      
      setWeeklyActivity(weekData);
    };
    
    calculateWeeklyActivity();
  }, [progress]);

  const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes), 1);

  // Kategori ilerlemelerini hesapla
  const getCategoryProgress = (categoryId: string) => {
    let categoryLessons;
    switch (categoryId) {
      case 'html':
        categoryLessons = htmlLessons;
        break;
      case 'css':
        categoryLessons = cssLessons;
        break;
      case 'javascript':
        categoryLessons = javascriptLessons;
        break;
      case 'react':
        categoryLessons = reactLessons;
        break;
      case 'python':
        categoryLessons = pythonLessons;
        break;
      default:
        return 0;
    }
    
    const completedCount = categoryLessons.filter(l => 
      progress.some(p => p.lessonId === l.id && typeof p.quizScore === 'number' && (p.quizScore || 0) >= 60)
    ).length;
    
    return categoryLessons.length > 0 
      ? Math.round((completedCount / categoryLessons.length) * 100) 
      : 0;
  };

  const categories = [
    { id: 'html', name: 'HTML', color: '#e34c26' },
    { id: 'css', name: 'CSS', color: '#264de4' },
    { id: 'javascript', name: 'JavaScript', color: '#f7df1e' },
    { id: 'react', name: 'React', color: '#61dafb' },
    { id: 'python', name: 'Python', color: '#3776ab' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Günlük Hedef Kartı */}
      <View style={styles.dailyGoalCard}>
        <View style={styles.dailyGoalHeader}>
          <Ionicons name="flag" size={24} color={theme.colors.primary} />
          <Text style={styles.dailyGoalTitle}>Günlük Hedef</Text>
        </View>
        <Text style={styles.dailyGoalSubtitle}>
          {todayProgress} / {dailyGoal} dakika
        </Text>
        <View style={styles.dailyGoalProgressBar}>
          <View style={[styles.dailyGoalProgressFill, { width: `${dailyProgressPercent}%` }]} />
        </View>
        <Text style={styles.dailyGoalMessage}>
          {dailyProgressPercent >= 100 
            ? '🎉 Günlük hedefini tamamladın!' 
            : `${dailyGoal - todayProgress} dakika daha çalış!`}
        </Text>
      </View>

      {/* Seviye Kartı */}
      <View style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelNumber}>{level}</Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>Seviye {level}</Text>
            <Text style={styles.levelSubtitle}>
              {Math.round(xpForNextLevel - currentLevelXP)} XP kaldı
            </Text>
          </View>
          <View style={styles.xpBadge}>
            <Ionicons name="star" size={16} color="#fbbf24" />
            <Text style={styles.xpText}>{totalXP}</Text>
          </View>
        </View>
        <View style={styles.levelProgressBar}>
          <View style={[styles.levelProgressFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      {/* İstatistik Kartları */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={28} color="#ef4444" />
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>Günlük Seri</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={28} color="#22c55e" />
          <Text style={styles.statValue}>{completedQuizzesCount}</Text>
          <Text style={styles.statLabel}>Tamamlanan</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time" size={28} color="#3b82f6" />
          <Text style={styles.statValue}>{totalHours > 0 ? `${totalHours}s` : `${totalMinutes}dk`}</Text>
          <Text style={styles.statLabel}>Toplam Süre</Text>
        </View>
      </View>

      {/* Quiz İstatistikleri */}
      <View style={styles.quizStatsCard}>
        <View style={styles.quizStatsHeader}>
          <Ionicons name="help-circle" size={24} color={theme.colors.primary} />
          <Text style={styles.quizStatsTitle}>Quiz Başarısı</Text>
        </View>
        <View style={styles.quizStatsContent}>
          <View style={styles.quizStatItem}>
            <Text style={styles.quizStatValue}>{completedQuizzesCount}</Text>
            <Text style={styles.quizStatLabel}>Tamamlanan</Text>
          </View>
          <View style={styles.quizStatDivider} />
          <View style={styles.quizStatItem}>
            <Text style={styles.quizStatValue}>{totalAvailableQuizzes}</Text>
            <Text style={styles.quizStatLabel}>Toplam</Text>
          </View>
          <View style={styles.quizStatDivider} />
          <View style={styles.quizStatItem}>
            <Text style={styles.quizStatValue}>%{quizSuccessRate}</Text>
            <Text style={styles.quizStatLabel}>Başarı</Text>
          </View>
        </View>
        <View style={styles.quizProgressBar}>
          <View style={[styles.quizProgressFill, { width: `${quizSuccessRate}%` }]} />
        </View>
      </View>

      {/* Haftalık Aktivite */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Haftalık Aktivite</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {weeklyActivity.map((day, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.chartBarFill, 
                    { 
                      height: day.minutes > 0 ? `${Math.max((day.minutes / maxMinutes) * 100, 10)}%` : '5%',
                      backgroundColor: day.minutes >= dailyGoal ? theme.colors.primary : theme.colors.primary + '60'
                    }
                  ]} 
                />
                <Text style={styles.chartLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Rozetler */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Rozetler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {(user?.badges || []).map((badge, index) => (
            <View key={index} style={styles.badgeCard}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text style={styles.badgeName}>{badge.name}</Text>
            </View>
          ))}
          {user?.badges?.length === 0 && (
            <View style={styles.emptyBadges}>
              <Text style={styles.emptyBadgesText}>Henüz rozet kazanmadın</Text>
              <Text style={styles.emptyBadgesSubtext}>Ders tamamla ve rozet kazan!</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Kategori İlerlemesi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Kategori İlerlemesi</Text>
        {categories.map((cat, index) => {
          const categoryProgress = getCategoryProgress(cat.id);
          return (
            <View key={index} style={styles.categoryProgress}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryPercent}>{categoryProgress}%</Text>
              </View>
              <View style={styles.categoryProgressBar}>
                <View 
                  style={[
                    styles.categoryProgressFill, 
                    { width: `${categoryProgress}%`, backgroundColor: cat.color }
                  ]} 
                />
              </View>
            </View>
          );
        })}
      </View>



    </ScrollView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  dailyGoalCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dailyGoalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dailyGoalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  dailyGoalSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  dailyGoalProgressBar: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  dailyGoalProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  dailyGoalMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  levelCard: {
    margin: 16,
    marginTop: 8,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  levelInfo: {
    flex: 1,
    marginLeft: 16,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  levelSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  levelProgressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  chartContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  chartBarFill: {
    width: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  badgeCard: {
    width: 80,
    height: 100,
    backgroundColor: colors.card,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    padding: 8,
  },
  emptyBadges: {
    padding: 30,
    alignItems: 'center',
  },
  emptyBadgesText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  emptyBadgesSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  lockedBadge: {
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: 32,
  },
  badgeName: {
    fontSize: 11,
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  categoryProgress: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  categoryPercent: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  categoryProgressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  quizStatsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quizStatsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quizStatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  quizStatsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  quizStatItem: {
    alignItems: 'center',
  },
  quizStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  quizStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  quizStatDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  quizProgressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  quizProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});

export default ProgressScreen;
