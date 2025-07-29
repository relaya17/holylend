import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Models: React.FC = () => {
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
      title: {
        en: 'Our Models',
        he: 'הדוגמנים שלנו',
        ar: 'عارضونا',
        es: 'Nuestros Modelos'
      },
      description: {
        en: 'Meet our talented roster of professional models from Israel, ready for international opportunities and collaborations.',
        he: 'הכר את הרשימה המוכשרת שלנו של דוגמנים מקצועיים מישראל, מוכנים להזדמנויות בינלאומיות ושיתופי פעולה.',
        ar: 'تعرف على قائمة مواهبنا من العارضين المحترفين من إسرائيل، المستعدين للفرص الدولية والتعاون.',
        es: 'Conoce nuestro talentoso elenco de modelos profesionales de Israel, listos para oportunidades internacionales y colaboraciones.'
      },
      viewProfile: {
        en: 'View Profile',
        he: 'צפה בפרופיל',
        ar: 'عرض الملف الشخصي',
        es: 'Ver Perfil'
      },
      featured: {
        en: 'Featured',
        he: 'מוביל',
        ar: 'مميز',
        es: 'Destacado'
      },
      years: {
        en: 'years',
        he: 'שנים',
        ar: 'سنوات',
        es: 'años'
      },
      modelDesc: {
        en: 'A confident and versatile talent from {location}. Professional model with natural charisma...',
        he: 'כישרון בטוח ורב-גוני מ{location}. דוגמן מקצועי עם כריזמה טבעית...',
        ar: 'موهبة واثقة ومتعددة الاستخدامات من {location}. عارض محترف مع كاريزما طبيعية...',
        es: 'Un talento confiado y versátil de {location}. Modelo profesional con carisma natural...'
      },
      height: {
        en: 'Height',
        he: 'גובה',
        ar: 'الطول',
        es: 'Altura'
      },
      weight: {
        en: 'Weight',
        he: 'משקל',
        ar: 'الوزن',
        es: 'Peso'
      },
      experience: {
        en: 'Experience',
        he: 'ניסיון',
        ar: 'الخبرة',
        es: 'Experiencia'
      },
      specialties: {
        en: 'Specialties',
        he: 'התמחויות',
        ar: 'التخصصات',
        es: 'Especialidades'
      },
      languages: {
        en: 'Languages',
        he: 'שפות',
        ar: 'اللغات',
        es: 'Idiomas'
      }
    };

    return translations[key]?.[currentLanguage] || translations[key]?.en || key;
  };

  // דוגמה לנתוני דוגמה, אפשר להחליף לדינמי או API
  const models = [
    {
      id: 'avichai',
      name: 'Avichai Lankri',
      location: 'Eilat, Israel',
      age: 23,
      height: '1.88m',
      weight: '71kg',
      experience: '5+ Years',
      specialties: ['Fashion', 'Commercial', 'Editorial', 'Advertising', 'Runway'],
      languages: ['Hebrew', 'English'],
      featured: true,
      achievements: ['Vogue Photoshoots', 'International Campaigns', 'Fashion Week Shows', 'Award-Winning Photographers'],
      socialMedia: {
        instagram: 'https://www.instagram.com/avichai_lankri',
        tiktok: 'https://www.tiktok.com/@avichai_lankri'
      }
    },
  ];

  return (
    <Container fluid className="px-0">
      {/* Hero Section */}
      <section className="py-5 bg-dark text-white" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-2 mb-4 fw-bold">{getText('title')}</h1>
              <p className="lead mb-0" style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                {getText('description')}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Models Grid */}
      <section className="py-5">
        <Container>
          <Row>
            {models.map(model => (
              <Col key={model.id} lg={8} xl={6} className="mb-5">
                <div className="card model-card h-100 shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <div className="model-card-image position-relative">
                    <img 
                      src="/images/foto11.jpeg" 
                      alt={`${model.name} - Model Photo`}
                      className="card-img-top"
                      style={{ 
                        height: '400px', 
                        objectFit: 'cover', 
                        objectPosition: 'center 20%',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                    {model.featured && (
                      <Badge 
                        bg="warning" 
                        className="position-absolute top-0 start-0 m-3"
                        style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                      >
                        {getText('featured')}
                      </Badge>
                    )}
                    <div className="card-overlay position-absolute bottom-0 start-0 end-0 p-4 text-center" 
                         style={{ 
                           background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                           color: 'white'
                         }}>
                      <Button 
                        variant="light" 
                        size="lg" 
                        onClick={() => navigate(`/models/${model.id}`)}
                        style={{ fontWeight: '600', borderRadius: '25px' }}
                      >
                        {getText('viewProfile')}
                      </Button>
                    </div>
                  </div>

                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div>
                        <h3 className="mb-2 fw-bold">{model.name}</h3>
                        <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
                          📍 {model.location}
                        </p>
                      </div>
                      <Badge bg="secondary" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                        {model.age} {getText('years')}
                      </Badge>
                    </div>

                    <p className="text-muted mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                      {getText('modelDesc').replace('{location}', model.location)}
                    </p>

                    {/* Stats Grid */}
                    <div className="row mb-4 text-center">
                      <div className="col-4">
                        <div className="stat-item">
                          <strong className="d-block" style={{ fontSize: '1.2rem', color: '#2c3e50' }}>{model.height}</strong>
                          <small className="text-muted">{getText('height')}</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="stat-item">
                          <strong className="d-block" style={{ fontSize: '1.2rem', color: '#2c3e50' }}>{model.weight}</strong>
                          <small className="text-muted">{getText('weight')}</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="stat-item">
                          <strong className="d-block" style={{ fontSize: '1.2rem', color: '#2c3e50' }}>{model.experience}</strong>
                          <small className="text-muted">{getText('experience')}</small>
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <small className="text-muted d-block mb-2 fw-bold">{getText('specialties')}:</small>
                      <div>
                        {model.specialties.map((spec) => (
                          <Badge 
                            key={spec} 
                            bg="light" 
                            text="dark" 
                            className="me-2 mb-2" 
                            style={{ 
                              border: '1px solid #dee2e6',
                              fontSize: '0.9rem',
                              padding: '0.5rem 0.8rem',
                              borderRadius: '20px'
                            }}
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <small className="text-muted d-block mb-2 fw-bold">{getText('languages')}:</small>
                      <div>
                        {model.languages.map(lang => (
                          <Badge 
                            key={lang} 
                            bg="info" 
                            className="me-2 mb-2"
                            style={{ 
                              fontSize: '0.9rem',
                              padding: '0.5rem 0.8rem',
                              borderRadius: '20px'
                            }}
                          >
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-grid gap-3">
                      <Button 
                        variant="dark" 
                        size="lg" 
                        onClick={() => navigate(`/models/${model.id}`)}
                        style={{ borderRadius: '25px', fontWeight: '600' }}
                      >
                        📋 {getText('viewProfile')}
                      </Button>
                      
                      {/* Social Media Links */}
                      {(model.socialMedia?.instagram || model.socialMedia?.tiktok) && (
                        <div className="d-flex gap-2">
                          {model.socialMedia?.instagram && (
                            <a 
                              href={model.socialMedia.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-outline-primary flex-fill"
                              style={{ borderRadius: '25px' }}
                            >
                              📷 Instagram
                            </a>
                          )}
                          {model.socialMedia?.tiktok && (
                            <a 
                              href={model.socialMedia.tiktok} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-outline-secondary flex-fill"
                              style={{ borderRadius: '25px' }}
                            >
                              🎵 TikTok
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            ))}

            {/* Coming Soon Card */}
            <Col lg={8} xl={6} className="mb-5">
              <div className="card h-100 border-2 border-dashed text-center d-flex flex-column justify-content-center align-items-center p-5" 
                   style={{ 
                     borderRadius: '15px',
                     background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                     borderColor: '#dee2e6'
                   }}>
                <div className="mb-4">
                  <span className="display-1 text-muted mb-3 d-block">✨</span>
                  <h4 className="text-muted mb-3">More Models Coming Soon</h4>
                  <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                    We're constantly discovering new talent from Israel
                  </p>
                </div>
                <Button 
                  variant="outline-dark" 
                  size="lg"
                  onClick={() => navigate('/contact')}
                  style={{ borderRadius: '25px', fontWeight: '600' }}
                >
                  💼 Suggest a Model
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Container>
  );
};

export default Models;
