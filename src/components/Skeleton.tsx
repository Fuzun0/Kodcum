// Skeleton Loading Component
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * Skeleton Loading Component
 * Veri yüklenirken animasyonlu placeholder gösterir
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width: typeof width === 'string' ? width as any : width,
          height,
          borderRadius,
          backgroundColor: theme.colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

/**
 * Avatar Skeleton
 */
export const AvatarSkeleton: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <Skeleton width={size} height={size} borderRadius={size / 2} />
);

/**
 * Text Line Skeleton
 */
export const TextSkeleton: React.FC<{ width?: number | string; lines?: number }> = ({
  width = '100%',
  lines = 1,
}) => (
  <View>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        width={index === lines - 1 && lines > 1 ? '70%' : width}
        height={14}
        style={{ marginBottom: index < lines - 1 ? 8 : 0 }}
      />
    ))}
  </View>
);

/**
 * Card Skeleton - Genel kart yükleme placeholder'ı
 */
export const CardSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
      <View style={styles.cardHeader}>
        <AvatarSkeleton size={40} />
        <View style={styles.cardHeaderText}>
          <Skeleton width={120} height={16} />
          <Skeleton width={80} height={12} style={{ marginTop: 6 }} />
        </View>
      </View>
      <Skeleton width="100%" height={60} style={{ marginTop: 12 }} />
    </View>
  );
};

/**
 * Friend Card Skeleton
 */
export const FriendCardSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.friendCard, { backgroundColor: theme.colors.card }]}>
      <AvatarSkeleton size={50} />
      <View style={styles.friendInfo}>
        <Skeleton width={100} height={16} />
        <Skeleton width={60} height={12} style={{ marginTop: 6 }} />
      </View>
      <Skeleton width={40} height={40} borderRadius={20} />
    </View>
  );
};

/**
 * Lesson Card Skeleton
 */
export const LessonCardSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.lessonCard, { backgroundColor: theme.colors.card }]}>
      <Skeleton width={50} height={50} borderRadius={12} />
      <View style={styles.lessonInfo}>
        <Skeleton width={150} height={18} />
        <Skeleton width={200} height={12} style={{ marginTop: 8 }} />
        <View style={styles.lessonStats}>
          <Skeleton width={60} height={10} />
          <Skeleton width={80} height={10} />
        </View>
      </View>
    </View>
  );
};

/**
 * Stats Card Skeleton
 */
export const StatsCardSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.statsCard, { backgroundColor: theme.colors.card }]}>
      <Skeleton width={40} height={40} borderRadius={20} />
      <Skeleton width={50} height={24} style={{ marginTop: 8 }} />
      <Skeleton width={70} height={12} style={{ marginTop: 4 }} />
    </View>
  );
};

/**
 * Home Screen Skeleton
 */
export const HomeScreenSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Skeleton width={200} height={28} />
          <Skeleton width={250} height={16} style={{ marginTop: 8 }} />
        </View>
        <AvatarSkeleton size={50} />
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </View>

      {/* Continue Learning */}
      <View style={styles.section}>
        <Skeleton width={180} height={20} style={{ marginBottom: 16 }} />
        <LessonCardSkeleton />
      </View>

      {/* Daily Challenge */}
      <View style={styles.section}>
        <Skeleton width={150} height={20} style={{ marginBottom: 16 }} />
        <CardSkeleton />
      </View>
    </View>
  );
};

/**
 * Friends Screen Skeleton
 */
export const FriendsScreenSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <Skeleton width={80} height={36} borderRadius={18} />
        <Skeleton width={80} height={36} borderRadius={18} />
        <Skeleton width={80} height={36} borderRadius={18} />
      </View>

      {/* Friend Cards */}
      <FriendCardSkeleton />
      <FriendCardSkeleton />
      <FriendCardSkeleton />
      <FriendCardSkeleton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 12,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 12,
  },
  lessonStats: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  statsCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  tabs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
});

export default {
  Skeleton,
  AvatarSkeleton,
  TextSkeleton,
  CardSkeleton,
  FriendCardSkeleton,
  LessonCardSkeleton,
  StatsCardSkeleton,
  HomeScreenSkeleton,
  FriendsScreenSkeleton,
};
