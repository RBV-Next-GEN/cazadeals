import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link

// 1. Iconos SVG que coinciden con la imagen proporcionada
const categoryIcons = {
    Todos: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-3.152a.563.563 0 00-.652 0l-4.725 3.152a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
    Comida: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 15.75a.75.75 0 01-.75.75H3.75a.75.75 0 010-1.5h16.5a.75.75 0 01.75.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.625 12.75a.75.75 0 01.75-.75h11.25a.75.75 0 010 1.5H6.375a.75.75 0 01-.75-.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM9 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H9.75A.75.75 0 019 3.75z" /></svg>,
    Gaming: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-1.223.998-2.212 2.225-2.212s2.225.99 2.225 2.212c0 1.109-.81 2.03-1.875 2.181a.75.75 0 01-.85.736h-1.5a.75.75 0 01-.65-.359l-.358-.618c-.33-.571-1.212-.571-1.542 0l-.358.618a.75.75 0 01-.65.359h-1.5a.75.75 0 01-.85-.736C8.81 8.117 8 7.196 8 6.087c0-1.223.998-2.212 2.225-2.212s2.225.99 2.225 2.212z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.835 10.214l.358-.618c.33-.571 1.212-.571 1.542 0l.358.618a.75.75 0 00.65.359h1.5a.75.75 0 00.85-.736c1.065-.15 1.875-1.072 1.875-2.181a3.712 3.712 0 00-3.712-3.712A3.712 3.712 0 008 6.087c0 1.109.81 2.03 1.875 2.181a.75.75 0 00.85.736h1.5a.75.75 0 00.65-.359l.358-.618c.33-.571 1.212-.571 1.542 0l.358.618a.75.75 0 00.65.359h.035v.001h-.035a.75.75 0 010 1.5H8.835a.75.75 0 01-.618-.358L8 10.5h-.001a.75.75 0 01-.65.359H6.087a2.212 2.212 0 00-2.212 2.212c0 1.223.99 2.225 2.212 2.225s2.181-.81 2.181-1.875a.75.75 0 01.736-.85v-1.5a.75.75 0 01.359-.65l.618-.358c.571-.33.571-1.212 0-1.542l-.618-.358a.75.75 0 01-.359-.65v-1.5a.75.75 0 01.736-.85c1.065-.15 1.875-1.072 1.875-2.181z" /></svg>,
    Libros: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
    Moda: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
    Tech: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.375 1.5H4.5a3 3 0 01-3-3V6a3 3 0 013-3h15a3 3 0 013 3v9.75a3 3 0 01-3 3h-4.125a3 3 0 01-.375-1.5V17.25m-6 0h6" /></svg>,
    Viajes: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.95 9.133a8.968 8.968 0 00-15.9 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.05 14.867a8.968 8.968 0 0015.9 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.968 8.968 0 005.95-15.867" /></svg>,
    Tiendas: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.25a.75.75 0 01-.75-.75V10.5a.75.75 0 01.75-.75h19.5a.75.75 0 01.75.75v9.75a.75.75 0 01-.75.75h-8.25M9 13.5h6m-6 3h6m-6-3v3" /></svg>,
};

// 2. Datos de las categorías hardcodeados
const categories = [
    { name: 'Todos', special: false },
    { name: 'Comida', special: false },
    { name: 'Gaming', special: false },
    { name: 'Libros', special: false },
    { name: 'Moda', special: false },
    { name: 'Tech', special: false },
    { name: 'Viajes', special: false },
    { name: 'Tiendas', special: true }, // Flag para el estilo especial
];

const CategoryNav = ({ onSelect, activeCategory }) => {

    return (
        <div className="py-4">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                {categories.map(({ name, special }) => {
                    const isActive = activeCategory === name;
                    
                    // 3. Lógica para los colores de fondo
                    let bgClass = 'bg-white dark:bg-gray-800';
                    let textClass = 'text-gray-700 dark:text-gray-300';

                    if (isActive) {
                        if (special) {
                            bgClass = 'bg-pink-500'; // Color rosa para Tiendas activa
                            textClass = 'text-white';
                        } else {
                            bgClass = 'bg-orange-500'; // Color naranja para las demás activas
                            textClass = 'text-white';
                        }
                    } else if (special) {
                        bgClass = 'bg-pink-500'; // Siempre rosa para Tiendas
                        textClass = 'text-white';
                    }

                    if (special) {
                        return (
                            <Link
                                key={name}
                                to="/tiendas" // Enlace a la página de tiendas
                                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center ${bgClass} ${textClass}`}
                            >
                                {categoryIcons[name]}
                                <span className="text-sm font-bold">{name}</span>
                            </Link>
                        );
                    } else {
                        return (
                            <button
                                key={name}
                                onClick={() => onSelect(name)}
                                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center ${bgClass} ${textClass}`}
                            >
                                {categoryIcons[name]}
                                <span className="text-sm font-bold">{name}</span>
                            </button>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default CategoryNav;
