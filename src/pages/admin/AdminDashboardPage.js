
import React, { useState, useEffect } from 'react';
import { CubeIcon, UsersIcon, TagIcon } from '@heroicons/react/24/solid';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const StatCard = ({ title, value, icon, loading }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-full">
            {React.cloneElement(icon, { className: "h-6 w-6 text-orange-600 dark:text-orange-300" })}
        </div>
        <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            {loading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1"></div>
            ) : (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            )}
        </div>
    </div>
);


const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ deals: 0, users: 0, brands: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dealsSnapshot = await getDocs(collection(db, 'deals'));
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const brandsSnapshot = await getDocs(collection(db, 'brands'));
        
        setStats({
          deals: dealsSnapshot.size,
          users: usersSnapshot.size,
          brands: brandsSnapshot.size,
        });

      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total de Ofertas" value={stats.deals} icon={<CubeIcon />} loading={loading} />
        <StatCard title="Usuarios Registrados" value={stats.users} icon={<UsersIcon />} loading={loading} />
        <StatCard title="Marcas Activas" value={stats.brands} icon={<TagIcon />} loading={loading} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Actividad Reciente</h2>
        <p className="text-gray-600 dark:text-gray-400">
            Aquí se mostrarán gráficos de actividad una vez que haya suficientes datos históricos.
        </p>
        {/* El gráfico se puede conectar más adelante a datos más complejos */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
