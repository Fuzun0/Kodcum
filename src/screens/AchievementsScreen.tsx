import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Badge } from '../types';
import { lightHaptic } from '../utils/haptics';

const { width } = Dimensions.get('window');
const badgeSize = (width - 64) / 3;

const AchievementsScreen = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  // Tüm rozetler
  const allBadges: (Badge & { locked?: boolean })[] = [
    {
      id: 'first_lesson',
      name: 'İlk Ders',
      description: 'İlk dersini tamamla',
      icon: '🎓',
      unlockedAt: user?.badges.find(b => b.id === 'first_lesson')?.unlockedAt || '',
      locked: !user?.badges.find(b => b.id === 'first_lesson'),
    },
    {
      id: 'first_quiz',
      name: 'İlk Quiz',
      description: 'İlk quizi tamamla',
      icon: '❓',
      unlockedAt: user?.badges.find(b => b.id === 'first_quiz')?.unlockedAt || '',
      locked: !user?.badges.find(b => b.id === 'first_quiz'),
    },
    {
      id: 'streak_7',
      name: '7 Günlük Seri',
      description: '7 gün üst üste çalış',
      icon: '🔥',
      unlockedAt: user?.badges.find(b => b.id === 'streak_7')?.unlockedAt || '',
      locked: !user?.badges.find(b => b.id === 'streak_7'),
    },
    {
      id: 'streak_30',
      name: '30 Günlük Seri',
      description: '30 gün üst üste çalış',
      icon: '⚡',
      unlockedAt: user?.badges.find(b => b.id === 'streak_30')?.unlockedAt || '',
      locked: !user?.badges.find(b => b.id === 'streak_30'),
    },
    {
      id: 'level_5',
      name: 'Seviye 5',
      description: 'Seviye 5\'e ulaş',
      icon: '⭐',
      unlockedAt: user?.badges.find(b => b.id === 'level_5')?.unlockedAt || '',
      locked: !user?.badges.find(b => b.id === 'level_5'),
    },
    {
      id: 'level_10',
      name: 'Seviye 10',
      description: 'Seviye 10\'a ulaş',
      icon: '🏆',
      unlockedAt: user?.badges.find(b => b.id === 'level_10')?.unlockedAt || '',
      locked: !user?.badges.find(b => b.id === 'level_10'),
    },
    {
      id: 'html_master',
      name: 'HTML Ustası',
      description: 'Tüm HTML derslerini tamamla',
      icon: '📄',
      unlockedAt: '',
      locked: true,
    },
    {
      id: 'css_master',
      name: 'CSS Ustası',
      description: 'Tüm CSS derslerini tamamla',
      icon: '🎨',
      unlockedAt: '',
      locked: true,
    },
    {
      id: 'js_master',
      name: 'JavaScript Ustası',
      description: 'Tüm JavaScript derslerini tamamla',
      icon: '💛',
      unlockedAt: '',
      locked: true,
    },
    {
      id: 'perfect_quiz',
      name: 'Mükemmel Quiz',
      description: 'Bir quizde %100 al',
      icon: '💯',
      unlockedAt: '',
      locked: true,
    },
    {
      id: 'night_owl',
      name: 'Gece Kuşu',
      description: 'Gece 12\'den sonra ders çalış',
      icon: '🦉',
      unlockedAt: '',
      locked: true,
    },
    {
      id: 'early_bird',
      name: 'Erken Kuş',
      description: 'Sabah 6\'dan önce ders çalış',
      icon: '🐦',
      unlockedAt: '',
      locked: true,
    },
  ];

  const unlockedCount = allBadges.filter(b => !b.locked).length;

  return (
    <ScrollView style={styles.container}>
      {/* Başlık */}
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Başarılar</Text>
        <Text style={styles.subtitle}>
          {unlockedCount} / {allBadges.length} rozet kazanıldı
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(unlockedCount / allBadges.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Rozetler Grid */}
      <View style={styles.badgesGrid}>
        {allBadges.map((badge) => (
          <View 
            key={badge.id} 
            style={[styles.badgeCard, badge.locked && styles.lockedBadge]}
          >
            <View style={styles.badgeIcon}>
              <Text style={styles.badgeEmoji}>
                {badge.locked ? '🔒' : badge.icon}
              </Text>
            </View>
            <Text style={[styles.badgeName, badge.locked && styles.lockedText]}>
              {badge.name}
            </Text>
            <Text style={[styles.badgeDescription, badge.locked && styles.lockedText]}>
              {badge.description}
            </Text>
            {!badge.locked && badge.unlockedAt && (
              <Text style={styles.badgeDate}>
                {new Date(badge.unlockedAt).toLocaleDateString('tr-TR')}
              </Text>
            )}
          </View>
        ))}
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: badgeSize,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  lockedBadge: {
    opacity: 0.5,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeEmoji: {
    fontSize: 28,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  lockedText: {
    color: colors.textSecondary,
  },
  badgeDate: {
    fontSize: 9,
    color: colors.primary,
    marginTop: 4,
  },
});

export default AchievementsScreen;
