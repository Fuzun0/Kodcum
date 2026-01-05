import React, { useMemo, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { migrateUsersToFirestore, createUsersFromProgress, syncCurrentUserToFirestore } from '../utils/migrateUsersToFirestore';
import { lightHaptic } from '../utils/haptics';

const SettingsScreen = () => {
  const { theme } = useTheme();
  const { t, locale, setLocale } = useLanguage();

  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);

  const handleMigrateUsers = async () => {
    Alert.alert(
      'Kullanıcıları Firestore\'a Aktar',
      'AsyncStorage\'daki tüm kullanıcılar Firestore\'a aktarılacak. Devam edilsin mi?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Aktar',
          onPress: async () => {
            try {
              const result = await migrateUsersToFirestore();
              Alert.alert(
                'Başarılı',
                `${result.success} kullanıcı aktarıldı${result.error > 0 ? `, ${result.error} hata` : ''}`
              );
            } catch (error) {
              Alert.alert('Hata', 'Aktarım sırasında hata oluştu');
            }
          }
        }
      ]
    );
  };

  const handleSyncProfile = async () => {
    Alert.alert(
      'Profilimi Senkronize Et',
      'Profiliniz bulut\'a (Firestore) senkronize edilecek. Böylece diğer kullanıcılar sizi arkadaş olarak ekleyebilir. Devam edilsin mi?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Senkronize Et',
          onPress: async () => {
            try {
              const result = await syncCurrentUserToFirestore();
              if (result.success) {
                Alert.alert(
                  '✅ Başarılı',
                  `Profiliniz bulut\'a senkronize edildi.\n\nKullanıcı: ${result.user?.username}\nAd: ${result.user?.displayName}`
                );
              } else {
                Alert.alert('❌ Hata', result.error || 'Senkronizasyon başarısız oldu');
              }
            } catch (error) {
              Alert.alert('Hata', 'Senkronizasyon sırasında hata oluştu');
            }
          }
        }
      ]
    );
  };

  const handleCreateUsersFromProgress = async () => {
    Alert.alert(
      'Progress\'ten Users Oluştur',
      'Progress kaydı olan ama users profili olmayan kullanıcılar için profil oluşturulacak. Devam edilsin mi?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Oluştur',
          onPress: async () => {
            try {
              const result = await createUsersFromProgress();
              Alert.alert(
                'Başarılı',
                `${result.success} user profili oluşturuldu${result.error > 0 ? `, ${result.error} hata` : ''}`
              );
            } catch (error) {
              Alert.alert('Hata', 'Oluşturma sırasında hata oluştu');
            }
          }
        }
      ]
    );
  };

  const settingsGroups = [
    {
      title: 'Dil',
      items: [
        {
          id: 'language',
          icon: 'language',
          title: 'Dil / Language',
          type: 'select',
          value: locale === 'tr' ? 'Türkçe' : 'English',
          onPress: () => setLocale(locale === 'tr' ? 'en' : 'tr'),
        },
      ],
    },
    {
      title: 'Bildirimler',
      items: [
        {
          id: 'notifications',
          icon: 'notifications',
          title: 'Bildirimler',
          type: 'switch',
          value: true,
          onToggle: () => Alert.alert('Bilgi', 'Bu özellik yakında eklenecek.'),
        },
        {
          id: 'reminder',
          icon: 'alarm',
          title: 'Günlük Hatırlatıcı',
          type: 'switch',
          value: false,
          onToggle: () => Alert.alert('Bilgi', 'Bu özellik yakında eklenecek.'),
        },
      ],
    },
    {
      title: 'Hakkında',
      items: [
        {
          id: 'version',
          icon: 'information-circle',
          title: 'Versiyon',
          type: 'info',
          value: '1.0.0',
        },
        {
          id: 'privacy',
          icon: 'shield-checkmark',
          title: 'Gizlilik Politikası',
          type: 'link',
          onPress: () => Alert.alert('Gizlilik', 'Gizlilik politikası sayfası.'),
        },
        {
          id: 'terms',
          icon: 'document-text',
          title: 'Kullanım Koşulları',
          type: 'link',
          onPress: () => Alert.alert('Koşullar', 'Kullanım koşulları sayfası.'),
        },
        {
          id: 'contact',
          icon: 'mail',
          title: 'İletişim',
          type: 'link',
          onPress: () => Alert.alert('İletişim', 'kodcum@email.com'),
        },
      ],
    },
    {
      title: 'Geliştirici Araçları',
      items: [
        {
          id: 'sync_profile',
          icon: 'sync',
          title: 'Profilimi Bulut\'a Senkronize Et',
          type: 'link',
          onPress: handleSyncProfile,
        },
        {
          id: 'migrate_users',
          icon: 'cloud-upload',
          title: 'Kullanıcıları Firestore\'a Aktar',
          type: 'link',
          onPress: handleMigrateUsers,
        },
        {
          id: 'create_users',
          icon: 'people',
          title: 'Progress\'ten Users Oluştur',
          type: 'link',
          onPress: handleCreateUsersFromProgress,
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} accessibilityLabel="Ayarlar ekranı">
      {settingsGroups.map((group, groupIndex) => (
        <View key={groupIndex} style={styles.group} accessibilityRole="list">
          <Text style={styles.groupTitle} accessibilityRole="header">{group.title}</Text>
          <View style={styles.groupItems}>
            {group.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.item,
                  itemIndex === group.items.length - 1 && styles.lastItem,
                ]}
                onPress={() => {
                  lightHaptic();
                  if (item.type === 'select' || item.type === 'link') {
                    item.onPress?.();
                  }
                }}
                disabled={item.type === 'switch' || item.type === 'info'}
                accessibilityLabel={item.title}
                accessibilityRole={item.type === 'switch' ? 'switch' : 'button'}
                accessibilityState={item.type === 'switch' ? { checked: item.value as boolean } : undefined}
              >
                <View style={styles.itemLeft}>
                  <Ionicons 
                    name={item.icon as any} 
                    size={22} 
                    color={theme.colors.primary} 
                  />
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
                <View style={styles.itemRight}>
                  {item.type === 'switch' && (
                    <Switch
                      value={item.value as boolean}
                      onValueChange={item.onToggle}
                      trackColor={{ 
                        false: theme.colors.border, 
                        true: theme.colors.primary + '60' 
                      }}
                      thumbColor={item.value ? theme.colors.primary : theme.colors.textSecondary}
                    />
                  )}
                  {item.type === 'select' && (
                    <>
                      <Text style={styles.itemValue}>{item.value}</Text>
                      <Ionicons 
                        name="chevron-forward" 
                        size={20} 
                        color={theme.colors.textSecondary} 
                      />
                    </>
                  )}
                  {item.type === 'info' && (
                    <Text style={styles.itemValue}>{item.value}</Text>
                  )}
                  {item.type === 'link' && (
                    <Ionicons 
                      name="chevron-forward" 
                      size={20} 
                      color={theme.colors.textSecondary} 
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Kodcum © 2024</Text>
        <Text style={styles.footerText}>Made with ❤️</Text>
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  group: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  groupItems: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default SettingsScreen;
