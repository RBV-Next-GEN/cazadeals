import DealTagsMarquee from '../components/DealTagsMarquee'; // Ajusta la ruta si es necesario

const HomePage: React.FC = () => {
  const combinedDeals = [
    { id: '1', text: 'zapatillas' },
    { id: '2', text: 'Starbucks: 10% en tu pedido', highlightedText: 'Starbucks' },
    { id: '3', text: 'Zara: 25% en nueva colección', highlightedText: 'Zara' },
    { id: '4', text: 'GameStop: 10% en juegos', highlightedText: 'GameStop' },
    { id: '5', text: 'Fnac: 10% en libros', highlightedText: 'Fnac' },
    { id: '6', text: 'MediaMarkt', highlightedText: 'MediaMarkt' },
    { id: '7', text: 'Amazon: ¡20% en Amazon!', highlightedText: 'Amazon' },
    { id: '8', text: 'Nike: 15% en', highlightedText: 'Nike' },
  ];

  return (
    <div>
      <div style={{ padding: '20px 0', background: '#FDFDFD' }}> {/* Contenedor para la marquesina */}
        <DealTagsMarquee deals={combinedDeals} />
      </div>
    </div>
  );
};

export default HomePage;