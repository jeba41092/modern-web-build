
import React from 'react';
import { Car } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 mb-6">
      <div className="container mx-auto px-4 md:px-6 flex items-center">
        <Car className="h-8 w-8 text-theme-blue mr-2" />
        <h1 className="text-2xl font-bold text-theme-blue flex items-center">
          Vehicle Damage Assessment
        </h1>
      </div>
    </header>
  );
};

export default Header;
