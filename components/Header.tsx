import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 flex justify-center items-center">
      <div className="relative group cursor-default">
        {/* Decorative background blob */}
        <div className="absolute -inset-2 bg-pop-yellow rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse"></div>
        
        <h1 className="relative flex items-center gap-3 text-4xl md:text-6xl font-pop text-pop-black bg-white border-4 border-pop-black px-6 py-3 rounded-full shadow-hard transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-pop-pink fill-pop-pink" />
          <span className="tracking-tighter">PopStyle</span>
          <span className="text-pop-purple">Prompter</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
