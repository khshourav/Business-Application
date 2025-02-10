import React from 'react';

export default function HeroSection({ title, backgroundImage, children }) {
  return (
    <section className="relative py-32 text-white/100 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 animate-fade-in">
        <div
          className="w-full h-full bg-top bg-cover"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-black/50" />
        {/* <div className="absolute inset-0 bg-transparent-secondary backdrop-blur-sm" /> */}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {children || (
            <h1 className="text-4xl md:text-6xl font-bold text-accent mb-8">
              {title}
            </h1>
          )}
        </div>
      </div>
    </section>
  );
}