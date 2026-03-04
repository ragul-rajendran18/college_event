import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Home />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/my-registrations" element={<div className="container mx-auto px-4 py-32 text-center text-slate-400">Feature coming soon!</div>} />
            <Route path="/about" element={<div className="container mx-auto px-4 py-32 text-center text-slate-400">About College Eventra</div>} />
            <Route path="/login" element={<div className="container mx-auto px-4 py-32 text-center text-slate-400">Login Gate</div>} />
            <Route path="*" element={<div className="container mx-auto px-4 py-32 text-center text-white text-2xl">404 - Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
