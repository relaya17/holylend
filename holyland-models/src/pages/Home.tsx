import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
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
        en: 'Representing new faces from Israel to the world.',
        he: 'מייצגים פנים חדשות מישראל לעולם.',
        ar: 'نحن نمثل وجوهاً جديدة من إسرائيل للعالم.',
        es: 'Representando nuevas caras de Israel al mundo.'
      },
      viewModels: {
        en: 'Discover Our Talent',
        he: 'גלה את הכישרון שלנו',
        ar: 'اكتشف مواهبنا',
        es: 'Descubre Nuestro Talento'
      },
      contactAgency: {
        en: 'Contact Agency',
        he: 'צור קשר עם הסוכנות',
        ar: 'تواصل مع الوكالة',
        es: 'Contactar Agencia'
      },
      discoverTalent: {
        en: 'Discover Israeli Talent',
        he: 'גלה כישרון ישראלי',
        ar: 'اكتشف المواهب الإسرائيلية',
        es: 'Descubre el Talento Israelí'
      },
      aboutText: {
        en: 'Holy Land Models showcases exceptional talent from Israel, connecting international agencies and clients with fresh faces and professional models ready for global opportunities.',
        he: 'הולי לנד מודלס מציגה כישרון יוצא דופן מישראל, מחברת סוכנויות בינלאומיות ולקוחות עם פנים חדשות ודוגמנים מקצועיים מוכנים להזדמנויות גלובליות.',
        ar: 'تقدم هولي لاند مودلز مواهب استثنائية من إسرائيل، وتربط الوكالات الدولية والعملاء بوجوه جديدة وعارضين محترفين مستعدين للفرص العالمية.',
        es: 'Holy Land Models presenta talento excepcional de Israel, conectando agencias internacionales y clientes con caras frescas y modelos profesionales listos para oportunidades globales.'
      },
      featuredModel: {
        en: 'Featured Model',
        he: 'דוגמן מוביל',
        ar: 'عارض مميز',
        es: 'Modelo Destacado'
      },
      featuredDesc: {
        en: 'Meet our featured talent making waves in the industry',
        he: 'הכר את הכישרון המוביל שלנו שעושה גלים בתעשייה',
        ar: 'تعرف على موهبتنا المميزة التي تحدث موجات في الصناعة',
        es: 'Conoce nuestro talento destacado que está causando sensación en la industria'
      },
      readyToWork: {
        en: 'Ready to Work with Israeli Talent?',
        he: 'מוכנים לעבוד עם כישרון ישראלי?',
        ar: 'هل أنت مستعد للعمل مع المواهب الإسرائيلية؟',
        es: '¿Listo para trabajar con talento israelí?'
      },
      workText: {
        en: 'Our models are available for international bookings, fashion shoots, commercial work, and special projects.',
        he: 'הדוגמנים שלנו זמינים להזמנות בינלאומיות, צילומי אופנה, עבודה מסחרית ופרויקטים מיוחדים.',
        ar: 'عارضونا متاحون للحجوزات الدولية، وجلسات التصوير الأزياء، والعمل التجاري، والمشاريع الخاصة.',
        es: 'Nuestros modelos están disponibles para reservas internacionales, sesiones de moda, trabajo comercial y proyectos especiales.'
      },
      browseModels: {
        en: 'Browse All Models',
        he: 'עיין בכל הדוגמנים',
        ar: 'تصفح جميع العارضين',
        es: 'Ver Todos los Modelos'
      },
      contactUs: {
        en: 'Contact Us',
        he: 'צור קשר',
        ar: 'تواصل معنا',
        es: 'Contáctanos'
      }
    };

    return translations[key]?.[currentLanguage] || translations[key]?.en || key;
  };

  return (
    <>
      <section 
        className="hero-section" 
        role="banner" 
        aria-label="Main Hero Area"
        style={{
          backgroundImage: 'url(/images/foto1.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {/* Overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}></div>
        
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-1 mb-4 brand-title">
                <span className="text-white fw-bold">HOLY LAND</span><br />
                <span className="text-light">MODELS</span>
              </h1>
              <p className="lead mb-5 tagline text-white">
                {getText('tagline')}
              </p>
              <div className="cta-buttons" role="group" aria-label="Main Actions">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="me-3 mb-3" 
                  onClick={() => navigate('/models')}
                  aria-label={getText('viewModels')}
                >
                  {getText('viewModels')}
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="mb-3" 
                  onClick={() => navigate('/contact')}
                  aria-label={getText('contactAgency')}
                >
                  {getText('contactAgency')}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light" role="region" aria-label="About Agency">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="mb-4">{getText('discoverTalent')}</h2>
              <p className="lead">
                {getText('aboutText')}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" role="region" aria-label="Featured Model">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-4 mb-3">{getText('featuredModel')}</h2>
              <p className="lead text-muted">{getText('featuredDesc')}</p>
            </Col>
          </Row>
          {/* Add featured model card here */}
        </Container>
      </section>
      
      <section className="py-5 bg-dark text-white" role="region" aria-label="Call to Action">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-4">{getText('readyToWork')}</h2>
              <p className="lead mb-4">
                {getText('workText')}
              </p>
              <div role="group" aria-label="Additional Actions">
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="mb-3" 
                  onClick={() => navigate('/contact')}
                  aria-label={getText('contactUs')}
                >
                  {getText('contactUs')}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
