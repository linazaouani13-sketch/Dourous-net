import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-surface-container-lowest)',
      borderTop: '1px solid var(--color-outline-variant)',
      padding: '24px 0',
    }}>
      <div className="container-max" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Logo />
          <span style={{
            fontSize: '13px',
            color: 'var(--color-outline)',
          }}>
            © 2024 Dourous-Net. All rights reserved.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-on-surface-variant)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-600)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-on-surface-variant)'}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
