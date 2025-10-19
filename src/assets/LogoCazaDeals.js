import React from "react";

// Logo profesional: icono de lupa y tipografía moderna, adaptable a claro/oscuro
const LogoCazaDeals = ({ size = 38, fontSize = 28, className = "" }) => (
  <span className={`inline-flex items-center gap-2 select-none ${className}`} style={{lineHeight:1}}>
    {/* Icono: Lupa estilizada, premium */}
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="15" stroke="url(#grad1)" strokeWidth="4" fill="white" />
      <ellipse cx="17" cy="17" rx="9" ry="9" fill="url(#grad2)" />
      <rect x="25" y="25" width="10" height="4" rx="2" transform="rotate(45 25 25)" fill="url(#grad1)" />
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E53E85" />
          <stop offset="1" stopColor="#FF8C00" />
        </linearGradient>
        <radialGradient id="grad2" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3" gradientTransform="matrix(1 0 0 1 0 0)">
          <stop offset="0%" stopColor="#FFF7F0" />
          <stop offset="100%" stopColor="#FFC1E3" />
        </radialGradient>
      </defs>
    </svg>
    {/* Tipografía profesional */}
    <span
      style={{
        fontFamily: 'Inter, Poppins, Segoe UI, Arial, sans-serif',
        fontWeight: 900,
        fontSize,
        letterSpacing: '0.01em',
        background: 'linear-gradient(90deg,#E53E85,#FF8C00 80%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        lineHeight: 1.1,
      }}
    >
      CazaDeals
    </span>
  </span>
);

export default LogoCazaDeals;
