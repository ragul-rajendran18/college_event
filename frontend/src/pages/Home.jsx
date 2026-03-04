import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowDown, Sparkles, Filter, LayoutGrid } from 'lucide-react';
import { events as mockEvents } from '../data/events';
import EventCard from '../components/EventCard';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setEvents(data);
                } else {
                    console.warn('API returned empty or invalid data, using mock events.');
                    setEvents(mockEvents);
                }
            } catch (error) {
                console.error('Error fetching events, falling back to mock data:', error);
                setEvents(mockEvents);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Business', 'Workshop', 'Paper Presentation'];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-cyber-bg">
            <div className="w-16 h-16 border-4 border-cyber-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="pt-32 pb-40 overflow-hidden">
            {/* Minimal Background Elements */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-cyber-primary/5 blur-[120px] -z-10 animate-float" />
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-cyber-secondary/5 blur-[120px] -z-10 animate-float" style={{ animationDelay: '2s' }} />

            {/* Premium Hero */}
            <section className="container mx-auto px-6 mb-32">
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "circOut" }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-0.5 w-12 bg-cyber-primary" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyber-primary">A.V.C College Excellence</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-8 text-white">
                            EVEN<span className="text-transparent border-t border-b border-white/20 px-2 italic font-light font-mono">TRA</span><br />
                            <span className="text-gradient">2026</span> EDITION
                        </h1>

                        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                            <p className="max-w-md text-slate-400 text-lg leading-relaxed font-medium">
                                Join the annual technological symposium where innovation meets passion. Explore 50+ events across various streams.
                            </p>

                            <div className="flex gap-4">
                                <div className="space-x-1">
                                    <span className="text-5xl font-black text-white">4.9</span>
                                    <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">Avg Rating</span>
                                </div>
                                <div className="h-16 w-px bg-white/10" />
                                <div className="space-x-1">
                                    <span className="text-5xl font-black text-white">12k</span>
                                    <span className="text-xs font-bold text-slate-600 tracking-widest uppercase">Attendees</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Discovery */}
            <section className="container mx-auto px-6">
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-20">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-cyber-primary">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-widest">Event Discovery</span>
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-tight">Curated Sessions</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyber-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Find your event..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="cyber-input pl-16 w-full sm:w-80 group-hover:border-white/20 transition-all"
                            />
                        </div>
                        <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar scroll-smooth shadow-inner">
                            {categories.slice(0, 4).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap
                                        ${activeCategory === cat ? 'bg-white text-cyber-bg shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredEvents.map((event, index) => (
                            <EventCard key={event.id} event={event} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="cyber-card p-32 text-center border-dashed">
                        <LayoutGrid className="w-16 h-16 text-slate-700 mx-auto mb-6 opacity-20" />
                        <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Zero results found</h3>
                        <p className="text-slate-500 font-medium">Try refining your search parameters or selecting a different category.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
