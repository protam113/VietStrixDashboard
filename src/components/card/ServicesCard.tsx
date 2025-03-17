import { StatsCardsProps } from '@/types/componentsType';
import React from 'react';

const ServicesCards: React.FC<StatsCardsProps> = ({ items }) => {
  return (
    <div className="w-fulsl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg p-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-primary-900 text-white rounded-lg">
              {item.icon}
            </div>
            <p className="mt-2 text-gray-600 transition-colors duration-300 hover:text-primary-600">
              {item.name}
            </p>
            <p className="text-xl font-bold transition-colors duration-300 hover:text-blue-600">
              {item.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesCards;
