
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    StarIcon, 
    ComputerDesktopIcon, 
    ShoppingBagIcon, 
    CakeIcon, 
    PuzzlePieceIcon, 
    BookOpenIcon, 
    GlobeAltIcon,
    BuildingStorefrontIcon
} from '@heroicons/react/24/outline';

const iconMap = {
    'Tech': ComputerDesktopIcon,
    'Moda': ShoppingBagIcon,
    'Comida': CakeIcon,
    'Gaming': PuzzlePieceIcon,
    'Libros': BookOpenIcon,
    'Viajes': GlobeAltIcon,
};

const CategoryButton = ({ to, onClick, icon: Icon, label, isActive, isStore = false }) => {
    const baseClasses = "flex flex-col items-center justify-center w-20 h-20 p-2 rounded-lg text-center transition-all duration-300 transform";
    
    let stateClasses = '';
    if (isStore) {
        stateClasses = `bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md hover:shadow-lg hover:scale-110`;
    } else if (isActive) {
        stateClasses = `bg-orange-500 text-white shadow-lg scale-105`;
    } else {
        stateClasses = `bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 hover:shadow-md`;
    }

    if (to) {
        return (
            <Link to={to} className={`${baseClasses} ${stateClasses}`}>
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold">{label}</span>
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${baseClasses} ${stateClasses}`}>
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">{label}</span>
        </button>
    );
};

const CategorySelector = ({ categories = [], onCategorySelect, activeCategory }) => {
    return (
        <div className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center flex-wrap gap-3">
                    
                    <CategoryButton 
                        onClick={() => onCategorySelect('Todos')}
                        icon={StarIcon} 
                        label="Todos"
                        isActive={activeCategory === 'Todos'} 
                    />

                    {categories.map(category => {
                        const Icon = iconMap[category.name] || StarIcon;
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
                        icon={BuildingStorefrontIcon} 
                        label="Tiendas"
                        isStore
                    />

                </div>
            </div>
        </div>
    );
};

export default CategorySelector;
