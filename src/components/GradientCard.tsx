// Gradient Card Component
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '../contexts/ThemeContext';

interface GradientCardProps {
  children: React.ReactNode;
  colors?: string[];
  style?: ViewStyle;
  variant?: 'gradient' | 'blur' | 'solid';
  intensity?: number;
  borderRadius?: number;
  padding?: number;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  colors,
  style,
  variant = 'gradient',
  intensity = 50,
  borderRadius = 16,
  padding = 16,
}) => {
  const { theme } = useTheme();

  const defaultColors = [
    theme.colors.primary + '40',
    theme.colors.secondary + '20',
  ];

  if (variant === 'blur') {
    return (
      <View style={[styles.container, { borderRadius }, style]}>
        <BlurView
          intensity={intensity}
          tint={theme.dark ? 'dark' : 'light'}
          style={[styles.blur, { borderRadius, padding }]}
        >
          {children}
        </BlurView>
      </View>
    );
  }

  if (variant === 'solid') {
    return (
      <View
        style={[
          styles.solid,
          {
            backgroundColor: theme.colors.card,
            borderRadius,
            padding,
            borderWidth: 1,
            borderColor: theme.colors.border,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={(colors || defaultColors) as unknown as readonly [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.gradient,
        {
          borderRadius,
          padding,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
};

/**
 * Featured Card with Gradient Border
 */
export const FeaturedCard: React.FC<GradientCardProps> = ({
  children,
  colors,
  style,
  borderRadius = 16,
  padding = 16,
}) => {
  const { theme } = useTheme();

  const gradientColors = colors || [theme.colors.primary, theme.colors.secondary];

  return (
    <LinearGradient
      colors={gradientColors as unknown as readonly [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.featuredOuter, { borderRadius: borderRadius + 2 }, style]}
    >
      <View
        style={[
          styles.featuredInner,
          {
            backgroundColor: theme.colors.card,
            borderRadius,
            padding,
          },
        ]}
      >
        {children}
      </View>
    </LinearGradient>
  );
};

/**
 * Stat Card with Icon and Gradient
 */
interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color?: string;
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  color,
  style,
}) => {
  const { theme } = useTheme();
  const cardColor = color || theme.colors.primary;

  return (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: cardColor + '15',
          borderColor: cardColor + '30',
        },
        style,
      ]}
    >
      <View style={[styles.statIcon, { backgroundColor: cardColor + '20' }]}>
        {icon}
      </View>
      <View style={styles.statContent}>
        <View style={styles.statValueContainer}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text }}>
            {typeof value === 'string' ? value : value.toString()}
          </Text>
        </View>
        <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
          {label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  gradient: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  blur: {
    overflow: 'hidden',
  },
  solid: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuredOuter: {
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  featuredInner: {
    flex: 1,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    marginLeft: 12,
    flex: 1,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});

export default GradientCard;
