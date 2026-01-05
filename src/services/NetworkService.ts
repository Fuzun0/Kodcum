/**
 * Network Service
 * Retry mekanizması ve offline kontrol içeren network yardımcıları
 */

import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import logger from '../utils/logger';

// Retry yapılandırması
interface RetryConfig {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  exponentialBackoff?: boolean;
}

const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  exponentialBackoff: true
};

// Sleep fonksiyonu
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Gecikme hesaplama (exponential backoff ile)
const calculateDelay = (attempt: number, config: Required<RetryConfig>): number => {
  if (!config.exponentialBackoff) {
    return config.baseDelay;
  }
  
  const delay = config.baseDelay * Math.pow(2, attempt);
  return Math.min(delay, config.maxDelay);
};

/**
 * Retry ile async fonksiyon çalıştır
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Son deneme değilse tekrar dene
      if (attempt < finalConfig.maxRetries) {
        const delay = calculateDelay(attempt, finalConfig);
        logger.warn(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`, error.message);
        await sleep(delay);
      }
    }
  }
  
  // Tüm denemeler başarısız
  logger.error('All retry attempts failed:', lastError?.message);
  throw lastError;
}

/**
 * Network durumunu kontrol et
 */
export async function checkNetworkStatus(): Promise<boolean> {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  } catch (error) {
    logger.error('Network check failed:', error);
    return false;
  }
}

/**
 * Network olmadığında uyarı göster
 */
export function showOfflineAlert(
  customMessage?: string,
  onRetry?: () => void
): void {
  Alert.alert(
    'İnternet Bağlantısı Yok',
    customMessage || 'Bu işlem için internet bağlantısı gerekiyor. Lütfen bağlantınızı kontrol edin.',
    onRetry 
      ? [
          { text: 'İptal', style: 'cancel' },
          { text: 'Tekrar Dene', onPress: onRetry }
        ]
      : [{ text: 'Tamam' }]
  );
}

/**
 * Fetch wrapper with retry
 */
export async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retryConfig?: RetryConfig
): Promise<Response> {
  // Önce network kontrolü
  const isConnected = await checkNetworkStatus();
  if (!isConnected) {
    throw new Error('No network connection');
  }
  
  return withRetry(async () => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      }
    });
    
    // HTTP hata durumlarında retry yap
    if (!response.ok && response.status >= 500) {
      throw new Error(`Server error: ${response.status}`);
    }
    
    return response;
  }, retryConfig);
}

/**
 * Network durumu değişikliklerini dinle
 */
export function subscribeToNetworkChanges(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  const unsubscribe = NetInfo.addEventListener(state => {
    if (state.isConnected) {
      onOnline();
    } else {
      onOffline();
    }
  });
  
  return unsubscribe;
}

/**
 * Timeout ile fetch
 */
export async function fetchWithTimeout(
  url: string,
  options?: RequestInit,
  timeout: number = 10000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

export default {
  withRetry,
  checkNetworkStatus,
  showOfflineAlert,
  fetchWithRetry,
  subscribeToNetworkChanges,
  fetchWithTimeout
};
