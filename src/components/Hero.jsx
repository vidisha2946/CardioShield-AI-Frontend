import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaArrowRight, FaDna, FaShieldAlt, FaMicrochip } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Advanced <span className="text-gradient">Cardiac Health</span> <br />
          Prediction AI
        </h1>
        <p className="hero-subtitle">
          Empowering you with AI-driven insights for early detection and prevention.
          Secure, accurate, and fast analysis at your fingertips.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/diagnostic" className="cta-button">
            Start Diagnosis <FaArrowRight />
            </Link>
        </div>
      </div>

      {/* New Unique Visuals */}
      <div className="hero-visual-container">
          <div className="holo-sphere">
                {/* Rotating Rings */}
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
              
              {/* Central Core */}
              <div className="core-heart">
                  <FaHeartbeat className="beating-icon" />
              </div>

              {/* Floatings Satellites */}
              <div className="satellite sat-1">
                  <div className="sat-icon"><FaDna /></div>
                  <div className="sat-label">Genetics</div>
              </div>
              <div className="satellite sat-2">
                  <div className="sat-icon"><FaShieldAlt /></div>
                  <div className="sat-label">Secure</div>
              </div>
              <div className="satellite sat-3">
                  <div className="sat-icon"><FaMicrochip /></div>
                  <div className="sat-label">AI Model</div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
