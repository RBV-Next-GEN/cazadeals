import React from 'react';
import LaunchBanner from '../components/LaunchBanner'; // Cambiado de LaunchOfferBanner a LaunchBanner
import MarqueeDeals from '../components/MarqueeDeals';
import DealList from '../components/DealList';
import PromoCodeList from '../components/PromoCodeList';

const HomePage = ({ deals, marqueeDeals, onCopyCode, onDealClick, copiedDealId }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Aquí usamos el nuevo y espectacular banner */}
      <LaunchBanner /> 
      
      <MarqueeDeals deals={marqueeDeals} />
      
      {/* Añadimos un id a esta sección para que el botón del banner pueda navegar aquí */}
      <div id="deals-section">
        <DealList 
          deals={deals} 
          onCopyCode={onCopyCode} 
          onDealClick={onDealClick}
          copiedDealId={copiedDealId}
        />
      </div>
      
      <PromoCodeList onCopyCode={onCopyCode} copiedDealId={copiedDealId} />
    </main>
  );
};

export default HomePage;
