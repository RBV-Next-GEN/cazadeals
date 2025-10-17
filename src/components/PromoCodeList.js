
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Importamos la instancia de la base de datos
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import CouponCard from './CouponCard'; // La nueva tarjeta que hemos creado
import CouponModal from './CouponModal'; // El nuevo modal que hemos creado

const PromoCodeList = ({ onCopyCode, copiedDealId }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null); // El cupón que se mostrará en el modal

  // --- Carga los cupones desde Firestore ---
  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const dealsCollection = collection(db, 'deals'); // Suponiendo que tu colección se llama 'deals'
        const dealSnapshot = await getDocs(dealsCollection);
        const dealList = dealSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Filtramos para quedarnos solo con los que son códigos (type === 'code')
        const promoCodes = dealList.filter(deal => deal.type === 'code');
        setDeals(promoCodes);

      } catch (error) {
        console.error("Error al cargar los códigos de descuento desde Firestore:", error);
      }
      setLoading(false);
    };

    fetchDeals();
  }, []);

  // --- Lógica para revelar el código ---
  const handleRevealCode = async (deal) => {
    setSelectedDeal(deal); // Guarda el cupón seleccionado para pasárselo al modal

    // Incrementamos el contador en la base de datos
    try {
      const dealRef = doc(db, 'deals', deal.id);
      // ¡Importante! Necesitas tener un campo 'activatedCount' de tipo numérico en tus documentos de Firestore.
      await updateDoc(dealRef, {
        activatedCount: increment(1)
      });
      // Actualizamos el estado local para que el cambio se refleje al instante
      setDeals(deals.map(d => d.id === deal.id ? { ...d, activatedCount: (d.activatedCount || 0) + 1 } : d));
    } catch (error) {
      console.error("Error al actualizar el contador del cupón:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedDeal(null); // Cierra el modal reseteando el estado
  };

  // Mientras carga, muestra un mensaje
  if (loading) {
    return <div className="text-center p-8">Cargando códigos...</div>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4">Códigos Descuento</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Aprovecha estos códigos y ahorra en tus compras online.
      </p>

      {/* Lista de las nuevas tarjetas de cupón */}
      <div className="space-y-4">
        {deals.map((deal) => (
          <CouponCard key={deal.id} deal={deal} onReveal={handleRevealCode} />
        ))}
      </div>

      {/* El Modal (solo se muestra si hay un 'selectedDeal') */}
      {selectedDeal && (
        <CouponModal
          deal={selectedDeal}
          onClose={handleCloseModal}
          onCopyCode={onCopyCode} // Pasamos la función onCopyCode que ya tenías
        />
      )}
    </div>
  );
};

export default PromoCodeList;
