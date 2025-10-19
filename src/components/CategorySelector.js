
import React from 'react';
import { Link } from 'react-router-dom';
import {
    IconStar,
    IconDeviceDesktop,
    IconShoppingBag,
    IconCake,
    IconPuzzle,
    IconBook,
    IconWorld,
    IconBuildingStore
} from '@tabler/icons-react';

const iconMap = {
    'Tech': IconDeviceDesktop,
    'Moda': IconShoppingBag,
    'Comida': IconCake,
    'Gaming': IconPuzzle,
    'Libros': IconBook,
    'Viajes': IconWorld,
};

const CategoryButton = ({ to, onClick, icon: Icon, label, isActive, isStore = false }) => {
    // Más compacto, cuadrado, icono pequeño, minimalista
    const baseClasses = "min-w-[72px] h-16 rounded-xl border border-gray-200 dark:border-gray-700 shadow transition-all duration-200 flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-1 py-1 mx-1";

    let stateClasses = '';
    let iconBg = "bg-white bg-opacity-60 rounded-lg p-1 mb-1 flex items-center justify-center";
    let iconColor = isActive || isStore ? '#fff' : '#22292f';
    if (isStore) {
        stateClasses = `bg-pink-500 text-white border-pink-400`;
        iconBg = "bg-white bg-opacity-20 rounded-lg p-1 mb-1 flex items-center justify-center";
        iconColor = '#fff';
    } else if (isActive) {
        stateClasses = `bg-orange-500 text-white border-orange-400`;
        iconBg = "bg-white bg-opacity-20 rounded-lg p-1 mb-1 flex items-center justify-center";
        iconColor = '#fff';
    }

    const textClass = "text-xs font-bold leading-tight";

    if (to) {
        return (
            <div className={`${baseClasses} ${stateClasses}`} tabIndex={0}>
                <Link to={to} className="flex flex-col items-center justify-center w-full h-full px-1 py-1">
                    <div className={iconBg}><Icon size={18} stroke={2} color={iconColor} className="mb-0.5" /></div>
                    <span className={textClass}>{label}</span>
                </Link>
            </div>
        );
    }

    return (
        <button onClick={onClick} className={`${baseClasses} ${stateClasses}`} tabIndex={0}>
            <div className={iconBg}><Icon size={18} stroke={2} color={iconColor} className="mb-0.5" /></div>
            <span className={textClass}>{label}</span>
        </button>
    );
};

const CategorySelector = ({ categories = [], onCategorySelect, activeCategory }) => {
    return (
        <div className="w-full">
            <div className="flex overflow-x-auto items-center justify-start lg:justify-center space-x-4 px-4 py-2 -mx-4 scrollbar-hide">
                <CategoryButton 
                    onClick={() => onCategorySelect('Todos')}
                    icon={IconStar} 
                    label="Todos"
                    isActive={activeCategory === 'Todos'} 
                />
                {categories.map(category => {
                    const Icon = iconMap[category.name] || IconStar;
                    return (
                        <CategoryButton 
                            key={category.id}
                            onClick={() => onCategorySelect(category.name)}
                            icon={Icon} 
                            label={category.name}
                            isActive={activeCategory === category.name}
                        />
                    );
                })}
                <CategoryButton 
                    to="/tiendas" 
                    icon={IconBuildingStore} 
                    label="Tiendas"
                    isStore
                />
            </div>
        </div>
    );
};

export default CategorySelector;
