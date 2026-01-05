// Extended Quiz Definitions for ALL Lessons

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// ==================== HTML EXTENDED QUIZZES ====================

export const htmlAttributesQuiz: QuizQuestion[] = [
  { id: 1, question: 'HTML attribute nerede yazılır?', options: ['Kapanış etiketinde', 'Açılış etiketinde', 'İçerikte', 'Yorumda'], correctAnswer: 1, explanation: 'Attribute\'lar açılış etiketinin içinde yazılır: <tag attribute="value">' },
  { id: 2, question: 'href attribute hangi etikette kullanılır?', options: ['<img>', '<a>', '<p>', '<div>'], correctAnswer: 1, explanation: 'href attribute <a> etiketinde link adresi için kullanılır.' },
  { id: 3, question: 'src attribute ne işe yarar?', options: ['Kaynak yolu belirtir', 'Stil ekler', 'Script ekler', 'Link oluşturur'], correctAnswer: 0, explanation: 'src (source) attribute, resim veya script dosyasının yolunu belirtir.' },
  { id: 4, question: 'alt attribute neden önemlidir?', options: ['Zorunlu değil', 'Alternatif metin (erişilebilirlik)', 'Stil için', 'Link için'], correctAnswer: 1, explanation: 'alt attribute, görsel yüklenemediğinde veya ekran okuyucular için alternatif metin sağlar.' },
  { id: 5, question: 'class attribute hangi amaçla kullanılır?', options: ['ID tanımlar', 'CSS sınıfı tanımlar', 'JavaScript değişkeni', 'Link oluşturur'], correctAnswer: 1, explanation: 'class attribute, elementin CSS sınıfını belirler.' }
];

export const htmlHeadingsQuiz: QuizQuestion[] = [
  { id: 1, question: 'HTML\'de kaç başlık seviyesi vardır?', options: ['3', '4', '6', '8'], correctAnswer: 2, explanation: 'HTML\'de h1\'den h6\'ya kadar 6 başlık seviyesi vardır.' },
  { id: 2, question: 'Hangi başlık en büyüktür?', options: ['<h6>', '<h3>', '<h1>', '<header>'], correctAnswer: 2, explanation: '<h1> en büyük başlıktır, <h6> en küçüktür.' },
  { id: 3, question: 'Bir sayfada kaç tane h1 olmalıdır?', options: ['Sınırsız', '1 tane', '2-3 tane', 'Hiç olmamalı'], correctAnswer: 1, explanation: 'SEO ve erişilebilirlik için bir sayfada sadece 1 tane h1 önerilir.' },
  { id: 4, question: 'Başlık hiyerarşisi neden önemlidir?', options: ['Stil için', 'SEO ve erişilebilirlik için', 'Zorunlu', 'Hız için'], correctAnswer: 1, explanation: 'Doğru hiyerarşi SEO ve ekran okuyucular için önemlidir.' },
  { id: 5, question: 'h1\'den sonra hangi başlık gelmelidir?', options: ['h3', 'h2', 'h6', 'Fark etmez'], correctAnswer: 1, explanation: 'Başlıklar sırayla kullanılmalı: h1 → h2 → h3 şeklinde.' }
];

export const htmlParagraphsQuiz: QuizQuestion[] = [
  { id: 1, question: 'Paragraf etiketi hangisidir?', options: ['<para>', '<paragraph>', '<p>', '<text>'], correctAnswer: 2, explanation: '<p> etiketi paragraf oluşturur.' },
  { id: 2, question: '<br> etiketi ne işe yarar?', options: ['Paragraf oluşturur', 'Satır atlar', 'Boşluk ekler', 'Kalın yapar'], correctAnswer: 1, explanation: '<br> (line break) satır atlama için kullanılır.' },
  { id: 3, question: '<hr> etiketi ne yapar?', options: ['Başlık', 'Yatay çizgi', 'Paragraf', 'Link'], correctAnswer: 1, explanation: '<hr> (horizontal rule) yatay ayırıcı çizgi oluşturur.' },
  { id: 4, question: 'HTML\'de birden fazla boşluk nasıl gösterilir?', options: ['Hepsi gösterilir', 'Tek boşluk sayılır', 'Hiç gösterilmez', 'Tab olur'], correctAnswer: 1, explanation: 'HTML birden fazla boşluğu tek boşluk olarak gösterir.' },
  { id: 5, question: '&nbsp; ne işe yarar?', options: ['Satır atlar', 'Bölünmez boşluk (non-breaking space)', 'Paragraf', 'Tab'], correctAnswer: 1, explanation: '&nbsp; HTML entity\'si bölünmez boşluk ekler.' }
];

// KOTLIN QUIZZES

export const ktIntroMainQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kotlin hangi şirket tarafından geliştirilmiştir?',
    options: ['Google', 'JetBrains', 'Oracle', 'Microsoft'],
    correctAnswer: 1,
    explanation: 'Kotlin, JetBrains tarafından geliştirilmiş ve Google tarafından resmi Android dili olarak kabul edilmiştir.'
  },
  {
    id: 2,
    question: 'Kotlin programı hangi fonksiyonla başlar?',
    options: ['start()', 'main()', 'begin()', 'run()'],
    correctAnswer: 1,
    explanation: 'Her Kotlin programı main() fonksiyonu ile başlar.'
  },
  {
    id: 3,
    question: 'Ekrana yazdırmak için hangi fonksiyon kullanılır?',
    options: ['print()', 'println()', 'İkisi de', 'console.log()'],
    correctAnswer: 2,
    explanation: 'print() satır atlamadan, println() satır atlayarak yazdırır.'
  },
  {
    id: 4,
    question: 'Kotlin tek satırlık yorum nasıl yazılır?',
    options: ['# yorum', '// yorum', '/* yorum */', '<!-- yorum -->'],
    correctAnswer: 1,
    explanation: 'Kotlin\'de // ile tek satırlık yorum yazılır.'
  },
  {
    id: 5,
    question: 'Kotlin Java ile uyumlu mudur?',
    options: ['Evet, %100', 'Hayır', 'Kısmen', 'Sadece Android\'de'],
    correctAnswer: 0,
    explanation: 'Kotlin, Java ile %100 uyumludur (interoperable).'
  }
];

export const ktVariablesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'val ve var arasındaki fark nedir?',
    options: ['Fark yok', 'val değiştirilemez, var değiştirilebilir', 'var daha hızlı', 'val daha büyük'],
    correctAnswer: 1,
    explanation: 'val immutable (değiştirilemez), var mutable (değiştirilebilir).'
  },
  {
    id: 2,
    question: 'Hangi durumda val kullanmalıyız?',
    options: ['Her zaman', 'Değer değişmeyecekse', 'Asla', 'Sadece sayılar için'],
    correctAnswer: 1,
    explanation: 'Kotlin best practice: değer değişmeyecekse val kullanın (immutability).'
  },
  {
    id: 3,
    question: 'Kotlin tip çıkarımı yapar mı?',
    options: ['Evet', 'Hayır', 'Sadece Int', 'Sadece String'],
    correctAnswer: 0,
    explanation: 'Kotlin type inference (tip çıkarımı) yapabilir: val x = 5 // Int'
  },
  {
    id: 4,
    question: 'val isim: String = "Ali" doğru mu?',
    options: ['Evet', 'Hayır, tip gereksiz', 'Her ikisi de doğru', 'Syntax hatası'],
    correctAnswer: 2,
    explanation: 'Tip belirtmek opsiyoneldir, Kotlin tip çıkarımı yapar.'
  },
  {
    id: 5,
    question: 'var ile tanımlanan değişkenin tipi değişebilir mi?',
    options: ['Evet', 'Hayır, tip sabittir', 'Sadece Int-Double arası', 'Sadece null\'a'],
    correctAnswer: 1,
    explanation: 'var değiştirilebilir ama tip sabittir: var x = 5; x = "text" HATA!'
  }
];

export const ktDataTypesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kotlin\'de primitive tip var mıdır?',
    options: ['Evet', 'Hayır, hepsi object', 'Sadece Int', 'Sadece Boolean'],
    correctAnswer: 1,
    explanation: 'Kotlin\'de tüm tipler objedir, primitive tip yoktur.'
  },
  {
    id: 2,
    question: '42 hangi tiptedir?',
    options: ['Int', 'Long', 'Double', 'Number'],
    correctAnswer: 0,
    explanation: '42 varsayılan olarak Int tipindedir.'
  },
  {
    id: 3,
    question: '3.14 hangi tiptedir?',
    options: ['Float', 'Double', 'Decimal', 'Real'],
    correctAnswer: 1,
    explanation: 'Ondalıklı sayılar varsayılan olarak Double tipindedir.'
  },
  {
    id: 4,
    question: 'Boolean değerleri nelerdir?',
    options: ['0 ve 1', 'true ve false', 'yes ve no', 'on ve off'],
    correctAnswer: 1,
    explanation: 'Boolean: true veya false değerlerini alır.'
  },
  {
    id: 5,
    question: 'Char tek tırnak mı çift tırnak mı kullanır?',
    options: ['Tek tırnak \'a\'', 'Çift tırnak "a"', 'Her ikisi', 'Backtick `a`'],
    correctAnswer: 0,
    explanation: 'Char tek tırnak kullanır: \'a\', String çift tırnak: "abc"'
  }
];

export const ktStringTemplatesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'String interpolation nasıl yapılır?',
    options: ['$değişken', '%değişken', '#değişken', '&değişken'],
    correctAnswer: 0,
    explanation: 'Kotlin\'de $değişken veya ${ifade} ile string interpolation yapılır.'
  },
  {
    id: 2,
    question: '"Merhaba $isim" geçerli mi?',
    options: ['Evet', 'Hayır', 'Sadece println\'de', 'Sadece val\'de'],
    correctAnswer: 0,
    explanation: '$değişken_adı ile string içinde değişken kullanılabilir.'
  },
  {
    id: 3,
    question: 'İfade değerlendirmesi nasıl yapılır?',
    options: ['$(ifade)', '${ifade}', '$[ifade]', '$<ifade>'],
    correctAnswer: 1,
    explanation: '${ifade} ile string içinde ifadeler değerlendirilebilir: "${x + y}"'
  },
  {
    id: 4,
    question: 'Raw string (çok satırlı) nasıl tanımlanır?',
    options: ['""" metin """', '\'\'\' metin \'\'\'', '<<< metin >>>', '### metin ###'],
    correctAnswer: 0,
    explanation: 'Triple quotes """ ile raw/multi-line string tanımlanır.'
  },
  {
    id: 5,
    question: '"Sayı: ${x * 2}" çalışır mı?',
    options: ['Evet', 'Hayır', 'Sadece Int', 'Syntax hatası'],
    correctAnswer: 0,
    explanation: '${} içinde herhangi bir Kotlin ifadesi yazılabilir.'
  }
];

export const ktConditionalsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kotlin\'de if bir expression mıdır?',
    options: ['Evet, değer döner', 'Hayır, sadece statement', 'Bazen', 'Sadece else ile'],
    correctAnswer: 0,
    explanation: 'Kotlin\'de if bir expression\'dır, değer döner: val max = if (a > b) a else b'
  },
  {
    id: 2,
    question: 'Ternary operator (?:) var mı?',
    options: ['Evet', 'Hayır, if-else kullanılır', 'Sadece nullable', 'Sadece when'],
    correctAnswer: 1,
    explanation: 'Kotlin\'de ternary operator yok, if-else expression kullanılır.'
  },
  {
    id: 3,
    question: 'if-else expression\'da else zorunlu mu?',
    options: ['Evet', 'Hayır', 'Sadece değer dönüyorsa evet', 'Sadece val\'de'],
    correctAnswer: 2,
    explanation: 'if expression olarak kullanılıyorsa (değer dönüyorsa) else zorunludur.'
  },
  {
    id: 4,
    question: 'Birden fazla koşul nasıl kontrol edilir?',
    options: ['&& ve ||', 'AND ve OR', 'and ve or', 'Hepsi'],
    correctAnswer: 0,
    explanation: '&& (ve), || (veya), ! (değil) operatörleri kullanılır.'
  },
  {
    id: 5,
    question: 'if bloğu süslü parantez gerektir mi?',
    options: ['Evet her zaman', 'Tek satırsa gerekmiyor', 'Hayır hiç', 'Sadece else\'de'],
    correctAnswer: 1,
    explanation: 'Tek satır kod varsa süslü parantez opsiyoneldir.'
  }
];

export const ktNullSafetyQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kotlin\'de null safety nedir?',
    options: ['Null olabilir/olamaz ayrımı', 'Null kullanılamaz', 'Her şey null', 'Sadece var null'],
    correctAnswer: 0,
    explanation: 'Kotlin, nullable (?) ve non-nullable tipleri ayırır, NullPointerException önler.'
  },
  {
    id: 2,
    question: 'String? ne anlama gelir?',
    options: ['Optional String', 'Null olabilir String', 'String veya null', 'Hepsi doğru'],
    correctAnswer: 3,
    explanation: 'String? nullable (null olabilir) String demektir.'
  },
  {
    id: 3,
    question: 'Safe call operator nedir?',
    options: ['!!', '?.', '?:', '!?'],
    correctAnswer: 1,
    explanation: '?. safe call operator: null ise null döner, değilse işlem yapar.'
  },
  {
    id: 4,
    question: 'Elvis operator nedir?',
    options: ['?.', '!!', '?:', '?='],
    correctAnswer: 2,
    explanation: '?: elvis operator: null ise sağ tarafı döner: x ?: 0'
  },
  {
    id: 5,
    question: '!! ne işe yarar?',
    options: ['Safe call', 'Null assertion (zorla non-null)', 'Elvis', 'Null check'],
    correctAnswer: 1,
    explanation: '!! null assertion: "Kesinlikle null değil" der, null ise exception fırlatır.'
  }
];

export const ktLoopsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'for döngüsü nasıl yazılır?',
    options: ['for (i in 1..10)', 'for i = 1 to 10', 'for (int i = 0; i < 10; i++)', 'foreach i in 1..10'],
    correctAnswer: 0,
    explanation: 'Kotlin\'de for döngüsü: for (i in 1..10) şeklinde yazılır.'
  },
  {
    id: 2,
    question: 'while ve do-while aynı mı?',
    options: ['Evet', 'Hayır, do-while en az 1 kez çalışır', 'while yoktur', 'do-while yoktur'],
    correctAnswer: 1,
    explanation: 'while koşulu kontrol eder sonra çalışır, do-while önce çalışır sonra kontrol eder.'
  },
  {
    id: 3,
    question: 'repeat(5) ne yapar?',
    options: ['Hata', '5 kez tekrarlar', 'Sadece array', 'Sonsuz döngü'],
    correctAnswer: 1,
    explanation: 'repeat(n) { } bloğu n kez çalıştırır.'
  },
  {
    id: 4,
    question: 'break ne işe yarar?',
    options: ['Döngüyü durdurur', 'Devam eder', 'Sadece siler', 'Return eder'],
    correctAnswer: 0,
    explanation: 'break döngüden çıkar, continue sonraki iterasyona atlar.'
  },
  {
    id: 5,
    question: 'Array üzerinde for nasıl dönülür?',
    options: ['for (item in array)', 'for item of array', 'for (int i)', 'forEach array'],
    correctAnswer: 0,
    explanation: 'for (item in array) ile array elemanlarında gezinilir.'
  }
];

export const ktRangesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: '1..10 ne anlama gelir?',
    options: ['1\'den 10\'a kadar (10 dahil)', '1\'den 10\'a (10 hariç)', 'Hata', 'Array'],
    correctAnswer: 0,
    explanation: '1..10 closed range (kapalı aralık): 1, 2, 3, ..., 10'
  },
  {
    id: 2,
    question: '1 until 10 ne anlama gelir?',
    options: ['1\'den 10\'a (10 dahil)', '1\'den 10\'a (10 hariç)', 'Hata', 'Sonsuz'],
    correctAnswer: 1,
    explanation: '1 until 10: 1, 2, 3, ..., 9 (10 hariç)'
  },
  {
    id: 3,
    question: 'downTo ne işe yarar?',
    options: ['Artan', 'Azalan range', 'Hata', 'Double range'],
    correctAnswer: 1,
    explanation: '10 downTo 1 azalan range oluşturur: 10, 9, 8, ..., 1'
  },
  {
    id: 4,
    question: 'step ne işe yarar?',
    options: ['Adım atlama', 'Durdurma', 'Başlangıç', 'Bitiş'],
    correctAnswer: 0,
    explanation: '1..10 step 2: 1, 3, 5, 7, 9 (2\'şer atlayarak)'
  },
  {
    id: 5,
    question: 'in operatörü ne yapar?',
    options: ['Range içinde mi kontrol eder', 'For döngüsü', 'Ekleme', 'Silme'],
    correctAnswer: 0,
    explanation: 'x in 1..10 ile x\'in range içinde olup olmadığı kontrol edilir.'
  }
];

export const ktFunctionsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Fonksiyon nasıl tanımlanır?',
    options: ['fun fonksiyon()', 'function fonksiyon()', 'def fonksiyon()', 'func fonksiyon()'],
    correctAnswer: 0,
    explanation: 'Kotlin\'de fun anahtar kelimesi ile fonksiyon tanımlanır.'
  },
  {
    id: 2,
    question: 'Return tipi nasıl belirtilir?',
    options: ['fun f(): Int', 'fun f() -> Int', 'fun f(): Int =', 'Int fun f()'],
    correctAnswer: 0,
    explanation: 'fun fonksiyon(): DönüşTipi şeklinde return tipi belirtilir.'
  },
  {
    id: 3,
    question: 'Unit nedir?',
    options: ['Void (return yok)', 'Int', 'String', 'Boolean'],
    correctAnswer: 0,
    explanation: 'Unit, Java\'daki void gibi, değer dönmeyen fonksiyonlar için.'
  },
  {
    id: 4,
    question: 'Single-expression function nasıl yazılır?',
    options: ['fun f() = 5', 'fun f() { 5 }', 'fun f(): 5', 'fun f() => 5'],
    correctAnswer: 0,
    explanation: 'Tek ifadeli fonksiyon: fun double(x: Int) = x * 2'
  },
  {
    id: 5,
    question: 'Default parameter değeri verilebilir mi?',
    options: ['Evet', 'Hayır', 'Sadece Int', 'Sadece String'],
    correctAnswer: 0,
    explanation: 'fun greet(name: String = "Guest") şeklinde default değer verilebilir.'
  }
];

export const ktArraysListsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Array ve List farkı nedir?',
    options: ['Array sabit boyut, List değişken', 'Aynı', 'Array daha hızlı', 'List daha büyük'],
    correctAnswer: 0,
    explanation: 'Array fixed size, List (MutableList) dynamic size.'
  },
  {
    id: 2,
    question: 'arrayOf ne yapar?',
    options: ['Array oluşturur', 'List oluşturur', 'Set oluşturur', 'Map oluşturur'],
    correctAnswer: 0,
    explanation: 'arrayOf(1, 2, 3) ile array oluşturulur.'
  },
  {
    id: 3,
    question: 'listOf ve mutableListOf farkı nedir?',
    options: ['listOf read-only, mutableListOf değiştirilebilir', 'Aynı', 'listOf daha hızlı', 'mutableListOf daha büyük'],
    correctAnswer: 0,
    explanation: 'listOf immutable (read-only), mutableListOf mutable (add/remove edilebilir).'
  },
  {
    id: 4,
    question: 'Array elemanına nasıl erişilir?',
    options: ['array[index]', 'array(index)', 'array.get(index)', 'Hepsi'],
    correctAnswer: 3,
    explanation: 'array[0] veya array.get(0) ile erişilir, ikisi de geçerli.'
  },
  {
    id: 5,
    question: 'List\'e eleman nasıl eklenir?',
    options: ['list.add(item)', 'list.push(item)', 'list.append(item)', 'list += item'],
    correctAnswer: 0,
    explanation: 'mutableList.add(item) ile eleman eklenir.'
  }
];

export const ktMapSetQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Map nedir?',
    options: ['Key-Value çifti', 'Array', 'List', 'Set'],
    correctAnswer: 0,
    explanation: 'Map, key-value çiftlerini depolar: mapOf("isim" to "Ali")'
  },
  {
    id: 2,
    question: 'mapOf ve mutableMapOf farkı nedir?',
    options: ['mapOf read-only, mutableMapOf değiştirilebilir', 'Aynı', 'mapOf daha hızlı', 'Fark yok'],
    correctAnswer: 0,
    explanation: 'mapOf immutable, mutableMapOf mutable (put/remove edilebilir).'
  },
  {
    id: 3,
    question: 'Set nedir?',
    options: ['Benzersiz elemanlar', 'Sıralı liste', 'Key-value', 'Array'],
    correctAnswer: 0,
    explanation: 'Set, tekrar eden elemanları içermez, her eleman benzersizdir.'
  },
  {
    id: 4,
    question: 'Map\'e eleman nasıl eklenir?',
    options: ['map[key] = value', 'map.put(key, value)', 'map += key to value', 'Hepsi'],
    correctAnswer: 3,
    explanation: 'mutableMap[key] = value, map.put(key, value), map += key to value hepsi geçerli.'
  },
  {
    id: 5,
    question: '"isim" to "Ali" ne yapar?',
    options: ['Pair oluşturur', 'Map oluşturur', 'Set oluşturur', 'Hata'],
    correctAnswer: 0,
    explanation: 'to infix function ile Pair<K, V> oluşturulur, mapOf içinde kullanılır.'
  }
];

export const ktWhenQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'when nedir?',
    options: ['Switch-case benzeri', 'Loop', 'Fonksiyon', 'Değişken'],
    correctAnswer: 0,
    explanation: 'when, Java\'daki switch-case\'in daha güçlü versiyonudur.'
  },
  {
    id: 2,
    question: 'when bir expression mıdır?',
    options: ['Evet, değer döner', 'Hayır', 'Bazen', 'Sadece else ile'],
    correctAnswer: 0,
    explanation: 'when bir expression\'dır, değer döner: val result = when(x) { ... }'
  },
  {
    id: 3,
    question: 'when else zorunlu mu?',
    options: ['Expression ise evet', 'Hayır hiç', 'Her zaman', 'Sadece Int'],
    correctAnswer: 0,
    explanation: 'when expression olarak kullanılıyorsa else zorunludur.'
  },
  {
    id: 4,
    question: 'when birden fazla değer kontrol edebilir mi?',
    options: ['Evet, 1, 2 -> "küçük"', 'Hayır', 'Sadece OR ile', 'Sadece range'],
    correctAnswer: 0,
    explanation: 'when (x) { 1, 2, 3 -> "küçük" } şeklinde virgülle ayırarak yazılır.'
  },
  {
    id: 5,
    question: 'when range kontrol edebilir mi?',
    options: ['Evet, in 1..10 ->', 'Hayır', 'Sadece if', 'Sadece Int'],
    correctAnswer: 0,
    explanation: 'when (x) { in 1..10 -> "küçük" } ile range kontrolü yapılır.'
  }
];

export const ktClassObjectQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Class nasıl tanımlanır?',
    options: ['class Kisi', 'Class Kisi', 'class kisi', 'struct Kisi'],
    correctAnswer: 0,
    explanation: 'class Kisi { } şeklinde class tanımlanır.'
  },
  {
    id: 2,
    question: 'Object nasıl oluşturulur?',
    options: ['val k = Kisi()', 'val k = new Kisi()', 'Kisi k = new Kisi()', 'let k = Kisi()'],
    correctAnswer: 0,
    explanation: 'Kotlin\'de new anahtar kelimesi yoktur: val obj = ClassName()'
  },
  {
    id: 3,
    question: 'Property nasıl tanımlanır?',
    options: ['var isim: String', 'String isim', 'property isim', 'let isim'],
    correctAnswer: 0,
    explanation: 'Class içinde var/val ile property tanımlanır.'
  },
  {
    id: 4,
    question: 'Method nasıl tanımlanır?',
    options: ['fun method()', 'function method()', 'def method()', 'method()'],
    correctAnswer: 0,
    explanation: 'Class içinde fun ile method tanımlanır.'
  },
  {
    id: 5,
    question: 'this ne anlama gelir?',
    options: ['Mevcut object referansı', 'Class referansı', 'Yeni object', 'Null'],
    correctAnswer: 0,
    explanation: 'this, mevcut object\'in kendisini referans eder.'
  }
];

export const ktConstructorQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Primary constructor nerede tanımlanır?',
    options: ['Class header\'da', 'Class body\'de', 'Fonksiyonda', 'Hiçbiri'],
    correctAnswer: 0,
    explanation: 'Primary constructor class adından sonra yazılır: class Kisi(val isim: String)'
  },
  {
    id: 2,
    question: 'Secondary constructor nasıl tanımlanır?',
    options: ['constructor()', 'init()', 'fun constructor()', '__init__()'],
    correctAnswer: 0,
    explanation: 'Secondary constructor class body\'de constructor() ile tanımlanır.'
  },
  {
    id: 3,
    question: 'init bloğu ne zaman çalışır?',
    options: ['Object oluşturulurken', 'Method çağrılınca', 'Property erişilince', 'Hiç'],
    correctAnswer: 0,
    explanation: 'init { } bloğu primary constructor\'dan sonra, object oluşturulurken çalışır.'
  },
  {
    id: 4,
    question: 'Primary constructor property tanımlayabilir mi?',
    options: ['Evet, val/var ile', 'Hayır', 'Sadece var', 'Sadece val'],
    correctAnswer: 0,
    explanation: 'class Kisi(val isim: String) ile hem constructor hem property tanımlanır.'
  },
  {
    id: 5,
    question: 'Default constructor parametresi verilebilir mi?',
    options: ['Evet', 'Hayır', 'Sadece Int', 'Sadece String'],
    correctAnswer: 0,
    explanation: 'class Kisi(val isim: String = "Adsız") default değer verilir.'
  }
];

export const ktDataClassesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Data class nedir?',
    options: ['Veri taşıyan class', 'Normal class', 'Abstract class', 'Interface'],
    correctAnswer: 0,
    explanation: 'data class, otomatik equals, hashCode, toString, copy generate eder.'
  },
  {
    id: 2,
    question: 'Data class nasıl tanımlanır?',
    options: ['data class Kisi', 'class data Kisi', 'dataclass Kisi', 'struct Kisi'],
    correctAnswer: 0,
    explanation: 'data class Kisi(val isim: String) şeklinde tanımlanır.'
  },
  {
    id: 3,
    question: 'Data class hangi metodları otomatik oluşturur?',
    options: ['equals, hashCode, toString, copy', 'Sadece toString', 'Sadece equals', 'Hiçbiri'],
    correctAnswer: 0,
    explanation: 'data class otomatik equals(), hashCode(), toString(), copy(), componentN() oluşturur.'
  },
  {
    id: 4,
    question: 'copy() ne işe yarar?',
    options: ['Object kopyası oluşturur', 'Siler', 'Değiştirir', 'Karşılaştırır'],
    correctAnswer: 0,
    explanation: 'copy() ile bazı property\'ler değiştirilerek yeni object oluşturulur.'
  },
  {
    id: 5,
    question: 'Data class primary constructor\'da en az kaç parametre olmalı?',
    options: ['En az 1', 'En az 2', 'Sınır yok', '0 olabilir'],
    correctAnswer: 0,
    explanation: 'Data class primary constructor\'da en az 1 val/var parametre olmalı.'
  }
];

export const ktInheritanceQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kotlin\'de class\'lar varsayılan olarak nasıldır?',
    options: ['final (inherit edilemez)', 'open (inherit edilebilir)', 'abstract', 'sealed'],
    correctAnswer: 0,
    explanation: 'Kotlin\'de class\'lar varsayılan final\'dır, inherit için open olmalı.'
  },
  {
    id: 2,
    question: 'open ne işe yarar?',
    options: ['Class\'ı inherit edilebilir yapar', 'Object oluşturur', 'Siler', 'Kapatır'],
    correctAnswer: 0,
    explanation: 'open class ClassName ile class inherit edilebilir hale gelir.'
  },
  {
    id: 3,
    question: 'Inherit nasıl yapılır?',
    options: ['class B : A()', 'class B extends A', 'class B(A)', 'class B -> A'],
    correctAnswer: 0,
    explanation: 'class Child : Parent() şeklinde inherit edilir (: işareti).'
  },
  {
    id: 4,
    question: 'override ne işe yarar?',
    options: ['Parent metodunu ezme', 'Yeni metod', 'Silme', 'Kopyalama'],
    correctAnswer: 0,
    explanation: 'override fun method() ile parent class\'ın metodu ezilir.'
  },
  {
    id: 5,
    question: 'super ne anlama gelir?',
    options: ['Parent class referansı', 'Child class', 'this', 'Yeni object'],
    correctAnswer: 0,
    explanation: 'super parent class\'ı referans eder: super.method()'
  }
];

export const ktInterfaceQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Interface nedir?',
    options: ['Metodların sözleşmesi', 'Class', 'Object', 'Variable'],
    correctAnswer: 0,
    explanation: 'Interface, implement edilmesi gereken metodların blueprint\'idir.'
  },
  {
    id: 2,
    question: 'Interface nasıl tanımlanır?',
    options: ['interface Isim', 'class Isim', 'struct Isim', 'protocol Isim'],
    correctAnswer: 0,
    explanation: 'interface InterfaceName { fun method() } şeklinde tanımlanır.'
  },
  {
    id: 3,
    question: 'Interface implement nasıl edilir?',
    options: ['class A : B', 'class A implements B', 'class A extends B', 'class A -> B'],
    correctAnswer: 0,
    explanation: 'class ClassName : InterfaceName ile implement edilir (inherit ile aynı syntax).'
  },
  {
    id: 4,
    question: 'Interface property tanımlayabilir mi?',
    options: ['Evet, ama implementation yok', 'Hayır', 'Sadece val', 'Sadece var'],
    correctAnswer: 0,
    explanation: 'Interface property tanımlayabilir ama değer vermez, implement eden class verir.'
  },
  {
    id: 5,
    question: 'Interface default implementation olabilir mi?',
    options: ['Evet', 'Hayır', 'Sadece property', 'Sadece metod'],
    correctAnswer: 0,
    explanation: 'Kotlin interface\'leri default metod implementation\'ı içerebilir.'
  }
];

export const ktAbstractQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Abstract class nedir?',
    options: ['Tam olmayan, implement edilmesi gereken class', 'Normal class', 'Interface', 'Data class'],
    correctAnswer: 0,
    explanation: 'abstract class, incomplete class\'tır, instance oluşturulamaz.'
  },
  {
    id: 2,
    question: 'Abstract class\'tan object oluşturulabilir mi?',
    options: ['Hayır', 'Evet', 'Bazen', 'Sadece val'],
    correctAnswer: 0,
    explanation: 'abstract class\'tan direkt object oluşturulamaz, inherit edilmeli.'
  },
  {
    id: 3,
    question: 'Abstract method nedir?',
    options: ['Gövdesi olmayan metod', 'Normal metod', 'Static metod', 'Private metod'],
    correctAnswer: 0,
    explanation: 'abstract fun method(): Int - gövdesi yok, child class implement eder.'
  },
  {
    id: 4,
    question: 'Abstract class concrete method içerebilir mi?',
    options: ['Evet', 'Hayır', 'Sadece abstract', 'Hiçbiri'],
    correctAnswer: 0,
    explanation: 'abstract class hem abstract hem concrete (normal) metodlar içerebilir.'
  },
  {
    id: 5,
    question: 'abstract ile interface farkı nedir?',
    options: ['abstract class state tutar, interface tutmaz', 'Aynı', 'interface daha hızlı', 'abstract daha büyük'],
    correctAnswer: 0,
    explanation: 'abstract class constructor ve state (property değerleri) tutabilir, interface tutamaz.'
  }
];

export const ktExtensionsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Extension function nedir?',
    options: ['Mevcut class\'a fonksiyon ekleme', 'Yeni class', 'Interface', 'Abstract'],
    correctAnswer: 0,
    explanation: 'Extension function ile mevcut class\'lara (String, Int vb.) yeni fonksiyonlar eklenebilir.'
  },
  {
    id: 2,
    question: 'Extension function nasıl tanımlanır?',
    options: ['fun String.method()', 'String fun method()', 'fun method(String)', 'extension String.method()'],
    correctAnswer: 0,
    explanation: 'fun ClassName.methodName() { } şeklinde extension tanımlanır.'
  },
  {
    id: 3,
    question: 'Extension property tanımlanabilir mi?',
    options: ['Evet', 'Hayır', 'Sadece val', 'Sadece var'],
    correctAnswer: 0,
    explanation: 'val ClassName.propertyName get() = ... şeklinde extension property tanımlanır.'
  },
  {
    id: 4,
    question: 'Extension function class\'ı değiştirir mi?',
    options: ['Hayır, sadece dışarıdan fonksiyon ekler', 'Evet, class değişir', 'Bazen', 'Sadece val'],
    correctAnswer: 0,
    explanation: 'Extension orijinal class\'ı değiştirmez, dışarıdan fonksiyon ekler.'
  },
  {
    id: 5,
    question: 'Extension function this ne referanslar?',
    options: ['Extension yapılan object', 'Extension fonksiyonu', 'Yeni object', 'Null'],
    correctAnswer: 0,
    explanation: 'Extension içinde this, extension yapılan object\'i (receiver) referanslar.'
  }
];

export const ktScopeFunctionsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Scope function nedir?',
    options: ['Object scope\'unda kod çalıştırma', 'Normal fonksiyon', 'Loop', 'Class'],
    correctAnswer: 0,
    explanation: 'Scope functions: let, run, with, apply, also - object context\'inde kod çalıştırır.'
  },
  {
    id: 2,
    question: 'let ne işe yarar?',
    options: ['Lambda çalıştırır, it ile referans', 'Object oluşturur', 'Siler', 'Kopyalar'],
    correctAnswer: 0,
    explanation: 'let { } bloğunda object "it" ile referans edilir, null check için kullanılır.'
  },
  {
    id: 3,
    question: 'apply ne döner?',
    options: ['Object\'in kendisi', 'Lambda sonucu', 'Null', 'Unit'],
    correctAnswer: 0,
    explanation: 'apply { } bloğu object\'i configure eder ve object\'in kendisini döner.'
  },
  {
    id: 4,
    question: 'run ne döner?',
    options: ['Lambda sonucu', 'Object', 'Null', 'Unit'],
    correctAnswer: 0,
    explanation: 'run { } bloğu lambda sonucunu döner.'
  },
  {
    id: 5,
    question: 'also ne işe yarar?',
    options: ['Yan işlemler için (logging), object döner', 'Object değiştirir', 'Siler', 'Kopyalar'],
    correctAnswer: 0,
    explanation: 'also { } bloğunda "it" ile object\'e erişilir, yan işlemler yapılır, object döner.'
  }
];

export const ktLambdaQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Lambda expression nedir?',
    options: ['Anonim fonksiyon', 'Normal fonksiyon', 'Class', 'Variable'],
    correctAnswer: 0,
    explanation: 'Lambda, anonim fonksiyonlardır: { x, y -> x + y }'
  },
  {
    id: 2,
    question: 'Lambda nasıl tanımlanır?',
    options: ['{ parametreler -> kod }', '(parametreler) => kod', 'lambda parametreler', 'func() {}'],
    correctAnswer: 0,
    explanation: '{ x: Int, y: Int -> x + y } şeklinde lambda tanımlanır.'
  },
  {
    id: 3,
    question: 'Tek parametreli lambda\'da it nedir?',
    options: ['Otomatik parametre adı', 'Keyword', 'Değişken', 'Fonksiyon'],
    correctAnswer: 0,
    explanation: 'Tek parametreli lambda\'da parametre adı belirtilmezse "it" kullanılır.'
  },
  {
    id: 4,
    question: 'Higher-order function nedir?',
    options: ['Parametre veya return olarak fonksiyon alan', 'Normal fonksiyon', 'Lambda', 'Class'],
    correctAnswer: 0,
    explanation: 'Higher-order function, fonksiyonu parametre olarak alır veya döner.'
  },
  {
    id: 5,
    question: 'map, filter, reduce nedir?',
    options: ['Higher-order collection functions', 'Loop', 'Class', 'Variable'],
    correctAnswer: 0,
    explanation: 'map { }, filter { }, reduce { } collection\'lar üzerinde lambda ile işlem yapar.'
  }
];

// PYTHON QUIZZES
export const pyPrintVariablesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Python\'da ekrana yazı yazdırmak için hangi fonksiyon kullanılır?',
    options: ['echo()', 'print()', 'write()', 'console.log()'],
    correctAnswer: 1,
    explanation: 'Python\'da print() fonksiyonu ekrana çıktı vermek için kullanılır.'
  },
  {
    id: 2,
    question: 'Python\'da değişken tanımlarken tip belirtmek gerekir mi?',
    options: ['Evet', 'Hayır', 'Sadece string', 'Sadece int'],
    correctAnswer: 1,
    explanation: 'Python dinamik tipli bir dildir, değişken tipi otomatik belirlenir.'
  },
  {
    id: 3,
    question: 'Birden fazla değişkeni aynı anda yazdırmak için?',
    options: ['print(a + b)', 'print(a, b)', 'print(a) print(b)', 'console.log(a, b)'],
    correctAnswer: 1,
    explanation: 'print(a, b, c) şeklinde virgülle ayırarak birden fazla değer yazdırılabilir.'
  },
  {
    id: 4,
    question: 'Değişken ismi sayı ile başlayabilir mi?',
    options: ['Evet', 'Hayır', 'Sadece 0 ile', 'Sadece 1 ile'],
    correctAnswer: 1,
    explanation: 'Değişken isimleri sayı ile başlayamaz, harf veya _ ile başlamalı.'
  },
  {
    id: 5,
    question: 'Python\'da yorum satırı nasıl yazılır?',
    options: ['// yorum', '/* yorum */', '# yorum', '<!-- yorum -->'],
    correctAnswer: 2,
    explanation: 'Python\'da # işareti ile tek satırlık yorum yazılır.'
  }
];

export const pyDataTypesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Python\'da kaç temel veri tipi vardır?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    explanation: 'Temel veri tipleri: int, float, str, bool (4 tanedir, ancak genelde 3\'ü anlatılır: int, float, str)'
  },
  {
    id: 2,
    question: '3.14 hangi veri tipindedir?',
    options: ['int', 'float', 'str', 'double'],
    correctAnswer: 1,
    explanation: 'Ondalıklı sayılar float (floating point) tipindedir.'
  },
  {
    id: 3,
    question: 'type() fonksiyonu ne işe yarar?',
    options: ['Tip değiştirme', 'Tip öğrenme', 'Tip silme', 'Tip kopyalama'],
    correctAnswer: 1,
    explanation: 'type() fonksiyonu ile değişkenin veri tipini öğrenebiliriz.'
  },
  {
    id: 4,
    question: 'String (metin) hangi işaretlerle tanımlanır?',
    options: ['Sadece " "', 'Sadece \' \'', 'Her ikisi de', '< >'],
    correctAnswer: 2,
    explanation: 'Python\'da string hem "çift tırnak" hem \'tek tırnak\' ile tanımlanabilir.'
  },
  {
    id: 5,
    question: '42 hangi veri tipindedir?',
    options: ['float', 'int', 'str', 'number'],
    correctAnswer: 1,
    explanation: 'Tam sayılar int (integer) tipindedir.'
  }
];

export const pyTypeConversionQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'String\'i integer\'a çevirmek için hangi fonksiyon kullanılır?',
    options: ['str()', 'int()', 'float()', 'convert()'],
    correctAnswer: 1,
    explanation: 'int() fonksiyonu string veya float\'u integer\'a çevirir.'
  },
  {
    id: 2,
    question: 'int("3.14") sonucu ne olur?',
    options: ['3', '3.14', 'Hata verir', '4'],
    correctAnswer: 2,
    explanation: 'int() direkt olarak ondalıklı string\'i çeviremez, önce float() sonra int() kullanılmalı.'
  },
  {
    id: 3,
    question: 'Sayıyı string\'e çevirmek için?',
    options: ['int()', 'str()', 'toString()', 'string()'],
    correctAnswer: 1,
    explanation: 'str() fonksiyonu her tipi string\'e çevirir.'
  },
  {
    id: 4,
    question: 'float("42") sonucu ne olur?',
    options: ['42', '42.0', 'Hata', '"42.0"'],
    correctAnswer: 1,
    explanation: 'float() string sayıyı float\'a çevirir: 42.0'
  },
  {
    id: 5,
    question: 'Tip dönüşümüne ne denir?',
    options: ['Type casting', 'Converting', 'Changing', 'Transforming'],
    correctAnswer: 0,
    explanation: 'Veri tipini değiştirmeye type casting veya type conversion denir.'
  }
];

export const pyArithmeticQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: '10 / 3 işleminin sonucu nedir?',
    options: ['3', '3.33...', '3.0', '4'],
    correctAnswer: 1,
    explanation: 'Python 3\'te / operatörü her zaman float sonuç verir: 3.333...'
  },
  {
    id: 2,
    question: '10 // 3 işleminin sonucu nedir?',
    options: ['3.33', '3', '3.0', '4'],
    correctAnswer: 1,
    explanation: '// operatörü floor division (taban bölme), ondalığı atar: 3'
  },
  {
    id: 3,
    question: '10 % 3 işleminin sonucu nedir?',
    options: ['3', '1', '0', '10'],
    correctAnswer: 1,
    explanation: '% (modulo) operatörü bölme işleminden kalanı verir: 10 / 3 = 3 kalan 1'
  },
  {
    id: 4,
    question: '2 ** 3 işleminin sonucu nedir?',
    options: ['5', '6', '8', '9'],
    correctAnswer: 2,
    explanation: '** operatörü üs alma işlemidir: 2^3 = 8'
  },
  {
    id: 5,
    question: 'İşlem öncelik sıralaması doğru olanı hangisidir?',
    options: ['+ - * /', '* / + -', '** * / + -', '+ - ** * /'],
    correctAnswer: 2,
    explanation: 'Öncelik sırası: ** (üs) > * / // % > + -'
  }
];

export const pyInputQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kullanıcıdan veri almak için hangi fonksiyon kullanılır?',
    options: ['get()', 'input()', 'read()', 'scanf()'],
    correctAnswer: 1,
    explanation: 'input() fonksiyonu kullanıcıdan veri almak için kullanılır.'
  },
  {
    id: 2,
    question: 'input() fonksiyonu her zaman hangi tipte veri döner?',
    options: ['int', 'float', 'str', 'Değişir'],
    correctAnswer: 2,
    explanation: 'input() her zaman string (str) olarak veri döner.'
  },
  {
    id: 3,
    question: 'Kullanıcıdan sayı almak için ne yapmalıyız?',
    options: ['input()', 'int(input())', 'number(input())', 'input(int)'],
    correctAnswer: 1,
    explanation: 'input() string döndüğü için sayı almak için int(input()) kullanılır.'
  },
  {
    id: 4,
    question: 'input("Adın: ") ne işe yarar?',
    options: ['Hata verir', 'Kullanıcıya mesaj gösterir', 'Adını kaydeder', 'Print yapar'],
    correctAnswer: 1,
    explanation: 'input() içindeki mesaj kullanıcıya prompt (istem) olarak gösterilir.'
  },
  {
    id: 5,
    question: 'float(input()) ne için kullanılır?',
    options: ['String almak', 'Integer almak', 'Ondalıklı sayı almak', 'Hata verir'],
    correctAnswer: 2,
    explanation: 'float(input()) kullanıcıdan ondalıklı sayı almak için kullanılır.'
  }
];

// PYTHON FINAL QUIZ
export const pyFinalQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Python yorumlanan (interpreted) bir dil midir?',
    options: ['Evet', 'Hayır', 'Bazen', 'Derlenmiş'],
    correctAnswer: 0,
    explanation: 'Python yorumlanan bir dildir, kod satır satır çalıştırılır.'
  },
  {
    id: 2,
    question: 'Python\'da indentasyon (girinti) neden önemlidir?',
    options: ['Stil için', 'Kod bloklarını belirler', 'Hız için', 'Opsiyonel'],
    correctAnswer: 1,
    explanation: 'Python\'da indentasyon kod bloklarını belirler, zorunludur.'
  },
  {
    id: 3,
    question: 'List ile Tuple arasındaki fark nedir?',
    options: ['Fark yok', 'List değiştirilebilir, Tuple değiştirilemez', 'Tuple daha hızlı', 'List daha büyük'],
    correctAnswer: 1,
    explanation: 'List mutable (değiştirilebilir), Tuple immutable (değiştirilemez).'
  },
  {
    id: 4,
    question: 'Dictionary key-value çifti saklar mı?',
    options: ['Evet', 'Hayır', 'Sadece key', 'Sadece value'],
    correctAnswer: 0,
    explanation: 'Dictionary, key-value çiftlerini saklar: {key: value}'
  },
  {
    id: 5,
    question: 'for döngüsü hangi veri yapıları üzerinde çalışır?',
    options: ['Sadece list', 'Sadece string', 'Iterable tüm yapılar', 'Sadece int'],
    correctAnswer: 2,
    explanation: 'for döngüsü iterable (tekrarlanabilir) tüm yapılarda çalışır: list, tuple, string, dict vb.'
  }
];

export const kotlinFinalQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kotlin hangi platformda çalışır?',
    options: ['Sadece Android', 'JVM, Android, iOS, Web', 'Sadece iOS', 'Sadece Web'],
    correctAnswer: 1,
    explanation: 'Kotlin multiplatform bir dildir: JVM, Android, iOS, JavaScript ve Native destekler.'
  },
  {
    id: 2,
    question: 'Kotlin null-safe bir dil midir?',
    options: ['Evet', 'Hayır', 'Bazen', 'Opsiyonel'],
    correctAnswer: 0,
    explanation: 'Kotlin, null-safety özelliği ile null pointer hatalarını önler.'
  },
  {
    id: 3,
    question: 'var ve val arasındaki fark nedir?',
    options: ['Fark yok', 'var değiştirilebilir, val değiştirilemez', 'val daha hızlı', 'var daha güvenli'],
    correctAnswer: 1,
    explanation: 'var (variable) değiştirilebilir, val (value) değiştirilemez (immutable).'
  },
  {
    id: 4,
    question: 'Kotlin\'de fonksiyon tanımlamak için hangi anahtar kelime kullanılır?',
    options: ['function', 'def', 'fun', 'func'],
    correctAnswer: 2,
    explanation: 'Kotlin\'de fun anahtar kelimesi ile fonksiyon tanımlanır.'
  },
  {
    id: 5,
    question: 'data class ne işe yarar?',
    options: ['Database', 'Veri tutmak için özel class', 'API', 'UI'],
    correctAnswer: 1,
    explanation: 'data class, veri tutmak için özel class\'tır, otomatik equals, hashCode, toString sağlar.'
  }
];

// SWIFT SECTION QUIZZES

export const swPlaygroundQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Swift hangi platform için geliştirilmiştir?',
    options: ['Android', 'Apple (iOS, macOS, watchOS, tvOS)', 'Windows', 'Linux'],
    correctAnswer: 1,
    explanation: 'Swift, Apple ekosistemi için geliştirilmiş modern bir dildir.'
  },
  {
    id: 2,
    question: 'Playground ne işe yarar?',
    options: ['Kod yazıp anında test etme ortamı', 'IDE', 'Compiler', 'Debugger'],
    correctAnswer: 0,
    explanation: 'Playground, Swift kodu yazıp anında sonuç görebileceğiniz interaktif bir ortamdır.'
  },
  {
    id: 3,
    question: 'print() ne işe yarar?',
    options: ['Konsola yazdırma', 'Dosyaya yazma', 'Ekrana çizim', 'Hata fırlatma'],
    correctAnswer: 0,
    explanation: 'print() fonksiyonu konsola çıktı verir.'
  },
  {
    id: 4,
    question: 'Swift compiled mi interpreted mi?',
    options: ['Compiled', 'Interpreted', 'Her ikisi', 'Hiçbiri'],
    correctAnswer: 0,
    explanation: 'Swift compiled (derlenmiş) bir dildir, hızlı çalışır.'
  },
  {
    id: 5,
    question: 'Swift hangi yıl piyasaya sürüldü?',
    options: ['2010', '2012', '2014', '2016'],
    correctAnswer: 2,
    explanation: 'Swift, Apple tarafından 2014\'te tanıtıldı.'
  }
];

export const swVariablesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'var ve let farkı nedir?',
    options: ['var değiştirilebilir, let sabit', 'Aynı', 'let daha hızlı', 'var daha güvenli'],
    correctAnswer: 0,
    explanation: 'var (variable) değiştirilebilir, let (constant) sabittir.'
  },
  {
    id: 2,
    question: 'let ile tanımlanan değer değiştirilebilir mi?',
    options: ['Hayır', 'Evet', 'Bazen', 'Sadece Int'],
    correctAnswer: 0,
    explanation: 'let constant (sabit) tanımlar, değiştirilemez.'
  },
  {
    id: 3,
    question: 'Swift tip çıkarımı yapar mı?',
    options: ['Evet', 'Hayır', 'Sadece Int', 'Sadece String'],
    correctAnswer: 0,
    explanation: 'Swift type inference (tip çıkarımı) yapar: let x = 5 // Int'
  },
  {
    id: 4,
    question: 'Değişken isimleri sayı ile başlayabilir mi?',
    options: ['Hayır', 'Evet', 'Sadece 0', 'Sadece 1'],
    correctAnswer: 0,
    explanation: 'Değişken isimleri harf veya _ ile başlamalı, sayı ile başlayamaz.'
  },
  {
    id: 5,
    question: 'var name: String = "Ali" doğru mu?',
    options: ['Evet', 'Hayır, tip gereksiz', 'Her ikisi de doğru', 'Syntax hatası'],
    correctAnswer: 2,
    explanation: 'Tip belirtmek opsiyoneldir, Swift tip çıkarımı yapar.'
  }
];

export const swDataTypesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: '42 hangi tiptedir?',
    options: ['Int', 'Double', 'Float', 'Number'],
    correctAnswer: 0,
    explanation: 'Tam sayılar varsayılan olarak Int tipindedir.'
  },
  {
    id: 2,
    question: '3.14 hangi tiptedir?',
    options: ['Float', 'Double', 'Decimal', 'Real'],
    correctAnswer: 1,
    explanation: 'Ondalıklı sayılar varsayılan olarak Double tipindedir.'
  },
  {
    id: 3,
    question: 'Bool değerleri nelerdir?',
    options: ['0 ve 1', 'true ve false', 'yes ve no', 'on ve off'],
    correctAnswer: 1,
    explanation: 'Bool: true veya false değerlerini alır.'
  },
  {
    id: 4,
    question: 'Character tek tırnak mı çift tırnak mı?',
    options: ['Çift tırnak "a"', 'Tek tırnak \'a\'', 'Her ikisi', 'Backtick `a`'],
    correctAnswer: 0,
    explanation: 'Swift\'te hem Char hem String çift tırnak kullanır, tip inference\'a göre belirlenir.'
  },
  {
    id: 5,
    question: 'Swift statically typed mı?',
    options: ['Evet', 'Hayır', 'Bazen', 'Opsiyonel'],
    correctAnswer: 0,
    explanation: 'Swift statically typed\'dır, compile-time\'da tipler belirlenir.'
  }
];

export const swStringInterpolationQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'String interpolation nasıl yapılır?',
    options: ['\\(değişken)', '$(değişken)', '#{değişken}', '%değişken'],
    correctAnswer: 0,
    explanation: 'Swift\'te \\(değişken) ile string interpolation yapılır.'
  },
  {
    id: 2,
    question: '"Merhaba \\(isim)" geçerli mi?',
    options: ['Evet', 'Hayır', 'Sadece print\'te', 'Sadece var\'da'],
    correctAnswer: 0,
    explanation: '\\(değişken) ile string içinde değişken kullanılabilir.'
  },
  {
    id: 3,
    question: 'İfade değerlendirmesi yapılabilir mi?',
    options: ['Evet, \\(ifade)', 'Hayır', 'Sadece değişken', 'Sadece sayı'],
    correctAnswer: 0,
    explanation: '\\(x + y) gibi ifadeler string içinde değerlendirilebilir.'
  },
  {
    id: 4,
    question: 'Multi-line string nasıl yazılır?',
    options: ['""" metin """', '\'\'\' metin \'\'\'', '<<< metin >>>', '### metin ###'],
    correctAnswer: 0,
    explanation: 'Triple quotes """ ile multi-line string yazılır.'
  },
  {
    id: 5,
    question: '"Sonuç: \\(x * 2)" çalışır mı?',
    options: ['Evet', 'Hayır', 'Sadece Int', 'Syntax hatası'],
    correctAnswer: 0,
    explanation: '\\() içinde herhangi bir Swift expression yazılabilir.'
  }
];

export const swOperatorsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Arithmetic operatörler nelerdir?',
    options: ['+, -, *, /, %', 'AND, OR, NOT', '==, !=, <, >', '&&, ||, !'],
    correctAnswer: 0,
    explanation: 'Aritmetik: + (toplama), - (çıkarma), * (çarpma), / (bölme), % (mod)'
  },
  {
    id: 2,
    question: '5 % 2 sonucu nedir?',
    options: ['1', '2', '2.5', '0'],
    correctAnswer: 0,
    explanation: '% (mod) operatörü bölüm kalanını verir: 5 % 2 = 1'
  },
  {
    id: 3,
    question: 'Comparison operatörler nelerdir?',
    options: ['==, !=, <, >, <=, >=', '+, -, *, /', '&&, ||', '&, |'],
    correctAnswer: 0,
    explanation: 'Karşılaştırma: == (eşit), != (eşit değil), <, >, <=, >='
  },
  {
    id: 4,
    question: 'Logical operatörler nelerdir?',
    options: ['&&, ||, !', '&, |, ^', 'AND, OR, NOT', '==, !='],
    correctAnswer: 0,
    explanation: 'Mantıksal: && (ve), || (veya), ! (değil)'
  },
  {
    id: 5,
    question: 'x += 5 ne anlama gelir?',
    options: ['x = x + 5', 'x = 5', 'x + 5', 'x == 5'],
    correctAnswer: 0,
    explanation: '+= compound assignment: x += 5 aslında x = x + 5 demektir.'
  }
];

export const swArraysQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Array nasıl tanımlanır?',
    options: ['var array = [1, 2, 3]', 'var array = {1, 2, 3}', 'Array array = [1, 2, 3]', 'let array = (1, 2, 3)'],
    correctAnswer: 0,
    explanation: 'Array köşeli parantezle tanımlanır: var arr = [1, 2, 3]'
  },
  {
    id: 2,
    question: 'Array elemanına nasıl erişilir?',
    options: ['array[index]', 'array(index)', 'array.get(index)', 'array{index}'],
    correctAnswer: 0,
    explanation: 'array[0] ile ilk elemana erişilir (0-indexed).'
  },
  {
    id: 3,
    question: 'Array\'e eleman nasıl eklenir?',
    options: ['array.append(item)', 'array.add(item)', 'array.push(item)', 'array += item'],
    correctAnswer: 0,
    explanation: 'append() metodu ile array sonuna eleman eklenir.'
  },
  {
    id: 4,
    question: 'Array uzunluğu nasıl bulunur?',
    options: ['array.count', 'array.length', 'array.size', 'array.len()'],
    correctAnswer: 0,
    explanation: 'count property ile array uzunluğu bulunur.'
  },
  {
    id: 5,
    question: 'Empty array nasıl oluşturulur?',
    options: ['var arr = [Int]()', 'var arr = []', 'Her ikisi', 'Array.empty()'],
    correctAnswer: 2,
    explanation: 'var arr: [Int] = [] veya var arr = [Int]() ile empty array oluşturulur.'
  }
];

export const swDictionariesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Dictionary nedir?',
    options: ['Key-Value çifti', 'Array', 'List', 'Set'],
    correctAnswer: 0,
    explanation: 'Dictionary, key-value çiftlerini depolar.'
  },
  {
    id: 2,
    question: 'Dictionary nasıl tanımlanır?',
    options: ['var dict = ["key": "value"]', 'var dict = {"key": "value"}', 'var dict = ("key": "value")', 'var dict = <"key": "value">'],
    correctAnswer: 0,
    explanation: '["key": "value"] şeklinde dictionary tanımlanır.'
  },
  {
    id: 3,
    question: 'Dictionary value\'ya nasıl erişilir?',
    options: ['dict["key"]', 'dict("key")', 'dict.get("key")', 'dict{"key"}'],
    correctAnswer: 0,
    explanation: 'dict["key"] ile value\'ya erişilir (Optional döner).'
  },
  {
    id: 4,
    question: 'Dictionary\'ye eleman nasıl eklenir?',
    options: ['dict["key"] = value', 'dict.add(key, value)', 'dict.put(key, value)', 'dict += key: value'],
    correctAnswer: 0,
    explanation: 'dict["newKey"] = value ile yeni eleman eklenir.'
  },
  {
    id: 5,
    question: 'Dictionary eleman sayısı nasıl bulunur?',
    options: ['dict.count', 'dict.length', 'dict.size', 'dict.len()'],
    correctAnswer: 0,
    explanation: 'count property ile dictionary eleman sayısı bulunur.'
  }
];

export const swSetsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Set nedir?',
    options: ['Benzersiz elemanlar', 'Sıralı liste', 'Key-value', 'Array'],
    correctAnswer: 0,
    explanation: 'Set, tekrar eden elemanları içermez, her eleman benzersizdir.'
  },
  {
    id: 2,
    question: 'Set nasıl tanımlanır?',
    options: ['var set: Set = [1, 2, 3]', 'var set = {1, 2, 3}', 'var set = (1, 2, 3)', 'var set = <1, 2, 3>'],
    correctAnswer: 0,
    explanation: 'Set<Type> veya var set: Set = [values] ile tanımlanır.'
  },
  {
    id: 3,
    question: 'Set\'e eleman nasıl eklenir?',
    options: ['set.insert(item)', 'set.add(item)', 'set.append(item)', 'set += item'],
    correctAnswer: 0,
    explanation: 'insert() metodu ile set\'e eleman eklenir.'
  },
  {
    id: 4,
    question: 'Set tekrar eden elemanları kabul eder mi?',
    options: ['Hayır', 'Evet', 'Bazen', 'Sadece Int'],
    correctAnswer: 0,
    explanation: 'Set benzersiz elemanlar içerir, tekrar ekleme işlemi yok sayılır.'
  },
  {
    id: 5,
    question: 'Set sıralı mı?',
    options: ['Hayır, unordered', 'Evet, ordered', 'Bazen', 'Ekleme sırasına göre'],
    correctAnswer: 0,
    explanation: 'Set unordered (sırasız)dır, array gibi index\'le erişilemez.'
  }
];

export const swControlFlowQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'if-else syntax\'ı nasıldır?',
    options: ['if condition { } else { }', 'if (condition) { } else { }', 'Her ikisi', 'if condition then'],
    correctAnswer: 2,
    explanation: 'Swift\'te parantez opsiyoneldir: if x > 5 { } veya if (x > 5) { }'
  },
  {
    id: 2,
    question: 'Swift\'te ternary operator var mı?',
    options: ['Evet: condition ? true : false', 'Hayır', 'Sadece if-else', 'Sadece switch'],
    correctAnswer: 0,
    explanation: 'let result = x > 5 ? "büyük" : "küçük"'
  },
  {
    id: 3,
    question: 'switch case\'de break gerekli mi?',
    options: ['Hayır, otomatik break', 'Evet her zaman', 'Bazen', 'Sadece default'],
    correctAnswer: 0,
    explanation: 'Swift\'te switch case\'ler otomatik break olur (fallthrough yok).'
  },
  {
    id: 4,
    question: 'switch default zorunlu mu?',
    options: ['Tüm durumlar kapsanmazsa evet', 'Hayır hiç', 'Her zaman', 'Sadece Int'],
    correctAnswer: 0,
    explanation: 'switch exhaustive (kapsamlı) olmalı, tüm durumlar kapsanmalı veya default olmalı.'
  },
  {
    id: 5,
    question: 'switch range kontrol edebilir mi?',
    options: ['Evet: case 1...10:', 'Hayır', 'Sadece if', 'Sadece değer'],
    correctAnswer: 0,
    explanation: 'case 1...10: ile range kontrolü yapılabilir.'
  }
];

export const swLoopsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'for-in döngüsü nasıl yazılır?',
    options: ['for i in 1...10 { }', 'for (i = 1; i <= 10; i++) { }', 'for i = 1 to 10 { }', 'foreach i in 1...10 { }'],
    correctAnswer: 0,
    explanation: 'for i in 1...10 { } ile döngü oluşturulur.'
  },
  {
    id: 2,
    question: 'while ve repeat-while farkı nedir?',
    options: ['repeat-while en az 1 kez çalışır', 'Aynı', 'while yoktur', 'repeat yoktur'],
    correctAnswer: 0,
    explanation: 'while koşulu kontrol eder sonra çalışır, repeat-while önce çalışır sonra kontrol eder.'
  },
  {
    id: 3,
    question: 'stride() ne işe yarar?',
    options: ['Adım atlayarak döngü', 'Normal döngü', 'Sonsuz döngü', 'Break'],
    correctAnswer: 0,
    explanation: 'stride(from: 0, to: 10, by: 2) ile adım atlayarak döngü: 0, 2, 4, 6, 8'
  },
  {
    id: 4,
    question: 'break ne işe yarar?',
    options: ['Döngüyü durdurur', 'Devam eder', 'Atlar', 'Return eder'],
    correctAnswer: 0,
    explanation: 'break döngüden çıkar, continue sonraki iterasyona atlar.'
  },
  {
    id: 5,
    question: 'Array üzerinde for nasıl dönülür?',
    options: ['for item in array { }', 'for (item of array) { }', 'for item: array { }', 'forEach array'],
    correctAnswer: 0,
    explanation: 'for item in array { } ile array elemanlarında gezinilir.'
  }
];

export const swFunctionsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Fonksiyon nasıl tanımlanır?',
    options: ['func functionName()', 'function functionName()', 'def functionName()', 'fun functionName()'],
    correctAnswer: 0,
    explanation: 'func anahtar kelimesi ile fonksiyon tanımlanır.'
  },
  {
    id: 2,
    question: 'Return tipi nasıl belirtilir?',
    options: ['func f() -> Int', 'func f(): Int', 'Int func f()', 'func f() returns Int'],
    correctAnswer: 0,
    explanation: 'func functionName() -> ReturnType şeklinde return tipi belirtilir.'
  },
  {
    id: 3,
    question: 'Void fonksiyon nasıl tanımlanır?',
    options: ['func f() veya func f() -> Void', 'func f(): void', 'void func f()', 'func f() -> nil'],
    correctAnswer: 0,
    explanation: 'Return tipi belirtilmezse veya -> Void yazılırsa değer dönmez.'
  },
  {
    id: 4,
    question: 'Parametre default değeri alabilir mi?',
    options: ['Evet', 'Hayır', 'Sadece Int', 'Sadece String'],
    correctAnswer: 0,
    explanation: 'func greet(name: String = "Guest") şeklinde default değer verilebilir.'
  },
  {
    id: 5,
    question: 'Birden fazla değer nasıl döndürülür?',
    options: ['Tuple kullanarak', 'Array', 'Dict', 'Döndürülemez'],
    correctAnswer: 0,
    explanation: 'func f() -> (Int, String) { return (42, "text") } ile tuple döndürülür.'
  }
];

export const swParameterNamesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Argument label nedir?',
    options: ['Fonksiyon çağrısında kullanılan dış isim', 'İç parametre adı', 'Return tipi', 'Değişken'],
    correctAnswer: 0,
    explanation: 'func greet(to name: String) - "to" argument label, "name" parameter adı.'
  },
  {
    id: 2,
    question: '_ (underscore) ne işe yarar?',
    options: ['Argument label\'ı gizler', 'Değişken tanımlar', 'Yorum', 'Hata'],
    correctAnswer: 0,
    explanation: 'func greet(_ name: String) - çağrırken: greet("Ali") (label yok)'
  },
  {
    id: 3,
    question: 'Default argument label nedir?',
    options: ['Parametre adının kendisi', 'Yok', 'func adı', '_'],
    correctAnswer: 0,
    explanation: 'func greet(name: String) - çağrılırken: greet(name: "Ali")'
  },
  {
    id: 4,
    question: 'inout parametre ne işe yarar?',
    options: ['Parametreyi değiştirme', 'Read-only', 'Copy', 'Null'],
    correctAnswer: 0,
    explanation: 'inout parametre, fonksiyon içinde değiştirilen değerin dışarıya yansımasını sağlar.'
  },
  {
    id: 5,
    question: 'Variadic parametre nedir?',
    options: ['Değişken sayıda parametre', 'Tek parametre', 'Optional', 'Tuple'],
    correctAnswer: 0,
    explanation: 'func sum(_ numbers: Int...) - sum(1, 2, 3, 4, 5) gibi çağrılır.'
  }
];

export const swOptionalsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Optional nedir?',
    options: ['Nil olabilecek değer', 'Zorunlu değer', 'Array', 'Tuple'],
    correctAnswer: 0,
    explanation: 'Optional, nil (null) olabilecek değerleri temsil eder: String?'
  },
  {
    id: 2,
    question: 'String? ne anlama gelir?',
    options: ['Nil olabilir String', 'String array', 'Tuple', 'Required String'],
    correctAnswer: 0,
    explanation: 'String? nil veya String değeri tutabilir.'
  },
  {
    id: 3,
    question: 'nil nedir?',
    options: ['Değer yok (null)', 'Sıfır', 'Boş string', 'False'],
    correctAnswer: 0,
    explanation: 'nil, "değer yok" anlamına gelir (Java/JS\'deki null gibi).'
  },
  {
    id: 4,
    question: 'Optional unwrapping nedir?',
    options: ['Optional\'dan değer çıkarma', 'Wrapping', 'Nil yapma', 'Silme'],
    correctAnswer: 0,
    explanation: 'Unwrapping, optional içindeki gerçek değere erişmektir.'
  },
  {
    id: 5,
    question: 'Non-optional\'a nil atanabilir mi?',
    options: ['Hayır', 'Evet', 'Bazen', 'Sadece var'],
    correctAnswer: 0,
    explanation: 'Non-optional tipler nil olamaz: var name: String = nil HATA!'
  }
];

export const swOptionalBindingQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'if let ne işe yarar?',
    options: ['Safe optional unwrapping', 'Forced unwrapping', 'Nil check', 'Hepsi'],
    correctAnswer: 0,
    explanation: 'if let name = optionalName { } - nil değilse içerideki kod çalışır.'
  },
  {
    id: 2,
    question: 'if let nil ise ne olur?',
    options: ['if bloğu çalışmaz', 'Crash olur', 'Boş değer', 'Hata'],
    correctAnswer: 0,
    explanation: 'if let, nil ise if bloğu atlanır, else bloğu çalışır (varsa).'
  },
  {
    id: 3,
    question: 'Birden fazla optional binding yapılabilir mi?',
    options: ['Evet, virgülle', 'Hayır', 'Sadece 2 tane', 'Sadece if-else'],
    correctAnswer: 0,
    explanation: 'if let x = optX, let y = optY { } - her ikisi nil değilse çalışır.'
  },
  {
    id: 4,
    question: 'Optional chaining nedir?',
    options: ['?. ile zincirleme erişim', 'Normal erişim', 'Forced', 'Tuple'],
    correctAnswer: 0,
    explanation: 'person?.address?.street - herhangi biri nil ise sonuç nil döner.'
  },
  {
    id: 5,
    question: 'Nil coalescing operator nedir?',
    options: ['?? - nil ise default değer', '!! - forced', '?. - chaining', '?: - ternary'],
    correctAnswer: 0,
    explanation: 'let name = optionalName ?? "Guest" - nil ise "Guest" kullanılır.'
  }
];

export const swGuardLetQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'guard statement ne işe yarar?',
    options: ['Erken çıkış kontrolü', 'Loop', 'Switch', 'Fonksiyon'],
    correctAnswer: 0,
    explanation: 'guard, koşul sağlanmazsa erken çıkış (early exit) sağlar.'
  },
  {
    id: 2,
    question: 'guard let ile if let farkı nedir?',
    options: ['guard let scope dışında kullanılır', 'Aynı', 'if let daha iyi', 'guard yoktur'],
    correctAnswer: 0,
    explanation: 'guard let ile unwrap edilen değer guard\'dan sonra da kullanılabilir.'
  },
  {
    id: 3,
    question: 'guard bloğu ne içermeli?',
    options: ['return, break, continue, throw gibi çıkış', 'Herhangi kod', 'Sadece print', 'Boş olabilir'],
    correctAnswer: 0,
    explanation: 'guard else { } bloğu fonksiyondan/döngüden çıkış yapmalı.'
  },
  {
    id: 4,
    question: 'guard kullanım amacı nedir?',
    options: ['Happy path\'i dışarıda tutma', 'Loop', 'Hız', 'Memory'],
    correctAnswer: 0,
    explanation: 'guard ile hatalı durumlar erken handle edilir, ana kod temiz kalır.'
  },
  {
    id: 5,
    question: 'guard let nil ise ne olur?',
    options: ['else bloğu çalışır, çıkış yapar', 'Devam eder', 'Crash', 'Nil döner'],
    correctAnswer: 0,
    explanation: 'guard let x = opt else { return } - nil ise return ile çıkar.'
  }
];

export const swEnumsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Enum nedir?',
    options: ['İlişkili değerlerin grubu', 'Class', 'Struct', 'Protocol'],
    correctAnswer: 0,
    explanation: 'enum, birbiriyle ilişkili değerleri gruplar: enum Day { case monday, tuesday }'
  },
  {
    id: 2,
    question: 'Enum case nasıl yazılır?',
    options: ['case değer', 'case: değer', 'değer:', 'enum değer'],
    correctAnswer: 0,
    explanation: 'enum içinde case keyword ile case tanımlanır.'
  },
  {
    id: 3,
    question: 'Raw value nedir?',
    options: ['Enum case\'e atanan sabit değer', 'Değişken', 'Function', 'Property'],
    correctAnswer: 0,
    explanation: 'enum Number: Int { case one = 1, two = 2 } - 1, 2 raw value.'
  },
  {
    id: 4,
    question: 'Associated values nedir?',
    options: ['Her case\'e farklı veri taşıma', 'Raw value', 'Method', 'Property'],
    correctAnswer: 0,
    explanation: 'case success(String), case error(Int, String) - her case farklı data taşır.'
  },
  {
    id: 5,
    question: 'Enum method içerebilir mi?',
    options: ['Evet', 'Hayır', 'Sadece property', 'Sadece computed property'],
    correctAnswer: 0,
    explanation: 'Swift enum\'ları method ve computed property içerebilir.'
  }
];

export const swStructVsClassQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'struct ve class farkı nedir?',
    options: ['struct value type, class reference type', 'Aynı', 'struct daha hızlı', 'class daha güvenli'],
    correctAnswer: 0,
    explanation: 'struct kopyalanır (value), class referans paylaşılır (reference).'
  },
  {
    id: 2,
    question: 'struct inherit edilebilir mi?',
    options: ['Hayır', 'Evet', 'Bazen', 'Sadece class'],
    correctAnswer: 0,
    explanation: 'struct inheritance desteklemez, sadece class inherit edilebilir.'
  },
  {
    id: 3,
    question: 'Hangisi stack\'te saklanır?',
    options: ['struct', 'class', 'Her ikisi', 'Hiçbiri'],
    correctAnswer: 0,
    explanation: 'struct (value type) stack\'te, class (reference type) heap\'te saklanır.'
  },
  {
    id: 4,
    question: 'let ile tanımlanan struct property değiştirilebilir mi?',
    options: ['Hayır', 'Evet', 'Sadece var property', 'Sadece computed property'],
    correctAnswer: 0,
    explanation: 'let ile tanımlanan struct immutable\'dır, property\'leri değiştirilemez.'
  },
  {
    id: 5,
    question: 'Apple ne zaman struct önerir?',
    options: ['Basit data modeli için', 'Her zaman', 'Asla', 'Sadece UI'],
    correctAnswer: 0,
    explanation: 'Apple, basit data için struct, karmaşık/inheritance gereken yerlerde class önerir.'
  }
];

export const swPropertiesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Stored property nedir?',
    options: ['Değer depolayan property', 'Hesaplanan property', 'Method', 'Function'],
    correctAnswer: 0,
    explanation: 'Stored property, değeri bellekte depolar: var name: String'
  },
  {
    id: 2,
    question: 'Computed property nedir?',
    options: ['Her erişimde hesaplanan', 'Stored', 'Static', 'Let'],
    correctAnswer: 0,
    explanation: 'Computed property değeri saklamaz, her erişimde hesaplar: var fullName: String { get }'
  },
  {
    id: 3,
    question: 'Lazy property ne zaman initialize olur?',
    options: ['İlk erişimde', 'Hemen', 'Hiç', 'Her erişimde'],
    correctAnswer: 0,
    explanation: 'lazy var, ilk erişildiğinde initialize olur (lazy loading).'
  },
  {
    id: 4,
    question: 'Property observer nedir?',
    options: ['willSet ve didSet', 'Getter setter', 'Method', 'Computed property'],
    correctAnswer: 0,
    explanation: 'willSet (değişmeden önce), didSet (değiştikten sonra) değişimi gözlemler.'
  },
  {
    id: 5,
    question: 'Static property nedir?',
    options: ['Type property, instance\'a değil type\'a ait', 'Normal property', 'Computed', 'Lazy'],
    correctAnswer: 0,
    explanation: 'static var/let, instance oluşturmadan erişilen property: ClassName.property'
  }
];

export const swMethodsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Instance method nedir?',
    options: ['Object üzerinden çağrılan method', 'Static method', 'Class method', 'Type method'],
    correctAnswer: 0,
    explanation: 'Instance method, object oluşturulup o object üzerinden çağrılır.'
  },
  {
    id: 2,
    question: 'mutating ne işe yarar?',
    options: ['struct method\'unun property değiştirmesini sağlar', 'Class method', 'Static', 'Delete'],
    correctAnswer: 0,
    explanation: 'struct/enum method\'ları self\'i değiştirmek için mutating olmalı.'
  },
  {
    id: 3,
    question: 'Type method nedir?',
    options: ['static/class ile tanımlanan, type üzerinden çağrılan', 'Instance method', 'Init', 'Deinit'],
    correctAnswer: 0,
    explanation: 'static func veya class func ile tanımlanır, ClassName.method() çağrılır.'
  },
  {
    id: 4,
    question: 'self ne anlama gelir?',
    options: ['Mevcut instance', 'Type', 'Parent', 'Nil'],
    correctAnswer: 0,
    explanation: 'self, mevcut instance\'ı (object\'i) referans eder.'
  },
  {
    id: 5,
    question: 'Class method override edilebilir mi?',
    options: ['Evet', 'Hayır, sadece static', 'Hiçbiri', 'Her ikisi'],
    correctAnswer: 0,
    explanation: 'class func override edilebilir, static func edilemez.'
  }
];

export const swInitializersQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Initializer nedir?',
    options: ['Constructor (object oluşturma)', 'Destructor', 'Method', 'Property'],
    correctAnswer: 0,
    explanation: 'init metodu constructor\'dır, object oluşturulurken çalışır.'
  },
  {
    id: 2,
    question: 'init metodu return eder mi?',
    options: ['Hayır', 'Evet, self', 'Evet, instance', 'Evet, nil'],
    correctAnswer: 0,
    explanation: 'init metodu return keyword\'ü kullanmaz, otomatik instance döner.'
  },
  {
    id: 3,
    question: 'Failable initializer nedir?',
    options: ['init? - nil dönebilir', 'Normal init', 'Zorla başarılı', 'Static init'],
    correctAnswer: 0,
    explanation: 'init?(value: Int) { if value < 0 { return nil } } - başarısızsa nil döner.'
  },
  {
    id: 4,
    question: 'Convenience initializer nedir?',
    options: ['Yardımcı init, designated init çağırır', 'Ana init', 'Failable', 'Required'],
    correctAnswer: 0,
    explanation: 'convenience init, designated init\'i çağırarak alternatif initialization sağlar.'
  },
  {
    id: 5,
    question: 'Required initializer ne işe yarar?',
    options: ['Subclass\'ın implement etmesini zorlar', 'Optional', 'Failable', 'Convenience'],
    correctAnswer: 0,
    explanation: 'required init, tüm subclass\'ların bu init\'i implement etmesini zorunlu kılar.'
  }
];

export const swInheritanceQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Swift inheritance destekler mi?',
    options: ['Evet, sadece class', 'Evet, struct ve class', 'Hayır', 'Sadece protocol'],
    correctAnswer: 0,
    explanation: 'Swift\'te sadece class\'lar inherit edilebilir, struct\'lar edilemez.'
  },
  {
    id: 2,
    question: 'Inherit nasıl yapılır?',
    options: ['class Child: Parent', 'class Child extends Parent', 'class Child(Parent)', 'class Child -> Parent'],
    correctAnswer: 0,
    explanation: 'class ChildClass: ParentClass { } şeklinde inherit edilir.'
  },
  {
    id: 3,
    question: 'override ne işe yarar?',
    options: ['Parent method/property\'yi ezme', 'Yeni method', 'Delete', 'Copy'],
    correctAnswer: 0,
    explanation: 'override func/var ile parent\'ın metod/property\'si ezilir (overriding).'
  },
  {
    id: 4,
    question: 'super ne anlama gelir?',
    options: ['Parent class referansı', 'Child class', 'self', 'nil'],
    correctAnswer: 0,
    explanation: 'super parent class\'ı referans eder: super.method(), super.init()'
  },
  {
    id: 5,
    question: 'final ne işe yarar?',
    options: ['Override edilemez yapar', 'Inherit edilebilir', 'Required', 'Optional'],
    correctAnswer: 0,
    explanation: 'final class/method/property override veya inherit edilemez.'
  }
];

export const swProtocolsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Protocol nedir?',
    options: ['Blueprint (method/property sözleşmesi)', 'Class', 'Struct', 'Enum'],
    correctAnswer: 0,
    explanation: 'Protocol, implement edilmesi gereken method ve property\'leri tanımlar.'
  },
  {
    id: 2,
    question: 'Protocol nasıl tanımlanır?',
    options: ['protocol Name { }', 'class Name { }', 'struct Name { }', 'interface Name { }'],
    correctAnswer: 0,
    explanation: 'protocol ProtocolName { func method() } şeklinde tanımlanır.'
  },
  {
    id: 3,
    question: 'Protocol conform nasıl yapılır?',
    options: ['class A: Protocol', 'class A implements Protocol', 'class A extends Protocol', 'class A -> Protocol'],
    correctAnswer: 0,
    explanation: 'class ClassName: ProtocolName { } ile protocol conform edilir.'
  },
  {
    id: 4,
    question: 'Protocol property gerektirdiğinde { get } ne anlama gelir?',
    options: ['Read-only veya read-write', 'Sadece read-only', 'Sadece write', 'Computed'],
    correctAnswer: 0,
    explanation: 'var name: String { get } - read-only veya read-write olabilir (en az get olmalı).'
  },
  {
    id: 5,
    question: 'Protocol default implementation olabilir mi?',
    options: ['Evet, extension ile', 'Hayır', 'Sadece class', 'Sadece struct'],
    correctAnswer: 0,
    explanation: 'extension ProtocolName { func method() { } } ile default implementation verilir.'
  }
];

export const swExtensionsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Extension nedir?',
    options: ['Mevcut type\'a fonksiyonellik ekleme', 'Yeni class', 'Inherit', 'Protocol'],
    correctAnswer: 0,
    explanation: 'extension ile mevcut type\'lara (Int, String, Array vb.) yeni method/property eklenir.'
  },
  {
    id: 2,
    question: 'Extension nasıl tanımlanır?',
    options: ['extension TypeName { }', 'class TypeName { }', 'struct TypeName { }', 'protocol TypeName { }'],
    correctAnswer: 0,
    explanation: 'extension String { func newMethod() { } } şeklinde tanımlanır.'
  },
  {
    id: 3,
    question: 'Extension stored property ekleyebilir mi?',
    options: ['Hayır, sadece computed', 'Evet', 'Bazen', 'Sadece static'],
    correctAnswer: 0,
    explanation: 'extension sadece computed property, method, initializer ekleyebilir.'
  },
  {
    id: 4,
    question: 'Extension protocol conform ettirebilir mi?',
    options: ['Evet', 'Hayır', 'Sadece class', 'Sadece struct'],
    correctAnswer: 0,
    explanation: 'extension ClassName: ProtocolName { } ile protocol conform ettirilebilir.'
  },
  {
    id: 5,
    question: 'Extension orijinal type\'ı değiştirir mi?',
    options: ['Hayır, dışarıdan ekler', 'Evet değiştirir', 'Bazen', 'Sadece copy'],
    correctAnswer: 0,
    explanation: 'extension orijinal kodu değiştirmez, dışarıdan fonksiyonellik ekler.'
  }
];

export const swClosuresQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Closure nedir?',
    options: ['Anonim fonksiyon (lambda)', 'Named function', 'Class', 'Protocol'],
    correctAnswer: 0,
    explanation: 'Closure, anonim fonksiyonlardır: { (params) -> ReturnType in code }'
  },
  {
    id: 2,
    question: 'Closure nasıl yazılır?',
    options: ['{ (x: Int) -> Int in return x * 2 }', '(x) => x * 2', 'lambda x: x * 2', 'function(x) { }'],
    correctAnswer: 0,
    explanation: '{ (params) -> ReturnType in kod } şeklinde closure tanımlanır.'
  },
  {
    id: 3,
    question: 'Trailing closure syntax nedir?',
    options: ['Son parametre closure ise parantez dışına yazma', 'Normal closure', 'İlk parametre', 'Zorunlu'],
    correctAnswer: 0,
    explanation: 'array.map { $0 * 2 } - closure son parametreyse parantezden sonra yazılır.'
  },
  {
    id: 4,
    question: '$0, $1 ne anlama gelir?',
    options: ['Closure parametrelerinin shorthand adları', 'Değişken', 'Sabit', 'Hata'],
    correctAnswer: 0,
    explanation: '{ $0 + $1 } - ilk parametre $0, ikinci $1 (shorthand argument names)'
  },
  {
    id: 5,
    question: 'Capturing values nedir?',
    options: ['Closure\'un dış scope\'daki değerleri yakalaması', 'Parametre', 'Return', 'Hata'],
    correctAnswer: 0,
    explanation: 'Closure, tanımlandığı scope\'daki değişkenleri capture edebilir (reference tutar).'
  }
];

export const swErrorHandlingQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Swift error handling nasıl yapılır?',
    options: ['do-catch, try, throw', 'try-catch', 'try-except', 'catch-finally'],
    correctAnswer: 0,
    explanation: 'do { try ... } catch { } ile hata yakalanır.'
  },
  {
    id: 2,
    question: 'throws ne işe yarar?',
    options: ['Fonksiyonun hata fırlatabileceğini belirtir', 'Hata fırlatır', 'Hata yakalar', 'Ignore eder'],
    correctAnswer: 0,
    explanation: 'func canThrow() throws { } - bu fonksiyon hata fırlatabilir.'
  },
  {
    id: 3,
    question: 'try? ne döner?',
    options: ['Optional - başarılıysa değer, hata varsa nil', 'Hata', 'Değer', 'Crash'],
    correctAnswer: 0,
    explanation: 'let result = try? function() - hata olursa nil, başarılıysa değer döner.'
  },
  {
    id: 4,
    question: 'try! ne yapar?',
    options: ['Hata olursa crash, başarılıysa değer', 'Safe unwrap', 'Optional', 'Ignore'],
    correctAnswer: 0,
    explanation: 'try! ile hata olmayacağına eminseniz kullanılır, hata olursa crash.'
  },
  {
    id: 5,
    question: 'defer ne işe yarar?',
    options: ['Scope\'tan çıkarken mutlaka çalışır', 'Hata fırlatır', 'Hata yakalar', 'Early exit'],
    correctAnswer: 0,
    explanation: 'defer { } bloğu, scope\'tan çıkmadan önce mutlaka çalışır (cleanup için).'
  }
];

export const swSwiftuiIntroQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'SwiftUI nedir?',
    options: ['Declarative UI framework', 'UIKit', 'Database', 'Networking'],
    correctAnswer: 0,
    explanation: 'SwiftUI, Apple\'ın declarative (bildirimsel) UI framework\'üdür.'
  },
  {
    id: 2,
    question: 'SwiftUI ile UIKit farkı nedir?',
    options: ['SwiftUI declarative, UIKit imperative', 'Aynı', 'UIKit daha yeni', 'SwiftUI eski'],
    correctAnswer: 0,
    explanation: 'SwiftUI "ne" gösterileceğini söyler (declarative), UIKit "nasıl" yapılacağını (imperative).'
  },
  {
    id: 3,
    question: 'View protocol nedir?',
    options: ['SwiftUI view\'ların conform ettiği protocol', 'UIKit', 'Data model', 'Network'],
    correctAnswer: 0,
    explanation: 'struct ContentView: View { var body: some View { } }'
  },
  {
    id: 4,
    question: 'body property ne döner?',
    options: ['some View', 'UIView', 'String', 'Int'],
    correctAnswer: 0,
    explanation: 'body, some View döner (opaque type), herhangi bir View implement eden tip.'
  },
  {
    id: 5,
    question: '@State ne işe yarar?',
    options: ['View state\'ini yönetir, değişince UI güncellenir', 'Static', 'Constant', 'Network'],
    correctAnswer: 0,
    explanation: '@State ile tanımlanan değişken değiştiğinde SwiftUI otomatik UI\'ı günceller.'
  }
];

export const swArcQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'ARC nedir?',
    options: ['Automatic Reference Counting (bellek yönetimi)', 'Manual memory', 'Garbage collector', 'Compiler'],
    correctAnswer: 0,
    explanation: 'ARC, otomatik olarak reference count\'u takip eder ve belleği yönetir.'
  },
  {
    id: 2,
    question: 'Strong reference nedir?',
    options: ['Varsayılan, reference count artırır', 'Weak', 'Unowned', 'Nil'],
    correctAnswer: 0,
    explanation: 'Strong reference, object\'i bellekte tutar (reference count +1).'
  },
  {
    id: 3,
    question: 'Weak reference ne zaman kullanılır?',
    options: ['Retain cycle önlemek için', 'Her zaman', 'Asla', 'Sadece class'],
    correctAnswer: 0,
    explanation: 'weak var, retain cycle (memory leak) önlemek için kullanılır, optional\'dır.'
  },
  {
    id: 4,
    question: 'Unowned ne zaman kullanılır?',
    options: ['Object asla nil olmayacaksa', 'Object nil olabilirse', 'Her zaman', 'Asla'],
    correctAnswer: 0,
    explanation: 'unowned, weak gibi ama non-optional, object nil olursa crash.'
  },
  {
    id: 5,
    question: 'Retain cycle nedir?',
    options: ['İki object birbirini tutarak memory leak', 'Normal reference', 'Weak reference', 'ARC feature'],
    correctAnswer: 0,
    explanation: 'A -> B (strong), B -> A (strong) = retain cycle, bellekten silinmez.'
  }
];

export const swiftFinalQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Swift hangi platformlarda çalışır?',
    options: ['Sadece iOS', 'iOS, macOS, watchOS, tvOS', 'Sadece macOS', 'Sadece Android'],
    correctAnswer: 1,
    explanation: 'Swift, Apple ekosisteminin tüm platformlarında çalışır.'
  },
  {
    id: 2,
    question: 'var ve let arasındaki fark nedir?',
    options: ['Fark yok', 'var değiştirilebilir, let sabit', 'let daha hızlı', 'var daha güvenli'],
    correctAnswer: 1,
    explanation: 'var (variable) değiştirilebilir, let (constant) sabittir.'
  },
  {
    id: 3,
    question: 'Optional nedir?',
    options: ['Zorunlu değer', 'Nil olabilecek değer', 'String tip', 'Array'],
    correctAnswer: 1,
    explanation: 'Optional, nil (null) olabilecek değerleri temsil eder: String?'
  },
  {
    id: 4,
    question: 'Optional unwrapping nasıl yapılır?',
    options: ['!', 'if let veya guard let', '?', 'Hepsi'],
    correctAnswer: 3,
    explanation: 'Optional unwrapping: ! (forced), if let/guard let (safe), ?? (nil coalescing)'
  },
  {
    id: 5,
    question: 'guard statement ne işe yarar?',
    options: ['Loop', 'Erken çıkış kontrolü', 'Switch', 'Class'],
    correctAnswer: 1,
    explanation: 'guard, koşul sağlanmazsa erken çıkış (early exit) sağlar.'
  }
];

// ==================== ADDITIONAL HTML QUIZZES ====================

export const htmlStylesQuiz: QuizQuestion[] = [
  { id: 1, question: 'style attribute nasıl kullanılır?', options: ['<p class="style">', '<p style="color:red">', '<p css="color:red">', '<style>color</style>'], correctAnswer: 1, explanation: 'style attribute inline CSS yazmak için kullanılır: style="property:value"' },
  { id: 2, question: 'Inline CSS ne demektir?', options: ['CSS dosyası', 'style attribute ile yazılan CSS', '<style> etiketi', 'External CSS'], correctAnswer: 1, explanation: 'Inline CSS, HTML elementinin style attribute\'unda yazılan CSS\'tir.' },
  { id: 3, question: 'Birden fazla CSS özelliği nasıl yazılır?', options: ['Virgülle ayır', 'Noktalı virgülle ayır', 'Boşlukla ayır', 'Pipe ile ayır'], correctAnswer: 1, explanation: 'CSS özellikleri noktalı virgülle ayrılır: style="color:red; font-size:16px"' },
  { id: 4, question: 'CSS öncelik sırası hangi doğrudur?', options: ['Inline > Internal > External', 'External > Internal > Inline', 'Hepsi eşit', 'Internal en öncelikli'], correctAnswer: 0, explanation: 'Inline CSS en yüksek önceliğe sahiptir, sonra Internal, en son External.' },
  { id: 5, question: 'color özelliği ne yapar?', options: ['Arka plan rengi', 'Metin rengi', 'Border rengi', 'Shadow rengi'], correctAnswer: 1, explanation: 'color özelliği metin rengini belirler.' }
];

export const htmlFormattingQuiz: QuizQuestion[] = [
  { id: 1, question: '<strong> etiketi ne yapar?', options: ['İtalik yapar', 'Kalın ve önemli yapar', 'Altını çizer', 'Renklendirir'], correctAnswer: 1, explanation: '<strong> metni kalın ve semantik olarak önemli yapar.' },
  { id: 2, question: '<b> ve <strong> arasındaki fark nedir?', options: ['Aynı', '<strong> semantik öneme sahip', '<b> daha kalın', 'Hiç fark yok'], correctAnswer: 1, explanation: '<strong> semantik önem belirtir, <b> sadece görsel kalınlık verir.' },
  { id: 3, question: '<em> etiketi ne yapar?', options: ['Kalın', 'Vurgu (italik) yapar', 'Altını çizer', 'Üstünü çizer'], correctAnswer: 1, explanation: '<em> (emphasis) metni vurgular ve italik yapar.' },
  { id: 4, question: '<i> ve <em> arasındaki fark nedir?', options: ['Aynı', '<em> semantik vurgu', '<i> daha italik', 'Fark yok'], correctAnswer: 1, explanation: '<em> semantik vurgu, <i> sadece görsel italik.' },
  { id: 5, question: '<u> etiketi ne yapar?', options: ['Kalın', 'İtalik', 'Altını çizer', 'Üstünü çizer'], correctAnswer: 2, explanation: '<u> (underline) metnin altını çizer.' }
];

export const htmlQuotationsQuiz: QuizQuestion[] = [
  { id: 1, question: '<q> etiketi ne işe yarar?', options: ['Paragraf', 'Kısa alıntı (inline quote)', 'Uzun alıntı', 'Kod'], correctAnswer: 1, explanation: '<q> inline (satır içi) kısa alıntılar için kullanılır ve otomatik tırnak ekler.' },
  { id: 2, question: '<blockquote> etiketi ne yapar?', options: ['Inline alıntı', 'Block seviyesi uzun alıntı', 'Kod bloğu', 'Paragraf'], correctAnswer: 1, explanation: '<blockquote> block seviyesinde uzun alıntılar için kullanılır.' },
  { id: 3, question: 'cite attribute ne işe yarar?', options: ['Yazarı belirtir', 'Kaynak URL\'ini belirtir', 'Tarih belirtir', 'Başlık belirtir'], correctAnswer: 1, explanation: 'cite attribute alıntının kaynak URL\'ini belirtir: <blockquote cite="url">' },
  { id: 4, question: '<cite> etiketi ne için kullanılır?', options: ['Alıntı', 'Eser adı (kitap, film vb.)', 'Link', 'Kod'], correctAnswer: 1, explanation: '<cite> bir eserin (kitap, makale, film) adını işaretler.' },
  { id: 5, question: '<q> otomatik tırnak ekler mi?', options: ['Evet', 'Hayır', 'Bazen', 'Sadece CSS ile'], correctAnswer: 0, explanation: '<q> etiketi tarayıcı tarafından otomatik tırnak içine alınır.' }
];

export const htmlCommentsQuiz: QuizQuestion[] = [
  { id: 1, question: 'HTML yorumu nasıl yazılır?', options: ['// yorum', '/* yorum */', '<!-- yorum -->', '# yorum'], correctAnswer: 2, explanation: 'HTML yorumları <!-- yorum --> şeklinde yazılır.' },
  { id: 2, question: 'HTML yorumları tarayıcıda görünür mü?', options: ['Evet', 'Hayır, kaynak kodda görünür', 'Bazen', 'Sadece dev modda'], correctAnswer: 1, explanation: 'Yorumlar sayfada görünmez ama kaynak kodda (View Source) görülebilir.' },
  { id: 3, question: 'Çok satırlı yorum yapılabilir mi?', options: ['Hayır', 'Evet, <!-- ile --> arasında', 'Sadece tek satır', 'Her satıra <!--'], correctAnswer: 1, explanation: 'HTML yorumları çok satırlı olabilir, <!-- ile başlayıp --> ile biter.' },
  { id: 4, question: 'Yorumlar iç içe olabilir mi?', options: ['Hayır', 'Evet', 'Sadece 2 seviye', 'Bazen'], correctAnswer: 0, explanation: 'HTML yorumları iç içe (nested) olamaz, ilk --> yorumu kapatır.' },
  { id: 5, question: 'Yorumlar neden kullanılır?', options: ['Kod hızlandırma', 'Açıklama/notlar, geçici kod devre dışı', 'Zorunlu', 'SEO'], correctAnswer: 1, explanation: 'Yorumlar kod açıklaması, TODO notları, geçici kod devre dışı için kullanılır.' }
];

export const htmlColorsQuiz: QuizQuestion[] = [
  { id: 1, question: 'HTML\'de renk nasıl belirtilir?', options: ['Sadece isimle', 'İsim, HEX, RGB, RGBA, HSL', 'Sadece HEX', 'Sadece RGB'], correctAnswer: 1, explanation: 'Renkler isim (red), HEX (#FF0000), RGB, RGBA, HSL formatlarında belirtilebilir.' },
  { id: 2, question: 'HEX renk kodu nasıl yazılır?', options: ['0xFF0000', '#FF0000', 'FF0000', 'rgb(255,0,0)'], correctAnswer: 1, explanation: 'HEX renk kodu # ile başlar: #RRGGBB formatında.' },
  { id: 3, question: 'RGB renk sisteminde R ne demektir?', options: ['Right', 'Red', 'Radius', 'Range'], correctAnswer: 1, explanation: 'RGB = Red Green Blue (Kırmızı Yeşil Mavi)' },
  { id: 4, question: 'RGB değerleri hangi aralıktadır?', options: ['0-100', '0-255', '0-1', '0-1000'], correctAnswer: 1, explanation: 'RGB değerleri 0-255 arasındadır: rgb(255, 0, 0) kırmızı.' },
  { id: 5, question: 'RGBA\'daki A ne anlama gelir?', options: ['Angle', 'Alpha (opaklık)', 'Area', 'Align'], correctAnswer: 1, explanation: 'A = Alpha (opacity), 0 (şeffaf) - 1 (opak) arasında: rgba(255,0,0,0.5)' }
];

export const htmlCssQuiz: QuizQuestion[] = [
  { id: 1, question: 'HTML içine CSS nasıl eklenir?', options: ['Sadece inline', 'Inline, Internal, External', 'Sadece external', 'Sadece internal'], correctAnswer: 1, explanation: 'CSS 3 şekilde eklenebilir: Inline (style attr), Internal (<style>), External (CSS dosyası)' },
  { id: 2, question: '<style> etiketi nerede kullanılır?', options: ['<body>', '<head>', '<footer>', '<div>'], correctAnswer: 1, explanation: '<style> etiketi genelde <head> içinde kullanılır (internal CSS).' },
  { id: 3, question: 'External CSS nasıl bağlanır?', options: ['<css href="">', '<link rel="stylesheet" href="">', '<style src="">', '<import css="">'], correctAnswer: 1, explanation: 'External CSS: <link rel="stylesheet" href="style.css"> ile bağlanır.' },
  { id: 4, question: 'CSS selector nedir?', options: ['Stil tanımı', 'Hangi elementlerin stillenecektir', 'Renk', 'Font'], correctAnswer: 1, explanation: 'Selector, hangi HTML elementlerinin stillenecektir belirtir.' },
  { id: 5, question: 'Class selector nasıl yazılır?', options: ['.className', '#className', 'className', '*className'], correctAnswer: 0, explanation: 'Class selector nokta ile başlar: .myClass { }' }
];

export const htmlLinksQuiz: QuizQuestion[] = [
  { id: 1, question: 'Link etiketi hangisidir?', options: ['<link>', '<a>', '<href>', '<url>'], correctAnswer: 1, explanation: '<a> (anchor) etiketi link oluşturmak için kullanılır.' },
  { id: 2, question: 'href attribute ne anlama gelir?', options: ['Hyperlink redirect', 'Hyperlink reference (bağlantı adresi)', 'HTML reference', 'Header reference'], correctAnswer: 1, explanation: 'href = Hyperlink Reference, linkin gideceği adresi belirtir.' },
  { id: 3, question: 'target="_blank" ne yapar?', options: ['Aynı sekmede aç', 'Yeni sekmede aç', 'Kapat', 'Yenile'], correctAnswer: 1, explanation: 'target="_blank" linki yeni sekme/pencerede açar.' },
  { id: 4, question: 'target="_self" ne yapar?', options: ['Yeni sekmede', 'Aynı sekmede aç (varsayılan)', 'Parent frame', 'Top frame'], correctAnswer: 1, explanation: 'target="_self" linki aynı sekmede açar (varsayılan davranış).' },
  { id: 5, question: 'Sayfanın belirli yerine link nasıl verilir?', options: ['#id ile', 'Sadece href', '.class ile', 'data ile'], correctAnswer: 0, explanation: 'Anchor link: <a href="#section-id"> ile sayfanın belirli yerine gidilir.' }
];

export const htmlImagesQuiz: QuizQuestion[] = [
  { id: 1, question: 'Resim etiketi hangisidir?', options: ['<image>', '<img>', '<picture>', '<photo>'], correctAnswer: 1, explanation: '<img> etiketi resim göstermek için kullanılır.' },
  { id: 2, question: 'src attribute ne işe yarar?', options: ['Stil', 'Kaynak (resim yolu)', 'Size', 'Screen'], correctAnswer: 1, explanation: 'src (source) attribute resmin yolunu/URL\'sini belirtir.' },
  { id: 3, question: 'alt attribute ne anlama gelir?', options: ['Alternate (alternatif metin)', 'Altitude', 'Alternative image', 'Automatic'], correctAnswer: 0, explanation: 'alt attribute resim yüklenemezse gösterilecek alternatif metindir (erişilebilirlik için önemli).' },
  { id: 4, question: 'alt attribute zorunlu mudur?', options: ['Evet, erişilebilirlik için', 'Hayır opsiyonel', 'Sadece büyük resimlerde', 'Sadece logo\'larda'], correctAnswer: 0, explanation: 'alt attribute erişilebilirlik (accessibility) ve SEO için zorunludur.' },
  { id: 5, question: 'width ve height attribute ne yapar?', options: ['Dosya boyutu', 'Görüntü boyutu ayarlar', 'Kalite', 'Format'], correctAnswer: 1, explanation: 'width/height attribute resmin genişlik ve yüksekliğini piksel cinsinden belirtir.' }
];

export const htmlFaviconQuiz: QuizQuestion[] = [
  { id: 1, question: 'Favicon nedir?', options: ['Site logosu', 'Tarayıcı sekmesinde görünen küçük ikon', 'Banner', 'Footer logo'], correctAnswer: 1, explanation: 'Favicon, tarayıcı sekmesinde ve yer imlerinde görünen küçük ikondur.' },
  { id: 2, question: 'Favicon nasıl eklenir?', options: ['<favicon>', '<link rel="icon">', '<img favicon>', '<icon>'], correctAnswer: 1, explanation: 'Favicon: <link rel="icon" href="favicon.ico"> ile <head> içine eklenir.' },
  { id: 3, question: 'Favicon boyutu ne olmalıdır?', options: ['16x16, 32x32, 48x48 gibi', '100x100', '500x500', '1920x1080'], correctAnswer: 0, explanation: 'Favicon genelde 16x16, 32x32 piksel, bazı durumlarda 48x48, 64x64 kullanılır.' },
  { id: 4, question: 'Favicon formatı ne olmalıdır?', options: ['Sadece .ico', '.ico, .png, .svg', 'Sadece .jpg', 'Sadece .gif'], correctAnswer: 1, explanation: 'Favicon .ico (klasik), .png veya .svg formatında olabilir.' },
  { id: 5, question: 'Apple touch icon nedir?', options: ['Normal favicon', 'iOS ana ekran ikonu', 'Android icon', 'Windows icon'], correctAnswer: 1, explanation: 'Apple touch icon: <link rel="apple-touch-icon" href="icon.png"> iOS cihazlarda ana ekran için.' }
];

export const htmlPageTitleQuiz: QuizQuestion[] = [
  { id: 1, question: '<title> etiketi nerede kullanılır?', options: ['<body>', '<head>', '<header>', '<footer>'], correctAnswer: 1, explanation: '<title> etiketi <head> içinde kullanılır.' },
  { id: 2, question: '<title> ne işe yarar?', options: ['Sayfa başlığı', 'Tarayıcı sekmesi ve arama sonuçlarında başlık', 'Logo', 'Menu'], correctAnswer: 1, explanation: '<title> tarayıcı sekmesinde, yer imlerinde ve arama sonuçlarında görünen başlıktır.' },
  { id: 3, question: '<title> zorunlu mudur?', options: ['Evet, valid HTML için', 'Hayır opsiyonel', 'Sadece ana sayfada', 'Sadece blog\'larda'], correctAnswer: 0, explanation: '<title> etiketi valid HTML için zorunludur ve SEO açısından kritiktir.' },
  { id: 4, question: 'Title uzunluğu ne kadar olmalıdır?', options: ['Sınırsız', '50-60 karakter (SEO)', '10 karakter', '200 karakter'], correctAnswer: 1, explanation: 'Google arama sonuçlarında ~50-60 karakter görüntülenir, daha uzun kesilir.' },
  { id: 5, question: 'Title\'a HTML etiketi konabilir mi?', options: ['Evet', 'Hayır, sadece düz metin', 'Sadece <strong>', 'Sadece <span>'], correctAnswer: 1, explanation: '<title> içinde HTML etiketi kullanılamaz, sadece düz metin.' }
];

// REMAINING HTML QUIZZES (Tables, Lists, Block-Inline, Div, Classes-ID, Final)
export const htmlTablesQuiz: QuizQuestion[] = [
  { id: 1, question: 'Tablo etiketi hangisidir?', options: ['<table>', '<tab>', '<grid>', '<tbody>'], correctAnswer: 0, explanation: '<table> etiketi tablo oluşturmak için kullanılır.' },
  { id: 2, question: '<tr> ne anlama gelir?', options: ['Table row (satır)', 'Table reference', 'Table radio', 'Table right'], correctAnswer: 0, explanation: '<tr> (table row) tablo satırını tanımlar.' },
  { id: 3, question: '<td> ne anlama gelir?', options: ['Table data (hücre)', 'Table div', 'Table description', 'Table definition'], correctAnswer: 0, explanation: '<td> (table data) tablo hücresini tanımlar.' },
  { id: 4, question: '<th> ne anlama gelir?', options: ['Table height', 'Table header (başlık hücresi)', 'Table head', 'Table horizontal'], correctAnswer: 1, explanation: '<th> (table header) başlık hücresini tanımlar, varsayılan kalın ve ortalı.' },
  { id: 5, question: '<thead> ne işe yarar?', options: ['Tablo gövdesi', 'Tablo başlık grubu', 'Tablo ayağı', 'Tablo kenarlığı'], correctAnswer: 1, explanation: '<thead> tablo başlık satırlarını gruplar.' },
  { id: 6, question: '<tbody> ne işe yarar?', options: ['Başlık', 'Gövde/içerik satırlarını gruplar', 'Ayak', 'Kenarlık'], correctAnswer: 1, explanation: '<tbody> (table body) tablo gövde satırlarını gruplar.' },
  { id: 7, question: '<tfoot> ne işe yarar?', options: ['Başlık', 'Gövde', 'Tablo ayak satırlarını gruplar (toplam vb.)', 'Kenarlık'], correctAnswer: 2, explanation: '<tfoot> tablo ayak satırlarını gruplar (toplam, özet vb.).' },
  { id: 8, question: 'colspan attribute ne yapar?', options: ['Satır birleştirir', 'Sütun birleştirir (yatay)', 'Kenarlık', 'Renk'], correctAnswer: 1, explanation: 'colspan attribute hücrenin kaç sütun kaplayacağını belirtir: <td colspan="2">' },
  { id: 9, question: 'rowspan attribute ne yapar?', options: ['Sütun birleştirir', 'Satır birleştirir (dikey)', 'Genişlik', 'Yükseklik'], correctAnswer: 1, explanation: 'rowspan attribute hücrenin kaç satır kaplayacağını belirtir: <td rowspan="2">' },
  { id: 10, question: '<caption> etiketi ne işe yarar?', options: ['Hücre başlığı', 'Tablo başlığı/açıklama', 'Ayak', 'Kenarlık'], correctAnswer: 1, explanation: '<caption> tabloya başlık/açıklama ekler, <table> içinde ilk element olarak.' },
  { id: 11, question: 'Tablo kenarlığı nasıl eklenir?', options: ['border attribute (eskı) veya CSS', 'Otomatik', 'Eklenemez', 'Sadece CSS'], correctAnswer: 0, explanation: 'Kenarlık: border="1" (eski) veya CSS border ile eklenir.' },
  { id: 12, question: 'Responsive tablo nasıl yapılır?', options: ['overflow-x: auto ile kaydırılabilir', 'Otomatik', 'Yapılamaz', 'Sadece mobil'], correctAnswer: 0, explanation: 'Responsive: overflow-x: auto ile tablo küçük ekranlarda yatay kaydırılabilir hale gelir.' },
  { id: 13, question: 'Tablo accessibility için ne yapılmalı?', options: ['Hiçbir şey', '<th> scope attribute, <caption>', 'Sadece border', 'Renk'], correctAnswer: 1, explanation: 'Erişilebilirlik: <th scope="col/row">, <caption>, anlamlı başlıklar kullanılmalı.' },
  { id: 14, question: 'Tablo data sıralama nasıl yapılır?', options: ['Otomatik', 'JavaScript ile', 'CSS ile', 'HTML attribute'], correctAnswer: 1, explanation: 'Tablo sıralama JavaScript ile yapılır (event listener + sort fonksiyonu).' },
  { id: 15, question: 'Tablo yerine CSS Grid kullanmak mantıklı mı?', options: ['Evet, layout için Grid', 'Hayır, her zaman tablo', 'Fark etmez', 'Grid kötü'], correctAnswer: 0, explanation: 'Tablo sadece tablo data için, sayfa layout için CSS Grid/Flexbox kullanılmalı.' }
];

export const htmlListsQuiz: QuizQuestion[] = [
  { id: 1, question: 'Ordered list (sıralı liste) etiketi hangisidir?', options: ['<ul>', '<ol>', '<list>', '<order>'], correctAnswer: 1, explanation: '<ol> (ordered list) numaralandırılmış liste oluşturur.' },
  { id: 2, question: 'Unordered list (sırasız liste) etiketi hangisidir?', options: ['<ul>', '<ol>', '<list>', '<unorder>'], correctAnswer: 0, explanation: '<ul> (unordered list) madde işaretli liste oluşturur.' },
  { id: 3, question: '<li> ne anlama gelir?', options: ['Link', 'List item (liste elemanı)', 'Line', 'List index'], correctAnswer: 1, explanation: '<li> (list item) liste elemanını tanımlar, <ul> veya <ol> içinde kullanılır.' },
  { id: 4, question: 'Nested list (iç içe liste) yapılabilir mi?', options: ['Hayır', 'Evet, <li> içine yeni <ul>/<ol>', 'Sadece 2 seviye', 'Hata verir'], correctAnswer: 1, explanation: 'İç içe liste: <li> içine yeni <ul> veya <ol> ekleyerek yapılır.' },
  { id: 5, question: '<ol> type attribute hangi değerleri alır?', options: ['1, A, a, I, i', 'Sadece 1', 'Sadece A', 'circle, square'], correctAnswer: 0, explanation: '<ol type="1|A|a|I|i"> ile numaralandırma tipi belirtilir (1, A, a, I, i).' },
  { id: 6, question: '<ol> start attribute ne yapar?', options: ['Bitiş', 'Başlangıç numarası', 'Renk', 'Boyut'], correctAnswer: 1, explanation: '<ol start="5"> ile liste 5\'ten başlar.' },
  { id: 7, question: '<ul> için marker stilleri nelerdir?', options: ['disc, circle, square, none', 'Sadece disc', '1, 2, 3', 'A, B, C'], correctAnswer: 0, explanation: '<ul> marker: disc (dolu), circle (boş), square (kare), none (yok) - CSS list-style-type ile.' },
  { id: 8, question: '<dl> etiketi ne işe yarar?', options: ['Normal liste', 'Description list (tanım listesi)', 'Data list', 'Delete list'], correctAnswer: 1, explanation: '<dl> (description list) terim-tanım listesi oluşturur.' },
  { id: 9, question: '<dt> ne anlama gelir?', options: ['Data type', 'Description term (terim)', 'Date time', 'Delete tag'], correctAnswer: 1, explanation: '<dt> (description term) tanım listesinde terimi belirtir.' },
  { id: 10, question: '<dd> ne anlama gelir?', options: ['Data definition', 'Description definition (tanım)', 'Date day', 'Delete data'], correctAnswer: 1, explanation: '<dd> (description definition) terimin tanımını/açıklamasını içerir.' },
  { id: 11, question: 'Liste marker\'ı nasıl gizlenir?', options: ['list-style: none', 'Gizlenemez', 'display: none', 'visibility: hidden'], correctAnswer: 0, explanation: 'CSS list-style-type: none veya list-style: none ile marker gizlenir.' },
  { id: 12, question: 'Custom list marker nasıl eklenir?', options: ['Eklenemez', 'list-style-image veya ::marker pseudo-element', 'Sadece emoji', 'Otomatik'], correctAnswer: 1, explanation: 'list-style-image: url() veya CSS ::marker ile custom marker eklenir.' },
  { id: 13, question: 'Liste horizontal (yatay) olabilir mi?', options: ['Hayır', 'Evet, display:inline-block veya Flexbox', 'Sadece CSS Grid', 'Otomatik'], correctAnswer: 1, explanation: '<li> display: inline-block veya <ul> display: flex ile yatay liste yapılır.' },
  { id: 14, question: 'Liste semantiği neden önemlidir?', options: ['Görsel', 'SEO ve erişilebilirlik', 'Zorunlu', 'Hız'], correctAnswer: 1, explanation: 'Doğru liste etiketleri ekran okuyucular ve SEO için önemlidir.' },
  { id: 15, question: 'Navigation menu için hangi etiket uygun?', options: ['<div>', '<nav><ul><li>', '<menu>', '<list>'], correctAnswer: 1, explanation: 'Navigation: <nav><ul><li><a> yapısı semantik ve erişilebilir.' }
];

export const htmlBlockInlineQuiz: QuizQuestion[] = [
  { id: 1, question: 'Block element ne demektir?', options: ['Inline', 'Tam genişlik alır, yeni satırda başlar', 'Küçük element', 'Hidden'], correctAnswer: 1, explanation: 'Block element tüm genişliği kaplar ve yeni satırda başlar (div, p, h1...).' },
  { id: 2, question: 'Inline element ne demektir?', options: ['Block', 'Sadece içeriği kadar yer kaplar, yan yana dizilir', 'Tam genişlik', 'Yeni satır'], correctAnswer: 1, explanation: 'Inline element sadece içeriği kadar yer kaplar, yan yana dizilir (span, a, strong...).' },
  { id: 3, question: 'Hangileri block elementtir?', options: ['<div>, <p>, <h1>, <section>', '<span>, <a>, <strong>', '<img>, <input>', 'Hepsi'], correctAnswer: 0, explanation: 'Block: div, p, h1-h6, section, article, header, footer, ul, ol, table...' },
  { id: 4, question: 'Hangileri inline elementtir?', options: ['<div>, <p>', '<span>, <a>, <strong>, <em>', '<section>, <article>', 'Hepsi'], correctAnswer: 1, explanation: 'Inline: span, a, strong, em, img, input, button, label...' },
  { id: 5, question: 'Inline-block ne demektir?', options: ['Block', 'Inline gibi yan yana ama boyutlandırılabilir', 'Inline', 'Hiçbiri'], correctAnswer: 1, explanation: 'inline-block: yan yana dizilir ama width/height verilebilir.' },
  { id: 6, question: 'Block element içinde inline olabilir mi?', options: ['Evet', 'Hayır', 'Sadece span', 'Hata'], correctAnswer: 0, explanation: 'Block içinde inline kullanılabilir: <div><span></span></div>' },
  { id: 7, question: 'Inline element içinde block olabilir mi?', options: ['Genelde hayır (HTML5 öncesi)', 'Evet her zaman', 'Sadece div', 'Fark etmez'], correctAnswer: 0, explanation: 'Inline içinde block genelde yapılmaz (istisnalar: <a> HTML5\'te block içerebilir).' },
  { id: 8, question: 'display property ile element tipi değişir mi?', options: ['Hayır', 'Evet, CSS display ile block/inline değiştirilebilir', 'Sadece JS ile', 'Asla'], correctAnswer: 1, explanation: 'CSS display: block/inline/inline-block ile element tipi değiştirilebilir.' },
  { id: 9, question: 'Block element width:50% verilirse?', options: ['Tam genişlik kalır', 'Parent\'ın %50\'si kadar genişlik alır', 'Hata', 'Auto'], correctAnswer: 1, explanation: 'Block element width belirtilirse o genişlikte olur ama yeni satırda kalır.' },
  { id: 10, question: 'Inline element width/height alır mı?', options: ['Hayır (içerik kadar)', 'Evet', 'Sadece width', 'Sadece height'], correctAnswer: 0, explanation: 'Inline element width/height alamaz, içeriği kadar yer kaplar (inline-block alabilir).' },
  { id: 11, question: 'Inline element margin alır mı?', options: ['Sadece yatay (left/right)', 'Tüm yönler', 'Hiç almaz', 'Sadece dikey'], correctAnswer: 0, explanation: 'Inline element sadece yatay margin (left/right) alır, dikey (top/bottom) almaz.' },
  { id: 12, question: 'Inline element padding alır mı?', options: ['Evet ama dikey overlap olabilir', 'Hayır', 'Sadece yatay', 'Tam olarak'], correctAnswer: 0, explanation: 'Inline padding alır ama dikey padding başka elementlerle overlap olabilir.' },
  { id: 13, question: '<img> inline mi block mi?', options: ['Inline (ama boyutlandırılabilir)', 'Block', 'Inline-block', 'Flex'], correctAnswer: 0, explanation: '<img> inline-block gibi davranır: inline ama width/height alabilir.' },
  { id: 14, question: 'Flexbox ve Grid için display ne olmalı?', options: ['block/inline', 'display: flex / display: grid', 'inline-block', 'Auto'], correctAnswer: 1, explanation: 'Flexbox: display: flex, Grid: display: grid kullanılır.' },
  { id: 15, question: 'display: none ne yapar?', options: ['Gizler ama yer kaplar', 'Gizler ve yer kaplamaz', 'Şeffaf yapar', 'Sadece opacity'], correctAnswer: 1, explanation: 'display: none elementi tamamen gizler ve yer kaplamaz (visibility: hidden yer kaplar).' }
];

export const htmlDivQuiz: QuizQuestion[] = [
  { id: 1, question: '<div> ne anlama gelir?', options: ['Divide', 'Division (bölüm/container)', 'Device', 'Display'], correctAnswer: 1, explanation: '<div> (division) genel amaçlı container/bölüm elementidir.' },
  { id: 2, question: '<div> block mi inline mı?', options: ['Block', 'Inline', 'Inline-block', 'Flex'], correctAnswer: 0, explanation: '<div> bir block elementidir.' },
  { id: 3, question: '<div> semantik midir?', options: ['Evet', 'Hayır, genel amaçlı container', 'Bazen', 'Çok semantik'], correctAnswer: 1, explanation: '<div> semantik değil, mümkünse <section>, <article> gibi semantik etiketler tercih edilmeli.' },
  { id: 4, question: '<div> yerine ne kullanılmalı (semantik için)?', options: ['Sadece div', '<section>, <article>, <header>, <footer>, <nav>', '<span>', '<p>'], correctAnswer: 1, explanation: 'Semantik HTML için <section>, <article>, <header>, <footer>, <nav>, <aside> kullanılmalı.' },
  { id: 5, question: '<div> içinde <div> olabilir mi?', options: ['Evet, nested div', 'Hayır', 'Sadece 2 seviye', 'Hata'], correctAnswer: 0, explanation: '<div> içinde sınırsız nested <div> kullanılabilir.' },
  { id: 6, question: '<div> class ve id alabilir mi?', options: ['Evet', 'Hayır', 'Sadece class', 'Sadece id'], correctAnswer: 0, explanation: '<div> class ve id attribute\'ları alabilir: <div class="container" id="main">' },
  { id: 7, question: '<div> stil vermek için ne kullanılır?', options: ['Sadece inline', 'CSS (class/id selector)', 'JavaScript', 'Otomatik'], correctAnswer: 1, explanation: '<div>\'e stil CSS ile (class/id/element selector) verilir.' },
  { id: 8, question: 'Container <div> ne işe yarar?', options: ['Hiçbir şey', 'İçeriği gruplamak ve layout', 'Sadece renk', 'Link'], correctAnswer: 1, explanation: 'Container <div> içeriği gruplamak, layout ve stil vermek için kullanılır.' },
  { id: 9, question: 'Çok fazla <div> kullanmak (div soup) iyi mi?', options: ['Evet', 'Hayır, mümkünse semantik etiketler kullan', 'Fark etmez', 'Zorunlu'], correctAnswer: 1, explanation: 'Aşırı <div> kullanımı (div soup) kötüdür, semantik HTML tercih edilmeli.' },
  { id: 10, question: '<div> Flexbox/Grid container olabilir mi?', options: ['Evet, display: flex/grid', 'Hayır', 'Sadece flex', 'Sadece grid'], correctAnswer: 0, explanation: '<div> display: flex veya grid ile layout container olabilir.' },
  { id: 11, question: '<div> position attribute alabilir mi?', options: ['Evet, CSS position', 'Hayır', 'Sadece absolute', 'Sadece relative'], correctAnswer: 0, explanation: '<div>\'e CSS position: relative/absolute/fixed/sticky verilebilir.' },
  { id: 12, question: '<div> responsive design\'da kullanılır mı?', options: ['Evet', 'Hayır', 'Sadece mobil', 'Sadece desktop'], correctAnswer: 0, explanation: '<div> responsive layout için sıkça kullanılır (container, grid, flex).' },
  { id: 13, question: 'Boş <div> kullanılmalı mı?', options: ['Hayır, gereksiz', 'Evet her zaman', 'Bazen clearfix için', 'Zorunlu'], correctAnswer: 0, explanation: 'Boş <div> gereksizdir, gerekmedikçe kullanılmamalı (clearfix artık gerekmiyor).' },
  { id: 14, question: '<div> JavaScript ile manipüle edilebilir mi?', options: ['Evet, getElementById/querySelector', 'Hayır', 'Sadece jQuery', 'Sadece React'], correctAnswer: 0, explanation: 'JavaScript ile <div> seçilebilir, içerik/stil değiştirilebilir.' },
  { id: 15, question: '<div> vs <span> farkı nedir?', options: ['Aynı', '<div> block, <span> inline', '<div> inline', '<span> block'], correctAnswer: 1, explanation: '<div> block (yeni satır), <span> inline (yan yana) elementidir.' }
];

export const htmlClassesIdQuiz: QuizQuestion[] = [
  { id: 1, question: 'class attribute ne işe yarar?', options: ['ID tanımlar', 'CSS sınıfı tanımlar', 'JavaScript fonksiyonu', 'Link'], correctAnswer: 1, explanation: 'class attribute elementi CSS sınıfına atar, stil vermek için kullanılır.' },
  { id: 2, question: 'id attribute ne işe yarar?', options: ['Sınıf', 'Benzersiz kimlik (unique ID)', 'Link', 'Stil'], correctAnswer: 1, explanation: 'id attribute elementin benzersiz kimliğidir, sayfada tek olmalı.' },
  { id: 3, question: 'class ve id farkı nedir?', options: ['Aynı', 'class çoklu, id benzersiz', 'id çoklu', 'Fark yok'], correctAnswer: 1, explanation: 'class: çoklu elementte kullanılabilir, id: sayfada benzersiz (unique) olmalı.' },
  { id: 4, question: 'Birden fazla class nasıl verilir?', options: ['class="btn primary"', 'class="btn, primary"', 'class="btn|primary"', 'class="btn;primary"'], correctAnswer: 0, explanation: 'Çoklu class boşlukla ayrılır: class="btn btn-primary large"' },
  { id: 5, question: 'id içinde boşluk olabilir mi?', options: ['Hayır', 'Evet', 'Bazen', 'Fark etmez'], correctAnswer: 0, explanation: 'id içinde boşluk olamaz, tek kelime veya tire/underscore ile: id="main-header"' },
  { id: 6, question: 'CSS\'te class selector nasıl yazılır?', options: ['#className', '.className', '*className', 'className'], correctAnswer: 1, explanation: 'Class selector nokta ile başlar: .btn { }' },
  { id: 7, question: 'CSS\'te id selector nasıl yazılır?', options: ['.idName', '#idName', '*idName', 'idName'], correctAnswer: 1, explanation: 'ID selector # ile başlar: #header { }' },
  { id: 8, question: 'JavaScript\'te class ile element seçme?', options: ['getElementById', 'getElementsByClassName veya querySelector', 'getElementByClass', 'selectClass'], correctAnswer: 1, explanation: 'JS: document.getElementsByClassName("btn") veya querySelector(".btn")' },
  { id: 9, question: 'JavaScript\'te id ile element seçme?', options: ['getElementById', 'getElementByClass', 'selectId', 'querySelector sadece'], correctAnswer: 0, explanation: 'JS: document.getElementById("header") en hızlı id seçimi.' },
  { id: 10, question: 'CSS specificity (öncelik) sıralaması?', options: ['class > id', 'id > class > element', 'element en öncelikli', 'Hepsi eşit'], correctAnswer: 1, explanation: 'Specificity: inline > id > class > element sırasıyla öncelik azalır.' },
  { id: 11, question: 'Aynı id birden fazla yerde kullanılabilir mi?', options: ['Evet', 'Hayır, invalid HTML (ama çalışabilir)', 'Zorunlu', 'Önerilen'], correctAnswer: 1, explanation: 'Aynı id çoklu kullanım invalid HTML\'dir, beklenmeyen davranışlara sebep olur.' },
  { id: 12, question: 'class isimlendirme convention nedir?', options: ['Rastgele', 'kebab-case, BEM, anlamlı isimler', 'CamelCase zorunlu', 'Sayılar'], correctAnswer: 1, explanation: 'class: kebab-case (btn-primary), BEM (.block__element--modifier), anlamlı isimler.' },
  { id: 13, question: 'id anchor link olarak kullanılabilir mi?', options: ['Evet, <a href="#id">', 'Hayır', 'Sadece class', 'Hata'], correctAnswer: 0, explanation: 'id ile anchor link: <a href="#section-2"> tıklanınca o id\'ye scroll eder.' },
  { id: 14, question: 'data-* attribute vs class/id farkı?', options: ['Aynı', 'data-* custom data saklar, class/id stil/seçim için', 'data-* daha hızlı', 'Hiç fark yok'], correctAnswer: 1, explanation: 'data-* custom data saklar (data-user-id="5"), class/id stil ve seçim içindir.' },
  { id: 15, question: 'Utility class nedir?', options: ['Normal class', 'Tek amaçlı CSS class (text-center, mt-2)', 'ID', 'Data attribute'], correctAnswer: 1, explanation: 'Utility class tek iş yapar: .text-center { text-align: center; } (Tailwind vb.)' }
];

export const htmlFinalQuiz: QuizQuestion[] = [
  { id: 1, question: 'HTML ne anlama gelir?', options: ['Hyperlinks and Text Markup Language', 'HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks Text Making Language'], correctAnswer: 1, explanation: 'HTML = HyperText Markup Language (Hiper Metin İşaretleme Dili)' },
  { id: 2, question: 'HTML5\'in yeni semantic etiketleri hangileridir?', options: ['<div>, <span>', '<section>, <article>, <header>, <footer>, <nav>, <aside>', 'Sadece <div>', '<table>, <form>'], correctAnswer: 1, explanation: 'HTML5 semantic: <section>, <article>, <header>, <footer>, <nav>, <aside>, <main>, <figure>' },
  { id: 3, question: 'Semantic HTML neden önemlidir?', options: ['Görsel', 'SEO, erişilebilirlik, kod okunabilirliği', 'Zorunlu', 'Hız'], correctAnswer: 1, explanation: 'Semantic HTML: arama motorları ve ekran okuyucular için anlamlı, maintainable kod.' },
  { id: 4, question: 'HTML validation neden yapılmalı?', options: ['Gereksiz', 'Cross-browser uyumluluk, SEO, erişilebilirlik', 'Zorunlu', 'Sadece production'], correctAnswer: 1, explanation: 'Validation hataları cross-browser sorunlara, SEO/erişilebilirlik sorunlarına yol açabilir.' },
  { id: 5, question: 'Responsive HTML için neler yapılmalı?', options: ['Hiçbir şey', 'meta viewport, % genişlik, media queries, responsive images', 'Sadece CSS', 'Sadece JS'], correctAnswer: 1, explanation: 'Responsive: <meta name="viewport">, fluid genişlik, media queries, srcset vb.' },
  { id: 6, question: 'Accessibility (erişilebilirlik) için HTML\'de neler yapılmalı?', options: ['Hiçbir şey', 'alt, semantic tags, ARIA, keyboard nav', 'Sadece renkler', 'Sadece font'], correctAnswer: 1, explanation: 'Accessibility: alt text, semantic HTML, ARIA attributes, keyboard navigation, proper headings.' },
  { id: 7, question: 'SEO için HTML best practices?', options: ['Hiçbir şey', 'Semantic HTML, proper headings, alt, meta tags, schema', 'Sadece keywords', 'Sadece title'], correctAnswer: 1, explanation: 'SEO: semantic tags, heading hierarchy, alt, title, meta description, schema markup, sitemap.' },
  { id: 8, question: 'HTML, CSS, JavaScript ilişkisi nedir?', options: ['Aynı', 'HTML yapı, CSS stil, JS davranış', 'Sadece HTML yeterli', 'Hepsi zorunlu'], correctAnswer: 1, explanation: 'HTML yapı/içerik, CSS görünüm/stil, JavaScript etkileşim/davranış sağlar.' },
  { id: 9, question: 'Progressive enhancement nedir?', options: ['Gereksiz', 'Temel HTML önce, sonra CSS/JS ile zenginleştirme', 'Sadece modern tarayıcı', 'Hep JS ile başla'], correctAnswer: 1, explanation: 'Progressive enhancement: Temel içerik HTML ile, sonra CSS/JS ekle (eski tarayıcılar için).' },
  { id: 10, question: 'HTML minification ne işe yarar?', options: ['Güzelleştirir', 'Boşluk/yorum siler, dosya küçültür (performans)', 'Validate eder', 'Hata bulur'], correctAnswer: 1, explanation: 'Minification gereksiz boşluk/yorum/satır siler, dosya boyutunu küçültür.' },
  { id: 11, question: 'HTML entity ne zaman kullanılır?', options: ['Her zaman', 'Özel karakterler (<, >, &, vb.)', 'Hiçbir zaman', 'Sadece metinde'], correctAnswer: 1, explanation: 'HTML entities: &lt; (<), &gt; (>), &amp; (&), &quot; ("), &copy; (©) vb.' },
  { id: 12, question: 'Inline SVG vs <img src="svg"> farkı?', options: ['Aynı', 'Inline SVG CSS/JS ile manipüle edilebilir', '<img> daha iyi', 'Fark yok'], correctAnswer: 1, explanation: 'Inline SVG DOM\'da, CSS/JS ile manipüle/animate edilebilir; <img> dış dosya.' },
  { id: 13, question: 'HTML template engine nedir?', options: ['HTML oluşturucu', 'Dinamik HTML üretme (Pug, EJS, Handlebars)', 'CSS framework', 'JS library'], correctAnswer: 1, explanation: 'Template engine (Pug, EJS, Handlebars) dinamik HTML üretir, tekrar kullanılabilir şablonlar.' },
  { id: 14, question: 'HTML sitemap nedir?', options: ['Harita', 'Arama motorları için sayfa listesi', 'Footer link', 'Menu'], correctAnswer: 1, explanation: 'HTML sitemap kullanıcı ve arama motorları için sayfa listesi (genelde XML sitemap tercih edilir).' },
  { id: 15, question: 'HTML öğrenmenin sonraki adımı nedir?', options: ['Python', 'CSS ve JavaScript', 'PHP', 'Database'], correctAnswer: 1, explanation: 'HTML sonrası CSS (stil) ve JavaScript (interaktivite) öğrenilmeli.' }
];

// CSS QUIZZES - 24 Eksik Ders için 5'er Soruluk Quizler

export const cssBackgroundsQuiz: QuizQuestion[] = [
  { id: 1, question: 'CSS\'te background-color ile ne yapılır?', options: ['Yazı rengi', 'Arka plan rengi', 'Kenarlık rengi', 'Gölge rengi'], correctAnswer: 1, explanation: 'background-color özelliği elementin arka plan rengini belirler.' },
  { id: 2, question: 'background-image ile ne eklenir?', options: ['Video', 'Resim', 'Ses', 'Text'], correctAnswer: 1, explanation: 'background-image: url("resim.jpg") ile arka plana resim eklenir.' },
  { id: 3, question: 'background-repeat: no-repeat ne yapar?', options: ['Resmi tekrarlar', 'Resmi tekrarlamaz', 'Resmi siler', 'Resmi döndürür'], correctAnswer: 1, explanation: 'background-repeat: no-repeat resmin tekrar etmesini engeller.' },
  { id: 4, question: 'background-size: cover ne işe yarar?', options: ['Resmi küçültür', 'Resmi tüm alanı kaplayacak şekilde büyütür', 'Resmi siler', 'Resmi ortaladır'], correctAnswer: 1, explanation: 'cover resmi kırpmadan tüm alanı kaplayacak şekilde ölçekler.' },
  { id: 5, question: 'background-position ile ne ayarlanır?', options: ['Resim boyutu', 'Resmin konumu', 'Resim rengi', 'Resim şeffaflığı'], correctAnswer: 1, explanation: 'background-position resmin elementteki konumunu belirler (top, center, bottom vb).' }
];

export const cssFontsQuiz: QuizQuestion[] = [
  { id: 1, question: 'font-family ile ne yapılır?', options: ['Font boyutu', 'Font ailesi/türü', 'Font rengi', 'Font kalınlığı'], correctAnswer: 1, explanation: 'font-family yazı tipini belirler: Arial, Times New Roman vb.' },
  { id: 2, question: 'font-size ile ne ayarlanır?', options: ['Font ailesi', 'Font boyutu', 'Font rengi', 'Font stili'], correctAnswer: 1, explanation: 'font-size yazı boyutunu belirler (px, em, rem, % vb).' },
  { id: 3, question: 'font-weight: bold ne yapar?', options: ['İtalik yapar', 'Kalın yapar', 'Altını çizer', 'Büyütür'], correctAnswer: 1, explanation: 'font-weight: bold yazıyı kalın yapar (100-900 arası veya bold).' },
  { id: 4, question: 'font-style: italic ne işe yarar?', options: ['Kalın yapar', 'İtalik/eğik yapar', 'Altını çizer', 'Renk değiştirir'], correctAnswer: 1, explanation: 'font-style: italic yazıyı eğik/italik yapar.' },
  { id: 5, question: 'Web font nasıl eklenir?', options: ['HTML\'de', '@font-face ile CSS\'te', 'JavaScript ile', 'Otomatik'], correctAnswer: 1, explanation: '@font-face veya Google Fonts gibi servislerle web font eklenir.' }
];

export const cssBordersQuiz: QuizQuestion[] = [
  { id: 1, question: 'border özelliği ne yapar?', options: ['Arka plan', 'Kenarlık ekler', 'Yazı rengi', 'Margin ekler'], correctAnswer: 1, explanation: 'border elementin etrafına kenarlık ekler.' },
  { id: 2, question: 'border: 2px solid red ne anlama gelir?', options: ['2px kalınlık, düz çizgi, kırmızı', 'Gölge', 'Arka plan', 'Padding'], correctAnswer: 0, explanation: 'border: kalınlık stil renk formatında yazılır.' },
  { id: 3, question: 'border-radius ne işe yarar?', options: ['Kenarlık rengi', 'Köşeleri yuvarlar', 'Kenarlık kalınlığı', 'Kenarlık stili'], correctAnswer: 1, explanation: 'border-radius köşeleri yuvarlar (px, % ile).' },
  { id: 4, question: 'border-style: dashed ne yapar?', options: ['Düz çizgi', 'Kesikli çizgi', 'Noktalı çizgi', 'Çift çizgi'], correctAnswer: 1, explanation: 'dashed kesikli çizgi, dotted noktalı, double çift çizgidir.' },
  { id: 5, question: 'Sadece üst kenarlık nasıl eklenir?', options: ['border-top', 'border-up', 'top-border', 'border-upper'], correctAnswer: 0, explanation: 'border-top, border-right, border-bottom, border-left ile tekil kenarlıklar ayarlanır.' }
];

export const cssDimensionsQuiz: QuizQuestion[] = [
  { id: 1, question: 'width özelliği ne belirler?', options: ['Yükseklik', 'Genişlik', 'Margin', 'Padding'], correctAnswer: 1, explanation: 'width elementin genişliğini belirler (px, %, vw vb).' },
  { id: 2, question: 'height ile ne ayarlanır?', options: ['Genişlik', 'Yükseklik', 'Derinlik', 'Kalınlık'], correctAnswer: 1, explanation: 'height elementin yüksekliğini ayarlar.' },
  { id: 3, question: 'max-width ne işe yarar?', options: ['Minimum genişlik', 'Maksimum genişlik sınırı', 'Sabit genişlik', 'Yükseklik'], correctAnswer: 1, explanation: 'max-width elementin alabileceği maksimum genişliği sınırlar.' },
  { id: 4, question: 'width: 100% ne anlama gelir?', options: ['100px', 'Parent elementin %100\'ü', 'Ekranın %100\'ü', 'Sabit boyut'], correctAnswer: 1, explanation: 'width: 100% parent elementin genişliğinin tamamını kaplar.' },
  { id: 5, question: 'min-height ne yapar?', options: ['Maksimum yükseklik', 'Minimum yükseklik garanti eder', 'Sabit yükseklik', 'Yüksekliği sıfırlar'], correctAnswer: 1, explanation: 'min-height elementin en az bu kadar yükseklikte olmasını sağlar.' }
];

export const cssOutlineQuiz: QuizQuestion[] = [
  { id: 1, question: 'outline ile border arasındaki fark nedir?', options: ['Aynı', 'outline yer kaplamaz, border kaplar', 'outline daha kalın', 'outline CSS3'], correctAnswer: 1, explanation: 'outline box model\'de yer kaplamaz, border kaplar. outline genelde focus için kullanılır.' },
  { id: 2, question: 'outline ne zaman görünür?', options: ['Her zaman', 'Element focus olduğunda (genelde)', 'Hover\'da', 'Hiç'], correctAnswer: 1, explanation: 'outline genelde :focus durumunda görünür (klavye navigasyonu için önemli).' },
  { id: 3, question: 'outline: none ne yapar?', options: ['Kalın outline', 'Outline\'ı kaldırır', 'Outline rengini değiştirir', 'Outline ekler'], correctAnswer: 1, explanation: 'outline: none outline\'ı kaldırır (erişilebilirlik için dikkatli kullanılmalı).' },
  { id: 4, question: 'outline-offset ne işe yarar?', options: ['Outline kalınlığı', 'Outline ile element arası boşluk', 'Outline rengi', 'Outline stili'], correctAnswer: 1, explanation: 'outline-offset outline ile element kenarı arasında boşluk bırakır.' },
  { id: 5, question: 'Erişilebilirlik için outline neden önemlidir?', options: ['Gereksiz', 'Klavye navigasyonunda focus gösterir', 'Sadece stil', 'Zorunlu değil'], correctAnswer: 1, explanation: 'outline klavye ile gezinirken hangi elementte olduğunu gösterir (erişilebilirlik).' }
];

export const cssLinksQuiz: QuizQuestion[] = [
  { id: 1, question: 'a:link pseudo-class ne zaman aktif olur?', options: ['Ziyaret edilmiş', 'Ziyaret edilmemiş linkler', 'Hover', 'Active'], correctAnswer: 1, explanation: 'a:link henüz ziyaret edilmemiş linkleri seçer.' },
  { id: 2, question: 'a:visited ne anlama gelir?', options: ['Yeni link', 'Ziyaret edilmiş link', 'Aktif link', 'Hover link'], correctAnswer: 1, explanation: 'a:visited daha önce ziyaret edilmiş linkleri hedefler.' },
  { id: 3, question: 'a:hover ne zaman çalışır?', options: ['Tıklandığında', 'Fare üzerindeyken', 'Focus\'tayken', 'Her zaman'], correctAnswer: 1, explanation: 'a:hover fare link üzerindeyken stilleri uygular.' },
  { id: 4, question: 'a:active ne zaman aktiftir?', options: ['Hover', 'Tıklanma anında', 'Focus', 'Visited'], correctAnswer: 1, explanation: 'a:active linke tıklandığı an aktif olur.' },
  { id: 5, question: 'Link pseudo-class sıralaması neden önemlidir?', options: ['Gereksiz', 'Specificity nedeniyle LVHA (Link-Visited-Hover-Active) sırası', 'Rastgele olabilir', 'Sadece alfabetik'], correctAnswer: 1, explanation: 'Doğru sıralama: :link → :visited → :hover → :active (LVHA) specificity çakışmasını önler.' }
];

export const cssListsQuiz: QuizQuestion[] = [
  { id: 1, question: 'list-style-type ne yapar?', options: ['Liste rengi', 'Madde işareti türü', 'Liste boyutu', 'Liste hizası'], correctAnswer: 1, explanation: 'list-style-type madde işaretini belirler (disc, circle, square, decimal vb).' },
  { id: 2, question: 'list-style-position: inside ne anlama gelir?', options: ['Madde işareti dışarıda', 'Madde işareti içerik akışında', 'Madde yok', 'Madde ortada'], correctAnswer: 1, explanation: 'inside madde işaretini içerik akışına dahil eder, outside dışarıda tutar.' },
  { id: 3, question: 'list-style-image ile ne yapılır?', options: ['Liste arka planı', 'Madde işareti yerine resim', 'Liste ikonu', 'Liste başlığı'], correctAnswer: 1, explanation: 'list-style-image: url("icon.png") ile madde işareti yerine resim kullanılır.' },
  { id: 4, question: 'list-style: none ne yapar?', options: ['Liste ekler', 'Madde işaretlerini kaldırır', 'Liste siler', 'Liste rengini değiştirir'], correctAnswer: 1, explanation: 'list-style: none tüm madde işaretlerini kaldırır (nav menü için sık kullanılır).' },
  { id: 5, question: 'Horizontal menü için liste nasıl yapılır?', options: ['list-style: horizontal', 'li { display: inline-block; }', 'ul { horizontal: true; }', 'Otomatik'], correctAnswer: 1, explanation: 'li elementlerine display: inline-block veya flexbox uygulanarak yatay menü yapılır.' }
];

export const cssDisplayQuiz: QuizQuestion[] = [
  { id: 1, question: 'display: block ne yapar?', options: ['Satır içi', 'Kendi satırını kaplar', 'Gizler', 'İnline'], correctAnswer: 1, explanation: 'display: block elementi kendi satırında gösterir, genişlik/yükseklik ayarlanabilir.' },
  { id: 2, question: 'display: inline ile block farkı nedir?', options: ['Aynı', 'inline satır içi, width/height alamaz; block kendi satırı, boyut alabilir', 'inline daha büyük', 'block gizler'], correctAnswer: 1, explanation: 'inline satır içinde, width/height alamaz; block kendi satırını kaplar, boyut ayarlanabilir.' },
  { id: 3, question: 'display: none ne işe yarar?', options: ['Gösterir', 'Elementi gizler ve yer kaplamaz', 'Şeffaf yapar', 'Küçültür'], correctAnswer: 1, explanation: 'display: none elementi DOM\'dan gizler, yer kaplamaz (visibility: hidden yer kaplar).' },
  { id: 4, question: 'display: inline-block avantajı nedir?', options: ['Hiçbiri', 'Satır içi ama width/height ayarlanabilir', 'Gizler', 'Sadece text'], correctAnswer: 1, explanation: 'inline-block satır içinde kalır ama width/height/margin/padding ayarlanabilir.' },
  { id: 5, question: 'display: flex ne yapar?', options: ['Block', 'Flexbox layout aktif eder', 'Grid', 'Gizler'], correctAnswer: 1, explanation: 'display: flex elementi flex container yapar, çocukları flex items olur.' }
];

export const cssPositionQuiz: QuizQuestion[] = [
  { id: 1, question: 'position: relative ne yapar?', options: ['Sabit konum', 'Normal akışta ama offset uygulanabilir', 'Absolute', 'Sticky'], correctAnswer: 1, explanation: 'position: relative normal akışta kalır, top/left/right/bottom ile kayar.' },
  { id: 2, question: 'position: absolute elementi neye göre konumlanır?', options: ['Viewport', 'En yakın position:relative/absolute/fixed parent', 'Body', 'Kendisi'], correctAnswer: 1, explanation: 'absolute en yakın positioned parent\'a göre konumlanır (yoksa body\'ye göre).' },
  { id: 3, question: 'position: fixed ne işe yarar?', options: ['Kayar', 'Viewport\'a göre sabitlenir', 'Parent\'a göre', 'Normal'], correctAnswer: 1, explanation: 'position: fixed viewport\'a göre sabitlenir, scroll ile hareket etmez.' },
  { id: 4, question: 'position: sticky ne zaman çalışır?', options: ['Hiç', 'Scroll threshold\'da yapışır', 'Her zaman', 'Sadece hover'], correctAnswer: 1, explanation: 'sticky scroll belirli bir noktaya gelince yapışır (relative + fixed karışımı).' },
  { id: 5, question: 'z-index hangi position\'larla çalışır?', options: ['Hiçbiri', 'relative, absolute, fixed, sticky', 'Sadece absolute', 'static'], correctAnswer: 1, explanation: 'z-index sadece positioned elementlerde çalışır (static hariç).' }
];

export const cssZindexQuiz: QuizQuestion[] = [
  { id: 1, question: 'z-index ne işe yarar?', options: ['Genişlik', 'Elementlerin Z ekseninde sırasını belirler', 'Yükseklik', 'Renk'], correctAnswer: 1, explanation: 'z-index elementlerin üst üste binme sırasını belirler (yüksek değer üstte).' },
  { id: 2, question: 'z-index hangi elementlerde çalışır?', options: ['Hepsinde', 'position: static olmayan elementlerde', 'Sadece div', 'Sadece absolute'], correctAnswer: 1, explanation: 'z-index sadece positioned (relative, absolute, fixed, sticky) elementlerde işe yarar.' },
  { id: 3, question: 'Yüksek z-index her zaman en üstte mi olur?', options: ['Evet', 'Hayır, stacking context\'e bağlı', 'Bazen', 'Hiçbir zaman'], correctAnswer: 1, explanation: 'z-index kendi stacking context\'inde çalışır, parent\'ın z-index\'i de etkiler.' },
  { id: 4, question: 'z-index negatif olabilir mi?', options: ['Hayır', 'Evet, elementi arka plana gönderir', 'Sadece pozitif', 'Hata verir'], correctAnswer: 1, explanation: 'z-index: -1 elementi arka plana gönderir (parent\'ın arkasına).' },
  { id: 5, question: 'Stacking context ne oluşturur?', options: ['Hiçbir şey', 'position+z-index, opacity<1, transform, vb', 'Sadece z-index', 'Hiç oluşmaz'], correctAnswer: 1, explanation: 'Stacking context: position+z-index, opacity<1, transform, filter, flex/grid items vb oluşturur.' }
];

export const cssOverflowQuiz: QuizQuestion[] = [
  { id: 1, question: 'overflow: hidden ne yapar?', options: ['Gösterir', 'Taşan içeriği gizler', 'Scrollbar ekler', 'İçeriği büyütür'], correctAnswer: 1, explanation: 'overflow: hidden içerik elementten taşarsa gizler, kaydırma çubuğu olmaz.' },
  { id: 2, question: 'overflow: scroll ne işe yarar?', options: ['Gizler', 'Her zaman scrollbar gösterir', 'Otomatik', 'Hiçbir şey'], correctAnswer: 1, explanation: 'overflow: scroll her zaman scrollbar gösterir (içerik taşmasa bile).' },
  { id: 3, question: 'overflow: auto ne zaman scrollbar gösterir?', options: ['Her zaman', 'İçerik taştığında', 'Hiç', 'Hover\'da'], correctAnswer: 1, explanation: 'overflow: auto sadece içerik taştığında scrollbar gösterir.' },
  { id: 4, question: 'overflow-x ve overflow-y ne yapar?', options: ['Aynı şey', 'Yatay ve dikey overflow ayrı ayrı ayarlar', 'Hiçbir şey', 'Sadece overflow-x'], correctAnswer: 1, explanation: 'overflow-x yatay, overflow-y dikey taşma durumunu ayrı ayrı kontrol eder.' },
  { id: 5, question: 'text-overflow: ellipsis ne zaman çalışır?', options: ['Her zaman', 'white-space: nowrap + overflow: hidden ile birlikte', 'Tek başına', 'Hiç'], correctAnswer: 1, explanation: 'text-overflow: ellipsis çalışması için white-space: nowrap ve overflow: hidden gereklidir.' }
];

export const cssFloatQuiz: QuizQuestion[] = [
  { id: 1, question: 'float: left ne yapar?', options: ['Sağa hizalar', 'Elementi sola yaslar, içerik etrafında akar', 'Ortalar', 'Gizler'], correctAnswer: 1, explanation: 'float: left elementi sola yaslar, diğer içerik etrafında akar.' },
  { id: 2, question: 'float ile normal flow\'dan çıkan element ne olur?', options: ['Kaybolur', 'Parent yüksekliğini kaybeder (collapse)', 'Büyür', 'Hiçbir şey'], correctAnswer: 1, explanation: 'Float edilen elementler normal flow\'dan çıkar, parent yüksekliğini kaybedebilir (clearfix gerekir).' },
  { id: 3, question: 'clear özelliği ne işe yarar?', options: ['Float ekler', 'Float\'ı temizler/iptal eder', 'Float değiştirir', 'Float gizler'], correctAnswer: 1, explanation: 'clear: both/left/right float\'ın etkisini temizler, element float\'tan sonra görünür.' },
  { id: 4, question: 'Clearfix hack neden kullanılır?', options: ['Gereksiz', 'Parent\'ın collapse olmasını önler', 'Float ekler', 'Renk değiştirir'], correctAnswer: 1, explanation: 'Clearfix (::after pseudo-element ile clear: both) parent\'ın yüksekliğini korur.' },
  { id: 5, question: 'Modern layout için float yerine ne kullanılır?', options: ['Table', 'Flexbox veya Grid', 'Position', 'Hiçbir şey'], correctAnswer: 1, explanation: 'Float layout için eskidir, modern projelerde Flexbox veya CSS Grid tercih edilir.' }
];

export const cssFlexboxBasicsQuiz: QuizQuestion[] = [
  { id: 1, question: 'Flexbox aktif etmek için ne yazılır?', options: ['display: flex', 'flex: true', 'flexbox: on', 'layout: flex'], correctAnswer: 0, explanation: 'display: flex ile parent flex container olur.' },
  { id: 2, question: 'flex-direction: row ne yapar?', options: ['Dikey', 'Yatay sıralama (varsayılan)', 'Ters', 'Grid'], correctAnswer: 1, explanation: 'flex-direction: row çocukları yatay sıralar (varsayılan).' },
  { id: 3, question: 'flex-direction: column ne işe yarar?', options: ['Yatay', 'Dikey sıralama', 'Ters', 'Gizler'], correctAnswer: 1, explanation: 'flex-direction: column çocukları dikey sıralar.' },
  { id: 4, question: 'flex-wrap: wrap ne yapar?', options: ['Kaydırma çubuğu', 'Taşan itemlar alt satıra geçer', 'Küçültür', 'Gizler'], correctAnswer: 1, explanation: 'flex-wrap: wrap itemlar sığmazsa alt satıra (veya sütuna) geçer.' },
  { id: 5, question: 'justify-content ne işe yarar?', options: ['Dikey hizalama', 'Ana eksende (main axis) hizalama', 'Renk', 'Boyut'], correctAnswer: 1, explanation: 'justify-content ana eksende (row\'da yatay, column\'da dikey) itemları hizalar.' }
];

export const cssFlexboxAlignQuiz: QuizQuestion[] = [
  { id: 1, question: 'align-items ne yapar?', options: ['Ana eksen', 'Çapraz eksende (cross axis) hizalama', 'Renk', 'Boyut'], correctAnswer: 1, explanation: 'align-items çapraz eksende (row\'da dikey, column\'da yatay) hizalar.' },
  { id: 2, question: 'align-items: center ne işe yarar?', options: ['Sol', 'Çapraz eksende ortalar', 'Sağ', 'Üst'], correctAnswer: 1, explanation: 'align-items: center itemları çapraz eksende ortalar.' },
  { id: 3, question: 'align-self ne zaman kullanılır?', options: ['Container\'da', 'Tek bir flex item\'ın hizalamasını değiştirmek için', 'Hiç', 'Her zaman'], correctAnswer: 1, explanation: 'align-self tek bir item\'ın align-items değerini override eder.' },
  { id: 4, question: 'justify-content: space-between ne yapar?', options: ['Ortalar', 'İtemlar arası eşit boşluk, kenarlarda boşluk yok', 'Sola yaslar', 'Gizler'], correctAnswer: 1, explanation: 'space-between itemlar arası eşit boşluk, ilk ve son itemlar kenarlarda.' },
  { id: 5, question: 'gap özelliği ne işe yarar?', options: ['Padding', 'Flex itemlar arası boşluk', 'Margin', 'Border'], correctAnswer: 1, explanation: 'gap flex/grid itemlar arasında boşluk bırakır (row-gap, column-gap).' }
];

export const cssGridIntroQuiz: QuizQuestion[] = [
  { id: 1, question: 'CSS Grid aktif etmek için ne yazılır?', options: ['display: grid', 'grid: true', 'layout: grid', 'grid: on'], correctAnswer: 0, explanation: 'display: grid ile parent grid container olur.' },
  { id: 2, question: 'grid-template-columns ne yapar?', options: ['Satır sayısı', 'Sütun genişliklerini tanımlar', 'Sütun rengi', 'Sütun sayısı'], correctAnswer: 1, explanation: 'grid-template-columns sütun sayısını ve genişliklerini belirler.' },
  { id: 3, question: 'fr birimi ne anlama gelir?', options: ['Fraction (kesir), kalan alanın oranı', 'Fixed', 'Flexible', 'Frame'], correctAnswer: 0, explanation: 'fr (fraction) kalan alanın oranını temsil eder: 1fr 2fr = 1:2 oranında paylaştırır.' },
  { id: 4, question: 'repeat() fonksiyonu ne işe yarar?', options: ['Tekrar sayısı', 'Sütun/satır tanımını tekrarlar', 'Grid siler', 'Grid kopyalar'], correctAnswer: 1, explanation: 'repeat(3, 1fr) = 1fr 1fr 1fr, tekrar eden tanımları kısaltır.' },
  { id: 5, question: 'grid-template-rows ne yapar?', options: ['Sütun', 'Satır yüksekliklerini tanımlar', 'Renk', 'Boyut'], correctAnswer: 1, explanation: 'grid-template-rows satır sayısını ve yüksekliklerini belirler.' }
];

export const cssGridLayoutQuiz: QuizQuestion[] = [
  { id: 1, question: 'grid-column ne işe yarar?', options: ['Satır', 'Grid item\'ın sütun konumunu belirler', 'Renk', 'Boyut'], correctAnswer: 1, explanation: 'grid-column: 1 / 3 item 1. sütundan 3. sütuna kadar uzar.' },
  { id: 2, question: 'grid-row ne yapar?', options: ['Sütun', 'Grid item\'ın satır konumunu belirler', 'Genişlik', 'Yükseklik'], correctAnswer: 1, explanation: 'grid-row: 2 / 4 item 2. satırdan 4. satıra kadar uzar.' },
  { id: 3, question: 'grid-template-areas ne işe yarar?', options: ['Renk', 'İsimlendirilmiş grid alanları tanımlar', 'Boyut', 'Gizler'], correctAnswer: 1, explanation: 'grid-template-areas ile grid alanlarına isim verip layout tasarlanır.' },
  { id: 4, question: 'grid-gap (gap) ne yapar?', options: ['Padding', 'Grid itemlar arası boşluk', 'Margin', 'Border'], correctAnswer: 1, explanation: 'grid-gap (veya gap) satır ve sütunlar arası boşluk bırakır.' },
  { id: 5, question: 'minmax() fonksiyonu ne işe yarar?', options: ['Minimum boyut', 'Min ve max boyut aralığı belirler', 'Maksimum', 'Sabit boyut'], correctAnswer: 1, explanation: 'minmax(100px, 1fr) en az 100px, en çok 1fr (kalan alan) genişlik verir.' }
];

export const cssMediaQueriesQuiz: QuizQuestion[] = [
  { id: 1, question: 'Media query ne işe yarar?', options: ['Resim', 'Ekran boyutuna göre farklı CSS', 'Video', 'Ses'], correctAnswer: 1, explanation: 'Media query ekran boyutu, yönelim vb. göre farklı stiller uygulamak için kullanılır.' },
  { id: 2, question: '@media (max-width: 768px) ne anlama gelir?', options: ['768px\'den büyük', '768px ve altı', '768px\'den küçük', 'Sadece 768px'], correctAnswer: 1, explanation: 'max-width: 768px ekran genişliği 768px veya altındaysa stilleri uygular (mobile-first).' },
  { id: 3, question: '@media (min-width: 1024px) ne yapar?', options: ['1024px altı', '1024px ve üstü', '1024px\'den küçük', 'Sadece 1024px'], correctAnswer: 1, explanation: 'min-width: 1024px ekran 1024px veya daha genişse stilleri uygular (desktop).' },
  { id: 4, question: 'Responsive breakpoint ne demektir?', options: ['Hata noktası', 'Ekran boyutu değişim noktası (mobile, tablet, desktop)', 'Kod hatası', 'Break komutu'], correctAnswer: 1, explanation: 'Breakpoint layout\'un değiştiği ekran boyutu eşikleridir (örn: 768px, 1024px).' },
  { id: 5, question: 'Mobile-first yaklaşım nedir?', options: ['Desktop önce', 'Mobil için tasarla, sonra büyük ekranları genişlet', 'Tablet önce', 'Hepsi aynı anda'], correctAnswer: 1, explanation: 'Mobile-first: Önce mobil CSS, sonra min-width ile büyük ekranlar için ekleme yapılır.' }
];

export const cssPseudoClassesQuiz: QuizQuestion[] = [
  { id: 1, question: 'Pseudo-class ne demektir?', options: ['Sahte sınıf', 'Elementin özel durumu (:hover, :focus vb)', 'Yeni class', 'CSS hatası'], correctAnswer: 1, explanation: 'Pseudo-class elementin özel durumunu hedefler (:hover, :focus, :active vb).' },
  { id: 2, question: ':hover ne zaman aktif olur?', options: ['Tıklandığında', 'Fare üzerindeyken', 'Focus\'tayken', 'Her zaman'], correctAnswer: 1, explanation: ':hover fare elementi üzerindeyken stilleri uygular.' },
  { id: 3, question: ':focus ne işe yarar?', options: ['Hover', 'Element odaklandığında (input, link vb)', 'Active', 'Visited'], correctAnswer: 1, explanation: ':focus element klavye veya tıklama ile odaklandığında aktif olur.' },
  { id: 4, question: ':nth-child(2) ne seçer?', options: ['İlk çocuk', 'İkinci çocuk elementi', 'Son çocuk', 'Tüm çocuklar'], correctAnswer: 1, explanation: ':nth-child(2) parent\'ın ikinci çocuğunu seçer.' },
  { id: 5, question: ':first-child ile :first-of-type farkı nedir?', options: ['Aynı', ':first-child ilk çocuk, :first-of-type o türden ilk', 'first-child daha iyi', 'Fark yok'], correctAnswer: 1, explanation: ':first-child parent\'ın ilk çocuğu, :first-of-type o elementten ilki (örn: ilk <p>).' }
];

export const cssPseudoElementsQuiz: QuizQuestion[] = [
  { id: 1, question: 'Pseudo-element ne işe yarar?', options: ['Pseudo-class', 'Elementin bir kısmını stillendirir (::before, ::after)', 'Yeni element', 'Hata'], correctAnswer: 1, explanation: 'Pseudo-element elementin belirli kısmını hedefler (::before, ::after, ::first-line vb).' },
  { id: 2, question: '::before ne yapar?', options: ['Sonra ekler', 'Element içeriğinden önce içerik ekler', 'Siler', 'Gizler'], correctAnswer: 1, explanation: '::before elementin içeriğinden önce content ekler (content özelliği gerekli).' },
  { id: 3, question: '::after ne işe yarar?', options: ['Önce ekler', 'Element içeriğinden sonra content ekler', 'Siler', 'Değiştirir'], correctAnswer: 1, explanation: '::after elementin içeriğinden sonra content ekler.' },
  { id: 4, question: '::before ve ::after için content özelliği zorunlu mu?', options: ['Hayır', 'Evet, en az content: "" gerekli', 'Opsiyonel', 'Hiç kullanılmaz'], correctAnswer: 1, explanation: '::before/::after için content özelliği zorunludur (boş olsa bile content: "").' },
  { id: 5, question: '::first-letter ne seçer?', options: ['Son harf', 'Metnin ilk harfini', 'Tüm harfler', 'İlk kelime'], correctAnswer: 1, explanation: '::first-letter metnin ilk harfini stillendirir (drop cap için).' }
];

export const cssOpacityQuiz: QuizQuestion[] = [
  { id: 1, question: 'opacity özelliği ne yapar?', options: ['Renk', 'Şeffaflık ayarlar (0-1)', 'Boyut', 'Konum'], correctAnswer: 1, explanation: 'opacity elementin şeffaflığını ayarlar (0 = tamamen şeffaf, 1 = opak).' },
  { id: 2, question: 'opacity: 0.5 ne anlama gelir?', options: ['%0 şeffaf', '%50 şeffaf', '%100 şeffaf', 'Görünmez'], correctAnswer: 1, explanation: 'opacity: 0.5 elementi %50 şeffaf yapar.' },
  { id: 3, question: 'opacity: 0 ile display: none farkı nedir?', options: ['Aynı', 'opacity yer kaplar, display: none kaplamaz', 'Fark yok', 'opacity daha hızlı'], correctAnswer: 1, explanation: 'opacity: 0 elementi gizler ama yer kaplar, display: none yer kaplamaz.' },
  { id: 4, question: 'opacity child elementleri etkiler mi?', options: ['Hayır', 'Evet, tüm çocukları da şeffaf yapar', 'Sadece ilk çocuk', 'Opsiyonel'], correctAnswer: 1, explanation: 'opacity parent ve tüm child elementlerini etkiler (sadece arka plan için RGBA kullanın).' },
  { id: 5, question: 'Sadece arka plan şeffaflığı için ne kullanılır?', options: ['opacity', 'background-color: rgba()', 'transparent', 'alpha'], correctAnswer: 1, explanation: 'background-color: rgba(0,0,0,0.5) sadece arka planı şeffaf yapar, içerik etkilenmez.' }
];

export const cssShadowQuiz: QuizQuestion[] = [
  { id: 1, question: 'box-shadow ne yapar?', options: ['Kenarlık', 'Element etrafına gölge ekler', 'Arka plan', 'Renk'], correctAnswer: 1, explanation: 'box-shadow elementi etrafına gölge ekler.' },
  { id: 2, question: 'box-shadow: 5px 10px 15px rgba(0,0,0,0.3) ne anlama gelir?', options: ['Renk', '5px sağa, 10px aşağı, 15px blur, şeffaf siyah', 'Kenarlık', 'Arka plan'], correctAnswer: 1, explanation: 'box-shadow: x-offset y-offset blur-radius color formatındadır.' },
  { id: 3, question: 'text-shadow ne işe yarar?', options: ['Box gölge', 'Metne gölge ekler', 'Arka plan', 'Kenarlık'], correctAnswer: 1, explanation: 'text-shadow metne gölge ekler (syntax box-shadow\'a benzer).' },
  { id: 4, question: 'box-shadow: inset ne yapar?', options: ['Dışarı gölge', 'İç gölge (element içinde)', 'Gölge yok', 'Çoklu gölge'], correctAnswer: 1, explanation: 'inset anahtar kelimesi gölgeyi elementin içine alır (inner shadow).' },
  { id: 5, question: 'Çoklu gölge nasıl eklenir?', options: ['Eklenemez', 'Virgülle ayırarak: box-shadow: ..., ...;', 'İki kez yazılır', 'Otomatik'], correctAnswer: 1, explanation: 'box-shadow: 2px 2px 5px red, -2px -2px 5px blue; şeklinde virgülle çoklu gölge.' }
];

export const cssTransitionsQuiz: QuizQuestion[] = [
  { id: 1, question: 'transition özelliği ne yapar?', options: ['Animasyon', 'CSS değişimlerini yumuşatır', 'Transform', 'Gölge'], correctAnswer: 1, explanation: 'transition CSS özellik değişimlerini yumuşak/animasyonlu hale getirir.' },
  { id: 2, question: 'transition: all 0.3s ease ne anlama gelir?', options: ['Hiçbir şey', 'Tüm özellikler 0.3 saniyede ease easing ile', 'Sadece renk', 'Sadece boyut'], correctAnswer: 1, explanation: 'transition: property duration timing-function delay formatındadır.' },
  { id: 3, question: 'transition-property ne işe yarar?', options: ['Süre', 'Hangi CSS özelliklerinin transition alacağını belirler', 'Easing', 'Delay'], correctAnswer: 1, explanation: 'transition-property: opacity, transform; gibi belirli özellikleri seçer (all = hepsi).' },
  { id: 4, question: 'transition-duration ne yapar?', options: ['Özellik', 'Transition süresini belirler (s veya ms)', 'Easing', 'Tekrar'], correctAnswer: 1, explanation: 'transition-duration: 0.5s veya 500ms ile süre ayarlanır.' },
  { id: 5, question: 'ease, linear, ease-in-out nedir?', options: ['Renkler', 'Timing function (easing)', 'Süreler', 'Özellikler'], correctAnswer: 1, explanation: 'Timing functions animasyonun hızını kontrol eder: ease (yavaş-hızlı-yavaş), linear (sabit), ease-in-out vb.' }
];

export const cssAnimationsQuiz: QuizQuestion[] = [
  { id: 1, question: '@keyframes ne işe yarar?', options: ['Renk', 'Animasyon adımlarını tanımlar', 'Geçiş', 'Gölge'], correctAnswer: 1, explanation: '@keyframes ile animasyonun her aşaması tanımlanır (from/to veya %).' },
  { id: 2, question: 'animation-name ne yapar?', options: ['Süre', 'Kullanılacak @keyframes animasyon adını belirtir', 'Easing', 'Tekrar'], correctAnswer: 1, explanation: 'animation-name: myAnimation; ile tanımlı @keyframes myAnimation kullanılır.' },
  { id: 3, question: 'animation-duration ne işe yarar?', options: ['İsim', 'Animasyon süresini belirler', 'Tekrar', 'Delay'], correctAnswer: 1, explanation: 'animation-duration: 2s animasyonun 2 saniye sürmesini sağlar.' },
  { id: 4, question: 'animation-iteration-count: infinite ne yapar?', options: ['Bir kez', 'Animasyonu sonsuz tekrarlar', 'İki kez', 'Hiç'], correctAnswer: 1, explanation: 'infinite animasyonun sürekli tekrarlamasını sağlar (sayı ile de belirtilebilir).' },
  { id: 5, question: 'animation-direction: alternate ne anlama gelir?', options: ['Normal', 'İleri-geri değişimli çalışır', 'Ters', 'Durur'], correctAnswer: 1, explanation: 'alternate animasyonu ileri sonra geri oynatır (yoyo etkisi).' }
];

export const cssTransformQuiz: QuizQuestion[] = [
  { id: 1, question: 'transform özelliği ne yapar?', options: ['Renk', 'Elementi dönüştürür (döndürme, ölçekleme, çevirme)', 'Gölge', 'Kenarlık'], correctAnswer: 1, explanation: 'transform elementi rotate, scale, translate, skew ile dönüştürür.' },
  { id: 2, question: 'transform: rotate(45deg) ne işe yarar?', options: ['Büyütür', 'Elementi 45 derece döndürür', 'Kaydırır', 'Eğer'], correctAnswer: 1, explanation: 'rotate(45deg) elementi 45 derece saat yönünde döndürür (negatif ters yön).' },
  { id: 3, question: 'transform: scale(1.5) ne yapar?', options: ['Döndürür', 'Elementi 1.5 kat büyütür', 'Kaydırır', 'Eğer'], correctAnswer: 1, explanation: 'scale(1.5) elementi %150 boyuta büyütür (0-1 küçültür).' },
  { id: 4, question: 'transform: translate(50px, 100px) ne anlama gelir?', options: ['Döndürür', '50px sağa, 100px aşağı kaydırır', 'Büyütür', 'Eğer'], correctAnswer: 1, explanation: 'translate(x, y) elementi yatay ve dikey kaydırır (position\'a alternatif).' },
  { id: 5, question: 'Çoklu transform nasıl uygulanır?', options: ['Ayrı ayrı', 'Boşlukla: transform: rotate(45deg) scale(1.2);', 'Virgülle', 'Eklenemez'], correctAnswer: 1, explanation: 'transform: rotate(45deg) scale(1.2) translateX(50px); şeklinde boşlukla çoklu.' }
];

export const cssVariablesQuiz: QuizQuestion[] = [
  { id: 1, question: 'CSS değişkeni nasıl tanımlanır?', options: ['var: değer;', '--isim: değer;', '$isim: değer;', 'isim = değer;'], correctAnswer: 1, explanation: 'CSS değişkenleri -- ile tanımlanır: --primary-color: blue;' },
  { id: 2, question: 'CSS değişkeni nasıl kullanılır?', options: ['--değişken', 'var(--değişken)', '$değişken', '{{değişken}}'], correctAnswer: 1, explanation: 'CSS değişkeni var() fonksiyonu ile kullanılır: color: var(--primary-color);' },
  { id: 3, question: ':root nerede tanımlanır?', options: ['Her elemanda', 'Genelde :root (document root) düzeyinde global değişkenler için', 'Sadece body', 'Sadece div'], correctAnswer: 1, explanation: ':root { --color: red; } ile global değişkenler tanımlanır.' },
  { id: 4, question: 'CSS değişkeni fallback değer nasıl verilir?', options: ['Verilmez', 'var(--değişken, fallback)', '--değişken || fallback', 'var(--değişken) or fallback'], correctAnswer: 1, explanation: 'var(--color, blue) eğer --color tanımlı değilse blue kullanır.' },
  { id: 5, question: 'CSS değişkenleri JavaScript ile değiştirilebilir mi?', options: ['Hayır', 'Evet, setProperty() ile', 'Sadece okuma', 'Hiç'], correctAnswer: 1, explanation: 'element.style.setProperty("--color", "red") ile JS\'den değiştirilebilir.' }
];

export const cssImportantQuiz: QuizQuestion[] = [
  { id: 1, question: '!important ne işe yarar?', options: ['Yorum', 'CSS kuralının önceliğini artırır', 'Hata', 'Açıklama'], correctAnswer: 1, explanation: '!important o kuralın diğer tüm kurallara üstün gelmesini sağlar.' },
  { id: 2, question: '!important nasıl kullanılır?', options: ['color: red important;', 'color: red !important;', '!important color: red;', 'important: true;'], correctAnswer: 1, explanation: 'Özellik değerinden sonra !important eklenir: color: red !important;' },
  { id: 3, question: '!important neden dikkatli kullanılmalı?', options: ['Gereksiz', 'Specificity\'yi bozar, override etmek zorlaşır', 'Hızlı', 'Güvenli'], correctAnswer: 1, explanation: '!important aşırı kullanımı CSS\'i yönetilmez yapar, sadece gerektiğinde kullanılmalı.' },
  { id: 4, question: '!important hangi durumlarda kullanılmalı?', options: ['Her zaman', 'Utility classes, 3rd party CSS override, acil durum', 'Hiç', 'Sadece renkler'], correctAnswer: 1, explanation: '!important: utility classes, harici CSS override veya acil düzeltmeler için.' },
  { id: 5, question: '!important\'ı override etmek için ne gerekir?', options: ['Hiçbir şey', 'Başka bir !important', 'Daha yüksek specificity', 'Inline style'], correctAnswer: 1, explanation: '!important sadece başka bir !important ile (ve daha yüksek specificity ile) override edilebilir.' }
];


