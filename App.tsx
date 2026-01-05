import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ProgressProvider } from './src/contexts/ProgressContext';
import { NotificationProvider } from './src/contexts/NotificationContext';
import Navigation from './src/navigation';
import ErrorBoundary from './src/components/ErrorBoundary';
import { DuelService } from './src/services/DuelService';

// Splash screen'i beklet (sadece native'de)
if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync();
}

// StatusBar wrapper component - tema değişikliklerine göre güncellenir
function AppContent() {
  const { theme } = useTheme();
  
  return (
    <>
      <Navigation />
      <StatusBar 
        style={theme.dark ? 'light' : 'dark'}
      />
    </>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(Platform.OS === 'web'); // Web'de direkt hazır

  useEffect(() => {
    async function prepare() {
      try {
        // Web'de font yüklemeye gerek yok
        if (Platform.OS !== 'web') {
          // Fontları yükle
          await Font.loadAsync({
            ...Ionicons.font,
          });
        }
        
        // 3 günden eski düello verilerini temizle
        DuelService.cleanOldDuelResults(3).then(result => {
          if (result.deleted > 0) {
            console.log(`🧹 ${result.deleted} eski düello kaydı temizlendi`);
          }
        }).catch(err => console.log('Düello temizleme hatası:', err));
        
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    if (Platform.OS !== 'web') {
      prepare();
    }
  }, []);

  useEffect(() => {
    if (appIsReady && Platform.OS !== 'web') {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <ProgressProvider>
                <NotificationProvider>
                  <AppContent />
                </NotificationProvider>
              </ProgressProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
