export interface LessonContent {
  id: string;
  title: string;
  order: number;
  category: string;
  description: string;
  detailedContent?: string; // Detaylı açıklama (yeni)
  sections?: { // Alt bölümler (yeni)
    title: string;
    content: string;
  }[];
  exampleCode: string;
  challenge: {
    instructions: string;
    starterCode: string;
    solution: string;
    blanks: string[]; // Boşlukları temsil eden placeholder'lar
    expectedOutput?: string; // Kodun çalıştırıldığında gösterilecek çıktı
  };
  xpReward: number;
}

export const htmlLessons: LessonContent[] = [
  // 1. HTML Basic
  {
    id: 'html-basic',
    title: 'HTML Basic',
    order: 1,
    category: 'HTML',
    description: 'HTML dilinin temellerini öğren. HTML web sayfalarının iskeletini oluşturur.',
    detailedContent: 'HTML (HyperText Markup Language), web sayfalarının yapısını oluşturan işaretleme dilidir. Her web sayfası HTML ile yapılandırılır.',
    sections: [
      {
        title: 'HTML Nedir?',
        content: 'HTML, web sayfalarının iskeletini oluşturan bir işaretleme dilidir. Tarayıcılar HTML kodunu okuyarak sayfayı görüntüler.'
      },
      {
        title: 'Temel HTML Yapısı',
        content: '• <!DOCTYPE html>: Belge tipini belirtir\n• <html>: Kök element\n• <head>: Sayfa bilgileri (başlık, meta)\n• <body>: Görünen içerik'
      },
      {
        title: 'İlk HTML Sayfanız',
        content: 'Basit bir HTML sayfası oluşturmak için yukardaki temel etiketleri kullanın. <title> etiketiyle sayfa başlığını, <h1> ile ana başlığı, <p> ile paragraf ekleyin.'
      }
    ],
    exampleCode: `<!DOCTYPE html>
<html>
<head>
    <title>İlk Sayfam</title>
</head>
<body>
    <h1>Merhaba Dünya!</h1>
    <p>Bu benim ilk HTML sayfam.</p>
</body>
</html>`,
    challenge: {
      instructions: 'Boşlukları doldurarak basit bir HTML sayfası oluştur.',
      starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>___BLANK1___</title>
</head>
<body>
    <___BLANK2___>Başlığım</___BLANK2___>
    <___BLANK3___>Paragrafım</___BLANK3___>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
    <title>Sayfam</title>
</head>
<body>
    <h1>Başlığım</h1>
    <p>Paragrafım</p>
</body>
</html>`,
      blanks: ['Sayfam', 'h1', 'p']
    },
    xpReward: 10
  },

  // 2. HTML Elements
  {
    id: 'html-elements',
    title: 'HTML Elements',
    order: 2,
    category: 'HTML',
    description: 'HTML elementleri - açılış ve kapanış etiketleri, içerik yapısı.',
    detailedContent: 'HTML elementleri, açılış etiketi, içerik ve kapanış etiketinden oluşur. Elementler iç içe (nested) olabilir.',
    sections: [
      {
        title: 'Element Yapısı',
        content: 'Bir HTML elementi: <etiket>içerik</etiket> şeklindedir.\n\n• Açılış etiketi: <p>\n• İçerik: Metin veya diğer elementler\n• Kapanış etiketi: </p>'
      },
      {
        title: 'Yaygın Elementler',
        content: '• <div>: Blok seviye kapsayıcı\n• <span>: Satır içi kapsayıcı\n• <p>: Paragraf\n• <strong>: Kalın metin\n• <em>: İtalik metin'
      },
      {
        title: 'İç İçe Elementler',
        content: 'Elementler birbirinin içine yazılabilir:\n<div>\n  <p>Bu <strong>kalın</strong> kelime</p>\n</div>'
      }
    ],
    exampleCode: `<!-- HTML Elementleri -->
<p>Bu bir paragraf elementidir</p>
<div>Bu bir div elementidir</div>
<span>Bu bir span elementidir</span>

<!-- İç içe elementler -->
<div>
    <p>İç içe <strong>element</strong> örneği</p>
</div>`,
    challenge: {
      instructions: 'Doğru HTML elementlerini kullanarak yapıyı tamamla.',
      starterCode: `<___BLANK1___>
    <___BLANK2___>Bu bir başlık</___BLANK2___>
    <p>Bu bir ___BLANK3___ paragraf</p>
</___BLANK1___>`,
      solution: `<div>
    <h2>Bu bir başlık</h2>
    <p>Bu bir <strong>kalın</strong> paragraf</p>
</div>`,
      blanks: ['div', 'h2', 'strong']
    },
    xpReward: 10
  },

  // 3. HTML Attributes
  {
    id: 'html-attributes',
    title: 'HTML Attributes',
    order: 3,
    category: 'HTML',
    description: 'HTML attribute\'ları (özellikleri) - elementlere ek bilgi ekleme.',
    detailedContent: 'Attribute\'lar (nitelikler), HTML elementlerine ek bilgi sağlar. Açılış etiketinin içinde yazılır.',
    sections: [
      {
        title: 'Attribute Yapısı',
        content: 'Attribute\'lar isim="değer" şeklinde yazılır:\n<etiket attribute="değer">içerik</etiket>\n\nÖrnek: <a href="site.com">Link</a>'
      },
      {
        title: 'Yaygın Attribute\'lar',
        content: '• href: Link adresi (<a> için)\n• src: Resim/kaynak yolu (<img> için)\n• alt: Alternatif metin\n• class: CSS sınıfı\n• id: Benzersiz tanımlayıcı\n• style: Inline stil'
      }
    ],
    exampleCode: `<!-- Attribute Örnekleri -->
<a href="https://example.com">Bağlantı</a>
<img src="resim.jpg" alt="Açıklama">
<p class="onemli" id="para1">Metin</p>

<!-- Çoklu Attribute'ler -->
<input type="text" name="isim" placeholder="Adınız">`,
    challenge: {
      instructions: 'Doğru attribute\'ları ekleyerek kodu tamamla.',
      starterCode: `<a ___BLANK1___="https://kodcum.com">Kodcum</a>
<img ___BLANK2___="logo.png" ___BLANK3___="Logo">`,
      solution: `<a href="https://kodcum.com">Kodcum</a>
<img src="logo.png" alt="Logo">`,
      blanks: ['href', 'src', 'alt']
    },
    xpReward: 10
  },

  // 4. HTML Headings
  {
    id: 'html-headings',
    title: 'HTML Headings',
    order: 4,
    category: 'HTML',
    description: 'Başlıklar - h1\'den h6\'ya kadar başlık seviyeleri.',
    detailedContent: 'HTML\'de 6 seviye başlık vardır: h1 (en büyük) ile h6 (en küçük) arası. Başlıklar sayfa hiyerarşisini oluşturur.',
    sections: [
      {
        title: 'Başlık Seviyeleri',
        content: '• <h1>: Ana başlık (sayfada 1 tane)\n• <h2>: Alt başlık\n• <h3>: Üçüncü seviye\n• <h4>, <h5>, <h6>: Daha küçük başlıklar'
      },
      {
        title: 'Başlık Hiyerarşisi',
        content: 'Başlıkları sırayla kullanın. h1\'den sonra h3\'e atlamayın, h2 kullanın. Bu, SEO ve erişilebilirlik için önemlidir.'
      }
    ],
    exampleCode: `<h1>En Büyük Başlık</h1>
<h2>İkinci Seviye Başlık</h2>
<h3>Üçüncü Seviye Başlık</h3>
<h4>Dördüncü Seviye</h4>
<h5>Beşinci Seviye</h5>
<h6>En Küçük Başlık</h6>`,
    challenge: {
      instructions: 'Başlık hiyerarşisini doğru şekilde oluştur.',
      starterCode: `<___BLANK1___>Ana Başlık</___BLANK1___>
<___BLANK2___>Alt Başlık</___BLANK2___>
<p>İçerik...</p>
<___BLANK3___>Küçük Başlık</___BLANK3___>`,
      solution: `<h1>Ana Başlık</h1>
<h2>Alt Başlık</h2>
<p>İçerik...</p>
<h3>Küçük Başlık</h3>`,
      blanks: ['h1', 'h2', 'h3']
    },
    xpReward: 10
  },

  // 5. HTML Paragraphs
  {
    id: 'html-paragraphs',
    title: 'HTML Paragraphs',
    order: 5,
    category: 'HTML',
    description: 'Paragraflar ve metin biçimlendirme.',
    detailedContent: 'Paragraf etiketi <p> ile metin blokları oluşturulur. HTML otomatik olarak paragraflar arasına boşluk ekler.',
    sections: [
      {
        title: 'Paragraf Oluşturma',
        content: '<p> etiketi ile paragraf oluşturulur. Tarayıcı otomatik olarak paragrafların önü ve arkasına boşluk ekler.'
      },
      {
        title: 'Satır Atlama ve Çizgi',
        content: '• <br>: Satır atlar (kapanış etiketi yok)\n• <hr>: Yatay çizgi ekler\n• HTML\'de birden fazla boşluk tek boşuk sayılır'
      }
    ],
    exampleCode: `<p>Bu bir paragraftır.</p>
<p>Bu başka bir paragraf.</p>

<!-- Satır atlama -->
<p>İlk satır<br>İkinci satır</p>

<!-- Yatay çizgi -->
<hr>

<!-- Boşluklar -->
<p>Bu     metinde     çoklu     boşluklar     var.</p>`,
    challenge: {
      instructions: 'Paragraf ve satır atlama kullanarak metni düzenle.',
      starterCode: `<___BLANK1___>İlk paragraf</___BLANK1___>
<___BLANK1___>İkinci satır___BLANK2___Üçüncü satır</___BLANK1___>
___BLANK3___`,
      solution: `<p>İlk paragraf</p>
<p>İkinci satır<br>Üçüncü satır</p>
<hr>`,
      blanks: ['p', '<br>', '<hr>']
    },
    xpReward: 10
  },

  // 6. HTML Styles
  {
    id: 'html-styles',
    title: 'HTML Styles',
    order: 6,
    category: 'HTML',
    description: 'Style attribute ile inline CSS kullanımı.',
    detailedContent: 'style attribute\'u ile HTML elementlerine doğrudan CSS stilleri ekleyebilirsiniz. Bu yönteme "inline CSS" denir.',
    sections: [
      {
        title: 'Inline Style Kullanımı',
        content: 'style="özellik: değer;" şeklinde yazılır.\n\nÖrnek: <p style="color: red;">Kırmızı metin</p>'
      },
      {
        title: 'Yaygın CSS Özellikleri',
        content: '• color: Metin rengi\n• background-color: Arka plan rengi\n• font-size: Yazı boyutu (px, em, rem)\n• font-weight: Kalınlık (bold, normal)\n• text-align: Hizalama (left, center, right)'
      },
      {
        title: 'Çoklu Stil',
        content: 'Birden fazla stil noktalı virgülle ayrılır:\nstyle="color: blue; font-size: 20px; font-weight: bold;"'
      }
    ],
    exampleCode: `<p style="color: blue;">Mavi metin</p>
<p style="font-size: 20px;">Büyük metin</p>
<p style="background-color: yellow;">Sarı arka plan</p>

<!-- Çoklu stiller -->
<p style="color: red; font-size: 24px; font-weight: bold;">
    Kırmızı, büyük ve kalın metin
</p>`,
    challenge: {
      instructions: 'Style attribute kullanarak metni stillendir.',
      starterCode: `<p ___BLANK1___="color: green;">Yeşil metin</p>
<p style="___BLANK2___: 18px;">Orta boy metin</p>
<p style="background-color: ___BLANK3___;">Pembe zemin</p>`,
      solution: `<p style="color: green;">Yeşil metin</p>
<p style="font-size: 18px;">Orta boy metin</p>
<p style="background-color: pink;">Pembe zemin</p>`,
      blanks: ['style', 'font-size', 'pink']
    },
    xpReward: 10
  },

  // 7. HTML Formatting
  {
    id: 'html-formatting',
    title: 'HTML Formatting',
    order: 7,
    category: 'HTML',
    description: 'Metin biçimlendirme etiketleri - kalın, italik, altı çizili.',
    detailedContent: 'HTML\'de metinleri biçimlendirmek için özel etiketler vardır. Bunlar metne anlamsal ve görsel değer katar.',
    sections: [
      {
        title: 'Kalın ve Vurgulu',
        content: '• <strong>: Önemli metin (kalın, anlamsal)\n• <b>: Kalın metin (sadece görsel)\n• <em>: Vurgulu metin (italik, anlamsal)\n• <i>: İtalik metin (sadece görsel)'
      },
      {
        title: 'Diğer Biçimlendirmeler',
        content: '• <mark>: İşaretlenmiş metin (sarı zemin)\n• <del>: Silinmiş metin (üstü çizili)\n• <ins>: Eklenmiş metin (altı çizili)\n• <small>: Küçük metin\n• <sub>: Alt simge (H₂O)\n• <sup>: Üst simge (x²)'
      }
    ],
    exampleCode: `<b>Kalın metin</b>
<strong>Güçlü vurgu (kalın)</strong>
<i>İtalik metin</i>
<em>Vurgulanmış metin (italik)</em>
<u>Altı çizili</u>
<mark>İşaretlenmiş metin</mark>
<small>Küçük metin</small>
<del>Silinmiş metin</del>
<ins>Eklenen metin</ins>
<sub>Alt simge</sub>
<sup>Üst simge</sup>`,
    challenge: {
      instructions: 'Doğru biçimlendirme etiketlerini kullan.',
      starterCode: `<___BLANK1___>Bu metin kalın</___BLANK1___>
<___BLANK2___>Bu metin italik</___BLANK2___>
<___BLANK3___>Bu metin işaretli</___BLANK3___>`,
      solution: `<strong>Bu metin kalın</strong>
<em>Bu metin italik</em>
<mark>Bu metin işaretli</mark>`,
      blanks: ['strong', 'em', 'mark']
    },
    xpReward: 10
  },

  // 8. HTML Quotations
  {
    id: 'html-quotations',
    title: 'HTML Quotations',
    order: 8,
    category: 'HTML',
    description: 'Alıntı ve referans etiketleri.',
    detailedContent: 'HTML\'de alıntılar ve referanslar için özel etiketler vardır. Bu etiketler içeriğe anlamsal değer katar.',
    sections: [
      {
        title: 'Alıntı Tipleri',
        content: '• <q>: Kısa alıntı (satır içi, tırnak işareti ekler)\n• <blockquote>: Uzun alıntı (blok, girintili)\n• cite attribute: Alıntı kaynağını belirtir'
      },
      {
        title: 'Diğer Referans Etiketleri',
        content: '• <abbr>: Kısaltma (title ile açıklama)\n• <address>: İletişim bilgisi\n• <cite>: Yapıt ismi (kitap, film, vb.)'
      }
    ],
    exampleCode: `<!-- Kısa alıntı -->
<p>Sözü şöyle der: <q>Bilgi güçtür</q></p>

<!-- Blok alıntı -->
<blockquote cite="https://example.com">
    Bu uzun bir alıntıdır ve ayrı bir blok olarak gösterilir.
</blockquote>

<!-- Kısaltma -->
<p><abbr title="HyperText Markup Language">HTML</abbr></p>`,
    challenge: {
      instructions: 'Alıntı etiketlerini doğru kullan.',
      starterCode: `<p>Albert Einstein: <___BLANK1___>Hayal gücü bilgiden önemlidir</___BLANK1___></p>
<___BLANK2___>
    Uzun bir alıntı metni buraya gelir.
</___BLANK2___>`,
      solution: `<p>Albert Einstein: <q>Hayal gücü bilgiden önemlidir</q></p>
<blockquote>
    Uzun bir alıntı metni buraya gelir.
</blockquote>`,
      blanks: ['q', 'blockquote']
    },
    xpReward: 10
  },

  // 9. HTML Comments
  {
    id: 'html-comments',
    title: 'HTML Comments',
    order: 9,
    category: 'HTML',
    description: 'HTML yorumları - kodu açıklamak için notlar.',
    detailedContent: 'Yorumlar, HTML kodunda tarayıcı tarafından görüntülenmeyen notlardır. Kodu belgelemek ve açıklamak için kullanılır.',
    sections: [
      {
        title: 'Yorum Yazımı',
        content: 'HTML yorumları <!-- ile başlar, --> ile biter:\n<!-- Bu bir yorumdur -->\n\nYorumlar tarayıcıda görünmez ama kaynak kodda görülebilir.'
      },
      {
        title: 'Yorum Kullanım Alanları',
        content: '• Kod bölümlerini açıklamak\n• Geçici olarak kodu devre dışı bırakmak\n• Geliştiriciler için notlar bırakmak\n• Çok satırlı yorum yapılabilir'
      }
    ],
    exampleCode: `<!-- Bu bir yorum satırıdır -->
<p>Görünen içerik</p>

<!-- 
    Çok satırlı
    yorum
    örneği
-->

<!-- <p>Bu paragraf yorumda, görünmez</p> -->`,
    challenge: {
      instructions: 'Yorum satırlarını ekleyerek kodu belgele.',
      starterCode: `___BLANK1___ Bu başlık bölümü ___BLANK2___
<h1>Başlık</h1>
___BLANK1___ İçerik bölümü ___BLANK2___
<p>İçerik</p>`,
      solution: `<!-- Bu başlık bölümü -->
<h1>Başlık</h1>
<!-- İçerik bölümü -->
<p>İçerik</p>`,
      blanks: ['<!--', '-->']
    },
    xpReward: 10
  },

  // 10. HTML Colors
  {
    id: 'html-colors',
    title: 'HTML Colors',
    order: 10,
    category: 'HTML',
    description: 'HTML\'de renk kullanımı - isim, hex, RGB, RGBA.',
    detailedContent: 'HTML\'de renkleri farklı formatlarda kullanabilirsiniz. Renk isimleri, hex kodları, RGB ve RGBA değerleri ile zengin görsel içerikler oluşturabilirsiniz.',
    sections: [
      {
        title: 'Renk İsimleri',
        content: 'HTML 140 standart renk ismini destekler:\n\n• red, blue, green gibi temel renkler\n• lightblue, darkgreen gibi ton varyasyonları\n• transparent (saydam) özel değeri\n\nÖrnek: <p style="color: red;">Kırmızı metin</p>'
      },
      {
        title: 'Hex Kodları',
        content: 'Hexadecimal (16\'lık) renk kodları # işareti ile başlar:\n\n• #RRGGBB formatında 6 haneli\n• #RGB formatında 3 haneli kısaltma\n• #FF0000 kırmızı, #00FF00 yeşil, #0000FF mavi\n\nÖrnek: <p style="color: #FF5733;">Turuncu metin</p>'
      },
      {
        title: 'RGB ve RGBA',
        content: 'RGB kırmızı, yeşil, mavi değerlerini 0-255 arası belirtir:\n\n• rgb(255, 0, 0) = kırmızı\n• rgba(0, 0, 255, 0.5) = yarı saydam mavi\n• Son parametre (alpha) 0-1 arası saydamlık\n\nÖrnek: <p style="color: rgba(255, 0, 0, 0.8);">Saydam kırmızı</p>'
      }
    ],
    exampleCode: `<!-- Renk isimleri -->
<p style="color: red;">Kırmızı</p>
<p style="color: blue;">Mavi</p>

<!-- Hex kodları -->
<p style="color: #FF0000;">Kırmızı (Hex)</p>
<p style="color: #00FF00;">Yeşil (Hex)</p>

<!-- RGB -->
<p style="color: rgb(255, 0, 0);">Kırmızı (RGB)</p>

<!-- RGBA (saydamlık ile) -->
<p style="color: rgba(0, 0, 255, 0.5);">Yarı saydam mavi</p>`,
    challenge: {
      instructions: 'Farklı renk formatlarını kullan.',
      starterCode: `<p style="color: ___BLANK1___;">Yeşil metin</p>
<p style="color: ___BLANK2___;">Kırmızı (hex)</p>
<p style="color: ___BLANK3___(0, 0, 255);">Mavi (RGB)</p>`,
      solution: `<p style="color: green;">Yeşil metin</p>
<p style="color: #FF0000;">Kırmızı (hex)</p>
<p style="color: rgb(0, 0, 255);">Mavi (RGB)</p>`,
      blanks: ['green', '#FF0000', 'rgb']
    },
    xpReward: 10
  },

  // 11. HTML CSS
  {
    id: 'html-css',
    title: 'HTML CSS',
    order: 11,
    category: 'HTML',
    description: 'HTML\'de CSS kullanımı - inline, internal, external.',
    detailedContent: 'CSS (Cascading Style Sheets), HTML elementlerinin görünümünü şekillendirmek için kullanılır. Üç farklı yöntemle HTML\'e CSS ekleyebilirsiniz.',
    sections: [
      {
        title: 'Inline CSS',
        content: 'Style attribute ile doğrudan element üzerinde stil tanımlama:\n\n• Hızlı ve özel stillemeler için\n• Sadece o element için geçerli\n• Öncelik seviyesi en yüksek\n\nÖrnek: <p style="color: red; font-size: 16px;">Stillendirilmiş metin</p>'
      },
      {
        title: 'Internal CSS',
        content: 'Head bölümünde <style> etiketi içinde tanımlama:\n\n• Sayfa özelinde stil tanımları\n• Class ve ID seçicileri kullanılabilir\n• Tek sayfada tüm stilleri yönetme\n\nÖrnek:\n<style>\n  .baslik { color: blue; }\n</style>'
      },
      {
        title: 'External CSS',
        content: 'Ayrı bir CSS dosyasından stil yükleme:\n\n• Birden fazla sayfada kullanılabilir\n• <link> etiketi ile bağlanır\n• En iyi pratik ve bakım kolaylığı\n• Tarayıcı cache\'i sayesinde performanslı\n\nÖrnek: <link rel="stylesheet" href="styles.css">'
      }
    ],
    exampleCode: `<!-- Inline CSS -->
<p style="color: red;">Inline stil</p>

<!-- Internal CSS -->
<style>
    .mavi { color: blue; }
    #ozel { font-size: 20px; }
</style>
<p class="mavi">Mavi paragraf</p>

<!-- External CSS -->
<link rel="stylesheet" href="styles.css">`,
    challenge: {
      instructions: 'CSS\'i HTML\'e doğru şekilde ekle.',
      starterCode: `<___BLANK1___>
    .kirmizi { color: red; }
</___BLANK1___>
<p ___BLANK2___="kirmizi">Kırmızı metin</p>`,
      solution: `<style>
    .kirmizi { color: red; }
</style>
<p class="kirmizi">Kırmızı metin</p>`,
      blanks: ['style', 'class']
    },
    xpReward: 15
  },

  // 12. HTML Links
  {
    id: 'html-links',
    title: 'HTML Links',
    order: 12,
    category: 'HTML',
    description: 'Bağlantılar - href, target, bağlantı türleri.',
    detailedContent: 'HTML linkleri <a> etiketi ile oluşturulur ve sayfalar arası gezinme, dış kaynaklara bağlanma ve özel protokoller için kullanılır.',
    sections: [
      {
        title: 'Temel Link Yapısı',
        content: 'Anchor (<a>) etiketi ile hiperlink oluşturma:\n\n• href: Gidilecek adres (zorunlu)\n• target: Açılış davranışı (_blank, _self)\n• title: Fare üzerine gelince görünen açıklama\n\nÖrnek: <a href="https://ornek.com" target="_blank">Ziyaret Et</a>'
      },
      {
        title: 'Link Türleri',
        content: 'Farklı protokol ve hedefler için link kullanımı:\n\n• Web linkleri: https://site.com\n• Email: mailto:email@ornek.com\n• Telefon: tel:+905551234567\n• Dosya indirme: download attribute\n\nÖrnek: <a href="mailto:info@kodcum.com">Email Gönder</a>'
      },
      {
        title: 'Sayfa İçi Linkler',
        content: 'Aynı sayfa içinde bölümler arası gezinme:\n\n• # işareti ile ID referansı\n• Smooth scroll için CSS eklenebilir\n• Menü ve navigasyon için ideal\n\nÖrnek:\n<a href="#bolum1">Bölüm 1</a>\n...\n<div id="bolum1">İçerik</div>'
      }
    ],
    exampleCode: `<!-- Basit link -->
<a href="https://kodcum.com">Kodcum</a>

<!-- Yeni sekmede aç -->
<a href="https://google.com" target="_blank">Google</a>

<!-- Email linki -->
<a href="mailto:info@kodcum.com">Email Gönder</a>

<!-- Telefon linki -->
<a href="tel:+905551234567">Ara</a>

<!-- Sayfa içi link -->
<a href="#bolum1">Bölüm 1'e Git</a>`,
    challenge: {
      instructions: 'Farklı türde linkler oluştur.',
      starterCode: `<___BLANK1___ ___BLANK2___="https://example.com">Siteye Git</___BLANK1___>
<a href="https://example.com" ___BLANK3___="_blank">Yeni Sekmede Aç</a>`,
      solution: `<a href="https://example.com">Siteye Git</a>
<a href="https://example.com" target="_blank">Yeni Sekmede Aç</a>`,
      blanks: ['a', 'href', 'target']
    },
    xpReward: 15
  },

  // 13. HTML Images
  {
    id: 'html-images',
    title: 'HTML Images',
    order: 13,
    category: 'HTML',
    description: 'Resim ekleme - src, alt, width, height.',
    detailedContent: 'Web sayfalarına görsel içerik eklemek için <img> etiketi kullanılır. Görseller sayfa deneyimini zenginleştirir ve erişilebilirlik için önemlidir.',
    sections: [
      {
        title: 'Temel Resim Özellikleri',
        content: 'Img etiketi ve zorunlu attribute\'lar:\n\n• src: Resim dosyasının yolu (zorunlu)\n• alt: Alternatif metin, erişilebilirlik için (zorunlu)\n• width/height: Boyut değerleri (piksel)\n• title: Fare üzerine gelince görünen açıklama\n\nÖrnek: <img src="foto.jpg" alt="Açıklama" width="300">'
      },
      {
        title: 'Responsive Görseller',
        content: 'Farklı ekran boyutlarına uyumlu resimler:\n\n• CSS ile width: 100%; max-width: 100%;\n• height: auto; oranı korur\n• srcset ile farklı çözünürlükler\n• <picture> ile multiple sources\n\nÖrnek: <img src="resim.jpg" style="width:100%; height:auto;" alt="Responsive">'
      },
      {
        title: 'Resim Formatları',
        content: 'Web için en yaygın görsel formatları:\n\n• JPEG: Fotoğraflar için ideal\n• PNG: Şeffaflık desteği, logolar için\n• GIF: Animasyonlu görseller\n• SVG: Vektörel, ölçeklenebilir grafikler\n• WebP: Modern, optimize format\n\nFormat seçimi performansı etkiler!'
      }
    ],
    exampleCode: `<!-- Basit resim -->
<img src="resim.jpg" alt="Açıklama">

<!-- Boyutlu resim -->
<img src="logo.png" alt="Logo" width="300" height="200">

<!-- Responsive resim -->
<img src="foto.jpg" alt="Foto" style="width:100%; height:auto;">`,
    challenge: {
      instructions: 'Resim etiketini doğru attribute\'larla tamamla.',
      starterCode: `<___BLANK1___ ___BLANK2___="resim.jpg" ___BLANK3___="Açıklama" width="400">`,
      solution: `<img src="resim.jpg" alt="Açıklama" width="400">`,
      blanks: ['img', 'src', 'alt']
    },
    xpReward: 15
  },

  // 14. HTML Favicon
  {
    id: 'html-favicon',
    title: 'HTML Favicon',
    order: 14,
    category: 'HTML',
    description: 'Favicon ekleme - site ikonu.',
    detailedContent: 'Favicon, web sitenizi tarayıcı sekmesinde ve yer imlerinde temsil eden küçük simgedir. Marka kimliği ve profesyonel görünüm için önemlidir.',
    sections: [
      {
        title: 'Favicon Nedir?',
        content: 'Web sitelerinin görsel kimlik simgesi:\n\n• Tarayıcı sekmesinde görünür\n• Yer imleri listesinde yer alır\n• Mobil cihazlarda ana ekran simgesi\n• Genellikle 16x16 veya 32x32 piksel\n\nSitenize profesyonel bir görünüm katar!'
      },
      {
        title: 'Favicon Ekleme',
        content: 'Head bölümünde <link> etiketi ile eklenir:\n\n• rel="icon" attribute\'u kullanılır\n• type="image/x-icon" veya "image/png"\n• href ile dosya yolu belirtilir\n• Birden fazla boyut eklenebilir\n\nÖrnek: <link rel="icon" type="image/png" href="/favicon.png">'
      },
      {
        title: 'Farklı Platform Desteği',
        content: 'Çeşitli cihazlar için favicon varyasyonları:\n\n• .ico formatı: Eski tarayıcı desteği\n• .png formatı: Modern standart\n• apple-touch-icon: iOS cihazlar için\n• Farklı boyutlar: 16x16, 32x32, 192x192\n\nÖrnek: <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">'
      }
    ],
    exampleCode: `<!DOCTYPE html>
<html>
<head>
    <title>Site Başlığı</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    
    <!-- PNG favicon -->
    <link rel="icon" type="image/png" href="favicon.png">
</head>
<body>
    <h1>İçerik</h1>
</body>
</html>`,
    challenge: {
      instructions: 'Favicon linkini head bölümüne ekle.',
      starterCode: `<head>
    <title>Sitem</title>
    <___BLANK1___ rel="___BLANK2___" type="image/x-icon" href="___BLANK3___">
</head>`,
      solution: `<head>
    <title>Sitem</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>`,
      blanks: ['link', 'icon', 'favicon.ico']
    },
    xpReward: 10
  },

  // 15. HTML Page Title
  {
    id: 'html-page-title',
    title: 'HTML Page Title',
    order: 15,
    category: 'HTML',
    description: 'Sayfa başlığı - title etiketi ve önemi.',
    detailedContent: 'Title etiketi, web sayfanızın tarayıcı sekmesinde görünen başlığıdır. SEO ve kullanıcı deneyimi için kritik öneme sahiptir.',
    sections: [
      {
        title: 'Title Etiketi Nedir?',
        content: 'Head bölümünde yer alan sayfa başlığı:\n\n• Tarayıcı sekmesinde görünür\n• Arama motorları tarafından okunur\n• Yer imlerine kaydedilir\n• Sosyal medyada paylaşılmada kullanılır\n\nÖrnek: <title>Ana Sayfa - Kodcum</title>'
      },
      {
        title: 'SEO İçin Title',
        content: 'İyi bir sayfa başlığı özellikleri:\n\n• 50-60 karakter arası olmalı\n• Sayfanın içeriğini net anlatır\n• Anahtar kelimeleri içerir\n• Her sayfa için benzersiz olmalı\n• Marka adı eklenebilir\n\nÖrnek: <title>HTML Dersleri - Ücretsiz Eğitim | Kodcum</title>'
      },
      {
        title: 'Meta Etiketleri ile Birlikte',
        content: 'Title ile birlikte kullanılan meta etiketleri:\n\n• meta description: Sayfa açıklaması\n• meta keywords: Anahtar kelimeler (eskidi)\n• meta viewport: Responsive tasarım\n• meta charset: Karakter kodlaması\n\nÖrnek:\n<meta name="description" content="HTML öğrenin">\n<meta charset="UTF-8">'
      }
    ],
    exampleCode: `<!DOCTYPE html>
<html>
<head>
    <title>Sayfamın Başlığı - Kodcum</title>
    <meta charset="UTF-8">
    <meta name="description" content="Sayfa açıklaması">
</head>
<body>
    <h1>İçerik</h1>
</body>
</html>`,
    challenge: {
      instructions: 'Head bölümünü title ile tamamla.',
      starterCode: `<head>
    <___BLANK1___>Benim Sitem</___BLANK1___>
    <___BLANK2___ charset="UTF-8">
</head>`,
      solution: `<head>
    <title>Benim Sitem</title>
    <meta charset="UTF-8">
</head>`,
      blanks: ['title', 'meta']
    },
    xpReward: 10
  },

  // 16. HTML Tables
  {
    id: 'html-tables',
    title: 'HTML Tables',
    order: 16,
    category: 'HTML',
    description: 'Tablolar - satır, sütun, başlık yapısı.',
    detailedContent: 'HTML tabloları, verileri satır ve sütunlar halinde düzenli bir şekilde göstermek için kullanılır. Tablo yapısı semantik ve erişilebilir olmalıdır.',
    sections: [
      {
        title: 'Tablo Yapısı',
        content: 'Temel tablo elementleri ve hiyerarşisi:\n\n• <table>: Ana tablo kapsayıcısı\n• <tr>: Table row - satır\n• <th>: Table header - başlık hücresi\n• <td>: Table data - veri hücresi\n\nÖrnek:\n<table>\n  <tr>\n    <th>Başlık</th>\n  </tr>\n  <tr>\n    <td>Veri</td>\n  </tr>\n</table>'
      },
      {
        title: 'Tablo Bölümleri',
        content: 'Tabloları anlamlı bölümlere ayırma:\n\n• <thead>: Tablo başlığı bölümü\n• <tbody>: Ana içerik bölümü\n• <tfoot>: Alt bilgi bölümü\n• Semantik yapı ve erişilebilirlik sağlar\n\nYazdırmada thead/tfoot her sayfada tekrarlanır!'
      },
      {
        title: 'Hücre Birleştirme',
        content: 'Hücreleri yatay veya dikey birleştirme:\n\n• colspan: Yatay birleştirme (sütun)\n• rowspan: Dikey birleştirme (satır)\n• Sayı değeri kaç hücre birleştirileceğini belirtir\n\nÖrnek:\n<td colspan="2">2 sütun genişliğinde</td>\n<td rowspan="3">3 satır yüksekliğinde</td>'
      }
    ],
    exampleCode: `<table>
    <thead>
        <tr>
            <th>İsim</th>
            <th>Yaş</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Ali</td>
            <td>25</td>
        </tr>
        <tr>
            <td>Ayşe</td>
            <td>30</td>
        </tr>
    </tbody>
</table>`,
    challenge: {
      instructions: 'Tablo yapısını tamamla.',
      starterCode: `<___BLANK1___>
    <___BLANK2___>
        <___BLANK3___>Başlık</___BLANK3___>
    </___BLANK2___>
    <tr>
        <td>Veri</td>
    </tr>
</___BLANK1___>`,
      solution: `<table>
    <tr>
        <th>Başlık</th>
    </tr>
    <tr>
        <td>Veri</td>
    </tr>
</table>`,
      blanks: ['table', 'tr', 'th']
    },
    xpReward: 15
  },

  // 17. HTML Lists
  {
    id: 'html-lists',
    title: 'HTML Lists',
    order: 17,
    category: 'HTML',
    description: 'Listeler - sıralı (ol) ve sırasız (ul) listeler.',
    detailedContent: 'HTML listeleri, ilgili öğeleri gruplandırmak için kullanılır. Sıralı ve sırasız olmak üzere iki ana liste türü vardır.',
    sections: [
      {
        title: 'Sırasız Listeler (ul)',
        content: 'Unordered list - madde işaretli listeler:\n\n• <ul> etiketi ile tanımlanır\n• <li> ile liste öğeleri eklenir\n• Varsayılan olarak bullet (nokta) ile gösterilir\n• CSS ile farklı işaretler (disc, circle, square)\n\nÖrnek:\n<ul>\n  <li>Elma</li>\n  <li>Armut</li>\n</ul>'
      },
      {
        title: 'Sıralı Listeler (ol)',
        content: 'Ordered list - numaralı listeler:\n\n• <ol> etiketi ile tanımlanır\n• <li> ile liste öğeleri eklenir\n• Otomatik numaralandırma (1, 2, 3...)\n• type attribute: 1, A, a, I, i\n• start attribute: Başlangıç sayısı\n\nÖrnek:\n<ol type="A" start="3">\n  <li>C madde</li>\n  <li>D madde</li>\n</ol>'
      },
      {
        title: 'İç İçe Listeler',
        content: 'Liste içinde alt liste oluşturma:\n\n• <li> içine yeni <ul> veya <ol> eklenebilir\n• Hiyerarşik yapılar oluşturma\n• Menü ve navigasyon için ideal\n• Girintiler otomatik uygulanır\n\nÖrnek:\n<ul>\n  <li>Ana öğe\n    <ul>\n      <li>Alt öğe</li>\n    </ul>\n  </li>\n</ul>'
      }
    ],
    exampleCode: `<!-- Sırasız liste -->
<ul>
    <li>Öğe 1</li>
    <li>Öğe 2</li>
    <li>Öğe 3</li>
</ul>

<!-- Sıralı liste -->
<ol>
    <li>İlk adım</li>
    <li>İkinci adım</li>
    <li>Üçüncü adım</li>
</ol>

<!-- İç içe liste -->
<ul>
    <li>Ana öğe
        <ul>
            <li>Alt öğe</li>
        </ul>
    </li>
</ul>`,
    challenge: {
      instructions: 'Liste yapılarını doğru oluştur.',
      starterCode: `<___BLANK1___>
    <___BLANK2___>Elma</___BLANK2___>
    <___BLANK2___>Armut</___BLANK2___>
</___BLANK1___>

<___BLANK3___>
    <li>Birinci</li>
    <li>İkinci</li>
</___BLANK3___>`,
      solution: `<ul>
    <li>Elma</li>
    <li>Armut</li>
</ul>

<ol>
    <li>Birinci</li>
    <li>İkinci</li>
</ol>`,
      blanks: ['ul', 'li', 'ol']
    },
    xpReward: 15
  },

  // 18. HTML Block & Inline
  {
    id: 'html-block-inline',
    title: 'HTML Block & Inline',
    order: 18,
    category: 'HTML',
    description: 'Block ve inline elementler arasındaki farklar.',
    detailedContent: 'HTML elementleri görüntülenme davranışlarına göre block-level ve inline olmak üzere ikiye ayrılır. Bu ayrım sayfa düzeni için kritiktir.',
    sections: [
      {
        title: 'Block-Level Elementler',
        content: 'Tam genişlik alan ve yeni satırda başlayan elementler:\n\n• Her zaman yeni satırda başlar\n• Mevcut genişliğin %100\'nü kaplar\n• Genişlik ve yükseklik ayarlanabilir\n• Örnekler: <div>, <p>, <h1>-<h6>, <ul>, <ol>, <li>, <section>, <article>\n\nBlock elementler içine inline ve block elementler konabilir.'
      },
      {
        title: 'Inline Elementler',
        content: 'Satır içinde yer alan, sadece içerik kadar alan kaplayan elementler:\n\n• Yeni satır başlatmaz\n• Sadece içerik kadar genişlik kaplar\n• Genişlik ve yükseklik genelde ayarlanamaz\n• Örnekler: <span>, <a>, <strong>, <em>, <img>, <br>, <input>\n\nInline elementler içine sadece inline elementler konabilir.'
      },
      {
        title: 'Display Özelliği',
        content: 'CSS ile element davranışını değiştirme:\n\n• display: block; - Inline elementi block yapar\n• display: inline; - Block elementi inline yapar\n• display: inline-block; - Hibrit davranış\n• display: none; - Elementi gizler\n\nÖrnek:\n<span style="display: block;">Block gibi davranan span</span>\n<div style="display: inline;">Inline gibi davranan div</div>'
      }
    ],
    exampleCode: `<!-- Block elementler (yeni satır başlar) -->
<div>Bu bir div (block)</div>
<p>Bu bir paragraf (block)</p>
<h1>Bu bir başlık (block)</h1>

<!-- Inline elementler (satır içi) -->
<span>Bu bir span (inline)</span>
<a href="#">Bu bir link (inline)</a>
<strong>Bu kalın metin (inline)</strong>

<!-- Karışık kullanım -->
<div>
    Block içinde <span>inline</span> element
</div>`,
    challenge: {
      instructions: 'Block ve inline elementleri doğru kullan.',
      starterCode: `<___BLANK1___>
    Ana blok içeriği
</___BLANK1___>

<p>Paragraf içinde <___BLANK2___>inline metin</___BLANK2___></p>`,
      solution: `<div>
    Ana blok içeriği
</div>

<p>Paragraf içinde <span>inline metin</span></p>`,
      blanks: ['div', 'span']
    },
    xpReward: 15
  },

  // 19. HTML Div
  {
    id: 'html-div',
    title: 'HTML Div',
    order: 19,
    category: 'HTML',
    description: 'Div elementi - sayfa düzeni ve gruplandırma.',
    detailedContent: 'Div (division) elementi, HTML\'in en çok kullanılan block-level kapsayıcısıdır. İçerikleri gruplandırmak ve sayfa düzeni oluşturmak için kullanılır.',
    sections: [
      {
        title: 'Div Elementi Nedir?',
        content: 'Generic block-level container elementi:\n\n• Kendisi hiçbir anlam taşımaz (semantik değil)\n• Diğer elementleri gruplar\n• CSS ile stillendirilir\n• JavaScript ile manipule edilir\n• Layout yapısının temelidir\n\nÖrnek:\n<div>\n  <h2>Başlık</h2>\n  <p>İçerik</p>\n</div>'
      },
      {
        title: 'Div ile Sayfa Düzeni',
        content: 'Modern web sayfalarında layout oluşturma:\n\n• Container, row, column yapıları\n• Header, main, footer bölümleri\n• Grid ve Flexbox ile birlikte kullanım\n• Responsive tasarım için temel\n\nÖrnek:\n<div class="container">\n  <div class="row">\n    <div class="col">Sütun 1</div>\n    <div class="col">Sütun 2</div>\n  </div>\n</div>'
      },
      {
        title: 'Div vs Semantik Elementler',
        content: 'Ne zaman div, ne zaman semantik element kullanılmalı:\n\n• Anlamı belli bölümler için: <header>, <nav>, <main>, <footer>\n• Sadece stillemek için: <div>\n• İçerik bölümleri: <section>, <article>\n• Yan içerik: <aside>\n\nSemantik HTML SEO ve erişilebilirlik için daha iyidir, ancak div hala gereklidir!'
      }
    ],
    exampleCode: `<!-- Basit div -->
<div>
    <h2>Başlık</h2>
    <p>İçerik</p>
</div>

<!-- Class ve ID ile div -->
<div class="container">
    <div class="row">
        <div class="col">Sütun 1</div>
        <div class="col">Sütun 2</div>
    </div>
</div>

<!-- Stillendirilmiş div -->
<div style="background-color: lightblue; padding: 20px;">
    Mavi kutucuk
</div>`,
    challenge: {
      instructions: 'Div yapısını oluştur ve stillendir.',
      starterCode: `<___BLANK1___ ___BLANK2___="kutu">
    <h3>Başlık</h3>
    <p>İçerik</p>
</___BLANK1___>`,
      solution: `<div class="kutu">
    <h3>Başlık</h3>
    <p>İçerik</p>
</div>`,
      blanks: ['div', 'class']
    },
    xpReward: 15
  },

  // 20. HTML Classes & Id
  {
    id: 'html-classes-id',
    title: 'HTML Classes & Id',
    order: 20,
    category: 'HTML',
    description: 'Class ve ID kullanımı - CSS ve JavaScript için seçiciler.',
    detailedContent: 'Class ve ID attribute\'ları, HTML elementlerini tanımlamak ve seçmek için kullanılır. CSS stillemesi ve JavaScript manipulasyonu için vazgeçilmezdir.',
    sections: [
      {
        title: 'Class Attribute',
        content: 'Birden fazla elemente aynı stil veya davranışı uygulamak için:\n\n• Bir element birden fazla class alabilir (boşlukla ayrılır)\n• Aynı class birden fazla elementte kullanılabilir\n• CSS\'de nokta (.) ile seçilir: .class-adi\n• JavaScript\'te getElementsByClassName() ile seçilir\n\nÖrnek:\n<p class="buyuk kirmizi">Stillendirilmiş metin</p>\n<div class="buyuk">Aynı stil</div>'
      },
      {
        title: 'ID Attribute',
        content: 'Sayfada benzersiz elementi tanımlamak için:\n\n• Her ID sayfada sadece bir kez kullanılmalı (benzersiz)\n• Bir element sadece bir ID alabilir\n• CSS\'de diyez (#) ile seçilir: #id-adi\n• JavaScript\'te getElementById() ile seçilir\n• Sayfa içi linkler için kullanılır (#id)\n\nÖrnek:\n<div id="header">Header bölümü</div>\n<a href="#header">Header\'a git</a>'
      },
      {
        title: 'Class vs ID',
        content: 'Ne zaman class, ne zaman ID kullanmalı:\n\n• Class: Tekrar eden stiller için (.buton, .card)\n• ID: Benzersiz elementler için (#header, #footer)\n• Class: CSS stillemesi için tercih edilir\n• ID: JavaScript targeting için kullanışlı\n• Class daha esnektir, ID daha spesifiktir\n\nÖncelik: Inline style > ID > Class > Element\n\nÖrnek:\n<div id="ana-icerik" class="container featured">...</div>'
      }
    ],
    exampleCode: `<!-- Class kullanımı (çoklu olabilir) -->
<p class="onemli">Önemli paragraf</p>
<p class="onemli kirmizi">Önemli ve kırmızı</p>

<!-- ID kullanımı (benzersiz olmalı) -->
<div id="header">Header</div>
<div id="content">İçerik</div>

<!-- Stil ile birlikte -->
<style>
    .onemli { font-weight: bold; }
    #header { background-color: navy; }
</style>

<p class="onemli">Kalın metin</p>
<div id="header">Mavi header</div>`,
    challenge: {
      instructions: 'Class ve ID\'yi doğru kullan.',
      starterCode: `<div ___BLANK1___="ana-sayfa">
    <h1 ___BLANK2___="baslik buyuk">Ana Başlık</h1>
    <p class="metin">İçerik</p>
</div>`,
      solution: `<div id="ana-sayfa">
    <h1 class="baslik buyuk">Ana Başlık</h1>
    <p class="metin">İçerik</p>
</div>`,
      blanks: ['id', 'class']
    },
    xpReward: 20
  },

  // 21. HTML Genel Tekrar
  {
    id: 'html-final',
    title: 'HTML Genel Tekrar',
    order: 21,
    category: 'HTML',
    description: 'HTML bilgilerini pekiştir - Final testi ve proje ile HTML\'i tamamla!',
    detailedContent: 'HTML dersleri boyunca öğrendiğin tüm konuları bu bölümde pekiştireceksin. 20 soruluk final testini %80+ başarıyla tamamla ve son projeyi bitir.',
    sections: [
      {
        title: '📝 Final Testi',
        content: 'Aşağıdaki konuları kapsayan 20 soruluk final testini çöz:\n\n• HTML Basic & Elements\n• Attributes & Headings\n• Paragraphs & Styles\n• Links & Images\n• Lists & Tables\n• Forms & Input Types\n• Classes & ID\n\nBaşarı şartı: %80+ (16/20 doğru)'
      },
      {
        title: '🚀 Final Projesi',
        content: 'Kişisel portföy sayfası oluştur:\n\n• Header bölümü (isim, başlık)\n• Hakkımda bölümü\n• Beceriler listesi\n• İletişim formu\n• Footer\n\nBoşluk doldurma challenge\'ını tamamla!'
      },
      {
        title: '🎯 Tamamlama Kriterleri',
        content: '✅ Final testini %80+ ile geç\n✅ Final projesini tamamla\n\nHer ikisi de başarılı olursa HTML sertifikası kazanırsın!'
      }
    ],
    exampleCode: `<!-- Örnek HTML Yapısı -->
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portföyüm</title>
</head>
<body>
    <header>
        <h1>Adın Soyadın</h1>
        <p>Web Developer</p>
    </header>
    
    <section id="hakkimda">
        <h2>Hakkımda</h2>
        <p>Tanıtım metni...</p>
    </section>
    
    <footer>
        <p>&copy; 2025 Portföy</p>
    </footer>
</body>
</html>`,
    challenge: {
      instructions: '🎯 FINAL PROJESİ: Kişisel portföy sayfası oluştur. Boşlukları doldur!',
      starterCode: `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="___BLANK1___">
    <title>___BLANK2___</title>
</head>
<body>
    <___BLANK3___ id="header">
        <h1>İsmin</h1>
        <p>Mesleğin</p>
    </___BLANK3___>
    
    <section>
        <h2>Hakkımda</h2>
        <___BLANK4___>Kendini tanıt...</___BLANK4___>
        
        <h3>Becerilerim</h3>
        <___BLANK5___>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </___BLANK5___>
    </section>
    
    <section>
        <h2>İletişim</h2>
        <___BLANK6___ action="#" method="post">
            <label>Email:</label>
            <input type="___BLANK7___" name="email" required>
            
            <label>Mesaj:</label>
            <___BLANK8___ name="mesaj"></___BLANK8___>
            
            <button type="submit">Gönder</button>
        </___BLANK6___>
    </section>
    
    <___BLANK9___>
        <p>&copy; 2025 - Tüm hakları saklıdır</p>
    </___BLANK9___>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Portföyüm</title>
</head>
<body>
    <header id="header">
        <h1>İsmin</h1>
        <p>Mesleğin</p>
    </header>
    
    <section>
        <h2>Hakkımda</h2>
        <p>Kendini tanıt...</p>
        
        <h3>Becerilerim</h3>
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </section>
    
    <section>
        <h2>İletişim</h2>
        <form action="#" method="post">
            <label>Email:</label>
            <input type="email" name="email" required>
            
            <label>Mesaj:</label>
            <textarea name="mesaj"></textarea>
            
            <button type="submit">Gönder</button>
        </form>
    </section>
    
    <footer>
        <p>&copy; 2025 - Tüm hakları saklıdır</p>
    </footer>
</body>
</html>`,
      blanks: ['UTF-8', 'Portföyüm', 'header', 'p', 'ul', 'form', 'email', 'textarea', 'footer']
    },
    xpReward: 100
  }
];

// Final Sınavı Soruları
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const finalExam: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'HTML\'de sayfa başlığını belirlemek için hangi etiket kullanılır?',
    options: ['<head>', '<title>', '<header>', '<h1>'],
    correctAnswer: 1,
    explanation: '<title> etiketi tarayıcı sekmesinde görünen sayfa başlığını belirler.'
  },
  {
    id: 'q2',
    question: 'Hangisi block element değildir?',
    options: ['<div>', '<p>', '<span>', '<h1>'],
    correctAnswer: 2,
    explanation: '<span> inline bir elementtir, diğerleri block elementlerdir.'
  },
  {
    id: 'q3',
    question: 'Resim eklemek için hangi attribute zorunludur?',
    options: ['width', 'height', 'src', 'style'],
    correctAnswer: 2,
    explanation: 'src attribute\'u resmin dosya yolunu belirtir ve zorunludur.'
  },
  {
    id: 'q4',
    question: 'HTML yorumu nasıl yazılır?',
    options: ['// yorum', '/* yorum */', '<!-- yorum -->', '# yorum'],
    correctAnswer: 2,
    explanation: 'HTML\'de yorum <!-- ile başlar ve --> ile biter.'
  },
  {
    id: 'q5',
    question: 'Sırasız liste için hangi etiket kullanılır?',
    options: ['<ol>', '<ul>', '<li>', '<list>'],
    correctAnswer: 1,
    explanation: '<ul> sırasız liste (unordered list) oluşturur.'
  },
  {
    id: 'q6',
    question: 'Tablo başlığı için hangi etiket kullanılır?',
    options: ['<td>', '<tr>', '<th>', '<thead>'],
    correctAnswer: 2,
    explanation: '<th> tablo başlık hücresini (table header) temsil eder.'
  },
  {
    id: 'q7',
    question: 'Kalın metin için önerilen etiket hangisidir?',
    options: ['<b>', '<bold>', '<strong>', '<weight>'],
    correctAnswer: 2,
    explanation: '<strong> semantik olarak doğrudur ve SEO için önemlidir.'
  },
  {
    id: 'q8',
    question: 'Yeni sekmede link açmak için hangi attribute kullanılır?',
    options: ['new="_blank"', 'target="_blank"', 'window="_blank"', 'open="_blank"'],
    correctAnswer: 1,
    explanation: 'target="_blank" linki yeni sekmede açar.'
  },
  {
    id: 'q9',
    question: 'ID attribute için doğru olan nedir?',
    options: [
      'Sayfada birden fazla element aynı ID\'ye sahip olabilir',
      'ID benzersiz olmalıdır',
      'ID kullanmak zorunludur',
      'ID sadece div\'lerde kullanılır'
    ],
    correctAnswer: 1,
    explanation: 'Her ID sayfada benzersiz olmalıdır.'
  },
  {
    id: 'q10',
    question: 'Inline CSS yazmak için hangi attribute kullanılır?',
    options: ['css', 'style', 'class', 'design'],
    correctAnswer: 1,
    explanation: 'style attribute ile inline CSS yazılır.'
  },
  {
    id: 'q11',
    question: 'HTML5\'te geçerli bir renk formatı hangisidir?',
    options: ['color(255,0,0)', 'rgb(255,0,0)', '[255,0,0]', 'red(255)'],
    correctAnswer: 1,
    explanation: 'rgb(255,0,0) formatı geçerli bir RGB renk tanımıdır.'
  },
  {
    id: 'q12',
    question: 'Meta charset nerede tanımlanır?',
    options: ['<body>', '<head>', '<title>', '<html>'],
    correctAnswer: 1,
    explanation: 'Meta etiketleri <head> bölümünde tanımlanır.'
  },
  {
    id: 'q13',
    question: 'Paragrafta satır atlamak için hangi etiket kullanılır?',
    options: ['<break>', '<br>', '<lb>', '<newline>'],
    correctAnswer: 1,
    explanation: '<br> etiketi satır atlamak için kullanılır.'
  },
  {
    id: 'q14',
    question: 'Class attribute\'u için doğru olan nedir?',
    options: [
      'Bir element sadece bir class alabilir',
      'Class isimleri sayı ile başlayabilir',
      'Bir element birden fazla class alabilir',
      'Class kullanmak zorunludur'
    ],
    correctAnswer: 2,
    explanation: 'Bir element boşlukla ayırarak birden fazla class alabilir.'
  },
  {
    id: 'q15',
    question: 'HTML dokümanının kök elementi hangisidir?',
    options: ['<body>', '<head>', '<html>', '<DOCTYPE>'],
    correctAnswer: 2,
    explanation: '<html> etiketi HTML dokümanının kök elementidir.'
  }
];

// ==================== CSS LESSONS ====================
export const cssLessons: LessonContent[] = [
  // 1. CSS Syntax & Selectors
  {
    id: 'css-syntax',
    title: 'CSS Sözdizimi ve Seçiciler',
    order: 1,
    category: 'CSS',
    description: 'CSS sözdizimini ve temel seçicileri öğren. Element, class ve id seçicileri.',
    detailedContent: 'CSS (Cascading Style Sheets), HTML elementlerine stil vermek için kullanılır. Seçiciler hangi elementlerin stilleneceğini belirler.',
    sections: [
      {
        title: 'CSS Sözdizimi',
        content: 'CSS kuralı üç parçadan oluşur:\n\nseçici {\n  özellik: değer;\n}\n\nSeçici hangi element(ler), özellik ne değişecek, değer nasıl değişecek.'
      },
      {
        title: 'Temel Seçiciler',
        content: '• Element Seçici: p { } (tüm <p> etiketleri)\n• Class Seçici: .isim { } (class="isim" olan elementler)\n• ID Seçici: #isim { } (id="isim" olan element, benzersiz)\n\nClass birden fazla elemana, ID sadece bir elemana uygulanır.'
      }
    ],
    exampleCode: `/* CSS Sözdizimi */
selector {
    property: value;
}

/* Element Seçici */
p {
    color: blue;
}

/* Class Seçici */
.myClass {
    font-size: 16px;
}

/* ID Seçici */
#myId {
    background: yellow;
}`,
    challenge: {
      instructions: 'Boşlukları doldurarak CSS kuralını tamamla.',
      starterCode: `___BLANK1___ {
    color: ___BLANK2___;
    font-size: ___BLANK3___;
}`,
      solution: `p {
    color: red;
    font-size: 16px;
}`,
      blanks: ['p', 'red', '16px']
    },
    xpReward: 10
  },

  // 2. Colors (Hex, RGB)
  {
    id: 'css-colors',
    title: 'Renkler (Hex, RGB)',
    order: 2,
    category: 'CSS',
    description: 'CSS\'te renk tanımlama yöntemleri: İsim, Hex, RGB, RGBA.',
    detailedContent: 'CSS\'te renkleri 4 farklı şekilde tanımlayabilirsiniz. Her yöntemin kullanım alanı vardır.',
    sections: [
      {
        title: 'Renk Tanımlama Yöntemleri',
        content: '• İsimle: red, blue, green (140 renk ismi)\n• Hex: #ff0000 (ş harfli kod, #RRGGBB)\n• RGB: rgb(255, 0, 0) (Kırmızı, Yeşil, Mavi)\n• RGBA: rgba(255, 0, 0, 0.5) (+ Şeffaflık 0-1)'
      },
      {
        title: 'Hex ve RGB Açıklaması',
        content: 'Hex: #RRGGBB formatında, 00-FF arası\nÖrnek: #ff0000 = Kırmızı, #00ff00 = Yeşil\n\nRGB: 0-255 arası sayılarla\nÖrnek: rgb(255, 0, 0) = Kırmızı\n\nRGBA: Son parametre şeffaflık (0=tamamen saydam, 1=opak)'
      }
    ],
    exampleCode: `/* İsimle Renk */
h1 {
    color: red;
}

/* Hex Renk */
h2 {
    color: #ff0000;
}

/* RGB Renk */
p {
    color: rgb(255, 0, 0);
}

/* RGBA (Alpha - Şeffaflık) */
div {
    background-color: rgba(0, 0, 255, 0.5);
}`,
    challenge: {
      instructions: 'RGB formatında mavi renk tanımla.',
      starterCode: `p {
    color: ___BLANK1___(___BLANK2___, ___BLANK3___, 255);
}`,
      solution: `p {
    color: rgb(0, 0, 255);
}`,
      blanks: ['rgb', '0', '0']
    },
    xpReward: 10
  },

  // 3. Backgrounds
  {
    id: 'css-backgrounds',
    title: 'Arka Planlar',
    order: 3,
    category: 'CSS',
    description: 'Arka plan rengi, resmi ve özellikleri.',
    detailedContent: 'CSS ile arka planlara renk, resim ekleyebilir ve görünümlerini kontrol edebilirsiniz.',
    sections: [
      {
        title: 'Arka Plan Özellikleri',
        content: '• background-color: Arka plan rengi\n• background-image: Arka plan resmi (url())\n• background-repeat: Tekrar (repeat, no-repeat, repeat-x, repeat-y)\n• background-position: Konum (center, top, bottom, left, right)\n• background-size: Boyut (cover, contain, px, %)'
      },
      {
        title: 'Kısayol (Shorthand)',
        content: 'background özelliği ile tüm değerler tek satırda:\n\nbackground: renk url() tekrar konum/boyut;\n\nÖrnek: background: #fff url("bg.jpg") no-repeat center/cover;'
      }
    ],
    exampleCode: `/* Arka Plan Rengi */
body {
    background-color: #f0f0f0;
}

/* Arka Plan Resmi */
div {
    background-image: url('bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

/* Kısa Yol */
section {
    background: #fff url('img.png') no-repeat center/cover;
}`,
    challenge: {
      instructions: 'Arka plan rengini gri (#cccccc) yap.',
      starterCode: `body {
    ___BLANK1___: ___BLANK2___;
}`,
      solution: `body {
    background-color: #cccccc;
}`,
      blanks: ['background-color', '#cccccc']
    },
    xpReward: 10
  },

  // 4. Fonts & Text
  {
    id: 'css-fonts',
    title: 'Yazı Tipleri ve Metin Stilleri',
    order: 4,
    category: 'CSS',
    description: 'Font ailesi, boyutu, kalınlığı ve metin hizalama özellikleri.',
    detailedContent: 'CSS ile yazı tiplerini, boyutlarını ve metin özelliklerini kontrol edebilirsiniz.',
    sections: [
      {
        title: 'Font Özellikleri',
        content: '• font-family: Yazı tipi ailesi (Arial, sans-serif)\n• font-size: Yazı boyutu (px, em, rem, %)\n• font-weight: Kalınlık (normal, bold, 100-900)\n• font-style: Stil (normal, italic)\n• line-height: Satır yüksekliği'
      },
      {
        title: 'Metin Özellikleri',
        content: '• color: Metin rengi\n• text-align: Hizalama (left, center, right, justify)\n• text-decoration: Dekorasyon (underline, line-through, none)\n• text-transform: Dönüştürme (uppercase, lowercase, capitalize)\n• letter-spacing: Harf aralığı'
      }
    ],
    exampleCode: `/* Font Özellikleri */
p {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    font-style: italic;
}

/* Metin Özellikleri */
h1 {
    text-align: center;
    text-decoration: underline;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1.5;
}`,
    challenge: {
      instructions: 'Metni ortala ve kalın yap.',
      starterCode: `h1 {
    ___BLANK1___: center;
    ___BLANK2___: bold;
}`,
      solution: `h1 {
    text-align: center;
    font-weight: bold;
}`,
      blanks: ['text-align', 'font-weight']
    },
    xpReward: 10
  },

  // 5. Borders
  {
    id: 'css-borders',
    title: 'Kenarlıklar (Borders)',
    order: 5,
    category: 'CSS',
    description: 'Kenarlık stilleri, kalınlığı ve rengi.',
    detailedContent: 'Border özellikleri elementlere kenarlık ekler. Width, style ve color özelliklerini ayrı ayrı veya kısayol ile tanımlayabilirsiniz.',
    sections: [
      {
        title: 'Border Özellikleri',
        content: 'Kenarlık tanımlama:\n\nborder-width: 2px; (Kalınlık)\nborder-style: solid; (Stil)\nborder-color: red; (Renk)\n\nKısayol: border: 2px solid red;'
      },
      {
        title: 'Border Stilleri',
        content: 'border-style değerleri:\n• solid: Düz çizgi\n• dashed: Kesik çizgi\n• dotted: Noktalı\n• double: Çift çizgi\n• none: Kenarlık yok'
      },
      {
        title: 'Tek Taraf Border',
        content: 'Belirli tarafa kenarlık:\n\nborder-top: 1px solid blue;\nborder-right: 2px dashed red;\n\nborder-radius: 10px; // Yuvarlatma'
      }
    ],
    exampleCode: `/* Kenarlık Özellikleri */
div {
    border-width: 2px;
    border-style: solid;
    border-color: black;
}

/* Kısa Yol */
.box {
    border: 2px solid red;
}

/* Tek Taraf Kenarlık */
.card {
    border-top: 1px dashed blue;
    border-radius: 10px;
}`,
    challenge: {
      instructions: 'Tüm kenarlara 3px kalınlığında solid siyah kenarlık ekle.',
      starterCode: `div {
    ___BLANK1___: ___BLANK2___ ___BLANK3___ black;
}`,
      solution: `div {
    border: 3px solid black;
}`,
      blanks: ['border', '3px', 'solid']
    },
    xpReward: 10
  },

  // 6. Box Model
  {
    id: 'css-box-model',
    title: 'Kutu Modeli (Box Model)',
    order: 6,
    category: 'CSS',
    description: 'CSS kutu modeli: margin, padding, border ve content.',
    detailedContent: 'CSS Box Model, her elementin içerik, padding, border ve margin katmanlarından oluştuğunu gösterir. Toplam boyut hesabı bu katmanları içerir.',
    sections: [
      {
        title: 'Box Model Katmanları',
        content: 'İçten dışa doğru:\n1. Content: Gerçek içerik (width/height)\n2. Padding: İç boşluk\n3. Border: Kenarlık\n4. Margin: Dış boşluk\n\nToplam genişlik = width + padding + border + margin'
      },
      {
        title: 'Padding ve Margin',
        content: 'padding: İçerik ve border arası\nmargin: Border ve dış elementler arası\n\npadding: 10px 20px; (Top/Bottom, Left/Right)\nmargin: 10px 20px 30px 40px; (Top, Right, Bottom, Left)'
      },
      {
        title: 'Box-Sizing',
        content: 'box-sizing: content-box; (Varsayılan)\nbox-sizing: border-box; (Önerilen)\n\nborder-box ile width, padding ve border\'u içerir. Hesaplama kolay olur.'
      }
    ],
    exampleCode: `/* Kutu Modeli */
.box {
    /* İçerik alanı */
    width: 200px;
    height: 100px;
    
    /* İç boşluk */
    padding: 20px;
    
    /* Kenarlık */
    border: 2px solid black;
    
    /* Dış boşluk */
    margin: 10px;
}

/* Tek taraf için */
.element {
    padding-top: 10px;
    margin-left: 20px;
}`,
    challenge: {
      instructions: 'İç boşluğu 15px, dış boşluğu 10px yap.',
      starterCode: `div {
    ___BLANK1___: 15px;
    ___BLANK2___: 10px;
}`,
      solution: `div {
    padding: 15px;
    margin: 10px;
}`,
      blanks: ['padding', 'margin']
    },
    xpReward: 15
  },

  // 7. Width & Height
  {
    id: 'css-dimensions',
    title: 'Genişlik ve Yükseklik',
    order: 7,
    category: 'CSS',
    description: 'Element boyutları: width, height, max-width, min-height.',
    detailedContent: 'Width ve height özellikleri elementlerin boyutlarını belirler. Max ve min varyantları ile sınırlamalar getirilebilir.',
    sections: [
      {
        title: 'Temel Boyutlar',
        content: 'width: 200px; // Sabit genişlik\nheight: 100px; // Sabit yükseklik\n\nwidth: 50%; // Yuzdesel\nwidth: auto; // Otomatik (varsayılan)'
      },
      {
        title: 'Max ve Min',
        content: 'max-width: 960px; // Maksimum genişlik\nmin-width: 320px; // Minimum genişlik\n\nmax-height: 500px;\nmin-height: 200px;\n\nResponsive tasarım için önemli!'
      },
      {
        title: 'Görsel Boyutlama',
        content: 'img {\n  width: 100%;\n  height: auto; // Oran korunur\n}\n\nAuto height ile görseller bozulmaz.'
      }
    ],
    exampleCode: `/* Boyutlar */
.container {
    width: 80%;
    max-width: 1200px;
    min-width: 320px;
    height: 500px;
    min-height: 300px;
}

/* Auto değer */
img {
    width: 100%;
    height: auto;
}`,
    challenge: {
      instructions: 'Genişliği 100%, maksimum genişliği 960px yap.',
      starterCode: `div {
    ___BLANK1___: 100%;
    ___BLANK2___: 960px;
}`,
      solution: `div {
    width: 100%;
    max-width: 960px;
}`,
      blanks: ['width', 'max-width']
    },
    xpReward: 10
  },

  // 8. Outline
  {
    id: 'css-outline',
    title: 'Outline',
    order: 8,
    category: 'CSS',
    description: 'Outline özelliği - border\'dan farkı ve kullanımı.',
    detailedContent: 'Outline, border benzeridir ancak alan kaplamaz ve kutu modelinin dışındadır. Genellikle focus durumlarında kullanılır.',
    sections: [
      {
        title: 'Outline vs Border',
        content: 'Border: Alan kaplar, kutu modeline dahil\nOutline: Alan kaplamaz, layout etkilemez\n\noutline: 2px solid blue;\noutline-offset: 5px; // Uzaklık'
      },
      {
        title: 'Focus Outline',
        content: 'input:focus {\n  outline: 2px solid blue;\n}\n\nKeyboard navigasyonu için önemli! Erişilebilirlik (accessibility).'
      },
      {
        title: 'Outline Kaldırma',
        content: 'outline: none; // Kaldırma\n\nDikkat: Erişilebilirlik sorunları oluşturabilir! Eğer kaldırırsanız alternatif focus stili ekleyin.'
      }
    ],
    exampleCode: `/* Outline (Alan kaplamaz) */
button {
    outline: 2px solid blue;
    outline-offset: 5px;
}

/* Focus durumunda */
input:focus {
    outline: 3px solid green;
}

/* Outline kaldırma */
a {
    outline: none;
}`,
    challenge: {
      instructions: 'Input\'a focus olduğunda 2px solid orange outline ekle.',
      starterCode: `input:___BLANK1___ {
    ___BLANK2___: 2px ___BLANK3___ orange;
}`,
      solution: `input:focus {
    outline: 2px solid orange;
}`,
      blanks: ['focus', 'outline', 'solid']
    },
    xpReward: 10
  },

  // 9. Link Styles
  {
    id: 'css-links',
    title: 'Link Stilleri',
    order: 9,
    category: 'CSS',
    description: 'Link durumları: link, visited, hover, active.',
    detailedContent: 'Link pseudo-class\'ları ile linklerin farklı durumları için stil tanımlanır. Doğru sıralama önemlidir: LVHA (Link, Visited, Hover, Active).',
    sections: [
      {
        title: 'Link Durumları',
        content: 'a:link - Ziyaret edilmemiş\na:visited - Ziyaret edilmiş\na:hover - Mouse üzerinde\na:active - Tıklanıyor\n\nSıralama önemli: LVHA!'
      },
      {
        title: 'Link Stillendirme',
        content: 'a {\n  color: blue;\n  text-decoration: none; // Alt çizgi kaldır\n}\n\na:hover {\n  text-decoration: underline;\n  color: red;\n}'
      },
      {
        title: 'Modern Link Stilleri',
        content: 'a {\n  transition: color 0.3s;\n  border-bottom: 2px solid transparent;\n}\n\na:hover {\n  border-bottom-color: currentColor;\n}'
      }
    ],
    exampleCode: `/* Link Durumları */
a:link {
    color: blue;
    text-decoration: none;
}

a:visited {
    color: purple;
}

a:hover {
    color: red;
    text-decoration: underline;
}

a:active {
    color: orange;
}`,
    challenge: {
      instructions: 'Hover durumunda linki kırmızı yap ve alt çizgi ekle.',
      starterCode: `a:___BLANK1___ {
    color: ___BLANK2___;
    text-decoration: ___BLANK3___;
}`,
      solution: `a:hover {
    color: red;
    text-decoration: underline;
}`,
      blanks: ['hover', 'red', 'underline']
    },
    xpReward: 10
  },

  // 10. List Styling
  {
    id: 'css-lists',
    title: 'Listeleri Şekillendirme',
    order: 10,
    category: 'CSS',
    description: 'Liste işaretçileri ve stil özellikleri.',
    detailedContent: 'CSS ile listeleri özelleştirerek daha şık ve kullanışlı görünümler elde edebilirsiniz. Liste işaretçilerini değiştirme, kaldırma ve konumlandırma işlemlerini öğrenin.',
    sections: [
      {
        title: 'Liste Tipleri',
        content: '• list-style-type: İşaretçi tipini belirler\n• ul için: disc, circle, square, none\n• ol için: decimal, lower-alpha, upper-roman\n\nÖrnek: list-style-type: circle;'
      },
      {
        title: 'Liste Pozisyonu',
        content: '• list-style-position: inside - İşaretçi içeride\n• list-style-position: outside - İşaretçi dışarıda (varsayılan)\n\nÖrnek: list-style-position: inside;'
      },
      {
        title: 'İşaretçileri Kaldırma',
        content: '• list-style: none - Tüm işaretçileri kaldırır\n• Menüler ve navigasyon için idealdir\n• Padding: 0 eklemeyi unutmayın\n\nÖrnek: .menu { list-style: none; padding: 0; }'
      }
    ],
    exampleCode: `/* Liste Stilleri */
ul {
    list-style-type: circle;
    list-style-position: inside;
}

ol {
    list-style-type: upper-roman;
}

/* İşaretçi kaldırma */
.menu {
    list-style: none;
    padding: 0;
}`,
    challenge: {
      instructions: 'Liste işaretçisini kare (square) yap.',
      starterCode: `ul {
    ___BLANK1___: ___BLANK2___;
}`,
      solution: `ul {
    list-style-type: square;
}`,
      blanks: ['list-style-type', 'square']
    },
    xpReward: 10
  },

  // 11. Display Property
  {
    id: 'css-display',
    title: 'Display Özelliği',
    order: 11,
    category: 'CSS',
    description: 'Display özellikleri: block, inline, inline-block, none.',
    detailedContent: 'Display özelliği, HTML elementlerinin sayfa üzerinde nasıl görüntüleneceğini belirler. Bu özellik, layout tasarımının temel taşıdır.',
    sections: [
      {
        title: 'Block Elementler',
        content: '• Tüm genişliği kaplar\n• Yeni satırda başlar\n• Width ve height verilebilir\n• Örnekler: <div>, <p>, <h1>\n\nÖrnek: display: block;'
      },
      {
        title: 'Inline Elementler',
        content: '• Sadece içeriği kadar yer kaplar\n• Yan yana dizilir\n• Width ve height verilemez\n• Örnekler: <span>, <a>, <strong>\n\nÖrnek: display: inline;'
      },
      {
        title: 'Inline-Block ve None',
        content: '• inline-block: İkisinin karışımı, yan yana + boyutlandırılabilir\n• none: Elementi tamamen gizler (DOM\'dan kaldırmaz)\n• visibility: hidden alternatifi (yer kaplar)\n\nÖrnek: display: inline-block;'
      }
    ],
    exampleCode: `/* Block - Tüm genişliği kaplar */
div {
    display: block;
}

/* Inline - Yan yana dizilir */
span {
    display: inline;
}

/* Inline-block - İkisinin karışımı */
.box {
    display: inline-block;
    width: 100px;
}

/* Gizleme */
.hidden {
    display: none;
}`,
    challenge: {
      instructions: 'Elementi inline-block yap.',
      starterCode: `.element {
    ___BLANK1___: ___BLANK2___;
}`,
      solution: `.element {
    display: inline-block;
}`,
      blanks: ['display', 'inline-block']
    },
    xpReward: 15
  },

  // 12. Position
  {
    id: 'css-position',
    title: 'Pozisyonlama',
    order: 12,
    category: 'CSS',
    description: 'Position özellikleri: static, relative, absolute, fixed, sticky.',
    detailedContent: 'Position özelliği, elementlerin sayfadaki konumlarını hassas şekilde kontrol etmenizi sağlar. Farklı position değerleri farklı davranışlar sergiler.',
    sections: [
      {
        title: 'Static ve Relative',
        content: '• static: Varsayılan, normal akış\n• relative: Kendi konumuna göre ötelenebilir\n• top, right, bottom, left ile hareket ettirilir\n• Diğer elementleri etkilemez\n\nÖrnek: position: relative; top: 10px;'
      },
      {
        title: 'Absolute Positioning',
        content: '• Akıştan çıkar, en yakın positioned parent\'a göre konumlanır\n• Parent position: relative olmalı\n• Tam kontrol sağlar\n• Diğer elementler üstüne çıkabilir\n\nÖrnek: position: absolute; top: 0; right: 0;'
      },
      {
        title: 'Fixed ve Sticky',
        content: '• fixed: Ekrana sabitlenir, scroll etmez\n• sticky: Scroll edilene kadar normal, sonra sabit\n• Header ve navbar için idealdir\n• Z-index ile katman kontrolü\n\nÖrnek: position: fixed; bottom: 20px;'
      }
    ],
    exampleCode: `/* Relative - Kendi konumuna göre */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

/* Absolute - Parent\'a göre */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}

/* Fixed - Ekrana sabitlenir */
.fixed {
    position: fixed;
    bottom: 20px;
}`,
    challenge: {
      instructions: 'Elementi absolute konumla ve sağ üst köşeye yerleştir.',
      starterCode: `.box {
    ___BLANK1___: absolute;
    ___BLANK2___: 0;
    ___BLANK3___: 0;
}`,
      solution: `.box {
    position: absolute;
    top: 0;
    right: 0;
}`,
      blanks: ['position', 'top', 'right']
    },
    xpReward: 15
  },

  // 13. Z-Index
  {
    id: 'css-zindex',
    title: 'Z-Index',
    order: 13,
    category: 'CSS',
    description: 'Z-index ile elementlerin katman sırasını belirleme.',
    detailedContent: 'Z-index, elementlerin üst üste binme sırasını kontrol eder. Bu özellik sayesinde hangi elementin önde görüneceğini belirleyebilirsiniz.',
    sections: [
      {
        title: 'Z-Index Temelleri',
        content: '• Değer: Herhangi bir tamsayı (negatif de olabilir)\n• Yüksek değer = Önde görünür\n• Varsayılan: auto (0 gibi davranır)\n• Position: static olmayan elementlerde çalışır\n\nÖrnek: z-index: 10;'
      },
      {
        title: 'Katman Yönetimi',
        content: '• Modal pencereler için yüksek değerler (999, 9999)\n• Tooltip ve dropdown için orta değerler (100-500)\n• Arka plan elementleri için düşük değerler\n• Negatif değerler arka plana iter\n\nÖrnek: z-index: 999; /* En üstte */'
      },
      {
        title: 'Stacking Context',
        content: '• Her positioned element yeni stacking context oluşturabilir\n• Parent z-index, child\'ları etkiler\n• Kardeş elementler kendi aralarında karşılaştırılır\n• opacity, transform gibi özellikler de context oluşturur'
      }
    ],
    exampleCode: `/* Z-index kullanımı */
.back {
    position: relative;
    z-index: 1;
}

.middle {
    position: absolute;
    z-index: 2;
}

.front {
    position: fixed;
    z-index: 999;
}`,
    challenge: {
      instructions: 'Elementi en üste çıkarmak için z-index 10 ver.',
      starterCode: `.top {
    position: relative;
    ___BLANK1___: ___BLANK2___;
}`,
      solution: `.top {
    position: relative;
    z-index: 10;
}`,
      blanks: ['z-index', '10']
    },
    xpReward: 10
  },

  // 14. Overflow
  {
    id: 'css-overflow',
    title: 'Overflow',
    order: 14,
    category: 'CSS',
    description: 'Taşan içeriği kontrol etme: visible, hidden, scroll, auto.',
    detailedContent: 'Overflow özelliği, bir elementin boyutunu aşan içeriğin nasıl görüntüleneceğini kontrol eder. Bu, layout sorunlarını çözmek için kritik öneme sahiptir.',
    sections: [
      {
        title: 'Overflow Değerleri',
        content: '• visible: Taşan içerik görünür (varsayılan)\n• hidden: Taşan içerik gizlenir\n• scroll: Her zaman scrollbar gösterir\n• auto: Gerekirse scrollbar gösterir\n\nÖrnek: overflow: hidden;'
      },
      {
        title: 'Overflow-X ve Overflow-Y',
        content: '• overflow-x: Yatay taşmayı kontrol eder\n• overflow-y: Dikey taşmayı kontrol eder\n• Ayrı ayrı ayarlanabilir\n\nÖrnek: overflow-x: hidden; overflow-y: auto;'
      },
      {
        title: 'Kullanım Senaryoları',
        content: '• Card içerikleri için auto\n• Image container için hidden\n• Uzun metin listeleri için scroll\n• clearfix tekniğinde overflow: auto\n\nÖrnek: .card { max-height: 300px; overflow: auto; }'
      }
    ],
    exampleCode: `/* Overflow Özellikleri */
.visible {
    overflow: visible; /* Varsayılan */
}

.hidden {
    overflow: hidden; /* Taşanı gizle */
}

.scroll {
    overflow: scroll; /* Her zaman scroll */
}

.auto {
    overflow: auto; /* Gerekirse scroll */
}`,
    challenge: {
      instructions: 'Taşan içeriği gizle.',
      starterCode: `div {
    ___BLANK1___: ___BLANK2___;
}`,
      solution: `div {
    overflow: hidden;
}`,
      blanks: ['overflow', 'hidden']
    },
    xpReward: 10
  },

  // 15. Float & Clear
  {
    id: 'css-float',
    title: 'Float ve Clear',
    order: 15,
    category: 'CSS',
    description: 'Float ile elementleri sola/sağa yasla, clear ile float\'u temizle.',
    detailedContent: 'Float, elementlerin yatay olarak hizalanmasını sağlar. Özellikle resim yanında metin akışı ve çok kolonlu layout\'lar için kullanılır.',
    sections: [
      {
        title: 'Float Kullanımı',
        content: '• float: left - Sola yasla\n• float: right - Sağa yasla\n• float: none - Float iptal\n• Element akıştan çıkar, diğerleri etrafına akıtar\n\nÖrnek: img { float: left; margin-right: 10px; }'
      },
      {
        title: 'Clear Özelliği',
        content: '• clear: left - Sol float\'u temizle\n• clear: right - Sağ float\'u temizle\n• clear: both - Her iki tarafı temizle\n• Float\'tan sonraki elementi normal akışa döndürür\n\nÖrnek: .footer { clear: both; }'
      },
      {
        title: 'Clearfix Tekniği',
        content: '• Parent\'ta collapse sorununu çözer\n• ::after pseudo-element kullanır\n• Modern layout\'larda Flexbox tercih edilir\n\nÖrnek: .clearfix::after { content: ""; display: table; clear: both; }'
      }
    ],
    exampleCode: `/* Float */
img {
    float: left;
    margin-right: 10px;
}

.sidebar {
    float: right;
    width: 30%;
}

/* Clear */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}`,
    challenge: {
      instructions: 'Resmi sola yasla ve 15px sağ margin ekle.',
      starterCode: `img {
    ___BLANK1___: left;
    ___BLANK2___: 15px;
}`,
      solution: `img {
    float: left;
    margin-right: 15px;
}`,
      blanks: ['float', 'margin-right']
    },
    xpReward: 10
  },

  // 16. Flexbox Basics
  {
    id: 'css-flexbox-basics',
    title: 'Flexbox Temelleri',
    order: 16,
    category: 'CSS',
    description: 'Flexbox düzeni: display flex, flex-direction, flex-wrap.',
    detailedContent: 'Flexbox, modern ve güçlü bir layout sistemidir. Elementleri esnek bir şekilde hizalamanızı, dağıtmanızı ve sıralamanızı sağlar.',
    sections: [
      {
        title: 'Flex Container',
        content: '• display: flex - Container\'a uygula\n• Child elementler flex item olur\n• Tek boyutlu layout (satır veya sütun)\n• Alignment ve spacing kolaylaşır\n\nÖrnek: .container { display: flex; }'
      },
      {
        title: 'Flex Direction',
        content: '• row: Yatay sıralama (varsayılan)\n• column: Dikey sıralama\n• row-reverse: Ters yatay\n• column-reverse: Ters dikey\n\nÖrnek: flex-direction: column;'
      },
      {
        title: 'Flex Wrap ve Item',
        content: '• flex-wrap: wrap - Taşanlar alta geçer\n• flex-wrap: nowrap - Tek satırda sıkışır\n• flex: 1 - Item genişleyebilir\n• flex: 0 - Sabit boyut\n\nÖrnek: .item { flex: 1; }'
      }
    ],
    exampleCode: `/* Flexbox Container */
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

/* Flex-direction */
.column {
    display: flex;
    flex-direction: column;
}

/* Flex items */
.item {
    flex: 1;
}`,
    challenge: {
      instructions: 'Container\'ı flex yap ve column yönünde sırala.',
      starterCode: `.container {
    ___BLANK1___: flex;
    ___BLANK2___: ___BLANK3___;
}`,
      solution: `.container {
    display: flex;
    flex-direction: column;
}`,
      blanks: ['display', 'flex-direction', 'column']
    },
    xpReward: 15
  },

  // 17. Flexbox Alignment
  {
    id: 'css-flexbox-align',
    title: 'Flexbox Hizalama',
    order: 17,
    category: 'CSS',
    description: 'Justify-content, align-items, align-self özellikleri.',
    detailedContent: 'Flexbox hizalama özellikleri, elementleri container içinde tam olarak istediğiniz yere konumlandırmanızı sağlar. Yatay ve dikey hizalama artık çok kolay!',
    sections: [
      {
        title: 'Justify-Content (Ana Eksen)',
        content: '• flex-start: Başta hizala\n• center: Ortada hizala\n• flex-end: Sonda hizala\n• space-between: Arada eşit boşluk\n• space-around: Etrafında eşit boşluk\n\nÖrnek: justify-content: center;'
      },
      {
        title: 'Align-Items (Karşı Eksen)',
        content: '• flex-start: Üste/Sola hizala\n• center: Ortada hizala\n• flex-end: Alta/Sağa hizala\n• stretch: Tamamen gerin (varsayılan)\n• baseline: Metin tabanına göre\n\nÖrnek: align-items: center;'
      },
      {
        title: 'Mükemmel Ortalama',
        content: '• justify-content + align-items = center\n• Hem yatay hem dikey ortalar\n• align-self: Tek item için farklı hizalama\n• gap: Item\'lar arası boşluk\n\nÖrnek: display: flex; justify-content: center; align-items: center;'
      }
    ],
    exampleCode: `/* Yatay Hizalama */
.container {
    display: flex;
    justify-content: center;
    /* space-between, space-around */
}

/* Dikey Hizalama */
.box {
    display: flex;
    align-items: center;
    /* flex-start, flex-end, stretch */
}

/* Ortada hizalama */
.centered {
    display: flex;
    justify-content: center;
    align-items: center;
}`,
    challenge: {
      instructions: 'İçeriği yatayda ve dikeyde ortala.',
      starterCode: `.center {
    display: flex;
    ___BLANK1___: center;
    ___BLANK2___: center;
}`,
      solution: `.center {
    display: flex;
    justify-content: center;
    align-items: center;
}`,
      blanks: ['justify-content', 'align-items']
    },
    xpReward: 15
  },

  // 18. CSS Grid Intro
  {
    id: 'css-grid-intro',
    title: 'Grid Sistemine Giriş',
    order: 18,
    category: 'CSS',
    description: 'CSS Grid düzeni: display grid, grid-template-columns/rows.',
    detailedContent: 'CSS Grid, iki boyutlu layout sistemidir. Satır ve sütunlarla karışık layout\'lar oluşturmak hiç bu kadar kolay olmamıştı!',
    sections: [
      {
        title: 'Grid Container',
        content: '• display: grid - Container\'a uygula\n• İki boyutlu layout (satır + sütun)\n• Flexbox\'tan daha güçlü karışık layout\'lar için\n• Child elementler grid item olur\n\nÖrnek: .container { display: grid; }'
      },
      {
        title: 'Grid Template',
        content: '• grid-template-columns: Sütun genişlikleri\n• grid-template-rows: Satır yükseklikleri\n• fr birimi: Esnekliği temsil eder\n• repeat(): Tekrar eden değerler için\n\nÖrnek: grid-template-columns: 1fr 2fr 1fr;'
      },
      {
        title: 'Gap (Boşluk)',
        content: '• gap: Item\'lar arasında boşluk\n• row-gap: Satırlar arası\n• column-gap: Sütunlar arası\n• Margin\'e gerek kalmaz\n\nÖrnek: gap: 20px; veya gap: 10px 20px;'
      }
    ],
    exampleCode: `/* Grid Container */
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 200px;
    gap: 10px;
}

/* 3 eşit kolon */
.three-cols {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}`,
    challenge: {
      instructions: '2 kolonlu grid oluştur ve 20px gap ekle.',
      starterCode: `.grid {
    ___BLANK1___: grid;
    ___BLANK2___: 1fr 1fr;
    ___BLANK3___: 20px;
}`,
      solution: `.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}`,
      blanks: ['display', 'grid-template-columns', 'gap']
    },
    xpReward: 15
  },

  // 19. Grid Layout
  {
    id: 'css-grid-layout',
    title: 'Grid Layout Oluşturma',
    order: 19,
    category: 'CSS',
    description: 'Grid-column, grid-row ile layout düzenleme.',
    detailedContent: 'Grid item\'larını istediğiniz hücrelere yerleştirerek karışık layout\'lar oluşturun. Bir element birden fazla satır veya sütun kaplayabilir!',
    sections: [
      {
        title: 'Grid Column',
        content: '• grid-column: Başlangıç / Bitiş\n• Sütunları kaplama\n• span anahtar kelimesi: Kaç sütun kaplayacağı\n• Örnek: grid-column: 1 / 3 veya grid-column: span 2\n\nÖrnek: .header { grid-column: 1 / 4; }'
      },
      {
        title: 'Grid Row',
        content: '• grid-row: Başlangıç / Bitiş\n• Satırları kaplama\n• Dikey genişleme\n• span ile kolay kullanım\n\nÖrnek: .sidebar { grid-row: 2 / 4; }'
      },
      {
        title: 'Karışık Layout\'lar',
        content: '• Header: Tüm genliği kaplayan\n• Sidebar: Çok satırlı\n• Main content: Geniş alan\n• Footer: Altta tam genişlik\n\nÖrnek: .content { grid-column: 2 / 4; grid-row: 2 / 3; }'
      }
    ],
    exampleCode: `/* Grid Layout */
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
}

/* Element yerleştirme */
.header {
    grid-column: 1 / 4; /* 3 kolonu kapla */
}

.sidebar {
    grid-column: 1 / 2;
    grid-row: 2 / 4;
}`,
    challenge: {
      instructions: 'Header\'ı tüm kolonlara yaydır (1\'den 4\'e).',
      starterCode: `.header {
    ___BLANK1___: ___BLANK2___ / ___BLANK3___;
}`,
      solution: `.header {
    grid-column: 1 / 4;
}`,
      blanks: ['grid-column', '1', '4']
    },
    xpReward: 15
  },

  // 20. Media Queries
  {
    id: 'css-media-queries',
    title: 'Medya Sorguları (Responsive)',
    order: 20,
    category: 'CSS',
    description: 'Responsive tasarım için medya sorguları.',
    detailedContent: 'Media queries, farklı ekran boyutlarına göre farklı stiller uygulamayı sağlar. Responsive (duyarlı) web tasarımının temelidir.',
    sections: [
      {
        title: 'Media Query Yapısı',
        content: '• @media (koşul) { stiller }\n• min-width: Minimum genişlik\n• max-width: Maksimum genişlik\n• Mobil first yaklaşımı tercih edilir\n\nÖrnek: @media (min-width: 768px) { ... }'
      },
      {
        title: 'Breakpoint\'ler',
        content: '• Mobil: < 768px\n• Tablet: 768px - 1024px\n• Desktop: > 1024px\n• Large Desktop: > 1440px\n• Projeye göre özelleştirilebilir\n\nÖrnek: @media (min-width: 1024px) { ... }'
      },
      {
        title: 'Responsive Stratejiler',
        content: '• Mobile First: Küçükten büyüğe (min-width)\n• Desktop First: Büyükten küçüğe (max-width)\n• Orientation: portrait / landscape\n• print: Yazdırma stilleri\n\nÖrnek: @media (orientation: landscape) { ... }'
      }
    ],
    exampleCode: `/* Mobil First */
.container {
    width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        width: 750px;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        width: 960px;
    }
}`,
    challenge: {
      instructions: '768px\'den büyük ekranlarda genişliği 700px yap.',
      starterCode: `@media (___BLANK1___: 768px) {
    .box {
        ___BLANK2___: ___BLANK3___;
    }
}`,
      solution: `@media (min-width: 768px) {
    .box {
        width: 700px;
    }
}`,
      blanks: ['min-width', 'width', '700px']
    },
    xpReward: 20
  },

  // 21. Pseudo-classes
  {
    id: 'css-pseudo-classes',
    title: 'Sözde Sınıflar (:hover, :active)',
    order: 21,
    category: 'CSS',
    description: 'Pseudo-class seçiciler: hover, active, focus, first-child.',
    detailedContent: 'Pseudo-class\'lar, elementlerin belirli durumlarına göre stil uygulamayı sağlar. Kullanıcı etkileşimlerini ve yapısal konumları hedefleyebilirsiniz.',
    sections: [
      {
        title: 'Etkileşim Pseudo-class\'ları',
        content: '• :hover - Fare üzerindeyken\n• :active - Tıklanırkenn• :focus - Focus durumunda\n• :visited - Ziyaret edilmiş link\n\nÖrnek: button:hover { background: blue; }'
      },
      {
        title: 'Yapısal Pseudo-class\'lar',
        content: '• :first-child - İlk çocuk\n• :last-child - Son çocuk\n• :nth-child(n) - n. çocuk\n• :nth-child(odd/even) - Tek/Çift\n• :not() - Hariç tut\n\nÖrnek: li:nth-child(2n) { background: #f0f0f0; }'
      },
      {
        title: 'Form Pseudo-class\'ları',
        content: '• :checked - Seçili checkbox/radio\n• :disabled - Devre dışı\n• :enabled - Aktif\n• :valid/:invalid - Geçerlilik durumu\n\nÖrnek: input:focus { border-color: blue; }'
      }
    ],
    exampleCode: `/* Hover */
button:hover {
    background: blue;
}

/* Active */
button:active {
    transform: scale(0.95);
}

/* First/Last Child */
li:first-child {
    font-weight: bold;
}

li:last-child {
    border: none;
}`,
    challenge: {
      instructions: 'Hover durumunda arka planı gri (#ddd) yap.',
      starterCode: `.btn:___BLANK1___ {
    ___BLANK2___: ___BLANK3___;
}`,
      solution: `.btn:hover {
    background: #ddd;
}`,
      blanks: ['hover', 'background', '#ddd']
    },
    xpReward: 15
  },

  // 22. Pseudo-elements
  {
    id: 'css-pseudo-elements',
    title: 'Sözde Elementler (::before, ::after)',
    order: 22,
    category: 'CSS',
    description: 'Pseudo-element\'ler ile içerik ekleme ve süsleme.',
    detailedContent: 'Pseudo-element\'ler, HTML\'e dokunmadan CSS ile sanal elementler oluşturmanızı sağlar. Dekoratif içerikler ve efektler için mükemmeldir.',
    sections: [
      {
        title: '::before ve ::after',
        content: '• ::before - Elementin başına içerik ekler\n• ::after - Elementin sonuna içerik ekler\n• content: "" zorunludur\n• Inline element gibi davranır\n\nÖrnek: .quote::before { content: "“"; }'
      },
      {
        title: 'Content Özelliği',
        content: '• content: "metin" - Metin ekle\n• content: "" - Boş (stillendirme için)\n• content: url() - Resim ekle\n• content: attr() - HTML attribute değeri\n\nÖrnek: a::after { content: " →"; }'
      },
      {
        title: 'Kullanım Alanları',
        content: '• Icon ve sembol ekleme\n• Clearfix tekniği\n• Dekoratif çizgiler ve şekiller\n• Tooltip ok işaretleri\n• Badge ve counter\n\nÖrnek: .badge::after { content: "99+"; }'
      }
    ],
    exampleCode: `/* Before */
.quote::before {
    content: '"';
    font-size: 2em;
    color: gray;
}

/* After */
.quote::after {
    content: '"';
    font-size: 2em;
}

/* Icon ekleme */
.link::before {
    content: "→ ";
}`,
    challenge: {
      instructions: 'Element\'in önüne "★" işareti ekle.',
      starterCode: `.star___BLANK1___ {
    ___BLANK2___: "___BLANK3___";
}`,
      solution: `.star::before {
    content: "★";
}`,
      blanks: ['::before', 'content', '★']
    },
    xpReward: 15
  },

  // 23. Opacity
  {
    id: 'css-opacity',
    title: 'Opacity (Şeffaflık)',
    order: 23,
    category: 'CSS',
    description: 'Opacity ile element şeffaflığı ayarlama.',
    detailedContent: 'Opacity, bir elementin şeffaflık/matluk derecesini kontrol eder. 0 (tamamen şeffaf) ile 1 (tamamen opak) arasında değer alır.',
    sections: [
      {
        title: 'Opacity Değerleri',
        content: '• 0: Tamamen görünmez (ama yer kaplar)\n• 0.5: Yarı şeffaf\n• 1: Tamamen opak (varsayılan)\n• Element ve tüm child\'ları etkilenir\n\nÖrnek: .overlay { opacity: 0.7; }'
      },
      {
        title: 'Opacity vs RGBA',
        content: '• opacity: Tüm elementi etkiler\n• rgba(): Sadece rengi etkiler\n• rgba(255, 0, 0, 0.5): Kırmızı %50 şeffaf\n• Child elementler etkilenmez\n\nÖrnek: background: rgba(0, 0, 0, 0.5);'
      },
      {
        title: 'Animasyon ve Geçiş',
        content: '• Hover efektlerinde popüler\n• Fade in/out animasyonları\n• transition ile pürüz yap\n• Modal overlay arka planları\n\nÖrnek: img { opacity: 1; transition: opacity 0.3s; }\nimg:hover { opacity: 0.7; }'
      }
    ],
    exampleCode: `/* Opacity */
.transparent {
    opacity: 0.5; /* 0 ile 1 arası */
}

/* Hover\'da opacity */
img {
    opacity: 1;
    transition: opacity 0.3s;
}

img:hover {
    opacity: 0.7;
}`,
    challenge: {
      instructions: 'Hover durumunda opacity\'yi 0.8 yap.',
      starterCode: `.image:___BLANK1___ {
    ___BLANK2___: ___BLANK3___;
}`,
      solution: `.image:hover {
    opacity: 0.8;
}`,
      blanks: ['hover', 'opacity', '0.8']
    },
    xpReward: 10
  },

  // 24. Box Shadow
  {
    id: 'css-shadow',
    title: 'Gölgeler (Box-shadow)',
    order: 24,
    category: 'CSS',
    description: 'Box-shadow ile element gölgeleri oluşturma.',
    detailedContent: 'Box-shadow, elementlere derinlik kazandıran gölge efektleri ekler. Modern ve şık tasarımların vazgeçilmez bir parçasıdır.',
    sections: [
      {
        title: 'Gölge Sözdizimi',
        content: '• box-shadow: x y blur spread color;\n• x: Yatay ofset (pozitif = sağ)\n• y: Dikey ofset (pozitif = aşağı)\n• blur: Buluğanlık\n• spread: Yayılma (opsiyonel)\n\nÖrnek: box-shadow: 5px 5px 10px rgba(0,0,0,0.3);'
      },
      {
        title: 'Çoklu Gölgeler',
        content: '• Virgülle ayırarak birden fazla gölge\n• Katmanlı efektler\n• Daha gerçekçi görünüm\n\nÖrnek: box-shadow: \n  0 2px 4px rgba(0,0,0,0.2),\n  0 8px 16px rgba(0,0,0,0.1);'
      },
      {
        title: 'İç Gölge ve Efektler',
        content: '• inset: İç gölge oluşturur\n• Basık/oyuk efekt\n• text-shadow: Metin gölgesi\n• Hover\'da gölge değişimi\n\nÖrnek: box-shadow: inset 0 0 10px rgba(0,0,0,0.5);'
      }
    ],
    exampleCode: `/* Temel Gölge */
.card {
    box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
}

/* Çoklu Gölge */
.button {
    box-shadow: 
        0 2px 4px rgba(0,0,0,0.2),
        0 4px 8px rgba(0,0,0,0.1);
}

/* İç Gölge */
.inset {
    box-shadow: inset 0 0 10px #ccc;
}`,
    challenge: {
      instructions: '10px yatay, 10px dikey, 20px blur gölge ekle.',
      starterCode: `.box {
    ___BLANK1___: ___BLANK2___ ___BLANK3___ 20px rgba(0,0,0,0.5);
}`,
      solution: `.box {
    box-shadow: 10px 10px 20px rgba(0,0,0,0.5);
}`,
      blanks: ['box-shadow', '10px', '10px']
    },
    xpReward: 15
  },

  // 25. Transitions
  {
    id: 'css-transitions',
    title: 'Geçişler (Transitions)',
    order: 25,
    category: 'CSS',
    description: 'CSS transition ile animasyonlu geçişler.',
    detailedContent: 'Transition, CSS özelliklerinin değişimlerini pürüzsüz animasyonlarla gösterir. Hover, focus gibi durum değişikliklerinde mükemmel çalışır.',
    sections: [
      {
        title: 'Transition Özellikleri',
        content: '• transition-property: Hangi özellik animasyon yapacak\n• transition-duration: Süre (0.3s, 500ms)\n• transition-timing-function: Zamanlama (ease, linear)\n• transition-delay: Gecikme\n\nÖrnek: transition: background 0.3s ease;'
      },
      {
        title: 'Timing Functions',
        content: '• ease: Yavaş başla, hızlan, yavaşla (varsayılan)\n• linear: Sabit hız\n• ease-in: Yavaş başla\n• ease-out: Yavaş bitir\n• cubic-bezier(): Özel eğri\n\nÖrnek: transition: all 0.3s ease-in-out;'
      },
      {
        title: 'Çoklu Transition',
        content: '• Farklı özellikler için farklı süreler\n• Virgülle ayır\n• all: Tüm özellikler\n\nÖrnek: transition: \n  width 0.3s ease,\n  height 0.5s ease,\n  transform 0.2s;'
      }
    ],
    exampleCode: `/* Transition Özellikleri */
button {
    background: blue;
    transition: background 0.3s ease;
}

button:hover {
    background: red;
}

/* Çoklu Transition */
.box {
    transition: 
        width 0.3s,
        height 0.3s,
        transform 0.5s;
}`,
    challenge: {
      instructions: 'Background rengine 0.5s geçiş efekti ekle.',
      starterCode: `.btn {
    ___BLANK1___: ___BLANK2___ ___BLANK3___;
}`,
      solution: `.btn {
    transition: background 0.5s;
}`,
      blanks: ['transition', 'background', '0.5s']
    },
    xpReward: 15
  },

  // 26. Animations
  {
    id: 'css-animations',
    title: 'Animasyonlar (@keyframes)',
    order: 26,
    category: 'CSS',
    description: 'Keyframes ile CSS animasyonları oluşturma.',
    detailedContent: '@keyframes ile karışık, çok adımlı animasyonlar oluşturun. Transition\'dan daha güçlü ve esnek bir animasyon sistemidir.',
    sections: [
      {
        title: 'Keyframes Tanımlama',
        content: '• @keyframes ad { ... }\n• from {} to {}: 2 adımlı\n• 0% {} 50% {} 100% {}: Çok adımlı\n• Her adımda farklı stiller\n\nÖrnek: @keyframes slide {\n  from { left: 0; }\n  to { left: 100px; }\n}'
      },
      {
        title: 'Animation Özellikleri',
        content: '• animation-name: Keyframe adı\n• animation-duration: Süre\n• animation-iteration-count: Tekrar (infinite)\n• animation-direction: Yön (reverse, alternate)\n• animation-timing-function: Zamanlama\n\nÖrnek: animation: slide 2s infinite;'
      },
      {
        title: 'Gelişmiş Animasyonlar',
        content: '• animation-delay: Gecikme\n• animation-fill-mode: Bitiş durumu (forwards, backwards)\n• animation-play-state: Duraklat/Devam (paused/running)\n• Çoklu animasyon uygulama\n\nÖrnek: animation: fade 1s ease-in forwards;'
      }
    ],
    exampleCode: `/* Keyframes tanımlama */
@keyframes slide {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100px);
    }
}

/* Animasyon uygulama */
.box {
    animation: slide 2s infinite;
}`,
    challenge: {
      instructions: 'Fade animasyonu oluştur (opacity 0\'dan 1\'e).',
      starterCode: `@___BLANK1___ fade {
    from { ___BLANK2___: 0; }
    to { ___BLANK2___: ___BLANK3___; }
}`,
      solution: `@keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
}`,
      blanks: ['keyframes', 'opacity', '1']
    },
    xpReward: 20
  },

  // 27. Transform
  {
    id: 'css-transform',
    title: 'Transform (Döndürme, Ölçekleme)',
    order: 27,
    category: 'CSS',
    description: 'Transform özellikleri: rotate, scale, translate, skew.',
    detailedContent: 'Transform, elementleri döndürme, ölçekleme, kaydırma ve eğme gibi 2D/3D dönüşümler yapmanızı sağlar. Performanslı animasyonlar için idealdir.',
    sections: [
      {
        title: 'Temel Transform Fonksiyonları',
        content: '• rotate(45deg): Döndürme\n• scale(2): Ölçekleme (2 kat büyüt)\n• translate(50px, 100px): Kaydırma\n• skew(10deg): Eğme\n\nÖrnek: transform: rotate(45deg);'
      },
      {
        title: 'Çoklu Transform',
        content: '• Boşlukla ayırarak birleştirin\n• Sıra önemlidir!\n• scaleX, scaleY: Tek eksen\n• translateX, translateY: Tek eksen\n\nÖrnek: transform: rotate(45deg) scale(1.5) translate(20px, 30px);'
      },
      {
        title: '3D Transform',
        content: '• rotateX, rotateY, rotateZ: 3D döndürme\n• translateZ: Derinlik\n• perspective: 3D perspektif\n• transform-origin: Dönüşüm merkezi\n\nÖrnek: transform: perspective(500px) rotateY(45deg);'
      }
    ],
    exampleCode: `/* Döndürme */
.rotate {
    transform: rotate(45deg);
}

/* Ölçekleme */
.scale {
    transform: scale(1.5);
}

/* Kaydırma */
.translate {
    transform: translate(50px, 100px);
}

/* Çoklu Transform */
.combo {
    transform: rotate(45deg) scale(1.2);
}`,
    challenge: {
      instructions: 'Elementi 2 kat büyüt (scale).',
      starterCode: `.big {
    ___BLANK1___: ___BLANK2___(___BLANK3___);
}`,
      solution: `.big {
    transform: scale(2);
}`,
      blanks: ['transform', 'scale', '2']
    },
    xpReward: 15
  },

  // 28. CSS Variables
  {
    id: 'css-variables',
    title: 'CSS Değişkenleri',
    order: 28,
    category: 'CSS',
    description: 'Custom properties (CSS variables) kullanımı.',
    detailedContent: 'CSS değişkenleri (Custom Properties), tekrar eden değerleri merkezi olarak tanımlamanızı ve yönetmenizi sağlar. Tema sistemi için mükemmeldir.',
    sections: [
      {
        title: 'Değişken Tanımlama',
        content: '• :root { } içinde global tanım\n• -- ile başlar (iki tire)\n• --primary-color: #3498db;\n• Büyük-küçük harf duyarlı\n\nÖrnek: :root {\n  --main-color: #ff0000;\n  --spacing: 16px;\n}'
      },
      {
        title: 'Değişken Kullanımı',
        content: '• var(--değişken-adı)\n• var(--değişken, fallback): Yedek değer\n• Her CSS özelliğinde kullanılabilir\n• JavaScript ile dinamik değiştirilebilir\n\nÖrnek: color: var(--primary-color, blue);'
      },
      {
        title: 'Tema Sistemi',
        content: '• Light/Dark mod için ideal\n• Scope\'lu değişkenler (.dark-theme { })\n• Calc() ile hesaplama\n• Renk paletleri ve spacing sistemi\n\nÖrnek: .dark { --bg: #333; --text: #fff; }\n.light { --bg: #fff; --text: #333; }'
      }
    ],
    exampleCode: `/* Değişken Tanımlama */
:root {
    --primary-color: #3498db;
    --spacing: 16px;
    --font-size: 14px;
}

/* Değişken Kullanımı */
.button {
    background: var(--primary-color);
    padding: var(--spacing);
    font-size: var(--font-size);
}`,
    challenge: {
      instructions: '--main-color değişkenini tanımla ve kullan.',
      starterCode: `:root {
    ___BLANK1___: #ff0000;
}

.box {
    background: ___BLANK2___(___BLANK3___);
}`,
      solution: `:root {
    --main-color: #ff0000;
}

.box {
    background: var(--main-color);
}`,
      blanks: ['--main-color', 'var', '--main-color']
    },
    xpReward: 15
  },

  // 29. Important
  {
    id: 'css-important',
    title: '!important Kullanımı',
    order: 29,
    category: 'CSS',
    description: '!important ile CSS önceliğini artırma (dikkatli kullanın).',
    detailedContent: '!important, bir CSS kuralının önceliğini en üst seviyeye çıkarır. Güçlü bir araçtır ancak aşırı kullanım kod bakımını zorlaştırır.',
    sections: [
      {
        title: '!important Nasıl Çalışır?',
        content: '• Normal specificity kurallarını geçersiz kılar\n• Değerden sonra eklenirn• color: red !important;\n• En yüksek öncelik\n\nÖrnek: p { color: blue !important; }'
      },
      {
        title: 'Ne Zaman Kullanılmalı?',
        content: '• 3. parti kütüphane stillerini ezme\n• Inline stilleri geçersiz kılma\n• Utility class\'larda (.text-center)\n• Acil çözümler için (geçici)\n\nÖrnek: .utility { display: block !important; }'
      },
      {
        title: 'Neden Dikkatli Kullanılmalı?',
        content: '• Bakımı zorlaştırır\n• Debug sürecini karmaşıklaştırır\n• !important zinciri oluşabilir\n• Specificity ile çözüm tercih edilmeli\n\nİpcu: Spesifik seçiciler kullanarak !important\'tan kaçının'
      }
    ],
    exampleCode: `/* Normal Kullanım */
p {
    color: blue;
}

/* Important ile */
p {
    color: red !important;
}

/* Specificity örneği */
#myId .myClass p {
    color: green;
}

p {
    color: purple !important; /* Bu kazanır */
}`,
    challenge: {
      instructions: 'Rengi important ile kırmızı yap.',
      starterCode: `p {
    color: ___BLANK1___ ___BLANK2___;
}`,
      solution: `p {
    color: red !important;
}`,
      blanks: ['red', '!important']
    },
    xpReward: 10
  },

  // 30. Project: Responsive Landing Page
  {
    id: 'css-project-landing',
    title: 'Proje: Responsive Landing Page',
    order: 30,
    category: 'CSS',
    description: 'Responsive landing page projesi - tüm öğrendiklerini kullan!',
    detailedContent: 'Bu projede öğrendiğin tüm CSS becerilerini kullanarak profesyonel bir responsive landing page oluşturacaksın. Flexbox, Grid, Media Queries ve daha fazlası!',
    sections: [
      {
        title: 'Proje Yapısı',
        content: '• Hero Section: Tam ekran, merkeze hizalı\n• Features: Grid layout ile özellikler\n• CTA (Call-to-Action): Belirgin butonlar\n• Footer: İletişim bilgileri\n• Responsive: Mobil, tablet, desktop\n\nKullanılacak teknikler: Flexbox, Grid, Media Queries, Variables'
      },
      {
        title: 'Tasarım Öğeleri',
        content: '• CSS Variables: Renk paleti ve spacing\n• Linear Gradient: Modern arka planlar\n• Box-shadow: Derinlik efekti\n• Transition: Hover animasyonları\n• Transform: Button hover efektleri\n\nÖrnek: --primary: #3498db; --secondary: #2c3e50;'
      },
      {
        title: 'Responsive Stratejisi',
        content: '• Mobil: Tek kolon, stack layout\n• Tablet (768px+): 2 kolon grid\n• Desktop (1024px+): 3-4 kolon, geniş layout\n• Container: max-width ile merkezleme\n• Flexbox: Yön değiştirme (column/row)\n\nÖrnek: @media (min-width: 768px) { .features { grid-template-columns: repeat(2, 1fr); } }'
      }
    ],
    exampleCode: `/* Landing Page Örneği */
:root {
    --primary: #3498db;
    --dark: #2c3e50;
}

.hero {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, var(--primary), var(--dark));
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

@media (max-width: 768px) {
    .hero {
        flex-direction: column;
    }
}`,
    challenge: {
      instructions: 'Responsive container oluştur: mobilde 100%, tablette 750px, desktopda 1140px.',
      starterCode: `.container {
    width: 100%;
}

@media (___BLANK1___: 768px) {
    .container { width: 750px; }
}

@media (min-width: 1024px) {
    .container { ___BLANK2___: ___BLANK3___; }
}`,
      solution: `.container {
    width: 100%;
}

@media (min-width: 768px) {
    .container { width: 750px; }
}

@media (min-width: 1024px) {
    .container { width: 1140px; }
}`,
      blanks: ['min-width', 'width', '1140px']
    },
    xpReward: 25
  }
];

// CSS Final Exam
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const cssFinalExam: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'CSS\'te "C" harfi neyi temsil eder?',
    options: ['Creative', 'Cascading', 'Computer', 'Colorful'],
    correctAnswer: 1,
    explanation: 'CSS - Cascading Style Sheets (Basamaklı Stil Sayfaları)'
  },
  {
    id: 'q2',
    question: 'RGB renginde kırmızı için doğru format hangisidir?',
    options: ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,255)'],
    correctAnswer: 0,
    explanation: 'rgb(255,0,0) tam kırmızı rengi temsil eder.'
  },
  {
    id: 'q3',
    question: 'CSS Box Model\'de içten dışa doğru sıralama hangisidir?',
    options: [
      'margin, border, padding, content',
      'content, padding, border, margin',
      'padding, margin, border, content',
      'border, padding, content, margin'
    ],
    correctAnswer: 1,
    explanation: 'Box Model: content → padding → border → margin'
  },
  {
    id: 'q4',
    question: 'Flexbox\'ta elementleri yatay olarak ortala için hangi özellik kullanılır?',
    options: ['align-items: center', 'justify-content: center', 'text-align: center', 'margin: auto'],
    correctAnswer: 1,
    explanation: 'justify-content: center, flex elementlerini yatay olarak ortalar.'
  },
  {
    id: 'q5',
    question: 'position: absolute olan element neye göre konumlanır?',
    options: [
      'Sayfanın en üstüne',
      'Kendisine',
      'En yakın positioned parent elementine',
      'Body elementine'
    ],
    correctAnswer: 2,
    explanation: 'Absolute elementler, en yakın positioned (relative, absolute, fixed) parent\'a göre konumlanır.'
  },
  {
    id: 'q6',
    question: 'display: none ile visibility: hidden arasındaki fark nedir?',
    options: [
      'Fark yoktur',
      'display:none alan kaplamaz, visibility:hidden alan kaplar',
      'visibility:hidden alan kaplamaz, display:none alan kaplar',
      'İkisi de aynı alanı kaplar'
    ],
    correctAnswer: 1,
    explanation: 'display: none elementi tamamen kaldırır, visibility: hidden gizler ama alan kaplar.'
  },
  {
    id: 'q7',
    question: 'Medya sorgusunda 768px ve üzeri ekranlar için doğru syntax hangisidir?',
    options: [
      '@media (width: 768px)',
      '@media (min-width: 768px)',
      '@media (max-width: 768px)',
      '@media screen and (768px)'
    ],
    correctAnswer: 1,
    explanation: '@media (min-width: 768px) - 768px ve üzeri ekranlar için geçerlidir.'
  },
  {
    id: 'q8',
    question: 'Pseudo-element için doğru syntax hangisidir?',
    options: ['.class:before', '.class::before', '.class-before', '.class@before'],
    correctAnswer: 1,
    explanation: 'Pseudo-elementler için :: (çift iki nokta) kullanılır: ::before, ::after'
  },
  {
    id: 'q9',
    question: 'CSS Grid\'de 3 eşit kolon oluşturmak için en uygun yöntem hangisidir?',
    options: [
      'grid-template-columns: 33% 33% 33%',
      'grid-template-columns: repeat(3, 1fr)',
      'grid-columns: 3',
      'grid-template: 3'
    ],
    correctAnswer: 1,
    explanation: 'repeat(3, 1fr) - 3 eşit kolonlu grid oluşturmanın en pratik yoludur.'
  },
  {
    id: 'q10',
    question: 'transition özelliği ne işe yarar?',
    options: [
      'Animasyon oluşturur',
      'Değişimler arasında yumuşak geçiş sağlar',
      'Sayfa geçişi yapar',
      'Element pozisyonunu değiştirir'
    ],
    correctAnswer: 1,
    explanation: 'transition, CSS özelliklerinin değişimi sırasında yumuşak geçiş efekti sağlar.'
  },
  {
    id: 'q11',
    question: 'z-index çalışması için element hangi position değerine sahip olmalıdır?',
    options: ['static', 'relative, absolute veya fixed', 'inline', 'block'],
    correctAnswer: 1,
    explanation: 'z-index sadece positioned (relative, absolute, fixed, sticky) elementlerde çalışır.'
  },
  {
    id: 'q12',
    question: 'CSS değişkeni tanımlamak için doğru syntax hangisidir?',
    options: ['$primary-color: blue', '--primary-color: blue', '@primary-color: blue', 'var-primary-color: blue'],
    correctAnswer: 1,
    explanation: 'CSS değişkenleri -- ile başlar: --variable-name'
  },
  {
    id: 'q13',
    question: 'transform: scale(2) ne işe yarar?',
    options: [
      'Elementi 2px büyütür',
      'Elementi 2 kat büyütür',
      'Elementi 2 derece döndürür',
      'Elementi 2px kaydırır'
    ],
    correctAnswer: 1,
    explanation: 'scale(2) elementi 2 kat (200%) büyütür.'
  },
  {
    id: 'q14',
    question: 'CSS specificity\'de en yüksek öncelik hangisindedir?',
    options: ['Element seçici', 'Class seçici', 'ID seçici', '!important'],
    correctAnswer: 3,
    explanation: '!important en yüksek önceliğe sahiptir, ardından inline style, ID, class, element gelir.'
  },
  {
    id: 'q15',
    question: 'box-shadow: 10px 10px 5px black değerlerinde 5px neyi ifade eder?',
    options: ['Yatay kaydırma', 'Dikey kaydırma', 'Blur miktarı', 'Gölge rengi'],
    correctAnswer: 2,
    explanation: 'Sıralama: yatay-offset dikey-offset blur-radius renk'
  }
];

// ==================== JAVASCRIPT LESSONS ====================
export const javascriptLessons: LessonContent[] = [
  // 1. Variables
  {
    id: 'js-variables',
    title: 'Değişkenler (let, const, var)',
    order: 1,
    category: 'JavaScript',
    description: 'JavaScript, web sayfalarına interaktiflik eklemek için kullanılan bir programlama dilidir.',
    detailedContent: 'JavaScript\'te değişken tanımlamak için let, const veya var anahtar kelimelerini kullanırız. Modern JavaScript\'te let ve const kullanımı önerilir.',
    sections: [
      {
        title: 'Değişkenler',
        content: 'JavaScript\'te değişken tanımlamak için let, const veya var anahtar kelimelerini kullanırız:\n\nlet isim = "Furkan";\nconst yas = 25;\nvar sehir = "İstanbul";'
      },
      {
        title: 'let vs const vs var',
        content: '• let: Değiştirilebilir değişkenler için kullanılır\n• const: Sabit değerler için kullanılır (değiştirilemez)\n• var: Eski yöntem, artık let ve const tercih edilir'
      }
    ],
    exampleCode: `// let - Değiştirilebilir
let isim = "Furkan";
isim = "Ahmet"; // Değiştirilebilir ✓

// const - Sabit
const yas = 25;
// yas = 26; // HATA! Değiştirilemez ✗

// var - Eski yöntem
var sehir = "İstanbul";

console.log(isim, yas, sehir);`,
    challenge: {
      instructions: 'const ile PI değişkeni, let ile radius değişkeni tanımla.',
      starterCode: `___BLANK1___ PI = 3.14;
___BLANK2___ radius = 5;
___BLANK3___ area = PI * radius * radius;`,
      solution: `const PI = 3.14;
let radius = 5;
let area = PI * radius * radius;`,
      blanks: ['const', 'let', 'let'],
      expectedOutput: 'Değişkenler tanımlandı (PI=3.14, radius=5, area=78.5)'
    },
    xpReward: 10
  },

  // 2. Data Types
  {
    id: 'js-data-types',
    title: 'Veri Tipleri',
    order: 2,
    category: 'JavaScript',
    description: 'JavaScript veri tipleri: string, number, boolean, null, undefined.',
    detailedContent: 'JavaScript dinamik tipli bir dildir. Değişkenlerin tipi otomatik belirlenir ve çalışma zamanında değişebilir.',
    sections: [
      {
        title: 'Temel Veri Tipleri',
        content: '• String (Metin): "Ahmet", \'Merhaba\' gibi metinler\n• Number (Sayı): 25, 19.99 gibi tam ve ondalık sayılar\n• Boolean: true veya false değerleri\n• Null: Kasıtlı olarak boş değer\n• Undefined: Tanımlanmamış değer'
      },
      {
        title: 'typeof Operatörü',
        content: 'typeof operatörü ile bir değişkenin tipini öğrenebilirsiniz:\n\ntypeof "Ahmet" // "string"\ntypeof 25 // "number"\ntypeof true // "boolean"'
      }
    ],
    exampleCode: `// String (Metin)
let name = "Ahmet";

// Number (Sayı)
let age = 25;
let price = 19.99;

// Boolean (True/False)
let isStudent = true;

// Null (Boş değer)
let data = null;

// Undefined (Tanımsız)
let x;

console.log(typeof name); // "string"`,
    challenge: {
      instructions: 'Farklı veri tiplerinde değişkenler oluştur.',
      starterCode: `let userName = ___BLANK1___;
let userAge = ___BLANK2___;
let isActive = ___BLANK3___;`,
      solution: `let userName = "Ali";
let userAge = 30;
let isActive = true;`,
      blanks: ['"Ali"', '30', 'true'],
      expectedOutput: 'Değişkenler oluşturuldu (userName="Ali", userAge=30, isActive=true)'
    },
    xpReward: 10
  },

  // 3. Operators
  {
    id: 'js-operators',
    title: 'Operatörler',
    order: 3,
    category: 'JavaScript',
    description: 'Aritmetik, karşılaştırma ve mantıksal operatörler.',
    detailedContent: 'JavaScript\' operatörler sayesinde matematiksel işlemler, karşılaştırmalar ve mantıksal operasyonlar yapabilirsiniz.',
    sections: [
      {
        title: 'Aritmetik Operatörler',
        content: '• + (Toplama): 5 + 3 = 8\n• - (Çıkarma): 5 - 3 = 2\n• * (Çarpma): 5 * 3 = 15\n• / (Bölme): 10 / 2 = 5\n• % (Mod/Kalan): 10 % 3 = 1\n• ++ (Artırma): x++ (x = x + 1)\n• -- (Azaltma): x-- (x = x - 1)'
      },
      {
        title: 'Karşılaştırma Operatörleri',
        content: '• === (Eşit): 5 === 5 → true\n• !== (Eşit değil): 5 !== 3 → true\n• > (Büyüktür): 5 > 3 → true\n• < (Küçüktür): 3 < 5 → true\n• >= (Büyük eşit)\n• <= (Küçük eşit)'
      },
      {
        title: 'Mantıksal Operatörler',
        content: '• && (VE): true && false → false\n• || (VEYA): true || false → true\n• ! (DEĞİL): !true → false'
      }
    ],
    exampleCode: `// Aritmetik Operatörler
let a = 10;
let b = 5;
console.log(a + b); // 15
console.log(a - b); // 5
console.log(a * b); // 50
console.log(a / b); // 2
console.log(a % b); // 0 (kalan)

// Karşılaştırma
console.log(a > b);  // true
console.log(a === b); // false

// Mantıksal
let x = true;
let y = false;
console.log(x && y); // false (VE)
console.log(x || y); // true (VEYA)`,
    challenge: {
      instructions: 'İki sayıyı topla ve sonucu result değişkenine ata.',
      starterCode: `let num1 = 15;
let num2 = 25;
let result = num1 ___BLANK1___ num2;`,
      solution: `let num1 = 15;
let num2 = 25;
let result = num1 + num2;`,
      blanks: ['+'],
      expectedOutput: '40'
    },
    xpReward: 10
  },

  // 4. Conditionals
  {
    id: 'js-conditionals',
    title: 'Koşullar (If/Else)',
    order: 4,
    category: 'JavaScript',
    description: 'If, else if, else ile koşullu ifadeler.',
    detailedContent: 'Koşullu ifadeler, programınızın farklı durumlarda farklı davranmasını sağlar.',
    sections: [
      {
        title: 'If Yapısı',
        content: 'if bloğu, belirtilen koşul doğru (true) olduğunda çalışır:\n\nif (koşul) {\n  // Koşul doğruysa bu kod çalışır\n}'
      },
      {
        title: 'If-Else Yapısı',
        content: 'Koşul yanlışsa (false) alternatif bir kod bloğu çalıştırmak için else kullanılır:\n\nif (koşul) {\n  // Doğruysa\n} else {\n  // Yanlışsa\n}'
      },
      {
        title: 'If-Else If-Else',
        content: 'Birden fazla koşul kontrol etmek için else if kullanılır:\n\nif (koşul1) {\n  // Birinci koşul\n} else if (koşul2) {\n  // İkinci koşul\n} else {\n  // Hiçbiri değilse\n}'
      }
    ],
    exampleCode: `let age = 18;

if (age >= 18) {
    console.log("Reşitsiniz");
} else {
    console.log("Reşit değilsiniz");
}

// Else if
let score = 85;

if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else if (score >= 70) {
    console.log("C");
} else {
    console.log("F");
}`,
    challenge: {
      instructions: 'Sayı pozitif mi negatif mi kontrol et.',
      starterCode: `let number = -5;

___BLANK1___ (number > 0) {
    console.log("Pozitif");
} ___BLANK2___ {
    console.log("Negatif");
}`,
      solution: `let number = -5;

if (number > 0) {
    console.log("Pozitif");
} else {
    console.log("Negatif");
}`,
      blanks: ['if', 'else'],
      expectedOutput: 'Negatif'
    },
    xpReward: 10
  },

  // 5. Switch Case
  {
    id: 'js-switch',
    title: 'Switch Case',
    order: 5,
    category: 'JavaScript',
    description: 'Switch-case ile çoklu koşul kontrolü.',
    detailedContent: 'Switch-case yapısı, bir değişkenin birçok farklı değerini kontrol etmek için kullanılır. If-else zincirine alternatif daha okunabilir bir yöntemdir.',
    sections: [
      {
        title: 'Switch-Case Yapısı',
        content: 'Switch ifadesi, bir değişkenin değerini kontrol eder ve eşleşen case bloğunu çalıştırır:\n\nswitch (değişken) {\n  case değer1:\n    // Kod\n    break;\n  case değer2:\n    // Kod\n    break;\n  default:\n    // Hiçbiri eşleşmezse\n}'
      },
      {
        title: 'Break Kullanımı',
        content: '• break: Eşleşen case bulunduğunda switch bloğundan çıkar\n• break kullanmazsanız, sonraki case\'ler de çalışır (fall-through)\n• default: Hiçbir case eşleşmezse çalışır (opsiyonel)'
      }
    ],
    exampleCode: `let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Pazartesi";
        break;
    case 2:
        dayName = "Salı";
        break;
    case 3:
        dayName = "Çarşamba";
        break;
    default:
        dayName = "Bilinmiyor";
}

console.log(dayName); // Çarşamba`,
    challenge: {
      instructions: 'Switch-case ile renk kontrolü yap.',
      starterCode: `let color = "red";

___BLANK1___ (color) {
    ___BLANK2___ "red":
        console.log("Kırmızı");
        ___BLANK3___;
    case "blue":
        console.log("Mavi");
        break;
}`,
      solution: `let color = "red";

switch (color) {
    case "red":
        console.log("Kırmızı");
        break;
    case "blue":
        console.log("Mavi");
        break;
}`,
      blanks: ['switch', 'case', 'break'],
      expectedOutput: 'Kırmızı'
    },
    xpReward: 10
  },

  // 6. Loops
  {
    id: 'js-loops',
    title: 'Döngüler (For, While)',
    order: 6,
    category: 'JavaScript',
    description: 'For ve while döngüleri ile tekrarlayan işlemler.',
    detailedContent: 'Döngüler, aynı kod bloğunu birden fazla kez çalıştırmanızı sağlar. Bu, tekrarlayan işlemler için çok kullanışlıdır.',
    sections: [
      {
        title: 'For Döngüsü',
        content: 'For döngüsü, belirli sayıda tekrar için kullanılır:\n\nfor (başlangıç; koşul; artış) {\n  // Kod\n}\n\nÖrnek: for (let i = 0; i < 5; i++) { }'
      },
      {
        title: 'While Döngüsü',
        content: 'While döngüsü, koşul doğru olduğu sürece çalışır:\n\nwhile (koşul) {\n  // Kod\n}\n\nDikkat: Sonsuz döngüden kaçının!'
      },
      {
        title: 'For...of Döngüsü',
        content: 'For...of döngüsü dizilerdeki her eleman için çalışır:\n\nfor (let item of array) {\n  // Her eleman için\n}'
      }
    ],
    exampleCode: `// For döngüsü
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// While döngüsü
let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}

// For...of (Array için)
let fruits = ["elma", "armut", "muz"];
for (let fruit of fruits) {
    console.log(fruit);
}`,
    challenge: {
      instructions: '1\'den 10\'a kadar sayıları yazdıran for döngüsü yaz.',
      starterCode: `___BLANK1___ (let i = 1; i ___BLANK2___ 10; i++) {
    console.log(i);
}`,
      solution: `for (let i = 1; i <= 10; i++) {
    console.log(i);
}`,
      blanks: ['for', '<='],
      expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
    },
    xpReward: 15
  },

  // 7. Functions
  {
    id: 'js-functions',
    title: 'Fonksiyonlar',
    order: 7,
    category: 'JavaScript',
    description: 'Function tanımlama, parametre ve return kullanımı.',
    detailedContent: 'Fonksiyonlar, tekrar kullanılabilir kod bloklarıdır. Bir kez tanımlayıp birçok kez çağırabilirsiniz.',
    sections: [
      {
        title: 'Fonksiyon Tanımlama',
        content: 'function anahtar kelimesiyle fonksiyon tanımlanır:\n\nfunction fonksiyonAdı() {\n  // Kod\n}\n\nFonksiyonu çağırmak için: fonksiyonAdı();'
      },
      {
        title: 'Parametreler',
        content: 'Fonksiyonlara değer göndermek için parametreler kullanılır:\n\nfunction selamla(isim) {\n  console.log("Merhaba " + isim);\n}\n\nselamla("Ahmet"); // Merhaba Ahmet'
      },
      {
        title: 'Return (Değer Döndürme)',
        content: 'return ile fonksiyondan değer döndürülür:\n\nfunction topla(a, b) {\n  return a + b;\n}\n\nlet sonuc = topla(5, 3); // 8'
      }
    ],
    exampleCode: `// Basit fonksiyon
function greet() {
    console.log("Merhaba!");
}

// Parametreli fonksiyon
function greetUser(name) {
    console.log("Merhaba " + name);
}

// Return ile fonksiyon
function add(a, b) {
    return a + b;
}

let result = add(5, 3);
console.log(result); // 8`,
    challenge: {
      instructions: 'İki sayıyı çarpan multiply fonksiyonu oluştur.',
      starterCode: `___BLANK1___ multiply(a, b) {
    ___BLANK2___ a * b;
}

let result = ___BLANK3___(4, 5);`,
      solution: `function multiply(a, b) {
    return a * b;
}

let result = multiply(4, 5);`,
      blanks: ['function', 'return', 'multiply'],
      expectedOutput: '20'
    },
    xpReward: 15
  },

  // 8. Array Methods
  {
    id: 'js-arrays',
    title: 'Array (Dizi) Metotları',
    order: 8,
    category: 'JavaScript',
    description: 'Push, pop, map, filter, find gibi array metotları.',
    detailedContent: 'Array (dizi) metotları, dizilerle çalışmayı kolaylaştıran hazır fonksiyonlardır.',
    sections: [
      {
        title: 'Temel Array Metotları',
        content: '• push(): Dizinin sonuna eleman ekler\n• pop(): Dizinin sonundan eleman çıkarır\n• shift(): Dizinin başından eleman çıkarır\n• unshift(): Dizinin başına eleman ekler\n• length: Dizinin uzunluğunu verir'
      },
      {
        title: 'İleri Seviye Array Metotları',
        content: '• map(): Her elemana işlem uygular, yeni dizi döner\n• filter(): Koşula uyan elemanları filtreler\n• find(): Koşula uyan ilk elemanı bulur\n• forEach(): Her eleman için fonksiyon çalıştırır\n• reduce(): Diziyi tek değere indirger'
      }
    ],
    exampleCode: `let numbers = [1, 2, 3, 4, 5];

// push - sona ekle
numbers.push(6); // [1,2,3,4,5,6]

// pop - sondan çıkar
numbers.pop(); // [1,2,3,4,5]

// map - her elemana işlem
let doubled = numbers.map(n => n * 2);

// filter - filtreleme
let evens = numbers.filter(n => n % 2 === 0);

// find - bulma
let found = numbers.find(n => n > 3);`,
    challenge: {
      instructions: 'Diziye eleman ekle ve length özelliğini kullan.',
      starterCode: `let fruits = ["elma", "armut"];
fruits.___BLANK1___("muz");
console.log(fruits.___BLANK2___);`,
      solution: `let fruits = ["elma", "armut"];
fruits.push("muz");
console.log(fruits.length);`,
      blanks: ['push', 'length'],
      expectedOutput: '3'
    },
    xpReward: 15
  },

  // 9. String Methods
  {
    id: 'js-strings',
    title: 'String Metotları',
    order: 9,
    category: 'JavaScript',
    detailedContent: 'String metotları, metinlerle çalışmayı kolaylaştıran hazır fonksiyonlardır.',
    sections: [
      {
        title: 'Temel String Metotları',
        content: '• length: Metin uzunluğu\n• toUpperCase(): Büyük harfe çevir\n• toLowerCase(): Küçük harfe çevir\n• trim(): Baş ve sondaki boşlukları temizle\n• charAt(): Belirli indexteki karakteri al'
      },
      {
        title: 'İleri Seviye String Metotları',
        content: '• slice(): Metinden parça kes\n• substring(): Alt metin al\n• replace(): Metin değiştir\n• split(): Metni diziye böl\n• includes(): Metin içeriyor mu kontrol et'
      }
    ],
    description: 'Length, toUpperCase, slice, split gibi string metotları.',
    exampleCode: `let text = "Merhaba Dünya";

// Uzunluk
console.log(text.length); // 13

// Büyük harf
console.log(text.toUpperCase()); // MERHABA DÜNYA

// Küçük harf
console.log(text.toLowerCase());

// Slice (parçala)
console.log(text.slice(0, 7)); // Merhaba

// Split (ayır)
let words = text.split(" "); // ["Merhaba", "Dünya"]

// Replace (değiştir)
console.log(text.replace("Dünya", "World"));`,
    challenge: {
      instructions: 'String\'i büyük harfe çevir ve uzunluğunu al.',
      starterCode: `let name = "javascript";
let upper = name.___BLANK1___();
let len = name.___BLANK2___;`,
      solution: `let name = "javascript";
let upper = name.toUpperCase();
let len = name.length;`,
      blanks: ['toUpperCase', 'length'],
      expectedOutput: 'upper="JAVASCRIPT", len=10'
    },
    xpReward: 10
  },

  // 10. Number Methods
  {
    id: 'js-numbers',
    title: 'Number Metotları',
    order: 10,
    category: 'JavaScript',
    description: 'parseInt, parseFloat, toFixed, Math metotları.',
    detailedContent: 'Number metotları ve Math nesnesi, sayılarla matematiksel işlemler yapmayı kolaylaştırır.',
    sections: [
      {
        title: 'String\'ten Sayıya Dönüşüm',
        content: '• parseInt(): Metni tam sayıya çevirir\n• parseFloat(): Metni ondalıklı sayıya çevirir\n• Number(): Genel dönüşüm\n\nÖrnek: parseInt("42") // 42'
      },
      {
        title: 'Sayı Biçimlendirme',
        content: '• toFixed(): Ondalık basamak sayısını ayarlar\n• toPrecision(): Toplam basamak sayısını ayarlar\n\nÖrnek: (3.14159).toFixed(2) // "3.14"'
      },
      {
        title: 'Math Metotları',
        content: '• Math.round(): En yakına yuvarlar\n• Math.ceil(): Yukarı yuvarlar\n• Math.floor(): Aşağı yuvarlar\n• Math.random(): 0-1 arası rastgele\n• Math.max(), Math.min(): En büyük/küçük'
      }
    ],
    exampleCode: `// String'i number'a çevir
let num1 = parseInt("42");
let num2 = parseFloat("3.14");

// Ondalık basamak
let price = 19.99567;
console.log(price.toFixed(2)); // 19.99

// Math metotları
console.log(Math.round(4.7)); // 5
console.log(Math.ceil(4.1));  // 5
console.log(Math.floor(4.9)); // 4
console.log(Math.random());   // 0-1 arası
console.log(Math.max(5, 10, 3)); // 10`,
    challenge: {
      instructions: 'String\'i sayıya çevir ve 2 ondalık basamağa yuvarla.',
      starterCode: `let str = "123.456";
let num = ___BLANK1___(str);
let rounded = num.___BLANK2___(2);`,
      solution: `let str = "123.456";
let num = parseFloat(str);
let rounded = num.toFixed(2);`,
      blanks: ['parseFloat', 'toFixed'],
      expectedOutput: '"123.46"'
    },
    xpReward: 10
  },

  // 11. Objects
  {
    id: 'js-objects',
    title: 'Objeler (Objects)',
    order: 11,
    category: 'JavaScript',
    description: 'Object oluşturma, property erişimi ve metotlar.',
    detailedContent: 'Objeler, ilişkili verileri ve fonksiyonları bir arada tutmamızı sağlayan veri yapılarıdır.',
    sections: [
      {
        title: 'Object Oluşturma',
        content: 'Süslü parantezlerle object oluşturulur:\n\nlet person = {\n  name: "Ahmet",\n  age: 25,\n  city: "İstanbul"\n};'
      },
      {
        title: 'Property Erişimi',
        content: 'İki şekilde property\'lere erişilebilir:\n\n• Nokta notasyonu: person.name\n• Köşeli parantez: person["name"]\n\nDinamik erişim için köşeli parantez kullanılır.'
      },
      {
        title: 'Object Metotları',
        content: 'Obje içinde fonksiyon tanımlanabilir:\n\nlet person = {\n  name: "Ali",\n  greet: function() {\n    console.log("Merhaba");\n  }\n};\n\nperson.greet(); // Metot çağırma'
      }
    ],
    exampleCode: `// Object oluşturma
let person = {
    name: "Ahmet",
    age: 25,
    city: "İstanbul",
    greet: function() {
        console.log("Merhaba!");
    }
};

// Property erişimi
console.log(person.name);
console.log(person["age"]);

// Yeni property ekleme
person.job = "Developer";

// Metot çağırma
person.greet();`,
    challenge: {
      instructions: 'Car objesi oluştur ve property\'lere eriş.',
      starterCode: `let car = {
    ___BLANK1___: "Toyota",
    year: 2020
};

console.log(car.___BLANK2___);`,
      solution: `let car = {
    brand: "Toyota",
    year: 2020
};

console.log(car.brand);`,
      blanks: ['brand', 'brand'],
      expectedOutput: 'Toyota'
    },
    xpReward: 15
  },

  // 12. Date
  {
    id: 'js-date',
    title: 'Tarih ve Saat (Date)',
    order: 12,
    category: 'JavaScript',
    description: 'Date objesi ile tarih ve saat işlemleri.',
    detailedContent: 'Date nesnesi, JavaScript\'te tarih ve saat işlemleri yapmamızı sağlar.',
    sections: [
      {
        title: 'Date Oluşturma',
        content: '• new Date(): Şimdiki zaman\n• new Date("2024-01-15"): Belirli tarih\n• new Date(2024, 0, 15): Yıl, ay (0-11), gün\n• Date.now(): Zaman damgası (milisaniye)'
      },
      {
        title: 'Tarih Parçalarını Alma',
        content: '• getFullYear(): Yıl (2024)\n• getMonth(): Ay (0-11, Ocak=0)\n• getDate(): Gün (1-31)\n• getDay(): Haftanın günü (0-6, Pazar=0)\n• getHours(), getMinutes(), getSeconds()'
      }
    ],
    exampleCode: `// Şimdiki zaman
let now = new Date();

// Tarih parçaları
console.log(now.getFullYear()); // Yıl
console.log(now.getMonth());    // Ay (0-11)
console.log(now.getDate());     // Gün
console.log(now.getHours());    // Saat
console.log(now.getMinutes());  // Dakika

// Belirli tarih
let birthday = new Date("1990-05-15");

// Zaman damgası
console.log(Date.now());`,
    challenge: {
      instructions: 'Yeni Date objesi oluştur ve yılı al.',
      starterCode: `let today = ___BLANK1___ Date();
let year = today.___BLANK2___();`,
      solution: `let today = new Date();
let year = today.getFullYear();`,
      blanks: ['new', 'getFullYear'],
      expectedOutput: 'Mevcut yıl (örn: 2025)'
    },
    xpReward: 10
  },

  // 13. DOM Intro
  {
    id: 'js-dom-intro',
    title: 'DOM Nedir?',
    order: 13,
    category: 'JavaScript',
    description: 'Document Object Model - HTML\'e JavaScript ile erişim.',
    detailedContent: 'DOM (Document Object Model), HTML belgelerinin JavaScript ile erişilebilir ve değiştirilebilir hale getirilmesini sağlayan bir API\'dir. Web sayfasındaki tüm elementler, DOM ağacı olarak temsil edilir.',
    sections: [
      {
        title: 'DOM Nedir?',
        content: '• DOM, HTML belgesinin programatik temsilidir\n• Her HTML elementi bir "node" (düğüm) olarak gösterilir\n• JavaScript ile DOM\'u okuyabilir ve değiştirebiliriz\n• Tarayıcı, HTML\'i yüklerken otomatik olarak DOM oluşturur\n\nÖrnek: <div> elementi, document.querySelector("div") ile erişilebilir.'
      },
      {
        title: 'Element Seçme Yöntemleri',
        content: '• getElementById(): ID ile element seçer\n• getElementsByClassName(): Class ismiyle seçer\n• getElementsByTagName(): Etiket ismiyle seçer\n• querySelector(): CSS seçici ile ilk eşleşeni bulur\n• querySelectorAll(): CSS seçici ile tümünü bulur\n\nModern projelerde querySelector() ve querySelectorAll() tercih edilir.'
      },
      {
        title: 'DOM ile Neler Yapılabilir?',
        content: '• Element içeriğini okuma ve değiştirme\n• Yeni elementler oluşturma ve ekleme\n• Mevcut elementleri silme\n• CSS stillerini değiştirme\n• Event listener\'lar ekleyerek kullanıcı etkileşimlerini yakalama'
      }
    ],
    exampleCode: `// DOM - Document Object Model
// HTML elementlerine erişim ve değiştirme

// Element seçimi
let title = document.getElementById("title");
let items = document.getElementsByClassName("item");
let paragraphs = document.getElementsByTagName("p");

// Modern seçiciler
let element = document.querySelector(".class");
let all = document.querySelectorAll("div");

// İçerik değiştirme
element.textContent = "Yeni metin";
element.innerHTML = "<strong>Kalın</strong>";`,
    challenge: {
      instructions: 'ID ile element seç ve içeriğini değiştir.',
      starterCode: `let heading = document.___BLANK1___("title");
heading.___BLANK2___ = "Yeni Başlık";`,
      solution: `let heading = document.getElementById("title");
heading.textContent = "Yeni Başlık";`,
      blanks: ['getElementById', 'textContent'],
      expectedOutput: 'Element içeriği "Yeni Başlık" olarak değiştirildi'
    },
    xpReward: 15
  },

  // 14. DOM Selection
  {
    id: 'js-dom-select',
    title: 'Element Seçimi',
    order: 14,
    category: 'JavaScript',
    description: 'querySelector, querySelectorAll ile element seçimi.',
    detailedContent: 'Modern JavaScript\'te element seçimi için querySelector() ve querySelectorAll() metotları kullanılır. Bu metotlar CSS seçicilerini destekler ve çok esnek bir seçim imkanı sunar.',
    sections: [
      {
        title: 'querySelector() Kullanımı',
        content: '• İlk eşleşen elementi döndürür\n• CSS seçicilerini destekler: .class, #id, tag\n• Eşleşme yoksa null döner\n\nÖrnek kullanımlar:\nlet div = document.querySelector("div"); // İlk div\nlet header = document.querySelector(".header"); // Class ile\nlet main = document.querySelector("#main"); // ID ile'
      },
      {
        title: 'querySelectorAll() ile Çoklu Seçim',
        content: '• Tüm eşleşen elementleri döndürür\n• NodeList objesi döner (array benzeri)\n• forEach() ile döngü yapılabilir\n• Array metotlarını kullanmak için Array.from() gerekir\n\nlet items = document.querySelectorAll(".item");\nitems.forEach(item => console.log(item));'
      },
      {
        title: 'Gelişmiş CSS Seçiciler',
        content: '• Attribute seçiciler: [type="text"]\n• Pseudo-class: :hover, :first-child\n• Birleşik seçiciler: div.container p.text\n• Çocuk seçici: parent > child\n\ndocument.querySelector("div.active > p:first-child")'
      }
    ],
    exampleCode: `// querySelector - İlk eşleşen
let firstDiv = document.querySelector("div");
let firstClass = document.querySelector(".myClass");
let firstId = document.querySelector("#myId");

// querySelectorAll - Tüm eşleşenler
let allDivs = document.querySelectorAll("div");
let allClasses = document.querySelectorAll(".myClass");

// NodeList üzerinde döngü
allDivs.forEach(div => {
    console.log(div.textContent);
});`,
    challenge: {
      instructions: 'Class seçici ile tüm elementleri seç.',
      starterCode: `let items = document.___BLANK1___(".___BLANK2___");`,
      solution: `let items = document.querySelectorAll(".item");`,
      blanks: ['querySelectorAll', 'item'],
      expectedOutput: 'Tüm .item class\'ına sahip elementler seçildi'
    },
    xpReward: 10
  },

  // 15. DOM Content
  {
    id: 'js-dom-content',
    title: 'İçerik Değiştirme',
    order: 15,
    category: 'JavaScript',
    description: 'textContent, innerHTML, setAttribute ile içerik değiştirme.',
    detailedContent: 'DOM elementlerinin içeriğini JavaScript ile dinamik olarak değiştirebiliriz. Metin, HTML ve attribute\'lar üzerinde tam kontrol sahibi oluruz.',
    sections: [
      {
        title: 'textContent vs innerHTML',
        content: '• textContent: Sadece düz metin içeriğini değiştirir\n• innerHTML: HTML etiketlerini yorumlayarak içeriği değiştirir\n• textContent daha güvenlidir (XSS saldırılarına karşı)\n• innerHTML ile yeni HTML elementleri eklenebilir\n\nelement.textContent = "Metin"; // Güvenli\nelement.innerHTML = "<b>Kalın</b>"; // HTML yorumlar'
      },
      {
        title: 'Attribute İşlemleri',
        content: '• setAttribute(): Attribute ekler veya değiştirir\n• getAttribute(): Attribute değerini okur\n• removeAttribute(): Attribute\'u siler\n• hasAttribute(): Attribute varlığını kontrol eder\n\nlet img = document.querySelector("img");\nimg.setAttribute("src", "photo.jpg");\nimg.setAttribute("alt", "Fotoğraf");'
      },
      {
        title: 'Class İşlemleri',
        content: '• classList.add(): Class ekler\n• classList.remove(): Class siler\n• classList.toggle(): Class varsa siler, yoksa ekler\n• classList.contains(): Class kontrolü\n\nelement.classList.add("active");\nelement.classList.toggle("hidden");'
      }
    ],
    exampleCode: `let element = document.querySelector("#demo");

// Metin değiştirme
element.textContent = "Düz metin";

// HTML değiştirme
element.innerHTML = "<strong>Kalın</strong> metin";

// Attribute değiştirme
let img = document.querySelector("img");
img.setAttribute("src", "new.jpg");
img.setAttribute("alt", "Yeni resim");

// Class ekleme/çıkarma
element.classList.add("active");
element.classList.remove("hidden");`,
    challenge: {
      instructions: 'Element\'in içeriğini HTML ile değiştir.',
      starterCode: `let box = document.querySelector(".box");
box.___BLANK1___ = "<h2>___BLANK2___</h2>";`,
      solution: `let box = document.querySelector(".box");
box.innerHTML = "<h2>Başlık</h2>";`,
      blanks: ['innerHTML', 'Başlık'],
      expectedOutput: 'Element içine <h2>Başlık</h2> HTML\'i eklendi'
    },
    xpReward: 15
  },

  // 16. DOM Styling
  {
    id: 'js-dom-style',
    title: 'Stil Değiştirme',
    order: 16,
    category: 'JavaScript',
    description: 'JavaScript ile CSS stilleri değiştirme.',
    detailedContent: 'JavaScript kullanarak elementlerin CSS stillerini dinamik olarak değiştirebilir ve animasyonlar oluşturabiliriz. Bu, kullanıcı etkileşimlerine göre görünümü güncellemek için çok kullanılır.',
    sections: [
      {
        title: 'style Özelliği ile Stil Değiştirme',
        content: '• element.style ile inline stil eklenir\n• CSS property isimleri camelCase olur (background-color → backgroundColor)\n• Değerler string olarak verilir\n• Birim belirtilmelidir (px, %, em vb.)\n\nelement.style.color = "red";\nelement.style.fontSize = "20px";\nelement.style.backgroundColor = "yellow";'
      },
      {
        title: 'cssText ile Toplu Stil',
        content: '• Birden fazla stili bir seferde ekler\n• String olarak CSS yazılır\n• Mevcut inline stillerin üzerine yazar\n• Template literal ile düzenli yazılabilir\n\nelement.style.cssText = `\n  color: blue;\n  background: white;\n  padding: 10px;\n`;'
      },
      {
        title: 'Class ile Stil Yönetimi',
        content: '• Daha temiz ve yönetilebilir yaklaşım\n• CSS dosyasında stil tanımları\n• JavaScript ile sadece class ekleme/çıkarma\n• Birden fazla stil grubu için ideal\n\n/* CSS */\n.active { color: red; font-weight: bold; }\n\n// JS\nelement.className = "active";'
      }
    ],
    exampleCode: `let element = document.querySelector(".box");

// Stil değiştirme
element.style.color = "red";
element.style.backgroundColor = "yellow";
element.style.fontSize = "20px";
element.style.padding = "10px";

// Çoklu stil
element.style.cssText = \`
    color: blue;
    background: white;
    border: 2px solid black;
\`;

// Class ile
element.className = "active highlight";`,
    challenge: {
      instructions: 'Elementi kırmızı yap ve 18px font boyutu ver.',
      starterCode: `let text = document.querySelector("p");
text.___BLANK1___.color = "___BLANK2___";
text.style.fontSize = "___BLANK3___";`,
      solution: `let text = document.querySelector("p");
text.style.color = "red";
text.style.fontSize = "18px";`,
      blanks: ['style', 'red', '18px'],
      expectedOutput: 'Element stili değiştirildi (kırmızı renk, 18px font)'
    },
    xpReward: 15
  },

  // 17. Event Listeners
  {
    id: 'js-events',
    title: 'Event Listener (Olaylar)',
    order: 17,
    category: 'JavaScript',
    description: 'Click, mouse, keyboard olaylarını dinleme.',
    detailedContent: 'Event listener\'lar, kullanıcı etkileşimlerini (tıklama, klavye basımı, mouse hareketi vb.) yakalamak için kullanılır. Modern web uygulamalarının temel yapı taşıdır.',
    sections: [
      {
        title: 'addEventListener() Metodu',
        content: '• Element üzerine olay dinleyicisi ekler\n• İlk parametre: olay tipi ("click", "mouseover" vb.)\n• İkinci parametre: çalışacak fonksiyon\n• Aynı elemente birden fazla listener eklenebilir\n\nbutton.addEventListener("click", function() {\n  console.log("Tıklandı!");\n});'
      },
      {
        title: 'Yaygın Event Tipleri',
        content: '• Mouse: click, dblclick, mouseenter, mouseleave\n• Keyboard: keydown, keyup, keypress\n• Form: submit, change, focus, blur\n• Window: load, resize, scroll\n• Touch: touchstart, touchmove, touchend\n\nInput değişimini dinleme:\ninput.addEventListener("change", handleChange);'
      },
      {
        title: 'Event Objesi',
        content: '• Event fonksiyonu otomatik olarak event objesi alır\n• event.target: Olayın gerçekleştiği element\n• event.key: Basılan tuş (keyboard olaylarında)\n• event.preventDefault(): Varsayılan davranışı engeller\n\nform.addEventListener("submit", (e) => {\n  e.preventDefault(); // Sayfa yenilenmez\n});'
      }
    ],
    exampleCode: `let button = document.querySelector("button");

// Click olayı
button.addEventListener("click", function() {
    console.log("Butona tıklandı!");
});

// Mouse olayları
button.addEventListener("mouseenter", () => {
    console.log("Mouse üstünde");
});

// Keyboard olayı
document.addEventListener("keypress", (e) => {
    console.log("Basılan tuş:", e.key);
});`,
    challenge: {
      instructions: 'Butona click event listener ekle.',
      starterCode: `let btn = document.querySelector("#btn");

btn.___BLANK1___("___BLANK2___", function() {
    alert("Tıklandı!");
});`,
      solution: `let btn = document.querySelector("#btn");

btn.addEventListener("click", function() {
    alert("Tıklandı!");
});`,
      blanks: ['addEventListener', 'click'],
      expectedOutput: 'Butona tıklandığında "Tıklandı!" uyarısı gösterilir'
    },
    xpReward: 20
  },

  // 18. Form Validation
  {
    id: 'js-form-validation',
    title: 'Form Doğrulama',
    order: 18,
    category: 'JavaScript',
    description: 'Form inputlarını JavaScript ile doğrulama.',
    detailedContent: 'Form validasyonu, kullanıcının girdiği verilerin doğruluğunu kontrol eder. Bu sayede hatalı veri gönderimini önler ve kullanıcıya anlık geri bildirim sağlarız.',
    sections: [
      {
        title: 'Form Submit Olayını Yakalama',
        content: '• Form gönderildiğinde "submit" olayı tetiklenir\n• event.preventDefault() ile sayfa yenilenmesini engelleriz\n• Input değerlerini .value ile alırız\n• Doğrulama sonrası veri gönderebiliriz\n\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  // Validasyon işlemleri\n});'
      },
      {
        title: 'Yaygın Validasyon Kontrolleri',
        content: '• Boşluk kontroli: value.trim().length > 0\n• Uzunluk kontroli: value.length >= minLength\n• Email kontrolü: value.includes("@")\n• Regex pattern: /^[0-9]+$/.test(value)\n• Sayı aralığı: Number(value) >= min\n\nif (email.includes("@") && email.includes(".")) {\n  // Geçerli email\n}'
      },
      {
        title: 'Hata Mesajları Gösterme',
        content: '• alert() ile basit uyarı (kullanıcı deneyimi kötü)\n• HTML elementine hata mesajı yazma (daha iyi)\n• Input border rengini kırmızı yapma\n• Error class ekleyerek stil uygulama\n\nerrorElement.textContent = "Geçersiz email!";\ninput.classList.add("error");'
      }
    ],
    exampleCode: `let form = document.querySelector("form");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Sayfa yenilenmesini engelle
    
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    
    // Doğrulama
    if (username.length < 3) {
        alert("Kullanıcı adı en az 3 karakter olmalı");
        return;
    }
    
    if (!email.includes("@")) {
        alert("Geçerli bir email girin");
        return;
    }
    
    console.log("Form geçerli!");
});`,
    challenge: {
      instructions: 'Form submit olayını engelle ve input değerini al.',
      starterCode: `form.addEventListener("submit", function(e) {
    e.___BLANK1___();
    let input = document.querySelector("#name").___BLANK2___;
});`,
      solution: `form.addEventListener("submit", function(e) {
    e.preventDefault();
    let input = document.querySelector("#name").value;
});`,
      blanks: ['preventDefault', 'value'],
      expectedOutput: 'Form gönderimi engellendi ve input değeri alındı'
    },
    xpReward: 20
  },

  // 19. This Keyword
  {
    id: 'js-this',
    title: 'this Anahtar Kelimesi',
    order: 19,
    category: 'JavaScript',
    description: 'this keyword\'ü ve kullanım alanları.',
    detailedContent: '"this" anahtar kelimesi, JavaScript\'te çalışma zamanında (runtime) bulunduğu context\'i (bağlamı) işaret eder. Hangi objeyi işaret ettiği, fonksiyonun nasıl çağrıldığına bağlıdır.',
    sections: [
      {
        title: 'Object Metodunda this',
        content: '• Object içindeki metotlarda, this o objeyi işaret eder\n• Property\'lere erişmek için this.propertyName kullanılır\n• Arrow function kullanılmazsa, this dinamik olarak belirlenir\n\nlet person = {\n  name: "Ahmet",\n  greet() {\n    console.log(this.name); // "Ahmet"\n  }\n};'
      },
      {
        title: 'Event Listener\'da this',
        content: '• Normal fonksiyonda this, olayı tetikleyen elementi işaret eder\n• Arrow function\'da this, üst scope\'u işaret eder\n• Element üzerinde işlem yapmak için kullanılır\n\nbutton.addEventListener("click", function() {\n  this.style.color = "red"; // button\'u kırmızı yapar\n});'
      }
    ],
    exampleCode: `// Object içinde this
let person = {
    name: "Ahmet",
    age: 25,
    greet: function() {
        console.log("Benim adım " + this.name);
        console.log("Yaşım " + this.age);
    }
};

person.greet();

// Event listener'da this
let button = document.querySelector("button");
button.addEventListener("click", function() {
    console.log(this); // button elementini gösterir
    this.style.background = "red";
});`,
    challenge: {
      instructions: 'Object metodu içinde this ile property\'e eriş.',
      starterCode: `let car = {
    brand: "Toyota",
    showBrand: function() {
        console.log(___BLANK1___.brand);
    }
};`,
      solution: `let car = {
    brand: "Toyota",
    showBrand: function() {
        console.log(this.brand);
    }
};`,
      blanks: ['this'],
      expectedOutput: 'Fonksiyon tanımlandı, çağrıldığında "Toyota" yazdırır'
    },
    xpReward: 15
  },

  // 20. Arrow Functions
  {
    id: 'js-arrow-functions',
    title: 'Arrow Functions (ES6)',
    order: 20,
    category: 'JavaScript',
    description: 'Modern ok fonksiyonları (=>) ve kullanımı.',
    detailedContent: 'Arrow function\'lar, ES6 ile gelen modern fonksiyon syntax\'idir. Daha kısa ve okunabilir kod yazmamızı sağlar. Normal fonksiyonlardan farklı olarak kendi this bağlamı oluşturmazlar.',
    sections: [
      {
        title: 'Arrow Function Syntax',
        content: '• Temel syntax: (params) => { body }\n• Tek parametre: param => { body }\n• Tek satır return: (params) => value\n• Parantez olmadan: x => x * 2\n\nconst add = (a, b) => a + b;\nconst square = x => x * x;\nconst greet = () => console.log("Hi");'
      },
      {
        title: 'Normal Function vs Arrow Function',
        content: '• Arrow function daha kısadır\n• Kendi this\'i yoktur (üst scope\'tan alır)\n• arguments objesi yoktur\n• Constructor olarak kullanılamaz (new ile)\n• Callback fonksiyonlar için idealdir\n\nArray metotlarında sıkça kullanılır:\nnumbers.map(n => n * 2)'
      },
      {
        title: 'Array Metotları ile Kullanım',
        content: '• map(): Her elemanı dönüştür\n• filter(): Koşula uyan elemanları seç\n• reduce(): Tek bir değere indir\n• forEach(): Her eleman için işlem yap\n\nlet numbers = [1, 2, 3, 4];\nlet doubled = numbers.map(n => n * 2);\nlet evens = numbers.filter(n => n % 2 === 0);'
      }
    ],
    exampleCode: `// Normal fonksiyon
function add(a, b) {
    return a + b;
}

// Arrow function
const add2 = (a, b) => {
    return a + b;
};

// Kısa yazım (tek satır return)
const add3 = (a, b) => a + b;

// Tek parametre (parantez yok)
const square = x => x * x;

// Array metotları ile
let numbers = [1, 2, 3, 4];
let doubled = numbers.map(n => n * 2);`,
    challenge: {
      instructions: 'İki sayıyı çarpan arrow function yaz.',
      starterCode: `const multiply = (a, b) ___BLANK1___ a ___BLANK2___ b;`,
      solution: `const multiply = (a, b) => a * b;`,
      blanks: ['=>', '*'],
      expectedOutput: 'Arrow function tanımlandı (iki sayıyı çarpar)'
    },
    xpReward: 15
  },

  // 21. Classes
  {
    id: 'js-classes',
    title: 'Class Yapısı',
    order: 21,
    category: 'JavaScript',
    description: 'ES6 Class syntax ile object-oriented programming.',
    detailedContent: 'Class\'lar, nesne yönelimli programlama (OOP) için kullanılan şablonlardır. Benzer özelliklere sahip çok sayıda obje oluşturmak için idealdir. ES6 ile JavaScript\'e eklenen modern syntax\'tir.',
    sections: [
      {
        title: 'Class Tanımlama ve Constructor',
        content: '• class keyword ile tanımlanır\n• constructor() ile başlangıç değerleri set edilir\n• this ile property\'ler tanımlanır\n• new keyword ile instance oluşturulur\n\nclass Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n}\n\nlet p = new Person("Ahmet", 25);'
      },
      {
        title: 'Metot Tanımlama',
        content: '• Class içinde fonksiyonlar metot olarak tanımlanır\n• function keyword\'\u00fc kullanılmaz\n• Tüm instance\'lar bu metotlara erişebilir\n• this ile property\'lere erişilir\n\ngreet() {\n  console.log(`Merhaba ${this.name}`);\n}\n\nperson1.greet(); // Metot çağrısı'
      },
      {
        title: 'OOP Prensipleri',
        content: '• Encapsulation: Veri ve metotları bir arada tutma\n• Reusability: Class\'tan çoklu instance oluşturma\n• Inheritance: Başka class\'tan türeyebilme (extends)\n• Maintainability: Kodun düzenliliği ve sürdürülebilirliği\n\nGerçek hayat objelerini modellemek için kullanılır.'
      }
    ],
    exampleCode: `// Class tanımlama
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        console.log(\`Merhaba, ben \${this.name}\`);
    }
    
    haveBirthday() {
        this.age++;
    }
}

// Instance oluşturma
let person1 = new Person("Ahmet", 25);
person1.greet();
person1.haveBirthday();
console.log(person1.age); // 26`,
    challenge: {
      instructions: 'Car class\'ı oluştur ve method ekle.',
      starterCode: `___BLANK1___ Car {
    ___BLANK2___(brand, year) {
        this.brand = brand;
        this.year = year;
    }
}

let myCar = ___BLANK3___ Car("Toyota", 2020);`,
      solution: `class Car {
    constructor(brand, year) {
        this.brand = brand;
        this.year = year;
    }
}

let myCar = new Car("Toyota", 2020);`,
      blanks: ['class', 'constructor', 'new'],
      expectedOutput: 'Car class tanımlandı ve myCar objesi oluşturuldu'
    },
    xpReward: 20
  },

  // 22. JSON
  {
    id: 'js-json',
    title: 'JSON Nedir?',
    order: 22,
    category: 'JavaScript',
    description: 'JSON formatı ve parse/stringify işlemleri.',
    detailedContent: 'JSON (JavaScript Object Notation), veri alışverişi için kullanılan hafif ve okunabilir bir formattır. API\'ler arasında veri iletiminde standart haline gelmiştir.',
    sections: [
      {
        title: 'JSON.stringify() - Object\'ten String\'e',
        content: '• JavaScript objesini JSON string\'ine çevirir\n• API\'ye veri gönderirken kullanılır\n• localStorage\'a obje kaydetmek için gerekir\n• Fonksiyonlar ve undefined değerler atlanır\n\nlet user = { name: "Ahmet", age: 25 };\nlet json = JSON.stringify(user);\n// \'{"name":"Ahmet","age":25}\''
      },
      {
        title: 'JSON.parse() - String\'ten Object\'e',
        content: '• JSON string\'ini JavaScript objesine çevirir\n• API\'den gelen veriyi işlerken kullanılır\n• localStorage\'dan obje okurken gerekir\n• Geçersiz JSON\'da hata fırlatır\n\nlet jsonStr = \'{"name":"Mehmet"}\';\nlet obj = JSON.parse(jsonStr);\nconsole.log(obj.name); // "Mehmet"'
      }
    ],
    exampleCode: `// JSON.stringify - Object'i JSON'a çevir
let user = {
    name: "Ahmet",
    age: 25,
    city: "İstanbul"
};

let jsonString = JSON.stringify(user);
console.log(jsonString);
// '{"name":"Ahmet","age":25,"city":"İstanbul"}'

// JSON.parse - JSON'ı Object'e çevir
let jsonData = '{"name":"Mehmet","age":30}';
let obj = JSON.parse(jsonData);
console.log(obj.name); // Mehmet`,
    challenge: {
      instructions: 'Object\'i JSON string\'e çevir.',
      starterCode: `let data = { id: 1, title: "Test" };
let json = JSON.___BLANK1___(data);`,
      solution: `let data = { id: 1, title: "Test" };
let json = JSON.stringify(data);`,
      blanks: ['stringify'],
      expectedOutput: '{"id":1,"title":"Test"}'
    },
    xpReward: 15
  },

  // 23. LocalStorage
  {
    id: 'js-localstorage',
    title: 'LocalStorage Kullanımı',
    order: 23,
    category: 'JavaScript',
    description: 'Tarayıcıda veri saklama: localStorage.',
    detailedContent: 'localStorage, tarayıcıda kalıcı veri saklamamızı sağlar. Sayfa yenilense veya tarayıcı kapatılıp açılsa bile veriler korunur. Kullanıcı tercihlerini ve uygulama durumunu saklamak için idealdir.',
    sections: [
      {
        title: 'Veri Kaydetme ve Okuma',
        content: '• setItem(key, value): Veri kaydeder\n• getItem(key): Veri okur\n• Tüm veriler string olarak saklanır\n• Tarayıcıya özeldir (domain bazında)\n\nlocalStorage.setItem("username", "Ahmet");\nlet name = localStorage.getItem("username");'
      },
      {
        title: 'Object Saklama (JSON ile)',
        content: '• Objeler doğrudan saklanamaz, JSON\'a çevrilmeli\n• JSON.stringify() ile string\'e çevir\n• JSON.parse() ile geri objeye dönüştür\n\nlet user = { name: "Ali", age: 30 };\nlocalStorage.setItem("user", JSON.stringify(user));\nlet saved = JSON.parse(localStorage.getItem("user"));'
      },
      {
        title: 'Veri Silme ve Temizleme',
        content: '• removeItem(key): Tek bir veriyi siler\n• clear(): Tüm localStorage\'\u0131 temizler\n• length: Kaç adet veri olduğunu verir\n• key(index): Index\'teki key\'i verir\n\nlocalStorage.removeItem("username");\nlocalStorage.clear(); // Hepsini sil'
      }
    ],
    exampleCode: `// Veri kaydetme
localStorage.setItem("username", "Ahmet");
localStorage.setItem("age", "25");

// Veri okuma
let username = localStorage.getItem("username");
console.log(username); // Ahmet

// Object saklama (JSON ile)
let user = { name: "Mehmet", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

// Object okuma
let savedUser = JSON.parse(localStorage.getItem("user"));

// Veri silme
localStorage.removeItem("age");
localStorage.clear(); // Tümünü sil`,
    challenge: {
      instructions: 'LocalStorage\'a veri kaydet ve oku.',
      starterCode: `localStorage.___BLANK1___("name", "Ali");
let name = localStorage.___BLANK2___("name");`,
      solution: `localStorage.setItem("name", "Ali");
let name = localStorage.getItem("name");`,
      blanks: ['setItem', 'getItem'],
      expectedOutput: 'Veri kaydedildi ve okundu (name="Ali")'
    },
    xpReward: 15
  },

  // 24. Timeout & Interval
  {
    id: 'js-timing',
    title: 'SetTimeout ve Interval',
    order: 24,
    category: 'JavaScript',
    description: 'Zamanlayıcılar: setTimeout ve setInterval.',
    detailedContent: 'JavaScript zamanlayıcı fonksiyonları, kodun belirli bir süre sonra veya belirli aralıklarla çalışmasını sağlar. Animasyonlar, otomatik kaydetme ve zamana bağlı işlemler için kullanılır.',
    sections: [
      {
        title: 'setTimeout() - Bir Kez Çalışır',
        content: '• Belirtilen süre sonra bir kez çalışır\n• İlk parametre: Fonksiyon\n• İkinci parametre: Bekleme süresi (milisaniye)\n• clearTimeout() ile iptal edilebilir\n\nsetTimeout(() => {\n  console.log("3 saniye sonra");\n}, 3000);'
      },
      {
        title: 'setInterval() - Tekrarlı Çalışır',
        content: '• Belirtilen aralıklarla sürekli çalışır\n• clearInterval() ile durdurulmalıdır\n• Sayaçlar ve kronometreler için ideal\n• ID döndürür, bu ID ile durdurulur\n\nlet id = setInterval(() => {\n  console.log("Her saniye");\n}, 1000);\n\nclearInterval(id); // Durdur'
      }
    ],
    exampleCode: `// setTimeout - Bir kez çalışır
setTimeout(() => {
    console.log("3 saniye sonra çalıştı");
}, 3000);

// setInterval - Tekrar tekrar çalışır
let count = 0;
let intervalId = setInterval(() => {
    count++;
    console.log(count);
    
    if (count === 5) {
        clearInterval(intervalId); // Durdur
    }
}, 1000);

// clearTimeout - İptal et
let timeoutId = setTimeout(() => {}, 5000);
clearTimeout(timeoutId);`,
    challenge: {
      instructions: '2 saniye sonra çalışacak timeout yaz.',
      starterCode: `___BLANK1___(() => {
    console.log("Çalıştı");
}, ___BLANK2___);`,
      solution: `setTimeout(() => {
    console.log("Çalıştı");
}, 2000);`,
      blanks: ['setTimeout', '2000'],
      expectedOutput: '2 saniye sonra "Çalıştı" yazdırılır'
    },
    xpReward: 15
  },

  // 25. Try Catch
  {
    id: 'js-error-handling',
    title: 'Hata Yakalama (Try/Catch)',
    order: 25,
    category: 'JavaScript',
    description: 'Try-catch ile hata yönetimi.',
    detailedContent: 'Try-catch yapısı, çalışma zamanında oluşabilecek hataları yakalamamızı ve yönetmemizi sağlar. Uygulamanın çökmesini önler ve kullanıcıya anlamlı hata mesajları göstermeyi mümkün kılar.',
    sections: [
      {
        title: 'Try-Catch Yapısı',
        content: '• try bloğunda riskli kod çalıştırılır\n• Hata oluşursa catch bloğu devreye girer\n• catch bloğuna error objesi gelir\n• finally bloğu her durumda çalışır (opsiyonel)\n\ntry {\n  // Riskli kod\n} catch (error) {\n  // Hata yönetimi\n} finally {\n  // Her zaman çalışır\n}'
      },
      {
        title: 'Hata Objesi',
        content: '• error.message: Hata mesajı\n• error.name: Hata tipi\n• error.stack: Hata\'nın kaynağı\n\ncatch (error) {\n  console.log(error.message);\n  console.log(error.name);\n}'
      },
      {
        title: 'Hata Fırlatma (throw)',
        content: '• throw ile manuel hata fırlatılabilir\n• new Error() ile hata objesi oluşturulur\n• Kendi hata koşullarımızı tanımlayabiliriz\n\nif (age < 0) {\n  throw new Error("Yaş negatif olamaz!");\n}'
      }
    ],
    exampleCode: `// Try-Catch
try {
    let result = riskyFunction();
    console.log(result);
} catch (error) {
    console.log("Hata oluştu:", error.message);
} finally {
    console.log("Her zaman çalışır");
}

// Hata fırlatma
function divide(a, b) {
    if (b === 0) {
        throw new Error("Sıfıra bölünemez!");
    }
    return a / b;
}

try {
    divide(10, 0);
} catch (e) {
    console.log(e.message);
}`,
    challenge: {
      instructions: 'Try-catch bloğu oluştur.',
      starterCode: `___BLANK1___ {
    let data = JSON.parse(invalidJson);
} ___BLANK2___ (error) {
    console.log("Parse hatası");
}`,
      solution: `try {
    let data = JSON.parse(invalidJson);
} catch (error) {
    console.log("Parse hatası");
}`,
      blanks: ['try', 'catch'],
      expectedOutput: 'Parse hatası'
    },
    xpReward: 15
  },

  // 26. Async Programming
  {
    id: 'js-async-intro',
    title: 'Asenkron Programlama',
    order: 26,
    category: 'JavaScript',
    description: 'Callback, Promise ve async/await giriş.',
    detailedContent: 'Asenkron programlama, kodun beklemeden devam etmesini sağlar. Uzun süren işlemler (API istekleri, dosya okuma) arka planda çalışırken, uygulama donmaz ve yanıt verir kalmaya devam eder.',
    sections: [
      {
        title: 'Callback Fonksiyonlar',
        content: '• İşlem bitince çalışacak fonksiyon\n• Eski yöntem, "callback hell" problemi\n• İç içe callback\'ler kodu karıştırır\n\nfunction getData(callback) {\n  setTimeout(() => {\n    callback("Veri");\n  }, 1000);\n}\n\ngetData(data => console.log(data));'
      },
      {
        title: 'Promise Yapısı',
        content: '• Asenkron işlemlerin modern yöntemi\n• 3 durum: pending, fulfilled, rejected\n• .then() ile başarılı sonucu yakala\n• .catch() ile hatayı yakala\n\nlet promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("Tamam"), 1000);\n});\n\npromise.then(result => console.log(result));'
      },
      {
        title: 'Async/Await (En Modern)',
        content: '• Promise\'leri daha okunabilir yazmanın yolu\n• async keyword ile fonksiyon tanımlanır\n• await ile Promise sonuç beklenir\n• Senkron kod gibi görünür, asenkron çalışır\n\nasync function getData() {\n  let result = await promise;\n  console.log(result);\n}'
      }
    ],
    exampleCode: `// Callback
function fetchData(callback) {
    setTimeout(() => {
        callback("Veri geldi");
    }, 2000);
}

fetchData((data) => {
    console.log(data);
});

// Promise
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Başarılı!");
    }, 1000);
});

promise.then(result => {
    console.log(result);
});`,
    challenge: {
      instructions: 'Promise oluştur ve then ile sonucu yakala.',
      starterCode: `let p = new ___BLANK1___((resolve) => {
    resolve("Tamam");
});

p.___BLANK2___(result => console.log(result));`,
      solution: `let p = new Promise((resolve) => {
    resolve("Tamam");
});

p.then(result => console.log(result));`,
      blanks: ['Promise', 'then'],
      expectedOutput: 'Tamam'
    },
    xpReward: 20
  },

  // 27. Fetch API
  {
    id: 'js-fetch',
    title: 'Fetch API (Veri Çekme)',
    order: 27,
    category: 'JavaScript',
    description: 'Fetch ile API\'lerden veri çekme.',
    detailedContent: 'Fetch API, sunuculardan veri almak ve göndermek için kullanılan modern JavaScript metodudur. Promise tabanlıdır ve REST API\'lerle iletişim kurmak için en yaygın yöntemdir.',
    sections: [
      {
        title: 'Temel Fetch Kullanımı',
        content: '• fetch(url) ile istek atılır\n• Promise döndürür\n• .then() ile response alınır\n• response.json() ile veri parse edilir\n\nfetch("https://api.example.com/data")\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));'
      },
      {
        title: 'Async/Await ile Fetch',
        content: '• Daha okunabilir kod yapısı\n• await ile response ve veriyi bekle\n• try-catch ile hata yönetimi\n\nasync function getData() {\n  try {\n    let res = await fetch(url);\n    let data = await res.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}'
      },
      {
        title: 'POST İsteği ve Options',
        content: '• İkinci parametre: options objesi\n• method: "GET", "POST", "PUT", "DELETE"\n• headers: İstek başlıkları\n• body: Gönderilecek veri (JSON.stringify ile)\n\nfetch(url, {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "Ahmet" })\n})'
      }
    ],
    exampleCode: `// GET isteği
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Hata:', error);
    });

// Async/Await ile
async function getUsers() {
    try {
        let response = await fetch('https://api.example.com/users');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Hata:', error);
    }
}`,
    challenge: {
      instructions: 'Fetch ile API\'den veri çek.',
      starterCode: `___BLANK1___('https://api.example.com/data')
    .___BLANK2___(response => response.json())
    .then(data => console.log(data));`,
      solution: `fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data));`,
      blanks: ['fetch', 'then'],
      expectedOutput: 'API\'den gelen veriler konsola yazdırılır'
    },
    xpReward: 20
  },

  // 28. Project: Todo List
  {
    id: 'js-project-todo',
    title: 'Proje: To-Do List',
    order: 28,
    category: 'JavaScript',
    description: 'Yapılacaklar listesi projesi - tüm öğrendiklerini kullan!',
    detailedContent: 'To-Do List projesi, JavaScript bilgilerinizi birleştirerek gerçek bir uygulama yapmanızı sağlar. DOM manipulasyonu, event handling, array metotları ve localStorage kullanımını pratik edeceksiniz.',
    sections: [
      {
        title: 'Temel Özellikler',
        content: '• Yeni todo ekleme (input ve buton)\n• Todo listesini görme\n• Todo silme (her item\'da sil butonu)\n• Todo tamamlama (checkbox veya tıklama)\n• localStorage ile verileri saklama\n\nGereken HTML elementleri: input, button, ul/li'
      },
      {
        title: 'Kullanılacak Teknikler',
        content: '• Array: todos dizisinde verileri tutma\n• forEach/map: Listeyi render etme\n• filter: Todo silme işlemi\n• push: Yeni todo ekleme\n• addEventListener: Buton tıklama\n• DOM: createElement, appendChild\n• localStorage: Verileri kalıcı saklama'
      },
      {
        title: 'Gelişmiş Özellikler',
        content: '• Edit (düzenleme) özelliği\n• Filtreleme: Tümü / Aktif / Tamamlanmış\n• Tümünü temizle butonu\n• Kalan todo sayısı gösterme\n• Sürükle-bırak ile sıralama'
      }
    ],
    exampleCode: `// Todo List Projesi
let todos = [];

function addTodo(text) {
    todos.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    let list = document.querySelector('#todo-list');
    list.innerHTML = '';
    
    todos.forEach(todo => {
        let li = document.createElement('li');
        li.textContent = todo.text;
        list.appendChild(li);
    });
}`,
    challenge: {
      instructions: 'Todo ekle ve listele.',
      starterCode: `let todos = [];

function addTodo(text) {
    todos.___BLANK1___({ text: text });
}

todos.forEach(todo => {
    console.log(todo.___BLANK2___);
});`,
      solution: `let todos = [];

function addTodo(text) {
    todos.push({ text: text });
}

todos.forEach(todo => {
    console.log(todo.text);
});`,
      blanks: ['push', 'text'],
      expectedOutput: 'Fonksiyonlar tanımlandı (todo ekleme ve listeleme)'
    },
    xpReward: 25
  },

  // 29. Project: Calculator
  {
    id: 'js-project-calculator',
    title: 'Proje: Hesap Makinesi',
    order: 29,
    category: 'JavaScript',
    description: 'Basit hesap makinesi projesi.',
    detailedContent: 'Hesap makinesi projesi, matematiksel işlemler ve kullanıcı arayüzü etkileşimini birleştirir. Event listener\'lar, switch-case yapıları ve fonksiyon kullanımını pratiğe dökersiniz.',
    sections: [
      {
        title: 'Temel Özellikler ve Yapı',
        content: '• Dört temel işlem: +, -, *, /\n• Display (ekran) alanı\n• Rakam butonları (0-9)\n• İşlem butonları\n• Eşittir butonu\n• Temizle (clear) butonu\n\nHTML: Butonlar için grid layout kullanılabilir'
      },
      {
        title: 'Kullanılacak Teknikler',
        content: '• Event delegation: Tüm butonlar için tek listener\n• switch-case: İşlem seçimi\n• State management: Mevcut sayı, operator, önceki sayı\n• String manipulasyon: Display güncelleme\n• Error handling: Sıfıra bölme kontrolü\n\nlet currentValue = "";\nlet operator = null;\nlet previousValue = "";'
      }
    ],
    exampleCode: `// Hesap Makinesi
function calculate(num1, operator, num2) {
    switch(operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Hata';
        default:
            return 'Geçersiz işlem';
    }
}

console.log(calculate(10, '+', 5)); // 15
console.log(calculate(10, '*', 5)); // 50`,
    challenge: {
      instructions: 'Calculator fonksiyonunu tamamla.',
      starterCode: `function calc(a, op, b) {
    if (op === '+') ___BLANK1___ a + b;
    if (op === '-') return a ___BLANK2___ b;
}`,
      solution: `function calc(a, op, b) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
}`,
      blanks: ['return', '-'],
      expectedOutput: 'Hesap makinesi fonksiyonu tanımlandı'
    },
    xpReward: 25
  },

  // 30. Project: Currency Converter
  {
    id: 'js-project-currency',
    title: 'Proje: Döviz Çevirici',
    order: 30,
    category: 'JavaScript',
    description: 'Döviz çevirme uygulaması - API kullanımı.',
    detailedContent: 'Döviz çevirici projesi, gerçek API ile çalışmanızı sağlar. Fetch API, async/await, JSON parse ve dinamik UI güncelleme becerilerinizi geliştireceksiniz.',
    sections: [
      {
        title: 'Temel Özellikler',
        content: '• Miktar giriş alanı (input)\n• Kaynak para birimi seçimi (dropdown)\n• Hedef para birimi seçimi\n• Çevir butonu\n• Sonuç gösterme alanı\n• Yüklenme animasyonu (loading)\n\nAPI: exchangerate-api.com veya fixer.io'
      },
      {
        title: 'API Entegrasyonu',
        content: '• Fetch ile API isteği\n• Async/await kullanımı\n• Response\'u JSON\'a çevirme\n• Döviz kurlarını alma\n• Try-catch ile hata yönetimi\n\nasync function getRates() {\n  let res = await fetch(apiURL);\n  let data = await res.json();\n  return data.rates;\n}'
      },
      {
        title: 'Hesaplama ve Görüntüleme',
        content: '• Miktar * kur = sonuç\n• toFixed() ile ondalık basamak sınırlama\n• DOM ile sonuç gösterme\n• Para birimi sembolleri ekleme\n• Hata durumunda kullanıcıyı bilgilendirme\n\nlet result = (amount * rate).toFixed(2);\nresultElement.textContent = `${result} ${toCurrency}`;'
      }
    ],
    exampleCode: `// Döviz Çevirici
async function convertCurrency(amount, from, to) {
    try {
        let response = await fetch(\`https://api.exchangerate.com/latest/\${from}\`);
        let data = await response.json();
        let rate = data.rates[to];
        let result = amount * rate;
        return result.toFixed(2);
    } catch (error) {
        console.error('Çeviri hatası:', error);
        return null;
    }
}

// Kullanım
convertCurrency(100, 'USD', 'EUR')
    .then(result => console.log(result));`,
    challenge: {
      instructions: 'Async fonksiyon ile API\'den veri çek.',
      starterCode: `___BLANK1___ function getData() {
    let res = ___BLANK2___ fetch(url);
    let data = await res.json();
    return data;
}`,
      solution: `async function getData() {
    let res = await fetch(url);
    let data = await res.json();
    return data;
}`,
      blanks: ['async', 'await'],
      expectedOutput: 'Async fonksiyon tanımlandı (API\'den veri çeker)'
    },
    xpReward: 30
  }
];

// JavaScript Final Exam
export const javascriptFinalExam: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'let ve const arasındaki temel fark nedir?',
    options: ['Fark yoktur', 'const değiştirilemez', 'let global scope\'ta çalışır', 'const daha hızlıdır'],
    correctAnswer: 1,
    explanation: 'const ile tanımlanan değişkenler yeniden atanamaz (immutable).'
  },
  {
    id: 'q2',
    question: 'typeof "hello" sonucu nedir?',
    options: ['text', 'string', 'str', 'String'],
    correctAnswer: 1,
    explanation: 'typeof operatörü string değerler için "string" döner.'
  },
  {
    id: 'q3',
    question: 'Array\'e eleman eklemek için hangi metot kullanılır?',
    options: ['add()', 'push()', 'append()', 'insert()'],
    correctAnswer: 1,
    explanation: 'push() metodu array\'in sonuna eleman ekler.'
  },
  {
    id: 'q4',
    question: 'Arrow function için doğru syntax hangisidir?',
    options: ['function => {}', '() => {}', '=> function()', '-> {}'],
    correctAnswer: 1,
    explanation: 'Arrow function syntax: (params) => { body }'
  },
  {
    id: 'q5',
    question: 'DOM\'da element seçmek için modern yöntem hangisidir?',
    options: ['getElement()', 'querySelector()', 'findElement()', 'selectElement()'],
    correctAnswer: 1,
    explanation: 'querySelector() modern ve esnek element seçim metodudur.'
  },
  {
    id: 'q6',
    question: 'Event listener eklemek için hangi metot kullanılır?',
    options: ['onClick()', 'addEvent()', 'addEventListener()', 'on()'],
    correctAnswer: 2,
    explanation: 'addEventListener() ile elementlere olay dinleyicisi eklenir.'
  },
  {
    id: 'q7',
    question: 'LocalStorage\'da veri saklamak için hangi metot kullanılır?',
    options: ['save()', 'store()', 'setItem()', 'put()'],
    correctAnswer: 2,
    explanation: 'setItem(key, value) ile localStorage\'a veri kaydedilir.'
  },
  {
    id: 'q8',
    question: 'JSON.parse() ne işe yarar?',
    options: [
      'Object\'i string\'e çevirir',
      'String\'i object\'e çevirir',
      'Array oluşturur',
      'Veri siler'
    ],
    correctAnswer: 1,
    explanation: 'JSON.parse() JSON string\'ini JavaScript object\'ine çevirir.'
  },
  {
    id: 'q9',
    question: 'setTimeout() fonksiyonu ne yapar?',
    options: [
      'Sürekli tekrarlar',
      'Belirli süre sonra bir kez çalışır',
      'Zamanı durdurur',
      'Hata fırlatır'
    ],
    correctAnswer: 1,
    explanation: 'setTimeout() belirtilen süre sonra bir kez çalışır.'
  },
  {
    id: 'q10',
    question: 'Asenkron işlemler için hangi yapı kullanılır?',
    options: ['sync/await', 'async/await', 'wait/async', 'promise/async'],
    correctAnswer: 1,
    explanation: 'async/await asenkron işlemleri yönetmek için kullanılır.'
  },
  {
    id: 'q11',
    question: 'this keyword\'ü ne anlama gelir?',
    options: [
      'Global değişken',
      'Bulunduğu context\'i işaret eder',
      'Yeni object oluşturur',
      'Fonksiyon parametresi'
    ],
    correctAnswer: 1,
    explanation: 'this, içinde bulunduğu context\'i (object, function vb.) işaret eder.'
  },
  {
    id: 'q12',
    question: 'Class\'tan instance oluşturmak için hangi keyword kullanılır?',
    options: ['create', 'new', 'instance', 'make'],
    correctAnswer: 1,
    explanation: 'new keyword\'ü ile class\'tan yeni instance oluşturulur.'
  },
  {
    id: 'q13',
    question: 'Try-catch bloğu ne için kullanılır?',
    options: ['Döngü oluşturmak', 'Hata yakalamak', 'Fonksiyon tanımlamak', 'Değişken saklamak'],
    correctAnswer: 1,
    explanation: 'try-catch hata yönetimi (error handling) için kullanılır.'
  },
  {
    id: 'q14',
    question: 'Fetch API ne işe yarar?',
    options: [
      'Veri siler',
      'HTTP istekleri yapar',
      'DOM manipülasyonu',
      'Event dinler'
    ],
    correctAnswer: 1,
    explanation: 'Fetch API ile HTTP istekleri yapılır ve API\'lerden veri çekilir.'
  },
  {
    id: 'q15',
    question: 'Array.map() metodu ne döner?',
    options: [
      'İlk elemanı',
      'Yeni bir array',
      'Boolean değer',
      'Object'
    ],
    correctAnswer: 1,
    explanation: 'map() her eleman için işlem yapar ve yeni bir array döner.'
  }
];

// ==================== REACT LESSONS ====================
export const reactLessons: LessonContent[] = [
  // 1. React Nedir?
  {
    id: 'react-intro',
    title: 'React Nedir ve Kurulum',
    order: 1,
    category: 'React',
    description: 'React, kullanıcı arayüzleri oluşturmak için Facebook tarafından geliştirilen popüler bir JavaScript kütüphanesidir. Component tabanlı çalışır ve sanal DOM kullanır.',
    detailedContent: 'React, modern web uygulamaları geliştirmek için kullanılan güçlü bir JavaScript kütüphanesidir. Component tabanlı yapısı sayesinde kodunuz daha organize ve yeniden kullanılabilir olur.',
    sections: [
      {
        title: 'React Nedir?',
        content: '• Facebook tarafından geliştirilen UI kütüphanesi\n• Component tabanlı yapı\n• Sanal DOM kullanımı (hızlı güncelleme)\n• Tek yönlü veri akışı (One-way data flow)\n• Geniş ekosistem ve topluluk'
      },
      {
        title: 'React Kurulumu',
        content: 'Vite ile hızlı kurulum:\nnpm create vite@latest my-app -- --template react\n\nVeya Create React App:\nnpx create-react-app my-app\n\nProje çalıştırma: npm run dev veya npm start'
      },
      {
        title: 'İlk Component',
        content: 'React\'te her şey componentlerden oluşur. Component, kullanıcı arayüzünün bir parçasını tanımlayan bir JavaScript fonksiyonudur.'
      }
    ],
    exampleCode: `// React projesi oluşturma (Vite ile)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

// İlk React komponenti
function App() {
  return (
    <div>
      <h1>Merhaba React!</h1>
      <p>İlk React uygulamam</p>
    </div>
  );
}

export default App;`,
    challenge: {
      instructions: 'Basit bir React component oluştur ve export et.',
      starterCode: `___BLANK1___ Welcome() {
  return (
    <h1>Hoş Geldiniz</h1>
  );
}

___BLANK2___ default Welcome;`,
      solution: `function Welcome() {
  return (
    <h1>Hoş Geldiniz</h1>
  );
}

export default Welcome;`,
      blanks: ['function', 'export'],
      expectedOutput: '✓ Component başarıyla oluşturuldu ve "Hoş Geldiniz" mesajı gösteriliyor'
    },
    xpReward: 10
  },

  // 2. JSX Yapısı
  {
    id: 'react-jsx',
    title: 'JSX Yapısı',
    order: 2,
    category: 'React',
    description: 'JSX (JavaScript XML), React\'te HTML benzeri kod yazmamızı sağlar. JavaScript içinde XML/HTML yazabilirsiniz.',
    detailedContent: 'JSX, JavaScript içinde HTML yazmamızı sağlayan React\'in özel sözdizimidir. Babel tarafından JavaScript\'e dönüştürülür.',
    sections: [
      {
        title: 'JSX Nedir?',
        content: 'JSX, JavaScript içinde HTML benzeri kod yazmanızı sağlar:\n\nreturn <h1>Merhaba</h1>;\n\nBu kod Babel ile şu hale dönüşür:\nreturn React.createElement("h1", null, "Merhaba");'
      },
      {
        title: 'JSX Kuralları',
        content: '• Tek kök element olmalı (veya Fragment <>)\n• className kullanılır (class değil)\n• htmlFor kullanılır (for değil)\n• Kapanış etiketleri zorunlu: <img />\n• Süslü parantez {} ile JS ifadeleri'
      },
      {
        title: 'JavaScript İfadeleri',
        content: 'JSX içinde {} ile JavaScript yazabilirsiniz:\n\nconst name = "Ali";\nreturn <h1>Merhaba {name}</h1>;\n\nİfade: {2 + 2}, {user.name}, {isActive && "Aktif"}'
      }
    ],
    exampleCode: `// JSX Kullanımı
function Greeting() {
  const name = "Ahmet";
  const isLoggedIn = true;
  
  return (
    <div className="container">
      <h1>Merhaba {name}!</h1>
      <p>2 + 2 = {2 + 2}</p>
      {isLoggedIn && <button>Çıkış Yap</button>}
    </div>
  );
}

// Not: className kullanılır (class değil)
// Süslü parantez {} ile JS ifadeleri yazılır`,
    challenge: {
      instructions: 'JSX içinde değişken ve ifade kullan.',
      starterCode: `function Card() {
  const title = "React Dersi";
  
  return (
    <div>
      <h2>___BLANK1___</h2>
      <p>Toplam: {10 ___BLANK2___ 5}</p>
    </div>
  );
}`,
      solution: `function Card() {
  const title = "React Dersi";
  
  return (
    <div>
      <h2>{title}</h2>
      <p>Toplam: {10 + 5}</p>
    </div>
  );
}`,
      blanks: ['{title}', '+'],
      expectedOutput: '✓ JSX içinde değişken kullanıldı: "React Dersi" başlığı ve 15 toplamı gösteriliyor'
    },
    xpReward: 10
  },

  // 3. Component Mantığı
  {
    id: 'react-components',
    title: 'Component Mantığı',
    order: 3,
    category: 'React',
    description: 'React uygulamaları componentlerden (bileşenlerden) oluşur. Her component bağımsız, yeniden kullanılabilir bir kod parçasıdır.',
    detailedContent: 'Componentler, React uygulamalarının yapı taşlarıdır. Her component kendi mantığına ve görünümüne sahiptir.',
    sections: [
      {
        title: 'Component Nedir?',
        content: 'Component, kullanıcı arayüzünün bir parçasını tanımlayan bağımsız, yeniden kullanılabilir kod bloğudur.\n\nÖrneğin: Header, Footer, Button, Card gibi.'
      },
      {
        title: 'Function Component',
        content: 'Modern React\'te function componentler kullanılır:\n\nfunction MyComponent() {\n  return <div>Merhaba</div>;\n}\n\nComponent isimleri büyük harfle başlamalıdır.'
      },
      {
        title: 'Component Kullanımı',
        content: 'Component kullanımı HTML etiketi gibidir:\n<MyComponent />\n\nveya\n<MyComponent></MyComponent>\n\nBir component başka componentleri içerebilir.'
      }
    ],
    exampleCode: `// Function Component
function Header() {
  return <h1>Başlık</h1>;
}

function Content() {
  return <p>İçerik burada</p>;
}

function Footer() {
  return <footer>Alt bilgi</footer>;
}

// Ana component içinde kullanım
function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}`,
    challenge: {
      instructions: 'İki ayrı component oluştur ve birinde diğerini kullan.',
      starterCode: `function Title() {
  return <h1>Başlık</h1>;
}

function Page() {
  return (
    <div>
      ___BLANK1___ />
      <p>Sayfa içeriği</p>
    </div>
  );
}`,
      solution: `function Title() {
  return <h1>Başlık</h1>;
}

function Page() {
  return (
    <div>
      <Title />
      <p>Sayfa içeriği</p>
    </div>
  );
}`,
      blanks: ['<Title'],
      expectedOutput: '✓ Title component\'i Page içinde başarıyla kullanıldı'
    },
    xpReward: 15
  },

  // 4. Props Nedir?
  {
    id: 'react-props',
    title: 'Props Nedir?',
    order: 4,
    category: 'React',
    description: 'Props (properties), componentler arası veri aktarımını sağlar. Parent componentten child componente veri gönderilir.',
    detailedContent: 'Props, React\'te componentler arasında veri aktarımını sağlayan mekanizmadır. Sadece yukarıdan aşağıya (parent to child) akış gerçekleşir.',
    sections: [
      {
        title: 'Props Kavramı',
        content: 'Props, HTML attribute\'ları gibi çalışır:\n\n<Greeting name="Ali" />\n\nComponent içinde: props.name şeklinde erişilir.\n\nProps değiştirilemez (immutable).'
      },
      {
        title: 'Props Kullanımı',
        content: 'function MyComponent(props) {\n  return <p>{props.title}</p>;\n}\n\nKullanım: <MyComponent title="Başlık" />'
      },
      {
        title: 'Destructuring ile Props',
        content: 'Daha temiz yazım için destructuring:\n\nfunction MyComponent({ title, content }) {\n  return <div>{title} - {content}</div>;\n}'
      }
    ],
    exampleCode: `// Props ile veri gönderme
function Greeting(props) {
  return <h1>Merhaba {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="Ahmet" />
      <Greeting name="Ayşe" />
      <Greeting name="Mehmet" />
    </div>
  );
}

// Destructuring ile
function Greeting({ name, age }) {
  return <h1>Merhaba {name}, {age} yaşında</h1>;
}`,
    challenge: {
      instructions: 'Props alan bir component oluştur.',
      starterCode: `function UserCard(___BLANK1___) {
  return (
    <div>
      <h2>{props.___BLANK2___}</h2>
      <p>Yaş: {props.age}</p>
    </div>
  );
}`,
      solution: `function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Yaş: {props.age}</p>
    </div>
  );
}`,
      blanks: ['props', 'name'],
      expectedOutput: '✓ Props başarıyla alındı: kullanıcı adı ve yaşı gösterilecek'
    },
    xpReward: 15
  },

  // 5. Props ile Veri Aktarımı
  {
    id: 'react-props-advanced',
    title: 'Props ile Veri Aktarımı',
    order: 5,
    category: 'React',
    description: 'Props ile string, number, boolean, array, object ve function gönderebilirsiniz. Children prop ile içerik aktarımı yapılır.',
    detailedContent: 'Props sadece string değil, her tür JavaScript verisini taşıyabilir. Children özel bir prop olup component etiketleri arasındaki içeriği temsil eder.',
    sections: [
      {
        title: 'Farklı Veri Tipleri',
        content: 'String: name="Ali"\nNumber: age={25}\nBoolean: active={true}\nArray: items={[1,2,3]}\nObject: user={{name: "Ali"}}\nFunction: onClick={handleClick}\n\nSüslü parantez {} içinde gönderilir (string hariç).'
      },
      {
        title: 'Children Prop',
        content: 'Component etiketleri arasındaki içerik:\n\n<Card>\n  <h1>Başlık</h1>\n</Card>\n\nComponent içinde: {children} ile erişilir.'
      },
      {
        title: 'Default Props',
        content: 'Varsayılan değerler atama:\n\nfunction Button({ text = "Tıkla", type = "button" }) {\n  return <button type={type}>{text}</button>;\n}'
      }
    ],
    exampleCode: `// Farklı türde props
function Button({ text, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

// Object ve array props
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Children prop
function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>
  <h2>Başlık</h2>
  <p>İçerik</p>
</Card>`,
    challenge: {
      instructions: 'Array prop alan ve map ile render eden component yaz.',
      starterCode: `function List({ items }) {
  return (
    <ul>
      {items.___BLANK1___(item => (
        <li ___BLANK2___={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
      solution: `function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
      blanks: ['map', 'key'],
      expectedOutput: '✓ Liste başarıyla render edildi: her eleman benzersiz key ile gösterilecek'
    },
    xpReward: 15
  },

  // 6. State Mantığı (useState)
  {
    id: 'react-usestate',
    title: 'State Mantığı (useState)',
    order: 6,
    category: 'React',
    description: 'useState hook\'u ile componentlerde dinamik veri yönetimi yapılır. State değişince component yeniden render olur.',
    detailedContent: 'useState, React\'in en temel hook\'udur. Componentlerin dinamik veri tutmasını ve bu veri değiştiğinde yeniden render olmalarını sağlar.',
    sections: [
      {
        title: 'useState Nedir?',
        content: 'State, componentin belleğinde tutulan değişken verilerdir:\n\nconst [state, setState] = useState(initialValue);\n\n• state: Mevcut değer\n• setState: Güncelleme fonksiyonu\n• initialValue: Başlangıç değeri'
      },
      {
        title: 'State Güncelleme',
        content: 'State doğrudan değiştirilmez:\n\n// Yanlış: count = 5\n// Doğru: setCount(5)\n\nVeya önceki değeri kullanarak:\nsetCount(prev => prev + 1)'
      },
      {
        title: 'State ve Render',
        content: 'setState çağrılınca component yeniden render olur. Bu sayede UI güncellenir.\n\nBirden fazla state olabilir:\nconst [name, setName] = useState("");\nconst [age, setAge] = useState(0);'
      }
    ],
    exampleCode: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Sayaç: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Artır
      </button>
      <button onClick={() => setCount(count - 1)}>
        Azalt
      </button>
      <button onClick={() => setCount(0)}>
        Sıfırla
      </button>
    </div>
  );
}`,
    challenge: {
      instructions: 'useState ile state tanımla ve güncelle.',
      starterCode: `import { useState } from 'react';

function Toggle() {
  const [isOn, setIsOn] = ___BLANK1___(false);
  
  return (
    <button onClick={() => ___BLANK2___(!isOn)}>
      {isOn ? 'Açık' : 'Kapalı'}
    </button>
  );
}`,
      solution: `import { useState } from 'react';

function Toggle() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'Açık' : 'Kapalı'}
    </button>
  );
}`,
      blanks: ['useState', 'setIsOn'],
      expectedOutput: '✓ State başarıyla oluşturuldu: buton Açık/Kapalı arasında geçiş yapacak'
    },
    xpReward: 20
  },

  // 7. Event Handling
  {
    id: 'react-events',
    title: 'Event Handling (Olay Yönetimi)',
    order: 7,
    category: 'React',
    description: 'React\'te onClick, onChange, onSubmit gibi eventler camelCase yazılır ve fonksiyon referansı verilir.',
    detailedContent: 'React\'te event handling, tarayıcı eventlerine benzer şekilde çalışır ancak camelCase isimlendirme ve farklı davranışlar vardır.',
    sections: [
      {
        title: 'Event İsimlendirme',
        content: 'HTML: onclick, onchange\nReact: onClick, onChange (camelCase)\n\nFonksiyon referansı verilir, çağrılmaz:\n• Doğru: onClick={handleClick}\n• Yanlış: onClick={handleClick()}'
      },
      {
        title: 'Event Parametresi',
        content: 'Event fonksiyonu otomatik event objesi alır:\n\nconst handleClick = (e) => {\n  e.preventDefault(); // Default davranışı engelle\n  e.target.value; // Element değeri\n};'
      },
      {
        title: 'Yaygın Eventler',
        content: '• onClick: Tıklama\n• onChange: Input değişimi\n• onSubmit: Form gönderimi\n• onMouseEnter: Mouse üzerine gelme\n• onKeyDown: Tuşa basılması'
      }
    ],
    exampleCode: `function EventDemo() {
  const [text, setText] = useState('');
  
  const handleClick = () => {
    alert('Butona tıklandı!');
  };
  
  const handleChange = (e) => {
    setText(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form gönderildi:', text);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={text} 
        onChange={handleChange} 
      />
      <button type="submit" onClick={handleClick}>
        Gönder
      </button>
    </form>
  );
}`,
    challenge: {
      instructions: 'onClick eventi ile fonksiyon çağır.',
      starterCode: `function App() {
  const handleClick = () => {
    alert('Tıklandı');
  };
  
  return (
    <button ___BLANK1___={handleClick}>
      Tıkla
    </button>
  );
}`,
      solution: `function App() {
  const handleClick = () => {
    alert('Tıklandı');
  };
  
  return (
    <button onClick={handleClick}>
      Tıkla
    </button>
  );
}`,
      blanks: ['onClick'],
      expectedOutput: '✓ Event handler bağlandı: butona tıklanınca alert gösterilecek'
    },
    xpReward: 15
  },

  // 8. Koşullu Render
  {
    id: 'react-conditional',
    title: 'Koşullu Render (Conditional Rendering)',
    order: 8,
    category: 'React',
    description: 'React\'te if-else, ternary operator ve && operatörü ile koşullu render yapılır.',
    detailedContent: 'Koşullu render, belirli koşullara göre farklı içerikler göstermeyi sağlar. React\'te bunun için JavaScript\'in koşul yapıları kullanılır.',
    sections: [
      {
        title: 'Ternary Operator',
        content: 'En yaygın yöntem, kısa ve okunabilir:\n\n{isLoggedIn ? <Dashboard /> : <Login />}\n\nKoşul doğruysa ilk, yanlışsa ikinci eleman render edilir.'
      },
      {
        title: '&& Operatörü',
        content: 'Sadece true durumda render için:\n\n{hasMessages && <Notification />}\n\nhasMessages true ise Notification render edilir, false ise hiçbir şey görünmez.'
      },
      {
        title: 'If-Else ile',
        content: 'return öncesi if-else kullanabilirsiniz:\n\nif (loading) return <Spinner />;\nif (error) return <Error />;\nreturn <Content />;'
      }
    ],
    exampleCode: `function LoginButton({ isLoggedIn }) {
  // Ternary operator
  return (
    <div>
      {isLoggedIn ? (
        <button>Çıkış Yap</button>
      ) : (
        <button>Giriş Yap</button>
      )}
    </div>
  );
}

function Notification({ hasMessages }) {
  // && operatörü
  return (
    <div>
      {hasMessages && <p>Yeni mesajınız var!</p>}
    </div>
  );
}

// If-else ile
function Welcome({ user }) {
  if (user) {
    return <h1>Hoş geldin {user.name}</h1>;
  }
  return <h1>Lütfen giriş yap</h1>;
}`,
    challenge: {
      instructions: 'Ternary operator ile koşullu render yap.',
      starterCode: `function Status({ isActive }) {
  return (
    <div>
      {isActive ___BLANK1___ <span>Aktif</span> ___BLANK2___ <span>Pasif</span>}
    </div>
  );
}`,
      solution: `function Status({ isActive }) {
  return (
    <div>
      {isActive ? <span>Aktif</span> : <span>Pasif</span>}
    </div>
  );
}`,
      blanks: ['?', ':'],
      expectedOutput: '✓ Koşullu render başarılı: isActive durumuna göre Aktif veya Pasif gösterilecek'
    },
    xpReward: 15
  },

  // 9. Listeleri Render Etme
  {
    id: 'react-lists',
    title: 'Listeleri Render Etme (Map)',
    order: 9,
    category: 'React',
    description: 'Array.map() ile listeleri render ederken her elemana unique key prop verilmelidir.',
    detailedContent: 'Array verilerini görüntülemek için map() metoduyla her elemanı JSX\'e dönüştürürüz. React, performans için her elemana benzersiz key ister.',
    sections: [
      {
        title: 'Map ile Render',
        content: 'Array.map() ile liste render:\n\nconst items = [1, 2, 3];\n{items.map(item => <li>{item}</li>)}\n\nHer eleman JSX\'e dönüştürülür.'
      },
      {
        title: 'Key Prop',
        content: 'Her elemana unique key gereklidir:\n\n{users.map(user => (\n  <div key={user.id}>{user.name}</div>\n))}\n\nKey, React\'in değişiklikleri izlemesini sağlar. Index kullanmak önerilmez.'
      },
      {
        title: 'Nested Lists',
        content: 'İç içe listeler de aynı prensibi kullanır:\n\n{categories.map(cat => (\n  <div key={cat.id}>\n    {cat.items.map(item => (\n      <p key={item.id}>{item.name}</p>\n    ))}\n  </div>\n))}'
      }
    ],
    exampleCode: `function TodoList() {
  const todos = [
    { id: 1, text: 'React öğren' },
    { id: 2, text: 'Proje yap' },
    { id: 3, text: 'Deploy et' }
  ];
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Index kullanımı (son çare)
function List({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}`,
    challenge: {
      instructions: 'Map ile liste render et ve key prop ekle.',
      starterCode: `function UserList({ users }) {
  return (
    <ul>
      {users.___BLANK1___(user => (
        <li ___BLANK2___={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
      solution: `function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
      blanks: ['map', 'key'],
      expectedOutput: '✓ Kullanıcı listesi render edildi: her kullanıcı unique key ile listelenecek'
    },
    xpReward: 15
  },

  // 10. Form Yönetimi
  {
    id: 'react-forms',
    title: 'Form Yönetimi',
    order: 10,
    category: 'React',
    description: 'React\'te formlar controlled components olarak yönetilir. Input değerleri state ile kontrol edilir.',
    detailedContent: 'React\'te form yönetimi, input değerlerini state\'te tutup onChange ile güncelleyerek yapılır. Bu sayede form verileri her zaman kontrol altındadır.',
    sections: [
      {
        title: 'Controlled Components',
        content: 'Input değerleri state\'te tutulur:\n\nconst [text, setText] = useState("");\n<input value={text} onChange={e => setText(e.target.value)} />\n\nReact input\'un değerini kontrol eder.'
      },
      {
        title: 'Form Submit',
        content: 'Form gönderimini kontrol etme:\n\nconst handleSubmit = (e) => {\n  e.preventDefault(); // Sayfa yenilenmesini engelle\n  // Form verilerini işle\n};\n\n<form onSubmit={handleSubmit}>'
      },
      {
        title: 'Çoklu Input Yönetimi',
        content: 'Birden fazla input için object state:\n\nconst [form, setForm] = useState({ name: "", email: "" });\n\nconst handleChange = (e) => {\n  setForm({ ...form, [e.target.name]: e.target.value });\n};'
      }
    ],
    exampleCode: `function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Şifre"
      />
      <button type="submit">Giriş</button>
    </form>
  );
}`,
    challenge: {
      instructions: 'Controlled input oluştur.',
      starterCode: `function Input() {
  const [text, setText] = useState('');
  
  return (
    <input
      ___BLANK1___={text}
      ___BLANK2___={(e) => setText(e.target.value)}
    />
  );
}`,
      solution: `function Input() {
  const [text, setText] = useState('');
  
  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}`,
      blanks: ['value', 'onChange'],
      expectedOutput: '✓ Controlled input oluşturuldu: yazılan her karakter state\'e kaydediliyor'
    },
    xpReward: 20
  },

  // 11. Component Yaşam Döngüsü
  {
    id: 'react-lifecycle',
    title: 'Component Yaşam Döngüsü',
    order: 11,
    category: 'React',
    description: 'React componentleri mount (oluşturulma), update (güncelleme) ve unmount (kaldırılma) aşamalarından geçer.',
    detailedContent: 'Component lifecycle, componentin doğumundan ölümüne kadar geçen süreçteki farklı aşamalardır. useEffect ile bu aşamalar kontrol edilir.',
    sections: [
      {
        title: 'Lifecycle Aşamaları',
        content: '1. Mount: Component DOM\'a eklenir\n2. Update: Props veya state değişir\n3. Unmount: Component DOM\'dan kaldırılır\n\nFunction componentlerde useEffect ile yönetilir.'
      },
      {
        title: 'Mount ve Unmount',
        content: 'useEffect ile mount/unmount:\n\nuseEffect(() => {\n  console.log("Mount");\n  return () => console.log("Unmount");\n}, []); // Boş array = sadece mount/unmount'
      },
      {
        title: 'Update Lifecycle',
        content: 'Belirli değişkenleri izleme:\n\nuseEffect(() => {\n  console.log("Count değişti");\n}, [count]); // count değişince çalışır'
      }
    ],
    exampleCode: `// Function component lifecycle (useEffect ile)
import { useState, useEffect } from 'react';

function LifecycleDemo() {
  const [count, setCount] = useState(0);
  
  // Mount - Component ilk oluştuğunda
  useEffect(() => {
    console.log('Component mount oldu');
    
    // Unmount - Component kaldırıldığında
    return () => {
      console.log('Component unmount oldu');
    };
  }, []); // Boş array = sadece mount/unmount
  
  // Update - count değiştiğinde
  useEffect(() => {
    console.log('Count güncellendi:', count);
  }, [count]); // Dependency array
  
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
    challenge: {
      instructions: 'useEffect ile mount lifecycle\'ı yönet.',
      starterCode: `import { useEffect } from 'react';

function App() {
  ___BLANK1___(() => {
    console.log('Mount oldu');
  }, ___BLANK2___);
  
  return <div>Uygulama</div>;
}`,
      solution: `import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('Mount oldu');
  }, []);
  
  return <div>Uygulama</div>;
}`,
      blanks: ['useEffect', '[]'],
      expectedOutput: '✓ useEffect kuruldu: component mount olduğunda konsola mesaj yazılacak'
    },
    xpReward: 20
  },

  // 12. useEffect Hook'u
  {
    id: 'react-useeffect',
    title: 'useEffect Hook\'u',
    order: 12,
    category: 'React',
    description: 'useEffect yan etkileri (side effects) yönetir: API çağrıları, subscriptions, manuel DOM değişiklikleri.',
    detailedContent: 'useEffect, React\'te yan etkileri yönetmek için kullanılan temel hook\'tur. Lifecycle metotlarının function component karşılığıdır.',
    sections: [
      {
        title: 'useEffect Nedir?',
        content: 'Yan etkileri (side effects) yönetir:\n• API çağrıları\n• Timer/interval\n• DOM manipulasyonu\n• Event listener ekleme\n\nuseEffect(effect, dependencies)'
      },
      {
        title: 'Dependency Array',
        content: 'İkinci parametre dependency array:\n\n[] (boş): Sadece mount\n[value]: value değişince\nYok: Her render\'da\n\nuseEffect(() => {}, [dep1, dep2])'
      },
      {
        title: 'Cleanup Fonksiyonu',
        content: 'useEffect\'ten return edilen fonksiyon cleanup için kullanılır:\n\nuseEffect(() => {\n  const timer = setInterval(...);\n  return () => clearInterval(timer);\n}, []);'
      }
    ],
    exampleCode: `import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // Yan etki: Timer başlat
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup: Timer durdur
    return () => clearInterval(interval);
  }, []); // Boş dependency = mount/unmount
  
  return <div>Geçen süre: {seconds}s</div>;
}

// Dependency ile
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    fetch(\`/api/search?q=\${query}\`)
      .then(r => r.json())
      .then(setResults);
  }, [query]); // query değişince çalışır
}`,
    challenge: {
      instructions: 'useEffect ile cleanup fonksiyonu yaz.',
      starterCode: `useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  ___BLANK1___ () => {
    clearInterval(timer);
  };
}, []);`,
      solution: `useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  return () => {
    clearInterval(timer);
  };
}, []);`,
      blanks: ['return'],
      expectedOutput: '✓ Cleanup eklendi: timer component unmount olduğunda temizlenecek'
    },
    xpReward: 20
  },

  // 13. API'den Veri Çekme
  {
    id: 'react-fetch',
    title: 'API\'den Veri Çekme',
    order: 13,
    category: 'React',
    description: 'useEffect içinde fetch/axios ile API\'den veri çekilir. Loading ve error state\'leri yönetilir.',
    detailedContent: 'React uygulamalarında API\'lerden veri çekmek için useEffect ve state kombinasyonu kullanılır. Loading, error ve success durumları yönetilmelidir.',
    sections: [
      {
        title: 'Fetch ile Veri Çekme',
        content: 'useEffect içinde fetch kullanımı:\n\nuseEffect(() => {\n  fetch(url)\n    .then(res => res.json())\n    .then(data => setData(data));\n}, []);'
      },
      {
        title: 'Loading ve Error Yönetimi',
        content: 'Üç state gereklidir:\n\nconst [data, setData] = useState(null);\nconst [loading, setLoading] = useState(true);\nconst [error, setError] = useState(null);\n\nKullanıcı deneyimi için önemli!'
      },
      {
        title: 'Async/Await Kullanımı',
        content: 'useEffect içinde async fonksiyon:\n\nuseEffect(() => {\n  const fetchData = async () => {\n    try {\n      const res = await fetch(url);\n      const data = await res.json();\n      setData(data);\n    } catch (err) {\n      setError(err);\n    }\n  };\n  fetchData();\n}, []);'
      }
    ],
    exampleCode: `import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    challenge: {
      instructions: 'Fetch ile veri çek ve state\'e kaydet.',
      starterCode: `useEffect(() => {
  ___BLANK1___('https://api.example.com/data')
    .then(res => res.json())
    .then(data => ___BLANK2___(data));
}, []);`,
      solution: `useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => setData(data));
}, []);`,
      blanks: ['fetch', 'setData'],
      expectedOutput: '✓ API çağrısı başarılı: veri fetch ile çekilip state\'e kaydedilecek'
    },
    xpReward: 25
  },

  // 14. Custom Hooks
  {
    id: 'react-custom-hooks',
    title: 'Custom Hooks',
    order: 14,
    category: 'React',
    description: 'Custom hooks, tekrar kullanılabilir mantık parçaları oluşturmak için kullanılır. "use" ile başlamalıdır.',
    detailedContent: 'Custom hooks, React hook\'larını kullanarak kendi özel hook\'larınızı oluşturmanızı sağlar. Tekrar eden mantığı componentler arasında paylaşmanın en iyi yoludur.',
    sections: [
      {
        title: 'Custom Hook Nedir?',
        content: 'Kendi hook\'unuzu oluşturabilirsiniz:\n\n• "use" ile başlamalı\n• Diğer hook\'ları kullanabilir\n• Tekrar kullanılabilir mantık\n\nfunction useSomething() { ... }'
      },
      {
        title: 'Custom Hook Oluşturma',
        content: 'Örnek custom hook:\n\nfunction useCounter(initial = 0) {\n  const [count, setCount] = useState(initial);\n  const increment = () => setCount(c => c + 1);\n  return { count, increment };\n}'
      },
      {
        title: 'Custom Hook Kullanımı',
        content: 'Normal hook gibi kullanılır:\n\nfunction App() {\n  const { count, increment } = useCounter(5);\n  return <button onClick={increment}>{count}</button>;\n}'
      }
    ],
    exampleCode: `// Custom hook örneği
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}

// Kullanımı
function App() {
  const { data, loading, error } = useFetch('/api/users');
  
  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata!</p>;
  return <div>{data.map(item => <p key={item.id}>{item.name}</p>)}</div>;
}`,
    challenge: {
      instructions: 'Custom hook oluştur ve kullan.',
      starterCode: `function ___BLANK1___LocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  
  ___BLANK2___ { value, setValue };
}`,
      solution: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  
  return { value, setValue };
}`,
      blanks: ['useLocalStorage', 'return'],
      expectedOutput: '✓ Custom hook oluşturuldu: localStorage ile otomatik senkronizasyon sağlandı'
    },
    xpReward: 25
  },

  // 15. Stil Verme (CSS Modules)
  {
    id: 'react-styling',
    title: 'Stil Verme (CSS Modules)',
    order: 15,
    category: 'React',
    description: 'React\'te inline style, CSS modules, styled-components gibi yöntemlerle stil verilebilir.',
    detailedContent: 'React\'te componentlere stil vermenin birden fazla yolu vardır. Her yöntemin kendine özgü avantajları ve kullanım alanları vardır.',
    sections: [
      {
        title: 'Inline Style',
        content: 'JavaScript obje ile stil:\n\nconst style = { color: "red", fontSize: "20px" };\n<div style={style}>Metin</div>\n\nDikkat: camelCase kullanılır (fontSize, backgroundColor)'
      },
      {
        title: 'CSS Modules',
        content: 'Component\'e özel CSS dosyaları:\n\n// Button.module.css\n.primary { color: blue; }\n\nimport styles from "./Button.module.css";\n<button className={styles.primary}>Button</button>'
      },
      {
        title: 'Conditional Styling',
        content: 'Koşula göre stil:\n\nclassName={`btn ${isActive ? "active" : ""}`}\n\nveya\nstyle={{ color: isError ? "red" : "green" }}'
      }
    ],
    exampleCode: `// 1. Inline Style
function InlineStyle() {
  const style = {
    color: 'blue',
    fontSize: '20px',
    backgroundColor: 'lightgray'
  };
  
  return <div style={style}>Merhaba</div>;
}

// 2. CSS Modules (Button.module.css)
import styles from './Button.module.css';

function Button() {
  return <button className={styles.primary}>Tıkla</button>;
}

// 3. Conditional className
function Alert({ type }) {
  return (
    <div className={\`alert \${type === 'error' ? 'error' : 'success'}\`}>
      Mesaj
    </div>
  );
}`,
    challenge: {
      instructions: 'Inline style ve className kullan.',
      starterCode: `function Box() {
  return (
    <div 
      ___BLANK1___={{ backgroundColor: 'red', padding: '10px' }}
      ___BLANK2___="container"
    >
      Kutu
    </div>
  );
}`,
      solution: `function Box() {
  return (
    <div 
      style={{ backgroundColor: 'red', padding: '10px' }}
      className="container"
    >
      Kutu
    </div>
  );
}`,
      blanks: ['style', 'className'],
      expectedOutput: '✓ Stil uygulandı: kırmızı arkaplan ve container class ile kutu gösterilecek'
    },
    xpReward: 15
  },

  // 16. React Router
  {
    id: 'react-router',
    title: 'React Router (Sayfalar Arası Geçiş)',
    order: 16,
    category: 'React',
    description: 'React Router ile SPA (Single Page Application) içinde sayfa yönlendirmeleri yapılır.',
    detailedContent: 'React Router, tek sayfa uygulamalarında (SPA) farklı sayfalar arası geçişi sağlayan kütüphanedir. Sayfa yenilenmeden URL değiştirir.',
    sections: [
      {
        title: 'React Router Kurulum',
        content: 'Kurulum:\nnpm install react-router-dom\n\nTemel componentler:\n• BrowserRouter: Ana router wrapper\n• Routes: Route tanımlarını içerir\n• Route: Bir sayfa tanımı\n• Link: Sayfa linkler için'
      },
      {
        title: 'Route Tanımlama',
        content: 'Route ile sayfa oluşturma:\n\n<Routes>\n  <Route path="/" element={<Home />} />\n  <Route path="/about" element={<About />} />\n</Routes>\n\npath: URL yolu\nelement: Gösterilecek component'
      },
      {
        title: 'Link ile Navigasyon',
        content: 'Link componenti ile yönlendirme:\n\n<Link to="/about">Hakkımızda</Link>\n\nSayfa yenilenmeden URL değişir. <a> etiketinin React karşılığıdır.'
      }
    ],
    exampleCode: `// npm install react-router-dom

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1>Ana Sayfa</h1>;
}

function About() {
  return <h1>Hakkımızda</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Ana Sayfa</Link>
        <Link to="/about">Hakkımızda</Link>
        <Link to="/contact">İletişim</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    challenge: {
      instructions: 'Route ve Link ile sayfa oluştur.',
      starterCode: `import { Route, Link } from 'react-router-dom';

<___BLANK1___ to="/home">Ana Sayfa</Link>
<___BLANK2___ path="/home" element={<Home />} />`,
      solution: `import { Route, Link } from 'react-router-dom';

<Link to="/home">Ana Sayfa</Link>
<Route path="/home" element={<Home />} />`,
      blanks: ['Link', 'Route'],
      expectedOutput: '✓ Router kuruldu: /home yoluna gidildiğinde Home component\'i gösterilecek'
    },
    xpReward: 20
  },

  // 17. Dinamik Rotalar
  {
    id: 'react-dynamic-routes',
    title: 'Dinamik Rotalar',
    order: 17,
    category: 'React',
    description: 'URL parametreleri ile dinamik sayfalar oluşturulur. useParams hook\'u ile parametrelere erişilir.',
    detailedContent: 'Dinamik rotalar, URL\'deki parametreleri kullanarak farklı içerikler göstermeyi sağlar. Örneğin, /user/123 ve /user/456 aynı component\'i kullanır.',
    sections: [
      {
        title: 'URL Parametreleri',
        content: 'İki nokta ile parametre tanımlama:\n\n<Route path="/user/:userId" element={<User />} />\n\n:userId dinamik parametredir. /user/5, /user/abc gibi tüm değerler eşleşir.'
      },
      {
        title: 'useParams Hook',
        content: 'URL parametrelerini almak için:\n\nconst { userId } = useParams();\n\nURL /user/123 ise userId = "123" olur.'
      },
      {
        title: 'useNavigate Hook',
        content: 'Programatik yönlendirme için:\n\nconst navigate = useNavigate();\nnavigate("/home"); // Home\'a yönlendir\nnavigate(-1); // Geri git'
      }
    ],
    exampleCode: `import { useParams, useNavigate } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Kullanıcı ID: {userId}</h1>
      <button onClick={() => navigate('/users')}>
        Geri Dön
      </button>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/post/:postId/:commentId" element={<Comment />} />
    </Routes>
  );
}

// Kullanım: /user/123 -> userId = "123"`,
    challenge: {
      instructions: 'useParams ile URL parametresini al.',
      starterCode: `import { ___BLANK1___ } from 'react-router-dom';

function Product() {
  const { productId } = ___BLANK2___();
  return <h1>Ürün: {productId}</h1>;
}`,
      solution: `import { useParams } from 'react-router-dom';

function Product() {
  const { productId } = useParams();
  return <h1>Ürün: {productId}</h1>;
}`,
      blanks: ['useParams', 'useParams'],
      expectedOutput: '✓ Dinamik rota başarılı: URL\'deki productId parametresi yakalanacak'
    },
    xpReward: 20
  },

  // 18. Context API
  {
    id: 'react-context',
    title: 'Context API (Global State)',
    order: 18,
    category: 'React',
    description: 'Context API ile prop drilling\'den kaçınılır ve global state yönetimi yapılır.',
    detailedContent: 'Context API, tüm componentlerin erişebileceği global veri oluşturmayı sağlar. Props\'u her seviyeden geçirmeye gerek kalmaz (prop drilling).',
    sections: [
      {
        title: 'Context Oluşturma',
        content: 'createContext ile context oluşturma:\n\nconst MyContext = createContext();\n\nVarsayılan değer verilebilir:\nconst MyContext = createContext(defaultValue);'
      },
      {
        title: 'Provider ile Sağlama',
        content: 'Provider ile veri sağlama:\n\n<MyContext.Provider value={data}>\n  <App />\n</MyContext.Provider>\n\nProvider altındaki tüm componentler value\'ya erişebilir.'
      },
      {
        title: 'useContext ile Tüketme',
        content: 'Context verisini kullanma:\n\nconst data = useContext(MyContext);\n\nHer hangi bir component context\'e erişebilir, props gerekmez.'
      }
    ],
    exampleCode: `import { createContext, useContext, useState } from 'react';

// Context oluştur
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function Button() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={toggleTheme}>
      Tema: {theme}
    </button>
  );
}`,
    challenge: {
      instructions: 'Context oluştur ve useContext ile kullan.',
      starterCode: `const UserContext = ___BLANK1___();

function Profile() {
  const user = ___BLANK2___(UserContext);
  return <h1>{user.name}</h1>;
}`,
      solution: `const UserContext = createContext();

function Profile() {
  const user = useContext(UserContext);
  return <h1>{user.name}</h1>;
}`,
      blanks: ['createContext', 'useContext'],
      expectedOutput: '✓ Context oluşturuldu: global kullanıcı verisi erişilebilir hale geldi'
    },
    xpReward: 25
  },

  // 19. useRef ve useReducer
  {
    id: 'react-useref-reducer',
    title: 'useRef ve useReducer',
    order: 19,
    category: 'React',
    description: 'useRef DOM erişimi için, useReducer karmaşık state yönetimi için kullanılır.',
    detailedContent: 'useRef, DOM elementlerine doğrudan erişmek için kullanılır. useReducer, karmaşık state mantığı için useState\'e alternatiftir.',
    sections: [
      {
        title: 'useRef Hook',
        content: 'DOM elementlerine referans:\n\nconst inputRef = useRef(null);\n<input ref={inputRef} />\n\ninputRef.current.focus(); // DOM\'a erişim\n\nRender tetiklenmeden değer saklar.'
      },
      {
        title: 'useReducer Hook',
        content: 'Karmaşık state yönetimi:\n\nconst [state, dispatch] = useReducer(reducer, initialState);\n\ndispatch({ type: "INCREMENT" });\n\nRedux benzeri state yönetimi.'
      },
      {
        title: 'Reducer Fonksiyonu',
        content: 'function reducer(state, action) {\n  switch (action.type) {\n    case "INCREMENT":\n      return { count: state.count + 1 };\n    default:\n      return state;\n  }\n}'
      }
    ],
    exampleCode: `import { useRef, useReducer } from 'react';

// useRef - DOM erişimi
function InputFocus() {
  const inputRef = useRef(null);
  
  const handleFocus = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </>
  );
}

// useReducer - State yönetimi
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}`,
    challenge: {
      instructions: 'useRef ile input referansı oluştur.',
      starterCode: `import { ___BLANK1___ } from 'react';

function App() {
  const inputRef = ___BLANK2___(null);
  
  return <input ___BLANK3___={inputRef} />;
}`,
      solution: `import { useRef } from 'react';

function App() {
  const inputRef = useRef(null);
  
  return <input ref={inputRef} />;
}`,
      blanks: ['useRef', 'useRef', 'ref'],
      expectedOutput: '✓ Ref oluşturuldu: input elementine doğrudan erişim sağlandı'
    },
    xpReward: 25
  },

  // 20. Portal ve Fragment
  {
    id: 'react-portal-fragment',
    title: 'Portal ve Fragment',
    order: 20,
    category: 'React',
    description: 'Portal ile DOM hiyerarşisi dışında render, Fragment ile gereksiz div\'lerden kaçınma.',
    detailedContent: 'Portal, bir componenti parent component\'in DOM hiyerarşisi dışında render etmeyi sağlar. Fragment, gereksiz wrapper elementleri önler.',
    sections: [
      {
        title: 'Portal Kullanımı',
        content: 'createPortal ile başka DOM node\'una render:\n\ncreatePortal(children, domNode)\n\nModal, tooltip gibi ögeleri body\'ye render etmek için kullanılır.'
      },
      {
        title: 'Fragment Nedir?',
        content: 'Gereksiz <div> wrapper olmadan birden fazla element:\n\n<Fragment><p>1</p><p>2</p></Fragment>\n\nveya kısa syntax: <><p>1</p><p>2</p></>'
      },
      {
        title: 'Fragment ile Key',
        content: 'Liste render\'da Fragment\'e key verebilirsiniz:\n\n<Fragment key={item.id}>\n  <dt>{item.term}</dt>\n  <dd>{item.description}</dd>\n</Fragment>'
      }
    ],
    exampleCode: `import { createPortal } from 'react-dom';
import { Fragment } from 'react';

// Portal - Modal için ideal
function Modal({ children }) {
  return createPortal(
    <div className="modal">
      {children}
    </div>,
    document.getElementById('modal-root')
  );
}

// Fragment - Gereksiz wrapper yok
function List() {
  return (
    <Fragment>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </Fragment>
  );
}

// Kısa syntax
function List2() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}`,
    challenge: {
      instructions: 'Fragment kısa syntax kullan.',
      starterCode: `function Items() {
  return (
    ___BLANK1___
      <p>Birinci</p>
      <p>İkinci</p>
    ___BLANK2___
  );
}`,
      solution: `function Items() {
  return (
    <>
      <p>Birinci</p>
      <p>İkinci</p>
    </>
  );
}`,
      blanks: ['<>', '</>'],
      expectedOutput: '✓ Fragment kullanıldı: gereksiz div olmadan iki element render edilecek'
    },
    xpReward: 20
  },

  // 21. Performans Optimizasyonu
  {
    id: 'react-performance',
    title: 'Performans (useMemo, useCallback)',
    order: 21,
    category: 'React',
    description: 'useMemo pahalı hesaplamaları, useCallback fonksiyonları cache\'ler. React.memo component\'i memoize eder.',
    detailedContent: 'React uygulamalarının performansını artırmak için useMemo, useCallback ve React.memo kullanılır. Gereksiz render\'lardan kaçınılır.',
    sections: [
      {
        title: 'useMemo Hook',
        content: 'Pahalı hesaplamaları cache\'ler:\n\nconst result = useMemo(() => expensiveCalc(data), [data]);\n\ndata değişmedikçe tekrar hesaplanmaz. Performans optimizasyonu.'
      },
      {
        title: 'useCallback Hook',
        content: 'Fonksiyonları cache\'ler:\n\nconst handleClick = useCallback(() => {}, [deps]);\n\nAynı fonksiyon referansı sağlanır, child render\'ları önlenir.'
      },
      {
        title: 'React.memo',
        content: 'Component\'i memoize eder:\n\nconst MemoComp = memo(MyComponent);\n\nProps değişmedikçe component yeniden render olmaz.'
      }
    ],
    exampleCode: `import { useMemo, useCallback, memo } from 'react';

function ExpensiveComponent({ data }) {
  // useMemo - Pahalı hesaplama
  const sortedData = useMemo(() => {
    console.log('Sorting...');
    return data.sort((a, b) => a - b);
  }, [data]); // data değişmezse tekrar hesaplanmaz
  
  // useCallback - Fonksiyon cache
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Bağımlılık yoksa aynı fonksiyon referansı
  
  return <div onClick={handleClick}>{sortedData.length}</div>;
}

// React.memo - Component memoization
const MemoizedChild = memo(function Child({ name }) {
  console.log('Rendering child');
  return <div>{name}</div>;
});
// Props değişmezse yeniden render olmaz`,
    challenge: {
      instructions: 'useMemo ile hesaplamayı optimize et.',
      starterCode: `import { ___BLANK1___ } from 'react';

function App({ numbers }) {
  const sum = ___BLANK2___(() => {
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]);
  
  return <div>Toplam: {sum}</div>;
}`,
      solution: `import { useMemo } from 'react';

function App({ numbers }) {
  const sum = useMemo(() => {
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]);
  
  return <div>Toplam: {sum}</div>;
}`,
      blanks: ['useMemo', 'useMemo'],
      expectedOutput: '✓ Hesaplama optimize edildi: numbers değişmedikçe toplam yeniden hesaplanmayacak'
    },
    xpReward: 25
  },

  // 22. Form Kütüphaneleri
  {
    id: 'react-form-libraries',
    title: 'Form Kütüphaneleri (Formik/React Hook Form)',
    order: 22,
    category: 'React',
    description: 'Formik ve React Hook Form ile form yönetimi, validasyon ve hata kontrolü kolaylaşır.',
    detailedContent: 'Form kütüphaneleri, karmaşık form yönetimini, validasyonu ve hata mesajlarını kolaylaştırır. React Hook Form daha performanslıdır.',
    sections: [
      {
        title: 'React Hook Form',
        content: 'Performanslı form yönetimi:\n\nconst { register, handleSubmit } = useForm();\n\n<input {...register("name")} />\n\nUncontrolled componentler kullanır, daha hızlıdır.'
      },
      {
        title: 'Validasyon',
        content: 'Form validasyonu:\n\n{...register("email", { \n  required: "Zorunlu",\n  pattern: /email regex/\n})}\n\nerrors.email?.message ile hata gösterimi.'
      },
      {
        title: 'Formik Alternatifi',
        content: 'Formik daha kapsamlı ama ağır:\n\n<Formik initialValues={{}} onSubmit={}>\n  <Form>...</Form>\n</Formik>\n\nYup ile validasyon entegrasyonu.'
      }
    ],
    exampleCode: `// React Hook Form (Daha Performanslı)
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('email', { 
          required: 'Email gerekli',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'Geçersiz email'
          }
        })} 
      />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input 
        type="password"
        {...register('password', { 
          required: true, 
          minLength: 6 
        })} 
      />
      {errors.password && <p>Şifre en az 6 karakter</p>}
      
      <button type="submit">Giriş</button>
    </form>
  );
}`,
    challenge: {
      instructions: 'useForm ile form oluştur.',
      starterCode: `import { ___BLANK1___ } from 'react-hook-form';

function Form() {
  const { register, handleSubmit } = ___BLANK2___();
  
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('name')} />
    </form>
  );
}`,
      solution: `import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('name')} />
    </form>
  );
}`,
      blanks: ['useForm', 'useForm'],
      expectedOutput: '✓ Form kütüphanesi kuruldu: form verisi otomatik yönetilip validate edilecek'
    },
    xpReward: 25
  },

  // 23. UI Kütüphanesi Entegrasyonu
  {
    id: 'react-ui-libraries',
    title: 'UI Kütüphanesi (Tailwind/MUI)',
    order: 23,
    category: 'React',
    description: 'Tailwind CSS ve Material-UI gibi UI kütüphaneleri ile hızlı ve modern arayüzler oluşturulur.',
    detailedContent: 'UI kütüphaneleri, hazır componentler ve stil sistemleri sunarak hızlı geliştirme sağlar. Tailwind utility-first, MUI component-based yaklaşımdır.',
    sections: [
      {
        title: 'Tailwind CSS',
        content: 'Utility-first CSS framework:\n\nclassName="bg-blue-500 p-4 rounded"\n\nHTML içinde direkt stil. Hızlı prototipleme. Custom CSS yazmaya gerek yok.'
      },
      {
        title: 'Material-UI (MUI)',
        content: 'React componentleri kütüphanesi:\n\nimport { Button } from "@mui/material";\n<Button variant="contained">Tıkla</Button>\n\nGoogle Material Design standartları.'
      },
      {
        title: 'Kütüphane Seçimi',
        content: 'Tailwind: Daha esnek, custom tasarım\nMUI: Hazır componentler, hızlı başlangıç\nChakra UI: Kolay kullanım, accessibility\nAnt Design: Enterprise uygulamalar'
      }
    ],
    exampleCode: `// Tailwind CSS
function TailwindButton() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Tıkla
    </button>
  );
}

// Material-UI (MUI)
import { Button, TextField, Card } from '@mui/material';

function MuiForm() {
  return (
    <Card sx={{ padding: 2 }}>
      <TextField 
        label="Email" 
        variant="outlined" 
        fullWidth 
        sx={{ marginBottom: 2 }}
      />
      <Button 
        variant="contained" 
        color="primary"
        fullWidth
      >
        Gönder
      </Button>
    </Card>
  );
}

// Tailwind + Custom Component
function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-600">
      <h1 className="text-6xl font-bold text-white">Hoş Geldiniz</h1>
      <p className="text-xl text-white mt-4">Modern UI Tasarımı</p>
    </div>
  );
}`,
    challenge: {
      instructions: 'Tailwind class\'ları ile button oluştur.',
      starterCode: `function Button() {
  return (
    <button ___BLANK1___="bg-green-500 text-white p-4 rounded">
      Kaydet
    </button>
  );
}`,
      solution: `function Button() {
  return (
    <button className="bg-green-500 text-white p-4 rounded">
      Kaydet
    </button>
  );
}`,
      blanks: ['className'],
      expectedOutput: '✓ Tailwind uygulandı: yeşil arkaplan, beyaz yazı ve rounded buton gösterilecek'
    },
    xpReward: 20
  },

  // 24. Hata Sınırları
  {
    id: 'react-error-boundaries',
    title: 'Hata Sınırları (Error Boundaries)',
    order: 24,
    category: 'React',
    description: 'Error Boundaries ile component hatalarını yakalayıp fallback UI gösterilir.',
    detailedContent: 'Error Boundaries, React componentlerinin render hatası olduğunda tüm uygulamanın çökmesini önler. Class component olarak yazılır.',
    sections: [
      {
        title: 'Error Boundary Nedir?',
        content: 'Hata yakalama mekanizması:\n\n• Render sırasındaki hatalar\n• Lifecycle metodlarındaki hatalar\n• Constructor hataları\n\nEvent handler hatalarını yakalamıyor (try-catch kullanın).'
      },
      {
        title: 'getDerivedStateFromError',
        content: 'Hata durumunda state güncelleme:\n\nstatic getDerivedStateFromError(error) {\n  return { hasError: true };\n}\n\nFallback UI göstermek için kullanılır.'
      },
      {
        title: 'componentDidCatch',
        content: 'Hata loglama için:\n\ncomponentDidCatch(error, errorInfo) {\n  logErrorToService(error, errorInfo);\n}\n\nHata raporlama servislerine gönderme.'
      }
    ],
    exampleCode: `import { Component } from 'react';

// Class component gerekli (henüz hook yok)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Bir şeyler yanlış gitti!</h1>;
    }
    return this.props.children;
  }
}

// Kullanım
function App() {
  return (
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  );
}`,
    challenge: {
      instructions: 'ErrorBoundary ile component\'i sar.',
      starterCode: `<___BLANK1___>
  <MyComponent />
</ErrorBoundary>`,
      solution: `<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>`,
      blanks: ['ErrorBoundary'],
      expectedOutput: '✓ Error boundary kuruldu: component hatası olursa fallback UI gösterilecek'
    },
    xpReward: 20
  },

  // 25. Redux Temelleri
  {
    id: 'react-redux-basics',
    title: 'Basit Redux Mantığı',
    order: 25,
    category: 'React',
    description: 'Redux ile merkezi state yönetimi: store, actions, reducers ve useSelector/useDispatch hookları.',
    detailedContent: 'Redux, tüm uygulamada tek bir merkezi state (store) tutar. Redux Toolkit modern ve basitleştirilmiş Redux kullanımı sağlar.',
    sections: [
      {
        title: 'Redux Temelleri',
        content: 'Redux kavramları:\n• Store: Merkezi state\n• Action: State değişiklik isteği\n• Reducer: State nasıl değişir\n• Dispatch: Action gönderme\n\nTek yönlü veri akışı.'
      },
      {
        title: 'Redux Toolkit',
        content: 'Modern Redux kullanımı:\n\nconfigureStore(): Store oluşturma\ncreateSlice(): Reducer + actions\n\nBoilerplate kodu azaltır, daha basit syntax.'
      },
      {
        title: 'useSelector ve useDispatch',
        content: 'Redux hookları:\n\nconst data = useSelector(state => state.data);\nconst dispatch = useDispatch();\n\ndispatch(action());\n\nFunction componentlerde Redux kullanımı.'
      }
    ],
    exampleCode: `// Redux Toolkit (Modern Redux)
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// Slice oluştur
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Store oluştur
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// Component'te kullanım
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
    </>
  );
}`,
    challenge: {
      instructions: 'useSelector ve useDispatch kullan.',
      starterCode: `import { ___BLANK1___, useDispatch } from 'react-redux';

function App() {
  const count = ___BLANK2___((state) => state.counter.value);
  const dispatch = ___BLANK3___();
  
  return <div>{count}</div>;
}`,
      solution: `import { useSelector, useDispatch } from 'react-redux';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  
  return <div>{count}</div>;
}`,
      blanks: ['useSelector', 'useSelector', 'useDispatch'],
      expectedOutput: '✓ Redux bağlandı: global state\'ten count değeri okunuyor ve action dispatch edilebilir'
    },
    xpReward: 30
  },

  // 26. Proje: Hava Durumu Uygulaması
  {
    id: 'react-project-weather',
    title: 'Proje: Hava Durumu Uygulaması',
    order: 26,
    category: 'React',
    description: 'API entegrasyonu, state yönetimi ve conditional rendering içeren gerçek dünya projesi.',
    detailedContent: 'Hava durumu uygulaması, API çağrıları, loading state, error handling ve dinamik veri gösterimi gibi temel React kavramlarını bir araya getirir.',
    sections: [
      {
        title: 'Proje Gereksinimleri',
        content: 'Şehir ismi ile arama\n• OpenWeatherMap API kullanımı\n• Sıcaklık, nem, hava durumu gösterimi\n• Loading ve error state yönetimi\n• Responsive tasarım'
      },
      {
        title: 'State Yönetimi',
        content: 'useState ile state\'ler:\n\nconst [city, setCity] = useState("");\nconst [weather, setWeather] = useState(null);\nconst [loading, setLoading] = useState(false);\nconst [error, setError] = useState(null);'
      },
      {
        title: 'API İşlemleri',
        content: 'useEffect ve async/await:\n\nconst fetchWeather = async () => {\n  const res = await fetch(apiUrl);\n  const data = await res.json();\n  setWeather(data);\n};'
      }
    ],
    exampleCode: `import { useState, useEffect } from 'react';

function WeatherApp() {
  const [city, setCity] = useState('Istanbul');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=YOUR_API_KEY&units=metric\`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchWeather();
  }, []);
  
  return (
    <div className="weather-app">
      <input 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Şehir girin"
      />
      <button onClick={fetchWeather}>Ara</button>
      
      {loading && <p>Yükleniyor...</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Sıcaklık: {weather.main.temp}°C</p>
          <p>Durum: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}`,
    challenge: {
      instructions: 'API\'den veri çek ve göster.',
      starterCode: `const [data, setData] = useState(null);

useEffect(() => {
  ___BLANK1___('https://api.example.com/weather')
    .then(res => res.json())
    .then(data => ___BLANK2___(data));
}, []);`,
      solution: `const [data, setData] = useState(null);

useEffect(() => {
  fetch('https://api.example.com/weather')
    .then(res => res.json())
    .then(data => setData(data));
}, []);`,
      blanks: ['fetch', 'setData'],
      expectedOutput: '✓ Hava durumu verisi çekildi: API\'den alınan veri ekranda gösterilecek'
    },
    xpReward: 30
  },

  // 27. Proje: Film Arama Uygulaması
  {
    id: 'react-project-movies',
    title: 'Proje: Film Arama Uygulaması',
    order: 27,
    category: 'React',
    description: 'OMDB API ile film arama, liste render etme ve detay sayfası projesi.',
    detailedContent: 'Film arama uygulaması, API entegrasyonu, dinamik arama, liste render ve responsive tasarım gibi önemli React becerilerini pratikte kullanır.',
    sections: [
      {
        title: 'Proje Özellikleri',
        content: '• OMDB API ile film arama\n• Dinamik arama input\n• Film kartları grid layout\n• Poster, başlık, yıl gösterimi\n• Debounce ile performans optimizasyonu'
      },
      {
        title: 'API Entegrasyonu',
        content: 'OMDB API kullanımı:\n\nconst response = await fetch(`omdbapi.com/?s=${query}&apikey=KEY`);\n\nSearch endpoint ile film arama. API key gereklidir.'
      },
      {
        title: 'Liste Render',
        content: 'Map ile film kartları:\n\n{movies.map(movie => (\n  <Card key={movie.imdbID}>\n    <img src={movie.Poster} />\n    <h3>{movie.Title}</h3>\n  </Card>\n))}'
      }
    ],
    exampleCode: `import { useState } from 'react';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  
  const searchMovies = async () => {
    const response = await fetch(
      \`https://www.omdbapi.com/?s=\${query}&apikey=YOUR_API_KEY\`
    );
    const data = await response.json();
    setMovies(data.Search || []);
  };
  
  return (
    <div>
      <div className="search-bar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Film ara..."
        />
        <button onClick={searchMovies}>Ara</button>
      </div>
      
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    challenge: {
      instructions: 'Film listesini map ile render et.',
      starterCode: `{movies.___BLANK1___(movie => (
  <div ___BLANK2___={movie.id}>
    <h3>{movie.title}</h3>
  </div>
))}`,
      solution: `{movies.map(movie => (
  <div key={movie.id}>
    <h3>{movie.title}</h3>
  </div>
))}`,
      blanks: ['map', 'key'],
      expectedOutput: '✓ Film listesi oluşturuldu: her film unique key ile kart olarak gösterilecek'
    },
    xpReward: 30
  },

  // 28. Deploy (Yayınlama)
  {
    id: 'react-deploy',
    title: 'Deploy (Yayınlama)',
    order: 28,
    category: 'React',
    description: 'React uygulamasını Vercel, Netlify veya GitHub Pages\'e deploy etme.',
    detailedContent: 'React uygulamalarını canlıya almak için çeşitli platformlar vardır. Vercel ve Netlify en popüler ve kolay yöntemlerdir.',
    sections: [
      {
        title: 'Vercel Deploy',
        content: 'En kolay deploy yöntemi:\n\n1. vercel.com\'da hesap aç\n2. GitHub repo bağla\n3. Otomatik deploy başlar\n4. Her commit\'te otomatik güncelleme\n\nSSL sertifikası otomatik.'
      },
      {
        title: 'Netlify Deploy',
        content: 'Drag & drop ile deploy:\n\n1. npm run build\n2. dist klasörünü netlify.com\'a sürükle\n3. Canlı!\n\nVeya GitHub entegrasyonu ile otomatik deploy.'
      },
      {
        title: 'Environment Variables',
        content: 'Güvenli API key saklama:\n\n.env dosyası:\nVITE_API_KEY=your_key\n\nKod içinde:\nimport.meta.env.VITE_API_KEY\n\n.env dosyasını .gitignore\'a ekle.'
      }
    ],
    exampleCode: `// 1. Vercel ile Deploy
// - Vercel hesabı oluştur (vercel.com)
// - GitHub repo\'yu bağla
// - Otomatik deploy başlar

// package.json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}

// 2. Netlify ile Deploy
npm run build
// dist klasörünü Netlify'a sürükle-bırak

// 3. GitHub Pages
npm install gh-pages --save-dev

// package.json
{
  "homepage": "https://username.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

npm run deploy

// Environment Variables (.env)
VITE_API_KEY=your_api_key
// Kullanım: import.meta.env.VITE_API_KEY`,
    challenge: {
      instructions: 'Build komutu ekle.',
      starterCode: `{
  "scripts": {
    "dev": "vite",
    "___BLANK1___": "vite build"
  }
}`,
      solution: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}`,
      blanks: ['build'],
      expectedOutput: '✓ Build scripti eklendi: npm run build ile production build oluşturulabilecek'
    },
    xpReward: 25
  },

  // 29. Best Practices
  {
    id: 'react-best-practices',
    title: 'React Best Practices',
    order: 29,
    category: 'React',
    description: 'React kodlama standartları, performans ipuçları ve yaygın hatalardan kaçınma.',
    detailedContent: 'React\'te profesyonel kod yazmak için best practice\'leri takip etmek çok önemlidir. Performans, okunabilirlik ve bakılabilirlik için iyi alışkanlıklar edinin.',
    sections: [
      {
        title: 'Component Alışkanlıkları',
        content: '• PascalCase isimlendirme: UserProfile\n• Tek sorumluluk prensibi\n• Küçük ve odaklanmış componentler\n• Custom hook\'lar ile logic ayırma\n• PropTypes veya TypeScript kullanımı'
      },
      {
        title: 'State ve Props',
        content: 'State\'i immutable güncelle:\nsetUser({ ...user, name: "new" })\n\nProp drilling\'den kaçın:\nContext API veya Redux kullan\n\nKey prop mutlaka kullan:\n{items.map(item => <div key={item.id}>)}'
      },
      {
        title: 'Performans Optimizasyonu',
        content: '• useMemo pahalı hesaplamalar için\n• useCallback fonksiyon referansları için\n• React.memo gereksiz render\'ları engellemek için\n• Lazy loading büyük componentler için\n• Code splitting ile bundle boyutu azalt'
      }
    ],
    exampleCode: `// 1. Component İsimlendirme (PascalCase)
function UserProfile() {} // ✅ Doğru
function userProfile() {} // ❌ Yanlış

// 2. Prop Drilling'den Kaçın
// Context API veya Redux kullanın

// 3. Key Prop Mutlaka Kullanın
{items.map(item => <div key={item.id}>{item.name}</div>)} // ✅

// 4. State'i Doğrudan Değiştirmeyin
const [user, setUser] = useState({ name: 'Ali' });
// ❌ user.name = 'Veli';
// ✅ setUser({ ...user, name: 'Veli' });

// 5. useEffect Dependency Array
useEffect(() => {
  fetchData();
}, [dependency]); // Bağımlılıkları belirt

// 6. Custom Hook'lar Oluşturun
function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setSize(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

// 7. Lazy Loading
import { lazy, Suspense } from 'react';
const HeavyComponent = lazy(() => import('./Heavy'));

<Suspense fallback={<div>Yükleniyor...</div>}>
  <HeavyComponent />
</Suspense>`,
    challenge: {
      instructions: 'State\'i immutable şekilde güncelle.',
      starterCode: `const [user, setUser] = useState({ name: 'Ali', age: 25 });

// Yaşı artır (immutable)
setUser({ ___BLANK1___user, age: user.age + 1 });`,
      solution: `const [user, setUser] = useState({ name: 'Ali', age: 25 });

// Yaşı artır (immutable)
setUser({ ...user, age: user.age + 1 });`,
      blanks: ['...'],
      expectedOutput: '✓ State immutable güncellendi: spread operator ile yeni obje oluşturulup yaş artırıldı'
    },
    xpReward: 25
  },

  // 30. Genel Tekrar ve İleri Konular
  {
    id: 'react-review',
    title: 'Genel Tekrar ve İleri Konular',
    order: 30,
    category: 'React',
    description: 'React yolculuğunun özeti ve öğrenmeye devam etmek için kaynaklar.',
    detailedContent: 'React yolculuğunuzu tamamladınız! 30 derste temel ve ileri seviye React kavramlarını öğrendiniz. Şimdi gerçek projeler yapma ve ileri konulara geçme zamanı.',
    sections: [
      {
        title: 'Öğrendikleriniz',
        content: '✓ JSX ve Component Yapısı\n✓ Props ve State Yönetimi\n✓ Hooks (useState, useEffect, useContext, etc.)\n✓ Event Handling ve Forms\n✓ React Router\n✓ Context API ve Redux\n✓ Performans Optimizasyonu\n✓ API Entegrasyonu\n✓ Deploy'
      },
      {
        title: 'Sıradaki Adımlar',
        content: '🚀 TypeScript ile React\n🚀 Next.js (SSR, SSG)\n🚀 Testing (Jest, RTL)\n🚀 React Native (Mobil)\n🚀 GraphQL\n🚀 Server Components\n🚀 Micro Frontends'
      },
      {
        title: 'Önerilen Kaynaklar',
        content: '📚 react.dev - Resmi dokümantasyon\n📚 patterns.dev - Design patterns\n📚 github.com/enaqx/awesome-react\n📚 frontendmasters.com\n📚 egghead.io'
      }
    ],
    exampleCode: `// 🎓 React Yolculuğu Tamamlandı!

// ✅ Öğrendikleriniz:
// 1. JSX ve Component Yapısı
// 2. Props ve State Yönetimi
// 3. Lifecycle ve Hooks (useState, useEffect, useContext, useRef, useReducer)
// 4. Event Handling ve Form Yönetimi
// 5. Conditional Rendering ve Liste Yönetimi
// 6. React Router (Routing)
// 7. Context API ve Redux
// 8. Performans Optimizasyonu (memo, useMemo, useCallback)
// 9. API Entegrasyonu
// 10. Custom Hooks
// 11. UI Kütüphaneleri (Tailwind, MUI)
// 12. Form Kütüphaneleri (React Hook Form)
// 13. Error Boundaries
// 14. Deploy

// 🚀 Sıradaki Adımlar:
// - TypeScript ile React
// - Next.js (SSR, SSG)
// - Testing (Jest, React Testing Library)
// - State Management (Zustand, MobX)
// - React Native (Mobil uygulama)
// - GraphQL ile React
// - Micro Frontends
// - Server Components (React 18+)

// 📚 Kaynaklar:
// - React Dokümantasyonu: react.dev
// - React Patterns: patterns.dev
// - Awesome React: github.com/enaqx/awesome-react`,
    challenge: {
      instructions: 'React journey\'ini tamamla!',
      starterCode: `// Tebrikler! 🎉
// 30 React dersini tamamladınız!

function Celebration() {
  return (
    <div>
      <h1>___BLANK1___ React Geliştiricisi! 🚀</h1>
      <p>Artık gerçek projeler ___BLANK2___!</p>
    </div>
  );
}`,
      solution: `// Tebrikler! 🎉
// 30 React dersini tamamladınız!

function Celebration() {
  return (
    <div>
      <h1>Tebrikler React Geliştiricisi! 🚀</h1>
      <p>Artık gerçek projeler yapabilirsiniz!</p>
    </div>
  );
}`,
      blanks: ['Tebrikler', 'yapabilirsiniz'],
      expectedOutput: '✓ Tebrikler! 30 React dersi tamamlandı! 🎉 Artık React geliştirici olarak gerçek projeler yapabilirsiniz!'
    },
    xpReward: 50
  }
];

// React Final Exam
export const reactFinalExam: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'React\'te component oluşturmak için hangi syntax kullanılır?',
    options: ['class Component', 'function Component()', 'component Function', 'new Component()'],
    correctAnswer: 1,
    explanation: 'React\'te modern yaklaşım function component\'leridir.'
  },
  {
    id: 'q2',
    question: 'JSX içinde JavaScript ifadeleri nasıl yazılır?',
    options: ['{{}}', '[]', '{}', '()'],
    correctAnswer: 2,
    explanation: 'JSX içinde süslü parantez {} ile JavaScript ifadeleri yazılır.'
  },
  {
    id: 'q3',
    question: 'Props nedir?',
    options: [
      'Component içi veri',
      'Componentler arası veri aktarımı',
      'Global state',
      'API verisi'
    ],
    correctAnswer: 1,
    explanation: 'Props, parent componentten child componente veri aktarımını sağlar.'
  },
  {
    id: 'q4',
    question: 'useState hook\'u ne işe yarar?',
    options: [
      'API çağrısı',
      'State yönetimi',
      'Routing',
      'Stil verme'
    ],
    correctAnswer: 1,
    explanation: 'useState, function componentlerde state yönetimi için kullanılır.'
  },
  {
    id: 'q5',
    question: 'Liste render ederken neden key prop gereklidir?',
    options: [
      'Stil için',
      'React\'in elementleri tanıması için',
      'Event handling için',
      'Zorunlu değil'
    ],
    correctAnswer: 1,
    explanation: 'Key prop, React\'in liste elementlerini verimli şekilde tanıması için gereklidir.'
  },
  {
    id: 'q6',
    question: 'useEffect hook\'u ne zaman çalışır?',
    options: [
      'Sadece mount\'ta',
      'Her render\'da',
      'Dependency array\'e göre',
      'Hiçbir zaman'
    ],
    correctAnswer: 2,
    explanation: 'useEffect, dependency array\'deki değişikliklere göre çalışır.'
  },
  {
    id: 'q7',
    question: 'Controlled component nedir?',
    options: [
      'State ile kontrol edilen input',
      'Props ile kontrol edilen button',
      'API ile kontrol edilen form',
      'CSS ile kontrol edilen div'
    ],
    correctAnswer: 0,
    explanation: 'Controlled component, değeri state ile kontrol edilen form elementidir.'
  },
  {
    id: 'q8',
    question: 'Koşullu render için hangi operatör kullanılır?',
    options: ['if-else', '? :', 'switch', 'Hepsi'],
    correctAnswer: 3,
    explanation: 'React\'te if-else, ternary operator (? :) ve && operatörü kullanılabilir.'
  },
  {
    id: 'q9',
    question: 'Event handler nasıl tanımlanır?',
    options: [
      'onclick="handler"',
      'onClick={handler}',
      'onClick="handler()"',
      '@click="handler"'
    ],
    correctAnswer: 1,
    explanation: 'React\'te event handler camelCase yazılır ve süslü parantez içinde verilir.'
  },
  {
    id: 'q10',
    question: 'useEffect cleanup fonksiyonu ne zaman çalışır?',
    options: [
      'Mount\'ta',
      'Update\'te',
      'Unmount\'ta',
      'Her render\'da'
    ],
    correctAnswer: 2,
    explanation: 'Cleanup fonksiyonu component unmount olduğunda çalışır.'
  },
  {
    id: 'q11',
    question: 'Custom hook nasıl oluşturulur?',
    options: [
      'function myHook()',
      'function useMyHook()',
      'hook myHook()',
      'useHook myHook()'
    ],
    correctAnswer: 1,
    explanation: 'Custom hooklar "use" prefix\'i ile başlamalıdır.'
  },
  {
    id: 'q12',
    question: 'JSX\'te className neden kullanılır?',
    options: [
      'class reserved keyword',
      'Daha modern',
      'Zorunluluk yok',
      'React kuralı'
    ],
    correctAnswer: 0,
    explanation: 'JavaScript\'te "class" reserved keyword olduğu için className kullanılır.'
  },
  {
    id: 'q13',
    question: 'Array.map() kullanırken key prop nereye eklenir?',
    options: [
      'Parent elemana',
      'Her child elemana',
      'Sadece ilk elemana',
      'Gerek yok'
    ],
    correctAnswer: 1,
    explanation: 'Key prop, map ile oluşturulan her child elemente eklenir.'
  },
  {
    id: 'q14',
    question: 'useEffect dependency array boş [] ise ne olur?',
    options: [
      'Her render\'da çalışır',
      'Sadece mount\'ta çalışır',
      'Hiç çalışmaz',
      'Hata verir'
    ],
    correctAnswer: 1,
    explanation: 'Boş dependency array, effect\'in sadece mount\'ta çalışmasını sağlar.'
  },
  {
    id: 'q15',
    question: 'Props read-only midir?',
    options: [
      'Evet, değiştirilemez',
      'Hayır, değiştirilebilir',
      'Sadece parent değiştirebilir',
      'Durum değişiklik gösterir'
    ],
    correctAnswer: 0,
    explanation: 'Props read-only\'dir, child component tarafından değiştirilemez.'
  }
];

// =====================
// PYTHON LESSONS (30 Ders)
// =====================

export const pythonLessons: LessonContent[] = [
  // 1. Print ve Değişkenler
  {
    id: 'py-print-variables',
    title: 'Print ve Değişkenler',
    order: 1,
    category: 'Python',
    description: 'Python\'da ekrana yazı yazdırma ve değişken tanımlama.',
    detailedContent: 'Python\'da print() fonksiyonu ile ekrana çıktı verebilir, değişkenler ile veri saklayabiliriz.',
    sections: [
      {
        title: 'Print Fonksiyonu',
        content: 'print() fonksiyonu ile ekrana yazı yazdırırız:\n\nprint("Merhaba Dünya")\nprint("Python öğreniyorum")'
      },
      {
        title: 'Değişken Tanımlama',
        content: 'Python\'da değişken tanımlarken tip belirtmeye gerek yoktur:\n\nisim = "Furkan"\nyas = 25\nprint(isim, yas)'
      }
    ],
    exampleCode: `# Print kullanımı
print("Merhaba Dünya")
print("Python öğreniyorum")

# Değişken tanımlama
isim = "Furkan"
yas = 25
sehir = "İstanbul"

# Değişkenleri yazdırma
print(isim)
print(yas)
print(isim, yas, sehir)`,
    challenge: {
      instructions: 'İsim ve yaş değişkenleri oluşturup ekrana yazdır.',
      starterCode: `isim = ___BLANK1___
yas = ___BLANK2___
___BLANK3___(isim, yas)`,
      solution: `isim = "Ali"
yas = 20
print(isim, yas)`,
      blanks: ['"Ali"', '20', 'print'],
      expectedOutput: 'Ali 20'
    },
    xpReward: 10
  },

  // 2. Veri Tipleri (Int, Float, Str)
  {
    id: 'py-data-types',
    title: 'Veri Tipleri (Int, Float, Str)',
    order: 2,
    category: 'Python',
    description: 'Python\'da sayılar (int, float) ve metin (str) veri tipleri.',
    detailedContent: 'Python\'da üç temel veri tipi vardır: int (tam sayı), float (ondalıklı sayı), str (metin).',
    sections: [
      {
        title: 'Temel Veri Tipleri',
        content: '• int: Tam sayılar (5, -10, 1000)\n• float: Ondalıklı sayılar (3.14, -0.5)\n• str: Metinler ("Merhaba", \'Python\')'
      },
      {
        title: 'type() Fonksiyonu',
        content: 'type() ile değişkenin tipini öğrenebilirsiniz:\n\nprint(type(5))       # <class \'int\'>\nprint(type(3.14))    # <class \'float\'>\nprint(type("Ali"))   # <class \'str\'>'
      }
    ],
    exampleCode: `# int (Tam sayı)
sayi = 42
yas = 25

# float (Ondalıklı)
pi = 3.14
fiyat = 19.99

# str (Metin)
isim = "Furkan"
mesaj = 'Merhaba'

# Tip kontrolü
print(type(sayi))    # <class 'int'>
print(type(pi))      # <class 'float'>
print(type(isim))    # <class 'str'>`,
    challenge: {
      instructions: 'int, float ve str tipinde değişkenler oluştur.',
      starterCode: `sayi = ___BLANK1___
fiyat = ___BLANK2___
isim = ___BLANK3___`,
      solution: `sayi = 10
fiyat = 29.99
isim = "Ahmet"`,
      blanks: ['10', '29.99', '"Ahmet"'],
      expectedOutput: '✓ Değişkenler başarıyla oluşturuldu: sayi=10 (int), fiyat=29.99 (float), isim="Ahmet" (str)'
    },
    xpReward: 10
  },

  // 3. Tip Dönüşümleri
  {
    id: 'py-type-conversion',
    title: 'Tip Dönüşümleri',
    order: 3,
    category: 'Python',
    description: 'int(), float(), str() fonksiyonları ile tip dönüşümü.',
    detailedContent: 'Veri tiplerini birbirine dönüştürmek için int(), float(), str() fonksiyonlarını kullanırız.',
    sections: [
      {
        title: 'Tip Dönüşüm Fonksiyonları',
        content: '• int(): Tam sayıya çevirir\n• float(): Ondalıklı sayıya çevirir\n• str(): Metne çevirir'
      },
      {
        title: 'Kullanım Örnekleri',
        content: 'sayi = int("42")        # "42" → 42\nondal = float("3.14")   # "3.14" → 3.14\nmetin = str(100)        # 100 → "100"'
      }
    ],
    exampleCode: `# String to int
metin = "42"
sayi = int(metin)
print(sayi + 8)  # 50

# String to float
metin2 = "3.14"
ondal = float(metin2)
print(ondal * 2)  # 6.28

# Int/Float to string
yas = 25
yas_metin = str(yas)
print("Yaşım: " + yas_metin)`,
    challenge: {
      instructions: 'String "100" değerini int\'e çevir ve 50 ekle.',
      starterCode: `metin = "100"
sayi = ___BLANK1___(metin)
sonuc = sayi ___BLANK2___ 50
print(sonuc)`,
      solution: `metin = "100"
sayi = int(metin)
sonuc = sayi + 50
print(sonuc)`,
      blanks: ['int', '+'],
      expectedOutput: '150'
    },
    xpReward: 10
  },

  // 4. Aritmetik İşlemler
  {
    id: 'py-arithmetic',
    title: 'Aritmetik İşlemler',
    order: 4,
    category: 'Python',
    description: 'Toplama, çıkarma, çarpma, bölme, üs alma işlemleri.',
    detailedContent: 'Python\'da matematiksel işlemler için aritmetik operatörler kullanılır.',
    sections: [
      {
        title: 'Temel Operatörler',
        content: '• + (Toplama): 5 + 3 = 8\n• - (Çıkarma): 5 - 3 = 2\n• * (Çarpma): 5 * 3 = 15\n• / (Bölme): 10 / 2 = 5.0\n• // (Tam bölme): 10 // 3 = 3\n• % (Mod/Kalan): 10 % 3 = 1\n• ** (Üs): 2 ** 3 = 8'
      }
    ],
    exampleCode: `a = 10
b = 3

print(a + b)   # 13 (Toplama)
print(a - b)   # 7 (Çıkarma)
print(a * b)   # 30 (Çarpma)
print(a / b)   # 3.333... (Bölme)
print(a // b)  # 3 (Tam bölme)
print(a % b)   # 1 (Mod/Kalan)
print(a ** b)  # 1000 (Üs alma)`,
    challenge: {
      instructions: 'İki sayıyı topla ve 2 ile çarp.',
      starterCode: `a = 5
b = 10
toplam = a ___BLANK1___ b
sonuc = toplam ___BLANK2___ 2
print(sonuc)`,
      solution: `a = 5
b = 10
toplam = a + b
sonuc = toplam * 2
print(sonuc)`,
      blanks: ['+', '*'],
      expectedOutput: '30'
    },
    xpReward: 10
  },

  // 5. Kullanıcıdan Veri Alma (input)
  {
    id: 'py-input',
    title: 'Kullanıcıdan Veri Alma (input)',
    order: 5,
    category: 'Python',
    description: 'input() fonksiyonu ile kullanıcıdan veri alma.',
    detailedContent: 'input() fonksiyonu kullanıcıdan klavyeden veri almamızı sağlar. Aldığı veri her zaman string tipindedir.',
    sections: [
      {
        title: 'input() Kullanımı',
        content: 'isim = input("İsminiz: ")\nprint("Merhaba", isim)'
      },
      {
        title: 'Sayısal Veri Alma',
        content: 'input() her zaman string döndürür. Sayı almak için tip dönüşümü yapmalısınız:\n\nyas = int(input("Yaşınız: "))\nfiyat = float(input("Fiyat: "))'
      }
    ],
    exampleCode: `# String olarak input
isim = input("İsminiz: ")
print("Merhaba", isim)

# Sayı olarak input (tip dönüşümü)
yas = int(input("Yaşınız: "))
gelecek_yas = yas + 10
print("10 yıl sonra", gelecek_yas, "yaşında olacaksınız")`,
    challenge: {
      instructions: 'Kullanıcıdan isim al ve ekrana yazdır.',
      starterCode: `isim = ___BLANK1___("İsminiz: ")
___BLANK2___(isim)`,
      solution: `isim = input("İsminiz: ")
print(isim)`,
      blanks: ['input', 'print'],
      expectedOutput: '(Kullanıcının girdiği isim ekrana yazdırılır)'
    },
    xpReward: 10
  },

  // 6. Koşullar (If-Elif-Else)
  {
    id: 'py-conditionals',
    title: 'Koşullar (If-Elif-Else)',
    order: 6,
    category: 'Python',
    description: 'if, elif, else ile koşullu ifadeler.',
    detailedContent: 'Koşullu ifadeler programın farklı durumlarda farklı davranmasını sağlar.',
    sections: [
      {
        title: 'If Yapısı',
        content: 'if koşul:\n    # Koşul doğruysa çalışır'
      },
      {
        title: 'If-Else Yapısı',
        content: 'if koşul:\n    # Doğruysa\nelse:\n    # Yanlışsa'
      },
      {
        title: 'If-Elif-Else',
        content: 'if koşul1:\n    # Birinci koşul\nelif koşul2:\n    # İkinci koşul\nelse:\n    # Hiçbiri değilse'
      }
    ],
    exampleCode: `yas = 18

if yas >= 18:
    print("Reşitsiniz")
else:
    print("Reşit değilsiniz")

# Elif örneği
not_ortalama = 75

if not_ortalama >= 90:
    print("AA")
elif not_ortalama >= 80:
    print("BA")
elif not_ortalama >= 70:
    print("BB")
else:
    print("CC")`,
    challenge: {
      instructions: 'Yaş 18 ve üstüyse "Reşit" yazdır.',
      starterCode: `yas = 20
___BLANK1___ yas >= 18:
    ___BLANK2___("Reşit")`,
      solution: `yas = 20
if yas >= 18:
    print("Reşit")`,
      blanks: ['if', 'print'],
      expectedOutput: 'Reşit'
    },
    xpReward: 10
  },

  // 7. Mantıksal Operatörler
  {
    id: 'py-logical-operators',
    title: 'Mantıksal Operatörler',
    order: 7,
    category: 'Python',
    description: 'and, or, not operatörleri ile mantıksal işlemler.',
    detailedContent: 'Mantıksal operatörler birden fazla koşulu birleştirmemizi sağlar.',
    sections: [
      {
        title: 'Mantıksal Operatörler',
        content: '• and: Her iki koşul da doğru olmalı\n• or: En az bir koşul doğru olmalı\n• not: Koşulu tersine çevirir'
      }
    ],
    exampleCode: `yas = 25
para = 100

# and - Her ikisi de doğru olmalı
if yas >= 18 and para >= 50:
    print("Alışveriş yapabilirsiniz")

# or - En az biri doğru olmalı
if yas < 18 or para < 50:
    print("Koşul sağlandı")

# not - Tersi
if not (yas < 18):
    print("Reşitsiniz")`,
    challenge: {
      instructions: 'yas >= 18 ve para >= 100 ise "Tamam" yazdır.',
      starterCode: `yas = 20
para = 150
if yas >= 18 ___BLANK1___ para >= 100:
    print("Tamam")`,
      solution: `yas = 20
para = 150
if yas >= 18 and para >= 100:
    print("Tamam")`,
      blanks: ['and'],
      expectedOutput: 'Tamam'
    },
    xpReward: 10
  },

  // 8. Listeler
  {
    id: 'py-lists',
    title: 'Listeler',
    order: 8,
    category: 'Python',
    description: 'Liste oluşturma, eleman ekleme/çıkarma, indeksleme.',
    detailedContent: 'Listeler birden fazla değeri tek bir değişkende saklar. Değiştirilebilir (mutable) yapıdır.',
    sections: [
      {
        title: 'Liste Oluşturma',
        content: 'meyveler = ["elma", "armut", "muz"]\nsayilar = [1, 2, 3, 4, 5]'
      },
      {
        title: 'Liste İşlemleri',
        content: '• append(): Eleman ekle\n• remove(): Eleman çıkar\n• [indeks]: Elemana eriş\n• len(): Uzunluk'
      }
    ],
    exampleCode: `# Liste oluşturma
meyveler = ["elma", "armut", "muz"]

# Elemana erişim
print(meyveler[0])  # "elma"

# Eleman ekleme
meyveler.append("çilek")

# Eleman çıkarma
meyveler.remove("armut")

# Uzunluk
print(len(meyveler))`,
    challenge: {
      instructions: 'Liste oluştur ve append ile eleman ekle.',
      starterCode: `liste = [1, 2, 3]
liste.___BLANK1___(4)
print(liste)`,
      solution: `liste = [1, 2, 3]
liste.append(4)
print(liste)`,
      blanks: ['append'],
      expectedOutput: '[1, 2, 3, 4]'
    },
    xpReward: 10
  },

  // 9. Demetler (Tuples)
  {
    id: 'py-tuples',
    title: 'Demetler (Tuples)',
    order: 9,
    category: 'Python',
    description: 'Değiştirilemeyen (immutable) veri yapısı: tuple.',
    detailedContent: 'Tuple\'lar listeler gibidir ancak oluşturulduktan sonra değiştirilemezler.',
    sections: [
      {
        title: 'Tuple Oluşturma',
        content: 'koordinat = (10, 20)\nrenkler = ("kırmızı", "yeşil", "mavi")'
      },
      {
        title: 'Liste vs Tuple',
        content: '• Liste: Değiştirilebilir []\n• Tuple: Değiştirilemez ()\n\nTuple daha hızlı ve güvenlidir.'
      }
    ],
    exampleCode: `# Tuple oluşturma
koordinat = (10, 20)
print(koordinat[0])  # 10

# Tuple değiştirilemez
# koordinat[0] = 30  # HATA!

# Çoklu tuple
renkler = ("kırmızı", "yeşil", "mavi")
print(len(renkler))  # 3`,
    challenge: {
      instructions: 'Tuple oluştur ve ilk elemanı yazdır.',
      starterCode: `point = ___BLANK1___
print(point[___BLANK2___])`,
      solution: `point = (5, 10)
print(point[0])`,
      blanks: ['(5, 10)', '0'],
      expectedOutput: '5'
    },
    xpReward: 10
  },

  // 10. Sözlükler (Dictionaries)
  {
    id: 'py-dictionaries',
    title: 'Sözlükler (Dictionaries)',
    order: 10,
    category: 'Python',
    description: 'Anahtar-değer çiftleri ile veri saklama: dict.',
    detailedContent: 'Dictionary\'ler key-value (anahtar-değer) çiftleri şeklinde veri saklar.',
    sections: [
      {
        title: 'Dictionary Oluşturma',
        content: 'kisi = {\n    "isim": "Furkan",\n    "yas": 25,\n    "sehir": "İstanbul"\n}'
      },
      {
        title: 'İşlemler',
        content: '• [key]: Değere eriş\n• [key] = value: Değer ekle/değiştir\n• keys(): Anahtarları al\n• values(): Değerleri al'
      }
    ],
    exampleCode: `# Dictionary oluşturma
kisi = {
    "isim": "Furkan",
    "yas": 25,
    "sehir": "İstanbul"
}

# Değere erişim
print(kisi["isim"])  # "Furkan"

# Değer ekleme/değiştirme
kisi["meslek"] = "Yazılımcı"
kisi["yas"] = 26

# Anahtarlar ve değerler
print(kisi.keys())
print(kisi.values())`,
    challenge: {
      instructions: 'Dictionary oluştur ve "isim" anahtarına eriş.',
      starterCode: `kisi = {"isim": "Ali", "yas": 30}
print(kisi[___BLANK1___])`,
      solution: `kisi = {"isim": "Ali", "yas": 30}
print(kisi["isim"])`,
      blanks: ['"isim"'],
      expectedOutput: 'Ali'
    },
    xpReward: 10
  },

  // 11-30 dersler devam edecek...
  // Şimdi kısa versiyonlarını ekliyorum

  // 11. For Döngüsü
  {
    id: 'py-for-loop',
    title: 'Döngüler - For',
    order: 11,
    category: 'Python',
    description: 'for döngüsü ile liste ve range üzerinde iterasyon.',
    detailedContent: 'for döngüsü bir liste veya aralık üzerinde dönerek her elemanı işler.',
    sections: [
      {
        title: 'For Döngüsü',
        content: 'for eleman in liste:\n    # Her eleman için çalışır'
      },
      {
        title: 'range() Fonksiyonu',
        content: 'range(5)      # 0, 1, 2, 3, 4\nrange(1, 6)   # 1, 2, 3, 4, 5\nrange(0, 10, 2)  # 0, 2, 4, 6, 8'
      }
    ],
    exampleCode: `# Liste üzerinde for
meyveler = ["elma", "armut", "muz"]
for meyve in meyveler:
    print(meyve)

# range ile for
for i in range(5):
    print(i)

# 1'den 10'a kadar
for sayi in range(1, 11):
    print(sayi)`,
    challenge: {
      instructions: 'range(5) kullanarak 0\'dan 4\'e kadar yazdır.',
      starterCode: `___BLANK1___ i ___BLANK2___ range(5):
    print(i)`,
      solution: `for i in range(5):
    print(i)`,
      blanks: ['for', 'in'],
      expectedOutput: '0\n1\n2\n3\n4'
    },
    xpReward: 10
  },

  // 12. While Döngüsü
  {
    id: 'py-while-loop',
    title: 'Döngüler - While',
    order: 12,
    category: 'Python',
    description: 'while döngüsü ile koşul sağlandığı sürece tekrar.',
    detailedContent: 'while döngüsü belirtilen koşul doğru olduğu sürece çalışmaya devam eder.',
    sections: [
      {
        title: 'While Döngüsü',
        content: 'while koşul:\n    # Koşul doğru olduğu sürece çalışır'
      }
    ],
    exampleCode: `# While döngüsü
sayac = 0
while sayac < 5:
    print(sayac)
    sayac += 1

# Kullanıcı doğru cevap verene kadar
cevap = ""
while cevap != "python":
    cevap = input("Şifre: ")
print("Doğru!")`,
    challenge: {
      instructions: 'sayac 0\'dan 3\'e kadar artırarak yazdır.',
      starterCode: `sayac = 0
___BLANK1___ sayac < 3:
    print(sayac)
    sayac ___BLANK2___ 1`,
      solution: `sayac = 0
while sayac < 3:
    print(sayac)
    sayac += 1`,
      blanks: ['while', '+='],
      expectedOutput: '0\n1\n2'
    },
    xpReward: 10
  },

  // 13. Break ve Continue
  {
    id: 'py-break-continue',
    title: 'Break ve Continue',
    order: 13,
    category: 'Python',
    description: 'Döngü kontrolü: break (dur), continue (atla).',
    detailedContent: 'break döngüyü sonlandırır, continue o iterasyonu atlayıp devam eder.',
    sections: [
      {
        title: 'break ve continue',
        content: '• break: Döngüyü tamamen durdur\n• continue: O adımı atla, devam et'
      }
    ],
    exampleCode: `# break örneği
for i in range(10):
    if i == 5:
        break  # 5'te dur
    print(i)  # 0, 1, 2, 3, 4

# continue örneği
for i in range(5):
    if i == 2:
        continue  # 2'yi atla
    print(i)  # 0, 1, 3, 4`,
    challenge: {
      instructions: 'Döngüde i == 3 olduğunda break kullan.',
      starterCode: `for i in range(10):
    if i == 3:
        ___BLANK1___
    print(i)`,
      solution: `for i in range(10):
    if i == 3:
        break
    print(i)`,
      blanks: ['break'],
      expectedOutput: '0\n1\n2'
    },
    xpReward: 10
  },

  // 14. Fonksiyon Tanımlama
  {
    id: 'py-functions',
    title: 'Fonksiyon Tanımlama',
    order: 14,
    category: 'Python',
    description: 'def ile fonksiyon oluşturma ve çağırma.',
    detailedContent: 'Fonksiyonlar tekrar kullanılabilir kod blokları oluşturmamızı sağlar.',
    sections: [
      {
        title: 'Fonksiyon Tanımlama',
        content: 'def fonksiyon_adi():\n    # Fonksiyon kodu\n    pass'
      }
    ],
    exampleCode: `# Basit fonksiyon
def selamla():
    print("Merhaba!")

selamla()  # Fonksiyonu çağır

# Parametreli fonksiyon
def selamla_kisi(isim):
    print("Merhaba", isim)

selamla_kisi("Furkan")`,
    challenge: {
      instructions: 'topla adında fonksiyon oluştur.',
      starterCode: `___BLANK1___ topla():
    print(5 + 3)

topla()`,
      solution: `def topla():
    print(5 + 3)

topla()`,
      blanks: ['def'],
      expectedOutput: '8'
    },
    xpReward: 10
  },

  // 15. Parametreler ve Return
  {
    id: 'py-return',
    title: 'Parametreler ve Return',
    order: 15,
    category: 'Python',
    description: 'Fonksiyonlara parametre gönderme ve değer döndürme.',
    detailedContent: 'Fonksiyonlar parametre alabilir ve return ile değer döndürebilir.',
    sections: [
      {
        title: 'Return Kullanımı',
        content: 'def topla(a, b):\n    return a + b\n\nsonuc = topla(5, 3)  # 8'
      }
    ],
    exampleCode: `# Return ile değer döndürme
def topla(a, b):
    return a + b

sonuc = topla(5, 3)
print(sonuc)  # 8

# Birden fazla parametre
def kare_al(sayi):
    return sayi ** 2

print(kare_al(5))  # 25`,
    challenge: {
      instructions: 'İki sayıyı çarpan fonksiyon yaz.',
      starterCode: `def carp(a, b):
    ___BLANK1___ a * b

print(carp(4, 5))`,
      solution: `def carp(a, b):
    return a * b

print(carp(4, 5))`,
      blanks: ['return'],
      expectedOutput: '20'
    },
    xpReward: 10
  },

  // Kalan 15 dersi daha kısa ekleyeceğim (16-30)
  
  // 16. Lambda Fonksiyonları
  {
    id: 'py-lambda',
    title: 'Lambda Fonksiyonları',
    order: 16,
    category: 'Python',
    description: 'Tek satırlık anonim fonksiyonlar: lambda.',
    exampleCode: `# Normal fonksiyon
def topla(a, b):
    return a + b

# Lambda ile
topla = lambda a, b: a + b
print(topla(5, 3))  # 8

# Lambda kullanımı
kare = lambda x: x ** 2
print(kare(5))  # 25`,
    challenge: {
      instructions: 'Lambda ile çarpma fonksiyonu oluştur.',
      starterCode: `carp = ___BLANK1___ a, b: a * b
print(carp(4, 5))`,
      solution: `carp = lambda a, b: a * b
print(carp(4, 5))`,
      blanks: ['lambda'],
      expectedOutput: '20'
    },
    xpReward: 10
  },

  // 17-30 derslerini kısaca ekliyorum
  {
    id: 'py-try-except',
    title: 'Hata Yönetimi (Try-Except)',
    order: 17,
    category: 'Python',
    description: 'try-except ile hata yakalama ve yönetme.',
    exampleCode: `try:
    sayi = int(input("Sayı: "))
    print(10 / sayi)
except ValueError:
    print("Geçerli sayı girin!")
except ZeroDivisionError:
    print("Sıfıra bölünemez!")`,
    challenge: {
      instructions: 'try-except ile hata yakala.',
      starterCode: `___BLANK1___:
    print(10 / 0)
___BLANK2___:
    print("Hata!")`,
      solution: `try:
    print(10 / 0)
except:
    print("Hata!")`,
      blanks: ['try', 'except'],
      expectedOutput: 'Hata!'
    },
    xpReward: 10
  },

  {
    id: 'py-file-read',
    title: 'Dosya İşlemleri - Okuma',
    order: 18,
    category: 'Python',
    description: 'Dosyadan veri okuma: open(), read(), readlines().',
    exampleCode: `# Dosya okuma
dosya = open("dosya.txt", "r")
icerik = dosya.read()
print(icerik)
dosya.close()

# with kullanımı (önerilen)
with open("dosya.txt", "r") as dosya:
    icerik = dosya.read()
    print(icerik)`,
    challenge: {
      instructions: 'Dosyayı "r" modunda aç.',
      starterCode: `dosya = open("test.txt", ___BLANK1___)
print(dosya.read())
dosya.close()`,
      solution: `dosya = open("test.txt", "r")
print(dosya.read())
dosya.close()`,
      blanks: ['"r"'],
      expectedOutput: '(Dosyanın içeriği ekrana yazdırılır)'
    },
    xpReward: 10
  },

  {
    id: 'py-file-write',
    title: 'Dosya İşlemleri - Yazma',
    order: 19,
    category: 'Python',
    description: 'Dosyaya veri yazma: "w", "a" modları.',
    exampleCode: `# Dosyaya yazma (üzerine yaz)
with open("dosya.txt", "w") as dosya:
    dosya.write("Merhaba Dünya\\n")
    dosya.write("Python öğreniyorum")

# Dosyaya ekleme
with open("dosya.txt", "a") as dosya:
    dosya.write("\\nYeni satır")`,
    challenge: {
      instructions: 'Dosyaya "Merhaba" yaz.',
      starterCode: `with open("test.txt", "w") as dosya:
    dosya.___BLANK1___("Merhaba")`,
      solution: `with open("test.txt", "w") as dosya:
    dosya.write("Merhaba")`,
      blanks: ['write'],
      expectedOutput: '✓ "Merhaba" dosyaya yazıldı (ekran çıktısı yok)'
    },
    xpReward: 10
  },

  {
    id: 'py-modules',
    title: 'Modüller ve Kütüphaneler',
    order: 20,
    category: 'Python',
    description: 'import ile modül kullanma ve kütüphane ekleme.',
    exampleCode: `# Modül import etme
import math
print(math.sqrt(16))  # 4.0
print(math.pi)  # 3.14159...

# Belirli fonksiyon import
from math import sqrt, pi
print(sqrt(25))  # 5.0

# Takma ad ile import
import math as m
print(m.pow(2, 3))  # 8.0`,
    challenge: {
      instructions: 'math modülünü import et.',
      starterCode: `___BLANK1___ math
print(math.sqrt(9))`,
      solution: `import math
print(math.sqrt(9))`,
      blanks: ['import'],
      expectedOutput: '3.0'
    },
    xpReward: 10
  },

  {
    id: 'py-random',
    title: 'Random Modülü',
    order: 21,
    category: 'Python',
    description: 'Rastgele sayı üretme: random modülü.',
    exampleCode: `import random

# Rastgele sayı (0-1 arası)
print(random.random())

# Belirli aralıkta tam sayı
print(random.randint(1, 10))

# Listeden rastgele seçim
meyveler = ["elma", "armut", "muz"]
print(random.choice(meyveler))`,
    challenge: {
      instructions: '1-100 arası rastgele sayı üret.',
      starterCode: `import random
sayi = random.___BLANK1___(1, 100)
print(sayi)`,
      solution: `import random
sayi = random.randint(1, 100)
print(sayi)`,
      blanks: ['randint'],
      expectedOutput: '(1-100 arası rastgele bir sayı, örn: 42)'
    },
    xpReward: 10
  },

  {
    id: 'py-datetime',
    title: 'Tarih ve Saat',
    order: 22,
    category: 'Python',
    description: 'datetime modülü ile tarih ve saat işlemleri.',
    exampleCode: `from datetime import datetime

# Şu anki tarih ve saat
simdi = datetime.now()
print(simdi)

# Tarih formatlama
print(simdi.strftime("%d/%m/%Y"))
print(simdi.strftime("%H:%M:%S"))

# Tarih oluşturma
dogum = datetime(1998, 5, 15)
print(dogum)`,
    challenge: {
      instructions: 'Şu anki zamanı al ve yazdır.',
      starterCode: `from datetime import datetime
simdi = datetime.___BLANK1___()
print(simdi)`,
      solution: `from datetime import datetime
simdi = datetime.now()
print(simdi)`,
      blanks: ['now'],
      expectedOutput: '(Şu anki tarih ve saat, örn: 2025-12-18 14:30:45.123456)'
    },
    xpReward: 10
  },

  {
    id: 'py-oop-intro',
    title: 'OOP - Giriş',
    order: 23,
    category: 'Python',
    description: 'Nesne Yönelimli Programlama kavramları.',
    exampleCode: `# Class tanımlama
class Araba:
    def __init__(self, marka, model):
        self.marka = marka
        self.model = model
    
    def bilgi(self):
        print(f"{self.marka} {self.model}")

# Object oluşturma
araba1 = Araba("Toyota", "Corolla")
araba1.bilgi()`,
    challenge: {
      instructions: 'Class oluştur ve object tanımla.',
      starterCode: `___BLANK1___ Kisi:
    def __init__(self, isim):
        self.isim = isim

kisi1 = Kisi("Ali")`,
      solution: `class Kisi:
    def __init__(self, isim):
        self.isim = isim

kisi1 = Kisi("Ali")`,
      blanks: ['class'],
      expectedOutput: '✓ Kisi sınıfı ve kisi1 objesi başarıyla oluşturuldu'
    },
    xpReward: 10
  },

  {
    id: 'py-class-object',
    title: 'Class ve Object',
    order: 24,
    category: 'Python',
    description: 'Sınıf oluşturma ve nesne üretme.',
    exampleCode: `class Ogrenci:
    def __init__(self, isim, numara):
        self.isim = isim
        self.numara = numara
    
    def tanit(self):
        print(f"Ben {self.isim}, numaram {self.numara}")

# Object oluşturma
ogr1 = Ogrenci("Ahmet", 123)
ogr2 = Ogrenci("Mehmet", 456)

ogr1.tanit()
ogr2.tanit()`,
    challenge: {
      instructions: '__init__ metodunu tamamla.',
      starterCode: `class Araba:
    def ___BLANK1___(self, marka):
        self.marka = marka

araba = Araba("BMW")`,
      solution: `class Araba:
    def __init__(self, marka):
        self.marka = marka

araba = Araba("BMW")`,
      blanks: ['__init__'],
      expectedOutput: '✓ Araba sınıfı ve araba objesi başarıyla oluşturuldu (marka="BMW")'
    },
    xpReward: 10
  },

  {
    id: 'py-inheritance',
    title: 'Miras Alma (Inheritance)',
    order: 25,
    category: 'Python',
    description: 'Bir class\'ın başka bir class\'tan özellik alması.',
    exampleCode: `# Ana class
class Hayvan:
    def __init__(self, isim):
        self.isim = isim
    
    def ses_cikar(self):
        pass

# Alt class (miras alır)
class Kedi(Hayvan):
    def ses_cikar(self):
        print("Miyav!")

class Kopek(Hayvan):
    def ses_cikar(self):
        print("Hav hav!")

kedi = Kedi("Tekir")
kedi.ses_cikar()`,
    challenge: {
      instructions: 'Hayvan class\'ından miras alan Kus class\'ı oluştur.',
      starterCode: `class Hayvan:
    pass

class Kus(___BLANK1___):
    pass`,
      solution: `class Hayvan:
    pass

class Kus(Hayvan):
    pass`,
      blanks: ['Hayvan'],
      expectedOutput: '✓ Kus sınıfı Hayvan sınıfından başarıyla miras aldı'
    },
    xpReward: 10
  },

  {
    id: 'py-encapsulation',
    title: 'Kapsülleme',
    order: 26,
    category: 'Python',
    description: 'Private/public özellikler ve getter/setter.',
    exampleCode: `class BankaHesabi:
    def __init__(self, bakiye):
        self.__bakiye = bakiye  # Private
    
    def bakiye_goster(self):
        return self.__bakiye
    
    def para_yatir(self, miktar):
        self.__bakiye += miktar

hesap = BankaHesabi(1000)
print(hesap.bakiye_goster())
hesap.para_yatir(500)
print(hesap.bakiye_goster())`,
    challenge: {
      instructions: 'Private değişken oluştur (__ ile başlat).',
      starterCode: `class Kisi:
    def __init__(self, yas):
        self.___BLANK1___yas = yas`,
      solution: `class Kisi:
    def __init__(self, yas):
        self.__yas = yas`,
      blanks: ['__'],
      expectedOutput: '✓ Private değişken __yas başarıyla oluşturuldu (dışarıdan erişilemez)'
    },
    xpReward: 10
  },

  {
    id: 'py-polymorphism',
    title: 'Polimorfizm',
    order: 27,
    category: 'Python',
    description: 'Aynı metodun farklı class\'larda farklı davranması.',
    exampleCode: `class Sekil:
    def alan_hesapla(self):
        pass

class Dikdortgen(Sekil):
    def __init__(self, en, boy):
        self.en = en
        self.boy = boy
    
    def alan_hesapla(self):
        return self.en * self.boy

class Daire(Sekil):
    def __init__(self, yaricap):
        self.yaricap = yaricap
    
    def alan_hesapla(self):
        return 3.14 * self.yaricap ** 2

sekiller = [Dikdortgen(5, 10), Daire(7)]
for sekil in sekiller:
    print(sekil.alan_hesapla())`,
    challenge: {
      instructions: 'Polimorfizm ile aynı metodu farklı uygula.',
      starterCode: `class Hayvan:
    def ses(self):
        pass

class Kedi(Hayvan):
    def ___BLANK1___(self):
        print("Miyav")`,
      solution: `class Hayvan:
    def ses(self):
        pass

class Kedi(Hayvan):
    def ses(self):
        print("Miyav")`,
      blanks: ['ses'],
      expectedOutput: '✓ Kedi sınıfı ses() metodunu başarıyla override etti'
    },
    xpReward: 10
  },

  {
    id: 'py-pip',
    title: 'PIP ve Paket Yönetimi',
    order: 28,
    category: 'Python',
    description: 'pip ile kütüphane kurma ve güncelleme.',
    exampleCode: `# Terminal komutları:

# Paket kurma
pip install requests

# Paket güncelleme
pip install --upgrade requests

# Paket kaldırma
pip uninstall requests

# Kurulu paketleri listele
pip list

# Belirli versiyonu kurma
pip install requests==2.28.0`,
    challenge: {
      instructions: 'requests kütüphanesini kur (teorik).',
      starterCode: `# Terminal'de çalıştır:
___BLANK1___ install requests`,
      solution: `# Terminal'de çalıştır:
pip install requests`,
      blanks: ['pip'],
      expectedOutput: '✓ Terminal komutu: requests kütüphanesi kurulur'
    },
    xpReward: 10
  },

  {
    id: 'py-requests',
    title: 'Requests Kütüphanesi',
    order: 29,
    category: 'Python',
    description: 'HTTP istekleri yapma ve web\'den veri çekme.',
    exampleCode: `import requests

# GET isteği
response = requests.get("https://api.example.com/data")
print(response.status_code)  # 200
print(response.json())

# POST isteği
data = {"isim": "Furkan", "yas": 25}
response = requests.post("https://api.example.com/users", json=data)
print(response.status_code)`,
    challenge: {
      instructions: 'GET isteği yap.',
      starterCode: `import requests
response = requests.___BLANK1___("https://api.example.com")
print(response.status_code)`,
      solution: `import requests
response = requests.get("https://api.example.com")
print(response.status_code)`,
      blanks: ['get'],
      expectedOutput: '200'
    },
    xpReward: 10
  },

  {
    id: 'py-json',
    title: 'JSON İşlemleri',
    order: 30,
    category: 'Python',
    description: 'JSON verisi okuma, yazma ve parse etme.',
    exampleCode: `import json

# Python dict -> JSON string
veri = {"isim": "Furkan", "yas": 25}
json_string = json.dumps(veri)
print(json_string)

# JSON string -> Python dict
json_string = '{"isim": "Ali", "yas": 30}'
veri = json.loads(json_string)
print(veri["isim"])

# Dosyaya JSON yazma
with open("veri.json", "w") as dosya:
    json.dump(veri, dosya)`,
    challenge: {
      instructions: 'JSON string\'i Python dict\'e çevir.',
      starterCode: `import json
json_str = '{"ad": "Ahmet"}'
veri = json.___BLANK1___(json_str)
print(veri)`,
      solution: `import json
json_str = '{"ad": "Ahmet"}'
veri = json.loads(json_str)
print(veri)`,
      blanks: ['loads'],
      expectedOutput: "{'ad': 'Ahmet'}"    },
    xpReward: 10
  }
];

// Python Final Sınavı (15 Soru)
export const pythonFinalExam = [
  {
    id: 'q1',
    question: 'Python\'da değişken tanımlarken tip belirtmek gerekir mi?',
    options: ['Evet, zorunlu', 'Hayır, dinamik tipli', 'Sadece int için', 'Sadece str için'],
    correctAnswer: 1,
    explanation: 'Python dinamik tipli bir dildir, tip belirtmek zorunlu değildir.'
  },
  {
    id: 'q2',
    question: 'input() fonksiyonu hangi tip döndürür?',
    options: ['int', 'float', 'str', 'bool'],
    correctAnswer: 2,
    explanation: 'input() fonksiyonu her zaman string (str) döndürür.'
  },
  {
    id: 'q3',
    question: 'Liste ve tuple arasındaki fark nedir?',
    options: [
      'Liste değiştirilebilir, tuple değiştirilemez',
      'Tuple değiştirilebilir, liste değiştirilemez',
      'İkisi de aynı',
      'Tuple daha yavaş'
    ],
    correctAnswer: 0,
    explanation: 'Liste mutable (değiştirilebilir), tuple immutable (değiştirilemez).'
  },
  {
    id: 'q4',
    question: 'Dictionary\'de key-value nasıl eklenir?',
    options: [
      'dict.add(key, value)',
      'dict[key] = value',
      'dict.insert(key, value)',
      'dict.append(key, value)'
    ],
    correctAnswer: 1,
    explanation: 'Dictionary\'e dict[key] = value ile ekleme yapılır.'
  },
  {
    id: 'q5',
    question: 'range(5) kaç sayı üretir?',
    options: ['4', '5', '6', '0'],
    correctAnswer: 1,
    explanation: 'range(5) → 0, 1, 2, 3, 4 (5 adet sayı)'
  },
  {
    id: 'q6',
    question: 'Lambda fonksiyonu nedir?',
    options: [
      'Çok satırlı fonksiyon',
      'Tek satırlık anonim fonksiyon',
      'Class içindeki fonksiyon',
      'Import edilen fonksiyon'
    ],
    correctAnswer: 1,
    explanation: 'Lambda, tek satırlık anonim fonksiyondur.'
  },
  {
    id: 'q7',
    question: 'try-except ne işe yarar?',
    options: [
      'Hata yakalama',
      'Döngü kontrolü',
      'Fonksiyon tanımlama',
      'Değişken atama'
    ],
    correctAnswer: 0,
    explanation: 'try-except hata yönetimi için kullanılır.'
  },
  {
    id: 'q8',
    question: 'Dosyayı okuma modunda nasıl açarız?',
    options: ['open("x", "w")', 'open("x", "r")', 'open("x", "a")', 'open("x")'],
    correctAnswer: 1,
    explanation: '"r" (read) modu dosyayı okuma için açar.'
  },
  {
    id: 'q9',
    question: '__init__ metodu ne zaman çalışır?',
    options: [
      'Class silindiğinde',
      'Object oluşturulduğunda',
      'Metod çağrıldığında',
      'Program sonunda'
    ],
    correctAnswer: 1,
    explanation: '__init__ constructor metodu, object oluşturulduğunda çalışır.'
  },
  {
    id: 'q10',
    question: 'Inheritance (miras alma) nasıl yapılır?',
    options: [
      'class Child(Parent):',
      'class Child extends Parent:',
      'class Child inherit Parent:',
      'class Child <- Parent:'
    ],
    correctAnswer: 0,
    explanation: 'Python\'da miras alma: class Child(Parent):'
  },
  {
    id: 'q11',
    question: 'Private değişken nasıl tanımlanır?',
    options: [
      'private x',
      '_x',
      '__x',
      '#x'
    ],
    correctAnswer: 2,
    explanation: 'İki alt çizgi (__) ile başlayan değişkenler private\'tır.'
  },
  {
    id: 'q12',
    question: 'pip nedir?',
    options: [
      'Python yorumlayıcısı',
      'Paket yöneticisi',
      'Veri tipi',
      'Döngü türü'
    ],
    correctAnswer: 1,
    explanation: 'pip, Python paket yöneticisidir.'
  },
  {
    id: 'q13',
    question: 'requests.get() ne yapar?',
    options: [
      'Dosya okur',
      'HTTP GET isteği yapar',
      'Değişken alır',
      'Input alır'
    ],
    correctAnswer: 1,
    explanation: 'requests.get() web\'e HTTP GET isteği yapar.'
  },
  {
    id: 'q14',
    question: 'json.loads() ne yapar?',
    options: [
      'JSON dosyası yükler',
      'JSON string\'i Python objesine çevirir',
      'JSON yazar',
      'JSON siler'
    ],
    correctAnswer: 1,
    explanation: 'json.loads() JSON string\'ini Python objesine parse eder.'
  },
  {
    id: 'q15',
    question: 'break ve continue arasındaki fark nedir?',
    options: [
      'İkisi de aynı',
      'break döngüyü durdurur, continue o adımı atlar',
      'continue döngüyü durdurur, break atlar',
      'Hiçbir fark yok'
    ],
    correctAnswer: 1,
    explanation: 'break döngüyü sonlandırır, continue o iterasyonu atlar.'
  }
];

// =====================
// KOTLIN LESSONS (30 Ders)
// =====================

export const kotlinLessons: LessonContent[] = [
  // 1. Kotlin'e Giriş ve main fonksiyonu
  {
    id: 'kt-intro-main',
    title: 'Kotlin\'e Giriş ve main Fonksiyonu',
    order: 1,
    category: 'Kotlin',
    description: 'Kotlin programlama diline giriş ve ilk program.',
    detailedContent: 'Kotlin, modern, güvenli ve açık bir Android geliştirme dilidir. Google tarafından resmi Android dili olarak kabul edilmiştir.',
    sections: [
      {
        title: 'Kotlin Nedir?',
        content: 'Kotlin, JetBrains tarafından geliştirilen, Java ile %100 uyumlu, modern bir programlama dilidir. Android, Backend, Web ve masaüstü uygulamaları geliştirilebilir.'
      },
      {
        title: 'main Fonksiyonu',
        content: 'Her Kotlin programı main() fonksiyonuyla başlar:\n\nfun main() {\n    println("Merhaba Dünya")\n}'
      }
    ],
    exampleCode: `// İlk Kotlin programı
fun main() {
    println("Merhaba Dünya!")
    println("Kotlin öğreniyorum")
    
    // Yorum satırı
    /* Çok satırlı
       yorum */
}`,
    challenge: {
      instructions: 'main fonksiyonu oluştur ve ekrana "Merhaba" yazdır.',
      starterCode: `___BLANK1___ main() {
    ___BLANK2___("Merhaba")
}`,
      solution: `fun main() {
    println("Merhaba")
}`,
      blanks: ['fun', 'println'],
      expectedOutput: 'Merhaba'
    },
    xpReward: 10
  },

  // 2. Değişkenler (val vs var)
  {
    id: 'kt-variables',
    title: 'Değişkenler (val vs var)',
    order: 2,
    category: 'Kotlin',
    description: 'Değişken tanımlama: val (immutable) ve var (mutable).',
    detailedContent: 'Kotlin\'de iki tür değişken tanımlama yöntemi vardır: val (değiştirilemez) ve var (değiştirilebilir).',
    sections: [
      {
        title: 'val vs var',
        content: '• val: Değiştirilemez (immutable) - final gibi\n• var: Değiştirilebilir (mutable)\n\nKotlin, mümkün olduğunca val kullanmanızı önerir (daha güvenli).'
      },
      {
        title: 'Tip Çıkarımı',
        content: 'Kotlin tip çıkarımı yapar, tip belirtmek zorunlu değildir:\n\nval isim = "Furkan"  // String olduğu anlaşılır\nval yas = 25          // Int olduğu anlaşılır'
      }
    ],
    exampleCode: `fun main() {
    // val - Değiştirilemez
    val isim = "Furkan"
    // isim = "Ali" // HATA!
    
    // var - Değiştirilebilir
    var yas = 25
    yas = 26  // ✓ OK
    
    // Tip belirtmek (opsiyonel)
    val sehir: String = "İstanbul"
    var sayi: Int = 100
    
    println("$isim, $yas yaşında, $sehir'de yaşıyor")
}`,
    challenge: {
      instructions: 'val ile isim, var ile yas değişkeni tanımla.',
      starterCode: `fun main() {
    ___BLANK1___ isim = "Ali"
    ___BLANK2___ yas = 20
    println(isim)
}`,
      solution: `fun main() {
    val isim = "Ali"
    var yas = 20
    println(isim)
}`,
      blanks: ['val', 'var'],
      expectedOutput: 'Ali'
    },
    xpReward: 10
  },

  // 3. Veri Tipleri
  {
    id: 'kt-data-types',
    title: 'Veri Tipleri',
    order: 3,
    category: 'Kotlin',
    description: 'Temel veri tipleri: Int, Double, String, Boolean.',
    detailedContent: 'Kotlin\'de tüm tipler objedir. Primitive tip kavramı yoktur.',
    sections: [
      {
        title: 'Sayısal Tipler',
        content: '• Byte: -128 to 127\n• Short: -32768 to 32767\n• Int: -2^31 to 2^31-1\n• Long: -2^63 to 2^63-1\n• Float: 32-bit\n• Double: 64-bit'
      },
      {
        title: 'Diğer Tipler',
        content: '• String: Metin\n• Char: Tek karakter\n• Boolean: true/false'
      }
    ],
    exampleCode: `fun main() {
    // Sayısal tipler
    val sayi: Int = 42
    val ondalik: Double = 3.14
    val kucukOndalik: Float = 2.5f
    val buyukSayi: Long = 1000000L
    
    // String ve Char
    val isim: String = "Furkan"
    val harf: Char = 'A'
    
    // Boolean
    val aktif: Boolean = true
    
    println("Sayı: $sayi")
    println("Ondalık: $ondalik")
    println("Aktif mi? $aktif")
}`,
    challenge: {
      instructions: 'Int, Double ve Boolean tipinde değişkenler oluştur.',
      starterCode: `fun main() {
    val sayi: ___BLANK1___ = 10
    val fiyat: ___BLANK2___ = 19.99
    val durum: ___BLANK3___ = true
}`,
      solution: `fun main() {
    val sayi: Int = 10
    val fiyat: Double = 19.99
    val durum: Boolean = true
}`,
      blanks: ['Int', 'Double', 'Boolean'],
      expectedOutput: 'Değişkenler başarıyla tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  // 4. String Şablonları
  {
    id: 'kt-string-templates',
    title: 'String Şablonları',
    order: 4,
    category: 'Kotlin',
    description: 'String içinde değişken kullanma: $ ve ${}.',
    detailedContent: 'Kotlin\'de string içine değişken eklemek için $ (dolar) işareti kullanılır.',
    sections: [
      {
        title: 'String Template',
        content: '• $değişken: Basit değişken\n• ${ifade}: Karmaşık ifadeler\n\nval isim = "Ali"\nprintln("Merhaba $isim")  // Merhaba Ali'
      }
    ],
    exampleCode: `fun main() {
    val isim = "Furkan"
    val yas = 25
    
    // Basit kullanım
    println("Adım $isim")
    
    // İfade kullanımı
    println("Adım $isim ve \${yas + 5} yıl sonra \${yas + 5} yaşında olacağım")
    
    // String birleştirme
    println("Merhaba " + isim)  // Eski yöntem
    println("Merhaba $isim")     // Kotlin yöntemi
}`,
    challenge: {
      instructions: 'String template ile isim ve yaş yazdır.',
      starterCode: `fun main() {
    val isim = "Ahmet"
    val yas = 30
    println("Benim adım ___BLANK1___isim ve ___BLANK2___yas yaşındayım")
}`,
      solution: `fun main() {
    val isim = "Ahmet"
    val yas = 30
    println("Benim adım $isim ve $yas yaşındayım")
}`,
      blanks: ['$', '$'],
      expectedOutput: 'Benim adım Ahmet ve 30 yaşındayım'
    },
    xpReward: 10
  },

  // 5. Koşullu İfadeler
  {
    id: 'kt-conditionals',
    title: 'Koşullu İfadeler (if-else)',
    order: 5,
    category: 'Kotlin',
    description: 'if-else yapısı ve expression olarak kullanımı.',
    detailedContent: 'Kotlin\'de if-else hem statement hem de expression olarak kullanılabilir.',
    sections: [
      {
        title: 'if-else Statement',
        content: 'if (koşul) {\n    // Kod\n} else {\n    // Kod\n}'
      },
      {
        title: 'if-else Expression',
        content: 'Kotlin\'de if-else değer döndürebilir:\n\nval max = if (a > b) a else b'
      }
    ],
    exampleCode: `fun main() {
    val yas = 18
    
    // Statement olarak
    if (yas >= 18) {
        println("Reşitsiniz")
    } else {
        println("Reşit değilsiniz")
    }
    
    // Expression olarak
    val durum = if (yas >= 18) "Reşit" else "Reşit değil"
    println(durum)
    
    // Tek satırda
    val max = if (10 > 5) 10 else 5
    println("Max: $max")
}`,
    challenge: {
      instructions: 'if-else ile yaş kontrolü yap.',
      starterCode: `fun main() {
    val yas = 20
    ___BLANK1___ (yas >= 18) {
        println("Reşit")
    }
}`,
      solution: `fun main() {
    val yas = 20
    if (yas >= 18) {
        println("Reşit")
    }
}`,
      blanks: ['if'],
      expectedOutput: 'Reşit'
    },
    xpReward: 10
  },

  // 6. Null Safety
  {
    id: 'kt-null-safety',
    title: 'Null Safety (?, !!)',
    order: 6,
    category: 'Kotlin',
    description: 'Kotlin\'in güvenli null yönetimi: ?, !!, ?:.',
    detailedContent: 'Kotlin, null pointer hatalarını önlemek için güçlü bir null safety sistemi sunar.',
    sections: [
      {
        title: 'Nullable Tipler',
        content: '• Type: null olamaz\n• Type?: null olabilir\n\nval isim: String = null  // HATA\nval isim: String? = null // ✓ OK'
      },
      {
        title: 'Null Operatörleri',
        content: '• ?: Safe call - null değilse çalıştır\n• !!: Non-null assertion - kesinlikle null değil (dikkatli kullan!)\n• ?: Elvis operator - null ise varsayılan değer'
      }
    ],
    exampleCode: `fun main() {
    // Nullable tip
    var isim: String? = "Furkan"
    isim = null  // OK
    
    // Safe call ?.
    println(isim?.length)  // null ise null döner
    
    // Non-null assertion !!
    // println(isim!!.length)  // null ise exception!
    
    // Elvis operator ?:
    val uzunluk = isim?.length ?: 0
    println("Uzunluk: $uzunluk")
    
    // let ile null check
    isim?.let {
        println("İsim: $it")
    }
}`,
    challenge: {
      instructions: 'Nullable string tanımla ve safe call kullan.',
      starterCode: `fun main() {
    var isim: String___BLANK1___ = null
    println(isim___BLANK2___length)
}`,
      solution: `fun main() {
    var isim: String? = null
    println(isim?.length)
}`,
      blanks: ['?', '?.'],
      expectedOutput: 'null'
    },
    xpReward: 10
  },

  // 7. Döngüler
  {
    id: 'kt-loops',
    title: 'Döngüler (for, while)',
    order: 7,
    category: 'Kotlin',
    description: 'for, while döngüleri ve kullanımları.',
    detailedContent: 'Kotlin\'de for ve while döngüleri ile tekrarlayan işlemler yapılır.',
    sections: [
      {
        title: 'for Döngüsü',
        content: 'for (item in collection) {\n    // Her item için\n}'
      },
      {
        title: 'while Döngüsü',
        content: 'while (koşul) {\n    // Koşul doğruyken\n}'
      }
    ],
    exampleCode: `fun main() {
    // for döngüsü
    for (i in 1..5) {
        println(i)  // 1, 2, 3, 4, 5
    }
    
    // Liste üzerinde
    val meyveler = listOf("elma", "armut", "muz")
    for (meyve in meyveler) {
        println(meyve)
    }
    
    // while döngüsü
    var sayac = 0
    while (sayac < 3) {
        println("Sayaç: $sayac")
        sayac++
    }
}`,
    challenge: {
      instructions: 'for döngüsü ile 1\'den 5\'e kadar yazdır.',
      starterCode: `fun main() {
    ___BLANK1___ (i ___BLANK2___ 1..5) {
        println(i)
    }
}`,
      solution: `fun main() {
    for (i in 1..5) {
        println(i)
    }
}`,
      blanks: ['for', 'in'],
      expectedOutput: '1\n2\n3\n4\n5'
    },
    xpReward: 10
  },

  // 8. Range Kullanımı
  {
    id: 'kt-ranges',
    title: 'Range Kullanımı',
    order: 8,
    category: 'Kotlin',
    description: 'Range (aralık) oluşturma: .., until, downTo, step.',
    detailedContent: 'Kotlin\'de range\'ler sayı aralıkları oluşturmak için kullanılır.',
    sections: [
      {
        title: 'Range Operatörleri',
        content: '• 1..5: 1\'den 5\'e kadar (5 dahil)\n• 1 until 5: 1\'den 5\'e kadar (5 hariç)\n• 5 downTo 1: 5\'ten 1\'e azalarak\n• 1..10 step 2: 2\'şer atlayarak'
      }
    ],
    exampleCode: `fun main() {
    // Basit range
    for (i in 1..5) {
        print("$i ")  // 1 2 3 4 5
    }
    println()
    
    // until (son dahil değil)
    for (i in 1 until 5) {
        print("$i ")  // 1 2 3 4
    }
    println()
    
    // downTo (azalan)
    for (i in 5 downTo 1) {
        print("$i ")  // 5 4 3 2 1
    }
    println()
    
    // step (atlama)
    for (i in 1..10 step 2) {
        print("$i ")  // 1 3 5 7 9
    }
}`,
    challenge: {
      instructions: '1\'den 10\'a kadar 2\'şer atlayarak yazdır.',
      starterCode: `fun main() {
    for (i in 1..10 ___BLANK1___ 2) {
        println(i)
    }
}`,
      solution: `fun main() {
    for (i in 1..10 step 2) {
        println(i)
    }
}`,
      blanks: ['step'],
      expectedOutput: '1\n3\n5\n7\n9'
    },
    xpReward: 10
  },

  // 9. Fonksiyonlar
  {
    id: 'kt-functions',
    title: 'Fonksiyonlar',
    order: 9,
    category: 'Kotlin',
    description: 'Fonksiyon tanımlama, parametreler ve dönüş değerleri.',
    detailedContent: 'Kotlin\'de fonksiyonlar fun anahtar kelimesi ile tanımlanır.',
    sections: [
      {
        title: 'Fonksiyon Tanımlama',
        content: 'fun fonksiyonAdi(parametre: Tip): DönüşTipi {\n    return değer\n}'
      },
      {
        title: 'Single Expression',
        content: 'Tek satırlık fonksiyonlar için:\n\nfun topla(a: Int, b: Int) = a + b'
      }
    ],
    exampleCode: `fun main() {
    selamla()
    selamlaKisi("Furkan")
    val sonuc = topla(5, 3)
    println("Toplam: $sonuc")
}

fun selamla() {
    println("Merhaba!")
}

fun selamlaKisi(isim: String) {
    println("Merhaba $isim")
}

fun topla(a: Int, b: Int): Int {
    return a + b
}

// Single expression
fun carp(a: Int, b: Int) = a * b`,
    challenge: {
      instructions: 'İki sayıyı toplayan fonksiyon yaz.',
      starterCode: `___BLANK1___ topla(a: Int, b: Int): Int {
    ___BLANK2___ a + b
}`,
      solution: `fun topla(a: Int, b: Int): Int {
    return a + b
}`,
      blanks: ['fun', 'return'],
      expectedOutput: 'Fonksiyon tanımlandı (çalıştırılmadı)'
    },
    xpReward: 10
  },

  // 10. Array ve Listeler
  {
    id: 'kt-arrays-lists',
    title: 'Array ve Listeler',
    order: 10,
    category: 'Kotlin',
    description: 'Array, List, MutableList kullanımı.',
    detailedContent: 'Kotlin\'de koleksiyonlar için Array, List ve MutableList yapıları vardır.',
    sections: [
      {
        title: 'Array vs List',
        content: '• Array: Sabit boyutlu\n• List: Değiştirilemez (immutable)\n• MutableList: Değiştirilebilir'
      }
    ],
    exampleCode: `fun main() {
    // Array (sabit boyut)
    val sayilar = arrayOf(1, 2, 3, 4, 5)
    println(sayilar[0])  // 1
    
    // List (immutable)
    val meyveler = listOf("elma", "armut", "muz")
    println(meyveler[1])  // armut
    // meyveler.add("çilek")  // HATA!
    
    // MutableList (değiştirilebilir)
    val sehirler = mutableListOf("İstanbul", "Ankara")
    sehirler.add("İzmir")
    sehirler.remove("Ankara")
    println(sehirler)
    
    // Liste işlemleri
    println("Boyut: \${meyveler.size}")
    println("İlk: \${meyveler.first()}")
    println("Son: \${meyveler.last()}")
}`,
    challenge: {
      instructions: 'MutableList oluştur ve eleman ekle.',
      starterCode: `fun main() {
    val liste = ___BLANK1___("a", "b")
    liste.___BLANK2___("c")
    println(liste)
}`,
      solution: `fun main() {
    val liste = mutableListOf("a", "b")
    liste.add("c")
    println(liste)
}`,
      blanks: ['mutableListOf', 'add'],
      expectedOutput: '[a, b, c]'
    },
    xpReward: 10
  },

  // 11-30 derslerini kısaca ekliyorum

  // 11. Map ve Set
  {
    id: 'kt-map-set',
    title: 'Map ve Set Yapıları',
    order: 11,
    category: 'Kotlin',
    description: 'Map (key-value) ve Set (benzersiz elemanlar) yapıları.',
    exampleCode: `fun main() {
    // Map
    val notlar = mapOf("Ali" to 90, "Veli" to 85)
    println(notlar["Ali"])  // 90
    
    // MutableMap
    val sehirler = mutableMapOf("TR" to "Türkiye")
    sehirler["US"] = "Amerika"
    
    // Set (benzersiz elemanlar)
    val sayilar = setOf(1, 2, 3, 2, 1)
    println(sayilar)  // [1, 2, 3]
    
    // MutableSet
    val renkler = mutableSetOf("kırmızı", "mavi")
    renkler.add("yeşil")
}`,
    challenge: {
      instructions: 'Map oluştur ve key ile değere eriş.',
      starterCode: `fun main() {
    val map = ___BLANK1___("a" to 1, "b" to 2)
    println(map["a"])
}`,
      solution: `fun main() {
    val map = mapOf("a" to 1, "b" to 2)
    println(map["a"])
}`,
      blanks: ['mapOf'],
      expectedOutput: '1'
    },
    xpReward: 10
  },

  // 12. When Yapısı
  {
    id: 'kt-when',
    title: 'When Yapısı (Switch-Case)',
    order: 12,
    category: 'Kotlin',
    description: 'when yapısı ile çoklu koşul kontrolü.',
    exampleCode: `fun main() {
    val sayi = 2
    
    when (sayi) {
        1 -> println("Bir")
        2 -> println("İki")
        3 -> println("Üç")
        else -> println("Diğer")
    }
    
    // Expression olarak
    val sonuc = when (sayi) {
        1, 2 -> "Küçük"
        in 3..10 -> "Orta"
        else -> "Büyük"
    }
    println(sonuc)
}`,
    challenge: {
      instructions: 'when ile sayı kontrolü yap.',
      starterCode: `fun main() {
    val x = 5
    ___BLANK1___ (x) {
        5 -> println("Beş")
        ___BLANK2___ -> println("Diğer")
    }
}`,
      solution: `fun main() {
    val x = 5
    when (x) {
        5 -> println("Beş")
        else -> println("Diğer")
    }
}`,
      blanks: ['when', 'else'],
      expectedOutput: 'Beş'
    },
    xpReward: 10
  },

  // 13. Class ve Nesne
  {
    id: 'kt-class-object',
    title: 'Class ve Nesne',
    order: 13,
    category: 'Kotlin',
    description: 'Sınıf tanımlama ve nesne oluşturma.',
    exampleCode: `fun main() {
    val araba = Araba("Toyota", "Corolla")
    araba.bilgiGoster()
}

class Araba(val marka: String, val model: String) {
    fun bilgiGoster() {
        println("$marka $model")
    }
}`,
    challenge: {
      instructions: 'Class oluştur ve nesne tanımla.',
      starterCode: `___BLANK1___ Kisi(val isim: String)

fun main() {
    val kisi = Kisi("Ali")
}`,
      solution: `class Kisi(val isim: String)

fun main() {
    val kisi = Kisi("Ali")
}`,
      blanks: ['class'],
      expectedOutput: 'Kisi nesnesi oluşturuldu (çıktı yok)'
    },
    xpReward: 10
  },

  // 14. Constructor
  {
    id: 'kt-constructor',
    title: 'Constructor (Yapıcı)',
    order: 14,
    category: 'Kotlin',
    description: 'Primary ve secondary constructor kullanımı.',
    exampleCode: `// Primary constructor
class Kisi(val isim: String, val yas: Int)

// Secondary constructor
class Araba(val marka: String) {
    var model: String = ""
    
    constructor(marka: String, model: String) : this(marka) {
        this.model = model
    }
}

// init bloğu
class Ogrenci(val isim: String) {
    init {
        println("Öğrenci oluşturuldu: $isim")
    }
}`,
    challenge: {
      instructions: 'Primary constructor ile class oluştur.',
      starterCode: `class Urun(___BLANK1___ isim: String, val fiyat: Double)`,
      solution: `class Urun(val isim: String, val fiyat: Double)`,
      blanks: ['val'],
      expectedOutput: 'Urun class tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  // 15. Data Classes
  {
    id: 'kt-data-classes',
    title: 'Data Classes',
    order: 15,
    category: 'Kotlin',
    description: 'Veri tutmak için özel data class yapısı.',
    exampleCode: `// Data class
data class Kullanici(val isim: String, val yas: Int)

fun main() {
    val kullanici = Kullanici("Furkan", 25)
    
    // toString otomatik
    println(kullanici)  // Kullanici(isim=Furkan, yas=25)
    
    // copy
    val yeniKullanici = kullanici.copy(yas = 26)
    
    // Destructuring
    val (isim, yas) = kullanici
    println("$isim, $yas")
}`,
    challenge: {
      instructions: 'Data class oluştur.',
      starterCode: `___BLANK1___ class Kisi(val isim: String, val yas: Int)`,
      solution: `data class Kisi(val isim: String, val yas: Int)`,
      blanks: ['data'],
      expectedOutput: 'Data class tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  // 16-30 kalan dersler (kısa versiyonlar)

  {
    id: 'kt-inheritance',
    title: 'Kalıtım (Inheritance)',
    order: 16,
    category: 'Kotlin',
    description: 'Sınıflar arası miras alma: open, override.',
    exampleCode: `open class Hayvan(val isim: String) {
    open fun sesCikar() {
        println("Hayvan sesi")
    }
}

class Kedi(isim: String) : Hayvan(isim) {
    override fun sesCikar() {
        println("Miyav!")
    }
}

fun main() {
    val kedi = Kedi("Tekir")
    kedi.sesCikar()
}`,
    challenge: {
      instructions: 'Hayvan class\'ından miras al.',
      starterCode: `open class Hayvan
class Kopek : ___BLANK1___()`,
      solution: `open class Hayvan
class Kopek : Hayvan()`,
      blanks: ['Hayvan'],
      expectedOutput: 'Kopek class Hayvan\'dan miras aldı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-interface',
    title: 'Interface (Arayüz)',
    order: 17,
    category: 'Kotlin',
    description: 'Interface tanımlama ve uygulama.',
    exampleCode: `interface Calisabilir {
    fun calis()
    fun dinlen() {
        println("Dinleniyorum") // Default implementation
    }
}

class Calisan : Calisabilir {
    override fun calis() {
        println("Çalışıyorum")
    }
}

fun main() {
    val calisan = Calisan()
    calisan.calis()
    calisan.dinlen()
}`,
    challenge: {
      instructions: 'Interface oluştur ve uygula.',
      starterCode: `___BLANK1___ Ucabilir {
    fun uc()
}`,
      solution: `interface Ucabilir {
    fun uc()
}`,
      blanks: ['interface'],
      expectedOutput: 'Interface tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-abstract',
    title: 'Abstract Class (Soyut Sınıf)',
    order: 18,
    category: 'Kotlin',
    description: 'Soyut sınıflar ve metotlar.',
    exampleCode: `abstract class Sekil {
    abstract fun alanHesapla(): Double
    
    fun bilgiGoster() {
        println("Alan: \${alanHesapla()}")
    }
}

class Dikdortgen(val en: Double, val boy: Double) : Sekil() {
    override fun alanHesapla() = en * boy
}

fun main() {
    val dikdortgen = Dikdortgen(5.0, 10.0)
    dikdortgen.bilgiGoster()
}`,
    challenge: {
      instructions: 'Abstract class oluştur.',
      starterCode: `___BLANK1___ class Hayvan {
    abstract fun sesCikar()
}`,
      solution: `abstract class Hayvan {
    abstract fun sesCikar()
}`,
      blanks: ['abstract'],
      expectedOutput: 'Abstract class tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-extensions',
    title: 'Extension Functions',
    order: 19,
    category: 'Kotlin',
    description: 'Mevcut sınıflara fonksiyon ekleme.',
    exampleCode: `// String'e extension
fun String.ilkHarfBuyut(): String {
    return this.capitalize()
}

// Int'e extension
fun Int.karesi(): Int {
    return this * this
}

fun main() {
    val metin = "kotlin"
    println(metin.ilkHarfBuyut())  // Kotlin
    
    val sayi = 5
    println(sayi.karesi())  // 25
}`,
    challenge: {
      instructions: 'Int tipine extension fonksiyon ekle.',
      starterCode: `fun Int.ikiKati(): Int {
    return this ___BLANK1___ 2
}`,
      solution: `fun Int.ikiKati(): Int {
    return this * 2
}`,
      blanks: ['*'],
      expectedOutput: 'Extension fonksiyon tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-scope-functions',
    title: 'Scope Functions (let, run, apply)',
    order: 20,
    category: 'Kotlin',
    description: 'Scope fonksiyonları: let, run, apply, also, with.',
    exampleCode: `fun main() {
    val isim: String? = "Furkan"
    
    // let - null check için
    isim?.let {
        println("İsim: $it")
    }
    
    // apply - obje yapılandırma
    val liste = mutableListOf<String>().apply {
        add("a")
        add("b")
    }
    
    // run - sonuç döndürme
    val sonuc = isim?.run {
        "İsim uzunluğu: \${this.length}"
    }
    println(sonuc)
}`,
    challenge: {
      instructions: 'let ile null check yap.',
      starterCode: `val isim: String? = "Ali"
isim?.___BLANK1___ {
    println(it)
}`,
      solution: `val isim: String? = "Ali"
isim?.let {
    println(it)
}`,
      blanks: ['let'],
      expectedOutput: 'Ali'
    },
    xpReward: 10
  },

  {
    id: 'kt-lambda',
    title: 'Lambda İfadeleri',
    order: 21,
    category: 'Kotlin',
    description: 'Lambda expressions ve anonymous functions.',
    exampleCode: `fun main() {
    // Lambda tanımlama
    val topla = { a: Int, b: Int -> a + b }
    println(topla(5, 3))  // 8
    
    // Liste işlemleri ile
    val sayilar = listOf(1, 2, 3, 4, 5)
    val kareler = sayilar.map { it * it }
    println(kareler)  // [1, 4, 9, 16, 25]
    
    val ciftler = sayilar.filter { it % 2 == 0 }
    println(ciftler)  // [2, 4]
}`,
    challenge: {
      instructions: 'Lambda ile çarpma fonksiyonu oluştur.',
      starterCode: `val carp = ___BLANK1___ a: Int, b: Int ___BLANK2___ a * b ___BLANK3___`,
      solution: `val carp = { a: Int, b: Int -> a * b }`,
      blanks: ['{', '->', '}'],
      expectedOutput: 'Lambda fonksiyonu tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-higher-order',
    title: 'Yüksek Mertebeli Fonksiyonlar',
    order: 22,
    category: 'Kotlin',
    description: 'Fonksiyonları parametre olarak alan fonksiyonlar.',
    exampleCode: `fun main() {
    // Yüksek mertebeli fonksiyon
    fun islemYap(a: Int, b: Int, islem: (Int, Int) -> Int): Int {
        return islem(a, b)
    }
    
    val toplam = islemYap(5, 3) { x, y -> x + y }
    println(toplam)  // 8
    
    val carpim = islemYap(5, 3) { x, y -> x * y }
    println(carpim)  // 15
}`,
    challenge: {
      instructions: 'Fonksiyonu parametre olarak al.',
      starterCode: `fun calistir(fonk: () -> Unit) {
    fonk___BLANK1___
}`,
      solution: `fun calistir(fonk: () -> Unit) {
    fonk()
}`,
      blanks: ['()'],
      expectedOutput: 'Yüksek mertebeli fonksiyon tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-exceptions',
    title: 'Hata Yakalama (try-catch)',
    order: 23,
    category: 'Kotlin',
    description: 'Exception handling: try, catch, finally.',
    exampleCode: `fun main() {
    try {
        val sayi = "abc".toInt()
    } catch (e: NumberFormatException) {
        println("Geçersiz sayı!")
    } finally {
        println("İşlem tamamlandı")
    }
    
    // Expression olarak
    val sonuc = try {
        "123".toInt()
    } catch (e: Exception) {
        0
    }
    println(sonuc)
}`,
    challenge: {
      instructions: 'try-catch ile hata yakala.',
      starterCode: `___BLANK1___ {
    println(10 / 0)
} ___BLANK2___ (e: Exception) {
    println("Hata!")
}`,
      solution: `try {
    println(10 / 0)
} catch (e: Exception) {
    println("Hata!")
}`,
      blanks: ['try', 'catch'],
      expectedOutput: 'Hata!'
    },
    xpReward: 10
  },

  {
    id: 'kt-coroutines',
    title: 'Coroutines\'e Giriş',
    order: 24,
    category: 'Kotlin',
    description: 'Asenkron programlama: suspend, launch, async.',
    exampleCode: `// Not: Gerçek kullanım için coroutine kütüphanesi gerekir
// Bu sadece konsept örneği

suspend fun veriIndir(): String {
    // Simüle edilmiş ağ isteği
    return "Veri"
}

fun main() {
    // launch - fire and forget
    // val job = GlobalScope.launch {
    //     val veri = veriIndir()
    //     println(veri)
    // }
    
    // async - sonuç döner
    // val deferred = GlobalScope.async {
    //     veriIndir()
    // }
    // val sonuc = deferred.await()
}`,
    challenge: {
      instructions: 'suspend fonksiyon tanımla.',
      starterCode: `___BLANK1___ fun bekle(): String {
    return "Tamam"
}`,
      solution: `suspend fun bekle(): String {
    return "Tamam"
}`,
      blanks: ['suspend'],
      expectedOutput: 'Suspend fonksiyon tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-generics',
    title: 'Generics (Jenerikler)',
    order: 25,
    category: 'Kotlin',
    description: 'Generic tipler ve fonksiyonlar.',
    exampleCode: `// Generic class
class Kutu<T>(val icerik: T)

// Generic fonksiyon
fun <T> yazdir(deger: T) {
    println(deger)
}

fun main() {
    val sayiKutusu = Kutu(42)
    val metinKutusu = Kutu("Merhaba")
    
    yazdir(100)
    yazdir("Kotlin")
    
    // Liste generic
    val sayilar: List<Int> = listOf(1, 2, 3)
}`,
    challenge: {
      instructions: 'Generic class oluştur.',
      starterCode: `class Kutu___BLANK1___T___BLANK2___(val icerik: T)`,
      solution: `class Kutu<T>(val icerik: T)`,
      blanks: ['<', '>'],
      expectedOutput: 'Generic class tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-android-basics',
    title: 'Android Studio Yapısı',
    order: 26,
    category: 'Kotlin',
    description: 'Android projesi yapısı: XML vs Compose.',
    exampleCode: `// XML Layout yaklaşımı (Geleneksel)
// activity_main.xml:
// <LinearLayout>
//     <TextView android:text="Merhaba" />
//     <Button android:text="Tıkla" />
// </LinearLayout>

// MainActivity.kt:
// val buton = findViewById<Button>(R.id.buton)
// buton.setOnClickListener { /* tıklama */ }

// Jetpack Compose (Modern)
// @Composable
// fun Greeting() {
//     Column {
//         Text("Merhaba")
//         Button(onClick = { /* tıklama */ }) {
//             Text("Tıkla")
//         }
//     }
// }`,
    challenge: {
      instructions: 'Android View bileşeni bul (teorik).',
      starterCode: `// val buton = findViewById___BLANK1___Button___BLANK2___(R.id.buton)`,
      solution: `// val buton = findViewById<Button>(R.id.buton)`,
      blanks: ['<', '>'],
      expectedOutput: 'findViewById ile Button referansı alındı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-project-calculator',
    title: 'Proje: Hesap Makinesi Mantığı',
    order: 27,
    category: 'Kotlin',
    description: 'Basit hesap makinesi mantığı oluşturma.',
    exampleCode: `class HesapMakinesi {
    fun topla(a: Double, b: Double) = a + b
    fun cikar(a: Double, b: Double) = a - b
    fun carp(a: Double, b: Double) = a * b
    fun bol(a: Double, b: Double): Double {
        return if (b != 0.0) a / b else 0.0
    }
}

fun main() {
    val hesap = HesapMakinesi()
    println("5 + 3 = \${hesap.topla(5.0, 3.0)}")
    println("10 - 4 = \${hesap.cikar(10.0, 4.0)}")
    println("6 * 2 = \${hesap.carp(6.0, 2.0)}")
    println("15 / 3 = \${hesap.bol(15.0, 3.0)}")
}`,
    challenge: {
      instructions: 'Hesap makinesi class\'ı oluştur.',
      starterCode: `class HesapMakinesi {
    fun topla(a: Double, b: Double) = a ___BLANK1___ b
}`,
      solution: `class HesapMakinesi {
    fun topla(a: Double, b: Double) = a + b
}`,
      blanks: ['+'],
      expectedOutput: 'HesapMakinesi class tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-project-notepad',
    title: 'Proje: Basit Not Defteri',
    order: 28,
    category: 'Kotlin',
    description: 'Konsol tabanlı not defteri uygulaması.',
    exampleCode: `class NotDefteri {
    private val notlar = mutableListOf<String>()
    
    fun notEkle(not: String) {
        notlar.add(not)
        println("Not eklendi: $not")
    }
    
    fun notlariGoster() {
        if (notlar.isEmpty()) {
            println("Not yok")
        } else {
            notlar.forEachIndexed { index, not ->
                println("\${index + 1}. $not")
            }
        }
    }
    
    fun notSil(index: Int) {
        if (index in notlar.indices) {
            notlar.removeAt(index)
            println("Not silindi")
        }
    }
}

fun main() {
    val defter = NotDefteri()
    defter.notEkle("Kotlin öğren")
    defter.notEkle("Proje yap")
    defter.notlariGoster()
}`,
    challenge: {
      instructions: 'Not ekleyen fonksiyon yaz.',
      starterCode: `val notlar = ___BLANK1___<String>()
fun notEkle(not: String) {
    notlar.___BLANK2___(not)
}`,
      solution: `val notlar = mutableListOf<String>()
fun notEkle(not: String) {
    notlar.add(not)
}`,
      blanks: ['mutableListOf', 'add'],
      expectedOutput: 'Not ekleme fonksiyonu tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-review-1',
    title: 'Genel Tekrar - 1',
    order: 29,
    category: 'Kotlin',
    description: 'Temel konuların tekrarı: val/var, nullable, fonksiyonlar.',
    exampleCode: `fun main() {
    // val vs var
    val sabit = 10
    var degisken = 20
    
    // Nullable
    var isim: String? = null
    println(isim?.length ?: 0)
    
    // Fonksiyonlar
    fun topla(a: Int, b: Int) = a + b
    println(topla(5, 3))
    
    // When
    when (sabit) {
        10 -> println("On")
        else -> println("Diğer")
    }
}`,
    challenge: {
      instructions: 'val ve nullable string tanımla.',
      starterCode: `___BLANK1___ isim: String___BLANK2___ = null`,
      solution: `val isim: String? = null`,
      blanks: ['val', '?'],
      expectedOutput: 'Nullable string tanımlandı (çıktı yok)'
    },
    xpReward: 10
  },

  {
    id: 'kt-review-2',
    title: 'Genel Tekrar - 2',
    order: 30,
    category: 'Kotlin',
    description: 'İleri konuların tekrarı: OOP, Collections, Lambda.',
    exampleCode: `fun main() {
    // Data class
    data class Kisi(val isim: String, val yas: Int)
    val kisi = Kisi("Ali", 25)
    
    // Collections
    val liste = listOf(1, 2, 3, 4, 5)
    val ciftler = liste.filter { it % 2 == 0 }
    val kareler = liste.map { it * it }
    
    // Lambda
    val topla: (Int, Int) -> Int = { a, b -> a + b }
    println(topla(10, 20))
    
    // Extension
    fun String.tersine() = this.reversed()
    println("Kotlin".tersine())
}`,
    challenge: {
      instructions: 'Data class oluştur.',
      starterCode: `___BLANK1___ class Urun(val isim: String, val fiyat: Double)`,
      solution: `data class Urun(val isim: String, val fiyat: Double)`,
      blanks: ['data'],
      expectedOutput: 'Urun data class tanımlandı (çıktı yok)'
    },
    xpReward: 10
  }
];

// Kotlin Final Sınavı (15 Soru)
export const kotlinFinalExam = [
  {
    id: 'q1',
    question: 'val ve var arasındaki fark nedir?',
    options: [
      'İkisi de aynı',
      'val değiştirilemez, var değiştirilebilir',
      'var değiştirilemez, val değiştirilebilir',
      'val daha hızlı'
    ],
    correctAnswer: 1,
    explanation: 'val immutable (değiştirilemez), var mutable (değiştirilebilir).'
  },
  {
    id: 'q2',
    question: 'Nullable tip nasıl tanımlanır?',
    options: ['Type', 'Type?', 'Type!', '?Type'],
    correctAnswer: 1,
    explanation: 'Type? ile nullable tip tanımlanır. Örnek: String?'
  },
  {
    id: 'q3',
    question: 'Safe call operatörü nedir?',
    options: ['!!', '?:', '?.', '?'],
    correctAnswer: 2,
    explanation: '?. safe call operatörü, null değilse işlem yapar.'
  },
  {
    id: 'q4',
    question: '1..5 range ne yapar?',
    options: [
      '1\'den 5\'e kadar (5 hariç)',
      '1\'den 5\'e kadar (5 dahil)',
      '5\'ten 1\'e kadar',
      'Hata verir'
    ],
    correctAnswer: 1,
    explanation: '1..5 range\'i 1, 2, 3, 4, 5 sayılarını içerir.'
  },
  {
    id: 'q5',
    question: 'Fonksiyon nasıl tanımlanır?',
    options: ['function', 'fun', 'def', 'func'],
    correctAnswer: 1,
    explanation: 'Kotlin\'de fonksiyonlar fun anahtar kelimesi ile tanımlanır.'
  },
  {
    id: 'q6',
    question: 'List ve MutableList farkı nedir?',
    options: [
      'İkisi de aynı',
      'List değiştirilemez, MutableList değiştirilebilir',
      'MutableList daha yavaş',
      'Fark yok'
    ],
    correctAnswer: 1,
    explanation: 'List immutable, MutableList mutable (eleman eklenip çıkarılabilir).'
  },
  {
    id: 'q7',
    question: 'when yapısı neyin alternatifidir?',
    options: ['if-else', 'for', 'switch-case', 'while'],
    correctAnswer: 2,
    explanation: 'when, Java\'daki switch-case yapısının Kotlin karşılığıdır.'
  },
  {
    id: 'q8',
    question: 'Data class ne işe yarar?',
    options: [
      'Veri tutmak için',
      'Interface için',
      'Abstract class için',
      'Extension için'
    ],
    correctAnswer: 0,
    explanation: 'Data class, veri tutmak için özel olarak tasarlanmış sınıftır.'
  },
  {
    id: 'q9',
    question: 'Bir class\'ı miras alınabilir yapmak için ne kullanılır?',
    options: ['open', 'public', 'extend', 'inherit'],
    correctAnswer: 0,
    explanation: 'open anahtar kelimesi class\'ı miras alınabilir yapar.'
  },
  {
    id: 'q10',
    question: 'Interface nasıl tanımlanır?',
    options: ['class', 'interface', 'abstract', 'trait'],
    correctAnswer: 1,
    explanation: 'interface anahtar kelimesi ile arayüz tanımlanır.'
  },
  {
    id: 'q11',
    question: 'Extension function ne işe yarar?',
    options: [
      'Yeni class oluşturur',
      'Mevcut tipe fonksiyon ekler',
      'Interface uygular',
      'Miras alır'
    ],
    correctAnswer: 1,
    explanation: 'Extension function, mevcut bir tipe yeni fonksiyon ekler.'
  },
  {
    id: 'q12',
    question: 'let scope function ne zaman kullanılır?',
    options: [
      'Her zaman',
      'Null check için',
      'Loop için',
      'Class için'
    ],
    correctAnswer: 1,
    explanation: 'let genellikle nullable tiplerde null check için kullanılır.'
  },
  {
    id: 'q13',
    question: 'Lambda nasıl tanımlanır?',
    options: [
      '{ a, b -> a + b }',
      '(a, b) => a + b',
      'lambda a, b: a + b',
      'function(a, b) { return a + b }'
    ],
    correctAnswer: 0,
    explanation: 'Kotlin lambda syntax: { parametreler -> gövde }'
  },
  {
    id: 'q14',
    question: 'suspend anahtar kelimesi ne işe yarar?',
    options: [
      'Fonksiyonu durdurur',
      'Asenkron fonksiyon tanımlar',
      'Fonksiyonu siler',
      'Hata yakalar'
    ],
    correctAnswer: 1,
    explanation: 'suspend, coroutine\'lerle kullanılan asenkron fonksiyon tanımlar.'
  },
  {
    id: 'q15',
    question: 'Generic tip nasıl tanımlanır?',
    options: ['<T>', '[T]', '{T}', '(T)'],
    correctAnswer: 0,
    explanation: '<T> ile generic tip parametresi tanımlanır.'
  }
];

// =====================
// SWIFT LESSONS (30 Ders)
// =====================

export const swiftLessons: LessonContent[] = [
  // 1. Playground Tanıtımı
  {
    id: 'sw-playground',
    title: 'Playground Tanıtımı',
    order: 1,
    category: 'Swift',
    description: 'Swift Playground ile kod yazma ve test etme.',
    detailedContent: 'Swift Playground, kod yazmayı öğrenmek için interaktif bir ortamdır. Xcode içinde gelir ve anında sonuç gösterir.',
    sections: [
      {
        title: 'Swift Nedir?',
        content: 'Swift, Apple tarafından geliştirilen modern, güvenli ve hızlı bir programlama dilidir. iOS, macOS, watchOS ve tvOS uygulamaları geliştirmek için kullanılır.'
      },
      {
        title: 'Playground Kullanımı',
        content: 'Xcode > File > New > Playground ile yeni bir playground açabilirsiniz. Kod yazdığınızda sonuçlar sağ panelde anında görünür.'
      }
    ],
    exampleCode: `// İlk Swift programı
import UIKit

print("Merhaba Swift!")
print("iOS geliştirme öğreniyorum")

// Basit hesaplama
let sonuc = 5 + 3
print("5 + 3 = \\(sonuc)")`,
    challenge: {
      instructions: 'print ile ekrana "Merhaba" yazdır.',
      starterCode: `___BLANK1___("Merhaba")`,
      solution: `print("Merhaba")`,
      blanks: ['print'],
      expectedOutput: 'Merhaba'
    },
    xpReward: 10
  },

  // 2. Değişkenler ve Sabitler
  {
    id: 'sw-variables',
    title: 'Değişkenler ve Sabitler (let, var)',
    order: 2,
    category: 'Swift',
    description: 'let (sabit) ve var (değişken) ile veri tanımlama.',
    detailedContent: 'Swift\'te let ile sabit (immutable), var ile değişken (mutable) tanımlanır.',
    sections: [
      {
        title: 'let vs var',
        content: '• let: Değiştirilemez sabit\n• var: Değiştirilebilir değişken\n\nSwift, güvenlik için mümkün olduğunca let kullanmanızı önerir.'
      },
      {
        title: 'Tip Çıkarımı',
        content: 'Swift tip çıkarımı yapar:\n\nlet isim = "Ali"  // String\nlet yas = 25      // Int'
      }
    ],
    exampleCode: `// let - Sabit
let pi = 3.14
// pi = 3.15  // HATA! Değiştirilemez

// var - Değişken
var skor = 100
skor = 150  // ✓ OK

// Tip belirtme (opsiyonel)
let isim: String = "Furkan"
var yas: Int = 25

print("\\(isim), \\(yas) yaşında")`,
    challenge: {
      instructions: 'let ile isim, var ile skor tanımla.',
      starterCode: `___BLANK1___ isim = "Ali"
___BLANK2___ skor = 100`,
      solution: `let isim = "Ali"
var skor = 100`,
      blanks: ['let', 'var'],
      expectedOutput: 'Değişkenler tanımlandı: isim = "Ali", skor = 100'
    },
    xpReward: 10
  },

  // 3. Veri Tipleri
  {
    id: 'sw-data-types',
    title: 'Veri Tipleri',
    order: 3,
    category: 'Swift',
    description: 'Temel veri tipleri: Int, Double, String, Bool.',
    detailedContent: 'Swift güçlü tip sistemine sahiptir ve tip güvenliği sağlar.',
    sections: [
      {
        title: 'Sayısal Tipler',
        content: '• Int: Tam sayılar\n• Double: Ondalıklı sayılar (64-bit)\n• Float: Ondalıklı sayılar (32-bit)\n• CGFloat: Grafik işlemleri için'
      },
      {
        title: 'Diğer Tipler',
        content: '• String: Metin\n• Character: Tek karakter\n• Bool: true/false'
      }
    ],
    exampleCode: `// Sayısal tipler
let sayi: Int = 42
let ondalik: Double = 3.14159
let kucuk: Float = 2.5

// String ve Character
let isim: String = "Furkan"
let harf: Character = "A"

// Boolean
let aktif: Bool = true

// Tip kontrolü
print(type(of: sayi))     // Int
print(type(of: ondalik))  // Double`,
    challenge: {
      instructions: 'Int, Double ve Bool tipinde değişkenler oluştur.',
      starterCode: `let sayi: ___BLANK1___ = 10
let fiyat: ___BLANK2___ = 19.99
let durum: ___BLANK3___ = true`,
      solution: `let sayi: Int = 10
let fiyat: Double = 19.99
let durum: Bool = true`,
      blanks: ['Int', 'Double', 'Bool'],
      expectedOutput: 'Farklı veri tipleri tanımlandı: sayi (Int), fiyat (Double), durum (Bool)'
    },
    xpReward: 10
  },

  // 4. String Interpolation
  {
    id: 'sw-string-interpolation',
    title: 'String Interpolation',
    order: 4,
    category: 'Swift',
    description: 'String içine değişken yerleştirme: \\().',
    detailedContent: 'Swift\'te string içine değişken eklemek için \\() kullanılır.',
    sections: [
      {
        title: 'String Interpolation',
        content: 'Değişkeni string içine yerleştirmek:\n\nlet isim = "Ali"\nprint("Merhaba \\(isim)")'
      }
    ],
    exampleCode: `let isim = "Furkan"
let yas = 25
let sehir = "İstanbul"

// String interpolation
print("Benim adım \\(isim)")
print("\\(yas) yaşındayım")
print("\\(sehir)'de yaşıyorum")

// İfade kullanımı
print("5 yıl sonra \\(yas + 5) yaşında olacağım")

// Çoklu değişken
print("\\(isim), \\(yas) yaşında, \\(sehir)")`,
    challenge: {
      instructions: 'String interpolation ile isim ve yaş yazdır.',
      starterCode: `let isim = "Ahmet"
let yas = 30
print("Benim adım ___BLANK1___isim___BLANK2___ ve ___BLANK3___yas___BLANK4___ yaşındayım")`,
      solution: `let isim = "Ahmet"
let yas = 30
print("Benim adım \\(isim) ve \\(yas) yaşındayım")`,
      blanks: ['\\(', ')', '\\(', ')'],
      expectedOutput: 'Benim adım Ahmet ve 30 yaşındayım'
    },
    xpReward: 10
  },

  // 5. Temel Operatörler
  {
    id: 'sw-operators',
    title: 'Temel Operatörler',
    order: 5,
    category: 'Swift',
    description: 'Aritmetik, karşılaştırma ve mantıksal operatörler.',
    detailedContent: 'Swift\'te matematiksel ve mantıksal işlemler için operatörler kullanılır.',
    sections: [
      {
        title: 'Operatörler',
        content: '• Aritmetik: +, -, *, /, %\n• Karşılaştırma: ==, !=, <, >, <=, >=\n• Mantıksal: &&, ||, !\n• Range: ..., ..<'
      }
    ],
    exampleCode: `// Aritmetik
let a = 10
let b = 3
print(a + b)   // 13
print(a - b)   // 7
print(a * b)   // 30
print(a / b)   // 3
print(a % b)   // 1

// Karşılaştırma
print(a > b)   // true
print(a == b)  // false

// Mantıksal
let x = true
let y = false
print(x && y)  // false (AND)
print(x || y)  // true (OR)
print(!x)      // false (NOT)`,
    challenge: {
      instructions: 'İki sayıyı topla ve yazdır.',
      starterCode: `let num1 = 5
let num2 = 10
let toplam = num1 ___BLANK1___ num2
print(toplam)`,
      solution: `let num1 = 5
let num2 = 10
let toplam = num1 + num2
print(toplam)`,
      blanks: ['+'],
      expectedOutput: '15'
    },
    xpReward: 10
  },

  // 6. Diziler (Arrays)
  {
    id: 'sw-arrays',
    title: 'Diziler (Arrays)',
    order: 6,
    category: 'Swift',
    description: 'Array oluşturma, eleman ekleme/çıkarma.',
    detailedContent: 'Array\'ler sıralı koleksiyon yapısıdır.',
    sections: [
      {
        title: 'Array İşlemleri',
        content: '• append(): Eleman ekle\n• remove(at:): Eleman çıkar\n• count: Uzunluk\n• isEmpty: Boş mu?\n• [indeks]: Elemana eriş'
      }
    ],
    exampleCode: `// Array oluşturma
var meyveler = ["elma", "armut", "muz"]
print(meyveler[0])  // "elma"

// Eleman ekleme
meyveler.append("çilek")

// Eleman çıkarma
meyveler.remove(at: 1)

// Özelliker
print(meyveler.count)    // Uzunluk
print(meyveler.isEmpty)  // false

// Döngü
for meyve in meyveler {
    print(meyve)
}`,
    challenge: {
      instructions: 'Array oluştur ve append ile eleman ekle.',
      starterCode: `var sayilar = [1, 2, 3]
sayilar.___BLANK1___(4)
print(sayilar)`,
      solution: `var sayilar = [1, 2, 3]
sayilar.append(4)
print(sayilar)`,
      blanks: ['append'],
      expectedOutput: '[1, 2, 3, 4]'
    },
    xpReward: 10
  },

  // 7. Sözlükler (Dictionaries)
  {
    id: 'sw-dictionaries',
    title: 'Sözlükler (Dictionaries)',
    order: 7,
    category: 'Swift',
    description: 'Key-value çiftleri ile veri saklama.',
    detailedContent: 'Dictionary\'ler anahtar-değer çiftleriyle çalışır.',
    sections: [
      {
        title: 'Dictionary İşlemleri',
        content: '• [key]: Değere eriş\n• [key] = value: Ekle/Güncelle\n• removeValue(forKey:): Sil\n• keys: Tüm anahtarlar\n• values: Tüm değerler'
      }
    ],
    exampleCode: `// Dictionary oluşturma
var notlar = ["Ali": 90, "Veli": 85, "Ayşe": 95]

// Değere erişim
print(notlar["Ali"] ?? 0)  // 90

// Değer ekleme/güncelleme
notlar["Mehmet"] = 88
notlar["Ali"] = 92

// Değer silme
notlar.removeValue(forKey: "Veli")

// Döngü
for (isim, not) in notlar {
    print("\\(isim): \\(not)")
}`,
    challenge: {
      instructions: 'Dictionary oluştur ve key ile değere eriş.',
      starterCode: `var sozluk = ["a": 1, "b": 2]
print(sozluk[___BLANK1___] ?? 0)`,
      solution: `var sozluk = ["a": 1, "b": 2]
print(sozluk["a"] ?? 0)`,
      blanks: ['"a"'],
      expectedOutput: '1'
    },
    xpReward: 10
  },

  // 8. Kümeler (Sets)
  {
    id: 'sw-sets',
    title: 'Kümeler (Sets)',
    order: 8,
    category: 'Swift',
    description: 'Benzersiz elemanlar içeren koleksiyon: Set.',
    detailedContent: 'Set\'ler sırasız ve benzersiz elemanlar içerir.',
    sections: [
      {
        title: 'Set Özellikleri',
        content: '• Benzersiz elemanlar\n• Sırasız\n• Hızlı arama\n• Küme işlemleri (union, intersection, etc.)'
      }
    ],
    exampleCode: `// Set oluşturma
var sayilar: Set<Int> = [1, 2, 3, 2, 1]
print(sayilar)  // [1, 2, 3] (tekrar yok)

// Eleman ekleme
sayilar.insert(4)

// Eleman çıkarma
sayilar.remove(2)

// Kontrol
print(sayilar.contains(3))  // true

// Küme işlemleri
let set1: Set = [1, 2, 3]
let set2: Set = [3, 4, 5]
print(set1.union(set2))         // Birleşim
print(set1.intersection(set2))  // Kesişim`,
    challenge: {
      instructions: 'Set oluştur ve insert ile eleman ekle.',
      starterCode: `var set: Set<Int> = [1, 2, 3]
set.___BLANK1___(4)`,
      solution: `var set: Set<Int> = [1, 2, 3]
set.insert(4)`,
      blanks: ['insert'],
      expectedOutput: 'Set\'e 4 eklendi'
    },
    xpReward: 10
  },

  // 9. Kontrol Akışı (If/Switch)
  {
    id: 'sw-control-flow',
    title: 'Kontrol Akışı (If/Switch)',
    order: 9,
    category: 'Swift',
    description: 'if-else ve switch yapıları.',
    detailedContent: 'Swift\'te koşullu ifadeler için if-else ve switch kullanılır.',
    sections: [
      {
        title: 'if-else',
        content: 'if koşul {\n    // Kod\n} else if koşul2 {\n    // Kod\n} else {\n    // Kod\n}'
      },
      {
        title: 'switch',
        content: 'Swift\'in switch\'i çok güçlüdür:\n• break gerekmez\n• Her case mutlaka kapsanmalı'
      }
    ],
    exampleCode: `// if-else
let yas = 18
if yas >= 18 {
    print("Reşit")
} else {
    print("Reşit değil")
}

// switch
let harf = "A"
switch harf {
case "A":
    print("Mükemmel")
case "B", "C":
    print("İyi")
default:
    print("Diğer")
}

// Range ile switch
let puan = 85
switch puan {
case 90...100:
    print("AA")
case 80..<90:
    print("BA")
default:
    print("Diğer")
}`,
    challenge: {
      instructions: 'if ile yaş kontrolü yap.',
      starterCode: `let yas = 20
___BLANK1___ yas >= 18 {
    print("Reşit")
}`,
      solution: `let yas = 20
if yas >= 18 {
    print("Reşit")
}`,
      blanks: ['if'],
      expectedOutput: 'Reşit'
    },
    xpReward: 10
  },

  // 10. Döngüler (For-In)
  {
    id: 'sw-loops',
    title: 'Döngüler (For-In, While)',
    order: 10,
    category: 'Swift',
    description: 'for-in, while döngüleri.',
    detailedContent: 'Swift\'te döngüler için for-in ve while kullanılır.',
    sections: [
      {
        title: 'for-in Döngüsü',
        content: 'for item in collection {\n    // Her item için\n}'
      },
      {
        title: 'Range ile for',
        content: '• 1...5: 1\'den 5\'e (5 dahil)\n• 1..<5: 1\'den 5\'e (5 hariç)'
      }
    ],
    exampleCode: `// for-in ile array
let meyveler = ["elma", "armut", "muz"]
for meyve in meyveler {
    print(meyve)
}

// Range ile
for i in 1...5 {
    print(i)  // 1, 2, 3, 4, 5
}

for i in 1..<5 {
    print(i)  // 1, 2, 3, 4
}

// while döngüsü
var sayac = 0
while sayac < 3 {
    print(sayac)
    sayac += 1
}`,
    challenge: {
      instructions: 'for-in ile 1\'den 5\'e kadar yazdır.',
      starterCode: `___BLANK1___ i ___BLANK2___ 1...5 {
    print(i)
}`,
      solution: `for i in 1...5 {
    print(i)
}`,
      blanks: ['for', 'in'],
      expectedOutput: '1\n2\n3\n4\n5'
    },
    xpReward: 10
  },

  // 11-30 kalan dersler (kısa)

  // 11. Fonksiyonlar
  {
    id: 'sw-functions',
    title: 'Fonksiyonlar',
    order: 11,
    category: 'Swift',
    description: 'Fonksiyon tanımlama ve kullanma.',
    exampleCode: `// Basit fonksiyon
func selamla() {
    print("Merhaba!")
}
selamla()

// Parametreli fonksiyon
func topla(a: Int, b: Int) -> Int {
    return a + b
}
let sonuc = topla(a: 5, b: 3)

// Tek satırlık return
func kare(_ sayi: Int) -> Int {
    sayi * sayi
}
print(kare(5))  // 25`,
    challenge: {
      instructions: 'İki sayıyı toplayan fonksiyon yaz.',
      starterCode: `___BLANK1___ topla(a: Int, b: Int) -> Int {
    ___BLANK2___ a + b
}`,
      solution: `func topla(a: Int, b: Int) -> Int {
    return a + b
}`,
      blanks: ['func', 'return'],
      expectedOutput: 'Fonksiyon tanımlandı: topla(a:b:) -> Int'
    },
    xpReward: 10
  },

  // 12. Parametre İsimleri
  {
    id: 'sw-parameter-names',
    title: 'Parametre İsimleri',
    order: 12,
    category: 'Swift',
    description: 'Dış ve iç parametre isimleri, _ kullanımı.',
    exampleCode: `// Dış ve iç parametre ismi
func selamla(kime isim: String) {
    print("Merhaba \\(isim)")
}
selamla(kime: "Furkan")

// _ ile dış isim kaldırma
func topla(_ a: Int, _ b: Int) -> Int {
    a + b
}
print(topla(5, 3))  // İsim yok

// Varsayılan değer
func selam(_ isim: String = "Kullanıcı") {
    print("Merhaba \\(isim)")
}
selam()           // "Merhaba Kullanıcı"
selam("Ali")      // "Merhaba Ali"`,
    challenge: {
      instructions: '_ ile dış parametre ismini kaldır.',
      starterCode: `func topla(___BLANK1___ a: Int, ___BLANK2___ b: Int) -> Int {
    a + b
}`,
      solution: `func topla(_ a: Int, _ b: Int) -> Int {
    a + b
}`,
      blanks: ['_', '_'],
      expectedOutput: 'Fonksiyon tanımlandı: topla(_:_:) - Dış parametre isimleri kaldırıldı'
    },
    xpReward: 10
  },

  // 13. Optionals (?, !)
  {
    id: 'sw-optionals',
    title: 'Optionals (Swift\'in Kalbi)',
    order: 13,
    category: 'Swift',
    description: 'Optional tipler: ?, !, nil, optional chaining.',
    detailedContent: 'Optionals, Swift\'in en önemli özelliklerinden biridir. Bir değerin nil olabileceğini gösterir.',
    sections: [
      {
        title: 'Optional Nedir?',
        content: 'Bir değişken nil (boş) olabilir:\n\nvar isim: String? = "Ali"\nisim = nil  // ✓ OK'
      },
      {
        title: 'Optional Unwrapping',
        content: '• ?: Optional type\n• !: Force unwrap (dikkatli!)\n• ??: Nil coalescing\n• ?.: Optional chaining'
      }
    ],
    exampleCode: `// Optional tanımlama
var isim: String? = "Furkan"
isim = nil  // OK

// Optional binding (if let)
if let gercekIsim = isim {
    print(gercekIsim)
} else {
    print("İsim yok")
}

// Nil coalescing (??)
let ekranIsim = isim ?? "Misafir"
print(ekranIsim)

// Optional chaining
let uzunluk = isim?.count
print(uzunluk ?? 0)`,
    challenge: {
      instructions: 'Optional string tanımla.',
      starterCode: `var isim: String___BLANK1___ = nil
print(isim ___BLANK2___ "Varsayılan")`,
      solution: `var isim: String? = nil
print(isim ?? "Varsayılan")`,
      blanks: ['?', '??'],
      expectedOutput: 'Varsayılan'
    },
    xpReward: 10
  },

  // 14. Optional Binding
  {
    id: 'sw-optional-binding',
    title: 'Optional Binding (if let)',
    order: 14,
    category: 'Swift',
    description: 'Güvenli optional unwrapping: if let, guard let.',
    exampleCode: `// if let
var yas: Int? = 25

if let gercekYas = yas {
    print("Yaş: \\(gercekYas)")
} else {
    print("Yaş bilinmiyor")
}

// Çoklu optional binding
let isim: String? = "Ali"
let skor: Int? = 100

if let i = isim, let s = skor {
    print("\\(i): \\(s)")
}

// guard let (fonksiyon içinde)
func kontrol(_ deger: String?) {
    guard let d = deger else {
        print("Değer yok")
        return
    }
    print("Değer: \\(d)")
}`,
    challenge: {
      instructions: 'if let ile optional unwrap yap.',
      starterCode: `var sayi: Int? = 10
___BLANK1___ ___BLANK2___ gercekSayi = sayi {
    print(gercekSayi)
}`,
      solution: `var sayi: Int? = 10
if let gercekSayi = sayi {
    print(gercekSayi)
}`,
      blanks: ['if', 'let'],
      expectedOutput: '10'
    },
    xpReward: 10
  },

  // 15. Guard Let
  {
    id: 'sw-guard-let',
    title: 'Guard Let',
    order: 15,
    category: 'Swift',
    description: 'Erken çıkış için guard let kullanımı.',
    exampleCode: `// guard let - erken return
func yasKontrol(_ yas: Int?) {
    guard let gercekYas = yas else {
        print("Yaş girilmemiş")
        return
    }
    
    guard gercekYas >= 18 else {
        print("Reşit değil")
        return
    }
    
    print("Yaş: \\(gercekYas), Reşit")
}

yasKontrol(nil)   // Yaş girilmemiş
yasKontrol(15)    // Reşit değil
yasKontrol(20)    // Yaş: 20, Reşit`,
    challenge: {
      instructions: 'guard let ile nil kontrolü yap.',
      starterCode: `func kontrol(_ deger: String?) {
    ___BLANK1___ ___BLANK2___ d = deger else {
        return
    }
    print(d)
}`,
      solution: `func kontrol(_ deger: String?) {
    guard let d = deger else {
        return
    }
    print(d)
}`,
      blanks: ['guard', 'let'],
      expectedOutput: 'Fonksiyon tanımlandı: guard let ile nil kontrolü'
    },
    xpReward: 10
  },

  // 16-30 kalan dersler

  {
    id: 'sw-enums',
    title: 'Enumerations (Enum)',
    order: 16,
    category: 'Swift',
    description: 'Enum tanımlama ve kullanma.',
    exampleCode: `// Basit enum
enum Yön {
    case kuzey
    case güney
    case doğu
    case batı
}

var gidiş = Yön.kuzey
gidiş = .güney

// Raw value ile
enum Gezegen: Int {
    case merkür = 1
    case venüs = 2
    case dünya = 3
}
print(Gezegen.dünya.rawValue)  // 3

// Associated values
enum Barkod {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
let urun = Barkod.qrCode("ABC123")`,
    challenge: {
      instructions: 'Enum tanımla.',
      starterCode: `___BLANK1___ Renk {
    case kırmızı
    case yeşil
}`,
      solution: `enum Renk {
    case kırmızı
    case yeşil
}`,
      blanks: ['enum'],
      expectedOutput: 'Enum tanımlandı: Renk (kırmızı, yeşil)'
    },
    xpReward: 10
  },

  {
    id: 'sw-struct-vs-class',
    title: 'Struct vs Class Farkı',
    order: 17,
    category: 'Swift',
    description: 'Struct (value type) ve Class (reference type) farkı.',
    exampleCode: `// Struct (value type - kopyalanır)
struct Nokta {
    var x: Int
    var y: Int
}
var nokta1 = Nokta(x: 0, y: 0)
var nokta2 = nokta1
nokta2.x = 10
print(nokta1.x)  // 0 (değişmedi)

// Class (reference type - referans)
class Kisi {
    var isim: String
    init(isim: String) {
        self.isim = isim
    }
}
let kisi1 = Kisi(isim: "Ali")
let kisi2 = kisi1
kisi2.isim = "Veli"
print(kisi1.isim)  // "Veli" (değişti!)`,
    challenge: {
      instructions: 'Struct tanımla.',
      starterCode: `___BLANK1___ Dikdortgen {
    var en: Double
    var boy: Double
}`,
      solution: `struct Dikdortgen {
    var en: Double
    var boy: Double
}`,
      blanks: ['struct'],
      expectedOutput: 'Struct tanımlandı: Dikdortgen (en, boy)'
    },
    xpReward: 10
  },

  {
    id: 'sw-properties',
    title: 'Properties (Özellikler)',
    order: 18,
    category: 'Swift',
    description: 'Stored ve computed properties.',
    exampleCode: `struct Dikdortgen {
    // Stored properties
    var en: Double
    var boy: Double
    
    // Computed property
    var alan: Double {
        return en * boy
    }
    
    var cevre: Double {
        get {
            return 2 * (en + boy)
        }
    }
}

let dikdortgen = Dikdortgen(en: 5, boy: 10)
print("Alan: \\(dikdortgen.alan)")
print("Çevre: \\(dikdortgen.cevre)")`,
    challenge: {
      instructions: 'Computed property tanımla.',
      starterCode: `struct Kare {
    var kenar: Double
    var alan: Double {
        ___BLANK1___ kenar * kenar
    }
}`,
      solution: `struct Kare {
    var kenar: Double
    var alan: Double {
        return kenar * kenar
    }
}`,
      blanks: ['return'],
      expectedOutput: 'Struct tanımlandı: Kare - computed property: alan'
    },
    xpReward: 10
  },

  {
    id: 'sw-methods',
    title: 'Methods (Metotlar)',
    order: 19,
    category: 'Swift',
    description: 'Instance ve type methods.',
    exampleCode: `struct Hesap {
    var bakiye: Double
    
    // Instance method
    mutating func paraYatir(_ miktar: Double) {
        bakiye += miktar
    }
    
    mutating func paraCek(_ miktar: Double) {
        if miktar <= bakiye {
            bakiye -= miktar
        }
    }
    
    // Type method
    static func hosgeldin() {
        print("Bankaya hoş geldiniz")
    }
}

var hesap = Hesap(bakiye: 1000)
hesap.paraYatir(500)
Hesap.hosgeldin()`,
    challenge: {
      instructions: 'mutating method tanımla.',
      starterCode: `struct Sayac {
    var deger = 0
    ___BLANK1___ func artir() {
        deger += 1
    }
}`,
      solution: `struct Sayac {
    var deger = 0
    mutating func artir() {
        deger += 1
    }
}`,
      blanks: ['mutating'],
      expectedOutput: 'Struct tanımlandı: Sayac - mutating method: artir()'
    },
    xpReward: 10
  },

  {
    id: 'sw-initializers',
    title: 'Initializers (Yapıcılar)',
    order: 20,
    category: 'Swift',
    description: 'init metodu ile nesne oluşturma.',
    exampleCode: `struct Kisi {
    var isim: String
    var yas: Int
    
    // Custom initializer
    init(isim: String, yas: Int) {
        self.isim = isim
        self.yas = yas
    }
    
    // Birden fazla init
    init(isim: String) {
        self.isim = isim
        self.yas = 0
    }
}

let kisi1 = Kisi(isim: "Ali", yas: 25)
let kisi2 = Kisi(isim: "Veli")  // yas = 0`,
    challenge: {
      instructions: 'init metodu ekle.',
      starterCode: `struct Araba {
    var marka: String
    ___BLANK1___(marka: String) {
        self.marka = marka
    }
}`,
      solution: `struct Araba {
    var marka: String
    init(marka: String) {
        self.marka = marka
    }
}`,
      blanks: ['init'],
      expectedOutput: 'Struct tanımlandı: Araba - init(marka:)'
    },
    xpReward: 10
  },

  {
    id: 'sw-inheritance',
    title: 'Kalıtım (Inheritance)',
    order: 21,
    category: 'Swift',
    description: 'Class miras alma: override, super.',
    exampleCode: `// Base class
class Hayvan {
    var isim: String
    
    init(isim: String) {
        self.isim = isim
    }
    
    func sesCikar() {
        print("Hayvan sesi")
    }
}

// Subclass
class Kedi: Hayvan {
    override func sesCikar() {
        print("Miyav!")
    }
}

let kedi = Kedi(isim: "Tekir")
kedi.sesCikar()  // "Miyav!"`,
    challenge: {
      instructions: 'Hayvan class\'ından miras al.',
      starterCode: `class Hayvan { }
class Kopek: ___BLANK1___ { }`,
      solution: `class Hayvan { }
class Kopek: Hayvan { }`,
      blanks: ['Hayvan'],
      expectedOutput: 'Kopek class\'ı Hayvan\'dan miras aldı'
    },
    xpReward: 10
  },

  {
    id: 'sw-protocols',
    title: 'Protokoller (Protocols)',
    order: 22,
    category: 'Swift',
    description: 'Protocol tanımlama ve uygulama.',
    exampleCode: `// Protocol tanımlama
protocol Ucabilir {
    func uc()
}

// Protocol uygulama
struct Kus: Ucabilir {
    func uc() {
        print("Kuş uçuyor")
    }
}

struct Ucak: Ucabilir {
    func uc() {
        print("Uçak uçuyor")
    }
}

let kus = Kus()
kus.uc()`,
    challenge: {
      instructions: 'Protocol tanımla ve uygula.',
      starterCode: `___BLANK1___ Yuzebilir {
    func yuz()
}`,
      solution: `protocol Yuzebilir {
    func yuz()
}`,
      blanks: ['protocol'],
      expectedOutput: 'Protocol tanımlandı: Yuzebilir'
    },
    xpReward: 10
  },

  {
    id: 'sw-extensions',
    title: 'Extensions',
    order: 23,
    category: 'Swift',
    description: 'Mevcut tiplere özellik/metot ekleme.',
    exampleCode: `// Int'e extension
extension Int {
    func karesi() -> Int {
        return self * self
    }
    
    var cift: Bool {
        return self % 2 == 0
    }
}

print(5.karesi())   // 25
print(4.cift)       // true

// String'e extension
extension String {
    func tersine() -> String {
        return String(self.reversed())
    }
}
print("Swift".tersine())  // "tfiwS"`,
    challenge: {
      instructions: 'Int tipine extension ekle.',
      starterCode: `___BLANK1___ Int {
    func ikiKati() -> Int {
        return self * 2
    }
}`,
      solution: `extension Int {
    func ikiKati() -> Int {
        return self * 2
    }
}`,
      blanks: ['extension'],
      expectedOutput: 'Int tipine extension eklendi: ikiKati()'
    },
    xpReward: 10
  },

  {
    id: 'sw-closures',
    title: 'Closures (Kapanışlar)',
    order: 24,
    category: 'Swift',
    description: 'Anonim fonksiyonlar: closures.',
    exampleCode: `// Basit closure
let topla = { (a: Int, b: Int) -> Int in
    return a + b
}
print(topla(5, 3))  // 8

// Array metodlarıyla
let sayilar = [1, 2, 3, 4, 5]

// map
let kareler = sayilar.map { $0 * $0 }
print(kareler)  // [1, 4, 9, 16, 25]

// filter
let ciftler = sayilar.filter { $0 % 2 == 0 }
print(ciftler)  // [2, 4]

// sorted
let sirali = sayilar.sorted { $0 > $1 }
print(sirali)  // [5, 4, 3, 2, 1]`,
    challenge: {
      instructions: 'Closure tanımla.',
      starterCode: `let carp = ___BLANK1___ (a: Int, b: Int) -> Int ___BLANK2___
    return a * b
___BLANK3___`,
      solution: `let carp = { (a: Int, b: Int) -> Int in
    return a * b
}`,
      blanks: ['{', 'in', '}'],
      expectedOutput: 'Closure tanımlandı: (Int, Int) -> Int'
    },
    xpReward: 10
  },

  {
    id: 'sw-error-handling',
    title: 'Hata Yönetimi',
    order: 25,
    category: 'Swift',
    description: 'Error protocol, throw, do-catch, try.',
    exampleCode: `// Error enum
enum HesapHatasi: Error {
    case yetersizBakiye
    case gecersizMiktar
}

// throw fonksiyon
func paraCek(miktar: Double, bakiye: Double) throws -> Double {
    guard miktar > 0 else {
        throw HesapHatasi.gecersizMiktar
    }
    guard miktar <= bakiye else {
        throw HesapHatasi.yetersizBakiye
    }
    return bakiye - miktar
}

// do-catch
do {
    let yeniBakiye = try paraCek(miktar: 500, bakiye: 1000)
    print("Yeni bakiye: \\(yeniBakiye)")
} catch HesapHatasi.yetersizBakiye {
    print("Yetersiz bakiye")
} catch {
    print("Hata: \\(error)")
}`,
    challenge: {
      instructions: 'do-catch ile hata yakala.',
      starterCode: `___BLANK1___ {
    let sonuc = ___BLANK2___ fonksiyon()
} ___BLANK3___ {
    print("Hata")
}`,
      solution: `do {
    let sonuc = try fonksiyon()
} catch {
    print("Hata")
}`,
      blanks: ['do', 'try', 'catch'],
      expectedOutput: 'do-catch bloğu oluşturuldu'
    },
    xpReward: 10
  },

  {
    id: 'sw-swiftui-intro',
    title: 'SwiftUI\'a Teorik Giriş',
    order: 26,
    category: 'Swift',
    description: 'SwiftUI nedir, declarative UI yaklaşımı.',
    exampleCode: `// SwiftUI örnek (teorik)
// import SwiftUI

// struct ContentView: View {
//     var body: some View {
//         VStack {
//             Text("Merhaba SwiftUI!")
//                 .font(.largeTitle)
//                 .foregroundColor(.blue)
//             
//             Button("Tıkla") {
//                 print("Butona tıklandı")
//             }
//         }
//     }
// }

// SwiftUI Özellikleri:
// • Declarative (bildirimsel) syntax
// • Live Preview
// • Cross-platform (iOS, macOS, watchOS, tvOS)`,
    challenge: {
      instructions: 'SwiftUI View protokolünü uygula (teorik).',
      starterCode: `// struct MyView: ___BLANK1___ { }`,
      solution: `// struct MyView: View { }`,
      blanks: ['View'],
      expectedOutput: 'SwiftUI View protokolü uygulandı (teorik)'
    },
    xpReward: 10
  },

  {
    id: 'sw-arc',
    title: 'Bellek Yönetimi (ARC)',
    order: 27,
    category: 'Swift',
    description: 'Automatic Reference Counting, strong/weak/unowned.',
    exampleCode: `// ARC - Automatic Reference Counting
class Kisi {
    let isim: String
    var daire: Daire?
    
    init(isim: String) {
        self.isim = isim
    }
    
    deinit {
        print("\\(isim) bellekten silindi")
    }
}

class Daire {
    let numara: Int
    weak var sahibi: Kisi?  // weak - retain cycle önler
    
    init(numara: Int) {
        self.numara = numara
    }
}

var kisi: Kisi? = Kisi(isim: "Ali")
kisi = nil  // "Ali bellekten silindi"`,
    challenge: {
      instructions: 'weak referans tanımla.',
      starterCode: `class Kisi {
    ___BLANK1___ var arkadas: Kisi?
}`,
      solution: `class Kisi {
    weak var arkadas: Kisi?
}`,
      blanks: ['weak'],
      expectedOutput: 'weak referans tanımlandı: arkadas (retain cycle önlendi)'
    },
    xpReward: 10
  },

  {
    id: 'sw-project-quiz',
    title: 'Proje: Konsol Bazlı Quiz',
    order: 28,
    category: 'Swift',
    description: 'Basit quiz uygulaması mantığı.',
    exampleCode: `struct Soru {
    let metin: String
    let cevap: String
}

class Quiz {
    var sorular: [Soru] = []
    var puan = 0
    
    func soruEkle(_ soru: Soru) {
        sorular.append(soru)
    }
    
    func cevapKontrol(_ soruIndex: Int, cevap: String) -> Bool {
        guard soruIndex < sorular.count else { return false }
        if sorular[soruIndex].cevap == cevap {
            puan += 10
            return true
        }
        return false
    }
}

// Kullanım
let quiz = Quiz()
quiz.soruEkle(Soru(metin: "Swift hangi şirket tarafından geliştirildi?", cevap: "Apple"))
print(quiz.cevapKontrol(0, cevap: "Apple"))  // true`,
    challenge: {
      instructions: 'Quiz class\'ına soru ekleme metodu yaz.',
      starterCode: `class Quiz {
    var sorular: [Soru] = []
    func soruEkle(_ soru: Soru) {
        sorular.___BLANK1___(soru)
    }
}`,
      solution: `class Quiz {
    var sorular: [Soru] = []
    func soruEkle(_ soru: Soru) {
        sorular.append(soru)
    }
}`,
      blanks: ['append'],
      expectedOutput: 'Quiz class\'ı tanımlandı - soruEkle metodu eklendi'
    },
    xpReward: 10
  },

  {
    id: 'sw-project-data-model',
    title: 'Proje: Basit Veri Modeli',
    order: 29,
    category: 'Swift',
    description: 'Struct/Class ile veri modeli oluşturma.',
    exampleCode: `// Veri modeli
struct Kullanici {
    let id: Int
    var isim: String
    var email: String
    var yas: Int
    
    mutating func guncelle(isim: String?, email: String?) {
        if let yeniIsim = isim {
            self.isim = yeniIsim
        }
        if let yeniEmail = email {
            self.email = yeniEmail
        }
    }
}

// Kullanım
var kullanici = Kullanici(id: 1, isim: "Ali", email: "ali@example.com", yas: 25)
kullanici.guncelle(isim: "Ahmet", email: nil)
print(kullanici.isim)  // "Ahmet"`,
    challenge: {
      instructions: 'Veri modeli struct\'ı oluştur.',
      starterCode: `___BLANK1___ Urun {
    let id: Int
    var isim: String
    var fiyat: Double
}`,
      solution: `struct Urun {
    let id: Int
    var isim: String
    var fiyat: Double
}`,
      blanks: ['struct'],
      expectedOutput: 'Veri modeli oluşturuldu: Urun (id, isim, fiyat)'
    },
    xpReward: 10
  },

  {
    id: 'sw-review',
    title: 'Genel Tekrar',
    order: 30,
    category: 'Swift',
    description: 'Tüm konuların özeti ve tekrarı.',
    exampleCode: `// let vs var
let sabit = 10
var degisken = 20

// Optionals
var isim: String? = nil
if let i = isim {
    print(i)
}

// Functions
func topla(_ a: Int, _ b: Int) -> Int {
    a + b
}

// Struct
struct Nokta {
    var x: Int
    var y: Int
}

// Class
class Kisi {
    var isim: String
    init(isim: String) {
        self.isim = isim
    }
}

// Protocol
protocol Ucabilir {
    func uc()
}

// Extension
extension Int {
    var cift: Bool { self % 2 == 0 }
}`,
    challenge: {
      instructions: 'Optional binding ile nil kontrolü yap.',
      starterCode: `var deger: Int? = 10
___BLANK1___ ___BLANK2___ d = deger {
    print(d)
}`,
      solution: `var deger: Int? = 10
if let d = deger {
    print(d)
}`,
      blanks: ['if', 'let'],
      expectedOutput: '10'
    },
    xpReward: 10
  }
];

// Swift Final Sınavı (15 Soru)
export const swiftFinalExam = [
  {
    id: 'q1',
    question: 'let ve var arasındaki fark nedir?',
    options: [
      'let değiştirilebilir, var değiştirilemez',
      'let değiştirilemez, var değiştirilebilir',
      'İkisi de aynı',
      'let daha hızlı'
    ],
    correctAnswer: 1,
    explanation: 'let immutable (sabit), var mutable (değişken).'
  },
  {
    id: 'q2',
    question: 'Optional tip nasıl tanımlanır?',
    options: ['Type', 'Type?', 'Type!', 'Optional<Type>'],
    correctAnswer: 1,
    explanation: 'Type? ile optional tip tanımlanır. Örnek: String?'
  },
  {
    id: 'q3',
    question: 'Nil coalescing operatörü hangisidir?',
    options: ['?', '!', '??', '?:'],
    correctAnswer: 2,
    explanation: '?? operatörü, nil ise varsayılan değer döndürür.'
  },
  {
    id: 'q4',
    question: '1...5 ve 1..<5 arasındaki fark nedir?',
    options: [
      '1...5 son dahil, 1..<5 son hariç',
      '1...5 son hariç, 1..<5 son dahil',
      'Aynı',
      'Syntax hatası'
    ],
    correctAnswer: 0,
    explanation: '... son dahil, ..< son hariç range oluşturur.'
  },
  {
    id: 'q5',
    question: 'guard let ne zaman kullanılır?',
    options: [
      'Loop için',
      'Erken return için',
      'Class için',
      'Array için'
    ],
    correctAnswer: 1,
    explanation: 'guard let, koşul sağlanmazsa erken return yapmak için kullanılır.'
  },
  {
    id: 'q6',
    question: 'Struct ve Class arasındaki temel fark nedir?',
    options: [
      'Struct reference type, Class value type',
      'Struct value type, Class reference type',
      'İkisi de aynı',
      'Struct daha yavaş'
    ],
    correctAnswer: 1,
    explanation: 'Struct value type (kopyalanır), Class reference type (referans).'
  },
  {
    id: 'q7',
    question: 'mutating anahtar kelimesi ne işe yarar?',
    options: [
      'Class metodlarında kullanılır',
      'Struct metodlarında property değiştirmek için',
      'Protocol\'de kullanılır',
      'Extension\'da kullanılır'
    ],
    correctAnswer: 1,
    explanation: 'mutating, struct metodlarının property değiştirmesine izin verir.'
  },
  {
    id: 'q8',
    question: 'Protocol nedir?',
    options: [
      'Class türü',
      'Struct türü',
      'Arayüz/Blueprint',
      'Veri tipi'
    ],
    correctAnswer: 2,
    explanation: 'Protocol, metot ve property gereksinimleri tanımlayan arayüzdür.'
  },
  {
    id: 'q9',
    question: 'Extension ne işe yarar?',
    options: [
      'Yeni tip oluşturur',
      'Mevcut tipe özellik ekler',
      'Class oluşturur',
      'Protocol uygular'
    ],
    correctAnswer: 1,
    explanation: 'Extension, mevcut bir tipe yeni özellik/metot ekler.'
  },
  {
    id: 'q10',
    question: 'Closure\'da $0, $1 ne anlama gelir?',
    options: [
      'Değişken isimleri',
      'Kısayol parametre isimleri',
      'Array indeksleri',
      'Hata kodları'
    ],
    correctAnswer: 1,
    explanation: '$0, $1 closure parametrelerinin kısa gösterimidir.'
  },
  {
    id: 'q11',
    question: 'throw anahtar kelimesi ne işe yarar?',
    options: [
      'Fonksiyon tanımlar',
      'Hata fırlatır',
      'Loop oluşturur',
      'Array yaratır'
    ],
    correctAnswer: 1,
    explanation: 'throw, fonksiyondan hata fırlatmak için kullanılır.'
  },
  {
    id: 'q12',
    question: 'weak referans ne zaman kullanılır?',
    options: [
      'Her zaman',
      'Retain cycle önlemek için',
      'Hızlı kod için',
      'Array\'de'
    ],
    correctAnswer: 1,
    explanation: 'weak, retain cycle (bellek sızıntısı) önlemek için kullanılır.'
  },
  {
    id: 'q13',
    question: 'SwiftUI nedir?',
    options: [
      'Veri tabanı',
      'Declarative UI framework',
      'Test framework',
      'Networking kütüphanesi'
    ],
    correctAnswer: 1,
    explanation: 'SwiftUI, Apple\'ın modern declarative UI framework\'üdür.'
  },
  {
    id: 'q14',
    question: 'ARC ne anlama gelir?',
    options: [
      'Array Reference Count',
      'Automatic Reference Counting',
      'Apple Resource Control',
      'Advanced Runtime Compiler'
    ],
    correctAnswer: 1,
    explanation: 'ARC, Swift\'in otomatik bellek yönetim sistemidir.'
  },
  {
    id: 'q15',
    question: 'Computed property nedir?',
    options: [
      'Stored property',
      'Hesaplanan property',
      'Static property',
      'Lazy property'
    ],
    correctAnswer: 1,
    explanation: 'Computed property, değeri hesaplanarak döndürülen property\'dir.'
  }
];
