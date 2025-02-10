import React from 'react';

const BackgroundEffects = ({ gridPattern = '/images/svbg/grid1.svg', opacity = 10, children }) => {
  return (
    <div className="relative  w-full overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Faded Grid Pattern */}
        <div
          className="absolute inset-0 bg-repeat opacity-10"
          style={{ backgroundImage: `url(${gridPattern})`, opacity: opacity / 100 }}
        ></div>

        {/* Polymorphic Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-2xl -top-32 -left-32 animate-float"></div>
          <div className="absolute w-48 h-48 bg-secondary/10 rounded-full blur-2xl -bottom-24 -right-24 animate-float-delay"></div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundEffects;