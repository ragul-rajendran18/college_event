import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppWindow, Calendar, MapPin, ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative cursor-pointer"
        >
            <Link to={`/event/${event.id}`}>
                <div className="cyber-card relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-[2.5rem]">
                    {/* Background Image */}
                    {!imgError ? (
                        <img
                            src={event.image_url || event.image}
                            alt={event.title}
                            onError={() => setImgError(true)}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-cyber-surface flex items-center justify-center">
                            <Zap className="w-12 h-12 text-slate-700" />
                        </div>
                    )}

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-cyber-bg/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                    {/* Content Corner */}
                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end min-h-[50%]">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-cyber-primary/20 backdrop-blur-md border border-cyber-primary/30 text-cyber-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                                {event.category}
                            </span>
                            <span className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                                {event.type}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white leading-tight mb-6 group-hover:text-gradient transition-all duration-500">
                            {event.title}
                        </h3>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.date}</span>
                                <span className="block text-[10px] font-bold text-cyber-primary uppercase tracking-widest">{event.location}</span>
                            </div>

                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-cyber-bg">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

            </Link>
        </motion.div>
    );
};

export default EventCard;
