import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, ArrowRight, ArrowLeft, Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const RegistrationForm = ({ eventId, eventTitle, price }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        studentId: '',
        department: '',
        paymentMethod: 'UPI'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const errs = {};
        if (!formData.fullName) errs.fullName = "IDENTITY REQUIRED";
        if (!formData.email.includes('@')) errs.email = "INVALID COMMS";
        if (!formData.studentId) errs.studentId = "ID REQUIRED";
        return errs;
    };

    const handleNext = () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setStep(2);
    };

    const handleConfirm = async () => {
        setIsSubmitting(true);
        setErrors({});

        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.post(`${apiBase}/register`, {
                event_id: eventId,
                full_name: formData.fullName,
                email: formData.email,
                student_id: formData.studentId,
                department: formData.department,
                payment_method: formData.paymentMethod
            });

            if (response.status === 201) {
                setStep(3);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setErrors({ submit: error.response?.data?.error || "CONNECTION_FAILED" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFree = price.toLowerCase().includes('free') || price === '$0' || price === '0.00';

    return (
        <div className="cyber-card p-10 bg-cyber-surface/60 border-white/10 overflow-visible relative">
            {/* Design Decorations */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-cyber-primary rounded-2xl flex items-center justify-center text-cyber-bg shadow-xl shadow-cyber-primary/20 rotate-12">
                <Terminal className="w-6 h-6" />
            </div>

            <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">Registration Hub</h2>
                    <span className="text-sm font-black text-cyber-primary font-mono">{price}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        animate={{ width: `${(step / 3) * 100}%` }}
                        className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="s1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Full Identity</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Enter your name"
                                    className="cyber-input"
                                />
                                {errors.fullName && <p className="text-[10px] text-cyber-secondary font-black ml-2 uppercase">! {errors.fullName}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Digital Comms</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                    className="cyber-input"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Student ID</label>
                                    <input
                                        type="text"
                                        value={formData.studentId}
                                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                        placeholder="ID0001"
                                        className="cyber-input"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Dept</label>
                                    <select
                                        className="cyber-input py-[17px] appearance-none"
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    >
                                        <option value="">Choose</option>
                                        <option value="CS">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="MECH">MECH</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button onClick={handleNext} className="cyber-button w-full flex items-center justify-center gap-3">
                            Next Stage <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="s2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                            <div className="flex justify-between text-xs font-bold uppercase">
                                <span className="text-slate-500">Access Tier</span>
                                <span className="text-white">General Admission</span>
                            </div>
                            <div className="flex justify-between text-xs font-black uppercase">
                                <span className="text-slate-500">Processing Fee</span>
                                <span className="text-cyber-primary">{price}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Simulated Secure Gateway</p>
                            <div className="grid grid-cols-2 gap-3">
                                {['UPI', 'CARD'].map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setFormData({ ...formData, paymentMethod: m })}
                                        className={`py-4 rounded-2xl text-[10px] font-black border transition-all
                                            ${formData.paymentMethod === m ? 'bg-cyber-primary/20 border-cyber-primary text-white shadow-lg' : 'bg-white/5 border-white/5 text-slate-500'}`}
                                    >
                                        {m} GATEWAY
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="cyber-button-outline w-1/3 p-0 flex items-center justify-center">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button onClick={handleConfirm} disabled={isSubmitting} className="cyber-button flex-1 flex items-center justify-center gap-2">
                                {isSubmitting ? <div className="w-5 h-5 border-2 border-cyber-bg/30 border-t-cyber-bg rounded-full animate-spin" /> : <>Confirm <Cpu className="w-4 h-4" /></>}
                            </button>
                        </div>
                        {errors.submit && <p className="text-[10px] text-cyber-secondary font-black text-center uppercase mt-4">! ERROR: {errors.submit}</p>}
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="s3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 py-10"
                    >
                        <div className="w-24 h-24 bg-cyber-primary/20 rounded-full flex items-center justify-center mx-auto border border-cyber-primary/30 relative">
                            <CheckCircle2 className="w-12 h-12 text-cyber-primary" />
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-cyber-primary rounded-full"
                            />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Registration Logged</h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Entry Serial: TX-{Math.floor(Math.random() * 90000) + 10000}</p>
                        </div>
                        <button onClick={() => setStep(1)} className="cyber-button-outline w-full text-xs">
                            Generate New Session
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RegistrationForm;
