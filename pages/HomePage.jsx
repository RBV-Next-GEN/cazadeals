import React from 'react';
import SingleMarquee from '../components/SingleMarquee'; // Ajusta la ruta según sea necesario

const HomePage = () => {
  // Combina los datos de tus dos marquesinas en una sola lista
  const combinedMarqueeItems = [
    { id: '1', content: 'zapatillas' },
    { id: '2', content: 'Starbucks: 10% en tu pedido', highlightPrefix: 'Starbucks:' },
    { id: '3', content: 'Zara: 25% en nueva colección', highlightPrefix: 'Zara:' },
    { id: '4', content: 'GameStop: 10% en juegos', highlightPrefix: 'GameStop:' },
    { id: '5', content: 'Fnac: 10% en libros', highlightPrefix: 'Fnac:' },
    { id: '6', content: 'MediaMarkt', highlightPrefix: 'MediaMarkt' }, // Asumiendo que MediaMarkt también tiene un prefijo
    { id: '7', content: 'Amazon: ¡20% en Amazon!', highlightPrefix: 'Amazon:' },
    { id: '8', content: 'Nike: 15% en', highlightPrefix: 'Nike:' }, // Contenido cortado en la imagen
    // ...añade más elementos si los tienes de las marquesinas originales
  ];

  return (
    <div>
      {/* Reemplaza las dos llamadas a marquesinas por una sola */}
      <SingleMarquee items={combinedMarqueeItems} />
    </div>
  );
};

export default HomePage;