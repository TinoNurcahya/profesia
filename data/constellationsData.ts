export interface ConstellationStar {
  x: number;
  y: number;
  r: number;
  isMajor?: boolean;
  name?: string;
  bayerDesignation?: string;
  spectralType?: string;
  apparentMagnitude?: number;
  distanceLy?: number;
  meaningId?: string;
  meaningEn?: string;
}

export interface ConstellationData {
  slug: string;
  name: string;
  latinName: string;
  symbol: string;
  element: "fire" | "earth" | "air" | "water";
  colorHex: string;
  glowRgba: string;
  alphaStar: string;
  distanceRange: string;
  celestialCoordinates: string;
  bestViewingSeasonId: string;
  bestViewingSeasonEn: string;
  mythologyId: string;
  mythologyEn: string;
  archetypeFigureSummaryId: string;
  archetypeFigureSummaryEn: string;
  stars: ConstellationStar[];
  lines: [number, number][];
}

export const ZODIAC_CONSTELLATIONS: Record<string, ConstellationData> = {
  aries: {
    slug: "aries",
    name: "Aries",
    latinName: "Aries (The Winged Ram)",
    symbol: "♈",
    element: "fire",
    colorHex: "#f97316", // orange-500
    glowRgba: "rgba(249, 115, 22, 0.6)",
    alphaStar: "Hamal (α Arietis, Mag 2.01)",
    distanceRange: "59 - 164 Tahun Cahaya",
    celestialCoordinates: "RA 02h 38m / Dec +20° 47'",
    bestViewingSeasonId: "Oktober - Februari (Musim Gugur/Dingin)",
    bestViewingSeasonEn: "October - February (Autumn/Winter)",
    archetypeFigureSummaryId: "Garis lengkung khas melambangkan tanduk melingkar domba jantan emas Chrysomallos sang pelopor yang tak kenal gentar.",
    archetypeFigureSummaryEn: "The signature arched curve outlines the curled horns of the golden-fleeced ram Chrysomallos, the intrepid trailblazer.",
    mythologyId: "Dalam astronomi Babilonia dan Yunani kuno, Aries adalah Domba Emas penyelamat Phrixus. Susunan bintangnya membentuk busur tanduk perkasa yang selalu memimpin di awal lingkaran zodiak musim semi, merepresentasikan inisiasi proyek baru dan kepemimpinan berani.",
    mythologyEn: "In ancient Babylonian and Greek astronomy, Aries is the golden ram that rescued Phrixus. Its star formation charts the sweeping ram's horn leading the vernal equinox, embodying pioneering initiative and decisive leadership.",
    stars: [
      { x: 80, y: 190, r: 4, isMajor: false, name: "Mesarthim", bayerDesignation: "γ Arietis", spectralType: "B9V (Biner)", apparentMagnitude: 3.88, distanceLy: 164, meaningId: "Ujung tanduk luar", meaningEn: "Outer horn tip" },
      { x: 140, y: 155, r: 5, isMajor: true, name: "Sheratan", bayerDesignation: "β Arietis", spectralType: "A5V", apparentMagnitude: 2.64, distanceLy: 59, meaningId: "Lengkungan tanduk utama", meaningEn: "Main horn crest" },
      { x: 230, y: 110, r: 6.5, isMajor: true, name: "Hamal", bayerDesignation: "α Arietis", spectralType: "K2III (Raksasa Oranye)", apparentMagnitude: 2.01, distanceLy: 66, meaningId: "Kepala sang domba jantan", meaningEn: "Head of the ram" },
      { x: 320, y: 135, r: 3.5, isMajor: false, name: "41 Arietis", bayerDesignation: "c Arietis", spectralType: "B8V", apparentMagnitude: 3.63, distanceLy: 160, meaningId: "Punggung & surai", meaningEn: "Back and fleece" },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },

  taurus: {
    slug: "taurus",
    name: "Taurus",
    latinName: "Taurus (The Celestial Bull)",
    symbol: "♉",
    element: "earth",
    colorHex: "#10b981", // emerald-500
    glowRgba: "rgba(16, 185, 129, 0.6)",
    alphaStar: "Aldebaran (α Tauri, Mag 0.85)",
    distanceRange: "65 - 440 Tahun Cahaya",
    celestialCoordinates: "RA 04h 36m / Dec +16° 30'",
    bestViewingSeasonId: "November - Maret (Puncak Langit Musim Dingin)",
    bestViewingSeasonEn: "November - March (Mid-Winter Night Skies)",
    archetypeFigureSummaryId: "Formasi huruf 'V' gugus Hyades dengan mata merah Aldebaran membentang ke ujung tanduk Elnath dan Tianguan.",
    archetypeFigureSummaryEn: "The prominent 'V'-shaped Hyades cluster with red eye Aldebaran thrusts forward into horn tips Elnath and Tianguan.",
    mythologyId: "Taurus adalah salah satu rasi tertua sejak zaman Zaman Tembaga. Menampilkan wajah banteng perkasa bermahkota gugus Pleiades (Tujuh Bersaudari), dengan Aldebaran bersinar laksana mata merah yang mengawasi kekayaan alam dan fondasi kokoh.",
    mythologyEn: "Taurus is among the oldest recognized constellations. It outlines the charging celestial bull crowned by the shimmering Pleiades cluster, with Aldebaran glowing as the red eye embodying steadfast endurance and material mastery.",
    stars: [
      { x: 190, y: 180, r: 7, isMajor: true, name: "Aldebaran", bayerDesignation: "α Tauri", spectralType: "K5III (Raksasa Merah)", apparentMagnitude: 0.85, distanceLy: 65, meaningId: "Mata merah sang Banteng (Cor Tauri)", meaningEn: "Red Eye of the Bull" },
      { x: 230, y: 200, r: 4, isMajor: false, name: "Hyades", bayerDesignation: "θ Tauri", spectralType: "A7III", apparentMagnitude: 3.84, distanceLy: 154, meaningId: "Wajah segitiga V banteng", meaningEn: "V-shaped Bull snout" },
      { x: 220, y: 150, r: 4.5, isMajor: false, name: "Ain", bayerDesignation: "ε Tauri", spectralType: "G9.5III", apparentMagnitude: 3.53, distanceLy: 147, meaningId: "Mata utara banteng", meaningEn: "Northern eye" },
      { x: 150, y: 150, r: 3.5, isMajor: false, name: "Gamma Tauri", bayerDesignation: "γ Tauri", spectralType: "G8III", apparentMagnitude: 3.65, distanceLy: 154, meaningId: "Pangkal rahang banteng", meaningEn: "Base of muzzle" },
      { x: 90, y: 110, r: 5, isMajor: true, name: "Elnath", bayerDesignation: "β Tauri", spectralType: "B7III", apparentMagnitude: 1.65, distanceLy: 134, meaningId: "Ujung tanduk utara", meaningEn: "Northern horn tip" },
      { x: 120, y: 240, r: 4.5, isMajor: true, name: "Tianguan", bayerDesignation: "ζ Tauri", spectralType: "B2III", apparentMagnitude: 3.01, distanceLy: 440, meaningId: "Ujung tanduk selatan", meaningEn: "Southern horn tip" },
      { x: 300, y: 90, r: 4, isMajor: false, name: "Pleiades", bayerDesignation: "M45", spectralType: "Open Cluster", apparentMagnitude: 1.60, distanceLy: 444, meaningId: "Pundak & gugus Tujuh Bersaudari", meaningEn: "Shoulder & Seven Sisters" },
    ],
    lines: [
      [3, 0],
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [0, 5],
      [2, 6],
    ],
  },

  gemini: {
    slug: "gemini",
    name: "Gemini",
    latinName: "Gemini (The Inseparable Twins)",
    symbol: "♊",
    element: "air",
    colorHex: "#06b6d4", // cyan-500
    glowRgba: "rgba(6, 182, 212, 0.6)",
    alphaStar: "Pollux (β Gem, Mag 1.14) & Castor (α Gem, Mag 1.58)",
    distanceRange: "34 - 109 Tahun Cahaya",
    celestialCoordinates: "RA 07h 00m / Dec +22° 00'",
    bestViewingSeasonId: "Desember - Mei (Musim Dingin hingga Musim Semi)",
    bestViewingSeasonEn: "December - May (Winter through Late Spring)",
    archetypeFigureSummaryId: "Dua figur manusia kembar berdampingan: kepala kembar Castor & Pollux, tubuh Wasat-Mebsuta yang bergandengan tangan, dan kaki di Tejat-Alhena.",
    archetypeFigureSummaryEn: "Two twin human figures side-by-side: Castor & Pollux as heads, Wasat-Mebsuta clasped hands, anchored by feet Tejat and Alhena.",
    mythologyId: "Gemini menggambarkan dua pahlawan kembar Yunani, Castor (ahli strategi berkuda) dan Pollux (abadi, anak Zeus). Di langit malam, bintang-bintangnya terhubung membentuk dua tubuh yang bergandengan tangan, merepresentasikan dualitas ide, komunikasi adaptif, dan kolaborasi multitalenta.",
    mythologyEn: "Gemini commemorates the mythical Dioscuri twins, mortal Castor and immortal Pollux. Star bridges link the two standing human figures holding hands across the cosmos, symbolizing intellectual duality, rapid communication, and versatile teamwork.",
    stars: [
      { x: 130, y: 70, r: 6, isMajor: true, name: "Castor", bayerDesignation: "α Geminorum", spectralType: "A1V (Sistem 6 Bintang)", apparentMagnitude: 1.58, distanceLy: 51, meaningId: "Kepala kembar fana (logika & penalaran analitis)", meaningEn: "Head of mortal twin (analytical logic)" },
      { x: 210, y: 80, r: 6.5, isMajor: true, name: "Pollux", bayerDesignation: "β Geminorum", spectralType: "K0IIIb (Raksasa Oranye)", apparentMagnitude: 1.14, distanceLy: 34, meaningId: "Kepala kembar abadi (intuisi & kehangatan)", meaningEn: "Head of immortal twin (creative intuition)" },
      { x: 110, y: 130, r: 4, isMajor: false, name: "Mebsuta", bayerDesignation: "ε Geminorum", spectralType: "G8Ib (Super-raksasa)", apparentMagnitude: 3.06, distanceLy: 840, meaningId: "Lengan kiri Castor terentang", meaningEn: "Castor's outstretched arm" },
      { x: 190, y: 150, r: 4.5, isMajor: false, name: "Wasat", bayerDesignation: "δ Geminorum", spectralType: "F0IV", apparentMagnitude: 3.53, distanceLy: 60, meaningId: "Titik tengah tangan kedua kembar bergandengan", meaningEn: "Mid-body clasped hands nexus" },
      { x: 90, y: 220, r: 4, isMajor: false, name: "Tejat", bayerDesignation: "μ Geminorum", spectralType: "M3III", apparentMagnitude: 2.87, distanceLy: 230, meaningId: "Kaki Castor yang berpijak", meaningEn: "Castor's grounded foot" },
      { x: 170, y: 240, r: 5, isMajor: true, name: "Alhena", bayerDesignation: "γ Geminorum", spectralType: "A0IV (Sub-raksasa Putih)", apparentMagnitude: 1.93, distanceLy: 109, meaningId: "Kaki gemerlap Pollux", meaningEn: "Pollux's brilliant foot" },
      { x: 260, y: 170, r: 3.5, isMajor: false, name: "Kappa Gem", bayerDesignation: "κ Geminorum", spectralType: "G8III", apparentMagnitude: 3.57, distanceLy: 143, meaningId: "Tangan Pollux menggapai bintang", meaningEn: "Pollux's reaching arm" },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [2, 4],
      [1, 3],
      [3, 5],
      [2, 3],
      [1, 6],
    ],
  },

  cancer: {
    slug: "cancer",
    name: "Cancer",
    latinName: "Cancer (The Celestial Crab)",
    symbol: "♋",
    element: "water",
    colorHex: "#3b82f6", // blue-500
    glowRgba: "rgba(59, 130, 246, 0.6)",
    alphaStar: "Altarf (β Cancri, Mag 3.50) & Acubens (α Cnc)",
    distanceRange: "136 - 290 Tahun Cahaya",
    celestialCoordinates: "RA 08h 40m / Dec +20° 00'",
    bestViewingSeasonId: "Januari - Mei (Langit Musim Semi)",
    bestViewingSeasonEn: "January - May (Spring Sky Realm)",
    archetypeFigureSummaryId: "Bentuk huruf 'Y' terbalik yang menghubungkan dua capit kepiting, dengan gugus Sarang Lebah (M44) di tengah cangkang pelindungnya.",
    archetypeFigureSummaryEn: "Inverted 'Y' pattern anchoring the dual pincers of the crab around the central protective Beehive Cluster (M44).",
    mythologyId: "Cancer adalah kepiting raksasa Carcinus yang memiliki cangkang pelindung sangat kuat. Rasi ini menaungi gugus bintang terbuka legendaris Praesepe (Sarang Lebah M44), melambangkan empati protektif, intuisi mendalam, dan loyalitas tanpa syarat.",
    mythologyEn: "Cancer represents the mythical guardian crab with an impenetrable protective shell. At its heart lies the glittering Praesepe (Beehive) cluster, symbolizing protective nurture, empathetic radar, and profound emotional tenacity.",
    stars: [
      { x: 200, y: 130, r: 5, isMajor: true, name: "Asellus Borealis", bayerDesignation: "γ Cancri", spectralType: "A1V", apparentMagnitude: 4.66, distanceLy: 158, meaningId: "Keledai utara penjaga sarang", meaningEn: "Northern donkey of the manger" },
      { x: 210, y: 175, r: 5, isMajor: true, name: "Asellus Australis", bayerDesignation: "δ Cancri", spectralType: "K0III", apparentMagnitude: 3.94, distanceLy: 136, meaningId: "Pusat cangkang dekat M44", meaningEn: "Central carapace near M44" },
      { x: 130, y: 100, r: 4.5, isMajor: false, name: "Iota Cancri", bayerDesignation: "ι Cancri", spectralType: "G8III", apparentMagnitude: 4.02, distanceLy: 298, meaningId: "Ujung capit utara", meaningEn: "Northern claw tip" },
      { x: 140, y: 230, r: 5, isMajor: true, name: "Acubens", bayerDesignation: "α Cancri", spectralType: "A5m (Biner)", apparentMagnitude: 4.26, distanceLy: 174, meaningId: "Capit selatan (Acubens)", meaningEn: "Southern clamping claw" },
      { x: 280, y: 220, r: 5.5, isMajor: true, name: "Altarf", bayerDesignation: "β Cancri", spectralType: "K4III", apparentMagnitude: 3.50, distanceLy: 290, meaningId: "Kaki penopang terkuat", meaningEn: "Strongest anchor leg" },
    ],
    lines: [
      [2, 0],
      [0, 1],
      [1, 3],
      [1, 4],
    ],
  },

  leo: {
    slug: "leo",
    name: "Leo",
    latinName: "Leo (The Nemean Lion)",
    symbol: "♌",
    element: "fire",
    colorHex: "#eab308", // yellow-500 / amber
    glowRgba: "rgba(234, 179, 8, 0.6)",
    alphaStar: "Regulus (α Leonis, Mag 1.36, Cor Leonis)",
    distanceRange: "36 - 130 Tahun Cahaya",
    celestialCoordinates: "RA 10h 40m / Dec +15° 00'",
    bestViewingSeasonId: "Februari - Juni (Klimaks Musim Semi)",
    bestViewingSeasonEn: "February - June (Spring Zenith)",
    archetypeFigureSummaryId: "Lengkungan sabit surai megah 'The Sickle' yang berujung pada jantung singa Regulus, dengan tubuh persegi menuju ekor Denebola.",
    archetypeFigureSummaryEn: "The regal 'Sickle' mane curved backwards into royal heart Regulus, flowing into the powerful torso and tail Denebola.",
    mythologyId: "Leo adalah Singa Nemea yang tak tertembus senjata. Rasi ini paling mudah dikenali di langit musim semi karena gugusan bintang depannya menyerupai sabit atau tanda tanya terbalik (The Sickle), dengan Regulus bersinar agung sebagai lambang kepemimpinan dan integritas karismatik.",
    mythologyEn: "Leo honors the fierce Nemean Lion whose golden pelt resisted mortal blades. Recognized worldwide by 'The Sickle' asterism that forms the mane, anchored by the heart star Regulus, it radiates sovereign leadership, creative courage, and dignity.",
    stars: [
      { x: 230, y: 210, r: 7, isMajor: true, name: "Regulus", bayerDesignation: "α Leonis", spectralType: "B7V (Bintang Kerajaan)", apparentMagnitude: 1.36, distanceLy: 79, meaningId: "Jantung sang Singa (Cor Leonis)", meaningEn: "Heart of the Lion (Cor Leonis)" },
      { x: 250, y: 150, r: 5, isMajor: true, name: "Algieba", bayerDesignation: "γ Leonis", spectralType: "K1III (Biner Emas)", apparentMagnitude: 2.01, distanceLy: 130, meaningId: "Surai emas megah singa", meaningEn: "Golden lion mane" },
      { x: 280, y: 100, r: 4, isMajor: false, name: "Adhafera", bayerDesignation: "ζ Leonis", spectralType: "F0III", apparentMagnitude: 3.44, distanceLy: 260, meaningId: "Lengkungan kepala atas sabit", meaningEn: "Crest of the sickle" },
      { x: 250, y: 65, r: 4.5, isMajor: false, name: "Rasalas", bayerDesignation: "μ Leonis", spectralType: "K2III", apparentMagnitude: 3.88, distanceLy: 133, meaningId: "Moncong singa yang mengaum", meaningEn: "Roaring lion snout" },
      { x: 160, y: 145, r: 4.5, isMajor: false, name: "Zosma", bayerDesignation: "δ Leonis", spectralType: "A4V", apparentMagnitude: 2.56, distanceLy: 58, meaningId: "Punggung tegak singa", meaningEn: "Lion's proud flank" },
      { x: 170, y: 195, r: 4, isMajor: false, name: "Chertan", bayerDesignation: "θ Leonis", spectralType: "A2V", apparentMagnitude: 3.32, distanceLy: 165, meaningId: "Pinggul belakang singa", meaningEn: "Hindquarters anchor" },
      { x: 80, y: 150, r: 6, isMajor: true, name: "Denebola", bayerDesignation: "β Leonis", spectralType: "A3V", apparentMagnitude: 2.14, distanceLy: 36, meaningId: "Ekor sang singa penguasa", meaningEn: "Tail of the sovereign lion" },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 6],
      [6, 5],
      [5, 0],
      [4, 5],
    ],
  },

  virgo: {
    slug: "virgo",
    name: "Virgo",
    latinName: "Virgo (The Celestial Maiden)",
    symbol: "♍",
    element: "earth",
    colorHex: "#059669", // emerald-600
    glowRgba: "rgba(5, 150, 105, 0.6)",
    alphaStar: "Spica (α Virginis, Mag 0.98)",
    distanceRange: "36 - 250 Tahun Cahaya",
    celestialCoordinates: "RA 13h 25m / Dec -04° 00'",
    bestViewingSeasonId: "Maret - Juli (Langit Panen Musim Semi/Panas)",
    bestViewingSeasonEn: "March - July (Harvest Spring/Summer Skies)",
    archetypeFigureSummaryId: "Figur dewi Astraea bersayap dengan gaun anggun yang memegang tangkai gandum biru menyala Spica di tangan kirinya.",
    archetypeFigureSummaryEn: "Winged maiden goddess Astraea holding the radiant blue ear of wheat Spica in her outstretched hand.",
    mythologyId: "Virgo adalah dewi keadilan dan panen Astraea, sosok terakhir yang meninggalkan bumi menuju surga. Spica ('bulir gandum') memancarkan kemurnian cahaya biru-putih, melambangkan keahlian analitis, presisi metodologis, dan dedikasi pada mutu kesempurnaan.",
    mythologyEn: "Virgo is personified by Astraea, goddess of divine justice and innocence holding the golden harvest. Its beacon Spica shines with pristine blue-white brilliance, epitomizing methodical craft, diagnostic precision, and devoted stewardship.",
    stars: [
      { x: 260, y: 230, r: 7, isMajor: true, name: "Spica", bayerDesignation: "α Virginis", spectralType: "B1III-IV (Bintang Biru Raksasa)", apparentMagnitude: 0.98, distanceLy: 250, meaningId: "Bulir gandum berkilau di tangan dewi", meaningEn: "Spike of wheat in the maiden's hand" },
      { x: 210, y: 170, r: 4.5, isMajor: false, name: "Porrima", bayerDesignation: "γ Virginis", spectralType: "F0V (Biner Kembar)", apparentMagnitude: 2.74, distanceLy: 38, meaningId: "Pinggang gaun anggun sang perawan", meaningEn: "Waistline of the celestial gown" },
      { x: 160, y: 190, r: 4, isMajor: false, name: "Zaniah", bayerDesignation: "η Virginis", spectralType: "A2IV", apparentMagnitude: 3.89, distanceLy: 250, meaningId: "Sayap selatan pelindung", meaningEn: "Southern protective wing" },
      { x: 110, y: 180, r: 4.5, isMajor: false, name: "Zavijava", bayerDesignation: "β Virginis", spectralType: "F9V", apparentMagnitude: 3.61, distanceLy: 36, meaningId: "Ujung sayap dewi", meaningEn: "Wingtip of justice" },
      { x: 220, y: 100, r: 5, isMajor: true, name: "Vindemiatrix", bayerDesignation: "ε Virginis", spectralType: "G8III", apparentMagnitude: 2.83, distanceLy: 110, meaningId: "Tangan kanan pemetik buah panen", meaningEn: "Grape gatherer's hand" },
      { x: 280, y: 130, r: 4, isMajor: false, name: "Heze", bayerDesignation: "ζ Virginis", spectralType: "A3V", apparentMagnitude: 3.37, distanceLy: 74, meaningId: "Lengan kiri penopang gandum", meaningEn: "Support arm holding the sheaf" },
    ],
    lines: [
      [3, 2],
      [2, 1],
      [1, 0],
      [1, 4],
      [4, 5],
      [5, 0],
    ],
  },

  libra: {
    slug: "libra",
    name: "Libra",
    latinName: "Libra (The Celestial Scales)",
    symbol: "♎",
    element: "air",
    colorHex: "#0284c7", // sky-600
    glowRgba: "rgba(2, 132, 199, 0.6)",
    alphaStar: "Zubeneschamali (β Lib) & Zubenelgenubi (α Lib)",
    distanceRange: "77 - 160 Tahun Cahaya",
    celestialCoordinates: "RA 15h 17m / Dec -15° 00'",
    bestViewingSeasonId: "April - Agustus (Langit Musim Panas)",
    bestViewingSeasonEn: "April - August (Summer Night Skies)",
    archetypeFigureSummaryId: "Bentuk belah ketupat seimbang yang memvisualisasikan dua piringan timbangan penimbang keadilan dan harmoni kosmis.",
    archetypeFigureSummaryEn: "A diamond balance geometry charting the dual weighing pans of cosmic equilibrium and impartial justice.",
    mythologyId: "Libra adalah satu-satunya rasi bintang zodiak yang melambangkan objek keseimbangan non-hewan. Neraca keadilan ini dipegang oleh Astraea untuk menimbang kebenaran, menandai kesetimbangan siang dan malam pada ekuinoks, simbol negosiasi objektif dan estetika luhur.",
    mythologyEn: "Libra stands as the sole zodiac sign represented by an inanimate instrument of balance. Symbolizing the weighing scales of justice held by Astraea, it personifies objective mediation, harmonizing diplomacy, and refined aesthetic poise.",
    stars: [
      { x: 200, y: 90, r: 6, isMajor: true, name: "Zubeneschamali", bayerDesignation: "β Librae", spectralType: "B8V (Rona Kehijauan Unik)", apparentMagnitude: 2.61, distanceLy: 160, meaningId: "Lengan timbangan utara (Capit Utara)", meaningEn: "Northern balance beam (Northern Claw)" },
      { x: 130, y: 180, r: 6, isMajor: true, name: "Zubenelgenubi", bayerDesignation: "α Librae", spectralType: "A3m (Biner Terbuka)", apparentMagnitude: 2.75, distanceLy: 77, meaningId: "Piringan timbangan selatan (Capit Selatan)", meaningEn: "Southern scale pan (Southern Claw)" },
      { x: 270, y: 170, r: 5, isMajor: false, name: "Zubenelhakrabi", bayerDesignation: "γ Librae", spectralType: "G8III", apparentMagnitude: 3.91, distanceLy: 163, meaningId: "Piringan timbangan timur", meaningEn: "Eastern scale pan" },
      { x: 220, y: 240, r: 4.5, isMajor: false, name: "Brachium", bayerDesignation: "σ Librae", spectralType: "M3III", apparentMagnitude: 3.29, distanceLy: 288, meaningId: "Titik tumpu dasar keseimbangan", meaningEn: "Base fulcrum of equilibrium" },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [1, 2],
    ],
  },

  scorpio: {
    slug: "scorpio",
    name: "Scorpio",
    latinName: "Scorpius (The Celestial Scorpion)",
    symbol: "♏",
    element: "water",
    colorHex: "#6366f1", // indigo-500
    glowRgba: "rgba(99, 102, 241, 0.6)",
    alphaStar: "Antares (α Scorpii, Mag 1.06, Rival of Mars)",
    distanceRange: "65 - 580 Tahun Cahaya",
    celestialCoordinates: "RA 16h 53m / Dec -30° 00'",
    bestViewingSeasonId: "Juni - September (Puncak Galaksi Bima Sakti)",
    bestViewingSeasonEn: "June - September (Milky Way Core Apex)",
    archetypeFigureSummaryId: "Rantai bintang melengkung menyerupai kait ekor kalajengking dengan sengat ganda Shaula-Lesath dan jantung merah membara Antares.",
    archetypeFigureSummaryEn: "Sweeping 'S'-curve stinger hook trailing behind red supergiant heart Antares, crowned by toxic stinger Shaula-Lesath.",
    mythologyId: "Scorpius adalah rasi spektakuler di jalur terpadat Bima Sakti. Memiliki bentuk 'S' sempurna yang melambangkan kalajengking raksasa kiriman Gaia, dengan Antares menyala merah di jantungnya sebagai simbol transformasi mendalam, daya juang intens, dan wawasan tajam.",
    mythologyEn: "Scorpius commands the southern Milky Way with one of the most recognizable anatomies in the sky. Featuring the blazing red supergiant Antares at its heart and the lethal stinger Shaula, it epitomizes transformative depth, relentless focus, and strategic power.",
    stars: [
      { x: 130, y: 90, r: 5, isMajor: false, name: "Graffias", bayerDesignation: "β Scorpii", spectralType: "B1V (Sistem Jamak)", apparentMagnitude: 2.62, distanceLy: 400, meaningId: "Capit kalajengking utara", meaningEn: "Northern claw tip" },
      { x: 140, y: 120, r: 5, isMajor: false, name: "Dschubba", bayerDesignation: "δ Scorpii", spectralType: "B0.2IV", apparentMagnitude: 2.29, distanceLy: 440, meaningId: "Dahi pelindung kalajengking", meaningEn: "Scorpion's forehead crown" },
      { x: 140, y: 155, r: 4.5, isMajor: false, name: "Fang", bayerDesignation: "π Scorpii", spectralType: "B1V", apparentMagnitude: 2.89, distanceLy: 460, meaningId: "Capit penyergap selatan", meaningEn: "Southern striking claw" },
      { x: 180, y: 175, r: 7.5, isMajor: true, name: "Antares", bayerDesignation: "α Scorpii", spectralType: "M1.5Iab (Super-raksasa Merah)", apparentMagnitude: 1.06, distanceLy: 550, meaningId: "Jantung sang Kalajengking (Cor Scorpii)", meaningEn: "Heart of the Scorpion (Cor Scorpii)" },
      { x: 205, y: 210, r: 4.5, isMajor: false, name: "Wei", bayerDesignation: "ε Scorpii", spectralType: "K2.5III", apparentMagnitude: 2.29, distanceLy: 65, meaningId: "Ruas tubuh pertama", meaningEn: "First body segment" },
      { x: 245, y: 230, r: 4, isMajor: false, name: "Girtab", bayerDesignation: "κ Scorpii", spectralType: "B1.5III", apparentMagnitude: 2.41, distanceLy: 460, meaningId: "Lengkungan ekor menuju sengat", meaningEn: "Ascending tail curve" },
      { x: 280, y: 210, r: 4.5, isMajor: false, name: "Sargas", bayerDesignation: "θ Scorpii", spectralType: "F1II (Raksasa Terang)", apparentMagnitude: 1.86, distanceLy: 270, meaningId: "Pangkal sengat pelontar", meaningEn: "Stinger base coil" },
      { x: 285, y: 165, r: 6, isMajor: true, name: "Shaula", bayerDesignation: "λ Scorpii", spectralType: "B2IV", apparentMagnitude: 1.62, distanceLy: 570, meaningId: "Ujung sengat kalajengking utama", meaningEn: "Primary venomous stinger" },
      { x: 265, y: 155, r: 5, isMajor: false, name: "Lesath", bayerDesignation: "υ Scorpii", spectralType: "B2IV", apparentMagnitude: 2.70, distanceLy: 580, meaningId: "Duri penyengat pendamping", meaningEn: "Companion piercing barb" },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
  },

  sagittarius: {
    slug: "sagittarius",
    name: "Sagittarius",
    latinName: "Sagittarius (The Celestial Archer)",
    symbol: "♐",
    element: "fire",
    colorHex: "#dc2626", // red-600
    glowRgba: "rgba(220, 38, 38, 0.6)",
    alphaStar: "Kaus Australis (ε Sgr, Mag 1.79) & Nunki (σ Sgr)",
    distanceRange: "77 - 306 Tahun Cahaya",
    celestialCoordinates: "RA 19h 00m / Dec -25° 00'",
    bestViewingSeasonId: "Juli - Oktober (Menghadap Pusat Galaksi)",
    bestViewingSeasonEn: "July - October (Facing Galactic Nucleus)",
    archetypeFigureSummaryId: "Asterisma 'Teapot' (Poci Teh) legendaris dengan cerat Alnasl membidikkan panah ke galaksi dan busur Kaus Australis.",
    archetypeFigureSummaryEn: "The famed 'Teapot' asterism with nozzle Alnasl releasing the celestial arrow toward the galactic center.",
    mythologyId: "Sagittarius adalah centaur pemanah bijak Chiron yang mengarahkan busur panahnya lurus ke arah jantung kalajengking. Di langit malam, bintang-bintang terangnya membentuk formasi poci teh (The Teapot) tepat di atas inti supermasif galaksi kita.",
    mythologyEn: "Sagittarius depicts the wise centaur archer drawing his celestial bow towards infinity. Known for 'The Teapot' asterism sitting directly atop our galactic center, it embodies expansive quest for truth, philosophical optimism, and vision.",
    stars: [
      { x: 130, y: 180, r: 5, isMajor: true, name: "Alnasl", bayerDesignation: "γ2 Sagittarii", spectralType: "K0III", apparentMagnitude: 2.98, distanceLy: 96, meaningId: "Ujung mata panah cerat poci", meaningEn: "Arrowhead spout tip" },
      { x: 175, y: 145, r: 5.5, isMajor: true, name: "Kaus Media", bayerDesignation: "δ Sagittarii", spectralType: "K3III", apparentMagnitude: 2.72, distanceLy: 306, meaningId: "Tengah busur pemanah", meaningEn: "Center of the archer's bow" },
      { x: 195, y: 90, r: 5, isMajor: true, name: "Kaus Borealis", bayerDesignation: "λ Sagittarii", spectralType: "K1III", apparentMagnitude: 2.82, distanceLy: 77, meaningId: "Ujung busur utara (tutup poci)", meaningEn: "Northern bow tip (lid handle)" },
      { x: 190, y: 225, r: 6.5, isMajor: true, name: "Kaus Australis", bayerDesignation: "ε Sagittarii", spectralType: "B9.5III", apparentMagnitude: 1.79, distanceLy: 143, meaningId: "Pangkal busur selatan yang kokoh", meaningEn: "Southern bow base anchor" },
      { x: 250, y: 130, r: 4.5, isMajor: false, name: "Phi Sgr", bayerDesignation: "φ Sagittarii", spectralType: "B8.5III", apparentMagnitude: 3.17, distanceLy: 239, meaningId: "Punggung tali busur", meaningEn: "Bowstring spine" },
      { x: 255, y: 200, r: 5.5, isMajor: true, name: "Ascella", bayerDesignation: "ζ Sagittarii", spectralType: "A2V (Biner)", apparentMagnitude: 2.60, distanceLy: 89, meaningId: "Gagang poci teh / ketiak pemanah", meaningEn: "Teapot handle / archer's armpit" },
      { x: 300, y: 110, r: 6, isMajor: true, name: "Nunki", bayerDesignation: "σ Sagittarii", spectralType: "B2.5V (Bintang Suci)", apparentMagnitude: 2.05, distanceLy: 228, meaningId: "Tangan pemanah penarik tali panah", meaningEn: "Drawing hand on the celestial cord" },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 4],
      [1, 3],
      [3, 5],
      [4, 5],
      [4, 6],
      [5, 6],
      [1, 4],
    ],
  },

  capricorn: {
    slug: "capricorn",
    name: "Capricorn",
    latinName: "Capricornus (The Horned Sea-Goat)",
    symbol: "♑",
    element: "earth",
    colorHex: "#15803d", // green-700
    glowRgba: "rgba(21, 128, 61, 0.6)",
    alphaStar: "Deneb Algedi (δ Cap, Mag 2.85) & Algedi (α Cap)",
    distanceRange: "39 - 340 Tahun Cahaya",
    celestialCoordinates: "RA 21h 00m / Dec -20° 00'",
    bestViewingSeasonId: "Agustus - November (Langit Malam Musim Gugur)",
    bestViewingSeasonEn: "August - November (Autumn Night Skies)",
    archetypeFigureSummaryId: "Bentuk segitiga melengkung yang menggambarkan kepala kambing bertanduk Algedi dan sirip ekor ikan penyelam Deneb Algedi.",
    archetypeFigureSummaryEn: "Arched triangular wedge outlining the climbing goat horns Algedi connected to the diving fish tail Deneb Algedi.",
    mythologyId: "Capricornus melambangkan makhluk mitologi laut kuno berkepala kambing dan berekor ikan. Sosok ini sanggup mendaki tebing tertinggi dan menyelami palung samudera terdalam, merepresentasikan ketabahan tak tergoyahkan, etos kerja disiplin, dan penguasaan jangka panjang.",
    mythologyEn: "Capricornus is the venerable Sea-Goat from ancient Mesopotamian lore. With horns to scale jagged summits and a tail to traverse abyssal waters, it represents indomitable stamina, executive patience, and legacy building.",
    stars: [
      { x: 90, y: 90, r: 5.5, isMajor: true, name: "Algedi", bayerDesignation: "α2 Capricorni", spectralType: "G8III (Biner Optik)", apparentMagnitude: 3.58, distanceLy: 109, meaningId: "Tanduk kambing yang mendaki", meaningEn: "Climbing goat's horn" },
      { x: 105, y: 120, r: 5, isMajor: true, name: "Dabih", bayerDesignation: "β Capricorni", spectralType: "K0II (Bintang Ganda)", apparentMagnitude: 3.05, distanceLy: 340, meaningId: "Kepala dan mata kambing laut", meaningEn: "Head of the sea-goat" },
      { x: 180, y: 230, r: 4.5, isMajor: false, name: "Omega Cap", bayerDesignation: "ω Capricorni", spectralType: "M0III", apparentMagnitude: 4.12, distanceLy: 850, meaningId: "Pusat perut kambing laut", meaningEn: "Belly keel of the chimera" },
      { x: 280, y: 180, r: 4, isMajor: false, name: "Zeta Cap", bayerDesignation: "ζ Capricorni", spectralType: "G4Ib", apparentMagnitude: 3.77, distanceLy: 398, meaningId: "Pangkal sirip ekor", meaningEn: "Fin base articulation" },
      { x: 310, y: 120, r: 5, isMajor: true, name: "Nashira", bayerDesignation: "γ Capricorni", spectralType: "A7m", apparentMagnitude: 3.69, distanceLy: 139, meaningId: "Pembawa kabar baik (Sirip atas)", meaningEn: "The fortunate bearer (Upper fin)" },
      { x: 325, y: 95, r: 6, isMajor: true, name: "Deneb Algedi", bayerDesignation: "δ Capricorni", spectralType: "A7m (Biner Gerhana)", apparentMagnitude: 2.85, distanceLy: 39, meaningId: "Ekor kejayaan kambing laut", meaningEn: "Tail of the triumphing sea-goat" },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ],
  },

  aquarius: {
    slug: "aquarius",
    name: "Aquarius",
    latinName: "Aquarius (The Celestial Water-Bearer)",
    symbol: "♒",
    element: "air",
    colorHex: "#38bdf8", // light blue
    glowRgba: "rgba(56, 189, 248, 0.6)",
    alphaStar: "Sadalsuud (β Aqr, Mag 2.90) & Sadalmelik (α Aqr)",
    distanceRange: "160 - 540 Tahun Cahaya",
    celestialCoordinates: "RA 22h 20m / Dec -10° 00'",
    bestViewingSeasonId: "September - Desember (Langit Musim Gugur)",
    bestViewingSeasonEn: "September - December (Autumn Evenings)",
    archetypeFigureSummaryId: "Aliran zig-zag air kosmis yang dicurahkan dari guci surgawi di pundak Sadalsuud dan Sadalmelik menuju Skat.",
    archetypeFigureSummaryEn: "The zig-zag celestial current pouring forth from the celestial urn carried by Sadalsuud and Sadalmelik toward Skat.",
    mythologyId: "Aquarius menggambarkan Ganymede yang menuangkan air surgawi pembawa kebijaksanaan dari kendi abadi. Garis bintangnya menggambarkan aliran air kehidupan yang mengalir zig-zag ke bumi, lambang inovasi visioner, kemanusiaan, dan pemikiran progresif melintasi zaman.",
    mythologyEn: "Aquarius depicts the divine cupbearer Ganymede dispensing the river of knowledge from an amphora. Its cascading stars trace streams of living water enriching humanity, representing visionary humanitarianism, eccentric genius, and progress.",
    stars: [
      { x: 170, y: 80, r: 6, isMajor: true, name: "Sadalmelik", bayerDesignation: "α Aquarii", spectralType: "G2Ib (Super-raksasa Kuning)", apparentMagnitude: 2.95, distanceLy: 520, meaningId: "Bintang sang Raja di pundak kanan", meaningEn: "Lucky star of the King" },
      { x: 230, y: 90, r: 6.5, isMajor: true, name: "Sadalsuud", bayerDesignation: "β Aquarii", spectralType: "G0Ib (Paling Beruntung)", apparentMagnitude: 2.90, distanceLy: 540, meaningId: "Pundak pembawa guci surgawi", meaningEn: "Luck of lucks at the urn shoulder" },
      { x: 150, y: 140, r: 4.5, isMajor: false, name: "Ancha", bayerDesignation: "θ Aquarii", spectralType: "G8III", apparentMagnitude: 4.17, distanceLy: 191, meaningId: "Pinggul pembawa kendi", meaningEn: "Urn bearer's hip" },
      { x: 120, y: 200, r: 5, isMajor: true, name: "Skat", bayerDesignation: "δ Aquarii", spectralType: "A3V", apparentMagnitude: 3.27, distanceLy: 160, meaningId: "Kaki penopang yang kokoh", meaningEn: "Firm anchoring leg" },
      { x: 270, y: 150, r: 4, isMajor: false, name: "Hydor", bayerDesignation: "λ Aquarii", spectralType: "M2.5III", apparentMagnitude: 3.73, distanceLy: 390, meaningId: "Mulut guci pencurah air", meaningEn: "Mouth of the pouring vessel" },
      { x: 250, y: 220, r: 4.5, isMajor: false, name: "Lambda Aqr", bayerDesignation: "τ2 Aquarii", spectralType: "K5III", apparentMagnitude: 4.05, distanceLy: 380, meaningId: "Aliran air kosmis yang menyebar", meaningEn: "Cascading water stream" },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [2, 3],
      [1, 4],
      [4, 5],
      [2, 4],
    ],
  },

  pisces: {
    slug: "pisces",
    name: "Pisces",
    latinName: "Pisces (The Celestial Cord & Fishes)",
    symbol: "♓",
    element: "water",
    colorHex: "#818cf8", // indigo-400
    glowRgba: "rgba(129, 140, 248, 0.6)",
    alphaStar: "Alrescha (α Piscium, Mag 3.82, Simpul Pita)",
    distanceRange: "139 - 490 Tahun Cahaya",
    celestialCoordinates: "RA 00h 30m / Dec +15° 00'",
    bestViewingSeasonId: "Oktober - Januari (Langit Musim Dingin Awal)",
    bestViewingSeasonEn: "October - January (Early Winter Skies)",
    archetypeFigureSummaryId: "Bentuk 'V' lebar dengan simpul Alrescha yang menyatukan dua pita sutra menuju ikan utara dan ikan barat.",
    archetypeFigureSummaryEn: "Broad 'V'-shaped ribbon with node Alrescha binding two streaming cords to the northern and western fishes.",
    mythologyId: "Pisces menggambarkan Aphrodite dan putranya Eros yang bertransformasi menjadi dua ekor ikan saat melarikan diri dari Typhon. Mereka terikat tali pita sutra surgawi di Alrescha agar tidak terpisah, melambangkan kepekaan artistik tanpa batas, koneksi empati spiritual, dan imajinasi kreatif mendalam.",
    mythologyEn: "Pisces commemorates Aphrodite and Eros transformed into twin fish swimming through cosmic waters, tethered by a celestial ribbon at Alrescha so they never lose each other. It embodies boundless artistic imagination, empathetic resonance, and mysticism.",
    stars: [
      { x: 200, y: 220, r: 6, isMajor: true, name: "Alrescha", bayerDesignation: "α Piscium", spectralType: "A0p (Biner Simpul)", apparentMagnitude: 3.82, distanceLy: 139, meaningId: "Simpul tali pita sutra pengikat", meaningEn: "Celestial ribbon binding knot" },
      { x: 130, y: 180, r: 4, isMajor: false, name: "Linteum", bayerDesignation: "δ Piscium", spectralType: "K5III", apparentMagnitude: 4.44, distanceLy: 305, meaningId: "Tali pita ikan barat", meaningEn: "Western ribbon filament" },
      { x: 80, y: 120, r: 5, isMajor: false, name: "Fumalsamakah", bayerDesignation: "β Piscium", spectralType: "B6Ve", apparentMagnitude: 4.49, distanceLy: 490, meaningId: "Mulut ikan barat (Circlet)", meaningEn: "Mouth of western fish" },
      { x: 100, y: 80, r: 4.5, isMajor: false, name: "Gamma Psc", bayerDesignation: "γ Piscium", spectralType: "G7III", apparentMagnitude: 3.70, distanceLy: 131, meaningId: "Tubuh ikan barat", meaningEn: "Body of western fish" },
      { x: 270, y: 170, r: 4.5, isMajor: false, name: "Torcular", bayerDesignation: "ο Piscium", spectralType: "G8III", apparentMagnitude: 4.28, distanceLy: 280, meaningId: "Tali pita ikan utara", meaningEn: "Northern ribbon cord" },
      { x: 310, y: 100, r: 5, isMajor: false, name: "Kullat Nunu", bayerDesignation: "η Piscium", spectralType: "G7III (Paling Terang)", apparentMagnitude: 3.62, distanceLy: 294, meaningId: "Tubuh gemerlap ikan utara", meaningEn: "Northern fish body luminary" },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 4],
      [4, 5],
    ],
  },
};
