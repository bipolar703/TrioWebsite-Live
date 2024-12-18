import React from 'react';
import trioFav from '../../images/triofav.png';

export default function PageTransition() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-lg animate-pulse"></div>
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-accent opacity-10 animate-ping"></div>
        <img 
          src={trioFav} 
          alt="Loading..." 
          className="relative w-16 h-16 object-contain animate-spin-slow"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
    </div>
  );
} 