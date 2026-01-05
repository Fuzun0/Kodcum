import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBASX7qK1s05hoj_AldUyavYWIOpCSTS0s",
  authDomain: "kodcum-41b19.firebaseapp.com",
  projectId: "kodcum-41b19",
  storageBucket: "kodcum-41b19.firebasestorage.app",
  messagingSenderId: "402175493374",
  appId: "1:402175493374:web:f0131c779e2fb0adea91af",
  measurementId: "G-4JW4JJS27T"
};

// Initialize Firebase (sadece bir kez)
let app;
if (getApps().length === 0) {
  console.log('🔥 Firebase başlatılıyor...');
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase başarıyla başlatıldı');
} else {
  app = getApps()[0];
  console.log('ℹ️ Mevcut Firebase uygulaması kullanılıyor');
}

// Firebase Auth'u React Native'de devre dışı bırak (compat sorunları)
// Local AsyncStorage authentication kullanılacak
export const auth = null;

// Initialize Firebase Services (Firestore ve Storage için)
const db = getFirestore(app);
const storage = getStorage(app);

// Firebase bağlantı durumunu test et
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    console.log('🔌 Firebase bağlantısı test ediliyor...');
    if (!db) {
      console.error('❌ Firestore db objesi null');
      return false;
    }
    
    // Basit bir okuma denemesi yap
    const { doc, getDoc } = await import('firebase/firestore');
    const testRef = doc(db, '_test_', 'connection');
    await getDoc(testRef);
    console.log('✅ Firebase bağlantısı başarılı');
    return true;
  } catch (error: any) {
    // "not-found" hatası bile bağlantının çalıştığını gösterir
    if (error?.code === 'not-found' || error?.code === 'permission-denied') {
      console.log('✅ Firebase bağlantısı başarılı (döküman yok)');
      return true;
    }
    console.error('❌ Firebase bağlantı hatası:', error?.message || error);
    return false;
  }
};

export { db, storage };
export default app;