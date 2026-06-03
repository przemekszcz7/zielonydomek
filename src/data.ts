export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  description: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to select Lucide icons dynamically
}

export const CONTACT_INFO = {
  name: "Gościniec Zielony Domek",
  phone: "502 531 079",
  phoneFormatted: "+48 502 531 079",
  address: "Młodkowskiego 24, Mrągowo 11-700",
  email: "optima@poczta.onet.eu",
  facebook: "https://www.facebook.com/profile.php?id=61589342879124",
  instagram: "https://www.instagram.com/goscinieczielonydomek/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExZHRFUUZ5UkJOeUNvNDF6WHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR5BSJzB5OU46H6syd7DFjw2zp7euOVu-UVcKMV7SUG_5c342HcTbNoaLWjxaA_aem_A1ZMrcgtqC4Jcnju9Q-zkA",
  booking: "https://www.booking.com/searchresults.pl.html?aid=1288294&label=metagha-link-MRPL-hotel-1055290_dev-desktop_los-4_bw-52_dow-Friday_defdate-1_room-0_gstadt-2_rateid-public_aud-0_gacid-21411110600_mcid-10_ppa-0_clrid-0_ad-1_gstkid-0_checkin-20260626_ppt-_lp-2616_r-3652880067908990738-Share-Mvw65zH%401778005352&no_rooms=1&highlighted_hotels=1055290&checkin=2026-06-26&redirected=1&dest_type=hotel&hlrd=with_dates&group_adults=2&dest_id=1055290&source=hotel&group_children=0&checkout=2026-06-30&keep_landing=1&sid=bb5bb7b999c743056721043f4462d72e"
};

export const INSTAGRAM_LINK_SHORT = "https://instagram.com/goscinieczielonydomek";

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 1,
    url: "https://i.ibb.co/XrsvZhGn/688073763-122095754583311429-3031027201350845452-n.jpg",
    title: "Sielski Poranek na Pomoście",
    description: "Cisza o świcie nad spokojną taflą wody. Idealne miejsce na poranną kawę."
  },
  {
    id: 2,
    url: "https://i.ibb.co/C5bQW6pQ/689777466-122095754673311429-8324651450479429271-n.jpg",
    title: "Taras Widokowy",
    description: "Komfortowa strefa relaksu na świeżym powietrzu z bezpośrednim widokiem na jezioro."
  },
  {
    id: 3,
    url: "https://i.ibb.co/VWghFpsr/687967640-122095754835311429-191378108025898402-n.jpg",
    title: "Przytulne Wnętrza",
    description: "Jasne, starannie urządzone sypialnie i pokoje łączące rustykalny urok z komfortem."
  },
  {
    id: 4,
    url: "https://i.ibb.co/M5K2TTFp/706101298-122105016033311429-8095350522908232043-n.jpg",
    title: "Magiczny Zachód Słońca",
    description: "Wieczorne spektakle natury obserwowane bezpośrednio z naszego ogrodu."
  },
  {
    id: 5,
    url: "https://i.ibb.co/RT6wkHqf/705968402-122105016117311429-5959679316218535309-n.jpg",
    title: "Wieczorny Klimat",
    description: "Ogród rozświetlony delikatnym blaskiem, doskonały na biesiady i ognisko."
  },
  {
    id: 6,
    url: "https://i.ibb.co/gZgK59Cp/705949749-122105016201311429-7040783455566900267-n.jpg",
    title: "Przystań dla Aktywnych",
    description: "Sprzęt wodny, kajaki i rowery wodne czekające na brzegu (w cenie pobytu)."
  },
  {
    id: 7,
    url: "https://i.ibb.co/ccg65Yq0/705052591-122105016333311429-5463179589097668519-n.jpg",
    title: "Mazurska Zieleń",
    description: "Ekskluzywna bliskość natury, stuletnie drzewa i kojący śpiew ptaków wokół obiektu."
  }
];

export const HERO_IMAGE_URL = "https://i.ibb.co/VpQDS7wy/689522335-950696424264268-8264182981788617616-n.jpg";

export const AMENITIES: Amenity[] = [
  {
    id: "lake-access",
    title: "Dostęp do Jeziora",
    description: "Obiekt jest położony bezpośrednio nad brzegiem czystego jeziora z łagodnym wejściem do wody.",
    iconName: "Waves"
  },
  {
    id: "water-equipment",
    title: "Sprzęt Wodny w Cenie",
    description: "Bezpłatne kajaki i rowery wodne są do Twojej dyspozycji przez cały czas trwania pobytu.",
    iconName: "Ship"
  },
  {
    id: "private-pier",
    title: "Prywatny Pomost",
    description: "Długi drewniany pomost idealny do wędkowania, porannej jogi lub wieczornego relaksu.",
    iconName: "Anchor"
  },
  {
    id: "silence",
    title: "Cisza i Przyroda",
    description: "Z dala od ruchliwych dróg – u nas usłyszysz tylko szum trzcin i wieczorne koncerty świerszczy.",
    iconName: "Trees"
  },
  {
    id: "garden",
    title: "Duży, Sielski Ogród",
    description: "Przestronny zielony teren z wyznaczonym klimatycznym miejscem na ognisko i grilla.",
    iconName: "Flame"
  },
  {
    id: "comfort",
    title: "Przytulny Standard",
    description: "Komfortowa i przytulna aranżacja wnętrz oddająca nastrój tradycyjnych mazurskich wakacji.",
    iconName: "Compass"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Maciej i Anna",
    text: "Cudowne miejsce na reset! Widok z tarasu o poranku zapiera dech w piersiach, a bezpośrednie zejście do jeziora z darmowym sprzętem wodnym to absolutny hit. Na pewno wrócimy!",
    rating: 5
  },
  {
    id: 2,
    name: "Karolina",
    text: "Spokój, cisza, prawdziwy domowy klimat agroturystyki, ale z najwyższą klasą komfortu. Przemiły kontakt z gospodarzami i kapitalne zachody słońca na pomoście.",
    rating: 5
  },
  {
    id: 3,
    name: "Tomasz",
    text: "Młodkowskiego 24 to najlepszy adres w Mrągowie. Domek czysty, perfekcyjnie urządzony, a ogród nad samą wodą daje niesamowitą prywatność.",
    rating: 5
  }
];
