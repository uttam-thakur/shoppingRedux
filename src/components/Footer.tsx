import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#232f3e', color: 'white', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <div>
          <h6 style={{ marginBottom: '10px' }}>About Us</h6>
          <p style={{ color: 'inherit', marginBottom: '10px' }}>
            Amazon Store is your destination for all things shopping. Discover a wide range of products
            from electronics to fashion and more.
          </p>
        </div>
        <div>
          <h6 style={{ marginBottom: '10px' }}>Customer Service</h6>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginBottom: '5px', display: 'block' }}>
            Contact Us
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginBottom: '5px', display: 'block' }}>
            Returns & Exchanges
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginBottom: '5px', display: 'block' }}>
            FAQs
          </a>
        </div>
        <div>
          <h6 style={{ marginBottom: '10px' }}>Shop With Us</h6>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginBottom: '5px', display: 'block' }}>
            Featured Brands
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginBottom: '5px', display: 'block' }}>
            Deals & Promotions
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginBottom: '5px', display: 'block' }}>
            Gift Cards
          </a>
        </div>
        <div>
          <h6 style={{ marginBottom: '10px' }}>Follow Us</h6>
          <div style={{ display: 'flex' }}>
            <a href="#" style={{ color: 'inherit', marginRight: '10px' }}>
              Facebook
            </a>
            <a href="#" style={{ color: 'inherit', marginRight: '10px' }}>
              Twitter
            </a>
            <a href="#" style={{ color: 'inherit', marginRight: '10px' }}>
              Instagram
            </a>
            <a href="#" style={{ color: 'inherit', marginRight: '10px' }}>
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
