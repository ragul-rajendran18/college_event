import React from 'react';
import { Cpu, Twitter, Instagram, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-cyber-bg border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-cyber-primary/50 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
                    <div className="md:col-span-5">
                        <Link to="/" className="flex items-center gap-4 mb-10 group">
                            <div className="w-12 h-12 bg-gradient-to-tr from-cyber-primary to-cyber-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-cyber-primary/20 group-hover:rotate-12 transition-transform duration-500">
                                <Cpu className="text-white w-6 h-6" />
                            </div>
                            <span className="text-3xl font-black tracking-tighter text-white">EVENTRA</span>
                        </Link>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-sm mb-12 font-medium">
                            Defining the frontier of student innovation. Join us at A.V.C College for the 2026 symposium.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyber-primary/20 hover:border-cyber-primary/30 transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10">Navigation</h4>
                        <ul className="space-y-6">
                            {['Discover', 'Leaderboard', 'Schedule', 'Contact'].map(link => (
                                <li key={link}>
                                    <Link to="/" className="text-slate-400 hover:text-cyber-primary text-sm font-bold uppercase tracking-widest transition-colors font-mono">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-5">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10">Newsletter Access</h4>
                        <p className="text-slate-500 mb-8 font-medium">Receive technical briefings and event updates directly.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="NODE_ID@GATEWAY.COM"
                                className="cyber-input pr-20 placeholder:text-slate-800"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-cyber-bg rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
                                <Mail className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        © 2026 A.V.C College of Engineering. SECURED BY EVENTRA CORE.
                    </p>
                    <div className="flex gap-10 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        <a href="#" className="hover:text-cyber-primary transition-colors">Privacy Protcol</a>
                        <a href="#" className="hover:text-cyber-primary transition-colors">System Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
