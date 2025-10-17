
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { CubeIcon, TagIcon, SparklesIcon, ChartBarIcon, UsersIcon } from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-orange-500 text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4">
        <div className="text-2xl font-bold text-orange-500 mb-8">Admin CazaDeals</div>
        <nav className="space-y-2">
          <NavLink to="/admin" end className={navLinkClass}>
            <ChartBarIcon className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/deals" className={navLinkClass}>
            <CubeIcon className="w-5 h-5 mr-3" />
            Gestionar Ofertas
          </NavLink>
          <NavLink to="/admin/brands" className={navLinkClass}>
            <TagIcon className="w-5 h-5 mr-3" />
            Gestionar Marcas
          </NavLink>
           <NavLink to="/admin/marquee" className={navLinkClass}>
            <SparklesIcon className="w-5 h-5 mr-3" />
            Marquesina
          </NavLink>
           <NavLink to="/admin/scraper" className={navLinkClass}> {/* NUEVO ENLACE */}
            <SparklesIcon className="w-5 h-5 mr-3 text-green-500" />
            Scraper IA
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClass}>
            <UsersIcon className="w-5 h-5 mr-3" />
            Usuarios
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
