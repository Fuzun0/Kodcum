// Celebration Animation Component
import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { successHaptic } from '../utils/haptics';

const { width, height } = Dimensions.get('window');

interface ConfettiPiece {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  color: string;
  size: number;
}

interface CelebrationProps {
  visible: boolean;
  onComplete?: () => void;
  duration?: number;
  pieceCount?: number;
}

const CONFETTI_COLORS = [
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
];

/**
 * Confetti Animation Component
 */
export const Confetti: React.FC<CelebrationProps> = ({
  visible,
  onComplete,
  duration = 3000,
  pieceCount = 50,
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (visible) {
      successHaptic();
      
      const startPositions: number[] = [];
      const newPieces: ConfettiPiece[] = Array.from({ length: pieceCount }).map((_, i) => {
        const startX = Math.random() * width;
        startPositions.push(startX);
        return {
          id: i,
          x: new Animated.Value(startX),
          y: new Animated.Value(-50),
          rotate: new Animated.Value(0),
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          size: Math.random() * 10 + 5,
        };
      });

      setPieces(newPieces);

      newPieces.forEach((piece, index) => {
        const fallDuration = duration + Math.random() * 1000;
        const swayAmount = (Math.random() - 0.5) * 100;
        const startX = startPositions[index];

        Animated.parallel([
          Animated.timing(piece.y, {
            toValue: height + 100,
            duration: fallDuration,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(piece.x, {
              toValue: startX + swayAmount,
              duration: fallDuration / 3,
              useNativeDriver: true,
            }),
            Animated.timing(piece.x, {
              toValue: startX - swayAmount,
              duration: fallDuration / 3,
              useNativeDriver: true,
            }),
            Animated.timing(piece.x, {
              toValue: startX,
              duration: fallDuration / 3,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(piece.rotate, {
            toValue: Math.random() * 10,
            duration: fallDuration,
            useNativeDriver: true,
          }),
        ]).start();
      });

      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, duration + 1500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible && pieces.length === 0) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((piece) => (
        <Animated.View
          key={piece.id}
          style={[
            styles.piece,
            {
              width: piece.size,
              height: piece.size * 1.5,
              backgroundColor: piece.color,
              transform: [
                { translateX: piece.x },
                { translateY: piece.y },
                {
                  rotate: piece.rotate.interpolate({
                    inputRange: [0, 10],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

/**
 * Success Celebration with Icon and Text
 */
interface SuccessCelebrationProps {
  visible: boolean;
  title?: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onComplete?: () => void;
}

export const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({
  visible,
  title = 'Tebrikler! 🎉',
  subtitle,
  icon = 'trophy',
  onComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      successHaptic();
      
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(2000),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onComplete?.();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.celebrationContainer}>
      <Confetti visible={visible} />
      <Animated.View
        style={[
          styles.celebrationContent,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={64} color="#f59e0b" />
        </View>
        <Text style={styles.celebrationTitle}>{title}</Text>
        {subtitle && <Text style={styles.celebrationSubtitle}>{subtitle}</Text>}
      </Animated.View>
    </View>
  );
};

/**
 * Badge Unlock Animation
 */
interface BadgeUnlockProps {
  visible: boolean;
  badgeName: string;
  badgeIcon: string;
  onComplete?: () => void;
}

export const BadgeUnlock: React.FC<BadgeUnlockProps> = ({
  visible,
  badgeName,
  badgeIcon,
  onComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      successHaptic();
      
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1.2,
            tension: 40,
            friction: 5,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ]).start(() => {
        onComplete?.();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.badgeContainer}>
      <Confetti visible={visible} pieceCount={30} />
      <Animated.View
        style={[
          styles.badgeContent,
          {
            transform: [
              { scale: scaleAnim },
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.badgeIconContainer}>
          <Text style={styles.badgeEmoji}>{badgeIcon}</Text>
        </View>
        <Text style={styles.badgeTitle}>Yeni Rozet!</Text>
        <Text style={styles.badgeName}>{badgeName}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  piece: {
    position: 'absolute',
    borderRadius: 2,
  },
  celebrationContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
  },
  celebrationContent: {
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  celebrationTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  celebrationSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 8,
  },
  badgeContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 1000,
  },
  badgeContent: {
    alignItems: 'center',
    padding: 32,
  },
  badgeIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#6366f1',
  },
  badgeEmoji: {
    fontSize: 48,
  },
  badgeTitle: {
    fontSize: 14,
    color: '#a5b4fc',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default { Confetti, SuccessCelebration, BadgeUnlock };
