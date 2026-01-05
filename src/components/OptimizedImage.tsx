/**
 * Optimized Image Component
 * Lazy loading, fallback ve caching destekli image component
 */

import React, { useState, memo, useCallback } from 'react';
import {
  Image,
  ImageProps,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageStyle,
  ViewStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  uri: string | null | undefined;
  fallbackIcon?: keyof typeof Ionicons.glyphMap;
  fallbackIconSize?: number;
  fallbackIconColor?: string;
  fallbackBackgroundColor?: string;
  showLoader?: boolean;
  loaderColor?: string;
  containerStyle?: ViewStyle;
}

/**
 * Lazy loading ve fallback destekli optimized image
 */
const OptimizedImage = memo<OptimizedImageProps>(({
  uri,
  fallbackIcon = 'person',
  fallbackIconSize = 40,
  fallbackIconColor = '#94a3b8',
  fallbackBackgroundColor = '#1e293b',
  showLoader = true,
  loaderColor = '#6366f1',
  containerStyle,
  style,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = useCallback(() => {
    setLoading(true);
    setError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  // URI yoksa veya hata varsa fallback göster
  if (!uri || error) {
    return (
      <View 
        style={[
          styles.fallbackContainer, 
          { backgroundColor: fallbackBackgroundColor },
          containerStyle,
          style as ViewStyle
        ]}
        accessibilityLabel="Profil resmi yüklenemedi"
      >
        <Ionicons 
          name={fallbackIcon} 
          size={fallbackIconSize} 
          color={fallbackIconColor} 
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={{ uri }}
        style={style}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      />
      
      {loading && showLoader && (
        <View style={[styles.loaderOverlay, style as ViewStyle]}>
          <ActivityIndicator color={loaderColor} size="small" />
        </View>
      )}
    </View>
  );
});

/**
 * Avatar Image - Yuvarlak profil fotoğrafı için özelleştirilmiş
 */
interface AvatarImageProps {
  uri: string | null | undefined;
  size?: number;
  name?: string;
  style?: ImageStyle;
  backgroundColor?: string;
  textColor?: string;
}

export const AvatarImage = memo<AvatarImageProps>(({
  uri,
  size = 50,
  name,
  style,
  backgroundColor = '#6366f1',
  textColor = '#fff'
}) => {
  const [error, setError] = useState(false);

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    overflow: 'hidden'
  };

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2
  };

  // URI yoksa veya hata varsa initials göster
  if (!uri || error) {
    const initials = name 
      ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : '?';

    return (
      <View 
        style={[
          containerStyle, 
          styles.initialsContainer, 
          { backgroundColor },
          style as ViewStyle
        ]}
        accessibilityLabel={`${name || 'Kullanıcı'} profil fotoğrafı`}
      >
        <Text style={[styles.initials, { color: textColor, fontSize: size * 0.4 }]}>
          {initials}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[imageStyle, style]}
      onError={() => setError(true)}
      accessibilityLabel={`${name || 'Kullanıcı'} profil fotoğrafı`}
    />
  );
});

/**
 * Thumbnail Image - Küçük resimler için optimized
 */
interface ThumbnailImageProps {
  uri: string | null | undefined;
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: ImageStyle;
}

export const ThumbnailImage = memo<ThumbnailImageProps>(({
  uri,
  width = 80,
  height = 60,
  borderRadius = 8,
  style
}) => {
  const [error, setError] = useState(false);

  if (!uri || error) {
    return (
      <View 
        style={[
          styles.thumbnailFallback, 
          { width, height, borderRadius },
          style as ViewStyle
        ]}
      >
        <Ionicons name="image-outline" size={24} color="#64748b" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[{ width, height, borderRadius }, style]}
      onError={() => setError(true)}
      resizeMode="cover"
    />
  );
});

// Text import for AvatarImage
import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  fallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  initials: {
    fontWeight: 'bold'
  },
  thumbnailFallback: {
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

OptimizedImage.displayName = 'OptimizedImage';
AvatarImage.displayName = 'AvatarImage';
ThumbnailImage.displayName = 'ThumbnailImage';

export default OptimizedImage;
