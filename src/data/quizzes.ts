// Her ders için 15 soruluk testler
import { 
  // HTML Quizzes
  htmlAttributesQuiz,
  htmlHeadingsQuiz,
  htmlParagraphsQuiz,
  htmlStylesQuiz,
  htmlFormattingQuiz,
  htmlQuotationsQuiz,
  htmlCommentsQuiz,
  htmlColorsQuiz,
  htmlCssQuiz,
  htmlLinksQuiz,
  htmlImagesQuiz,
  htmlFaviconQuiz,
  htmlPageTitleQuiz,
  htmlTablesQuiz,
  htmlListsQuiz,
  htmlBlockInlineQuiz,
  htmlDivQuiz,
  htmlClassesIdQuiz,
  htmlFinalQuiz,
  // Python Quizzes
  pyPrintVariablesQuiz, 
  pyDataTypesQuiz, 
  pyTypeConversionQuiz, 
  pyArithmeticQuiz, 
  pyInputQuiz,
  pyFinalQuiz,
  // Kotlin Quizzes
  ktIntroMainQuiz,
  ktVariablesQuiz,
  ktDataTypesQuiz,
  ktStringTemplatesQuiz,
  ktConditionalsQuiz,
  ktNullSafetyQuiz,
  ktLoopsQuiz,
  ktRangesQuiz,
  ktFunctionsQuiz,
  ktArraysListsQuiz,
  ktMapSetQuiz,
  ktWhenQuiz,
  ktClassObjectQuiz,
  ktConstructorQuiz,
  ktDataClassesQuiz,
  ktInheritanceQuiz,
  ktInterfaceQuiz,
  ktAbstractQuiz,
  ktExtensionsQuiz,
  ktScopeFunctionsQuiz,
  ktLambdaQuiz,
  kotlinFinalQuiz,
  // Swift Quizzes
  swPlaygroundQuiz,
  swVariablesQuiz,
  swDataTypesQuiz,
  swStringInterpolationQuiz,
  swOperatorsQuiz,
  swArraysQuiz,
  swDictionariesQuiz,
  swSetsQuiz,
  swControlFlowQuiz,
  swLoopsQuiz,
  swFunctionsQuiz,
  swParameterNamesQuiz,
  swOptionalsQuiz,
  swOptionalBindingQuiz,
  swGuardLetQuiz,
  swEnumsQuiz,
  swStructVsClassQuiz,
  swPropertiesQuiz,
  swMethodsQuiz,
  swInitializersQuiz,
  swInheritanceQuiz,
  swProtocolsQuiz,
  swExtensionsQuiz,
  swClosuresQuiz,
  swErrorHandlingQuiz,
  swSwiftuiIntroQuiz,
  swArcQuiz,
  swiftFinalQuiz,
  // CSS Extended Quizzes
  cssBackgroundsQuiz,
  cssFontsQuiz,
  cssBordersQuiz,
  cssDimensionsQuiz,
  cssOutlineQuiz,
  cssLinksQuiz,
  cssListsQuiz,
  cssDisplayQuiz,
  cssPositionQuiz,
  cssZindexQuiz,
  cssOverflowQuiz,
  cssFloatQuiz,
  cssFlexboxBasicsQuiz,
  cssFlexboxAlignQuiz,
  cssGridIntroQuiz,
  cssGridLayoutQuiz,
  cssMediaQueriesQuiz,
  cssPseudoClassesQuiz,
  cssPseudoElementsQuiz,
  cssOpacityQuiz,
  cssShadowQuiz,
  cssTransitionsQuiz,
  cssAnimationsQuiz,
  cssTransformQuiz,
  cssVariablesQuiz,
  cssImportantQuiz
} from './quizzesExtended';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonQuiz {
  lessonId: string;
  questions: QuizQuestion[];
}

// HTML Basic Quiz
export const htmlBasicQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'HTML hangi dilin kısaltmasıdır?',
    options: ['HyperText Markup Language', 'HighTech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
    correctAnswer: 0,
    explanation: 'HTML, HyperText Markup Language (HiperMetin İşaretleme Dili) anlamına gelir.'
  },
  {
    id: 2,
    question: 'HTML belgesinin başlangıç etiketi nedir?',
    options: ['<head>', '<body>', '<html>', '<start>'],
    correctAnswer: 2,
    explanation: '<html> etiketi, bir HTML belgesinin başlangıcını işaret eder.'
  },
  {
    id: 3,
    question: 'Web sayfasının başlığı hangi etiketle belirlenir?',
    options: ['<head>', '<title>', '<header>', '<h1>'],
    correctAnswer: 1,
    explanation: '<title> etiketi, tarayıcı sekmesinde görünen sayfa başlığını belirler.'
  },
  {
    id: 4,
    question: 'HTML\'de görünen içerik hangi etiket içinde yer alır?',
    options: ['<head>', '<html>', '<body>', '<content>'],
    correctAnswer: 2,
    explanation: '<body> etiketi, sayfada görünen tüm içeriği kapsar.'
  },
  {
    id: 5,
    question: '<!DOCTYPE html> bildirimi ne işe yarar?',
    options: ['Sayfanın rengini belirler', 'HTML5 kullanıldığını bildirir', 'Başlık ekler', 'JavaScript ekler'],
    correctAnswer: 1,
    explanation: '<!DOCTYPE html> bildirimi, tarayıcıya bu belgenin HTML5 standardında olduğunu bildirir.'
  }
];

export const htmlElementsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'HTML elementi hangi kısımlardan oluşur?',
    options: ['Sadece açılış etiketi', 'Açılış, içerik, kapanış', 'Sadece içerik', 'Sadece öznitelikler'],
    correctAnswer: 1,
    explanation: 'Bir HTML elementi: açılış etiketi, içerik ve kapanış etiketinden oluşur.'
  },
  {
    id: 2,
    question: '<div> etiketi ne tür bir elementtir?',
    options: ['Satır içi (inline)', 'Blok seviye', 'Liste', 'Form'],
    correctAnswer: 1,
    explanation: '<div> bir blok seviye elementidir ve tüm genişliği kaplar.'
  },
  {
    id: 3,
    question: '<span> etiketi ne amaçla kullanılır?',
    options: ['Blok oluşturma', 'Satır içi kapsayıcı', 'Liste yapma', 'Tablo oluşturma'],
    correctAnswer: 1,
    explanation: '<span> satır içi (inline) bir kapsayıcı elementtir.'
  },
  {
    id: 4,
    question: 'İç içe elementlerde hangisi doğrudur?',
    options: ['Alt element üst elementten önce kapanır', 'Üst element alt elementten önce kapanır', 'Aynı anda kapanır', 'Sıra önemli değil'],
    correctAnswer: 0,
    explanation: 'İç içe elementlerde alt element üst elementten önce kapanmalıdır.'
  },
  {
    id: 5,
    question: '<strong> etiketi neyi ifade eder?',
    options: ['İtalik metin', 'Kalın metin (önemli)', 'Altı çizili metin', 'Büyük metin'],
    correctAnswer: 1,
    explanation: '<strong> etiketi metnin önemli olduğunu belirtir ve kalın gösterir.'
  }
];

export const cssSyntaxQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'CSS hangi anlama gelir?',
    options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
    correctAnswer: 0,
    explanation: 'CSS, Cascading Style Sheets (Basamaklı Stil Sayfaları) anlamına gelir.'
  },
  {
    id: 2,
    question: 'CSS kuralı kaç parçadan oluşur?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: 'CSS kuralı üç parçadan oluşur: seçici, özellik ve değer.'
  },
  {
    id: 3,
    question: 'Element seçici nasıl yazılır?',
    options: ['.element', '#element', 'element', '*element'],
    correctAnswer: 2,
    explanation: 'Element seçici doğrudan element ismini kullanır: p, div, h1 gibi.'
  },
  {
    id: 4,
    question: 'Class seçici hangi işaretle başlar?',
    options: ['#', '.', '*', '@'],
    correctAnswer: 1,
    explanation: 'Class seçici nokta (.) ile başlar: .myClass'
  },
  {
    id: 5,
    question: 'ID seçici hangi işaretle başlar?',
    options: ['#', '.', '*', '@'],
    correctAnswer: 0,
    explanation: 'ID seçici hashtag (#) ile başlar: #myId'
  }
];

export const cssColorsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Hexadecimal renk kodu kaç karakterden oluşur?',
    options: ['3 veya 6', '4 veya 8', '6 veya 12', '2 veya 4'],
    correctAnswer: 0,
    explanation: 'Hex renk kodları 3 (#fff) veya 6 (#ffffff) karakterden oluşur.'
  },
  {
    id: 2,
    question: 'RGB renk sisteminde maksimum değer nedir?',
    options: ['100', '255', '1000', '256'],
    correctAnswer: 1,
    explanation: 'RGB\'de her renk kanalı 0-255 arasında değer alır.'
  },
  {
    id: 3,
    question: 'RGBA\'daki "A" harfi ne anlama gelir?',
    options: ['Active', 'Alpha', 'Array', 'Automatic'],
    correctAnswer: 1,
    explanation: 'A harfi Alpha (saydamlık) anlamına gelir ve 0-1 arası değer alır.'
  },
  {
    id: 4,
    question: 'HSL\'de "H" ne anlama gelir?',
    options: ['Height', 'Hue', 'High', 'Horizontal'],
    correctAnswer: 1,
    explanation: 'H = Hue (Ton), 0-360 derece arası renk tekerleğini temsil eder.'
  },
  {
    id: 5,
    question: 'Siyah renk hex kodda nasıl yazılır?',
    options: ['#fff', '#000', '#black', '#111'],
    correctAnswer: 1,
    explanation: 'Siyah renk #000000 veya kısaca #000 ile gösterilir.'
  }
];

export const cssBoxModelQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Box Model\'in içten dışa doğru sıralaması nedir?',
    options: ['Content-Padding-Border-Margin', 'Content-Border-Padding-Margin', 'Margin-Border-Padding-Content', 'Padding-Content-Border-Margin'],
    correctAnswer: 0,
    explanation: 'Sıralama: İçerik → Padding → Border → Margin'
  },
  {
    id: 2,
    question: 'Padding nedir?',
    options: ['Dış boşluk', 'İç boşluk', 'Kenarlık', 'Genişlik'],
    correctAnswer: 1,
    explanation: 'Padding, içerik ile kenarlık arasındaki iç boşluktur.'
  },
  {
    id: 3,
    question: 'Margin nedir?',
    options: ['Dış boşluk', 'İç boşluk', 'Kenarlık', 'Yükseklik'],
    correctAnswer: 0,
    explanation: 'Margin, elementin etrafındaki dış boşluktur.'
  },
  {
    id: 4,
    question: 'Border hangi özelliklerden oluşur?',
    options: ['width, color', 'width, style, color', 'style, color', 'width, style'],
    correctAnswer: 1,
    explanation: 'Border üç özellikten oluşur: kalınlık (width), stil (style), renk (color).'
  },
  {
    id: 5,
    question: 'box-sizing: border-box ne işe yarar?',
    options: ['Sadece content genişliği', 'Content + padding + border = toplam genişlik', 'Sadece padding dahil', 'Sadece border dahil'],
    correctAnswer: 1,
    explanation: 'border-box ile width değeri padding ve border\'ı da içerir.'
  }
];

export const cssLayoutQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'display: block nedir?',
    options: ['Satır içi eleman', 'Blok eleman - tam genişlik', 'Gizli eleman', 'Satır içi-blok'],
    correctAnswer: 1,
    explanation: 'Block elementler tam genişlik alır ve yeni satırda başlar.'
  },
  {
    id: 2,
    question: 'display: inline elementlerde genişlik ayarlanabilir mi?',
    options: ['Evet', 'Hayır', 'Sadece yükseklik', 'Sadece margin'],
    correctAnswer: 1,
    explanation: 'Inline elementlerde width ve height ayarlanamaz.'
  },
  {
    id: 3,
    question: 'Flexbox container için hangi özellik kullanılır?',
    options: ['flex: box', 'display: flex', 'box: flex', 'layout: flex'],
    correctAnswer: 1,
    explanation: 'display: flex özelliği ile Flexbox container oluşturulur.'
  },
  {
    id: 4,
    question: 'justify-content neyi hizalar?',
    options: ['Dikey eksende', 'Yatay eksende (ana eksen)', 'Köşegen', 'Z ekseni'],
    correctAnswer: 1,
    explanation: 'justify-content ana eksende (varsayılan yatay) hizalama yapar.'
  },
  {
    id: 5,
    question: 'align-items neyi hizalar?',
    options: ['Yatay eksende', 'Dikey eksende (çapraz eksen)', 'Köşegen', 'Z ekseni'],
    correctAnswer: 1,
    explanation: 'align-items çapraz eksende (varsayılan dikey) hizalama yapar.'
  }
];

export const cssResponsiveQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Media query hangi anahtar kelimeyle başlar?',
    options: ['@media', '@query', '@responsive', '@screen'],
    correctAnswer: 0,
    explanation: '@media anahtar kelimesi ile media query tanımlanır.'
  },
  {
    id: 2,
    question: 'max-width: 768px ne anlama gelir?',
    options: ['En az 768px', 'Tam 768px', 'En fazla 768px', '768px\'den büyük'],
    correctAnswer: 2,
    explanation: 'max-width: 768px, ekran genişliği 768px veya altında ise stiller uygulanır.'
  },
  {
    id: 3,
    question: 'Mobile-first yaklaşım nedir?',
    options: ['Önce masaüstü sonra mobil', 'Önce mobil sonra masaüstü', 'Sadece mobil', 'Sadece masaüstü'],
    correctAnswer: 1,
    explanation: 'Mobile-first: Önce mobil tasarla, sonra büyük ekranlar için media query ekle.'
  },
  {
    id: 4,
    question: 'Viewport meta tag\'i nerede kullanılır?',
    options: ['CSS dosyasında', 'HTML <head> içinde', 'JavaScript\'te', 'Body içinde'],
    correctAnswer: 1,
    explanation: 'Viewport meta tag\'i HTML\'in <head> bölümüne eklenir.'
  },
  {
    id: 5,
    question: 'rem birimi neye göre hesaplanır?',
    options: ['Parent element', 'Root element (html)', 'Viewport genişliği', 'Body elementi'],
    correctAnswer: 1,
    explanation: 'rem, root element (html) font boyutuna göre hesaplanır.'
  }
];

export const cssFinalQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'CSS\'te öncelik sıralaması (specificity) en yüksekten düşüğe doğru nedir?',
    options: ['Element - Class - ID', 'ID - Class - Element', 'Class - ID - Element', 'Element - ID - Class'],
    correctAnswer: 1,
    explanation: 'Öncelik sırası: Inline style > ID > Class > Element'
  },
  {
    id: 2,
    question: 'position: absolute nedir?',
    options: ['Sabit konumlandırma', 'Parent\'a göre konumlandırma', 'Normal akış içinde', 'Sayfa altına sabitle'],
    correctAnswer: 1,
    explanation: 'absolute, en yakın position değeri olan parent\'a göre konumlandırır.'
  },
  {
    id: 3,
    question: 'z-index hangi durumda çalışır?',
    options: ['Her zaman', 'position: static dışındaki değerlerde', 'Sadece position: fixed', 'Sadece flex itemlarda'],
    correctAnswer: 1,
    explanation: 'z-index, position değeri static olmayan elementlerde çalışır.'
  },
  {
    id: 4,
    question: 'transition özelliği ne işe yarar?',
    options: ['Animasyon oluşturur', 'Değişimleri yumuşatır', '3D dönüşüm yapar', 'Renk değiştirir'],
    correctAnswer: 1,
    explanation: 'transition, CSS özellik değişimlerini yumuşatır ve animasyonlu hale getirir.'
  },
  {
    id: 5,
    question: 'Grid container oluşturmak için hangi özellik kullanılır?',
    options: ['display: grid', 'grid: container', 'layout: grid', 'box: grid'],
    correctAnswer: 0,
    explanation: 'display: grid ile CSS Grid container oluşturulur.'
  },
  {
    id: 6,
    question: 'Flexbox\'ta flex-wrap: wrap ne yapar?',
    options: ['Itemları sıkıştırır', 'Itemları alt satıra geçirir', 'Itemları gizler', 'Itemları tersine çevirir'],
    correctAnswer: 1,
    explanation: 'flex-wrap: wrap, taşan itemları alt satıra geçirir.'
  },
  {
    id: 7,
    question: 'CSS\'te !important ne işe yarar?',
    options: ['Öncelik artırır', 'Yoruma çevirir', 'Siler', 'Kopyalar'],
    correctAnswer: 0,
    explanation: '!important, CSS kuralının önceliğini en üst seviyeye çıkarır.'
  },
  {
    id: 8,
    question: 'opacity: 0.5 ne yapar?',
    options: ['%50 küçültür', '%50 şeffaflık', 'Gizler', 'Rengini açar'],
    correctAnswer: 1,
    explanation: 'opacity, elementin şeffaflığını ayarlar. 0 = tamamen şeffaf, 1 = opak.'
  },
  {
    id: 9,
    question: 'overflow: hidden ne işe yarar?',
    options: ['Elementi gizler', 'Taşan içeriği gizler', 'Kaydırma çubuğu ekler', 'Küçültür'],
    correctAnswer: 1,
    explanation: 'overflow: hidden, elementin dışına taşan içeriği gizler.'
  },
  {
    id: 10,
    question: ':hover pseudo-class ne zaman aktif olur?',
    options: ['Tıklandığında', 'Fare üzerine geldiğinde', 'Focus\'ta', 'Sayfa yüklendiğinde'],
    correctAnswer: 1,
    explanation: ':hover, fare imleci elementin üzerine geldiğinde aktif olur.'
  },
  {
    id: 11,
    question: 'CSS\'te virgülle ayrılmış seçiciler ne yapar?',
    options: ['Alt alta seçer', 'Her birine aynı stili uygular', 'Sadece birini seçer', 'Hata verir'],
    correctAnswer: 1,
    explanation: 'Virgülle ayrılmış seçiciler (h1, h2, p) her birine aynı stilleri uygular.'
  },
  {
    id: 12,
    question: 'calc() fonksiyonu ne işe yarar?',
    options: ['Renk hesaplama', 'Matematiksel işlemler', 'Süre hesaplama', 'Font boyutu'],
    correctAnswer: 1,
    explanation: 'calc() ile CSS\'te matematiksel işlemler yapılabilir: width: calc(100% - 50px)'
  },
  {
    id: 13,
    question: 'background-size: cover ne yapar?',
    options: ['Arka planı tekrarlar', 'Tüm alanı kaplar (kırpar)', 'Sığdırır', 'Orjinal boyutta gösterir'],
    correctAnswer: 1,
    explanation: 'cover, arka plan resmini en-boy oranını koruyarak tüm alanı kaplar, gerekirse kırpar.'
  },
  {
    id: 14,
    question: 'text-transform: capitalize ne yapar?',
    options: ['Tümü büyük', 'Tümü küçük', 'Her kelimenin ilk harfi büyük', 'Değiştirmez'],
    correctAnswer: 2,
    explanation: 'capitalize, her kelimenin ilk harfini büyük yapar.'
  },
  {
    id: 15,
    question: 'box-shadow hangi sıralamayı takip eder?',
    options: ['x y blur color', 'color x y blur', 'blur x y color', 'x blur y color'],
    correctAnswer: 0,
    explanation: 'box-shadow: x-offset y-offset blur-radius spread-radius color'
  },
  {
    id: 16,
    question: 'CSS Grid\'de fr birimi ne anlama gelir?',
    options: ['Fixed ratio', 'Fraction (kesir)', 'Frame', 'Free'],
    correctAnswer: 1,
    explanation: 'fr (fraction), Grid\'de kullanılabilir alanın bir kesrini temsil eder.'
  },
  {
    id: 17,
    question: 'transform: rotate(45deg) ne yapar?',
    options: ['45 derece büyütür', '45 derece döndürür', '45px taşır', '45% küçültür'],
    correctAnswer: 1,
    explanation: 'rotate(), elementi belirtilen derece kadar döndürür.'
  },
  {
    id: 18,
    question: 'CSS Variables (Custom Properties) nasıl tanımlanır?',
    options: ['$variable-name', '@variable-name', '--variable-name', 'var-name'],
    correctAnswer: 2,
    explanation: 'CSS değişkenleri -- ile tanımlanır: --main-color: blue;'
  },
  {
    id: 19,
    question: '@keyframes ne işe yarar?',
    options: ['Media query tanımlar', 'Animasyon tanımlar', 'Font ekler', 'Import yapar'],
    correctAnswer: 1,
    explanation: '@keyframes ile CSS animasyonları tanımlanır.'
  },
  {
    id: 20,
    question: 'line-height: 1.5 ne anlama gelir?',
    options: ['1.5px yükseklik', '1.5cm yükseklik', 'Font boyutunun 1.5 katı', '15% yükseklik'],
    correctAnswer: 2,
    explanation: 'Birim olmayan line-height değerleri, font boyutunun katı olarak hesaplanır.'
  }
];

export const jsVariablesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'let ile tanımlanan değişken değiştirilebilir mi?',
    options: ['Evet', 'Hayır', 'Sadece bir kez', 'Sadece number tipinde'],
    correctAnswer: 0,
    explanation: 'let ile tanımlanan değişkenler tekrar atanabilir (mutable).'
  },
  {
    id: 2,
    question: 'const ile tanımlanan değişken değiştirilebilir mi?',
    options: ['Evet', 'Hayır', 'Sadece object\'lerde', 'Sadece array\'lerde'],
    correctAnswer: 1,
    explanation: 'const ile tanımlanan değişkenler tekrar atanamaz (immutable).'
  },
  {
    id: 3,
    question: 'var ile tanımlanan değişkenlerin scope\'u nedir?',
    options: ['Block scope', 'Function scope', 'Global scope', 'Module scope'],
    correctAnswer: 1,
    explanation: 'var, function scope\'a sahiptir, let ve const ise block scope.'
  },
  {
    id: 4,
    question: 'Modern JavaScript\'te hangi değişken tanımlama yöntemi önerilir?',
    options: ['var', 'let ve const', 'Sadece var', 'Sadece let'],
    correctAnswer: 1,
    explanation: 'Modern JavaScript\'te let ve const kullanımı önerilir, var eski yöntemdir.'
  },
  {
    id: 5,
    question: 'Değişken tanımlarken tip belirtmek gerekir mi?',
    options: ['Evet', 'Hayır', 'Sadece const\'ta', 'Sadece number\'da'],
    correctAnswer: 1,
    explanation: 'JavaScript dinamik tipli bir dildir, tip otomatik belirlenir.'
  }
];

export const jsDataTypesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'JavaScript\'te kaç primitive (ilkel) veri tipi vardır?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: '7 primitive tip: string, number, boolean, undefined, null, symbol, bigint'
  },
  {
    id: 2,
    question: 'typeof null sonucu nedir?',
    options: ['null', 'object', 'undefined', 'number'],
    correctAnswer: 1,
    explanation: 'typeof null "object" döner, bu JavaScript\'in bilinen bir hatasıdır.'
  },
  {
    id: 3,
    question: 'NaN hangi veri tipine aittir?',
    options: ['string', 'number', 'undefined', 'object'],
    correctAnswer: 1,
    explanation: 'NaN (Not a Number) aslında number tipindedir.'
  },
  {
    id: 4,
    question: 'Boolean tipinde kaç değer vardır?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'Boolean tipinde sadece 2 değer vardır: true ve false'
  },
  {
    id: 5,
    question: 'undefined ne zaman oluşur?',
    options: ['Değişken tanımlanmamış', 'Değişken tanımlanmış ama değer atanmamış', 'Değer null', 'Syntax hatası'],
    correctAnswer: 1,
    explanation: 'Değişken tanımlanıp değer atanmazsa undefined olur.'
  }
];

export const jsOperatorsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: '5 == "5" ifadesinin sonucu nedir?',
    options: ['true', 'false', 'undefined', 'error'],
    correctAnswer: 0,
    explanation: '== operatörü tip dönüşümü yapar, değerler eşittir.'
  },
  {
    id: 2,
    question: '5 === "5" ifadesinin sonucu nedir?',
    options: ['true', 'false', 'undefined', 'error'],
    correctAnswer: 1,
    explanation: '=== operatörü tip dönüşümü yapmaz, tip ve değer farklı olduğu için false.'
  },
  {
    id: 3,
    question: '++ operatörü ne işe yarar?',
    options: ['Toplama', 'Bir artırma', 'İki artırma', 'Çarpma'],
    correctAnswer: 1,
    explanation: '++ operatörü değişkeni 1 artırır (increment).'
  },
  {
    id: 4,
    question: 'typeof operatörü ne döner?',
    options: ['number', 'string', 'boolean', 'Değişkenin tipini string olarak'],
    correctAnswer: 3,
    explanation: 'typeof, değişkenin veri tipini string olarak döner.'
  },
  {
    id: 5,
    question: '10 % 3 işleminin sonucu nedir?',
    options: ['3', '3.33', '1', '0'],
    correctAnswer: 2,
    explanation: '% (modulo) operatörü bölme işleminden kalanı verir. 10 / 3 = 3 kalan 1'
  }
];

export const jsFunctionsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Arrow function nasıl tanımlanır?',
    options: ['function() {}', '() => {}', 'func() {}', 'def() {}'],
    correctAnswer: 1,
    explanation: 'Arrow function () => {} şeklinde tanımlanır.'
  },
  {
    id: 2,
    question: 'Function declaration ile function expression arasındaki fark nedir?',
    options: ['Fark yok', 'Declaration hoisted, expression değil', 'Expression daha hızlı', 'Declaration daha yavaş'],
    correctAnswer: 1,
    explanation: 'Function declaration yukarı taşınır (hoisted), expression değişken gibi davranır.'
  },
  {
    id: 3,
    question: 'return ifadesi ne işe yarar?',
    options: ['Fonksiyonu başlatır', 'Fonksiyonu sonlandırır ve değer döner', 'Fonksiyonu tekrarlar', 'Hata verir'],
    correctAnswer: 1,
    explanation: 'return, fonksiyonu sonlandırır ve isteğe bağlı olarak bir değer döner.'
  },
  {
    id: 4,
    question: 'Default parameter nedir?',
    options: ['İlk parametre', 'Son parametre', 'Parametre verilmezse kullanılan varsayılan değer', 'Zorunlu parametre'],
    correctAnswer: 2,
    explanation: 'Default parameter: function greet(name = "Misafir") şeklinde tanımlanır.'
  },
  {
    id: 5,
    question: 'Callback function nedir?',
    options: ['Hemen çalışan fonksiyon', 'Başka bir fonksiyona parametre olarak verilen fonksiyon', 'Döngü fonksiyonu', 'Matematiksel fonksiyon'],
    correctAnswer: 1,
    explanation: 'Callback, başka bir fonksiyona parametre olarak verilen ve daha sonra çağrılan fonksiyondur.'
  }
];

export const jsArraysQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Array indeksi nereden başlar?',
    options: ['1', '0', '-1', '2'],
    correctAnswer: 1,
    explanation: 'JavaScript\'te array indeksi 0\'dan başlar.'
  },
  {
    id: 2,
    question: 'push() metodu ne yapar?',
    options: ['İlk elemana ekler', 'Son elemana ekler', 'Ortaya ekler', 'Hiçbiri'],
    correctAnswer: 1,
    explanation: 'push() metodu array\'in sonuna eleman ekler.'
  },
  {
    id: 3,
    question: 'pop() metodu ne yapar?',
    options: ['İlk elemanı siler', 'Son elemanı siler', 'Ortadaki elemanı siler', 'Tümünü siler'],
    correctAnswer: 1,
    explanation: 'pop() metodu array\'in son elemanını siler ve döner.'
  },
  {
    id: 4,
    question: 'map() metodu ne işe yarar?',
    options: ['Array\'i sıralar', 'Her elemana fonksiyon uygular ve yeni array döner', 'Array uzunluğunu döner', 'Array\'i tersine çevirir'],
    correctAnswer: 1,
    explanation: 'map() her elemana fonksiyon uygular ve yeni bir array döner, orijinali değiştirmez.'
  },
  {
    id: 5,
    question: 'filter() metodu ne yapar?',
    options: ['İlk elemanı döner', 'Koşula uyan elemanlardan yeni array oluşturur', 'Array\'i temizler', 'Sıralar'],
    correctAnswer: 1,
    explanation: 'filter() koşula uyan elemanlardan yeni bir array oluşturur.'
  }
];

export const jsObjectsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Object nasıl oluşturulur?',
    options: ['[]', '{}', '()', '<>'],
    correctAnswer: 1,
    explanation: 'Object süslü parantezlerle {} oluşturulur.'
  },
  {
    id: 2,
    question: 'Object property\'sine nasıl erişilir?',
    options: ['object.key veya object["key"]', 'Sadece object.key', 'Sadece object["key"]', 'object->key'],
    correctAnswer: 0,
    explanation: 'Object property\'sine iki şekilde erişilir: dot notation (.) veya bracket notation []'
  },
  {
    id: 3,
    question: 'Object.keys() ne döner?',
    options: ['Değerleri', 'Anahtarları array olarak', 'Anahtar-değer çiftlerini', 'Uzunluğu'],
    correctAnswer: 1,
    explanation: 'Object.keys() objenin anahtarlarını array olarak döner.'
  },
  {
    id: 4,
    question: 'Object.values() ne döner?',
    options: ['Anahtarları', 'Değerleri array olarak', 'Anahtar-değer çiftlerini', 'Tip bilgisini'],
    correctAnswer: 1,
    explanation: 'Object.values() objenin değerlerini array olarak döner.'
  },
  {
    id: 5,
    question: 'delete operatörü ne işe yarar?',
    options: ['Tüm objeyi siler', 'Bir property\'yi siler', 'Değeri siler', 'Hiçbiri'],
    correctAnswer: 1,
    explanation: 'delete operatörü objeden bir property\'yi siler: delete obj.key'
  }
];

export const jsEventsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'addEventListener() kaç parametre alır?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'addEventListener(event, callback) iki ana parametre alır: event tipi ve callback fonksiyonu.'
  },
  {
    id: 2,
    question: 'event.preventDefault() ne işe yarar?',
    options: ['Event\'i siler', 'Event\'in varsayılan davranışını engeller', 'Event\'i durdurur', 'Hata verir'],
    correctAnswer: 1,
    explanation: 'preventDefault() event\'in varsayılan davranışını engeller (örn: form submit, link tıklama).'
  },
  {
    id: 3,
    question: 'event.stopPropagation() ne yapar?',
    options: ['Event\'i siler', 'Event\'in yukarı doğru yayılmasını durdurur', 'Sayfayı durdurur', 'Fonksiyonu durdurur'],
    correctAnswer: 1,
    explanation: 'stopPropagation() event bubbling\'i durdurur, parent elementlere iletilmez.'
  },
  {
    id: 4,
    question: 'click event\'i ne zaman tetiklenir?',
    options: ['Fare üzerine geldiğinde', 'Tıklandığında', 'Fare ayrıldığında', 'Çift tıklandığında'],
    correctAnswer: 1,
    explanation: 'click event\'i element tıklandığında tetiklenir.'
  },
  {
    id: 5,
    question: 'DOMContentLoaded event\'i ne zaman tetiklenir?',
    options: ['Sayfa tamamen yüklendiğinde', 'HTML parse edildiğinde', 'Resimler yüklendiğinde', 'CSS yüklendiğinde'],
    correctAnswer: 1,
    explanation: 'DOMContentLoaded, HTML tamamen parse edilip DOM oluşturulduğunda tetiklenir.'
  }
];

export const jsDOMQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'document.getElementById() ne döner?',
    options: ['Array', 'Tek element', 'NodeList', 'HTMLCollection'],
    correctAnswer: 1,
    explanation: 'getElementById() ID\'ye sahip tek bir elementi döner.'
  },
  {
    id: 2,
    question: 'querySelector() ne döner?',
    options: ['Tüm eşleşen elementler', 'İlk eşleşen element', 'Array', 'Object'],
    correctAnswer: 1,
    explanation: 'querySelector() CSS selector\'e uyan ilk elementi döner.'
  },
  {
    id: 3,
    question: 'querySelectorAll() ne döner?',
    options: ['Array', 'NodeList', 'HTMLCollection', 'Object'],
    correctAnswer: 1,
    explanation: 'querySelectorAll() eşleşen tüm elementleri NodeList olarak döner.'
  },
  {
    id: 4,
    question: 'innerHTML ile textContent arasındaki fark nedir?',
    options: ['Fark yok', 'innerHTML HTML parse eder, textContent sadece text', 'textContent daha hızlı', 'innerHTML güvenli değil'],
    correctAnswer: 1,
    explanation: 'innerHTML HTML kodunu parse eder, textContent sadece text olarak işler (güvenli).'
  },
  {
    id: 5,
    question: 'createElement() ne işe yarar?',
    options: ['Yeni HTML dosyası oluşturur', 'Yeni DOM elementi oluşturur', 'CSS oluşturur', 'Class oluşturur'],
    correctAnswer: 1,
    explanation: 'createElement() bellekte yeni bir DOM elementi oluşturur.'
  }
];

export const jsAsyncQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Promise hangi state\'lere sahiptir?',
    options: ['pending, resolved', 'pending, fulfilled, rejected', 'success, error', 'wait, done'],
    correctAnswer: 1,
    explanation: 'Promise 3 state\'e sahiptir: pending (bekliyor), fulfilled (başarılı), rejected (başarısız).'
  },
  {
    id: 2,
    question: 'async function ne döner?',
    options: ['void', 'Promise', 'Object', 'undefined'],
    correctAnswer: 1,
    explanation: 'async function her zaman bir Promise döner.'
  },
  {
    id: 3,
    question: 'await sadece nerede kullanılabilir?',
    options: ['Her yerde', 'async function içinde', 'Promise içinde', 'callback\'te'],
    correctAnswer: 1,
    explanation: 'await sadece async function içinde kullanılabilir.'
  },
  {
    id: 4,
    question: 'then() metodu ne zaman çalışır?',
    options: ['Hemen', 'Promise fulfilled olduğunda', 'Promise rejected olduğunda', 'Hiçbir zaman'],
    correctAnswer: 1,
    explanation: 'then() metodu Promise başarıyla tamamlandığında (fulfilled) çalışır.'
  },
  {
    id: 5,
    question: 'catch() metodu ne yapar?',
    options: ['Promise başlatır', 'Hataları yakalar', 'Veriyi döner', 'Promise oluşturur'],
    correctAnswer: 1,
    explanation: 'catch() metodu Promise zincirindeki hataları yakalar.'
  }
];

export const jsFinalQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Closure nedir?',
    options: ['Kapalı fonksiyon', 'Fonksiyonun dış scope\'a erişmesi', 'Final değişken', 'Private değişken'],
    correctAnswer: 1,
    explanation: 'Closure: İç fonksiyonun dış fonksiyonun değişkenlerine erişebilmesidir.'
  },
  {
    id: 2,
    question: 'Hoisting nedir?',
    options: ['Değişkenlerin yukarı taşınması', 'Fonksiyonların aşağı inmesi', 'Tip dönüşümü', 'Scope oluşturma'],
    correctAnswer: 0,
    explanation: 'Hoisting: Değişken ve fonksiyon bildirimlerinin scope\'un en üstüne taşınmasıdır.'
  },
  {
    id: 3,
    question: 'this anahtar kelimesi ne anlama gelir?',
    options: ['Global object', 'Fonksiyonun kendisi', 'Çağrıldığı context', 'undefined'],
    correctAnswer: 2,
    explanation: 'this, fonksiyonun çağrıldığı context\'i (bağlamı) temsil eder.'
  },
  {
    id: 4,
    question: 'Strict mode nasıl aktif edilir?',
    options: ['"use strict";', 'strict: true', 'mode="strict"', 'enable strict'],
    correctAnswer: 0,
    explanation: '"use strict"; dosyanın veya fonksiyonun başına eklenerek strict mode aktif edilir.'
  },
  {
    id: 5,
    question: 'Spread operator (...) ne işe yarar?',
    options: ['Toplar', 'Array/object\'i açar', 'Çıkarır', 'Birleştirir'],
    correctAnswer: 1,
    explanation: 'Spread operator (...) array veya object\'i elemanlarına ayırır.'
  },
  {
    id: 6,
    question: 'Destructuring nedir?',
    options: ['Silme işlemi', 'Array/object\'ten değer çıkarma', 'Tip dönüşümü', 'Kopyalama'],
    correctAnswer: 1,
    explanation: 'Destructuring: Array veya object\'ten değerleri değişkenlere atama.'
  },
  {
    id: 7,
    question: 'Template literal nasıl yazılır?',
    options: ['"string"', '\'string\'', '`string`', '<string>'],
    correctAnswer: 2,
    explanation: 'Template literal backtick (`) ile yazılır ve ${} ile değişken gömülebilir.'
  },
  {
    id: 8,
    question: 'JSON.stringify() ne yapar?',
    options: ['String\'i object\'e çevirir', 'Object\'i string\'e çevirir', 'Array oluşturur', 'Parse eder'],
    correctAnswer: 1,
    explanation: 'JSON.stringify() JavaScript object\'ini JSON string\'ine çevirir.'
  },
  {
    id: 9,
    question: 'JSON.parse() ne yapar?',
    options: ['String\'i object\'e çevirir', 'Object\'i string\'e çevirir', 'Hata verir', 'Sıralar'],
    correctAnswer: 0,
    explanation: 'JSON.parse() JSON string\'ini JavaScript object\'ine çevirir.'
  },
  {
    id: 10,
    question: 'localStorage ile sessionStorage arasındaki fark nedir?',
    options: ['Fark yok', 'localStorage kalıcı, sessionStorage geçici', 'sessionStorage daha büyük', 'localStorage daha hızlı'],
    correctAnswer: 1,
    explanation: 'localStorage tarayıcı kapatılsa da kalır, sessionStorage oturum sonunda silinir.'
  },
  {
    id: 11,
    question: 'setTimeout() ne işe yarar?',
    options: ['Anında çalışır', 'Belirli süre sonra çalışır', 'Sürekli çalışır', 'Hiç çalışmaz'],
    correctAnswer: 1,
    explanation: 'setTimeout() belirtilen milisaniye sonra fonksiyonu bir kez çalıştırır.'
  },
  {
    id: 12,
    question: 'setInterval() ne işe yarar?',
    options: ['Bir kez çalışır', 'Belirli aralıklarla sürekli çalışır', 'Hiç çalışmaz', 'Random çalışır'],
    correctAnswer: 1,
    explanation: 'setInterval() belirtilen milisaniye aralıklarla fonksiyonu sürekli çalıştırır.'
  },
  {
    id: 13,
    question: 'Array.isArray() ne döner?',
    options: ['Array uzunluğu', 'Boolean (true/false)', 'Array tipi', 'undefined'],
    correctAnswer: 1,
    explanation: 'Array.isArray() parametre array ise true, değilse false döner.'
  },
  {
    id: 14,
    question: 'Number.isNaN() ile isNaN() arasındaki fark nedir?',
    options: ['Fark yok', 'Number.isNaN() daha güvenli, tip dönüşümü yapmaz', 'isNaN() daha hızlı', 'Number.isNaN() eski'],
    correctAnswer: 1,
    explanation: 'Number.isNaN() tip dönüşümü yapmadan kontrol eder, daha güvenilirdir.'
  },
  {
    id: 15,
    question: 'includes() metodu ne yapar?',
    options: ['Eleman ekler', 'Array/string\'te eleman var mı kontrol eder', 'Sıralar', 'Filtreler'],
    correctAnswer: 1,
    explanation: 'includes() array veya string\'te belirtilen elemanın olup olmadığını kontrol eder.'
  },
  {
    id: 16,
    question: 'find() metodu ne döner?',
    options: ['Tüm eşleşen elemanlar', 'İlk eşleşen elemanı', 'Index', 'Boolean'],
    correctAnswer: 1,
    explanation: 'find() koşula uyan ilk elemanı döner, bulamazsa undefined.'
  },
  {
    id: 17,
    question: 'reduce() metodu ne işe yarar?',
    options: ['Array\'i küçültür', 'Array\'i tek bir değere indirger', 'Sıralar', 'Filtreler'],
    correctAnswer: 1,
    explanation: 'reduce() array elemanlarını işleyerek tek bir değere indirger (örn: toplam).'
  },
  {
    id: 18,
    question: 'some() metodu ne döner?',
    options: ['Tüm elemanlar koşula uyuyorsa true', 'En az bir eleman koşula uyuyorsa true', 'Eleman sayısı', 'İlk eleman'],
    correctAnswer: 1,
    explanation: 'some() en az bir eleman koşula uyuyorsa true döner.'
  },
  {
    id: 19,
    question: 'every() metodu ne döner?',
    options: ['Tüm elemanlar koşula uyuyorsa true', 'En az bir eleman koşula uyuyorsa true', 'Eleman sayısı', 'Son eleman'],
    correctAnswer: 0,
    explanation: 'every() tüm elemanlar koşula uyuyorsa true, bir tanesi bile uymazsa false döner.'
  },
  {
    id: 20,
    question: 'Arrow function\'da this nasıl davranır?',
    options: ['Normal fonksiyon gibi', 'Lexical this (dış scope\'tan alır)', 'Global this', 'undefined'],
    correctAnswer: 1,
    explanation: 'Arrow function kendi this\'e sahip değildir, dış scope\'tan alır (lexical this).'
  }
];

export const reactIntroQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'React hangi şirket tarafından geliştirilmiştir?',
    options: ['Google', 'Facebook', 'Microsoft', 'Apple'],
    correctAnswer: 1,
    explanation: 'React, Facebook (Meta) tarafından geliştirilmiş ve açık kaynaklı hale getirilmiştir.'
  },
  {
    id: 2,
    question: 'React\'in temel yapı taşı nedir?',
    options: ['Module', 'Component', 'Function', 'Class'],
    correctAnswer: 1,
    explanation: 'React component tabanlı bir yapıya sahiptir, her şey componentlerden oluşur.'
  },
  {
    id: 3,
    question: 'React neden Sanal DOM kullanır?',
    options: ['Daha az bellek', 'Daha hızlı güncelleme', 'Daha güvenli', 'Daha kolay'],
    correctAnswer: 1,
    explanation: 'Sanal DOM sayesinde React, sadece değişen kısımları gerçek DOM\'a uygular ve hızlı güncelleme sağlar.'
  },
  {
    id: 4,
    question: 'React projesi oluşturmak için hangi komut kullanılır? (Vite)',
    options: ['npm create react', 'npm create vite', 'npm install react', 'npx create-react'],
    correctAnswer: 1,
    explanation: 'Vite ile hızlı React projesi oluşturmak için: npm create vite@latest'
  },
  {
    id: 5,
    question: 'React\'te veri akışı nasıldır?',
    options: ['İki yönlü', 'Tek yönlü (yukarıdan aşağı)', 'Çift yönlü', 'Random'],
    correctAnswer: 1,
    explanation: 'React tek yönlü veri akışına (one-way data flow) sahiptir: parent\'tan child\'a.'
  }
];

export const reactJSXQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'JSX ne anlama gelir?',
    options: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'Java XML'],
    correctAnswer: 0,
    explanation: 'JSX, JavaScript XML anlamına gelir ve HTML benzeri kod yazmamızı sağlar.'
  },
  {
    id: 2,
    question: 'JSX kodu neye dönüştürülür?',
    options: ['HTML', 'React.createElement() çağrılarına', 'CSS', 'JSON'],
    correctAnswer: 1,
    explanation: 'Babel, JSX kodunu React.createElement() çağrılarına dönüştürür.'
  },
  {
    id: 3,
    question: 'JSX içinde JavaScript ifadesi nasıl yazılır?',
    options: ['{{ kod }}', '{ kod }', '[ kod ]', '( kod )'],
    correctAnswer: 1,
    explanation: 'JSX içinde JavaScript ifadeleri süslü parantez {} içinde yazılır.'
  },
  {
    id: 4,
    question: 'JSX\'te class yerine hangi attribute kullanılır?',
    options: ['class', 'className', 'classname', 'cls'],
    correctAnswer: 1,
    explanation: 'JavaScript\'te class rezerve kelime olduğu için JSX\'te className kullanılır.'
  },
  {
    id: 5,
    question: 'JSX\'te bir component birden fazla root element dönebilir mi?',
    options: ['Evet', 'Hayır, tek root element olmalı', 'Sadece div kullanılırsa', 'Sadece Fragment ile'],
    correctAnswer: 1,
    explanation: 'JSX\'te tek bir root element dönülmelidir. Birden fazla için Fragment (<></>) kullanılır.'
  }
];

export const reactComponentsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Function component nasıl tanımlanır?',
    options: ['class MyComponent', 'function MyComponent()', 'component MyComponent', 'const MyComponent = class'],
    correctAnswer: 1,
    explanation: 'Function component normal bir JavaScript fonksiyonu gibi tanımlanır.'
  },
  {
    id: 2,
    question: 'Component isimleri nasıl olmalıdır?',
    options: ['küçük harfle', 'Büyük harfle başlamalı', 'snake_case', 'kebab-case'],
    correctAnswer: 1,
    explanation: 'React componentleri PascalCase ile yazılır: MyComponent, UserProfile vb.'
  },
  {
    id: 3,
    question: 'Component ne döner?',
    options: ['String', 'Number', 'JSX', 'Array'],
    correctAnswer: 2,
    explanation: 'React componentleri JSX (veya null) döner.'
  },
  {
    id: 4,
    question: 'export default ne işe yarar?',
    options: ['Component\'i içe aktarır', 'Component\'i dışa aktarır', 'Component\'i siler', 'Component\'i kopyalar'],
    correctAnswer: 1,
    explanation: 'export default, component\'i başka dosyalardan import edilebilir hale getirir.'
  },
  {
    id: 5,
    question: 'Modern React\'te hangi component türü tercih edilir?',
    options: ['Class component', 'Function component', 'Fark yok', 'Hybrid component'],
    correctAnswer: 1,
    explanation: 'Modern React\'te Hooks ile function componentler tercih edilir.'
  }
];

export const reactPropsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Props nedir?',
    options: ['Component içi değişken', 'Parent\'tan child\'a veri geçirme', 'State yönetimi', 'CSS özelliği'],
    correctAnswer: 1,
    explanation: 'Props (properties), parent componentten child component\'e veri aktarır.'
  },
  {
    id: 2,
    question: 'Props değiştirilebilir mi?',
    options: ['Evet', 'Hayır, read-only', 'Sadece string proplar', 'Sadece number proplar'],
    correctAnswer: 1,
    explanation: 'Props immutable\'dır (değiştirilemez), sadece okunabilir.'
  },
  {
    id: 3,
    question: 'Props nasıl geçirilir?',
    options: ['<Component prop="değer" />', 'Component.prop = "değer"', 'Component(prop="değer")', 'props.set("değer")'],
    correctAnswer: 0,
    explanation: 'Props HTML attribute gibi component etiketine yazılır.'
  },
  {
    id: 4,
    question: 'Function componentte props nasıl alınır?',
    options: ['this.props', 'props parametresi', 'getProps()', 'useProps()'],
    correctAnswer: 1,
    explanation: 'Function componentlerde props parametre olarak gelir: function MyComp(props)'
  },
  {
    id: 5,
    question: 'props.children nedir?',
    options: ['Alt componentler', 'Component içeriği', 'Props dizisi', 'Hata mesajı'],
    correctAnswer: 1,
    explanation: 'props.children, component açılış-kapanış etiketleri arasındaki içeriktir.'
  }
];

export const reactPropsAdvancedQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Destructuring ile props nasıl alınır?',
    options: ['props.name', '{ name } = props', 'function MyComp({ name })', 'getProps(name)'],
    correctAnswer: 2,
    explanation: 'Props destructuring: function MyComp({ name, age }) şeklinde yapılır.'
  },
  {
    id: 2,
    question: 'Default props değeri nasıl verilir?',
    options: ['props.default', 'function MyComp({ name = "default" })', 'MyComp.defaultProps', 'Her ikisi de'],
    correctAnswer: 3,
    explanation: 'Default değer hem destructuring\'te hem de defaultProps ile verilebilir.'
  },
  {
    id: 3,
    question: 'Spread operator ile props nasıl geçilir?',
    options: ['<Comp ...props />', '<Comp {props} />', '<Comp props={all} />', '<Comp spread={props} />'],
    correctAnswer: 0,
    explanation: 'Spread operator: <Component {...props} /> tüm props\'ları geçirir.'
  },
  {
    id: 4,
    question: 'PropTypes ne işe yarar?',
    options: ['Props oluşturur', 'Props tipini kontrol eder', 'Props siler', 'Props kopyalar'],
    correctAnswer: 1,
    explanation: 'PropTypes ile prop tiplerini kontrol edip geliştirme sırasında uyarı alırız.'
  },
  {
    id: 5,
    question: 'Function prop geçirmek mümkün mü?',
    options: ['Evet', 'Hayır', 'Sadece arrow function', 'Sadece async function'],
    correctAnswer: 0,
    explanation: 'Props olarak fonksiyon geçmek mümkündür: <Comp onClick={handleClick} />'
  }
];

export const reactUseStateQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'useState ne işe yarar?',
    options: ['Props yönetimi', 'State yönetimi', 'Event yönetimi', 'Routing'],
    correctAnswer: 1,
    explanation: 'useState Hook\'u, function componentlerde state yönetimi sağlar.'
  },
  {
    id: 2,
    question: 'useState kaç değer döner?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'useState [state, setState] şeklinde 2 değer döner: mevcut state ve güncelleme fonksiyonu.'
  },
  {
    id: 3,
    question: 'State güncellemesi senkron mudur?',
    options: ['Evet', 'Hayır, asenkron', 'Bazen', 'Bilmiyorum'],
    correctAnswer: 1,
    explanation: 'setState asenkrondur, React performans için state güncellemelerini batch\'ler.'
  },
  {
    id: 4,
    question: 'useState başlangıç değeri ne zaman kullanılır?',
    options: ['Her render\'da', 'Sadece ilk render\'da', 'Hiç', 'State değiştiğinde'],
    correctAnswer: 1,
    explanation: 'useState başlangıç değeri sadece ilk render\'da (mount) kullanılır.'
  },
  {
    id: 5,
    question: 'State doğrudan değiştirilebilir mi?',
    options: ['Evet', 'Hayır, setState kullanılmalı', 'Sadece string', 'Sadece number'],
    correctAnswer: 1,
    explanation: 'State immutable\'dır, değiştirmek için setState fonksiyonu kullanılmalıdır.'
  }
];

export const reactEventsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'React\'te event nasıl yazılır?',
    options: ['onclick', 'onClick', 'ONCLICK', 'onCLICK'],
    correctAnswer: 1,
    explanation: 'React\'te eventler camelCase ile yazılır: onClick, onChange vb.'
  },
  {
    id: 2,
    question: 'Event handler nasıl geçirilir?',
    options: ['onClick="handleClick()"', 'onClick={handleClick()}', 'onClick={handleClick}', 'onClick=handleClick'],
    correctAnswer: 2,
    explanation: 'Event handler fonksiyon referansı olarak geçilir: onClick={handleClick}'
  },
  {
    id: 3,
    question: 'Event object\'e nasıl erişilir?',
    options: ['window.event', 'event parametresi', 'this.event', 'getEvent()'],
    correctAnswer: 1,
    explanation: 'Event object handler fonksiyonuna parametre olarak gelir: handleClick(event)'
  },
  {
    id: 4,
    question: 'Inline arrow function kullanmanın dezavantajı nedir?',
    options: ['Çalışmaz', 'Her render\'da yeni fonksiyon oluşturur', 'Hata verir', 'Yavaş çalışır'],
    correctAnswer: 1,
    explanation: 'onClick={() => func()} her render\'da yeni fonksiyon oluşturur, performans sorunu olabilir.'
  },
  {
    id: 5,
    question: 'Form submit event\'i nasıl engellenir?',
    options: ['event.stop()', 'event.preventDefault()', 'return false', 'event.cancel()'],
    correctAnswer: 1,
    explanation: 'event.preventDefault() ile form\'un varsayılan submit davranışı engellenir.'
  }
];

export const reactConditionalQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Koşullu render için && operatörü nasıl kullanılır?',
    options: ['{condition && <Component />}', '{condition || <Component />}', '{condition ? <Component />}', '{if condition <Component />}'],
    correctAnswer: 0,
    explanation: '{condition && <Component />} şeklinde, condition true ise component render edilir.'
  },
  {
    id: 2,
    question: 'Ternary operator ile render nasıl yapılır?',
    options: ['{cond && <A /> || <B />}', '{cond ? <A /> : <B />}', '{if cond <A /> else <B />}', '{cond <A /> <B />}'],
    correctAnswer: 1,
    explanation: 'Ternary: {condition ? <ComponentA /> : <ComponentB />}'
  },
  {
    id: 3,
    question: 'null döndürmek ne yapar?',
    options: ['Hata verir', 'Hiçbir şey render etmez', 'Boşluk render eder', 'undefined döner'],
    correctAnswer: 1,
    explanation: 'Component\'ten null döndürmek hiçbir şey render etmez.'
  },
  {
    id: 4,
    question: 'if-else kullanmak için ne yapılmalı?',
    options: ['JSX içinde if-else', 'JSX dışında if-else, sonra return', 'if={condition}', 'Mümkün değil'],
    correctAnswer: 1,
    explanation: 'JSX içinde if-else kullanılamaz, fonksiyon içinde if-else kullanıp sonra return edilir.'
  },
  {
    id: 5,
    question: 'Birden fazla koşul kontrolü için en iyi yöntem?',
    options: ['&&', 'Ternary', 'if-else zinciri', 'switch-case veya object mapping'],
    correctAnswer: 3,
    explanation: 'Birden fazla koşul için switch-case veya object mapping daha okunabilir.'
  }
];

export const reactListsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Array render için hangi metod kullanılır?',
    options: ['forEach', 'map', 'filter', 'reduce'],
    correctAnswer: 1,
    explanation: 'map() metodu her eleman için JSX döner ve yeni array oluşturur.'
  },
  {
    id: 2,
    question: 'key prop neden gereklidir?',
    options: ['Stil için', 'React\'in elementleri tanıması için', 'Sıralama için', 'Filtreleme için'],
    correctAnswer: 1,
    explanation: 'key prop, React\'in hangi elemanın değiştiğini, eklendiğini veya silindiğini anlamasını sağlar.'
  },
  {
    id: 3,
    question: 'key prop değeri nasıl olmalıdır?',
    options: ['Random', 'Index', 'Benzersiz ve stabil (unique & stable)', 'String'],
    correctAnswer: 2,
    explanation: 'key benzersiz ve stabil olmalıdır, tercihen ID gibi değerler kullanılmalı.'
  },
  {
    id: 4,
    question: 'Index\'i key olarak kullanmanın riski nedir?',
    options: ['Risk yok', 'Sıralama değişirse sorun olur', 'Hata verir', 'Yavaş çalışır'],
    correctAnswer: 1,
    explanation: 'Index key olarak kullanılırsa, array sırası değiştiğinde React yanlış güncellemeler yapabilir.'
  },
  {
    id: 5,
    question: 'Filtrelenmiş liste render etmek için?',
    options: ['map()', 'filter().map()', 'forEach()', 'reduce()'],
    correctAnswer: 1,
    explanation: 'Önce filter() ile filtrele, sonra map() ile render et: array.filter().map()'
  }
];

export const reactFormsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Controlled component nedir?',
    options: ['State ile kontrol edilen form elementi', 'Refs ile kontrol edilen', 'Kontrol edilmeyen', 'External state'],
    correctAnswer: 0,
    explanation: 'Controlled component: value değeri state\'ten gelir ve onChange ile güncellenir.'
  },
  {
    id: 2,
    question: 'Uncontrolled component nedir?',
    options: ['State ile kontrol edilen', 'DOM\'un kendi değerini kullandığı', 'Controlled\'ın tersi', 'Refs ile erişilen'],
    correctAnswer: 3,
    explanation: 'Uncontrolled component: değer DOM\'da tutulur, ref ile erişilir.'
  },
  {
    id: 3,
    question: 'input value değeri nasıl bağlanır?',
    options: ['value={state}', 'defaultValue={state}', 'data={state}', 'bind={state}'],
    correctAnswer: 0,
    explanation: 'Controlled input: <input value={state} onChange={handler} />'
  },
  {
    id: 4,
    question: 'Textarea React\'te nasıl kullanılır?',
    options: ['<textarea>text</textarea>', '<textarea value={state} />', '<textArea />', '<text-area />'],
    correctAnswer: 1,
    explanation: 'React\'te textarea self-closing ve value prop kullanır: <textarea value={state} />'
  },
  {
    id: 5,
    question: 'Select elementi value değeri nereden alır?',
    options: ['option selected', 'select value', 'option value', 'select defaultValue'],
    correctAnswer: 1,
    explanation: 'React\'te select value değeri <select value={state}> şeklinde verilir.'
  }
];

export const reactLifecycleQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Component lifecycle\'ın 3 ana fazı nedir?',
    options: ['Start, Run, End', 'Mounting, Updating, Unmounting', 'Init, Update, Destroy', 'Create, Modify, Delete'],
    correctAnswer: 1,
    explanation: 'Lifecycle: Mounting (oluşturma), Updating (güncelleme), Unmounting (kaldırma)'
  },
  {
    id: 2,
    question: 'componentDidMount ne zaman çalışır?',
    options: ['Her render', 'İlk render sonrası', 'Update sonrası', 'Unmount öncesi'],
    correctAnswer: 1,
    explanation: 'componentDidMount, component DOM\'a eklendikten hemen sonra bir kez çalışır.'
  },
  {
    id: 3,
    question: 'componentDidUpdate ne zaman çalışır?',
    options: ['İlk render', 'Her render sonrası (ilk hariç)', 'Unmount', 'Mount'],
    correctAnswer: 1,
    explanation: 'componentDidUpdate, ilk render hariç her güncelleme sonrası çalışır.'
  },
  {
    id: 4,
    question: 'componentWillUnmount ne zaman çalışır?',
    options: ['Mount öncesi', 'Update öncesi', 'Component DOM\'dan kaldırılmadan önce', 'Her render'],
    correctAnswer: 2,
    explanation: 'componentWillUnmount, component DOM\'dan kaldırılmadan hemen önce çalışır.'
  },
  {
    id: 5,
    question: 'Function componentlerde lifecycle için ne kullanılır?',
    options: ['componentDidMount', 'useEffect', 'useState', 'lifecycle()'],
    correctAnswer: 1,
    explanation: 'Function componentlerde lifecycle yönetimi için useEffect Hook kullanılır.'
  }
];

export const reactUseEffectQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'useEffect ne zaman çalışır?',
    options: ['Sadece mount', 'Her render sonrası', 'Dependency array\'e göre', 'Hiç'],
    correctAnswer: 2,
    explanation: 'useEffect, dependency array\'e göre çalışır: [], [dep], veya yok.'
  },
  {
    id: 2,
    question: 'useEffect(() => {}, []) ne zaman çalışır?',
    options: ['Her render', 'Sadece mount', 'Sadece update', 'Hiç'],
    correctAnswer: 1,
    explanation: 'Boş dependency array [] sadece mount\'ta çalışır (componentDidMount gibi).'
  },
  {
    id: 3,
    question: 'useEffect(() => {}) ne zaman çalışır? (dependency yok)',
    options: ['Hiç', 'Sadece mount', 'Her render sonrası', 'Random'],
    correctAnswer: 2,
    explanation: 'Dependency array verilmezse her render sonrası çalışır.'
  },
  {
    id: 4,
    question: 'Cleanup function ne işe yarar?',
    options: ['Effect başlatır', 'Effect temizler (unmount/re-run öncesi)', 'State siler', 'Props temizler'],
    correctAnswer: 1,
    explanation: 'Cleanup function, effect tekrar çalışmadan veya unmount\'tan önce çalışır.'
  },
  {
    id: 5,
    question: 'useEffect içinde async function kullanımı?',
    options: ['useEffect(async () => {})', 'useEffect içinde async tanımla ve çağır', 'Kullanılamaz', 'await useEffect'],
    correctAnswer: 1,
    explanation: 'useEffect async olamaz, içinde async fonksiyon tanımlanıp çağrılmalıdır.'
  }
];

export const reactFetchQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'API çağrısı nerede yapılmalı?',
    options: ['Render sırasında', 'useEffect içinde', 'Event handler', 'Her ikisi de (B ve C)'],
    correctAnswer: 3,
    explanation: 'API çağrısı useEffect (mount\'ta) veya event handler (kullanıcı aksiyonu) içinde yapılır.'
  },
  {
    id: 2,
    question: 'fetch() ne döner?',
    options: ['Data', 'Promise', 'JSON', 'String'],
    correctAnswer: 1,
    explanation: 'fetch() bir Promise döner, await veya .then() ile handle edilir.'
  },
  {
    id: 3,
    question: 'fetch sonrası JSON parse nasıl yapılır?',
    options: ['JSON.parse()', 'response.json()', 'parse(response)', 'response.data'],
    correctAnswer: 1,
    explanation: 'fetch response: await response.json() ile parse edilir.'
  },
  {
    id: 4,
    question: 'Loading state neden kullanılır?',
    options: ['Hata için', 'Yüklenme durumunu göstermek için', 'Cache için', 'Hız için'],
    correctAnswer: 1,
    explanation: 'Loading state, veri yüklenirken kullanıcıya feedback vermek için kullanılır.'
  },
  {
    id: 5,
    question: 'try-catch ne işe yarar?',
    options: ['Hız artırır', 'Hata yakalamak için', 'Cache yönetimi', 'State yönetimi'],
    correctAnswer: 1,
    explanation: 'try-catch ile API hatalarını yakalayıp kullanıcıya gösterebiliriz.'
  }
];

export const reactCustomHooksQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Custom Hook nasıl isimlendirilir?',
    options: ['camelCase', 'use ile başlamalı', 'PascalCase', 'UPPERCASE'],
    correctAnswer: 1,
    explanation: 'Custom Hook isimleri "use" ile başlamalıdır: useCustomHook'
  },
  {
    id: 2,
    question: 'Custom Hook ne döner?',
    options: ['JSX', 'Sadece state', 'İstediğiniz herhangi bir değer', 'Sadece fonksiyon'],
    correctAnswer: 2,
    explanation: 'Custom Hook istediğiniz değer veya değerleri dönebilir: state, fonksiyon, array, object vb.'
  },
  {
    id: 3,
    question: 'Custom Hook içinde başka Hook kullanılabilir mi?',
    options: ['Evet', 'Hayır', 'Sadece useState', 'Sadece useEffect'],
    correctAnswer: 0,
    explanation: 'Custom Hook içinde tüm React Hook\'ları kullanılabilir.'
  },
  {
    id: 4,
    question: 'Custom Hook\'un amacı nedir?',
    options: ['Performans', 'Kod tekrarını önlemek', 'Stil', 'Routing'],
    correctAnswer: 1,
    explanation: 'Custom Hook, tekrar eden logic\'i paylaşılabilir hale getirir.'
  },
  {
    id: 5,
    question: 'Custom Hook component mıdır?',
    options: ['Evet', 'Hayır, logic paylaşan fonksiyon', 'Her ikisi', 'Ne component ne fonksiyon'],
    correctAnswer: 1,
    explanation: 'Custom Hook, logic paylaşmak için kullanılan bir fonksiyondur, JSX döndürmez.'
  }
];

export const reactStylingQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Inline style nasıl verilir?',
    options: ['style="color: red"', 'style={{color: "red"}}', 'className={{color: "red"}}', 'css={{color: "red"}}'],
    correctAnswer: 1,
    explanation: 'React\'te inline style object olarak verilir: style={{color: "red"}}'
  },
  {
    id: 2,
    question: 'CSS property isimleri nasıl yazılır?',
    options: ['background-color', 'backgroundColor', 'background_color', 'BACKGROUND-COLOR'],
    correctAnswer: 1,
    explanation: 'React\'te CSS propertyleri camelCase ile yazılır: backgroundColor, fontSize vb.'
  },
  {
    id: 3,
    question: 'CSS modülleri nasıl import edilir?',
    options: ['import "./style.css"', 'import styles from "./style.module.css"', 'import css from "./style"', 'require("./style.css")'],
    correctAnswer: 1,
    explanation: 'CSS modülleri: import styles from "./Component.module.css" şeklinde import edilir.'
  },
  {
    id: 4,
    question: 'className dinamik olarak nasıl verilir?',
    options: ['className={cond && "class"}', 'className={`class ${var}`}', 'className={classnames(obj)}', 'Hepsi'],
    correctAnswer: 3,
    explanation: 'className dinamik verilebilir: conditional, template literal, classnames library vb.'
  },
  {
    id: 5,
    question: 'styled-components ne işe yarar?',
    options: ['CSS import', 'CSS-in-JS', 'Inline style', 'CSS modülleri'],
    correctAnswer: 1,
    explanation: 'styled-components, CSS-in-JS kütüphanesidir, JS içinde CSS yazılır.'
  }
];

export const reactRouterQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'React Router hangi component ile başlar?',
    options: ['<Router>', '<BrowserRouter>', '<Routes>', '<Route>'],
    correctAnswer: 1,
    explanation: '<BrowserRouter> (veya <Router>) tüm uygulamayı sarar.'
  },
  {
    id: 2,
    question: '<Route> component\'i ne işe yarar?',
    options: ['Link oluşturur', 'Path ile component eşleştirir', 'Navigate eder', 'State tutar'],
    correctAnswer: 1,
    explanation: '<Route path="/about" element={<About />} /> path ile component eşleştirir.'
  },
  {
    id: 3,
    question: '<Link> ile <a> arasındaki fark nedir?',
    options: ['Fark yok', '<Link> sayfa yenilemez, <a> yeniler', '<a> daha hızlı', '<Link> eskimiş'],
    correctAnswer: 1,
    explanation: '<Link> SPA içinde gezinir (sayfa yenilemez), <a> tam sayfa yeniler.'
  },
  {
    id: 4,
    question: 'useNavigate() ne işe yarar?',
    options: ['Component render', 'Programatik navigasyon', 'State yönetimi', 'API çağrısı'],
    correctAnswer: 1,
    explanation: 'useNavigate() ile koddan programatik olarak navigate edilir: navigate("/path")'
  },
  {
    id: 5,
    question: 'useParams() ne döner?',
    options: ['Query string', 'URL parametrelerini', 'State', 'Props'],
    correctAnswer: 1,
    explanation: 'useParams() ile URL\'deki dinamik parametrelere erişilir: /user/:id'
  }
];

export const reactDynamicRoutesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Dinamik route nasıl tanımlanır?',
    options: ['/user/:id', '/user/{id}', '/user/<id>', '/user/[id]'],
    correctAnswer: 0,
    explanation: 'Dinamik route: <Route path="/user/:id" /> şeklinde : ile tanımlanır.'
  },
  {
    id: 2,
    question: 'useParams() nasıl kullanılır?',
    options: ['useParams(id)', 'const { id } = useParams()', 'getParams()', 'params.id'],
    correctAnswer: 1,
    explanation: 'const { id } = useParams() ile URL parametreleri destructure edilir.'
  },
  {
    id: 3,
    question: 'useSearchParams() ne için kullanılır?',
    options: ['Path params', 'Query string (?key=value)', 'Hash', 'State'],
    correctAnswer: 1,
    explanation: 'useSearchParams() query string parametrelerini okur ve değiştirir.'
  },
  {
    id: 4,
    question: 'Nested routes nasıl oluşturulur?',
    options: ['<Route> içinde <Route>', '<Routes> içinde <Routes>', 'İkisi de', 'Mümkün değil'],
    correctAnswer: 0,
    explanation: 'Nested routes: <Route> içinde child <Route> tanımlanır, <Outlet /> ile render edilir.'
  },
  {
    id: 5,
    question: '<Outlet /> ne işe yarar?',
    options: ['Link oluşturur', 'Child route\'ları render eder', 'Navigate eder', 'State tutar'],
    correctAnswer: 1,
    explanation: '<Outlet /> nested route\'ların render edileceği yeri belirtir.'
  }
];

export const reactContextQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'Context API ne işe yarar?',
    options: ['Styling', 'Global state yönetimi', 'Routing', 'API çağrısı'],
    correctAnswer: 1,
    explanation: 'Context API, prop drilling yapmadan global state paylaşımı sağlar.'
  },
  {
    id: 2,
    question: 'Context nasıl oluşturulur?',
    options: ['useContext()', 'React.createContext()', 'new Context()', 'Context.create()'],
    correctAnswer: 1,
    explanation: 'const MyContext = React.createContext(defaultValue) ile oluşturulur.'
  },
  {
    id: 3,
    question: 'Context value nasıl sağlanır?',
    options: ['<Context.Provider value={val}>', '<Context value={val}>', '<Provider value={val}>', 'setContext(val)'],
    correctAnswer: 0,
    explanation: '<MyContext.Provider value={value}> ile context değeri sağlanır.'
  },
  {
    id: 4,
    question: 'Context değerine nasıl erişilir?',
    options: ['useContext(MyContext)', 'getContext()', 'MyContext.value', 'Context.get()'],
    correctAnswer: 0,
    explanation: 'const value = useContext(MyContext) ile context değerine erişilir.'
  },
  {
    id: 5,
    question: 'Context değiştiğinde ne olur?',
    options: ['Hiçbir şey', 'Tüm uygulama render', 'Context kullanan componentler render', 'Provider render'],
    correctAnswer: 2,
    explanation: 'Context değeri değiştiğinde, useContext kullanan tüm componentler yeniden render edilir.'
  }
];

export const reactUseRefReducerQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'useRef ne işe yarar?',
    options: ['State yönetimi', 'DOM referansı veya mutable değer', 'Effect yönetimi', 'Context'],
    correctAnswer: 1,
    explanation: 'useRef DOM elementlerine referans veya render\'ı tetiklemeyen mutable değer tutar.'
  },
  {
    id: 2,
    question: 'useRef değeri değiştiğinde component render olur mu?',
    options: ['Evet', 'Hayır', 'Bazen', 'Sadece DOM ref\'te'],
    correctAnswer: 1,
    explanation: 'useRef değişiklikleri render tetiklemez, useState\'ten farklı.'
  },
  {
    id: 3,
    question: 'useReducer ne zaman tercih edilir?',
    options: ['Her zaman', 'Basit state', 'Karmaşık state logic', 'Asla'],
    correctAnswer: 2,
    explanation: 'useReducer, karmaşık state logic veya ilişkili state güncellemeleri için uygundur.'
  },
  {
    id: 4,
    question: 'useReducer kaç parametre alır?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'useReducer(reducer, initialState) 2 parametre alır.'
  },
  {
    id: 5,
    question: 'Reducer fonksiyonu ne döner?',
    options: ['Action', 'Yeni state', 'Dispatch', 'undefined'],
    correctAnswer: 1,
    explanation: 'Reducer: (state, action) => newState şeklinde yeni state döner.'
  }
];

export const reactPortalFragmentQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'React Portal ne işe yarar?',
    options: ['Routing', 'Child\'ı farklı DOM node\'a render etme', 'State yönetimi', 'API'],
    correctAnswer: 1,
    explanation: 'Portal ile child component, parent DOM hiyerarşisi dışına render edilebilir (modal, tooltip).'
  },
  {
    id: 2,
    question: 'Portal nasıl oluşturulur?',
    options: ['<Portal>', 'ReactDOM.createPortal(child, container)', 'usePortal()', 'new Portal()'],
    correctAnswer: 1,
    explanation: 'ReactDOM.createPortal(child, domNode) ile portal oluşturulur.'
  },
  {
    id: 3,
    question: 'Fragment ne işe yarar?',
    options: ['Stil ekler', 'Ekstra DOM node olmadan gruplar', 'State tutar', 'Router'],
    correctAnswer: 1,
    explanation: 'Fragment, ekstra DOM elementi oluşturmadan elementleri gruplar.'
  },
  {
    id: 4,
    question: 'Fragment nasıl yazılır?',
    options: ['<Fragment>', '<></>', '<React.Fragment>', 'Hepsi'],
    correctAnswer: 3,
    explanation: 'Fragment: <></> (short syntax) veya <React.Fragment> şeklinde yazılır.'
  },
  {
    id: 5,
    question: 'Fragment\'e key verilebilir mi?',
    options: ['Evet, <React.Fragment key={}>', 'Hayır', 'Sadece <></>', 'Sadece listlerde'],
    correctAnswer: 0,
    explanation: 'key vermek için <React.Fragment key={id}> kullanılmalı, <></> desteklemez.'
  }
];

export const reactPerformanceQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'React.memo() ne işe yarar?',
    options: ['Memoization', 'Component render optimizasyonu', 'State cache', 'API cache'],
    correctAnswer: 1,
    explanation: 'React.memo(), props değişmediyse component\'i yeniden render etmez.'
  },
  {
    id: 2,
    question: 'useMemo() ne zaman kullanılır?',
    options: ['Her zaman', 'Pahalı hesaplamalar için', 'State yönetimi', 'API çağrısı'],
    correctAnswer: 1,
    explanation: 'useMemo(), pahalı hesaplamaları cache\'ler ve sadece dependency değişince yeniden hesaplar.'
  },
  {
    id: 3,
    question: 'useCallback() ne işe yarar?',
    options: ['API çağrısı', 'Fonksiyon memoization', 'State yönetimi', 'Event handling'],
    correctAnswer: 1,
    explanation: 'useCallback(), fonksiyonu memoize eder, dependency değişmezse aynı referansı döner.'
  },
  {
    id: 4,
    question: 'Key prop neden performans için önemlidir?',
    options: ['Stil için', 'React\'in diff algoritması için', 'State için', 'Routing için'],
    correctAnswer: 1,
    explanation: 'Doğru key kullanımı, React\'in hangi elemanın değiştiğini hızlı bulmasını sağlar.'
  },
  {
    id: 5,
    question: 'Code splitting için ne kullanılır?',
    options: ['useSplit()', 'React.lazy() ve Suspense', 'import()', 'B ve C'],
    correctAnswer: 3,
    explanation: 'React.lazy(() => import()) ve <Suspense> ile dynamic import yapılır.'
  }
];

export const reactFinalQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'React\'in virtual DOM avantajı nedir?',
    options: ['Daha az kod', 'Sadece değişen kısımları gerçek DOM\'a uygulaması', 'Daha güvenli', 'Daha kolay'],
    correctAnswer: 1,
    explanation: 'Virtual DOM sayesinde React, minimal DOM manipülasyonu yaparak performansı artırır.'
  },
  {
    id: 2,
    question: 'React Fiber nedir?',
    options: ['Yeni Hook', 'Reconciliation algoritması', 'State yönetimi', 'Router'],
    correctAnswer: 1,
    explanation: 'Fiber, React 16\'da gelen yeni reconciliation (uzlaştırma) algoritmasıdır.'
  },
  {
    id: 3,
    question: 'StrictMode ne işe yarar?',
    options: ['Production mode', 'Geliştirme sırasında uyarılar gösterir', 'Performans artırır', 'Hata yakalar'],
    correctAnswer: 1,
    explanation: 'StrictMode, geliştirme sırasında potansiyel sorunları tespit eder (sadece dev\'de çalışır).'
  },
  {
    id: 4,
    question: 'React.lazy() ile ne yapılır?',
    options: ['State yönetimi', 'Component lazy loading', 'API çağrısı', 'Animation'],
    correctAnswer: 1,
    explanation: 'React.lazy() ile componentler lazily (ihtiyaç anında) yüklenir (code splitting).'
  },
  {
    id: 5,
    question: 'Suspense ne için kullanılır?',
    options: ['Error boundary', 'Lazy loaded component için fallback', 'State', 'Router'],
    correctAnswer: 1,
    explanation: '<Suspense fallback={<Loading />}> lazy loaded component yüklenene kadar fallback gösterir.'
  },
  {
    id: 6,
    question: 'Error Boundary ne yapar?',
    options: ['Hataları yakalar ve fallback UI gösterir', 'Hataları loglar', 'Uygulamayı durdurur', 'API hatalarını yakalar'],
    correctAnswer: 0,
    explanation: 'Error Boundary, alt component tree\'deki hataları yakalar ve fallback UI gösterir.'
  },
  {
    id: 7,
    question: 'getDerivedStateFromProps ne zaman kullanılır?',
    options: ['Her zaman', 'Props\'a göre state güncelleme (nadir)', 'API çağrısı', 'Event handling'],
    correctAnswer: 1,
    explanation: 'getDerivedStateFromProps nadir durumlarda props değişince state güncelleme için kullanılır.'
  },
  {
    id: 8,
    question: 'React.PureComponent ne yapar?',
    options: ['Her zaman render', 'Shallow prop/state karşılaştırması yapar', 'Deep comparison', 'Hiçbir şey'],
    correctAnswer: 1,
    explanation: 'PureComponent, shouldComponentUpdate\'i shallow comparison ile otomatik uygular.'
  },
  {
    id: 9,
    question: 'forwardRef ne işe yarar?',
    options: ['State forward', 'Ref\'i child component\'e iletme', 'Props forward', 'Event forward'],
    correctAnswer: 1,
    explanation: 'forwardRef ile parent\'tan gelen ref, child component\'e iletilebilir.'
  },
  {
    id: 10,
    question: 'React DevTools ne sağlar?',
    options: ['Code editor', 'Component tree, props, state inspection', 'Deploy', 'Testing'],
    correctAnswer: 1,
    explanation: 'React DevTools, component tree\'yi, props ve state\'i inspect etmeyi sağlar.'
  },
  {
    id: 11,
    question: 'Controlled vs Uncontrolled componentlerin farkı?',
    options: ['Fark yok', 'Controlled state ile, uncontrolled DOM ile', 'Controlled daha hızlı', 'Uncontrolled daha güvenli'],
    correctAnswer: 1,
    explanation: 'Controlled: React state kontrol eder, Uncontrolled: DOM kendi değerini tutar.'
  },
  {
    id: 12,
    question: 'React\'te immutability neden önemli?',
    options: ['Gerekli değil', 'State ve prop değişikliklerini tespit için', 'Performans', 'B ve C'],
    correctAnswer: 3,
    explanation: 'Immutability, React\'in değişiklikleri hızlı tespit etmesini ve performansı artırır.'
  },
  {
    id: 13,
    question: 'shouldComponentUpdate ne döner?',
    options: ['State', 'Boolean (render olmalı mı?)', 'Props', 'JSX'],
    correctAnswer: 1,
    explanation: 'shouldComponentUpdate true/false döner, component\'in render edilip edilmeyeceğini belirler.'
  },
  {
    id: 14,
    question: 'React.Children ne işe yarar?',
    options: ['Children oluşturur', 'Children ile çalışmak için utility', 'Children siler', 'Children count'],
    correctAnswer: 1,
    explanation: 'React.Children, props.children üzerinde map, forEach gibi işlemler için utility sağlar.'
  },
  {
    id: 15,
    question: 'Composition vs Inheritance?',
    options: ['Inheritance tercih edilir', 'Composition tercih edilir', 'Fark yok', 'Her ikisi eşit'],
    correctAnswer: 1,
    explanation: 'React, inheritance yerine composition (bileşim) pattern\'ini önerir.'
  },
  {
    id: 16,
    question: 'Higher-Order Component (HOC) nedir?',
    options: ['Component türü', 'Component alan ve dönen fonksiyon', 'Parent component', 'Child component'],
    correctAnswer: 1,
    explanation: 'HOC, component alıp enhanced component dönen fonksiyondur: withAuth, withRouter vb.'
  },
  {
    id: 17,
    question: 'Render props pattern nedir?',
    options: ['Props render etme', 'Function as child/prop ile logic paylaşımı', 'Props mapping', 'Style props'],
    correctAnswer: 1,
    explanation: 'Render props: fonksiyon prop\'u ile component logic\'i paylaşma pattern\'i.'
  },
  {
    id: 18,
    question: 'React Profiler ne için kullanılır?',
    options: ['User profiling', 'Performance ölçümü', 'State profiling', 'API monitoring'],
    correctAnswer: 1,
    explanation: 'Profiler, component render sürelerini ölçerek performans analizi sağlar.'
  },
  {
    id: 19,
    question: 'Concurrent Mode nedir?',
    options: ['Parallel rendering', 'React\'in rendering\'i bölebilmesi', 'Multi-threading', 'Async rendering'],
    correctAnswer: 1,
    explanation: 'Concurrent Mode, React\'in rendering işini bölerek önceliklendirmesini sağlar.'
  },
  {
    id: 20,
    question: 'React Server Components nedir?',
    options: ['Backend component', 'Sunucuda render edilen componentler', 'API component', 'Database component'],
    correctAnswer: 1,
    explanation: 'Server Components, sunucuda render edilir ve client\'a HTML olarak gönderilir.'
  }
];

// Quiz tamamlama verisi için tip
export interface QuizResult {
  lessonId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  answers: number[]; // Kullanıcının verdiği cevaplar
}

// Her ders için quiz mapping - TÜM EXPORT'LARDAN SONRA
export const lessonQuizzes: { [key: string]: QuizQuestion[] } = {
  // HTML Quizzes
  'html-basic': htmlBasicQuiz,
  'html-elements': htmlElementsQuiz,
  'html-attributes': htmlAttributesQuiz,
  'html-headings': htmlHeadingsQuiz,
  'html-paragraphs': htmlParagraphsQuiz,
  'html-styles': htmlStylesQuiz,
  'html-formatting': htmlFormattingQuiz,
  'html-quotations': htmlQuotationsQuiz,
  'html-comments': htmlCommentsQuiz,
  'html-colors': htmlColorsQuiz,
  'html-css': htmlCssQuiz,
  'html-links': htmlLinksQuiz,
  'html-images': htmlImagesQuiz,
  'html-favicon': htmlFaviconQuiz,
  'html-page-title': htmlPageTitleQuiz,
  'html-tables': htmlTablesQuiz,
  'html-lists': htmlListsQuiz,
  'html-block-inline': htmlBlockInlineQuiz,
  'html-div': htmlDivQuiz,
  'html-classes-id': htmlClassesIdQuiz,
  'html-final': htmlFinalQuiz,
  // CSS Quizzes
  'css-syntax': cssSyntaxQuiz,
  'css-colors': cssColorsQuiz,
  'css-backgrounds': cssBackgroundsQuiz,
  'css-fonts': cssFontsQuiz,
  'css-borders': cssBordersQuiz,
  'css-box-model': cssBoxModelQuiz,
  'css-dimensions': cssDimensionsQuiz,
  'css-outline': cssOutlineQuiz,
  'css-links': cssLinksQuiz,
  'css-lists': cssListsQuiz,
  'css-display': cssDisplayQuiz,
  'css-position': cssPositionQuiz,
  'css-zindex': cssZindexQuiz,
  'css-overflow': cssOverflowQuiz,
  'css-float': cssFloatQuiz,
  'css-flexbox-basics': cssFlexboxBasicsQuiz,
  'css-flexbox-align': cssFlexboxAlignQuiz,
  'css-grid-intro': cssGridIntroQuiz,
  'css-grid-layout': cssGridLayoutQuiz,
  'css-layout': cssLayoutQuiz,
  'css-media-queries': cssMediaQueriesQuiz,
  'css-pseudo-classes': cssPseudoClassesQuiz,
  'css-pseudo-elements': cssPseudoElementsQuiz,
  'css-opacity': cssOpacityQuiz,
  'css-shadow': cssShadowQuiz,
  'css-transitions': cssTransitionsQuiz,
  'css-animations': cssAnimationsQuiz,
  'css-transform': cssTransformQuiz,
  'css-variables': cssVariablesQuiz,
  'css-important': cssImportantQuiz,
  'css-responsive': cssResponsiveQuiz,
  'css-final': cssFinalQuiz,
  // JavaScript Quizzes
  'js-variables': jsVariablesQuiz,
  'js-data-types': jsDataTypesQuiz,
  'js-operators': jsOperatorsQuiz,
  'js-functions': jsFunctionsQuiz,
  'js-arrays': jsArraysQuiz,
  'js-objects': jsObjectsQuiz,
  'js-events': jsEventsQuiz,
  'js-dom': jsDOMQuiz,
  'js-async': jsAsyncQuiz,
  'js-final': jsFinalQuiz,
  // React Quizzes
  'react-intro': reactIntroQuiz,
  'react-jsx': reactJSXQuiz,
  'react-components': reactComponentsQuiz,
  'react-props': reactPropsQuiz,
  'react-props-advanced': reactPropsAdvancedQuiz,
  'react-usestate': reactUseStateQuiz,
  'react-events': reactEventsQuiz,
  'react-conditional': reactConditionalQuiz,
  'react-lists': reactListsQuiz,
  'react-forms': reactFormsQuiz,
  'react-lifecycle': reactLifecycleQuiz,
  'react-useeffect': reactUseEffectQuiz,
  'react-fetch': reactFetchQuiz,
  'react-custom-hooks': reactCustomHooksQuiz,
  'react-styling': reactStylingQuiz,
  'react-router': reactRouterQuiz,
  'react-dynamic-routes': reactDynamicRoutesQuiz,
  'react-context': reactContextQuiz,
  'react-useref-reducer': reactUseRefReducerQuiz,
  'react-portal-fragment': reactPortalFragmentQuiz,
  'react-performance': reactPerformanceQuiz,
  'react-final': reactFinalQuiz,
  // Python Quizzes
  'py-print-variables': pyPrintVariablesQuiz,
  'py-data-types': pyDataTypesQuiz,
  'py-type-conversion': pyTypeConversionQuiz,
  'py-arithmetic': pyArithmeticQuiz,
  'py-input': pyInputQuiz,
  'py-final': pyFinalQuiz,
  // Kotlin Quizzes
  'kt-intro-main': ktIntroMainQuiz,
  'kt-variables': ktVariablesQuiz,
  'kt-data-types': ktDataTypesQuiz,
  'kt-string-templates': ktStringTemplatesQuiz,
  'kt-conditionals': ktConditionalsQuiz,
  'kt-null-safety': ktNullSafetyQuiz,
  'kt-loops': ktLoopsQuiz,
  'kt-ranges': ktRangesQuiz,
  'kt-functions': ktFunctionsQuiz,
  'kt-arrays-lists': ktArraysListsQuiz,
  'kt-map-set': ktMapSetQuiz,
  'kt-when': ktWhenQuiz,
  'kt-class-object': ktClassObjectQuiz,
  'kt-constructor': ktConstructorQuiz,
  'kt-data-classes': ktDataClassesQuiz,
  'kt-inheritance': ktInheritanceQuiz,
  'kt-interface': ktInterfaceQuiz,
  'kt-abstract': ktAbstractQuiz,
  'kt-extensions': ktExtensionsQuiz,
  'kt-scope-functions': ktScopeFunctionsQuiz,
  'kt-lambda': ktLambdaQuiz,
  'kotlin-final': kotlinFinalQuiz,
  // Swift Quizzes
  'sw-playground': swPlaygroundQuiz,
  'sw-variables': swVariablesQuiz,
  'sw-data-types': swDataTypesQuiz,
  'sw-string-interpolation': swStringInterpolationQuiz,
  'sw-operators': swOperatorsQuiz,
  'sw-arrays': swArraysQuiz,
  'sw-dictionaries': swDictionariesQuiz,
  'sw-sets': swSetsQuiz,
  'sw-control-flow': swControlFlowQuiz,
  'sw-loops': swLoopsQuiz,
  'sw-functions': swFunctionsQuiz,
  'sw-parameter-names': swParameterNamesQuiz,
  'sw-optionals': swOptionalsQuiz,
  'sw-optional-binding': swOptionalBindingQuiz,
  'sw-guard-let': swGuardLetQuiz,
  'sw-enums': swEnumsQuiz,
  'sw-struct-vs-class': swStructVsClassQuiz,
  'sw-properties': swPropertiesQuiz,
  'sw-methods': swMethodsQuiz,
  'sw-initializers': swInitializersQuiz,
  'sw-inheritance': swInheritanceQuiz,
  'sw-protocols': swProtocolsQuiz,
  'sw-extensions': swExtensionsQuiz,
  'sw-closures': swClosuresQuiz,
  'sw-error-handling': swErrorHandlingQuiz,
  'sw-swiftui-intro': swSwiftuiIntroQuiz,
  'sw-arc': swArcQuiz,
  'swift-final': swiftFinalQuiz,
};
