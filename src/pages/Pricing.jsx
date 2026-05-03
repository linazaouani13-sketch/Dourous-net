import React from 'react';
import { Check, Zap, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      description: "Perfect for students getting started with online learning.",
      features: [
        "1 Free trial session",
        "Access to browse teachers",
        "Basic study materials",
        "Standard support"
      ],
      icon: <Star size={22} />,
      iconBg: 'var(--color-surface-container)',
      iconColor: 'var(--color-outline)',
      buttonText: "Start for free",
      popular: false
    },
    {
      name: "Premium",
      price: "49",
      description: "The most popular choice for regular academic support.",
      features: [
        "10 Sessions per month",
        "Priority teacher booking",
        "Advanced study materials",
        "24/7 Priority support",
        "Monthly progress reports"
      ],
      icon: <Zap size={22} />,
      iconBg: 'var(--color-primary-50)',
      iconColor: 'var(--color-primary-600)',
      buttonText: "Get Premium",
      popular: true
    },
    {
      name: "Elite",
      price: "99",
      description: "Full access for students aiming for top-tier results.",
      features: [
        "Unlimited sessions",
        "Personal learning path",
        "Private Slack community",
        "Dedicated mentor",
        "Exclusive exam prep"
      ],
      icon: <Shield size={22} />,
      iconBg: 'var(--color-secondary-50)',
      iconColor: 'var(--color-secondary-600)',
      buttonText: "Go Elite",
      popular: false
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-surface)' }}>
      <div className="container-max" style={{ paddingTop: '100px', paddingBottom: '60px', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-on-surface)', marginBottom: '12px' }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--color-on-surface-variant)', maxWidth: '520px', margin: '0 auto' }}>
            Choose the plan that fits your academic goals and start excelling today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className={plan.popular ? '' : ''}
              style={{
                position: 'relative',
                padding: '32px',
                borderRadius: 'var(--radius-xl)',
                border: plan.popular ? '2px solid var(--color-primary-600)' : '1px solid var(--color-outline-variant)',
                backgroundColor: 'var(--color-surface-container-lowest)',
                boxShadow: plan.popular ? '0 8px 32px rgba(0, 88, 190, 0.12)' : 'none',
                transform: plan.popular ? 'scale(1.04)' : 'none',
                zIndex: plan.popular ? 10 : 1,
                transition: 'all 0.3s',
              }}
            >
              {plan.popular && (
                <span style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--color-primary-600)',
                  color: '#fff',
                  padding: '4px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  Most Popular
                </span>
              )}

              <div style={{
                width: '48px', height: '48px', borderRadius: 'var(--radius-lg)',
                backgroundColor: plan.iconBg, color: plan.iconColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                {plan.icon}
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                {plan.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                <span style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-on-surface)' }}>€{plan.price}</span>
                <span style={{ fontSize: '14px', color: 'var(--color-outline)' }}>/month</span>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5, marginBottom: '24px' }}>
                {plan.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {plan.features.map((feature, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-secondary-50)', color: 'var(--color-secondary-600)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Check size={12} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', padding: '14px', justifyContent: 'center', display: 'flex' }}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
            Have a large group?{' '}
            <a href="#" style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>Contact us</a> for custom institutional pricing.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
