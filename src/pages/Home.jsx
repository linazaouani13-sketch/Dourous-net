import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, FileText, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CommonModules from '../components/CommonModules';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useAuth();
//add new fea
  const features = [
    {
      title: "Verified Teachers",
      desc: "Every educator on our platform undergoes a rigorous multi-step background and certification check to ensure top-quality instruction.",
      icon: <ShieldCheck size={22} />,
      colorClass: 'icon-circle-blue',
    },
    {
      title: "Flexible Booking",
      desc: "Schedule sessions that fit your lifestyle. Our intelligent calendar syncs across timezones for hassle-free learning on your own terms.",
      icon: <Calendar size={22} />,
      colorClass: 'icon-circle-blue',
    },
    {
      title: "PDF Homework Support",
      desc: "Upload assignments directly in PDF format. Teachers can annotate and provide real-time feedback on your specific schoolwork.",
      icon: <FileText size={22} />,
      colorClass: 'icon-circle-orange',
    },
  ];
// stats 
  const stats = [
    { value: "50k+", label: "ACTIVE STUDENTS" },
    { value: "1,200+", label: "EXPERT TEACHERS" },
    { value: "98%", label: "SUCCESS RATE" },
    { value: "24/7", label: "STUDENT SUPPORT" },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-surface)' }}>

      {/* ═══ HERO SECTION ═══ */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container-max">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }} className="grid-responsive">
            {/* Left: Text Content */}
            <div className="animate-fade-in-up" style={{ maxWidth: '560px' }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                backgroundColor: 'var(--color-secondary-50)',
                color: 'var(--color-secondary-600)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius-full)',
                marginBottom: '24px',
              }}>
                <Sparkles size={14} />
                SMARTER LEARNING EXPERIENCE
              </div>

              <h1 style={{
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--color-on-surface)',
                marginBottom: '24px',
              }}>
                Book expert teachers &<br />
                <span style={{ color: 'var(--color-primary-600)' }}>upload your homework</span>
              </h1>

              <p style={{
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'var(--color-on-surface-variant)',
                marginBottom: '32px',
                maxWidth: '480px',
              }}>
                Connect with top-tier educators worldwide. Personalize your learning path with direct feedback and seamless homework submissions in one platform.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {!user ? (
                  <Link to="/signup" className="btn-dark" style={{ padding: '14px 32px' }}>
                    Get Started
                  </Link>
                ) : (
                  <Link to="/dashboard" className="btn-dark" style={{ padding: '14px 32px' }}>
                    Go to Dashboard
                  </Link>
                )}
                <Link to="/teachers" className="btn-secondary" style={{ padding: '14px 32px' }}>
                  Browse Teachers
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="animate-fade-in-up delay-200 mobile-hide" style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--color-outline-variant)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop"
                  alt="Students collaborating"
                  style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ FEATURES SECTION ═══ */}
      <section id="about" style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: 'var(--color-surface-container-low)',
      }}>
        <div className="container-max" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--color-on-surface)',
            marginBottom: '12px',
          }}>
            Why Choose Dourous-Net?
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--color-on-surface-variant)',
            maxWidth: '520px',
            margin: '0 auto 56px',
            lineHeight: 1.6,
          }}>
            Everything you need for academic success, combined into a seamless digital classroom experience.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {features.map((feature, i) => (
              <div
                key={i}
                className="card-static animate-fade-in-up"
                style={{
                  padding: '32px 24px',
                  textAlign: 'left',
                  animationDelay: `${i * 150}ms`,
                  animationFillMode: 'both',
                }}
              >
                <div className={feature.colorClass} style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  marginBottom: '12px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--color-on-surface-variant)',
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: '80px', backgroundColor: 'var(--color-surface-container-low)' }}>
        <div className="container-max" style={{ textAlign: 'center' }}>
          <CommonModules title="Master CS Subjects" />
        </div>
      </section>

      {/* ═══ STATs SECTION ═══ */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="container-max">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            textAlign: 'center',
          }}>
            {stats.map((stat, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                <p style={{
                  fontSize: '40px',
                  fontWeight: 700,
                  color: 'var(--color-primary-600)',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                }}>
                  {stat.value}
                </p>
                <p className="label-caps" style={{ color: 'var(--color-outline)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
// done