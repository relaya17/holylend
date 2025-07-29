import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Contact: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        en: 'Contact Form',
        he: 'טופס יצירת קשר',
        ar: 'نموذج الاتصال',
        es: 'Formulario de Contacto'
      },
      description: {
        en: 'Use this form to request model bookings, get pricing information, or ask any questions about our services.',
        he: 'השתמש בטופס זה ליצירת קשר עם דוגמנים, קבלת מידע על מחירים, או שאלת שאלות על השירותים שלנו.',
        ar: 'استخدم هذا النموذج لطلب حجز العارضين، والحصول على معلومات الأسعار، أو طرح أي أسئلة حول خدماتنا.',
        es: 'Use este formulario para solicitar reservas de modelos, obtener información de precios, o hacer cualquier pregunta sobre nuestros servicios.'
      },
      thankYou: {
        en: 'Thank you!',
        he: 'תודה לך!',
        ar: 'شكراً لك!',
        es: '¡Gracias!'
      },
      successMessage: {
        en: 'Your message has been sent successfully. We will get back to you soon.',
        he: 'ההודעה שלך נשלחה בהצלחה. נחזור אליך בקרוב.',
        ar: 'تم إرسال رسالتك بنجاح. سنعود إليك قريباً.',
        es: 'Tu mensaje ha sido enviado exitosamente. Te responderemos pronto.'
      },
      fullName: {
        en: 'Full Name *',
        he: 'שם מלא *',
        ar: 'الاسم الكامل *',
        es: 'Nombre Completo *'
      },
      fullNamePlaceholder: {
        en: 'Enter your full name',
        he: 'הזן את שמך המלא',
        ar: 'أدخل اسمك الكامل',
        es: 'Ingresa tu nombre completo'
      },
      emailAddress: {
        en: 'Email Address *',
        he: 'כתובת אימייל *',
        ar: 'عنوان البريد الإلكتروني *',
        es: 'Dirección de Email *'
      },
      emailPlaceholder: {
        en: 'your.email@example.com',
        he: 'your.email@example.com',
        ar: 'your.email@example.com',
        es: 'your.email@example.com'
      },
      requestType: {
        en: 'Request Type *',
        he: 'סוג הבקשה *',
        ar: 'نوع الطلب *',
        es: 'Tipo de Solicitud *'
      },
      generalInquiry: {
        en: 'General Inquiry',
        he: 'בקשה כללית',
        ar: 'استفسار عام',
        es: 'Consulta General'
      },
      bookingRequest: {
        en: 'Model Booking Request',
        he: 'בקשת הזמנת דוגמן',
        ar: 'طلب حجز عارض',
        es: 'Solicitud de Reserva de Modelo'
      },
      pricingInfo: {
        en: 'Pricing Information',
        he: 'מידע על מחירים',
        ar: 'معلومات الأسعار',
        es: 'Información de Precios'
      },
      partnership: {
        en: 'Partnership Opportunity',
        he: 'הזדמנות לשותפות',
        ar: 'فرصة شراكة',
        es: 'Oportunidad de Asociación'
      },
      other: {
        en: 'Other',
        he: 'אחר',
        ar: 'أخرى',
        es: 'Otro'
      },
      subject: {
        en: 'Subject',
        he: 'נושא',
        ar: 'الموضوع',
        es: 'Asunto'
      },
      subjectPlaceholder: {
        en: 'What is this regarding?',
        he: 'במה מדובר?',
        ar: 'بخصوص ماذا؟',
        es: '¿De qué se trata?'
      },
      message: {
        en: 'Message *',
        he: 'פרטים נוספים *',
        ar: 'تفاصيل إضافية *',
        es: 'Detalles Adicionales *'
      },
      messagePlaceholder: {
        en: 'Tell us about your project, booking request, or inquiry...',
        he: 'כתוב כאן את הפרטים...',
        ar: 'اكتب التفاصيل هنا...',
        es: 'Escribe los detalles aquí...'
      },
      consent: {
        en: 'I agree to the processing of my personal data for the purpose of responding to my inquiry.',
        he: 'אני מסכים לעיבוד הנתונים האישיים שלי למטרת מענה לחקירה שלי.',
        ar: 'أوافق على معالجة بياناتي الشخصية لغرض الرد على استفساري.',
        es: 'Acepto el procesamiento de mis datos personales con el propósito de responder a mi consulta.'
      },
      sendMessage: {
        en: 'Send Message',
        he: 'שלח הודעה',
        ar: 'إرسال الرسالة',
        es: 'Enviar Mensaje'
      },
      additionalInfo: {
        en: 'Additional Contact Info',
        he: 'מידע נוסף ליצירת קשר',
        ar: 'معلومات الاتصال الإضافية',
        es: 'Información de Contacto Adicional'
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

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    document.addEventListener('DOMContentLoaded', checkLanguageMode);

    return () => {
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
      document.removeEventListener('DOMContentLoaded', checkLanguageMode);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate email sending
    const emailData = {
      to: 'info@holyland-models.com',
      from: formData.email,
      name: formData.name,
      subject: `Contact Form: ${formData.message.substring(0, 50)}...`,
      message: `
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}

This message was sent from the Holy Land Models contact form.
      `.trim()
    };
    
    console.log('Sending email:', emailData);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <section className="py-5" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="card shadow-lg border-0" style={{
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <div className="mb-4">
                    <span style={{ fontSize: '3rem' }}>📧</span>
                  </div>
                  <h2 className="mb-3 fw-bold" style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '2.5rem'
                  }}>
                    {getText('title')}
                  </h2>
                  <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
                    {getText('description')}
                  </p>
                </div>
                
                {showSuccess && (
                  <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible 
                         style={{ borderRadius: '15px', border: 'none' }}>
                    <div className="d-flex align-items-center">
                      <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>✅</span>
                      <div>
                        <strong>{getText('thankYou')}</strong> {getText('successMessage')}
                      </div>
                    </div>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="contactName">
                        <Form.Label className="fw-bold mb-2" style={{ color: '#2c3e50' }}>
                          {getText('fullName')}
                        </Form.Label>
                        <Form.Control 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={getText('fullNamePlaceholder')} 
                          required 
                          aria-required="true"
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            padding: '12px 16px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease'
                          }}
                          className="form-control:focus"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="contactEmail">
                        <Form.Label className="fw-bold mb-2" style={{ color: '#2c3e50' }}>
                          {getText('emailAddress')}
                        </Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={getText('emailPlaceholder')} 
                          required 
                          aria-required="true"
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            padding: '12px 16px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-5" controlId="contactMessage">
                    <Form.Label className="fw-bold mb-2" style={{ color: '#2c3e50' }}>
                      {getText('message')}
                    </Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={8} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={getText('messagePlaceholder')} 
                      required 
                      aria-required="true"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e9ecef',
                        padding: '16px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        resize: 'none'
                      }}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button 
                      type="submit" 
                      size="lg"
                      style={{
                        borderRadius: '15px',
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      className="btn-hover"
                      aria-label="Send Message"
                    >
                      <span style={{ marginRight: '8px' }}>📤</span>
                      {getText('sendMessage')}
                    </Button>
                  </div>
                </Form>

                <div className="mt-5 text-center">
                  <h5 className="mb-3 fw-bold" style={{ color: '#2c3e50' }}>
                    {getText('additionalInfo')}
                  </h5>
                  <div className="d-flex justify-content-center gap-4">
                    <div className="text-center">
                      <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📧</div>
                      <small className="text-muted">info@holyland-models.com</small>
                    </div>
                    <div className="text-center">
                      <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📞</div>
                      <small className="text-muted">+972-XX-XXXXXXX</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
