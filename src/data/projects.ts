// Pratik Proje Sistemi - Kullanıcı sadece öğrendiklerini yazacak

export interface ProjectTask {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  baseCode: string; // Uygulama tarafından verilen temel kod
  userTask: string; // Kullanıcının yapması gereken
  hints: string[]; // İpuçları
  expectedCode: string; // Beklenen çözüm (kontrol için)
  xpReward: number;
}

// HTML Basic Projesi
export const htmlBasicProject: ProjectTask = {
  id: 'project-html-basic',
  lessonId: 'html-basic',
  title: 'İlk Web Sayfamı Oluşturuyorum',
  description: 'HTML temellerini kullanarak basit bir kişisel tanıtım sayfası yapacaksın.',
  difficulty: 'easy',
  baseCode: `<!DOCTYPE html>
<html>
<head>
    <title>Kişisel Sayfam</title>
</head>
<body>
    <!-- Buraya bir başlık ekle (h1) -->
    
    
    <!-- Buraya kendin hakkında bir paragraf yaz (p) -->
    
    
</body>
</html>`,
  userTask: `1. <h1> etiketi ile adını yaz
2. <p> etiketi ile kendin hakkında 2-3 cümle yaz
3. İkinci bir <p> ile hobilerinı anlat`,
  hints: [
    '<h1> etiketi en büyük başlık içindir',
    '<p> etiketi paragraf oluşturur',
    'Etiketleri <body> içine yazmalısın'
  ],
  expectedCode: `<!DOCTYPE html>
<html>
<head>
    <title>Kişisel Sayfam</title>
</head>
<body>
    <h1>___ANY___</h1>
    <p>___ANY___</p>
</body>
</html>`,
  xpReward: 20
};

// HTML Elements Projesi
export const htmlElementsProject: ProjectTask = {
  id: 'project-html-elements',
  lessonId: 'html-elements',
  title: 'Metin Biçimlendirme Ustası',
  description: 'Farklı HTML elementlerini kullanarak zengin bir metin sayfası oluştur.',
  difficulty: 'easy',
  baseCode: `<!DOCTYPE html>
<html>
<head>
    <title>Metin Biçimlendirme</title>
</head>
<body>
    <h1>HTML Elementleri</h1>
    
    <!-- Buraya kalın metin ekle (strong) -->
    
    
    <!-- Buraya vurgulu metin ekle (em) -->
    
    
    <!-- Buraya işaretlenmiş metin ekle (mark) -->
    
    
</body>
</html>`,
  userTask: `1. <strong> ile önemli bir bilgi yaz
2. <em> ile vurgulanmış bir cümle ekle
3. <mark> ile işaretlenmiş bir kelime yaz
4. <br> ile satır atla`,
  hints: [
    '<strong> kalın ve önemli metin yapar',
    '<em> italik ve vurgulu metin yapar',
    '<mark> metni vurgular (sarı arka plan)'
  ],
  expectedCode: `<!DOCTYPE html>
<html>
<head>
    <title>Metin Biçimlendirme</title>
</head>
<body>
    <h1>HTML Elementleri</h1>
    <strong>___ANY___</strong>
    <em>___ANY___</em>
    <mark>___ANY___</mark>
</body>
</html>`,
  xpReward: 25
};

// CSS Basic Projesi
export const cssBasicProject: ProjectTask = {
  id: 'project-css-basic',
  lessonId: 'css-basic',
  title: 'Renkli Sayfa Tasarımı',
  description: 'CSS ile sayfanı renklendir ve biçimlendir.',
  difficulty: 'easy',
  baseCode: `<!DOCTYPE html>
<html>
<head>
    <title>Renkli Sayfa</title>
    <style>
        /* Buraya CSS kodlarını yaz */
        
        
    </style>
</head>
<body>
    <h1>Başlığım</h1>
    <p>Bu bir paragraftır.</p>
</body>
</html>`,
  userTask: `1. h1 etiketinin rengini mavi yap (color)
2. p etiketinin arka plan rengini sarı yap (background-color)
3. body'nin yazı tipi boyutunu 18px yap (font-size)`,
  hints: [
    'CSS kuralları style etiketinin içine yazılır',
    'Sözdizimi: selector { property: value; }',
    'Renk isimleri kullanabilirsin (blue, yellow vb.)'
  ],
  expectedCode: `h1 {
    color: ___COLOR___;
}
p {
    background-color: ___COLOR___;
}`,
  xpReward: 30
};

// JavaScript Basic Projesi
export const javascriptBasicProject: ProjectTask = {
  id: 'project-javascript-basic',
  lessonId: 'javascript-basic',
  title: 'Hesap Makinesi',
  description: 'Değişkenler ve operatörler kullanarak basit hesaplamalar yap.',
  difficulty: 'medium',
  baseCode: `// Basit Hesap Makinesi
// İki sayı tanımla ve işlemler yap

// Buraya değişkenlerini tanımla


// Toplama işlemi


// Çıkarma işlemi


// Çarpma işlemi


// Bölme işlemi


console.log("Sonuçlar:", toplam, fark, carpim, bolum);`,
  userTask: `1. İki sayı değişkeni tanımla (let kullan)
2. Bu sayıların toplamını hesapla
3. Farkını hesapla
4. Çarpımını hesapla
5. Bölümünü hesapla`,
  hints: [
    'let anahtar kelimesiyle değişken tanımlanır',
    'Matematiksel operatörler: +, -, *, /',
    'Değişkenlere anlamlı isimler ver'
  ],
  expectedCode: `let sayi1 = ___NUMBER___;
let sayi2 = ___NUMBER___;
let toplam = sayi1 + sayi2;`,
  xpReward: 35
};

// Tüm projeler
export const projects: { [key: string]: ProjectTask } = {
  'html-basic': htmlBasicProject,
  'html-elements': htmlElementsProject,
  'css-basic': cssBasicProject,
  'javascript-basic': javascriptBasicProject,
};

// Proje tamamlama verisi için tip
export interface ProjectCompletion {
  projectId: string;
  lessonId: string;
  userCode: string;
  completedAt: string;
  passed: boolean;
}
