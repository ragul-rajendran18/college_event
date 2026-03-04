import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Discover', path: '/' },
        { name: 'Categories', path: '/events' },
        { name: 'My Schedule', path: '/my-registrations' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none">
            <div className={`container mx-auto pointer-events-auto transition-all duration-700 max-w-6xl
                ${scrolled ? 'rounded-full bg-cyber-bg/80 backdrop-blur-xl border border-white/10 shadow-2xl py-2 pl-6 pr-2' : 'py-4'}`}>

                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-cyber-primary to-cyber-secondary rounded-xl flex items-center justify-center shadow-lg shadow-cyber-primary/20">
                            <Cpu className="text-white w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tighter text-white leading-none">EVENTRA</span>
                            <span className="text-[9px] font-bold text-cyber-primary tracking-widest uppercase mt-0.5">AVC College of Engineering</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-[13px] font-bold uppercase tracking-widest transition-all duration-300
                                    ${location.pathname === link.path ? 'text-cyber-primary' : 'text-slate-400 hover:text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/login" className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white text-cyber-bg transition-all duration-500">
                            Student Hub
                        </Link>
                    </nav>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-white"
                    >
                        {mobileOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-cyber-bg/95 backdrop-blur-3xl z-[-1] flex flex-col items-center justify-center gap-8 md:hidden pointer-events-auto"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                className="text-3xl font-black uppercase tracking-tighter text-white hover:text-cyber-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            onClick={() => setMobileOpen(false)}
                            className="cyber-button text-sm"
                        >
                            Student Hub Access
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
