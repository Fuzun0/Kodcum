import React, { useRef } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { setNotificationNavigationRef } from '../contexts/NotificationContext';
import { RootStackParamList, MainTabParamList } from '../types';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LessonScreen from '../screens/LessonScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import CodeEditorScreen from '../screens/CodeEditorScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import LessonQuizScreen from '../screens/LessonQuizScreen';
import ProjectScreen from '../screens/ProjectScreen';
import DailyChallengeScreen from '../screens/DailyChallengeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ChatScreen from '../screens/ChatScreen';
import DuelScreen from '../screens/DuelScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import FriendProfileScreen from '../screens/FriendProfileScreen';
import MatchHistoryScreen from '../screens/MatchHistoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Ana tab navigasyonu
const MainTabs = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  // Kullanıcının baş harfini al
  const getInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <Tab.Navigator
      id="MainTabs"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Categories':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Social':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Progress':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'Profile':
              // Profil için özel görsel render
              if (user?.photoURL) {
                return (
                  <Image 
                    source={{ uri: user.photoURL }} 
                    style={{
                      width: size,
                      height: size,
                      borderRadius: size / 2,
                      borderWidth: focused ? 2 : 0,
                      borderColor: theme.colors.primary,
                    }} 
                  />
                );
              }
              return (
                <View style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor: focused ? theme.colors.primary : theme.colors.card,
                  borderWidth: 1,
                  borderColor: focused ? theme.colors.primary : theme.colors.border,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    fontSize: size * 0.5,
                    fontWeight: 'bold',
                    color: focused ? '#fff' : theme.colors.text,
                  }}>
                    {getInitial()}
                  </Text>
                </View>
              );
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 60 + insets.bottom, // Android navigation bar için dinamik yükseklik
          paddingBottom: insets.bottom, // Alt güvenli alan
          paddingTop: 8,
        },
        headerShown: false, // Header'ı kapat (font problemi için)
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: t('home') }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen}
        options={{ title: t('categories') }}
      />
      <Tab.Screen 
        name="Social" 
        component={FriendsScreen}
        options={{ title: 'Sosyal' }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{ title: t('progress') }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: t('profile') }}
      />
    </Tab.Navigator>
  );
};

// Ana navigasyon - Auth kontrolü ile
const Navigation = () => {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  if (loading) {
    return null; // veya bir loading ekranı
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 5 }]}>
      <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // Navigation hazır olduğunda bildirim sistemine ref'i aktar
        if (navigationRef.current) {
          setNotificationNavigationRef(navigationRef.current);
        }
      }}
      theme={{
        dark: theme.dark,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.primary,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
      <Stack.Navigator
        id="RootStack"
        screenOptions={{
          headerShown: false, // Tüm header'ları gizle (font problemi için)
        }}
      >
        {!user ? (
          // Kullanıcı giriş yapmamışsa login ekranı
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          // Kullanıcı giriş yapmışsa ana ekranlar
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Lesson" 
              component={LessonScreen}
              options={{ title: t('lesson') }}
            />
            <Stack.Screen 
              name="LessonDetail" 
              component={LessonDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="CodeEditor" 
              component={CodeEditorScreen}
              options={{ title: t('code_editor') }}
            />
            <Stack.Screen 
              name="Quiz" 
              component={QuizScreen}
              options={{ title: t('quiz') }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ title: t('settings') }}
            />
            <Stack.Screen 
              name="Achievements" 
              component={AchievementsScreen}
              options={{ title: t('achievements') }}
            />
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen}
              options={{ title: 'Profili Düzenle' }}
            />
            <Stack.Screen 
              name="LessonQuiz" 
              component={LessonQuizScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Project" 
              component={ProjectScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="DailyChallenge" 
              component={DailyChallengeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Duel" 
              component={DuelScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="AIAssistant" 
              component={AIAssistantScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="FriendProfile" 
              component={FriendProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="MatchHistory" 
              component={MatchHistoryScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigation;
