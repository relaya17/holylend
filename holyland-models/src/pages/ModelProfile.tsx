import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';

interface ModelData {
  name: string;
  location: string;
  age: number;
  height: string;
  weight: string;
  shoeSize: string;
  hairColor: string;
  eyeColor: string;
  experience: string;
  specialties: string[];
  languages: string[];
  socialMedia?: {
    instagram?: string;
    tiktok?: string;
  };
}

const modelData: Record<string, ModelData> = {
  avichai: {
    name: 'Avichai Lankri',
    location: 'Eilat, Israel',
    age: 23,
    height: '1.88m',
    weight: '71kg',
    shoeSize: '46 (EU)',
    hairColor: 'Brown',
    eyeColor: 'Brown',
    experience: '5+ Years',
    specialties: ['Fashion', 'Commercial', 'Editorial', 'Advertising', 'Runway'],
    languages: ['Hebrew', 'English'],
    socialMedia: {
      instagram: 'https://www.instagram.com/avichai_lankri',
      tiktok: 'https://www.tiktok.com/@avichai_lankri'
    }
  },
  // ניתן להוסיף דוגמנים נוספים
};

const ModelProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const model = id ? modelData[id] : null;

  // Add image loading optimization
  useEffect(() => {
    const images = document.querySelectorAll('.portfolio-card img');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.onload = () => {
            img.classList.add('loaded');
          };
          img.onerror = () => {
            img.style.display = 'none';
            const fallback = img.nextElementSibling;
            if (fallback) {
              fallback.classList.remove('d-none');
              fallback.classList.add('d-flex');
            }
          };
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, []);

  if (!model) {
    return (
      <Container className="py-5">
        <h2>Model not found</h2>
        <Button onClick={() => navigate('/models')}>Back to Models</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate('/models')}>
        ← Back to Models
      </Button>

      {/* Hero Image Section */}
      <Row className="mb-5">
        <Col lg={12}>
          <div className="hero-image-container" style={{
            position: 'relative',
            height: '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <img
              src="/images/foto11.jpeg"
              alt={`${model.name} - Hero Image`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding: '40px',
              color: 'white'
            }}>
              <h1 className="display-3 mb-3 fw-bold">{model.name}</h1>
              <p className="lead mb-0" style={{ fontSize: '1.5rem', opacity: 0.9 }}>
                Professional Model from {model.location}
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <h1 className="display-4 mb-4">{model.name}</h1>
          <p className="lead mb-4">
            A confident and versatile talent from {model.location}. Professional model with natural charisma and international appeal.
          </p>

          <Row className="mb-5">
            <Col md={3} className="mb-3">
              <div className="card stat-card h-100 text-center p-3">
                <h3 className="display-6 mb-2">{model.height}</h3>
                <p className="text-muted mb-0">Height</p>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <div className="card stat-card h-100 text-center p-3">
                <h3 className="display-6 mb-2">{model.age}</h3>
                <p className="text-muted mb-0">Years Old</p>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <div className="card stat-card h-100 text-center p-3">
                <h3 className="display-6 mb-2">{model.weight}</h3>
                <p className="text-muted mb-0">Weight</p>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <div className="card stat-card h-100 text-center p-3">
                <h3 className="display-6 mb-2">{model.experience}</h3>
                <p className="text-muted mb-0">Experience</p>
              </div>
            </Col>
          </Row>

          <div className="mb-5">
            <h3 className="mb-3">Specialties & Expertise</h3>
            <div>
              {model.specialties.map((spec) => (
                <Badge key={spec} bg="dark" className="me-2 mb-2" style={{ fontSize: '0.9rem', padding: '0.6rem 0.8rem' }}>
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </Col>

        <Col lg={4}>
          <div className="card info-card">
            <div className="card-header">
              <h5 className="mb-0">Model Information</h5>
            </div>
            <div className="card-body">
              <div className="mb-3"><strong>Full Name:</strong> {model.name}</div>
              <div className="mb-3"><strong>Age:</strong> {model.age} years old</div>
              <div className="mb-3"><strong>Location:</strong> {model.location}</div>
              <div className="mb-3"><strong>Height:</strong> {model.height}</div>
              <div className="mb-3"><strong>Weight:</strong> {model.weight}</div>
              <div className="mb-3"><strong>Shoe Size:</strong> {model.shoeSize}</div>
              <div className="mb-3"><strong>Hair Color:</strong> {model.hairColor}</div>
              <div className="mb-3"><strong>Eye Color:</strong> {model.eyeColor}</div>
              <div className="mb-3"><strong>Experience:</strong> {model.experience}</div>

              <div className="mb-4">
                <strong>Languages:</strong>
                <div className="mt-2">
                  {model.languages.map(lang => (
                    <Badge key={lang} bg="secondary" className="me-2 mb-1">{lang}</Badge>
                  ))}
                </div>
              </div>

              <div className="d-grid gap-2">
                 <Button
                   variant="dark"
                   size="lg"
                   onClick={() => navigate('/contact')}
                   title="Book this model for photoshoots, fashion shows, or commercial work"
                 >
                   📞 Request Booking
                </Button>
                 <Button
                   variant="outline-dark"
                   onClick={() => navigate('/contact')}
                   title="Get more information about this model's availability and rates"
                 >
                   ℹ️ Get More Info
                </Button>

                 {/* Social Media Links */}
                 {(model.socialMedia?.instagram || model.socialMedia?.tiktok) && (
                   <div className="mt-3">
                     <h6 className="mb-2">Follow on Social Media</h6>
                     <div className="d-flex gap-2">
                       {model.socialMedia?.instagram && (
                         <a
                           href={model.socialMedia.instagram}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="btn btn-outline-primary btn-sm flex-fill social-media-links"
                           aria-label="Follow on Instagram"
                         >
                           📷 Instagram
                         </a>
                       )}
                       {model.socialMedia?.tiktok && (
                         <a
                           href={model.socialMedia.tiktok}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="btn btn-outline-secondary btn-sm flex-fill social-media-links"
                           aria-label="Follow on TikTok"
                         >
                           🎵 TikTok
                         </a>
                       )}
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Achievements Section */}
      <section className="py-5">
        <Container>
          <h3 className="mb-4">Industry Achievements</h3>
          <Row>
            <Col lg={12}>
              <div className="achievements-container" style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <Row>
                  <Col md={6} className="mb-4">
                    <div className="achievement-item" style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#007bff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                        marginRight: '15px'
                      }}>
                        📸
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold">Vogue Photoshoots</h6>
                        <p className="text-muted mb-0">Featured in prestigious fashion publications</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="achievement-item" style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#28a745',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                        marginRight: '15px'
                      }}>
                        🌍
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold">International Campaigns</h6>
                        <p className="text-muted mb-0">Global brand collaborations</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="achievement-item" style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#ffc107',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                        marginRight: '15px'
                      }}>
                        🎭
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold">Fashion Week Shows</h6>
                        <p className="text-muted mb-0">Runway appearances at major fashion events</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-4">
                    <div className="achievement-item" style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#dc3545',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                        marginRight: '15px'
                      }}>
                        🏆
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold">Award-Winning Photographers</h6>
                        <p className="text-muted mb-0">Collaborated with renowned photographers</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="py-5 bg-light">
        <Container>
          <h3 className="mb-4">Portfolio Gallery</h3>
          <Row>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto2.jpeg" 
                  alt="Avichai Lankri - Portfolio 1" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.add('d-flex');
                  }}
                  loading="lazy"
                />
                <div className="card-body d-none" style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div className="text-center">
                    <i className="fas fa-image fa-3x text-muted mb-3"></i>
                    <p className="text-muted">Image loading...</p>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="card-title">Fashion Editorial</h6>
                  <p className="card-text text-muted">Professional fashion photography</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto3.jpeg" 
                  alt="Avichai Lankri - Portfolio 2" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Commercial Work</h6>
                  <p className="card-text text-muted">Brand and product photography</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto4.jpeg" 
                  alt="Avichai Lankri - Portfolio 3" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Editorial Style</h6>
                  <p className="card-text text-muted">Magazine and editorial shoots</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto5.jpeg" 
                  alt="Avichai Lankri - Portfolio 4" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Lifestyle Photography</h6>
                  <p className="card-text text-muted">Natural and candid moments</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto6.jpeg" 
                  alt="Avichai Lankri - Portfolio 5" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Professional Headshots</h6>
                  <p className="card-text text-muted">Corporate and professional portraits</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto7.jpeg" 
                  alt="Avichai Lankri - Portfolio 6" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Creative Concepts</h6>
                  <p className="card-text text-muted">Artistic and creative photography</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto8.jpeg" 
                  alt="Avichai Lankri - Portfolio 7" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Professional Modeling</h6>
                  <p className="card-text text-muted">High-end fashion and modeling work</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto9.jpeg" 
                  alt="Avichai Lankri - Portfolio 8" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Portfolio Collection</h6>
                  <p className="card-text text-muted">Diverse modeling portfolio</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto10.jpeg" 
                  alt="Avichai Lankri - Portfolio 9" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Professional Portfolio</h6>
                  <p className="card-text text-muted">High-quality modeling work</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto12.jpeg" 
                  alt="Avichai Lankri - Portfolio 10" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Fashion Collection</h6>
                  <p className="card-text text-muted">Modern fashion photography</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto13.jpeg" 
                  alt="Avichai Lankri - Portfolio 11" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Editorial Collection</h6>
                  <p className="card-text text-muted">Magazine-style photography</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto16.jpeg" 
                  alt="Avichai Lankri - Portfolio 12" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Commercial Collection</h6>
                  <p className="card-text text-muted">Professional commercial work</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto22.jpeg" 
                  alt="Avichai Lankri - Portfolio 13" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Lifestyle Collection</h6>
                  <p className="card-text text-muted">Natural lifestyle photography</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto24.jpeg" 
                  alt="Avichai Lankri - Portfolio 14" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Creative Collection</h6>
                  <p className="card-text text-muted">Artistic and creative work</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto25.jpeg" 
                  alt="Avichai Lankri - Portfolio 15" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Professional Collection</h6>
                  <p className="card-text text-muted">High-end professional work</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto26.jpeg" 
                  alt="Avichai Lankri - Portfolio 16" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Fashion Portfolio</h6>
                  <p className="card-text text-muted">Contemporary fashion photography</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto27.jpeg" 
                  alt="Avichai Lankri - Portfolio 17" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Editorial Portfolio</h6>
                  <p className="card-text text-muted">Magazine editorial work</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card portfolio-card h-100">
                <img 
                  src="/images/foto29.jpeg" 
                  alt="Avichai Lankri - Portfolio 18" 
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className="card-body">
                  <h6 className="card-title">Commercial Portfolio</h6>
                  <p className="card-text text-muted">Professional commercial photography</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Container>
  );
};

export default ModelProfile;
