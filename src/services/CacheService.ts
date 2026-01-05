/**
 * Cache Service
 * Offline mode ve performans için veri önbellekleme
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../utils/logger';

// Cache yapılandırması
interface CacheConfig {
  ttl?: number; // Time to live (ms)
  maxSize?: number; // Maximum cache entries
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 dakika
const DEFAULT_MAX_SIZE = 100;
const CACHE_PREFIX = '@kodcum_cache_';

class CacheService {
  private memoryCache: Map<string, CacheEntry<any>> = new Map();
  private maxSize: number = DEFAULT_MAX_SIZE;

  constructor() {
    this.loadCacheFromStorage();
  }

  /**
   * Storage'dan cache'i yükle
   */
  private async loadCacheFromStorage(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(k => k.startsWith(CACHE_PREFIX));
      
      for (const key of cacheKeys.slice(0, this.maxSize)) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          const entry = JSON.parse(value) as CacheEntry<any>;
          const cacheKey = key.replace(CACHE_PREFIX, '');
          
          // TTL kontrolü
          if (!this.isExpired(entry)) {
            this.memoryCache.set(cacheKey, entry);
          } else {
            // Süresi dolmuş entry'yi sil
            await AsyncStorage.removeItem(key);
          }
        }
      }
      
      logger.log(`Cache loaded: ${this.memoryCache.size} entries`);
    } catch (error) {
      logger.error('Failed to load cache:', error);
    }
  }

  /**
   * Entry'nin süresinin dolup dolmadığını kontrol et
   */
  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() > entry.timestamp + entry.ttl;
  }

  /**
   * Cache'e veri kaydet
   */
  async set<T>(key: string, data: T, config: CacheConfig = {}): Promise<void> {
    const ttl = config.ttl ?? DEFAULT_TTL;
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl
    };

    // Memory cache
    this.memoryCache.set(key, entry);

    // Max size kontrolü
    if (this.memoryCache.size > this.maxSize) {
      const firstKey = this.memoryCache.keys().next().value;
      if (firstKey) {
        this.memoryCache.delete(firstKey);
        await AsyncStorage.removeItem(CACHE_PREFIX + firstKey);
      }
    }

    // AsyncStorage'a kaydet
    try {
      await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
    } catch (error) {
      logger.error('Failed to save cache:', error);
    }
  }

  /**
   * Cache'den veri getir
   */
  async get<T>(key: string): Promise<T | null> {
    // Memory cache'den dene
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry) {
      if (!this.isExpired(memoryEntry)) {
        return memoryEntry.data as T;
      }
      // Süresi dolmuş, sil
      this.memoryCache.delete(key);
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    // AsyncStorage'dan dene
    try {
      const stored = await AsyncStorage.getItem(CACHE_PREFIX + key);
      if (!stored) return null;

      const entry = JSON.parse(stored) as CacheEntry<T>;
      
      if (this.isExpired(entry)) {
        await AsyncStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }

      // Memory cache'e de ekle
      this.memoryCache.set(key, entry);
      return entry.data;
    } catch (error) {
      logger.error('Failed to get cache:', error);
      return null;
    }
  }

  /**
   * Cache-through: önce cache'e bak, yoksa fetch et ve cache'le
   */
  async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    config: CacheConfig = {}
  ): Promise<T> {
    // Önce cache'e bak
    const cached = await this.get<T>(key);
    if (cached !== null) {
      logger.log(`Cache hit: ${key}`);
      return cached;
    }

    // Cache miss, fetch et
    logger.log(`Cache miss: ${key}`);
    const data = await fetchFn();
    
    // Cache'le
    await this.set(key, data, config);
    
    return data;
  }

  /**
   * Belirli bir key'i sil
   */
  async remove(key: string): Promise<void> {
    this.memoryCache.delete(key);
    try {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
    } catch (error) {
      logger.error('Failed to remove cache:', error);
    }
  }

  /**
   * Belirli prefix ile başlayan tüm cache'leri sil
   */
  async removeByPrefix(prefix: string): Promise<void> {
    // Memory cache
    for (const key of this.memoryCache.keys()) {
      if (key.startsWith(prefix)) {
        this.memoryCache.delete(key);
      }
    }

    // AsyncStorage
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keysToRemove = keys.filter(k => 
        k.startsWith(CACHE_PREFIX + prefix)
      );
      await AsyncStorage.multiRemove(keysToRemove);
    } catch (error) {
      logger.error('Failed to remove cache by prefix:', error);
    }
  }

  /**
   * Tüm cache'i temizle
   */
  async clear(): Promise<void> {
    this.memoryCache.clear();

    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(k => k.startsWith(CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
      logger.log('Cache cleared');
    } catch (error) {
      logger.error('Failed to clear cache:', error);
    }
  }

  /**
   * Süresi dolmuş tüm entry'leri temizle
   */
  async cleanup(): Promise<number> {
    let cleaned = 0;

    // Memory cache
    for (const [key, entry] of this.memoryCache.entries()) {
      if (this.isExpired(entry)) {
        this.memoryCache.delete(key);
        await AsyncStorage.removeItem(CACHE_PREFIX + key);
        cleaned++;
      }
    }

    logger.log(`Cache cleanup: ${cleaned} entries removed`);
    return cleaned;
  }

  /**
   * Cache istatistikleri
   */
  async getStats(): Promise<{
    memorySize: number;
    storageSize: number;
    oldestEntry: number | null;
    newestEntry: number | null;
  }> {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(k => k.startsWith(CACHE_PREFIX));

    let oldestEntry: number | null = null;
    let newestEntry: number | null = null;

    for (const entry of this.memoryCache.values()) {
      if (oldestEntry === null || entry.timestamp < oldestEntry) {
        oldestEntry = entry.timestamp;
      }
      if (newestEntry === null || entry.timestamp > newestEntry) {
        newestEntry = entry.timestamp;
      }
    }

    return {
      memorySize: this.memoryCache.size,
      storageSize: cacheKeys.length,
      oldestEntry,
      newestEntry
    };
  }
}

export default new CacheService();
