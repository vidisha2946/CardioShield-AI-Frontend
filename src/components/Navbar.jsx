import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeartbeat, FaHome, FaInfoCircle, FaSun, FaMoon } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';

const Navbar = () => {
    const location = useLocation();
    const [isDark, setIsDark] = useState(true);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            setIsDark(true);
            document.documentElement.removeAttribute('data-theme');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }
        setIsDark(!isDark);
    };

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${id}`;
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleHomeClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="logo-link">
                    <FaHeartbeat className="logo-icon" size={28} color="var(--primary)" />
                    <div className="logo">CardioShield AI</div>
                </Link>
                
                <div className="nav-links">
                    <Link to="/" className="nav-link" onClick={handleHomeClick}>
                        <FaHome /> <span className="nav-text">Home</span>
                    </Link>
                    <button onClick={() => scrollToSection('about')} className="nav-link">
                        <FaInfoCircle /> <span className="nav-text">Details</span>
                    </button>
                    
                    <Link to="/diagnostic" className="btn-highlight" style={{ textDecoration: 'none' }}>
                        <MdLocalHospital /> <span className="nav-text">Diagnostic Tool</span>
                    </Link>

                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        {isDark ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
