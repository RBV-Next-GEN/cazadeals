
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const BrandContext = createContext();

export const useBrands = () => {
  return useContext(BrandContext);
};

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga todas las marcas al iniciar la app
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsSnapshot = await getDocs(collection(db, 'brands'));
        const brandsMap = {};
        brandsSnapshot.forEach(doc => {
          brandsMap[doc.data().name] = { id: doc.id, ...doc.data() };
        });
        setBrands(brandsMap);
      } catch (error) {
        console.error("Error al cargar las marcas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  /**
   * Construye una URL de afiliado.
   * @param {string} originalUrl - La URL base de la oferta.
   * @param {string} brandName - El nombre de la marca de la oferta.
   * @returns {string} La URL final, con el parámetro de referido si existe.
   */
  const buildAffiliateUrl = useCallback((originalUrl, brandName) => {
    const brand = brands[brandName];
    if (brand && brand.referralParam) {
      const url = new URL(originalUrl);
      // Añade el parámetro de referido a la URL
      url.search += (url.search ? '&' : '') + brand.referralParam;
      return url.toString();
    }
    return originalUrl; // Devuelve la URL original si no hay código de referido
  }, [brands]);

  const value = {
    brands,
    loading,
    buildAffiliateUrl,
  };

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
};
