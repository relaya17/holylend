import React from 'react';

const FloatingAccessibility: React.FC = () => {
  console.log('FloatingAccessibility component loaded');

    return (
    <div 
      className="floating-accessibility" 
      role="group" 
      aria-label="Accessibility Controls"
      style={{
        position: 'fixed',
        bottom: '120px',
        right: '20px',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <button
        className="floating-accessibility-btn"
        onClick={() => {
          // כפתור נגישות כללי - פותח תפריט נגישות
          console.log('Accessibility menu opened');
          alert('תפריט נגישות:\n🌙 - ניגודיות גבוהה\n🔍 - טקסט גדול\n♿ - אפשרויות נוספות');
        }}
        aria-label="Accessibility Menu"
        title="Accessibility Menu"
        style={{
          width: '60px',
          height: '60px',
          border: '3px solid yellow',
          fontSize: '24px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2c3e50, #34495e)',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ♿
      </button>
    </div>
  );
};

export default FloatingAccessibility; 