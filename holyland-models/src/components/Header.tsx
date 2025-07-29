import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      home: {
        en: 'Home',
        he: 'בית',
        ar: 'الرئيسية',
        es: 'Inicio'
      },
      ourModels: {
        en: 'Our Models',
        he: 'הדוגמנים שלנו',
        ar: 'عارضونا',
        es: 'Nuestros Modelos'
      },
      forAgencies: {
        en: 'For Agencies',
        he: 'לסוכנויות',
        ar: 'للوكالات',
        es: 'Para Agencias'
      },
      contact: {
        en: 'Contact',
        he: 'צור קשר',
        ar: 'اتصل بنا',
        es: 'Contacto'
      }
    };

    return translations[key]?.[currentLanguage] || translations[key]?.en || key;
  };

  useEffect(() => {
    const checkLanguageMode = () => {
      const lang = document.documentElement.getAttribute('lang') || 'en';
      setCurrentLanguage(lang);
      console.log('Header: Language mode changed to:', lang);
    };

    // בדוק מצב שפה בטעינה
    checkLanguageMode();

    // האזן לשינויים במצב שפה
    const observer = new MutationObserver(checkLanguageMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    // האזן לאירוע שינוי שפה
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
      console.log('Header: Language event received:', event.detail.language);
    };

    document.addEventListener('languageChanged', handleLanguageChange as EventListener);

    return () => {
      observer.disconnect();
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const handleNavClick = () => {
    // סגור את הנאבבר במובייל אחרי לחיצה על קישור
    const bsCollapse = document.querySelector('.navbar-collapse');
    if (bsCollapse && bsCollapse.classList.contains('show')) {
      // הסר את הקלאס show כדי לסגור את הנאבבר
      bsCollapse.classList.remove('show');
      
      // עדכן את aria-expanded של הטוגל
      const navbarToggler = document.querySelector('.navbar-toggler');
      if (navbarToggler) {
        navbarToggler.setAttribute('aria-expanded', 'false');
      }
    }
  };

  const changeLanguage = (language: string) => {
    document.documentElement.setAttribute('lang', language);
    
    // הגדר כיוון טקסט
    if (language === 'he' || language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-mode');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl-mode');
    }
    
    // הסר מצבי שפה קודמים
    document.body.classList.remove('hebrew-mode', 'arabic-mode', 'spanish-mode');
    
    // הוסף מצב שפה חדש
    if (language === 'he') {
      document.body.classList.add('hebrew-mode');
    } else if (language === 'ar') {
      document.body.classList.add('arabic-mode');
    } else if (language === 'es') {
      document.body.classList.add('spanish-mode');
    }
    
    setCurrentLanguage(language);
    
    // עדכן את כל האתר
    const event = new CustomEvent('languageChanged', { detail: { language } });
    document.dispatchEvent(event);
    
    console.log('Language changed to:', language);
  };

  const getLanguageName = (code: string) => {
    switch (code) {
      case 'en': return 'EN';
      case 'he': return 'עב';
      case 'ar': return 'عربي';
      case 'es': return 'ES';
      default: return 'EN';
    }
  };

  const getLanguageLabel = (code: string) => {
    switch (code) {
      case 'en': return 'English';
      case 'he': return 'עברית';
      case 'ar': return 'العربية';
      case 'es': return 'Español';
      default: return 'English';
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="elegant-navbar" role="navigation" aria-label="Main Navigation">
      <Container>
                 <LinkContainer to="/">
           <Navbar.Brand>
             <strong>HOLY LAND</strong> <span className="text-muted me-2">MODELS</span>
           </Navbar.Brand>
         </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-nav" aria-label="Open Navigation Menu" />
        <Navbar.Collapse id="navbar-nav">
                     <Nav className="me-auto">
             <LinkContainer to="/">
               <Nav.Link aria-label="Home" onClick={handleNavClick}>{getText('home')}</Nav.Link>
             </LinkContainer>
             <LinkContainer to="/models">
               <Nav.Link aria-label="Our Models" onClick={handleNavClick}>{getText('ourModels')}</Nav.Link>
             </LinkContainer>
             <LinkContainer to="/for-agencies">
               <Nav.Link aria-label="For Agencies" onClick={handleNavClick}>{getText('forAgencies')}</Nav.Link>
             </LinkContainer>
             <LinkContainer to="/contact">
               <Nav.Link aria-label="Contact" onClick={handleNavClick}>{getText('contact')}</Nav.Link>
             </LinkContainer>
           </Nav>
           
           <Nav>
             <Dropdown>
               <Dropdown.Toggle 
                 variant="outline-light" 
                 size="sm"
                 style={{
                   minWidth: '80px',
                   fontWeight: '600',
                   borderRadius: '20px',
                   transition: 'all 0.3s ease'
                 }}
               >
                 {getLanguageName(currentLanguage)}
               </Dropdown.Toggle>

               <Dropdown.Menu>
                 <Dropdown.Item onClick={() => changeLanguage('en')}>
                   🇺🇸 {getLanguageLabel('en')}
                 </Dropdown.Item>
                 <Dropdown.Item onClick={() => changeLanguage('he')}>
                   🇮🇱 {getLanguageLabel('he')}
                 </Dropdown.Item>
                 <Dropdown.Item onClick={() => changeLanguage('ar')}>
                   🇸🇦 {getLanguageLabel('ar')}
                 </Dropdown.Item>
                 <Dropdown.Item onClick={() => changeLanguage('es')}>
                   🇪🇸 {getLanguageLabel('es')}
                 </Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
           </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
