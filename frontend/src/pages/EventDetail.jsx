import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Star, Info, User, CheckCircle, Zap } from 'lucide-react';
import { events as mockEvents } from '../data/events';
import RegistrationForm from '../components/RegistrationForm';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/events/${id}`);
                const data = await response.json();
                if (response.ok && data && !data.error) {
                    setEvent(data);
                } else {
                    const mockEvent = mockEvents.find(e => e.id === id);
                    setEvent(mockEvent || null);
                }
            } catch (error) {
                console.error('Error fetching event, falling back to mock data:', error);
                const mockEvent = mockEvents.find(e => e.id === id);
                setEvent(mockEvent || null);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-cyber-bg">
            <div className="w-16 h-16 border-4 border-cyber-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-bg text-white">
                <h1 className="text-4xl font-black mb-4">EVENT NOT FOUND</h1>
                <p className="text-slate-500 mb-8">The requested event ID could not be located in our system.</p>
                <Link to="/" className="cyber-button">Back to Home</Link>
            </div>
        );
    }

    const priceLabel = event.price === 'Free' ? 'Free' : `$${event.price}`;

    return (
        <div className="pb-40 bg-cyber-bg">
            <div className="fixed top-0 left-0 w-full h-screen bg-cyber-primary/5 blur-[150px] -z-10 animate-pulse" />

            {/* Immersive Banner */}
            <section className="relative h-[85vh] w-full overflow-hidden">
                {!imgError ? (
                    <img
                        src={event.image_url || event.image}
                        alt={event.title}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                    />
                ) : (
                    <div className="w-full h-full bg-cyber-surface flex items-center justify-center">
                        <Zap className="w-24 h-24 text-slate-800" />
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-bg/20 to-cyber-bg" />

                <div className="absolute bottom-0 left-0 w-full pb-20 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <Link to="/" className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-3xl rounded-full text-white text-xs font-black uppercase tracking-widest border border-white/10 hover:bg-white hover:text-cyber-bg transition-all mb-12">
                                <ArrowLeft className="w-4 h-4" /> Back To Gallery
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <span className="px-4 py-1 bg-cyber-primary text-cyber-bg text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
                                    {event.category}
                                </span>
                                <span className="px-4 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
                                    {event.type}
                                </span>
                            </div>

                            <h1 className="text-[10vw] md:text-[7vw] font-black text-white leading-[0.85] tracking-tighter mb-12 max-w-5xl">
                                {event.title.split(' ').map((word, i) => (
                                    <span key={i} className={i % 2 !== 0 ? 'text-transparent border-b-4 border-dotted border-white/30' : ''}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>

                            <div className="flex flex-wrap items-center gap-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-cyber-primary/20 backdrop-blur-xl flex items-center justify-center text-cyber-primary border border-cyber-primary/30">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Date</p>
                                        <p className="text-xl font-black text-white">{event.date}</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-cyber-secondary/20 backdrop-blur-xl flex items-center justify-center text-cyber-secondary border border-cyber-secondary/30">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Location</p>
                                        <p className="text-xl font-black text-white">{event.location}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute top-32 right-10 hidden xl:flex flex-col gap-4">
                    <button className="w-14 h-14 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-cyber-primary hover:text-white transition-all">
                        <Share2 className="w-6 h-6" />
                    </button>
                    <button className="w-14 h-14 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-cyber-secondary hover:text-white transition-all">
                        <Star className="w-6 h-6" />
                    </button>
                </div>
            </section>

            {/* Detailed Content */}
            <section className="container mx-auto px-6 mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8 space-y-24">
                        <div className="max-w-3xl">
                            <h3 className="text-xs font-black text-cyber-primary uppercase tracking-[0.4em] mb-8">Event Briefing</h3>
                            <p className="text-3xl md:text-4xl font-black text-white leading-tight mb-12">
                                {event.description}
                            </p>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                Technical depth meets experiential design. Our symposium ensures that every attendee walks away with not just knowledge, but an inspiration to build the future. Join {event.coordinator} and the elite circle of student innovators.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="cyber-card p-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-cyber-primary/10 rounded-3xl flex items-center justify-center mb-8">
                                    <User className="w-10 h-10 text-cyber-primary" />
                                </div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Academic Lead</h4>
                                <p className="text-2xl font-black text-white">{event.coordinator}</p>
                            </div>
                            <div className="cyber-card p-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-cyber-secondary/10 rounded-3xl flex items-center justify-center mb-8">
                                    <Clock className="w-10 h-10 text-cyber-secondary" />
                                </div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Time Slot</h4>
                                <p className="text-2xl font-black text-white">{event.time}</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Metadata Tags</h4>
                            <div className="flex flex-wrap gap-4">
                                {event.tags?.map(tag => (
                                    <span key={tag} className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-slate-300 hover:border-cyber-primary transition-colors cursor-default">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <RegistrationForm eventId={event.id} eventTitle={event.title} price={priceLabel} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventDetail;
