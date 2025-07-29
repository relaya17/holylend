import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';

const ForAgencies: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [formData, setFormData] = useState({
    agencyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        en: 'For Agencies',
        he: 'לסוכנויות',
        ar: 'للوكالات',
        es: 'Para Agencias'
      },
      subtitle: {
        en: 'Discover Exceptional Israeli Talent',
        he: 'גלה כישרון ישראלי יוצא דופן',
        ar: 'اكتشف المواهب الإسرائيلية الاستثنائية',
        es: 'Descubre Talento Israelí Excepcional'
      },
      description: {
        en: 'We represent exceptional Israeli models ready for international opportunities. Our talent brings unique Middle Eastern aesthetics combined with professional experience.',
        he: 'אנו מייצגים דוגמנים ישראלים יוצאי דופן המוכנים להזדמנויות בינלאומיות. הכישרון שלנו מביא אסתטיקה מזרח תיכונית ייחודית בשילוב ניסיון מקצועי.',
        ar: 'نحن نمثل عارضين إسرائيليين استثنائيين مستعدين للفرص الدولية. موهبتنا تجلب جماليات شرق أوسطية فريدة مع الخبرة المهنية.',
        es: 'Representamos modelos israelíes excepcionales listos para oportunidades internacionales. Nuestro talento trae estética única del Medio Oriente combinada con experiencia profesional.'
      },
      featuredTalent: {
        en: 'Featured Talent',
        he: 'כישרון מוביל',
        ar: 'الموهبة المميزة',
        es: 'Talento Destacado'
      },
      avichaiName: {
        en: 'Avichai Lankri',
        he: 'אביחי לנקרי',
        ar: 'أفيتشاي لانكري',
        es: 'Avichai Lankri'
      },
      avichaiDescription: {
        en: '23-year-old professional model from Eilat, Israel. With over 2 years of experience, Avichai brings a unique look, charisma, and professionalism suited for fashion, commercial, and editorial campaigns.',
        he: 'דוגמן מקצועי בן 23 מאילת, ישראל. עם יותר משנתיים של ניסיון, אביחי מביא מראה ייחודי, כריזמה ומקצועיות המתאימים לתצוגות אופנה, פרסומות וקמפיינים עיתונאיים.',
        ar: 'عارض محترف يبلغ من العمر 23 عاماً من إيلات، إسرائيل. مع أكثر من عامين من الخبرة، يجلب أفيتشاي مظهراً فريداً وكاريزما ومهنية مناسبة لعروض الأزياء والإعلانات التجارية والحملات التحريرية.',
        es: 'Modelo profesional de 23 años de Eilat, Israel. Con más de 2 años de experiencia, Avichai trae una apariencia única, carisma y profesionalismo adecuados para desfiles de moda, comerciales y campañas editoriales.'
      },
      physicalDetails: {
        en: '📍 Based in Eilat, Israel | 1.88m | 71kg | Brown Eyes & Hair',
        he: '📍 מתגורר באילת, ישראל | 1.88מ | 71ק"ג | עיניים ושיער חום',
        ar: '📍 مقيم في إيلات، إسرائيل | 1.88م | 71كجم | عيون وشعر بني',
        es: '📍 Residente en Eilat, Israel | 1.88m | 71kg | Ojos y Cabello Marrón'
      },
      viewProfile: {
        en: "View Avichai's Full Profile",
        he: 'צפה בפרופיל המלא של אביחי',
        ar: 'عرض الملف الشخصي الكامل لأفيتشاي',
        es: 'Ver Perfil Completo de Avichai'
      },
      collaborationText: {
        en: 'Holy Land Models represents promising new talent from Israel, available for global fashion, commercial, and editorial campaigns.',
        he: 'הולי לנד מודלס מייצגת כישרונות מבטיחים חדשים מישראל, זמינים לקמפיינים גלובליים של אופנה, פרסומות ועיתונאות.',
        ar: 'هولي لاند مودلز تمثل مواهب واعدة جديدة من إسرائيل، متاحة لحملات الأزياء والإعلانات التجارية والتحريرية العالمية.',
        es: 'Holy Land Models representa talento prometedor nuevo de Israel, disponible para campañas globales de moda, comerciales y editoriales.'
      },
      welcomeText: {
        en: 'We welcome collaboration opportunities with agencies worldwide and are currently introducing our featured model:',
        he: 'אנו מברכים על הזדמנויות שיתוף פעולה עם סוכנויות ברחבי העולם ומציגים כעת את הדוגמן המוביל שלנו:',
        ar: 'نرحب بفرص التعاون مع الوكالات في جميع أنحاء العالم ونقدم حالياً عارضنا المميز:',
        es: 'Damos la bienvenida a oportunidades de colaboración con agencias de todo el mundo y actualmente presentamos nuestro modelo destacado:'
      },
      agencyContact: {
        en: 'If you represent an agency or brand and are interested in working with us, please get in touch or email us at:',
        he: 'אם אתה מייצג סוכנות או מותג ומעוניין לעבוד איתנו, אנא צור קשר או שלח לנו אימייל ל:',
        ar: 'إذا كنت تمثل وكالة أو علامة تجارية وتهتم بالعمل معنا، يرجى التواصل معنا أو إرسال بريد إلكتروني إلى:',
        es: 'Si representas una agencia o marca y estás interesado en trabajar con nosotros, por favor ponte en contacto o envíanos un correo electrónico a:'
      },
      emailPlaceholder: {
        en: '[your.email@example.com]',
        he: '[your.email@example.com]',
        ar: '[your.email@example.com]',
        es: '[your.email@example.com]'
      },
      experience: {
        en: 'Experience',
        he: 'ניסיון',
        ar: 'الخبرة',
        es: 'Experiencia'
      },
      years: {
        en: '2+ Years',
        he: '2+ שנים',
        ar: '2+ سنوات',
        es: '2+ Años'
      },
      specialties: {
        en: 'Specialties',
        he: 'התמחויות',
        ar: 'التخصصات',
        es: 'Especialidades'
      },
      fashion: {
        en: 'Fashion Shows',
        he: 'תצוגות אופנה',
        ar: 'عروض الأزياء',
        es: 'Desfiles de Moda'
      },
      commercial: {
        en: 'Commercial',
        he: 'פרסומות',
        ar: 'إعلانات تجارية',
        es: 'Comerciales'
      },
      editorial: {
        en: 'Editorial',
        he: 'עיתונאי',
        ar: 'تحريري',
        es: 'Editorial'
      },
      portfolio: {
        en: 'View Portfolio',
        he: 'צפה בפורטפוליו',
        ar: 'عرض المحفظة',
        es: 'Ver Portafolio'
      },
      services: {
        en: 'Our Services',
        he: 'השירותים שלנו',
        ar: 'خدماتنا',
        es: 'Nuestros Servicios'
      },
      fashionShows: {
        en: 'Fashion Shows',
        he: 'תצוגות אופנה',
        ar: 'عروض الأزياء',
        es: 'Desfiles de Moda'
      },
      photoShoots: {
        en: 'Photo Shoots',
        he: 'צילומים',
        ar: 'جلسات التصوير',
        es: 'Sesiones Fotográficas'
      },
      commercials: {
        en: 'Commercials',
        he: 'פרסומות',
        ar: 'الإعلانات التجارية',
        es: 'Comerciales'
      },
      events: {
        en: 'Events',
        he: 'אירועים',
        ar: 'الفعاليات',
        es: 'Eventos'
      },
      contactUs: {
        en: 'Contact Us',
        he: 'צור קשר',
        ar: 'اتصل بنا',
        es: 'Contáctanos'
      },
      agencyName: {
        en: 'Agency Name',
        he: 'שם הסוכנות',
        ar: 'اسم الوكالة',
        es: 'Nombre de la Agencia'
      },
      contactPerson: {
        en: 'Contact Person',
        he: 'איש קשר',
        ar: 'الشخص المسؤول',
        es: 'Persona de Contacto'
      },
      email: {
        en: 'Email',
        he: 'אימייל',
        ar: 'البريد الإلكتروني',
        es: 'Correo Electrónico'
      },
      phone: {
        en: 'Phone',
        he: 'טלפון',
        ar: 'الهاتف',
        es: 'Teléfono'
      },
      message: {
        en: 'Message',
        he: 'הודעה',
        ar: 'الرسالة',
        es: 'Mensaje'
      },
      send: {
        en: 'Send Message',
        he: 'שלח הודעה',
        ar: 'إرسال الرسالة',
        es: 'Enviar Mensaje'
      },
      successMessage: {
        en: 'Thank you! We will contact you soon.',
        he: 'תודה! נצור איתך קשר בקרוב.',
        ar: 'شكراً لك! سنتواصل معك قريباً.',
        es: '¡Gracias! Nos pondremos en contacto contigo pronto.'
      },
      lookingFor: {
        en: 'Looking for international collaborations, agency representation, and booking opportunities across Europe and the USA.',
        he: 'מחפשים שיתופי פעולה בינלאומיים, ייצוג סוכנויות והזדמנויות הזמנה ברחבי אירופה וארה"ב.',
        ar: 'نبحث عن تعاون دولي وتمثيل وكالات وفرص حجز في جميع أنحاء أوروبا والولايات المتحدة.',
        es: 'Buscamos colaboraciones internacionales, representación de agencias y oportunidades de reserva en Europa y Estados Unidos.'
      }
    };

    return translations[key]?.[currentLanguage] || translations[key]?.en || key;
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // כאן תהיה לוגיקה לשליחת הטופס
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setFormData({
      agencyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      message: ''
    });
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="for-agencies-page" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-dark mb-3">
                {getText('title')}
              </h1>
              <p className="lead text-muted mb-4">
                {getText('collaborationText')}
              </p>
              <p className="mb-4">
                {getText('welcomeText')}
              </p>
            </div>

            <Row className="mb-5">
              <Col lg={8} className="mx-auto">
                <div className="text-center mb-5">
                  <h2 className="h3 mb-4">{getText('featuredTalent')}</h2>
                  
                  <Card className="border-0 shadow-lg mb-4">
                    <Row className="g-0">
                      <Col md={4}>
                        <div className="talent-photo" style={{
                          backgroundImage: 'url(/images/foto24.jpeg)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          height: '300px',
                          borderRadius: '15px 0 0 15px'
                        }}></div>
                      </Col>
                      <Col md={8}>
                        <Card.Body className="p-4">
                          <h3 className="h4 mb-3">{getText('avichaiName')}</h3>
                          <p className="text-muted mb-4">{getText('avichaiDescription')}</p>
                          <p className="text-muted mb-4">{getText('physicalDetails')}</p>
                          
                          <Row className="mb-3">
                            <Col sm={6}>
                              <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-clock text-primary me-2"></i>
                                <span className="fw-bold">{getText('experience')}:</span>
                                <span className="ms-2">{getText('years')}</span>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-map-marker-alt text-primary me-2"></i>
                                <span>Eilat, Israel</span>
                              </div>
                            </Col>
                          </Row>
                          
                          <div className="mb-3">
                            <h6 className="fw-bold mb-2">{getText('specialties')}:</h6>
                            <div className="d-flex flex-wrap gap-2">
                              <span className="badge bg-primary">{getText('fashion')}</span>
                              <span className="badge bg-primary">{getText('commercial')}</span>
                              <span className="badge bg-primary">{getText('editorial')}</span>
                            </div>
                          </div>
                          
                          <Button 
                            variant="dark" 
                            size="lg"
                            className="mb-3"
                            onClick={() => window.open('/models/avichai', '_blank')}
                          >
                            <i className="fas fa-eye me-2"></i>
                            {getText('viewProfile')}
                          </Button>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                  
                  <hr className="my-4" />
                  
                  <p className="lead text-muted">{getText('lookingFor')}</p>
                  
                  <div className="mt-4">
                    <p className="mb-3">
                      {getText('agencyContact')}
                    </p>
                    <p className="fw-bold text-primary">
                      {getText('emailPlaceholder')}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col md={6}>
                <div className="h-100">
                  <h3 className="h4 mb-4">{getText('description')}</h3>
                  
                  <div className="services-grid">
                    <Card className="service-card h-100 border-0 shadow-sm">
                      <Card.Body className="text-center p-4">
                        <div className="service-icon mb-3">
                          <i className="fas fa-catwalk fa-2x text-primary"></i>
                        </div>
                        <h5 className="card-title">{getText('fashionShows')}</h5>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </Col>
              
              <Col md={6}>
                <div className="services-grid">
                  <Row>
                    <Col sm={6} className="mb-3">
                      <Card className="service-card h-100 border-0 shadow-sm">
                        <Card.Body className="text-center p-3">
                          <div className="service-icon mb-2">
                            <i className="fas fa-camera fa-lg text-primary"></i>
                          </div>
                          <h6 className="card-title">{getText('photoShoots')}</h6>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={6} className="mb-3">
                      <Card className="service-card h-100 border-0 shadow-sm">
                        <Card.Body className="text-center p-3">
                          <div className="service-icon mb-2">
                            <i className="fas fa-tv fa-lg text-primary"></i>
                          </div>
                          <h6 className="card-title">{getText('commercials')}</h6>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={6} className="mb-3">
                      <Card className="service-card h-100 border-0 shadow-sm">
                        <Card.Body className="text-center p-3">
                          <div className="service-icon mb-2">
                            <i className="fas fa-calendar-alt fa-lg text-primary"></i>
                          </div>
                          <h6 className="card-title">{getText('events')}</h6>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={6} className="mb-3">
                      <Card className="service-card h-100 border-0 shadow-sm">
                        <Card.Body className="text-center p-3">
                          <div className="service-icon mb-2">
                            <i className="fas fa-star fa-lg text-primary"></i>
                          </div>
                          <h6 className="card-title">VIP</h6>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg={8}>
                <Card className="border-0 shadow">
                  <Card.Body className="p-5">
                    <h3 className="text-center mb-4">{getText('contactUs')}</h3>
                    <p className="text-center text-muted mb-4">
                      Interested in representing Avichai or collaborating with Holy Land Models? 
                      We'd love to hear from you.
                    </p>
                    
                    {showSuccess && (
                      <Alert variant="success" className="mb-4">
                        {getText('successMessage')}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>{getText('agencyName')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="agencyName"
                              value={formData.agencyName}
                              onChange={handleInputChange}
                              required
                              placeholder="Your agency name"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>{getText('contactPerson')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="contactPerson"
                              value={formData.contactPerson}
                              onChange={handleInputChange}
                              required
                              placeholder="Your name"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>{getText('email')}</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="your.email@agency.com"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>{getText('phone')}</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              placeholder="+1-234-567-8900"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>{getText('message')}</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          placeholder="Tell us about your interest in Avichai or potential collaboration opportunities..."
                        />
                      </Form.Group>
                      
                      <div className="text-center">
                        <Button 
                          type="submit" 
                          variant="primary" 
                          size="lg"
                          className="px-5"
                        >
                          <i className="fas fa-paper-plane me-2"></i>
                          {getText('send')}
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <style>{`
        .for-agencies-page {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          min-height: 100vh;
        }
        
        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 15px;
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        
        .service-icon {
          color: #007bff;
        }
        
        .card-title {
          font-weight: 600;
          color: #495057;
        }
        
        .shadow {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        
        .shadow-sm {
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
        }
      `}</style>
    </div>
  );
};

export default ForAgencies;