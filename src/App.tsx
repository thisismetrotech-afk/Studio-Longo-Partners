import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, ChevronRight, Scale, ShieldCheck, Award, Clock, Facebook, Linkedin } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigation, NavigationProvider } from './NavigationContext';

// --- Components ---

const Navbar = () => {
  const { currentPage, navigateTo } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'studio', label: 'Lo Studio' },
    { id: 'avvocati', label: 'Avvocati' },
    { id: 'attivita', label: 'Aree di Attività' },
    { id: 'contatti', label: 'Contatti' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div 
          className="cursor-pointer group"
          onClick={() => navigateTo('home')}
        >
          <h1 className={`text-xl md:text-2xl font-serif tracking-widest transition-colors ${isScrolled ? 'text-legal-blue' : 'text-white'}`}>
            LONGO <span className="text-legal-gold">&</span> PARTNERS
          </h1>
          <p className={`text-[10px] uppercase tracking-[0.3em] font-sans transition-colors ${isScrolled ? 'text-slate-500' : 'text-slate-300'}`}>
            Studio Legale Catania
          </p>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id as any)}
              className={`text-sm uppercase tracking-widest font-medium transition-all relative py-2 group ${
                currentPage === link.id 
                  ? (isScrolled ? 'text-legal-blue' : 'text-white') 
                  : (isScrolled ? 'text-slate-600 hover:text-legal-blue' : 'text-slate-300 hover:text-white')
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-legal-gold transition-transform duration-300 origin-left ${currentPage === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </button>
          ))}
          <button 
            onClick={() => navigateTo('contatti')}
            className={`ml-4 px-6 py-2 text-xs uppercase tracking-widest font-bold transition-all border ${
              isScrolled 
                ? 'border-legal-blue text-legal-blue hover:bg-legal-blue hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-legal-blue'
            }`}
          >
            Consulenza
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-legal-blue' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-legal-blue' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl md:hidden py-8 px-6 border-t border-slate-100"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-lg font-serif text-left ${currentPage === link.id ? 'text-legal-gold' : 'text-legal-blue'}`}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  navigateTo('contatti');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-4 bg-legal-blue text-white font-bold uppercase tracking-widest text-sm"
              >
                Richiedi Consulenza
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const { navigateTo } = useNavigation();
  return (
    <footer className="bg-legal-blue text-white pt-20 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif tracking-widest">
            LONGO <span className="text-legal-gold">&</span> PARTNERS
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Eccellenza legale e tutela dei diritti dal 2000. Uno studio fondato sulla competenza, l'etica e la dedizione assoluta al cliente.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 text-slate-400 hover:text-legal-gold cursor-pointer transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 text-slate-400 hover:text-legal-gold cursor-pointer transition-colors" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-serif mb-6 text-legal-gold">Link Rapidi</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => navigateTo('studio')} className="hover:text-white transition-colors">Lo Studio</button></li>
            <li><button onClick={() => navigateTo('avvocati')} className="hover:text-white transition-colors">Avvocati</button></li>
            <li><button onClick={() => navigateTo('attivita')} className="hover:text-white transition-colors">Aree di Attività</button></li>
            <li><button onClick={() => navigateTo('contatti')} className="hover:text-white transition-colors">Contatti</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-serif mb-6 text-legal-gold">Aree di Attività</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li>Diritto Civile</li>
            <li>Diritto Societario</li>
            <li>Diritto Commerciale</li>
            <li>Diritto Assicurativo</li>
            <li>Infortunistica</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-serif mb-6 text-legal-gold">Contatti</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-legal-gold shrink-0" />
              <span>Via Francesco Fusto 12,<br />95128 Catania (CT)</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-legal-gold shrink-0" />
              <span>+39 095 1234567</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-legal-gold shrink-0" />
              <span>giuvan59@hotmail.com; salvolongo74@hotmail.it</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
        <p>© {new Date().getFullYear()} Studio Legale Longo & Partners. Tutti i diritti riservati.</p>
        <div className="flex space-x-6">
          <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
          <button onClick={() => navigateTo('cookie')} className="hover:text-white transition-colors">Cookie Policy</button>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => {
  const { navigateTo } = useNavigation();
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2070" 
            alt="Law Office"
            className="w-full h-full object-cover brightness-[0.3]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-legal-gold uppercase tracking-[0.4em] text-sm font-bold mb-6 block">Dal 2000 al vostro fianco</span>
            <h1 className="text-4xl md:text-7xl text-white font-serif mb-8 leading-tight">
              Studio Legale Longo <span className="text-legal-gold">&</span> Partners
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Esperienza consolidata, etica professionale e soluzioni su misura per la protezione dei vostri diritti e interessi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigateTo('contatti')}
                className="btn-primary w-full sm:w-auto bg-legal-gold hover:bg-amber-600"
              >
                Richiedi Consulenza
              </button>
              <button 
                onClick={() => navigateTo('studio')}
                className="btn-outline w-full sm:w-auto bg-slate-200 text-legal-blue border-slate-200 hover:bg-transparent hover:text-white"
              >
                Scopri lo Studio
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-legal-blue mb-8">
              Oltre ventisei anni di <span className="text-legal-gold">dedizione</span> alla giustizia.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Lo Studio Legale Longo & Partners nasce a Catania con l'obiettivo di offrire un'assistenza legale di alto profilo, coniugando la tradizione forense con un approccio moderno e dinamico.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Ogni caso è per noi unico. La nostra filosofia si basa sulla trasparenza, sull'ascolto attivo del cliente e sulla ricerca costante della strategia legale più efficace.
            </p>
            <button 
              onClick={() => navigateTo('studio')}
              className="flex items-center text-legal-blue font-bold uppercase tracking-widest text-sm group"
            >
              Approfondisci <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2070" 
                alt="Lawyer at desk"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-legal-blue p-8 text-white hidden md:block">
              <p className="text-4xl font-serif text-legal-gold mb-1">26+</p>
              <p className="text-xs uppercase tracking-widest font-bold">Anni di Esperienza</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-legal-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-legal-gold uppercase tracking-widest text-xs font-bold mb-4 block">Competenze</span>
            <h2 className="text-3xl md:text-5xl font-serif text-legal-blue">Aree di Attività</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Diritto Civile', icon: <Scale />, desc: 'Assistenza completa in materia di obbligazioni, contratti e proprietà.' },
              { title: 'Diritto Societario', icon: <ShieldCheck />, desc: 'Consulenza strategica per imprese e gestione contenziosi.' },
              { title: 'Diritto Commerciale', icon: <Award />, desc: 'Tutela nelle operazioni commerciali e contrattualistica d\'impresa.' },
              { title: 'Diritto Assicurativo', icon: <Clock />, desc: 'Gestione sinistri, polizze e risarcimento danni responsabilità civile.' },
              { title: 'Infortunistica', icon: <MapPin />, desc: 'Assistenza specializzata per infortuni sul lavoro e incidenti stradali.' },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 card-hover"
              >
                <div className="text-legal-gold mb-6 w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif text-legal-blue mb-4">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                <button 
                  onClick={() => navigateTo('attivita')}
                  className="text-xs uppercase tracking-widest font-bold text-legal-blue hover:text-legal-gold transition-colors"
                >
                  Scopri di più
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000" className="rounded-sm aspect-square object-cover" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1423592707957-3b212afa6733?auto=format&fit=crop&q=80&w=1000" className="rounded-sm aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=1000" className="rounded-sm aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000" className="rounded-sm aspect-square object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-legal-gold uppercase tracking-widest text-xs font-bold mb-4 block">Valori</span>
              <h2 className="text-3xl md:text-5xl font-serif text-legal-blue mb-8">Perché scegliere lo Studio Longo</h2>
              
              <div className="space-y-8">
                {[
                  { title: 'Esperienza Consolidata', desc: 'Oltre 26 anni di attività nel settore legale con centinaia di casi risolti con successo.' },
                  { title: 'Professionalità ed Etica', desc: 'Operiamo nel massimo rispetto del codice deontologico, garantendo riservatezza e integrità.' },
                  { title: 'Approccio Personalizzato', desc: 'Ogni cliente riceve un\'attenzione dedicata e strategie legali costruite su misura.' },
                  { title: 'Affidabilità', desc: 'Siamo un punto di riferimento solido per la tutela dei vostri diritti, in ogni fase del contenzioso.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex space-x-4">
                    <div className="mt-1 text-legal-gold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif text-legal-blue mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lawyers Preview */}
      <section className="section-padding bg-legal-blue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-legal-gold uppercase tracking-widest text-xs font-bold mb-4 block">Il Team</span>
              <h2 className="text-3xl md:text-5xl font-serif">I Nostri Professionisti</h2>
            </div>
            <button 
              onClick={() => navigateTo('avvocati')}
              className="text-sm uppercase tracking-widest font-bold border-b border-legal-gold pb-1 hover:text-legal-gold transition-colors"
            >
              Vedi Tutti
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: 'Avv. Giovanni Longo', role: 'Fondatore & Senior Partner' },
              { name: 'Avv. Salvo Longo', role: 'Fondatore & Senior Partner' },
            ].map((lawyer, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => navigateTo('avvocati')}
              >
                <h3 className="text-2xl font-serif mb-2">{lawyer.name}</h3>
                <p className="text-legal-gold text-sm uppercase tracking-widest font-bold">{lawyer.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-legal-gold text-legal-blue text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-8">Pronti a tutelare i vostri interessi?</h2>
          <p className="text-lg mb-10 opacity-90">Contattateci oggi stesso per una consulenza preliminare. Il nostro team è a vostra completa disposizione.</p>
          <button 
            onClick={() => navigateTo('contatti')}
            className="bg-legal-blue text-white px-12 py-4 text-sm uppercase tracking-widest font-bold hover:bg-slate-800 transition-colors shadow-xl"
          >
            Richiedi Consulenza
          </button>
        </div>
      </section>
    </div>
  );
};

const StudioPage = () => {
  return (
    <div className="pt-32 pb-20">
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <span className="text-legal-gold uppercase tracking-widest text-xs font-bold mb-4 block">Chi Siamo</span>
          <h1 className="text-4xl md:text-6xl font-serif text-legal-blue mb-10">Lo Studio Legale</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Fondato nel 2000, lo Studio Legale Longo & Partners si è affermato come una delle realtà forensi più autorevoli di Catania. La nostra storia è caratterizzata da una crescita costante, alimentata dalla fiducia dei nostri clienti e dai successi ottenuti in ambito giudiziale e stragiudiziale.
              </p>
              <p>
                La nostra filosofia si fonda su tre pilastri fondamentali: <strong>Professionalità</strong>, <strong>Etica</strong> e <strong>Attenzione al Cliente</strong>. Crediamo che l'eccellenza legale non possa prescindere da un rapporto umano basato sulla fiducia reciproca e sulla trasparenza.
              </p>
            </div>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                La nostra missione è fornire soluzioni legali concrete e tempestive, minimizzando i rischi e massimizzando la tutela dei diritti dei nostri assistiti. Che si tratti di una complessa operazione societaria o di un contenzioso civile, il nostro approccio rimane lo stesso: rigoroso, analitico e orientato al risultato.
              </p>
              <p>
                Lo studio si avvale di tecnologie moderne per la gestione delle pratiche, garantendo un flusso di informazioni costante e sicuro con il cliente, pur mantenendo intatto il prestigio e la solennità della tradizione legale.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="aspect-video w-full mb-24 rounded-sm overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
            alt="Office Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'La Nostra Mission', desc: 'Proteggere i diritti e gli interessi dei nostri clienti attraverso un\'assistenza legale d\'eccellenza, basata su competenza tecnica e integrità morale.' },
            { title: 'Visione Strategica', desc: 'Anticipare le sfide legali in un mondo in continua evoluzione, offrendo consulenze lungimiranti che creano valore e sicurezza nel tempo.' },
            { title: 'Valori Fondanti', desc: 'Trasparenza, lealtà, dedizione e costante aggiornamento professionale sono il cuore pulsante di ogni nostra azione.' },
          ].map((item, idx) => (
            <div key={idx} className="p-8 border border-slate-100 bg-slate-50">
              <h3 className="text-xl font-serif text-legal-blue mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const AvvocatiPage = () => {
  return (
    <div className="pt-32 pb-20">
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-legal-gold uppercase tracking-widest text-xs font-bold mb-4 block">Il Team</span>
          <h1 className="text-4xl md:text-6xl font-serif text-legal-blue mb-6">I Nostri Professionisti</h1>
          <p className="text-slate-500 text-xl max-w-2xl">Un team di esperti legali pronti a mettere la propria competenza al vostro servizio.</p>
        </div>

        <div className="space-y-32">
          {/* Giovanni Longo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000" 
                  alt="Avv. Giovanni Longo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-3xl font-serif text-legal-blue mb-2">Avv. Giovanni Longo</h2>
              <p className="text-legal-gold uppercase tracking-widest font-bold text-sm">Fondatore & Senior Partner</p>
            </motion.div>
            
            <div className="space-y-12">
              <section>
                <h3 className="text-xl font-serif text-legal-blue mb-4 border-b border-slate-200 pb-2">Biografia</h3>
                <p className="text-slate-600 leading-relaxed">
                  L'Avv. Giovanni Longo vanta un'esperienza ultraventennale nel campo del diritto civile e societario. Fondatore dello studio nel 2000, ha dedicato la sua carriera alla tutela di imprese e privati, diventando un punto di riferimento nel panorama legale siciliano. La sua profonda conoscenza della materia e la sua capacità analitica gli permettono di affrontare anche i contenziosi più complessi con estrema efficacia.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-serif text-legal-blue mb-4 border-b border-slate-200 pb-2">Formazione e Specializzazioni</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-legal-gold mt-1 shrink-0 mr-2" />
                    <span>Laurea in Giurisprudenza con lode presso l'Università degli Studi di Catania.</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-legal-gold mt-1 shrink-0 mr-2" />
                    <span>Master in Diritto Societario e Governance d'Impresa.</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-legal-gold mt-1 shrink-0 mr-2" />
                    <span>Iscritto all'Albo degli Avvocati di Catania dal 1998.</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-legal-gold mt-1 shrink-0 mr-2" />
                    <span>Abilitato al patrocinio dinanzi alle Magistrature Superiori.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-serif text-legal-blue mb-4 border-b border-slate-200 pb-2">Aree di Competenza</h3>
                <div className="flex flex-wrap gap-3">
                  {['Diritto Civile', 'Diritto Societario', 'Contrattualistica', 'Contenzioso Agrario', 'Successioni'].map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs uppercase tracking-widest font-bold">{tag}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Salvo Longo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-2 sticky top-32"
            >
              <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000" 
                  alt="Avv. Salvo Longo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-3xl font-serif text-legal-blue mb-2">Avv. Salvo Longo</h2>
              <p className="text-legal-gold uppercase tracking-widest font-bold text-sm">Partner</p>
            </motion.div>
            
            <div className="lg:order-1 space-y-12">
              <section>
                <h3 className="text-xl font-serif text-legal-blue mb-4 border-b border-slate-200 pb-2">Biografia</h3>
                <p className="text-slate-600 leading-relaxed">
                  L'Avv. Salvo Longo si occupa prevalentemente di diritto commerciale, assicurativo e infortunistica. Con un approccio dinamico e orientato alla risoluzione pratica dei problemi, assiste i clienti sia nella fase di consulenza preventiva che in quella del contenzioso. La sua attenzione ai dettagli e la costante ricerca dell'aggiornamento normativo lo rendono un professionista affidabile e preparato.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-serif text-legal-blue mb-4 border-b border-slate-200 pb-2">Formazione</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-legal-gold mt-1 shrink-0 mr-2" />
                    <span>Laurea in Giurisprudenza presso l'Università degli Studi di Catania.</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-legal-gold mt-1 shrink-0 mr-2" />
                    <span>Specializzazione in Diritto delle Assicurazioni.</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-legal-gold mt-1 shrink-0 mr-2" />
                    <span>Iscritto all'Albo degli Avvocati di Catania.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-serif text-legal-blue mb-4 border-b border-slate-200 pb-2">Competenze Principali</h3>
                <div className="flex flex-wrap gap-3">
                  {['Infortunistica Stradale', 'Diritto Commerciale', 'Recupero Crediti', 'Responsabilità Professionale', 'Diritto del Lavoro'].map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs uppercase tracking-widest font-bold">{tag}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AttivitaPage = () => {
  const areas = [
    {
      title: 'Diritto Civile',
      desc: 'Lo studio offre un\'assistenza completa in tutti i rami del diritto civile, con particolare attenzione alla tutela dei diritti della persona, della proprietà e dei contratti.',
      details: [
        'Obbligazioni e contrattualistica (redazione, revisione e risoluzione)',
        'Diritti reali, proprietà e possesso',
        'Responsabilità civile e risarcimento danni',
        'Diritto di famiglia e successioni',
        'Locazioni e condominio'
      ]
    },
    {
      title: 'Diritto Societario',
      desc: 'Forniamo consulenza strategica alle imprese, accompagnandole in ogni fase della loro vita, dalla costituzione alla gestione dei rapporti tra soci e organi sociali.',
      details: [
        'Costituzione di società e start-up',
        'Operazioni straordinarie (fusioni, scissioni, acquisizioni)',
        'Governance societaria e patti parasociali',
        'Responsabilità degli amministratori',
        'Contenzioso societario'
      ]
    },
    {
      title: 'Diritto Commerciale',
      desc: 'Tutela costante per le attività d\'impresa, garantendo sicurezza nelle operazioni commerciali e nella gestione dei rapporti di business nazionali e internazionali.',
      details: [
        'Contrattualistica d\'impresa (distribuzione, agenzia, franchising)',
        'Tutela della proprietà intellettuale e marchi',
        'Concorrenza sleale',
        'Recupero crediti stragiudiziale e giudiziale',
        'Procedure concorsuali e ristrutturazione del debito'
      ]
    },
    {
      title: 'Diritto Assicurativo',
      desc: 'Assistenza specializzata nei rapporti con le compagnie di assicurazione, garantendo la corretta interpretazione delle polizze e la massima tutela in caso di sinistro.',
      details: [
        'Analisi e interpretazione di polizze assicurative',
        'Gestione del contenzioso contro le compagnie',
        'Responsabilità civile auto e professionale',
        'Indennizzi per polizze vita e infortuni',
        'Tutela legale in sede di liquidazione danni'
      ]
    },
    {
      title: 'Infortunistica',
      desc: 'Un dipartimento dedicato al risarcimento del danno derivante da infortuni di ogni natura, con un approccio volto a garantire il giusto ristoro per il danno subito.',
      details: [
        'Infortuni sul lavoro e malattie professionali',
        'Incidenti stradali e nautici',
        'Responsabilità medica e malasanità',
        'Risarcimento danni per lesioni macropermanenti',
        'Assistenza medico-legale convenzionata'
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <span className="text-legal-gold uppercase tracking-widest text-xs font-bold mb-4 block">Servizi</span>
          <h1 className="text-4xl md:text-6xl font-serif text-legal-blue mb-6">Aree di Attività</h1>
          <p className="text-slate-500 text-xl max-w-3xl mx-auto">Offriamo una consulenza legale multidisciplinare, caratterizzata da un elevato grado di specializzazione e competenza.</p>
        </div>

        <div className="space-y-16">
          {areas.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 p-10 md:p-16 border border-slate-100 flex flex-col lg:flex-row gap-12"
            >
              <div className="lg:w-1/3">
                <h2 className="text-3xl font-serif text-legal-blue mb-6">{area.title}</h2>
                <div className="w-20 h-1 bg-legal-gold mb-6" />
                <p className="text-slate-600 leading-relaxed">{area.desc}</p>
              </div>
              <div className="lg:w-2/3">
                <h3 className="text-sm uppercase tracking-widest font-bold text-legal-blue mb-6">Ambiti di Intervento</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {area.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-slate-500 text-sm">
                      <ChevronRight className="w-4 h-4 text-legal-gold mt-0.5 shrink-0 mr-2" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const ContattiPage = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormStatus('submitting');
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => setFormStatus('success'))
      .catch(() => setFormStatus('error'));
  };

  return (
    <div className="pt-32 pb-20">
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-legal-gold uppercase tracking-widest text-xs font-bold mb-4 block">Contatti</span>
          <h1 className="text-4xl md:text-6xl font-serif text-legal-blue mb-6">Siamo a vostra disposizione</h1>
          <p className="text-slate-500 text-xl max-w-2xl">Contattateci per fissare un appuntamento o richiedere informazioni preliminari.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-serif text-legal-blue border-b border-slate-200 pb-2">Sede di Catania</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex items-start">
                  <MapPin className="w-5 h-5 text-legal-gold mr-3 shrink-0" />
                  <span>Via Francesco Fusto 12,<br />95128 Catania (CT)</span>
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-serif text-legal-blue border-b border-slate-200 pb-2">Recapiti</h3>
                <p className="text-slate-500 text-sm flex items-center mb-2">
                  <Phone className="w-5 h-5 text-legal-gold mr-3 shrink-0" />
                  <span>+39 095 1234567</span>
                </p>
                <p className="text-slate-500 text-sm flex items-center">
                  <Mail className="w-5 h-5 text-legal-gold mr-3 shrink-0" />
                  <span>giuvan59@hotmail.com; salvolongo74@hotmail.it</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-serif text-legal-blue border-b border-slate-200 pb-2">Orari di Ricevimento</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-500">
                <div>
                  <p className="font-bold text-legal-blue mb-1">Lunedì – Venerdì</p>
                  <p>Mattina: 09:00 – 12:00</p>
                  <p>Pomeriggio: 16:00 – 19:00</p>
                </div>
                <div>
                  <p className="font-bold text-legal-blue mb-1">Sabato – Domenica</p>
                  <p>Chiuso</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 italic pt-4">* Si riceve esclusivamente previo appuntamento telefonico.</p>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video w-full bg-slate-100 rounded-sm overflow-hidden relative group">
              <iframe
                src="https://maps.google.com/maps?q=Via+Francesco+Fusco+12,+95128+Catania+CT,+Italia&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-slate-200" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 p-10 border border-slate-100">
            <h3 className="text-2xl font-serif text-legal-blue mb-8">Inviaci un messaggio</h3>
            
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif text-legal-blue mb-4">Messaggio Inviato</h4>
                <p className="text-slate-500">Grazie per averci contattato. Vi risponderemo al più presto.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-sm uppercase tracking-widest font-bold text-legal-blue border-b border-legal-blue"
                >
                  Invia un altro messaggio
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-slate-500">Nome e Cognome</label>
                    <input required type="text" name="from_name" className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:border-legal-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-slate-500">Email</label>
                    <input required type="email" name="reply_to" className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:border-legal-gold transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-500">Telefono</label>
                  <input type="tel" name="phone" className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:border-legal-gold transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-500">Messaggio</label>
                  <textarea required rows={5} name="message" className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:border-legal-gold transition-colors resize-none"></textarea>
                </div>
                <div className="flex items-start space-x-3 mb-6">
                  <input required type="checkbox" className="mt-1" id="privacy" />
                  <label htmlFor="privacy" className="text-xs text-slate-400 leading-relaxed">
                    Dichiaro di aver letto l'informativa sulla privacy e acconsento al trattamento dei miei dati personali per le finalità indicate.
                  </label>
                </div>
                {formStatus === 'error' && (
                  <p className="text-red-500 text-sm">Errore durante l'invio. Riprova o contattaci direttamente via email.</p>
                )}
                <button
                  disabled={formStatus === 'submitting'}
                  type="submit"
                  className="w-full bg-legal-blue text-white py-4 text-sm uppercase tracking-widest font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? 'Invio in corso...' : 'Invia Messaggio'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <span className="text-legal-gold uppercase tracking-widest text-xs font-bold mb-4 block">Legale</span>
      <h1 className="text-4xl md:text-5xl font-serif text-legal-blue mb-10">Privacy Policy</h1>
      <p className="text-slate-500 text-sm mb-10">Ultimo aggiornamento: aprile 2026</p>

      <div className="space-y-10 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">1. Titolare del Trattamento</h2>
          <p>Il Titolare del trattamento dei dati personali è lo Studio Legale Longo &amp; Partners, con sede in Via Francesco Fusto 12, 95128 Catania (CT), email: giuvan59@hotmail.com; salvolongo74@hotmail.it.</p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">2. Tipologie di Dati Raccolti</h2>
          <p>Lo Studio raccoglie i seguenti dati personali:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Dati identificativi (nome, cognome)</li>
            <li>Dati di contatto (indirizzo email, numero di telefono)</li>
            <li>Dati di navigazione (indirizzo IP, tipo di browser, pagine visitate)</li>
            <li>Dati forniti volontariamente tramite il modulo di contatto</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">3. Finalità e Base Giuridica del Trattamento</h2>
          <p>I dati personali sono trattati per le seguenti finalità:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong>Risposta alle richieste di contatto</strong> – base giuridica: esecuzione di misure precontrattuali (art. 6, par. 1, lett. b GDPR)</li>
            <li><strong>Adempimenti legali e fiscali</strong> – base giuridica: obbligo legale (art. 6, par. 1, lett. c GDPR)</li>
            <li><strong>Analisi statistica del sito</strong> – base giuridica: legittimo interesse (art. 6, par. 1, lett. f GDPR)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">4. Modalità di Trattamento e Conservazione</h2>
          <p>I dati sono trattati con strumenti informatici e cartacei, adottando misure di sicurezza adeguate a prevenire accessi non autorizzati, perdite o divulgazioni illecite. I dati di contatto sono conservati per il tempo strettamente necessario alla gestione della richiesta e, ove applicabile, per il periodo imposto dagli obblighi legali (massimo 10 anni).</p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">5. Comunicazione e Diffusione dei Dati</h2>
          <p>I dati personali non sono diffusi a terzi, salvo nei casi in cui ciò sia necessario per adempiere ad obblighi di legge o per fornire i servizi richiesti. I dati possono essere comunicati a collaboratori dello Studio, fornitori di servizi IT e professionisti incaricati, tutti vincolati a obblighi di riservatezza.</p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">6. Diritti dell'Interessato</h2>
          <p>In conformità agli artt. 15-22 del GDPR, l'utente ha il diritto di:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Accedere ai propri dati personali</li>
            <li>Ottenerne la rettifica o la cancellazione</li>
            <li>Richiedere la limitazione del trattamento</li>
            <li>Opporsi al trattamento</li>
            <li>Richiedere la portabilità dei dati</li>
            <li>Revocare il consenso in qualsiasi momento</li>
            <li>Proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali (www.garanteprivacy.it)</li>
          </ul>
          <p className="mt-4">Per esercitare tali diritti, è possibile contattare il Titolare agli indirizzi email: giuvan59@hotmail.com; salvolongo74@hotmail.it.</p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">7. Modifiche alla Privacy Policy</h2>
          <p>Lo Studio si riserva il diritto di apportare modifiche alla presente informativa. Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.</p>
        </section>
      </div>
    </div>
  );
};

const CookiePolicyPage = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <span className="text-legal-gold uppercase tracking-widest text-xs font-bold mb-4 block">Legale</span>
      <h1 className="text-4xl md:text-5xl font-serif text-legal-blue mb-10">Cookie Policy</h1>
      <p className="text-slate-500 text-sm mb-10">Ultimo aggiornamento: aprile 2026</p>

      <div className="space-y-10 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">1. Cosa sono i Cookie</h2>
          <p>I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al suo terminale (computer, tablet, smartphone), dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva. I cookie permettono al sito di riconoscere il dispositivo dell'utente e di ricordare determinate informazioni sulle sue preferenze o azioni precedenti.</p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">2. Tipologie di Cookie Utilizzati</h2>

          <h3 className="text-lg font-serif text-legal-blue mb-2 mt-6">Cookie Tecnici (necessari)</h3>
          <p>Sono indispensabili per il corretto funzionamento del sito. Senza questi cookie alcune parti del sito non potrebbero funzionare. Non raccolgono informazioni personali e non richiedono il consenso dell'utente.</p>

          <h3 className="text-lg font-serif text-legal-blue mb-2 mt-6">Cookie Analitici</h3>
          <p>Utilizzati per raccogliere informazioni aggregate e anonime sull'utilizzo del sito (pagine visitate, tempo di permanenza, ecc.). Tali dati vengono impiegati esclusivamente per migliorare l'esperienza di navigazione. Sono attivati solo previo consenso.</p>

          <h3 className="text-lg font-serif text-legal-blue mb-2 mt-6">Cookie di Profilazione / Marketing</h3>
          <p>Attualmente questo sito non utilizza cookie di profilazione o di tracciamento a fini pubblicitari.</p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">3. Cookie di Terze Parti</h2>
          <p>Il sito potrebbe contenere elementi provenienti da servizi di terze parti (es. mappe Google Maps, font Google Fonts) che potrebbero impostare cookie propri. Lo Studio non ha controllo su tali cookie e si rimanda alle rispettive privacy policy delle terze parti per maggiori informazioni.</p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">4. Gestione dei Cookie</h2>
          <p>L'utente può gestire le preferenze sui cookie direttamente tramite le impostazioni del proprio browser. Di seguito le istruzioni per i principali browser:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong>Google Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti</li>
            <li><strong>Mozilla Firefox:</strong> Impostazioni → Privacy e sicurezza → Cookie e dati dei siti web</li>
            <li><strong>Safari:</strong> Preferenze → Privacy → Gestisci dati sito web</li>
            <li><strong>Microsoft Edge:</strong> Impostazioni → Cookie e autorizzazioni del sito</li>
          </ul>
          <p className="mt-4">Si segnala che la disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.</p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">5. Durata dei Cookie</h2>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong>Cookie di sessione:</strong> vengono eliminati automaticamente alla chiusura del browser</li>
            <li><strong>Cookie persistenti:</strong> rimangono sul dispositivo per il periodo indicato nella loro configurazione, comunque non superiore a 24 mesi</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">6. Titolare del Trattamento</h2>
          <p>Studio Legale Longo &amp; Partners – Via Francesco Fusto 12, 95128 Catania (CT)<br />Email: giuvan59@hotmail.com; salvolongo74@hotmail.it</p>
          <p className="mt-4">Per qualsiasi richiesta relativa ai cookie è possibile contattarci all'indirizzo email sopra indicato.</p>
        </section>

        <section>
          <h2 className="text-xl font-serif text-legal-blue mb-4">7. Modifiche alla Cookie Policy</h2>
          <p>Lo Studio si riserva il diritto di aggiornare la presente Cookie Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.</p>
        </section>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'studio' && <StudioPage />}
            {currentPage === 'avvocati' && <AvvocatiPage />}
            {currentPage === 'attivita' && <AttivitaPage />}
            {currentPage === 'contatti' && <ContattiPage />}
            {currentPage === 'privacy' && <PrivacyPolicyPage />}
            {currentPage === 'cookie' && <CookiePolicyPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
