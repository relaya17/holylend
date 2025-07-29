import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const checkLanguageMode = () => {
      const lang = document.documentElement.getAttribute('lang') || 'en';
      setCurrentLanguage(lang);
    };

    checkLanguageMode();

    const observer = new MutationObserver(checkLanguageMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    document.addEventListener('languageChanged', handleLanguageChange as EventListener);

    return () => {
      observer.disconnect();
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      tagline: {
        en: 'Representing new faces from Israel to the world',
        he: 'מייצגים פנים חדשות מישראל לעולם',
        ar: 'نحن نمثل وجوهاً جديدة من إسرائيل للعالم',
        es: 'Representando nuevas caras de Israel al mundo'
      },
      allRightsReserved: {
        en: 'Holy Land Models. All rights reserved.',
        he: 'הולי לנד מודלס. כל הזכויות שמורות.',
        ar: 'هولي لاند مودلز. جميع الحقوق محفوظة.',
        es: 'Holy Land Models. Todos los derechos reservados.'
      },
      privacyPolicy: {
        en: 'Privacy Policy',
        he: 'מדיניות פרטיות',
        ar: 'سياسة الخصوصية',
        es: 'Política de Privacidad'
      },
      termsOfService: {
        en: 'Terms of Service',
        he: 'תנאי שימוש',
        ar: 'شروط الخدمة',
        es: 'Términos de Servicio'
      }
    };

    return translations[key]?.[currentLanguage] || translations[key]?.en || key;
  };

  return (
    <footer style={{ 
      backgroundColor: '#2c3e50', 
      color: 'white', 
      padding: '20px 0',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h3 style={{ color: 'white', marginBottom: '10px' }}>HOLY LAND MODELS</h3>
        <p style={{ color: '#bdc3c7', marginBottom: '10px' }}>
          {getText('tagline')}
        </p>
        <p style={{ color: '#bdc3c7', fontSize: '14px' }}>
          © {currentYear} {getText('allRightsReserved')}
        </p>
        <div style={{ marginTop: '10px' }}>
          <a href="/privacy.html" style={{ color: 'white', marginRight: '15px' }}>
            {getText('privacyPolicy')}
          </a>
          <a href="/terms.html" style={{ color: 'white' }}>
            {getText('termsOfService')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
