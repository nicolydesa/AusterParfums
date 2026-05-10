// Mock data for the fragrance discovery platform

export interface Perfume {
  id: string
  name: string
  brand: string
  brandSlug: string
  image: string
  rating: number
  reviewCount: number
  topNotes: string[]
  middleNotes: string[]
  baseNotes: string[]
  year: number
  gender: "men" | "women" | "unisex"
  concentration: string
  longevity: number
  sillage: number
  description: string
  accords: string[]
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  country: string
  founded: number
  description: string
  perfumeCount: number
  featured: boolean
}

export interface Note {
  id: string
  name: string
  slug: string
  category: "floral" | "amadeirado" | "citrico" | "oriental" | "fresco" | "especiado" | "frutado" | "verde" | "aquatico" | "gourmand"
  description: string
  perfumeCount: number
  image?: string
}

export interface Review {
  id: string
  perfumeId: string
  perfumeName: string
  perfumeBrand: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  content: string
  longevity: number
  sillage: number
  date: string
  likes: number
}

export interface ForumPost {
  id: string
  title: string
  author: string
  authorAvatar: string
  replies: number
  views: number
  lastActivity: string
  category: string
}

// Sample perfumes data
export const perfumes: Perfume[] = [
{
    id: "1",
    name: "Santal 33",
    brand: "Le Labo",
    brandSlug: "le-labo",
    image: "https://fimgs.net/mdimg/perfume/375x500.13007.jpg",
    rating: 4.6,
    reviewCount: 0,
    topNotes: ["Cardamomo", "Íris", "Violeta"],
    middleNotes: ["Sândalo", "Papiro", "Cedro"],
    baseNotes: ["Couro", "Âmbar", "Almíscar"],
    year: 2011,
    gender: "unisex",
    concentration: "Eau de Parfum",
    longevity: 8,
    sillage: 7,
    description: "Santal 33 é uma fragrância quente e viciante que funde o aspecto defumado do sândalo australiano com o frescor do cardamomo e da violeta. O rastro de couro especiado a torna inesquecível.",
    accords: ["amadeirado", "aromático", "couro", "especiado quente"]
  },
  {
    id: "2",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    brandSlug: "maison-francis-kurkdjian",
    image: "https://fimgs.net/mdimg/perfume/375x500.33519.jpg",
    rating: 4.8,
    reviewCount: 0,
    topNotes: ["Jasmim", "Açafrão"],
    middleNotes: ["Madeira de Âmbar", "Âmbar Cinzento"],
    baseNotes: ["Resina de Abeto", "Cedro"],
    year: 2015,
    gender: "unisex",
    concentration: "Eau de Parfum",
    longevity: 9,
    sillage: 9,
    description: "Um aroma ambarado e amadeirado, luminoso e sofisticado. Baccarat Rouge 540 é uma alquimia poética, uma série de contrastes onde o âmbar cinzento envolve o jasmim em um frescor mineral sutil.",
    accords: ["âmbar", "amadeirado", "doce", "quente"]
  },
  {
    id: "3",
    name: "Bleu de Chanel",
    brand: "Chanel",
    brandSlug: "chanel",
    image: "https://fimgs.net/mdimg/perfume/375x500.25967.jpg",
    rating: 4.5,
    reviewCount: 0,
    topNotes: ["Toranja", "Limão", "Hortelã"],
    middleNotes: ["Gengibre", "Noz-moscada", "Jasmim"],
    baseNotes: ["Incenso", "Vetiver", "Cedro", "Sândalo"],
    year: 2010,
    gender: "men",
    concentration: "Eau de Parfum",
    longevity: 8,
    sillage: 7,
    description: "Bleu de Chanel é uma fragrância audaciosa e determinada. Uma declaração de espírito e estilo inabaláveis. As notas cítricas frescas e o incenso defumado harmonizam-se perfeitamente.",
    accords: ["amadeirado", "aromático", "especiado fresco", "cítrico"]
  },
  {
    id: "4",
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    brandSlug: "yves-saint-laurent",
    image: "https://fimgs.net/mdimg/perfume-thumbs/375x500.25324.jpg",
    rating: 4.4,
    reviewCount: 0,
    topNotes: ["Pimenta Rosa", "Flor de Laranjeira", "Pera"],
    middleNotes: ["Café", "Jasmim", "Amêndoa Amarga"],
    baseNotes: ["Baunilha", "Patchouli", "Cedro"],
    year: 2014,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 7,
    sillage: 6,
    description: "Black Opium é um floral gourmand viciante. A escuridão do café e a sensualidade da baunilha repousam sobre uma nota vibrante de jasmim branco.",
    accords: ["doce", "especiado quente", "café", "baunilha"]
  },
  {
    id: "5",
    name: "Aventus",
    brand: "Creed",
    brandSlug: "creed",
    image: "https://fimgs.net/mdimg/perfume/375x500.9828.jpg",
    rating: 4.7,
    reviewCount: 0,
    topNotes: ["Abacaxi", "Bergamota", "Cassis", "Maçã"],
    middleNotes: ["Bétula", "Patchouli", "Jasmim Marroquino", "Rosa"],
    baseNotes: ["Almíscar", "Musgo de Carvalho", "Âmbar Cinzento", "Baunilha"],
    year: 2010,
    gender: "men",
    concentration: "Eau de Parfum",
    longevity: 9,
    sillage: 8,
    description: "Aventus celebra força, poder e sucesso. Uma fragrância amadeirada frutal que equilibra a energia do abacaxi com a nobreza da bétula defumada.",
    accords: ["frutado", "amadeirado", "especiado fresco", "defumado"]
  },
  {
    id: "6",
    name: "Oud Wood",
    brand: "Tom Ford",
    brandSlug: "tom-ford",
    image: "https://fimgs.net/mdimg/perfume/375x500.1826.jpg",
    rating: 4.5,
    reviewCount: 0,
    topNotes: ["Oud", "Pau-Rosa", "Cardamomo"],
    middleNotes: ["Sândalo", "Vetiver"],
    baseNotes: ["Fava Tonka", "Âmbar"],
    year: 2007,
    gender: "unisex",
    concentration: "Eau de Parfum",
    longevity: 8,
    sillage: 7,
    description: "Oud Wood funde o exótico e raro oud com sândalo e vetiver, finalizado com fava tonka e âmbar. Um oriental quente e sofisticado.",
    accords: ["oud", "amadeirado", "especiado quente", "âmbar"]
  },
  {
    id: "7",
    name: "La Vie Est Belle",
    brand: "Lancome",
    brandSlug: "lancome",
    image: "https://fimgs.net/mdimg/perfume-thumbs/375x500.14982.jpg",
    rating: 4.3,
    reviewCount: 0,
    topNotes: ["Cassis", "Pera"],
    middleNotes: ["Íris", "Jasmim", "Flor de Laranjeira"],
    baseNotes: ["Pralinê", "Baunilha", "Patchouli", "Fava Tonka"],
    year: 2012,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 7,
    sillage: 6,
    description: "La Vie Est Belle é um floral gourmand que transmite o sabor da felicidade. A composição de íris-gourmand é luxuosa e cintilante.",
    accords: ["doce", "gourmand", "floral", "quente"]
  },
  {
    id: "8",
    name: "Acqua di Gio Profumo",
    brand: "Giorgio Armani",
    brandSlug: "giorgio-armani",
    image: "https://fimgs.net/mdimg/perfume/375x500.29727.jpg",
    rating: 4.6,
    reviewCount: 0,
    topNotes: ["Bergamota", "Notas Oceânicas"],
    middleNotes: ["Gerânio", "Sálvia", "Alecrim"],
    baseNotes: ["Âmbar", "Patchouli", "Incenso"],
    year: 2015,
    gender: "men",
    concentration: "Eau de Parfum",
    longevity: 8,
    sillage: 7,
    description: "Acqua di Gio Profumo é uma fragrância aromática aquática que evoca uma masculinidade fresca. Combina notas marinhas e amadeiradas com incenso e patchouli.",
    accords: ["aquático", "aromático", "amadeirado", "fresco"]
  },
  {
    id: "9",
    name: "Portrait of a Lady",
    brand: "Frederic Malle",
    brandSlug: "frederic-malle",
    image: "https://fimgs.net/mdimg/perfume-thumbs/375x500.10464.jpg",
    rating: 4.7,
    reviewCount: 0,
    topNotes: ["Rosa Turca", "Framboesa", "Cassis"],
    middleNotes: ["Cravo-da-Índia", "Canela", "Sândalo"],
    baseNotes: ["Almíscar Branco", "Olíbano", "Âmbar", "Benzoíno"],
    year: 2010,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 9,
    sillage: 8,
    description: "Portrait of a Lady, de Dominique Ropion, é uma fragrância de rosa sombria. Uma dose massiva de rosa turca encontra o sândalo e as especiarias de forma sedutora.",
    accords: ["rosa", "oud", "especiado", "amadeirado"]
  },
  {
    id: "10",
    name: "Molecule 01",
    brand: "Escentric Molecules",
    brandSlug: "escentric-molecules",
    image: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.845.avif?t=1777715458",
    rating: 4.2,
    reviewCount: 0,
    topNotes: ["Iso E Super"],
    middleNotes: [],
    baseNotes: [],
    year: 2006,
    gender: "unisex",
    concentration: "Eau de Toilette",
    longevity: 6,
    sillage: 5,
    description: "Molecule 01 é uma fragrância de nota única composta inteiramente por Iso E Super, uma molécula sintética com um aroma amadeirado, aveludado e levemente cedrado.",
    accords: ["amadeirado", "sintético", "almiscarado", "atalcado"]
  },
  {
    id: "11",
    name: "Sauvage",
    brand: "Dior",
    brandSlug: "dior",
    image: "https://fimgs.net/mdimg/perfume/375x500.31861.jpg",
    rating: 4.5,
    reviewCount: 0,
    topNotes: ["Bergamota da Calábria", "Pimenta"],
    middleNotes: ["Pimenta Sichuan", "Lavanda", "Pimenta Rosa", "Gerânio"],
    baseNotes: ["Ambroxan", "Cedro", "Ládano"],
    year: 2015,
    gender: "men",
    concentration: "Eau de Toilette",
    longevity: 8,
    sillage: 8,
    description: "Sauvage é uma composição radicalmente fresca, crua e nobre ao mesmo tempo. Uma explosão poderosamente fresca de bergamota e notas ambaradas.",
    accords: ["aromático", "especiado fresco", "amadeirado", "âmbar"]
  },
  {
    id: "12",
    name: "Good Girl",
    brand: "Carolina Herrera",
    brandSlug: "carolina-herrera",
    image: "https://fimgs.net/mdimg/perfume/375x500.36497.jpg",
    rating: 4.3,
    reviewCount: 0,
    topNotes: ["Amêndoa", "Café", "Bergamota", "Limão"],
    middleNotes: ["Tuberosa", "Jasmim Sambac", "Rosa"],
    baseNotes: ["Fava Tonka", "Cacau", "Sândalo", "Madeira de Cashmere"],
    year: 2016,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 7,
    sillage: 7,
    description: "Good Girl representa a dualidade da mulher moderna: luz e sombra, bom e mau. Um floral oriental sensual e audacioso.",
    accords: ["doce", "floral", "atalcado", "quente"]
  },
  {
    id: "13",
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    brandSlug: "tom-ford",
    image: "https://fimgs.net/mdimg/perfume/375x500.1825.jpg",
    rating: 4.6,
    reviewCount: 0,
    topNotes: ["Folha de Tabaco", "Notas Especiadas"],
    middleNotes: ["Baunilha", "Cacau", "Fava Tonka", "Flor de Tabaco"],
    baseNotes: ["Frutas Secas", "Notas Amadeiradas"],
    year: 2007,
    gender: "unisex",
    concentration: "Eau de Parfum",
    longevity: 9,
    sillage: 8,
    description: "Tobacco Vanille é uma fragrância opulenta, quente e icônica que mistura tabaco rico com baunilha doce, fava tonka e frutas secas.",
    accords: ["doce", "especiado quente", "tabaco", "baunilha"]
  },
  {
    id: "14",
    name: "Lost Cherry",
    brand: "Tom Ford",
    brandSlug: "tom-ford",
    image: "https://fimgs.net/mdimg/perfume/375x500.51411.jpg",
    rating: 4.4,
    reviewCount: 0,
    topNotes: ["Cereja Preta", "Licor de Cereja", "Amêndoa Amarga"],
    middleNotes: ["Xarope de Griotte", "Rosa Turca", "Jasmim Sambac"],
    baseNotes: ["Bálsamo do Peru", "Fava Tonka Torrada", "Sândalo", "Vetiver", "Cedro"],
    year: 2018,
    gender: "unisex",
    concentration: "Eau de Parfum",
    longevity: 8,
    sillage: 7,
    description: "Lost Cherry é um choque inebriante de cereja preta decadente com florais exóticos e madeiras ricas e sensuais.",
    accords: ["doce", "cereja", "especiado quente", "frutado"]
  },
  {
    id: "15",
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    brandSlug: "dolce-gabbana",
    image: "https://fimgs.net/mdimg/perfume/375x500.485.jpg",
    rating: 4.2,
    reviewCount: 0,
    topNotes: ["Limão Siciliano", "Maçã", "Cedro", "Bluebell"],
    middleNotes: ["Bambu", "Jasmim", "Rosa Branca"],
    baseNotes: ["Cedro", "Almíscar", "Âmbar"],
    year: 2001,
    gender: "women",
    concentration: "Eau de Toilette",
    longevity: 5,
    sillage: 5,
    description: "Light Blue é o aroma de um verão mediterrâneo sensual, capturando o espírito de Capri com cítricos frescos e maçã crocante.",
    accords: ["cítrico", "floral branco", "fresco", "frutado"]
  },
  {
    id: "16",
    name: "Versace Eros",
    brand: "Versace",
    brandSlug: "versace",
    image: "https://fimgs.net/mdimg/perfume/375x500.16657.jpg",
    rating: 4.4,
    reviewCount: 0,
    topNotes: ["Hortelã", "Maçã Verde", "Limão"],
    middleNotes: ["Fava Tonka", "Gerânio", "Ambroxan"],
    baseNotes: ["Baunilha", "Vetiver", "Musgo de Carvalho", "Cedro"],
    year: 2012,
    gender: "men",
    concentration: "Eau de Toilette",
    longevity: 7,
    sillage: 8,
    description: "Versace Eros é uma fragrância para o homem forte e apaixonado, mestre de si mesmo. Hortelã fresca com fava tonka e baunilha.",
    accords: ["doce", "fresco", "aromático", "âmbar"]
  },
  {
    id: "17",
    name: "Miss Dior",
    brand: "Dior",
    brandSlug: "dior",
    image: "https://fimgs.net/mdimg/perfume/o.68905.jpg",
    rating: 4.3,
    reviewCount: 0,
    topNotes: ["Mandarina Italiana", "Rosa"],
    middleNotes: ["Rosa de Grasse", "Pau-Rosa"],
    baseNotes: ["Almíscar", "Patchouli"],
    year: 2012,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 7,
    sillage: 6,
    description: "Miss Dior é uma fragrância floral fresca com espírito couture. Uma essência vibrante e cintilante de rosa de Grasse para a feminilidade moderna.",
    accords: ["floral", "cítrico", "rosa", "almiscarado"]
  },
  {
    id: "18",
    name: "1 Million",
    brand: "Paco Rabanne",
    brandSlug: "paco-rabanne",
    image: "https://fimgs.net/mdimg/perfume/375x500.3747.jpg",
    rating: 4.2,
    reviewCount: 0,
    topNotes: ["Toranja", "Hortelã", "Mandarina Sanguínea"],
    middleNotes: ["Rosa", "Canela", "Notas Especiadas"],
    baseNotes: ["Couro", "Notas Amadeiradas", "Âmbar", "Patchouli"],
    year: 2008,
    gender: "men",
    concentration: "Eau de Toilette",
    longevity: 7,
    sillage: 7,
    description: "1 Million é uma fragrância fresca e de couro especiado para o homem sedutor e confiante. Audacioso, extravagante e inconfundivelmente dourado.",
    accords: ["especiado", "couro", "fresco", "âmbar"]
  },
  {
    id: "19",
    name: "Coco Mademoiselle",
    brand: "Chanel",
    brandSlug: "chanel",
    image: "https://fimgs.net/mdimg/perfume/375x500.611.jpg",
    rating: 4.5,
    reviewCount: 0,
    topNotes: ["Laranja", "Mandarina", "Bergamota"],
    middleNotes: ["Rosa", "Jasmim", "Lichia"],
    baseNotes: ["Almíscar", "Baunilha", "Vetiver", "Fava Tonka", "Patchouli", "Opoponax", "Almíscar Branco"],
    year: 2001,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 8,
    sillage: 7,
    description: "Coco Mademoiselle é uma fragrância irresistível e irreprimível. Um oriental fresco e revigorante com rosa e jasmim.",
    accords: ["cítrico", "floral", "fresco", "atalcado"]
  },
  {
    id: "20",
    name: "Si",
    brand: "Giorgio Armani",
    brandSlug: "giorgio-armani",
    image: "https://fimgs.net/mdimg/perfume/375x500.18453.jpg",
    rating: 4.4,
    reviewCount: 0,
    topNotes: ["Cassis"],
    middleNotes: ["Rosa de Maio", "Frésia"],
    baseNotes: ["Baunilha", "Patchouli", "Notas Amadeiradas", "Ambroxan"],
    year: 2013,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 7,
    sillage: 6,
    description: "Si é uma homenagem à feminilidade moderna. Uma combinação irresistível de graça, força e espírito independente, onde a doçura do cassis encontra a elegância da rosa.",
    accords: ["frutado", "doce", "floral", "amadeirado"]
  },
  {
    id: "21",
    name: "Sauvage Elixir",
    brand: "Dior",
    brandSlug: "dior",
    image: "https://fimgs.net/mdimg/perfume/o.68415.jpg",
    rating: 4.8,
    reviewCount: 0,
    topNotes: ["Canela", "Noz-moscada", "Cardamomo", "Toranja"],
    middleNotes: ["Lavanda"],
    baseNotes: ["Alcaçuz", "Sândalo", "Âmbar", "Patchouli", "Vetiver"],
    year: 2021,
    gender: "men",
    concentration: "Parfum",
    longevity: 10,
    sillage: 9,
    description: "Um licor inesperado e ultra-concentrado. Sauvage Elixir leva o frescor icônico de Sauvage e o mergulha em especiarias ricas e um coração de lavanda customizada.",
    accords: ["especiado quente", "aromático", "amadeirado", "lavanda"]
  },
  {
    id: "22",
    name: "Delina",
    brand: "Parfums de Marly",
    brandSlug: "parfums-de-marly",
    image: "https://fimgs.net/mdimg/perfume/375x500.43871.jpg",
    rating: 4.6,
    reviewCount: 0,
    topNotes: ["Lichia", "Ruibarbo", "Bergamota", "Noz-moscada"],
    middleNotes: ["Rosa Turca", "Peônia", "Petalia", "Baunilha"],
    baseNotes: ["Cashmeran", "Incenso", "Cedro", "Vetiver"],
    year: 2017,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 9,
    sillage: 8,
    description: "Delina é um buquê floral esculpido em torno da rosa turca. Uma fragrância que brilha com a doçura da lichia e o frescor vibrante do ruibarbo.",
    accords: ["rosa", "floral", "frutado", "fresco"]
  },
  {
    id: "23",
    name: "Jazz Club",
    brand: "Maison Margiela",
    brandSlug: "maison-margiela",
    image: "https://fimgs.net/mdimg/perfume/375x500.20541.jpg",
    rating: 4.5,
    reviewCount: 0,
    topNotes: ["Pimenta Rosa", "Néroli", "Limão"],
    middleNotes: ["Rum", "Sálvia Esclareia", "Óleo de Vetiver de Java"],
    baseNotes: ["Folha de Tabaco", "Fava de Baunilha", "Styrax"],
    year: 2013,
    gender: "unisex",
    concentration: "Eau de Toilette",
    longevity: 7,
    sillage: 6,
    description: "Jazz Club imortaliza a atmosfera de um clube de jazz de Nova York. Notas ricas de rum e tabaco criam um ambiente caloroso, elegante e levemente defumado.",
    accords: ["tabaco", "rum", "doce", "amadeirado"]
  },
  {
    id: "24",
    name: "Bleu de Chanel Parfum",
    brand: "Chanel",
    brandSlug: "chanel",
    image: "https://fimgs.net/mdimg/perfume/375x500.49912.jpg",
    rating: 4.7,
    reviewCount: 0,
    topNotes: ["Raspas de Limão", "Bergamota", "Hortelã", "Artemísia"],
    middleNotes: ["Lavanda", "Gerânio", "Notas Verdes", "Abacaxi"],
    baseNotes: ["Sândalo", "Cedro", "Madeira de Âmbar", "Fava Tonka"],
    year: 2018,
    gender: "men",
    concentration: "Parfum",
    longevity: 9,
    sillage: 7,
    description: "A versão mais intensa e densa de Bleu de Chanel. Um perfume amadeirado aromático que enfatiza a sofisticação do sândalo com um rastro magnético.",
    accords: ["amadeirado", "cítrico", "aromático", "âmbar"]
  },
  {
    id: "25",
    name: "La Nuit de l'Homme",
    brand: "Yves Saint Laurent",
    brandSlug: "yves-saint-laurent",
    image: "https://fimgs.net/mdimg/perfume/375x500.5521.jpg",
    rating: 4.5,
    reviewCount: 0,
    topNotes: ["Cardamomo"],
    middleNotes: ["Lavanda", "Cedro", "Bergamota"],
    baseNotes: ["Alcaravia", "Vetiver"],
    year: 2009,
    gender: "men",
    concentration: "Eau de Toilette",
    longevity: 6,
    sillage: 6,
    description: "Um jogo de contrastes e sedução. La Nuit de l'Homme equilibra o calor do cardamomo com o frescor da lavanda, criando um rastro magnético e sofisticado para a noite.",
    accords: ["especiado quente", "aromático", "amadeirado", "fresco"]
  },
  {
    id: "26",
    name: "Libre",
    brand: "Yves Saint Laurent",
    brandSlug: "yves-saint-laurent",
    image: "https://fimgs.net/mdimg/perfume/o.65936.jpg",
    rating: 4.4,
    reviewCount: 0,
    topNotes: ["Lavanda", "Mandarina", "Cassis", "Petitgrain"],
    middleNotes: ["Lavanda", "Flor de Laranjeira", "Jasmim"],
    baseNotes: ["Baunilha", "Almíscar", "Cedro", "Âmbar Cinzento"],
    year: 2019,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 8,
    sillage: 7,
    description: "A fragrância da liberdade. Um perfume floral grandioso que combina a sensualidade da flor de laranjeira com a audácia da lavanda francesa.",
    accords: ["floral", "citrico", "lavanda", "baunilha"]
  },
  {
    id: "27",
    name: "Light Blue Eau Intense",
    brand: "Dolce & Gabbana",
    brandSlug: "dolce-gabbana",
    image: "https://fimgs.net/mdimg/perfume/375x500.44034.jpg",
    rating: 4.3,
    reviewCount: 0,
    topNotes: ["Limão Siciliano", "Maçã Granny Smith"],
    middleNotes: ["Calêndula", "Jasmim"],
    baseNotes: ["Madeira de Âmbar", "Almíscar"],
    year: 2017,
    gender: "women",
    concentration: "Eau de Parfum",
    longevity: 7,
    sillage: 7,
    description: "Uma aura de frescor profundo. A versão Intense do clássico Light Blue reduz as notas florais para destacar os cítricos e a vibração oceânica das madeiras ambaradas.",
    accords: ["citrico", "fresco", "frutado", "almiscarado"]
  },
  {
    id: "28",
    name: "The One for Men",
    brand: "Dolce & Gabbana",
    brandSlug: "dolce-gabbana",
    image: "https://fimgs.net/mdimg/perfume-thumbs/375x500.31909.jpg",
    rating: 4.6,
    reviewCount: 0,
    topNotes: ["Toranja", "Coentro", "Manjericão"],
    middleNotes: ["Gengibre", "Cardamomo", "Flor de Laranjeira"],
    baseNotes: ["Âmbar", "Tabaco", "Cedro"],
    year: 2015,
    gender: "men",
    concentration: "Eau de Parfum",
    longevity: 7,
    sillage: 6,
    description: "Elegante e sensual, The One for Men é um clássico moderno. Uma fragrância oriental especiada que combina notas de tabaco e âmbar refinado.",
    accords: ["âmbar", "especiado quente", "tabaco", "citrico"]
  },
  {
    id: "29",
    name: "Herod",
    brand: "Parfums de Marly",
    brandSlug: "parfums-de-marly",
    image: "https://fimgs.net/mdimg/perfume/o.16939.jpg",
    rating: 4.7,
    reviewCount: 0,
    topNotes: ["Canela", "Pimenta"],
    middleNotes: ["Folha de Tabaco", "Incenso", "Osmanto", "Ládano"],
    baseNotes: ["Baunilha", "Iso E Super", "Almíscar", "Cedro", "Vetiver"],
    year: 2012,
    gender: "men",
    concentration: "Eau de Parfum",
    longevity: 8,
    sillage: 7,
    description: "Uma ode à baunilha e ao tabaco. Herod exala uma sofisticação esfumaçada e doce, evocando o luxo de um cavalheiro contemporâneo.",
    accords: ["tabaco", "baunilha", "especiado quente", "amadeirado"]
  }
]
// Sample brands data
export const brands: Brand[] = [
  {
    id: "1",
    name: "Chanel",
    slug: "chanel",
    logo: "https://fimgs.net/mdimg/dizajneri/o.30.jpg",
    country: "França",
    founded: 1910,
    description: "Chanel é uma casa de moda de luxo francesa focada em alta costura feminina, pronto-a-vestir, artigos de luxo e acessórios.",
    perfumeCount: 3,
    featured: true
  },
  {
    id: "2",
    name: "Dior",
    slug: "dior",
    logo: "https://fimgs.net/mdimg/dizajneri/o.160.jpg",
    country: "França",
    founded: 1946,
    description: "Dior é uma casa de moda de luxo francesa controlada e presidida pelo empresário francês Bernard Arnault, que também chefia a LVMH.",
    perfumeCount: 3,
    featured: true
  },
  {
    id: "3",
    name: "Tom Ford",
    slug: "tom-ford",
    logo: "https://fimgs.net/mdimg/dizajneri/o.139.jpg",
    country: "Estados Unidos",
    founded: 2006,
    description: "Tom Ford Beauty é conhecida por seus cosméticos e fragrâncias de luxo. A coleção Private Blend apresenta alguns dos aromas mais cobiçados do mundo.",
    perfumeCount: 3,
    featured: true
  },
  {
    id: "4",
    name: "Creed",
    slug: "creed",
    logo: "https://fimgs.net/mdimg/dizajneri/o.50.jpg",
    country: "França",
    founded: 1760,
    description: "Creed é uma casa de fragrâncias baseada na França que serviu a diversas casas reais e celebridades ao longo da história.",
    perfumeCount: 1,
    featured: true
  },
  {
    id: "5",
    name: "Le Labo",
    slug: "le-labo",
    logo: "https://fimgs.net/mdimg/dizajneri/o.403.jpg",
    country: "Estados Unidos",
    founded: 2006,
    description: "Le Labo é conhecida por seus perfumes misturados à mão com rotulagem minimalista. Cada fragrância é nomeada de acordo com seu ingrediente principal.",
    perfumeCount: 1,
    featured: true
  },
  {
    id: "6",
    name: "Maison Francis Kurkdjian",
    slug: "maison-francis-kurkdjian",
    logo: "https://fimgs.net/mdimg/dizajneri/o.770.jpg",
    country: "França",
    founded: 2009,
    description: "Maison Francis Kurkdjian é uma casa de perfumes francesa fundada pelo mestre perfumista Francis Kurkdjian e por Marc Chaya.",
    perfumeCount: 1,
    featured: true
  },
  {
    id: "7",
    name: "Giorgio Armani",
    slug: "giorgio-armani",
    logo: "https://fimgs.net/mdimg/dizajneri/o.65.jpg",
    country: "Itália",
    founded: 1975,
    description: "Giorgio Armani Beauty produz cosméticos e fragrâncias de luxo, incluindo a icônica linha Acqua di Gio.",
    perfumeCount: 2,
    featured: true
  },
  {
    id: "8",
    name: "Yves Saint Laurent",
    slug: "yves-saint-laurent",
    logo: "https://fimgs.net/mdimg/dizajneri/o.99.jpg",
    country: "França",
    founded: 1961,
    description: "Yves Saint Laurent Beauté cria fragrâncias ousadas e icônicas que incorporam o estilo parisiense e a herança da alta costura.",
    perfumeCount: 3,
    featured: true
  },
  {
    id: "9",
    name: "Frederic Malle",
    slug: "frederic-malle",
    logo: "https://fimgs.net/mdimg/dizajneri/o.140.jpg",
    country: "França",
    founded: 2000,
    description: "Editions de Parfums Frederic Malle é uma casa de perfumes de nicho que concede liberdade criativa total a perfumistas de renome mundial.",
    perfumeCount: 1,
    featured: false
  },
  {
    id: "10",
    name: "Escentric Molecules",
    slug: "escentric-molecules",
    logo: "https://fimgs.net/mdimg/dizajneri/o.110.jpg",
    country: "Alemanha",
    founded: 2006,
    description: "Escentric Molecules cria fragrâncias inovadoras que celebram a beleza de moléculas únicas e ingredientes sintéticos.",
    perfumeCount: 1,
    featured: false
  },
  {
    id: "11",
    name: "Lancôme",
    slug: "lancome",
    logo: "https://fimgs.net/mdimg/dizajneri/o.80.jpg",
    country: "França",
    founded: 1935,
    description: "Lancôme é uma casa francesa de perfumes e cosméticos de luxo que distribui produtos internacionalmente.",
    perfumeCount: 1,
    featured: true
  },
  {
    id: "12",
    name: "Carolina Herrera",
    slug: "carolina-herrera",
    logo: "https://aperfumistamococa.com.br/cdn/shop/collections/Carolina_Herrera_d9f5d192-2ef2-466e-a5b2-babdcf6c2550.png?v=1746325594",
    country: "Venezuela",
    founded: 1981,
    description: "Carolina Herrera é uma casa de moda e fragrâncias de luxo conhecida por seus designs elegantes e sofisticados e aromas icônicos.",
    perfumeCount: 1,
    featured: false
  },
  {
    id: "13",
    name: "Parfums de Marly",
    slug: "parfums-de-marly",
    logo: "https://fimgs.net/mdimg/dizajneri/o.1188.jpg",
    country: "França",
    founded: 2009,
    description: "Parfums de Marly revive o espírito das festividades suntuosas realizadas no Château de Marly, unindo a elegância do século XVIII ao estilo moderno.",
    perfumeCount: 2,
    featured: true
  },
  {
    id: "14",
    name: "Maison Margiela",
    slug: "maison-margiela",
    logo: "https://fimgs.net/mdimg/dizajneri/o.845.jpg",
    country: "França",
    founded: 1988,
    description: "Conhecida por sua coleção 'Replica', a Maison Margiela cria aromas que evocam memórias universais e momentos específicos no tempo.",
    perfumeCount: 1,
    featured: false
  },
  {
    id: "15",
    name: "Dolce & Gabbana",
    slug: "dolce-gabbana",
    logo: "https://fimgs.net/mdimg/dizajneri/o.56.jpg",
    country: "Itália",
    founded: 1985,
    description: "As fragrâncias Dolce & Gabbana incorporam o glamour mediterrâneo e a tradição italiana, variando de aquáticos frescos a orientais profundos.",
    perfumeCount: 3,
    featured: true
  },
  {
    id: "16",
    name: "Versace",
    slug: "versace",
    logo: "https://fimgs.net/mdimg/dizajneri/o.97.jpg",
    country: "Itália",
    founded: 1978,
    description: "Versace é a definição de luxo audacioso. Suas fragrâncias são projetadas para aqueles que desejam expressar sua força e sensualidade.",
    perfumeCount: 1,
    featured: false
  },
  {
    id: "17",
    name: "Paco Rabanne",
    slug: "paco-rabanne",
    logo: "https://fimgs.net/mdimg/dizajneri/o.88.jpg",
    country: "Espanha",
    founded: 1966,
    description: "Paco Rabanne é pioneira na moda de vanguarda e em aromas disruptivos, criando clássicos modernos que definem a sedução contemporânea.",
    perfumeCount: 1,
    featured: false
  }
]

// Sample notes data
export const notes: Note[] = [
  // Floral Notes
  { id: "1", name: "Rosa", slug: "rose", category: "floral", description: "A essência atemporal da perfumaria: notas românticas, frescas e delicadamente adocicadas.", perfumeCount: 12345 },
  { id: "2", name: "Jasmim", slug: "jasmine", category: "floral", description: "Floral branco opulento, unindo doçura sensual a nuances narcóticas e profundas.", perfumeCount: 7234 },
  { id: "3", name: "Íris", slug: "iris", category: "floral", description: "A sofisticação atalcada: facetas de violeta com nuances terrosas e elegantes.", perfumeCount: 3456 },
  { id: "4", name: "Tuberosa", slug: "tuberose", category: "floral", description: "Floral branco intenso e cremoso, com texturas amanteigadas e presença magnética.", perfumeCount: 2345 },
  { id: "5", name: "Flor de Laranjeira", slug: "orange-blossom", category: "floral", description: "Luminosidade cítrica e floral com facetas verdes e toques de mel silvestre.", perfumeCount: 4567 },
  { id: "25", name: "Violeta", slug: "violet", category: "floral", description: "Floral delicado e empoeirado, com subtons verdes e uma doçura sutil e nostálgica.", perfumeCount: 3892 },
  { id: "26", name: "Lírio do Vale", slug: "lily-of-the-valley", category: "floral", description: "Frescor primaveril: um floral verde e orvalhado que evoca pureza e renovação.", perfumeCount: 2678 },
  { id: "27", name: "Peônia", slug: "peony", category: "floral", description: "Floral suave e romântico, com nuances rosadas e toques levemente frutados.", perfumeCount: 3123 },
  { id: "28", name: "Magnólia", slug: "magnolia", category: "floral", description: "Floral branco cremoso e cítrico, com uma efervescência que remete ao champagne.", perfumeCount: 2456 },
  { id: "29", name: "Ylang-Ylang", slug: "ylang-ylang", category: "floral", description: "Exotismo solar: floral doce com facetas de banana e nuances levemente medicinais.", perfumeCount: 4123 },
  { id: "30", name: "Gardênia", slug: "gardenia", category: "floral", description: "Floral branco rico e aveludado, com subtons sutis de coco e nuances terrosas.", perfumeCount: 1987 },
  { id: "31", name: "Frésia", slug: "freesia", category: "floral", description: "Floral leve e refrescante, com características picantes e qualidades levemente frutadas.", perfumeCount: 1654 },

  // Notas Amadeiradas
  { id: "6", name: "Sândalo", slug: "sandalwood", category: "amadeirado", description: "Madeira cremosa e envolvente, com subtons leitosos e um calor reconfortante.", perfumeCount: 6789 },
  { id: "7", name: "Cedro", slug: "cedar", category: "amadeirado", description: "Nota amadeirada seca e estruturada, com facetas aromáticas que remetem ao frescor resinoso.", perfumeCount: 8901 },
  { id: "8", name: "Oud", slug: "oud", category: "amadeirado", description: "Rico, complexo e ancestral: uma madeira resinosa com facetas defumadas e opulência animalística.", perfumeCount: 4567 },
  { id: "9", name: "Vetiver", slug: "vetiver", category: "amadeirado", description: "Raiz terrosa e vibrante, apresentando facetas verdes, levemente defumadas e um frescor rústico.", perfumeCount: 5678 },
  { id: "10", name: "Patchouli", slug: "patchouli", category: "amadeirado", description: "Profundo e terroso, unindo doçura sombria a nuances picantes e amadeiradas.", perfumeCount: 7890 },
  { id: "32", name: "Jacarandá Guaiaco", slug: "guaiac-wood", category: "amadeirado", description: "Madeira densa e defumada, com nuances de couro e facetas que remetem ao chá preto.", perfumeCount: 3456 },
  { id: "33", name: "Bétula", slug: "birch", category: "amadeirado", description: "Caráter rústico e defumado, evocando o aroma de couro curtido e notas medicinais.", perfumeCount: 2345 },
  { id: "34", name: "Cipreste", slug: "cypress", category: "amadeirado", description: "Madeira perene e refrescante, com qualidades resinosas e um toque de brisa silvestre.", perfumeCount: 2890 },
  { id: "35", name: "Ébano", slug: "ebony", category: "amadeirado", description: "Madeira escura e majestosa, com facetas misteriosas e uma densidade levemente adocicada.", perfumeCount: 1234 },
  { id: "36", name: "Pau-Rosa", slug: "rosewood", category: "amadeirado", description: "Nobreza amadeirada com alma floral: doce, rosado e levemente picante.", perfumeCount: 2567 },
  { id: "37", name: "Teca", slug: "teak", category: "amadeirado", description: "Madeira rica e oleosa, apresentando textura de couro e nuances defumadas distintas.", perfumeCount: 1876 },
  { id: "38", name: "Pinho", slug: "pine", category: "amadeirado", description: "Frescor resinoso e balsâmico, evocando a limpeza e a vitalidade das florestas de altitude.", perfumeCount: 3234 },

  // Notas Cítricas
  { id: "11", name: "Bergamota", slug: "bergamot", category: "citrico", description: "Cítrico fresco e brilhante, com subtons florais delicados e nuances levemente amargas.", perfumeCount: 12345 },
  { id: "12", name: "Limão", slug: "lemon", category: "citrico", description: "Vibrante e limpo: um cítrico revigorante com facetas verdes e efervescentes.", perfumeCount: 9876 },
  { id: "13", name: "Toranja", slug: "grapefruit", category: "citrico", description: "Cítrico tônico e rascante, unindo frescor suculento a qualidades amargas sofisticadas.", perfumeCount: 5432 },
  { id: "14", name: "Laranja", slug: "orange", category: "citrico", description: "Cítrico doce e solar, evocando uma sensação de energia e otimismo radiante.", perfumeCount: 7654 },
  { id: "39", name: "Mandarina", slug: "mandarin", category: "citrico", description: "Doçura cítrica e picante, com qualidades ricas e subtons levemente florais.", perfumeCount: 4567 },
  { id: "40", name: "Lima", slug: "lime", category: "citrico", description: "Cítrico cortante e energético, com notas verdes e um caráter levemente amargo.", perfumeCount: 3987 },
  { id: "41", name: "Yuzu", slug: "yuzu", category: "citrico", description: "Cítrico japonês raro: uma fusão entre toranja e mandarina com toques florais.", perfumeCount: 2345 },
  { id: "42", name: "Pomelo", slug: "pomelo", category: "citrico", description: "Cítrico amplo e suave, equilibrando uma amargura delicada com doçura de mel.", perfumeCount: 1234 },
  { id: "43", name: "Néroli", slug: "neroli", category: "citrico", description: "A essência da laranjeira amarga: floral verde com notas meladas e refrescantes.", perfumeCount: 5678 },
  { id: "44", name: "Petitgrain", slug: "petitgrain", category: "citrico", description: "Cítrico verde e amadeirado extraído das folhas da laranjeira, com frescor amargo.", perfumeCount: 3456 },

  // Notas Orientais
  { id: "15", name: "Baunilha", slug: "vanilla", category: "oriental", description: "Cremosa, doce e envolvente, trazendo um conforto gourmand e sofisticado.", perfumeCount: 11234 },
  { id: "16", name: "Âmbar", slug: "amber", category: "oriental", description: "Resinoso e quente: uma nota acolhedora com qualidades ricas e levemente doces.", perfumeCount: 9876 },
  { id: "17", name: "Almíscar", slug: "musk", category: "oriental", description: "Sensual e sutil, evocando a textura da pele com facetas atalcadas e quentes.", perfumeCount: 14567 },
  { id: "18", name: "Fava Tonka", slug: "tonka-bean", category: "oriental", description: "Doce e especiada, unindo facetas de baunilha e amêndoa com calor oriental.", perfumeCount: 6543 },
  { id: "45", name: "Benzoíno", slug: "benzoin", category: "oriental", description: "Resina balsâmica doce com qualidades que remetem à baunilha e canela.", perfumeCount: 4567 },
  { id: "46", name: "Ládano", slug: "labdanum", category: "oriental", description: "Resina rica com textura de couro e subtons ambarados profundamente animalescos.", perfumeCount: 3876 },
  { id: "47", name: "Incenso", slug: "incense", category: "oriental", description: "Resina defumada e espiritual, com qualidades amadeiradas e mistério profundo.", perfumeCount: 5234 },
  { id: "48", name: "Mirra", slug: "myrrh", category: "oriental", description: "Balsâmico quente e terroso, com facetas levemente medicinais e ancestrais.", perfumeCount: 2345 },
  { id: "49", name: "Olíbano", slug: "frankincense", category: "oriental", description: "Resina sagrada e cítrica, com nuances de pinho e toques levemente apimentados.", perfumeCount: 3123 },
  { id: "50", name: "Opoponax", slug: "opoponax", category: "oriental", description: "Mirra doce e balsâmica, com nuances de lavanda e notas levemente anisadas.", perfumeCount: 1234 },

  // Notas Frescas
  { id: "19", name: "Notas Oceânicas", slug: "sea-notes", category: "fresco", description: "Marinho e ozônico, evocando a brisa salina e o frescor das águas abertas.", perfumeCount: 3456 },
  { id: "20", name: "Hortelã", slug: "mint", category: "fresco", description: "Gelada e aromática: um frescor revigorante com qualidades limpas e puras.", perfumeCount: 4567 },
  { id: "51", name: "Chá Verde", slug: "green-tea", category: "fresco", description: "Leve e zen: um frescor levemente amargo com qualidades calmantes e purificadoras.", perfumeCount: 2876 },
  { id: "52", name: "Pepino", slug: "cucumber", category: "fresco", description: "Aquoso e verde, trazendo um frescor revitalizante que remete à serenidade.", perfumeCount: 1234 },
  { id: "53", name: "Aldeídos", slug: "aldehydes", category: "fresco", description: "Efervescência cintilante e limpa, conferindo uma aura de champagne e sabonete fino.", perfumeCount: 3456 },
  { id: "54", name: "Notas Ozônicas", slug: "ozonic-notes", category: "fresco", description: "Etéreo e metálico, evocando o aroma do ar após a chuva e a atmosfera límpida.", perfumeCount: 2345 },
  { id: "55", name: "Notas Aquosas", slug: "water-notes", category: "fresco", description: "Transparentes e puras, com a fluidez do orvalho e a clareza das águas correntes.", perfumeCount: 1987 },
  { id: "56", name: "Gelo", slug: "ice", category: "fresco", description: "Cortante e mineral, trazendo um frescor gélido e uma pureza cristalina.", perfumeCount: 876 },

  // Notas Especiadas
  { id: "21", name: "Cardamomo", slug: "cardamom", category: "especiado", description: "Especiaria quente e aromática, com facetas cítricas e nuances adocicadas.", perfumeCount: 5678 },
  { id: "22", name: "Pimenta", slug: "pepper", category: "especiado", description: "Picante e seca: uma especiaria quente com subtons levemente amadeirados.", perfumeCount: 7890 },
  { id: "23", name: "Canela", slug: "cinnamon", category: "especiado", description: "Doce e vibrante, trazendo um calor especiado com subtons amadeirados.", perfumeCount: 4321 },
  { id: "24", name: "Açafrão", slug: "saffron", category: "especiado", description: "Exótico e luxuoso, com textura de couro, facetas metálicas e toques florais.", perfumeCount: 2345 },
  { id: "57", name: "Cravo-da-Índia", slug: "clove", category: "especiado", description: "Especiaria rica e profunda, com calor intenso e qualidades levemente anestésicas.", perfumeCount: 4567 },
  { id: "58", name: "Noz-Moscada", slug: "nutmeg", category: "especiado", description: "Quente e reconfortante, com uma doçura amadeirada sutil e sofisticada.", perfumeCount: 3456 },
  { id: "59", name: "Gengibre", slug: "ginger", category: "especiado", description: "Frescor picante e efervescente, com qualidades cítricas e energia vibrante.", perfumeCount: 3876 },
  { id: "60", name: "Pimenta Rosa", slug: "pink-pepper", category: "especiado", description: "Brilhante e rosada, unindo picância leve a nuances frutais e florais.", perfumeCount: 4234 },
  { id: "61", name: "Anis Estrelado", slug: "star-anise", category: "especiado", description: "Doce e licoroso, evocando nuances de alcaçuz com um calor medicinal.", perfumeCount: 1876 },
  { id: "62", name: "Cominho", slug: "cumin", category: "especiado", description: "Terroso e visceral, com calor animalístico e subtons profundamente sensuais.", perfumeCount: 1234 },

  // Notas Frutais
  { id: "63", name: "Maçã", slug: "apple", category: "frutado", description: "Crocante e fresca, equilibrando doçura suave com facetas verdes vibrantes.", perfumeCount: 5678 },
  { id: "64", name: "Pêssego", slug: "peach", category: "frutado", description: "Aveludado e macio, com doçura suculenta e qualidades levemente lactônicas.", perfumeCount: 4567 },
  { id: "65", name: "Pera", slug: "pear", category: "frutado", description: "Fruta doce e aquosa, apresentando nuances verdes e toques florais delicados.", perfumeCount: 3876 },
  { id: "66", name: "Cassis", slug: "blackcurrant", category: "frutado", description: "Fruto silvestre rascante, unindo acidez frutada a qualidades levemente verdes.", perfumeCount: 4234 },
  { id: "67", name: "Framboesa", slug: "raspberry", category: "frutado", description: "Doce e ácida, com textura de geleia e facetas que remetem à violeta.", perfumeCount: 3456 },
  { id: "68", name: "Morango", slug: "strawberry", category: "frutado", description: "Fruto fresco e alegre, com doçura natural e qualidades levemente cremosas.", perfumeCount: 2876 },
  { id: "69", name: "Abacaxi", slug: "pineapple", category: "frutado", description: "Tropical e vibrante, com doçura ácida e qualidades suculentas e solares.", perfumeCount: 2345 },
  { id: "70", name: "Manga", slug: "mango", category: "frutado", description: "Doce tropical densa, com textura cremosa e nuances verdes exóticas.", perfumeCount: 1234 },
  { id: "71", name: "Cereja", slug: "cherry", category: "frutado", description: "Fruta suculenta com facetas de amêndoa e nuances levemente licorosas.", perfumeCount: 2567 },
  { id: "72", name: "Ameixa", slug: "plum", category: "frutado", description: "Rica e aveludada, com doçura densa e qualidades levemente especiadas.", perfumeCount: 1987 },

  // Notas Verdes
  { id: "73", name: "Grama", slug: "grass", category: "verde", description: "Frescor de relva orvalhada, com qualidades que remetem ao feno e à natureza viva.", perfumeCount: 2345 },
  { id: "74", name: "Gálbano", slug: "galbanum", category: "verde", description: "Resina intensamente verde e amarga, com caráter balsâmico e silvestre.", perfumeCount: 1876 },
  { id: "75", name: "Folha de Figueira", slug: "fig-leaf", category: "verde", description: "Verde e leitoso, com nuances de coco e subtons amadeirados elegantes.", perfumeCount: 2456 },
  { id: "76", name: "Manjericão", slug: "basil", category: "verde", description: "Erva aromática e fresca, unindo o verde vibrante a nuances levemente anisadas.", perfumeCount: 1567 },
  { id: "77", name: "Folha de Tomate", slug: "tomato-leaf", category: "verde", description: "Verde intenso e rústico, com facetas metálicas e qualidades terrosas únicas.", perfumeCount: 876 },
  { id: "78", name: "Folha de Violeta", slug: "violet-leaf", category: "verde", description: "Frescor verde e frio, com nuances de pepino e subtons metálicos sutis.", perfumeCount: 2123 },
  { id: "79", name: "Bambu", slug: "bamboo", category: "verde", description: "Verde limpo e sereno, com qualidades aquosas e subtons amadeirados leves.", perfumeCount: 1234 },
  { id: "80", name: "Cânhamo", slug: "hemp", category: "verde", description: "Verde terroso e herbáceo, com subtons amadeirados e um caráter rústico.", perfumeCount: 654 },

  // Notas Aquáticas
  { id: "81", name: "Oceano", slug: "ocean", category: "aquatico", description: "Água salina e marinha, evocando algas e a vastidão da brisa costeira.", perfumeCount: 3456 },
  { id: "82", name: "Chuva", slug: "rain", category: "aquatico", description: "Aroma de petricor: água sobre terra seca com qualidades ozônicas e puras.", perfumeCount: 2345 },
  { id: "83", name: "Algas Marinhas", slug: "seaweed", category: "aquatico", description: "Perfil marinho rico em iodo, com facetas salgadas e subtons verdes selvagens.", perfumeCount: 1234 },
  { id: "84", name: "Ninféia", slug: "water-lily", category: "aquatico", description: "Floral aquático delicado, com frescor límpido e subtons levemente atalcados.", perfumeCount: 1876 },
  { id: "85", name: "Lótus", slug: "lotus", category: "aquatico", description: "Floral sagrado e aquoso, com facetas limpas e nuances levemente especiadas.", perfumeCount: 2567 },
  { id: "86", name: "Sal Marinho", slug: "sea-salt", category: "aquatico", description: "Mineral e salino, evocando a textura da pele ao sol com nuances ozônicas.", perfumeCount: 1654 },

  // Notas Gourmand
  { id: "87", name: "Café", slug: "coffee", category: "gourmand", description: "Grão torrado e rico, unindo amargura estimulante a nuances profundamente doces.", perfumeCount: 3456 },
  { id: "88", name: "Chocolate", slug: "chocolate", category: "gourmand", description: "Cacau opulento e doce, com texturas cremosas e facetas levemente amargas.", perfumeCount: 2876 },
  { id: "89", name: "Caramelo", slug: "caramelo", category: "gourmand", description: "Açúcar tostado e amanteigado, trazendo uma doçura rica e reconfortante.", perfumeCount: 2345 },
  { id: "90", name: "Mel", slug: "honey", category: "gourmand", description: "Néctar dourado e denso, com facetas cerosas e subtons levemente animalescos.", perfumeCount: 4123 },
  { id: "91", name: "Amêndoa", slug: "almond", category: "gourmand", description: "Nota amendoada e doce, evocando marzipan com qualidades levemente amargas.", perfumeCount: 3234 },
  { id: "92", name: "Coco", slug: "coconut", category: "gourmand", description: "Fruto tropical cremoso, com doçura lactônica e textura aveludada.", perfumeCount: 2567 },
  { id: "93", name: "Pralinê", slug: "praline", category: "gourmand", description: "Noz caramelizada e doce, com facetas de avelã e texturas amanteigadas ricas.", perfumeCount: 1876 },
  { id: "94", name: "Leite", slug: "milk", category: "gourmand", description: "Suavidade lactônica e cremosa, evocando conforto e uma doçura maternal sutil.", perfumeCount: 1234 },
]

// Sample reviews data
export const reviews: Review[] = [
  {
    id: "1",
    perfumeId: "1",
    perfumeName: "Santal 33",
    perfumeBrand: "Le Labo",
    userId: "user1",
    userName: "ScentEnthusiast",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    content: "This is hands down one of the most unique fragrances I've ever encountered. The sandalwood is creamy and smooth, while the cardamom adds an interesting especiado kick. The leather in the drydown is subtle but adds depth. I get compliments every time I wear this!",
    longevity: 8,
    sillage: 7,
    date: "2026-04-15",
    likes: 234
  },
  {
    id: "2",
    perfumeId: "2",
    perfumeName: "Baccarat Rouge 540",
    perfumeBrand: "Maison Francis Kurkdjian",
    userId: "user2",
    userName: "FragranceCollector",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    content: "BR540 is a masterpiece. The amber and saffron create this warm, glowing aura around you. It's like wearing liquid gold. The longevity is insane - I can still smell it on my clothes days later. Worth every penny.",
    longevity: 10,
    sillage: 9,
    date: "2026-04-12",
    likes: 567
  },
  {
    id: "3",
    perfumeId: "5",
    perfumeName: "Aventus",
    perfumeBrand: "Creed",
    userId: "user3",
    userName: "NicheFragHead",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4,
    content: "A classic for a reason. The pineapple opening is fresco and frutado, while the birch and musk give it a masculine edge. My only complaint is the batch variation - some batches are smokier than others.",
    longevity: 8,
    sillage: 8,
    date: "2026-04-10",
    likes: 189
  },
  {
    id: "4",
    perfumeId: "4",
    perfumeName: "Black Opium",
    perfumeBrand: "Yves Saint Laurent",
    userId: "user4",
    userName: "VanillaLover",
    userAvatar: "https://fimgs.net/mdimg/perfume-thumbs/375x500.25324.jpg",
    rating: 4,
    content: "Black Opium is my go-to evening fragrance. The coffee note is perfectly balanced with vanilla, not too bitter. It's sweet but not cloying. Great for date nights and special occasions.",
    longevity: 7,
    sillage: 6,
    date: "2026-04-08",
    likes: 156
  },
  {
    id: "5",
    perfumeId: "6",
    perfumeName: "Oud Wood",
    perfumeBrand: "Tom Ford",
    userId: "user5",
    userName: "OudFanatic",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    content: "This is how oud should be done. Not animalic or challenging, but smooth and approachable. The rosewood and cardamom opening is gorgeous, and the oud is perfectly blended. A gateway oud for beginners.",
    longevity: 8,
    sillage: 7,
    date: "2026-04-05",
    likes: 298
  }
]


// Sample forum posts data
export const forumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Best Spring 2026 Releases?",
    author: "FragranceNewbie",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    replies: 47,
    views: 1234,
    lastActivity: "2 hours ago",
    category: "Recommendations"
  },
  {
    id: "2",
    title: "Santal 33 Alternatives - Let's discuss!",
    author: "BudgetCollector",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    replies: 89,
    views: 2567,
    lastActivity: "5 hours ago",
    category: "Discussion"
  },
  {
    id: "3",
    title: "My collection after 5 years",
    author: "ScentJourney",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    replies: 156,
    views: 4532,
    lastActivity: "1 day ago",
    category: "Collections"
  },
  {
    id: "4",
    title: "Office-safe fragrances for summer",
    author: "CorporateScent",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    replies: 34,
    views: 987,
    lastActivity: "3 days ago",
    category: "Recommendations"
  },
  {
    id: "5",
    title: "Understanding longevity vs projection",
    author: "FragranceScience",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    replies: 23,
    views: 654,
    lastActivity: "1 week ago",
    category: "Education"
  }
]


// Helper functions
export function getPerfumeById(id: string): Perfume | undefined {
  return perfumes.find(p => p.id === id)
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find(b => b.slug === slug)
}

export function getPerfumesByBrand(brandSlug: string): Perfume[] {
  return perfumes.filter(p => p.brandSlug === brandSlug)
}

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find(n => n.slug === slug)
}

/** Whether any pyramid layer of the perfume mentions this catalog note name (substring match). */
export function perfumeMatchesNoteName(perfume: Perfume, noteName: string): boolean {
  const needle = noteName.toLowerCase()
  const layers = [...perfume.topNotes, ...perfume.middleNotes, ...perfume.baseNotes]
  return layers.some((n) => n.toLowerCase().includes(needle))
}

export function getPerfumesWithNote(note: Pick<Note, "name">): Perfume[] {
  return perfumes.filter((p) => perfumeMatchesNoteName(p, note.name))
}

export function getCatalogPerfumeCountForNote(note: Pick<Note, "name">): number {
  return getPerfumesWithNote(note).length
}


export function getReviewsByPerfume(perfumeId: string): Review[] {
  return reviews.filter(r => r.perfumeId === perfumeId)
}


export interface Inspiration {
  id: string
  perfumeId: string
  name: string
  brand: string
  description: string
  priceRange: "budget" | "mid" | "luxury"
  similarity: number
  notes: string[]
}

// Get similar/inspired perfumes
export function getSimilarPerfumes(perfumeId: string): Inspiration[] {
  const perfume = perfumes.find(p => p.id === perfumeId)
  if (!perfume) return []
  
  // Find perfumes with similar accords or notes
  const allNotes = [...perfume.topNotes, ...perfume.middleNotes, ...perfume.baseNotes]
  
  return perfumes
    .filter(p => p.id !== perfumeId)
    .map(p => {
      const pNotes = [...p.topNotes, ...p.middleNotes, ...p.baseNotes]
      const sharedNotes = allNotes.filter(n => pNotes.includes(n))
      const sharedAccords = perfume.accords.filter(a => p.accords.includes(a))
      const similarity = Math.min(95, Math.round((sharedNotes.length * 10 + sharedAccords.length * 15)))
      
      return {
        id: p.id,
        perfumeId: p.id,
        name: p.name,
        brand: p.brand,
        description: `Perfil ${sharedAccords.length > 0 ? sharedAccords.slice(0, 2).join(" e ") : "olfativo"} semelhante, com ${sharedNotes.length > 0 ? "notas compartilhadas de " + sharedNotes.slice(0, 2).join(", ") : "notas complementares"}.`,        priceRange: ["Creed", "Tom Ford", "Maison Francis Kurkdjian", "Frederic Malle"].includes(p.brand) ? "luxury" : ["Dior", "Chanel", "Le Labo", "Yves Saint Laurent"].includes(p.brand) ? "mid" : "budget",
        similarity,
        notes: sharedNotes.slice(0, 4)
      } as Inspiration
    })
    .filter(p => p.similarity > 20)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 6)
}
