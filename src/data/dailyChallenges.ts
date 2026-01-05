// Daily Challenge Sistemi

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  task: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  starterCode: string;
  solution: string;
  xpReward: number;
  color?: string; // Challenge kartı rengi
}

// Günlük görevler havuzu
export const challengePool: DailyChallenge[] = [
  {
    id: 'challenge-1',
    date: '2025-12-17',
    title: '5 Farklı Başlık',
    description: 'Tüm HTML başlık etiketlerini kullan',
    task: 'h1\'den h6\'ya kadar tüm başlık etiketlerini kullanarak bir sayfa oluştur',
    difficulty: 'easy',
    category: 'HTML',
    starterCode: `<!DOCTYPE html>
<html>
<body>
    <!-- Buraya 6 farklı başlık ekle -->
    
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<body>
    <h1>Başlık 1</h1>
    <h2>Başlık 2</h2>
    <h3>Başlık 3</h3>
    <h4>Başlık 4</h4>
    <h5>Başlık 5</h5>
    <h6>Başlık 6</h6>
</body>
</html>`,
    xpReward: 15
  },
  {
    id: 'challenge-2',
    date: '2025-12-18',
    title: 'Renkli Buton',
    description: 'CSS ile şık bir buton tasarla',
    task: 'Mavi arkalı, beyaz yazılı, yuvarlak köşeli bir buton oluştur',
    difficulty: 'easy',
    category: 'CSS',
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .button {
            /* Buraya CSS yaz */
            
        }
    </style>
</head>
<body>
    <button class="button">Tıkla</button>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        .button {
            background-color: blue;
            color: white;
            border-radius: 10px;
            padding: 10px 20px;
            border: none;
        }
    </style>
</head>
<body>
    <button class="button">Tıkla</button>
</body>
</html>`,
    xpReward: 20
  },
  {
    id: 'challenge-3',
    date: '2025-12-19',
    title: 'Çift mi Tek mi?',
    description: 'Bir sayının çift mi tek mi olduğunu bul',
    task: 'Bir sayı değişkeni tanımla ve çift/tek kontrolü yap',
    difficulty: 'medium',
    category: 'JavaScript',
    starterCode: `// Bir sayı tanımla


// Çift mi tek mi kontrol et


console.log(sonuc);`,
    solution: `let sayi = 10;
let sonuc = sayi % 2 === 0 ? "Çift" : "Tek";
console.log(sonuc);`,
    xpReward: 25
  },
  {
    id: 'challenge-4',
    date: '2025-12-20',
    title: 'İsim Kartı',
    description: 'HTML ve CSS ile kişisel isim kartı oluştur',
    task: 'Adın, unvanın ve email adresini içeren bir kart tasarla',
    difficulty: 'medium',
    category: 'HTML/CSS',
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .card {
            /* Kart stilini yaz */
            
        }
    </style>
</head>
<body>
    <!-- İsim kartını oluştur -->
    
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        .card {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 10px;
            width: 300px;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Ahmet Yılmaz</h2>
        <p>Web Developer</p>
        <p>ahmet@email.com</p>
    </div>
</body>
</html>`,
    xpReward: 30
  },
  {
    id: 'challenge-5',
    date: '2025-12-21',
    title: 'Toplama Fonksiyonu',
    description: 'İki sayıyı toplayan fonksiyon yaz',
    task: 'Parametre alan ve toplama yapan bir fonksiyon oluştur',
    difficulty: 'medium',
    category: 'JavaScript',
    starterCode: `// Toplama fonksiyonu oluştur


// Fonksiyonu test et
console.log(topla(5, 3));`,
    solution: `function topla(a, b) {
    return a + b;
}
console.log(topla(5, 3));`,
    xpReward: 25
  }
];

// Bugünün görevini al - her gün aynı challenge gösterilir
export const getTodayChallenge = (): DailyChallenge => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Günün indeksini challenge sayısına böl (döngüsel)
  const challengeIndex = dayOfYear % challengePool.length;
  
  // Bugün için tutarlı bir challenge seç (rastgele değil)
  return { ...challengePool[challengeIndex], date: today.toISOString().split('T')[0] };
};

// Challenge tamamlama verisi için tip
export interface ChallengeCompletion {
  challengeId: string;
  date: string;
  userCode: string;
  completedAt: string;
  xpEarned: number;
}
