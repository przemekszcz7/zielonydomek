import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Waves, 
  Ship, 
  Anchor, 
  Trees, 
  Flame, 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ArrowRight, 
  ExternalLink, 
  Calendar,
  Check,
  Heart,
  Eye
} from 'lucide-react';
import { 
  CONTACT_INFO, 
  GALLERY_IMAGES, 
  HERO_IMAGE_URL, 
  AMENITIES, 
  TESTIMONIALS,
  INSTAGRAM_LINK_SHORT
} from './data';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  


  // Booking widget states
  const [checkInDate, setCheckInDate] = useState('2026-06-26');
  const [checkOutDate, setCheckOutDate] = useState('2026-06-30');
  const [adultsCount, setAdultsCount] = useState('2');
  const [isShowingBookingTip, setIsShowingBookingTip] = useState(false);

  // Track scrolling to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for image lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev !== null && prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : GALLERY_IMAGES.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);



  // Generate customized Booking.com link based on chosen dates
  const handleBookingRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsShowingBookingTip(true);
    setTimeout(() => {
      const generatedUrl = `https://www.booking.com/searchresults.pl.html?aid=1288294&highlighted_hotels=1055290&dest_id=1055290&dest_type=hotel&checkin=${checkInDate}&checkout=${checkOutDate}&group_adults=${adultsCount}&no_rooms=1&group_children=0&source=hotel`;
      window.open(generatedUrl, '_blank', 'noopener,noreferrer');
      setIsShowingBookingTip(false);
    }, 1500);
  };

  // Helper function to resolve dynamic Lucide icons for amenities
  const renderAmenityIcon = (iconName: string) => {
    const props = { className: "w-7 h-7 text-gold transition-colors duration-300 group-hover:text-forest-light" };
    switch (iconName) {
      case 'Waves':
        return <Waves {...props} />;
      case 'Ship':
        return <Ship {...props} />;
      case 'Anchor':
        return <Anchor {...props} />;
      case 'Trees':
        return <Trees {...props} />;
      case 'Flame':
        return <Flame {...props} />;
      default:
        return <Compass {...props} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold selection:text-forest-dark bg-cream text-charcoal overflow-x-hidden antialiased">
      
      {/* Dynamic Navigation Bar */}
      <nav 
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'py-4 bg-forest-dark/95 backdrop-blur-md shadow-lg border-b border-gold/15' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Text Logo with subtle golden dot */}
          <a href="#hero" className="flex flex-col group">
            <span className="font-serif text-xl md:text-2xl font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-gold">
              Zielony Domek
            </span>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold/85 font-medium -mt-1">
              Gościniec Mazurski
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <a href="#o-nas" className="font-sans text-sm tracking-wider font-medium text-white/90 hover:text-gold transition-colors duration-200">
              O NAS
            </a>
            <a href="#udogodnienia" className="font-sans text-sm tracking-wider font-medium text-white/90 hover:text-gold transition-colors duration-200">
              UDOGODNIENIA
            </a>
            <a href="#galeria" className="font-sans text-sm tracking-wider font-medium text-white/90 hover:text-gold transition-colors duration-200">
              GALERIA
            </a>
            <a href="#opinie" className="font-sans text-sm tracking-wider font-medium text-white/90 hover:text-gold transition-colors duration-200">
              OPINIE
            </a>
            <a href="#kontakt" className="font-sans text-sm tracking-wider font-medium text-white/90 hover:text-gold transition-colors duration-200">
              KONTAKT
            </a>
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href={CONTACT_INFO.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 font-sans text-xs tracking-widest uppercase font-medium bg-transparent text-gold border border-gold/40 hover:bg-gold hover:text-forest-dark transition-all duration-300 rounded"
            >
              Zarezerwuj Pobyt
            </a>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-gold transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Sliding Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] bg-forest-dark z-40 lg:hidden flex flex-col justify-between px-8 py-12 border-t border-gold/15"
          >
            <div className="flex flex-col space-y-6 text-center pt-8">
              <a 
                href="#o-nas" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl font-light text-white tracking-wide hover:text-gold transition-colors py-2"
              >
                O nas
              </a>
              <a 
                href="#udogodnienia" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl font-light text-white tracking-wide hover:text-gold transition-colors py-2"
              >
                Udogodnienia
              </a>
              <a 
                href="#galeria" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl font-light text-white tracking-wide hover:text-gold transition-colors py-2"
              >
                Galeria
              </a>
              <a 
                href="#opinie" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl font-light text-white tracking-wide hover:text-gold transition-colors py-2"
              >
                Opinie
              </a>
              <a 
                href="#kontakt" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl font-light text-white tracking-wide hover:text-gold transition-colors py-2"
              >
                Kontakt i mapa
              </a>
            </div>

            <div className="flex flex-col items-center space-y-4 pb-12 w-full">
              <a 
                href={CONTACT_INFO.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 bg-gold text-forest-dark font-sans text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors duration-300 rounded shadow-md"
              >
                Rezerwuj na Booking.com
              </a>
              <div className="flex items-center space-x-6 text-white/70">
                <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all">
                  Facebook
                </a>
                <span>•</span>
                <a href={INSTAGRAM_LINK_SHORT} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all">
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section (Parallax visual effect container) */}
      <header id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fullscreen Hero background with beautiful overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ 
            backgroundImage: `url(${HERO_IMAGE_URL})`,
          }}
        >
          {/* Gradient dark vignette to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest-dark/45 to-cream" />
        </div>

        {/* Hero Interactive Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center justify-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Elegant upper subtitle */}
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-gold font-semibold mb-4 bg-forest-dark/30 backdrop-blur-xs px-4 py-1.5 rounded-full border border-gold/10">
              Oaza Ciszy we Własnym Tempie
            </span>

            {/* Expansive display serif title */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 leading-tight max-w-4xl">
              Gościniec <br />
              <span className="italic text-gold italic-serif">Zielony Domek</span>
            </h1>

            {/* Slogan with high contrast and readable sizing */}
            <p className="font-sans text-base md:text-xl lg:text-2xl text-cream-light font-light max-w-2xl mb-12 leading-relaxed drop-shadow-sm">
              Sielskie noclegi nad samym brzegiem jeziora w Mrągowie. Przyroda, prywatny pomost i bezpłatny sprzęt wodny do Twojej dyspozycji.
            </p>

            {/* Modern dual buttons including fast interactive widget trigger */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a 
                href="#o-nas"
                className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-forest-dark font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded shadow-lg flex items-center justify-center gap-2 group"
              >
                Odkryj Nasze Miejsce
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a 
                href="#rezerwacja-widget"
                className="w-full sm:w-auto px-8 py-4 bg-forest-dark/80 hover:bg-forest-dark backdrop-blur-sm text-gold border border-gold/30 hover:border-gold transition-all duration-300 font-sans text-xs tracking-widest uppercase font-semibold rounded flex items-center justify-center gap-2"
              >
                Sprawdź Dostępność
              </a>
            </div>
          </motion.div>
        </div>

        {/* Elegant scroll indicator overlay */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-forest-light font-semibold animate-pulse">
            Przewiń
          </span>
          <div className="w-1 h-12 bg-forest-light/20 rounded-full overflow-hidden">
            <motion.div 
              animate={{ 
                y: [0, 24, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-1/3 bg-gold rounded-full"
            />
          </div>
        </div>
      </header>

      {/* 2. Quick Live Booking Widget Wrapper (No real database constraints, beautifully client-side helper) */}
      <section id="rezerwacja-widget" className="relative z-20 -mt-20 px-6 max-w-7xl mx-auto w-full">
        <div className="bg-forest-dark text-white rounded-xl shadow-2xl p-6 md:p-8 border border-gold/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-serif text-xl md:text-2xl text-gold font-medium">Błyskawiczne Sprawdzanie Ceny i Rezerwacja</h3>
              <p className="text-sm text-cream-light/70 mt-1">Zostaniesz przekierowany do oficjalnego systemu Booking.com z wpisanymi parametrami.</p>
            </div>
            <div className="flex items-center gap-1 text-gold">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="text-xs text-white/80 font-medium ml-2 bg-white/10 px-2.5 py-0.5 rounded-full">Ocena 9.8 / 10 w Booking</span>
            </div>
          </div>

          <form onSubmit={handleBookingRedirect} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold/90 mb-2">
                <Calendar className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" /> Przyjazd
              </label>
              <input 
                type="date" 
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min="2026-06-03"
                className="w-full bg-forest bg-opacity-40 text-white rounded border border-white/20 focus:border-gold py-3 px-4 focus:ring-1 focus:ring-gold focus:outline-none transition-all text-sm font-sans"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold/90 mb-2">
                <Calendar className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" /> Wyjazd
              </label>
              <input 
                type="date" 
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate}
                className="w-full bg-forest bg-opacity-40 text-white rounded border border-white/20 focus:border-gold py-3 px-4 focus:ring-1 focus:ring-gold focus:outline-none transition-all text-sm font-sans"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold/90 mb-2">
                Liczba Gości
              </label>
              <select 
                value={adultsCount} 
                onChange={(e) => setAdultsCount(e.target.value)}
                className="w-full bg-forest bg-opacity-40 text-white rounded border border-white/20 focus:border-gold py-3 px-4 focus:ring-1 focus:ring-gold focus:outline-none transition-all text-sm font-sans"
              >
                <option value="1" className="bg-forest-dark text-white">1 Osoba</option>
                <option value="2" className="bg-forest-dark text-white">2 Osoby</option>
                <option value="3" className="bg-forest-dark text-white">3 Osoby</option>
                <option value="4" className="bg-forest-dark text-white">4 Osoby</option>
                <option value="5" className="bg-forest-dark text-white">5-6 Osób</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-light text-forest-dark py-3.5 px-6 font-sans text-xs tracking-widest uppercase font-bold transition-all duration-300 rounded flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transform active:scale-98"
              disabled={isShowingBookingTip}
            >
              {isShowingBookingTip ? (
                <>
                  <div className="w-4 h-4 border-2 border-forest-dark border-t-transparent rounded-full animate-spin"></div>
                  Kierowanie...
                </>
              ) : (
                <>
                  Rezerwuj online
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {isShowingBookingTip && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs text-gold/90 mt-4 font-sans tracking-wide"
            >
              Trwa przygotowywanie bezpiecznego przekierowania do portalu partnerskiego Booking.com...
            </motion.p>
          )}
        </div>
      </section>

      {/* 3. About Us Section (O nas - Elegant asymmetrical story) */}
      <section id="o-nas" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Visual column on left with customized picture overlaps */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gold/10 rounded-2xl transform -rotate-1 scale-98 group-hover:rotate-1 transition-transform duration-500" />
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img 
                src="https://i.ibb.co/XrsvZhGn/688073763-122095754583311429-3031027201350845452-n.jpg" 
                alt="Wschód słońca nad jeziorem w Gościńcu Zielony Domek" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/50 to-transparent" />
              {/* Overlay with nice quote badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-forest-dark/85 backdrop-blur-sm p-5 rounded-lg border border-gold/20 text-white">
                <p className="font-serif italic text-base text-gold-light">
                  "Miejsce, gdzie cisza nie jest jedynie brakiem hałasu, lecz luksusem obcowania z czystą, pierwotną naturą Mazur."
                </p>
              </div>
            </div>
            
            {/* Tiny accent badge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex flex-col items-center justify-center w-24 h-24 bg-white shadow-xl rounded-full border border-gold/35 rotate-12">
              <Heart className="w-6 h-6 text-gold fill-gold/10 animate-pulse" />
              <span className="font-sans text-[8px] font-bold text-forest uppercase tracking-wider mt-1">Nad wodą</span>
            </div>
          </div>

          {/* Narrative text on right */}
          <div className="flex flex-col justify-center">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold-dark font-bold mb-3 block">
              POZNAJ GOŚCINIEC ZIELONY DOMEK
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-8 text-forest leading-tight">
              Sielski azyl z prywatną linią brzegową w sercu Mazur
            </h2>
            <p className="text-charcoal/85 leading-relaxed text-base md:text-lg mb-6 font-light">
              Nasz <strong className="font-medium text-forest-dark">Zielony Domek</strong> to idealne miejsce, aby oderwać się od miejskiego zgiełku i w pełni zanurzyć w atmosferze czystego, wiejskiego klimatu. Położony bezpośrednio nad samym brzegiem jeziora w Mrągowie, stanowi harmonijne połączenie tradycyjnej agroturystyki i nowoczesnej elegancji.
            </p>
            <p className="text-charcoal/85 leading-relaxed text-base md:text-lg mb-8 font-light">
              Tutaj każdy dzień zaczynasz od niezakłóconej ciszy, śpiewu ptaków i zachwycającej panoramy mazurskich wód budzących się do życia. Chętnym na aktywne spędzanie wolnego czasu zapewniamy pełną gamę sprzętu pływającego – <span className="font-semibold text-forest">rowery wodne oraz kajaki są wliczone bezpośrednio w cenę pobytu</span>, co gwarantuje pełną niezależność w eksplorowaniu akwenu.
            </p>

            {/* Micro value badges with visual borders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-forest-light/10">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-forest-light/10 rounded-lg text-forest flex-shrink-0">
                  <Waves className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-forest">Blisko wody</h4>
                  <p className="font-sans text-xs text-charcoal/70 mt-1">Szybkie i bezpośrednie zejście z trawnika na pomost.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-forest-light/10 rounded-lg text-forest flex-shrink-0">
                  <Trees className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-forest">Cisza Mazur</h4>
                  <p className="font-sans text-xs text-charcoal/70 mt-1">Tylko natura – wokół lasy, sady i czysta woda.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-forest-light/10 rounded-lg text-forest flex-shrink-0">
                  <Ship className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-forest">Sprzęt w cenie</h4>
                  <p className="font-sans text-xs text-charcoal/70 mt-1">Kajaki i rowery wodne na pomoście bez limitów.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Luxury Amenities Section (Udogodnienia) */}
      <section id="udogodnienia" className="bg-forest-dark text-white py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold font-bold mb-3 block">
              CO OFERUJE ZIELONY DOMEK
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Udogodnienia stworzone z myślą o Twoim komforcie
            </h2>
            <div className="w-20 h-[2px] bg-gold mx-auto" />
            <p className="font-sans text-cream-light/85 text-base md:text-lg font-light mt-6">
              Przygotowaliśmy wszystko, aby Twój odpoczynek był w pełni komfortowy i beztroski. Ciesz się luksusem bliskości natury we wspaniale wyposażonym otoczeniu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AMENITIES.map((amenity, idx) => (
              <motion.div 
                key={amenity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group p-8 bg-forest/40 hover:bg-forest transition-all duration-300 rounded-xl border border-white/5 hover:border-gold/30 hover:shadow-xl flex flex-col items-start"
              >
                <div className="mb-6 p-4 bg-forest-dark/80 group-hover:bg-forest-light/30 rounded-xl border border-gold/10 transition-colors duration-300">
                  {renderAmenityIcon(amenity.iconName)}
                </div>
                <h3 className="font-serif text-xl font-medium text-gold group-hover:text-white transition-colors duration-350 mb-3">
                  {amenity.title}
                </h3>
                <p className="font-sans text-sm text-cream-light/80 leading-relaxed font-light">
                  {amenity.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sincere badge note in bottom */}
          <div className="mt-16 text-center border-t border-white/10 pt-10">
            <p className="font-sans text-xs md:text-sm text-gold/85 max-w-xl mx-auto flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-gold shrink-0 border border-gold rounded-full p-0.5" />
              Do każdego pobytu udostępniamy mapy okolic, darmowe Wi-Fi oraz prywatny parking bezpośrednio na posesji.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Custom Mosaic Gallery Section (Galeria z bento gridem i czystym luksusowym lightboxem) */}
      <section id="galeria" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold-dark font-bold mb-3 block">
              ZOBACZ NASZE MATERIAŁY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-forest">
              Życie nad jeziorem w kadrach
            </h2>
            <p className="font-sans text-charcoal/70 text-sm md:text-base font-light mt-3">
              Kliknij na dowolne zdjęcie, by otworzyć interaktywną galerię i przeczytać pełną opowieść kryjącą się za ujęciem.
            </p>
          </div>
          <a 
            href={CONTACT_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-forest-dark hover:text-gold transition-colors font-sans py-2 border-b-2 border-gold self-start"
          >
            Obserwuj na Instagramie
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bento/Asymetric CSS grid for 7 images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Card 1: Main landscape overview (Width 6 cols on large screen) */}
          <div 
            onClick={() => setActivePhotoIndex(0)}
            className="lg:col-span-6 overflow-hidden rounded-xl bg-forest-dark cursor-pointer relative group aspect-[4/3] sm:aspect-auto sm:h-[450px] shadow-lg"
          >
            <img 
              src={GALLERY_IMAGES[0].url} 
              alt={GALLERY_IMAGES[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover Indicator Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest-dark/40 backdrop-blur-xs">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-gold border border-gold/35 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Card 2: Portait view on the right grid (Width 6 cols) */}
          <div 
            onClick={() => setActivePhotoIndex(1)}
            className="lg:col-span-6 overflow-hidden rounded-xl bg-forest-dark cursor-pointer relative group aspect-[4/3] sm:aspect-auto sm:h-[450px] shadow-lg"
          >
            <img 
              src={GALLERY_IMAGES[1].url} 
              alt={GALLERY_IMAGES[1].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover Indicator Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest-dark/40 backdrop-blur-xs">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-gold border border-gold/35 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Card 3: Vertical styled (Width 4 cols) */}
          <div 
            onClick={() => setActivePhotoIndex(2)}
            className="lg:col-span-4 overflow-hidden rounded-xl bg-forest-dark cursor-pointer relative group aspect-[3/4] shadow-lg"
          >
            <img 
              src={GALLERY_IMAGES[2].url} 
              alt={GALLERY_IMAGES[2].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover Indicator Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest-dark/40 backdrop-blur-xs">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-gold border border-gold/35 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Card 4: Landscape styled (Width 4 cols) */}
          <div 
            onClick={() => setActivePhotoIndex(3)}
            className="lg:col-span-4 overflow-hidden rounded-xl bg-forest-dark cursor-pointer relative group aspect-[3/4] shadow-lg"
          >
            <img 
              src={GALLERY_IMAGES[3].url} 
              alt={GALLERY_IMAGES[3].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover Indicator Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest-dark/40 backdrop-blur-xs">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-gold border border-gold/35 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Card 5: Grid item for wieczorny klimat (Width 4 cols) */}
          <div 
            onClick={() => setActivePhotoIndex(4)}
            className="lg:col-span-4 overflow-hidden rounded-xl bg-forest-dark cursor-pointer relative group aspect-[3/4] shadow-lg"
          >
            <img 
              src={GALLERY_IMAGES[4].url} 
              alt={GALLERY_IMAGES[4].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover Indicator Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest-dark/40 backdrop-blur-xs">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-gold border border-gold/35 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Card 6: Floating activities (Width 6 cols) */}
          <div 
            onClick={() => setActivePhotoIndex(5)}
            className="lg:col-span-6 overflow-hidden rounded-xl bg-forest-dark cursor-pointer relative group aspect-[4/3] shadow-lg"
          >
            <img 
              src={GALLERY_IMAGES[5].url} 
              alt={GALLERY_IMAGES[5].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover Indicator Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest-dark/40 backdrop-blur-xs">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-gold border border-gold/35 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Card 7: Nature detail (Width 6 cols) */}
          <div 
            onClick={() => setActivePhotoIndex(6)}
            className="lg:col-span-6 overflow-hidden rounded-xl bg-forest-dark cursor-pointer relative group aspect-[4/3] shadow-lg"
          >
            <img 
              src={GALLERY_IMAGES[6].url} 
              alt={GALLERY_IMAGES[6].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover Indicator Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest-dark/40 backdrop-blur-xs">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-gold border border-gold/35 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 6. Guest Testimonials Section (Opinie) */}
      <section id="opinie" className="py-24 bg-cream-light border-y border-forest-light/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold-dark font-bold mb-3 block">
              GŁOSY NASZYCH GOŚCI
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-forest mb-4">
              Prawdziwe mazurskie wspomnienia
            </h2>
            <div className="flex justify-center items-center gap-1.5 text-gold my-4">
              <span className="text-sm font-semibold tracking-wide text-charcoal/80 uppercase font-sans mr-2">Średnia ocena:</span>
              <Star className="w-4.5 h-4.5 fill-current" />
              <strong className="text-base text-forest-dark font-bold font-sans">4.9 / 5</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-md border border-forest-light/5 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-5 text-gold">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-base text-charcoal/85 italic leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-cream-dark/30">
                  <div className="w-10 h-10 bg-forest/10 border border-gold/20 text-forest-dark rounded-full flex items-center justify-center font-serif text-sm font-bold uppercase">
                    {testimonial.name.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-forest-dark">{testimonial.name}</h4>
                    <span className="font-sans text-[10px] tracking-wide text-charcoal/50 uppercase">Zweryfikowana Opinia</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="font-sans text-xs text-charcoal/50">
              Opinie zebrane z portali Booking.com oraz Google Maps.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Contact, Location & Custom Form Section (Kontakt i mapy) */}
      <section id="kontakt" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Coordinates & Dynamic Message Form */}
          <div className="flex flex-col">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold-dark font-bold mb-3 block">
              ZAPRASZAMY PRZEZ CAŁY ROK
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-forest mb-6">
              Skontaktuj się ze mną
            </h2>
            <p className="font-sans text-charcoal/80 text-base font-light mb-12">
              Chcesz dopytać o szczegóły lub zarezerwować wolny termin? Zadzwoń bezpośrednio lub wyślij szybką wiadomość przez formularz – chętnie pomogę zaplanować Twój mazurski urlop.
            </p>

            {/* Structured contact listing with lucide visuals */}
            <div className="space-y-6 mb-12">
              <a 
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="group flex gap-5 items-center p-4 rounded-lg hover:bg-forest/5 transition-colors"
              >
                <div className="p-3 bg-forest-light/10 text-forest rounded-lg group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-sans text-xs text-charcoal/50 uppercase tracking-widest font-semibold">Telefon bezpośredni</span>
                  <span className="block font-serif text-lg md:text-xl font-bold text-forest group-hover:text-gold-dark transition-colors mt-0.5">
                    {CONTACT_INFO.phoneFormatted}
                  </span>
                </div>
              </a>

              <a 
                href={`mailto:${CONTACT_INFO.email}`}
                className="group flex gap-5 items-center p-4 rounded-lg hover:bg-forest/5 transition-colors"
              >
                <div className="p-3 bg-forest-light/10 text-forest rounded-lg group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-sans text-xs text-charcoal/50 uppercase tracking-widest font-semibold">Adres e-mail</span>
                  <span className="block font-sans text-base font-medium text-forest-dark group-hover:text-gold-dark transition-colors mt-0.5 break-all">
                    {CONTACT_INFO.email}
                  </span>
                </div>
              </a>

              <a 
                href="https://maps.google.com/?q=Młodkowskiego+24,+Mrągowo"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-5 items-center p-4 rounded-lg hover:bg-forest/5 transition-colors"
              >
                <div className="p-3 bg-forest-light/10 text-forest rounded-lg group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-sans text-xs text-charcoal/50 uppercase tracking-widest font-semibold">Nasza lokalizacja</span>
                  <span className="block font-serif text-base font-bold text-forest-dark group-hover:text-gold-dark transition-colors mt-0.5">
                    {CONTACT_INFO.address}
                  </span>
                </div>
              </a>
            </div>

            {/* Social handles visual section (as requested: stylized buttons not generic) */}
            <div className="border-t border-forest-light/10 pt-10">
              <h4 className="font-serif text-base font-medium text-forest-dark mb-4">
                Odwiedź nasze kanały społecznościowe:
              </h4>
              <div className="flex flex-wrap gap-4">
                
                <a 
                  href={CONTACT_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-forest-light/10 hover:border-gold hover:shadow-md rounded text-sm text-forest-dark font-sans font-medium transition-all"
                >
                  <span className="w-5 h-5 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center font-bold text-sm">f</span>
                  Facebook
                </a>

                <a 
                  href={CONTACT_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-forest-light/10 hover:border-gold hover:shadow-md rounded text-sm text-forest-dark font-sans font-medium transition-all"
                >
                  <span className="w-5 h-5 flex items-center justify-center text-pink-600 font-bold bg-pink-100 rounded-full text-xs">📷</span>
                  Instagram
                </a>

                <a 
                  href={CONTACT_INFO.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-[#003580]/5 hover:bg-[#003580]/10 border border-[#003580]/20 hover:border-[#003580] rounded text-sm text-[#003580] font-sans font-medium transition-all"
                >
                  <span className="w-5 h-5 bg-[#003580] text-white flex items-center justify-center font-bold rounded-sm text-[10px]">B.</span>
                  Booking.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps embedded beautifully & Elegant Contact form */}
          <div className="w-full flex flex-col gap-10">
            
            {/* Elegant Map container */}
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-forest-light/10 bg-white">
              <div className="p-4 bg-forest-dark text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="font-sans text-xs uppercase tracking-widest text-gold-light font-bold">Planuj dojazd do Mrągowa</span>
                </div>
                <span className="font-sans text-[10px] text-white/50">Młodkowskiego 24</span>
              </div>
              
              {/* Embed Google Map with the raw iframe supplied inside strict aspect ratio box */}
              <div className="w-full aspect-video min-h-[350px] relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.738878528797!2d21.292541977179468!3d53.883070034428634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e2176325228a55%3A0xbff71fa972c737f7!2sM%C5%82odkowskiego%2024%2C%2011-700%20Mr%C4%85gowo!5e0!3m2!1spl!2spl!4v1780486902486!5m2!1spl!2spl" 
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokalizacja Gościniec Zielony Domek"
                ></iframe>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Footer Section (Stopka) */}
      <footer className="bg-forest-dark text-white pt-16 pb-8 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 pb-12 border-b border-white/5">
          
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-wide text-gold">Zielony Domek</span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mt-0.5 mb-5 block">Gościniec Mazurski</span>
            <p className="font-sans text-xs text-cream-light/60 font-light leading-relaxed max-w-sm">
              Sielskie gniazdo u brzegu jeziora w Mrągowie. Przytulne pokoje, prywatny pomost, lasy mazurskie i relaks w atmosferze domowego ogniska. Sprzęt wodny do dyspozycji.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold mb-5 uppercase">Szybkie Linki</h4>
            <div className="grid grid-cols-2 gap-3">
              <a href="#o-nas" className="font-sans text-xs text-cream-light/75 hover:text-gold transition-colors">O nas</a>
              <a href="#udogodnienia" className="font-sans text-xs text-cream-light/75 hover:text-gold transition-colors">Udogodnienia</a>
              <a href="#galeria" className="font-sans text-xs text-cream-light/75 hover:text-gold transition-colors">Galeria zdjęć</a>
              <a href="#opinie" className="font-sans text-xs text-cream-light/75 hover:text-gold transition-colors">Opinie gości</a>
              <a href="#kontakt" className="font-sans text-xs text-cream-light/75 hover:text-gold transition-colors">Kontakt i Dojazd</a>
              <a href={CONTACT_INFO.booking} target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-gold flex items-center gap-1 hover:underline">
                Rezerwuj na Booking
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold mb-5 uppercase font-sans">Kontakt bezpośredni</h4>
            <p className="font-sans text-xs text-cream-light/75 mb-2 flex items-center gap-2">
              <span className="text-gold">Adres:</span> Młodkowskiego 24, 11-700 Mrągowo
            </p>
            <p className="font-sans text-xs text-cream-light/75 mb-2 flex items-center gap-2">
              <span className="text-gold">Telefon:</span> {CONTACT_INFO.phoneFormatted}
            </p>
            <p className="font-sans text-xs text-cream-light/75 mb-4 flex items-center gap-2">
              <span className="text-gold">E-mail:</span> {CONTACT_INFO.email}
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-white/50">
          <p>© {new Date().getFullYear()} Gościniec Zielony Domek. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>

      {/* Elegant Infinite Pure React Image Lightbox Module */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest-dark/95 backdrop-blur-md flex flex-col justify-between p-6 cursor-default"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Close indicator bar */}
            <div className="flex items-center justify-between text-white/70 max-w-7xl mx-auto w-full pt-4">
              <span className="font-sans text-xs font-semibold tracking-wider uppercase">
                Ujęcie {activePhotoIndex + 1} z {GALLERY_IMAGES.length} — {GALLERY_IMAGES[activePhotoIndex].title}
              </span>
              <button 
                onClick={() => setActivePhotoIndex(null)}
                className="p-3 bg-white/10 rounded-full hover:bg-gold hover:text-forest-dark text-white transition-all cursor-pointer"
                aria-label="Zamknij podgląd"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Interactive Stage with slide controls */}
            <div className="flex items-center justify-between max-w-7xl mx-auto w-full flex-grow my-4">
              
              {/* Prev button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : GALLERY_IMAGES.length - 1));
                }}
                className="p-3.5 bg-white/5 hover:bg-gold hover:text-forest-dark text-white/95 rounded-full transition-all cursor-pointer"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central image with fade transitions */}
              <div 
                className="relative max-w-5xl max-h-[70vh] flex items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()} // Keep lightbox open if image clicked
              >
                <img 
                  key={activePhotoIndex}
                  src={GALLERY_IMAGES[activePhotoIndex].url}
                  alt={GALLERY_IMAGES[activePhotoIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-w-[85vw] max-h-[65vh] md:max-h-[70vh] rounded-lg shadow-2xl object-contain border border-gold/15 select-none"
                />
              </div>

              {/* Next button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((prev) => (prev !== null && prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0));
                }}
                className="p-3.5 bg-white/5 hover:bg-gold hover:text-forest-dark text-white/95 rounded-full transition-all cursor-pointer"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Bottom narrative bar */}
            <div className="max-w-3xl mx-auto w-full text-center pb-8" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-serif text-xl md:text-2xl text-gold font-medium mb-2">
                {GALLERY_IMAGES[activePhotoIndex].title}
              </h3>
              <p className="font-sans text-sm text-cream-light/80 leading-relaxed font-light">
                {GALLERY_IMAGES[activePhotoIndex].description}
              </p>
              
              {/* Micro dot index navigation */}
              <div className="flex gap-2 justify-center mt-6">
                {GALLERY_IMAGES.map((img, i) => (
                  <button 
                    key={img.id}
                    onClick={() => setActivePhotoIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activePhotoIndex === i ? 'bg-gold w-6' : 'bg-white/20'
                    }`}
                    aria-label={`Przejdź do zdjęcia ${i + 1}`}
                  />
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
