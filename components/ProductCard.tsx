
import React, { useState } from 'react';
import { Heart, ShoppingBag, Share2, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const handleDoubleClick = () => {
    setIsLiked(true);
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleRedirect = () => {
    window.open(product.productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="relative w-full h-full snap-start flex-shrink-0 bg-black group overflow-hidden"
      onDoubleClick={handleDoubleClick}
    >
      {/* Product Image */}
      <img 
        src={product.imageUrl} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Heart Overlay for Double Click */}
      {showHeartAnim && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <Heart className="w-32 h-32 text-red-500 fill-red-500 animate-ping opacity-75" />
        </div>
      )}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      {/* Content Side Sidebar (TikTok Style) */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6 z-10">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className="flex flex-col items-center"
        >
          <div className={`p-3 rounded-full bg-white/10 backdrop-blur-md transition-colors ${isLiked ? 'text-red-500' : 'text-white'}`}>
            <Heart className={`w-7 h-7 ${isLiked ? 'fill-red-500' : ''}`} />
          </div>
          <span className="text-xs mt-1 font-medium text-white">{isLiked ? '1.2k' : '1.1k'}</span>
        </button>

        <button className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white">
            <Share2 className="w-7 h-7" />
          </div>
          <span className="text-xs mt-1 font-medium text-white">Share</span>
        </button>

        <button 
          onClick={handleRedirect}
          className="flex flex-col items-center"
        >
          <div className="p-3 rounded-full bg-indigo-600 text-white animate-bounce shadow-lg shadow-indigo-500/50">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <span className="text-xs mt-1 font-medium text-white">Buy</span>
        </button>
      </div>

      {/* Bottom Product Info */}
      <div className="absolute bottom-0 left-0 w-full p-6 space-y-2 z-10">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-[10px] uppercase font-bold tracking-widest text-white border border-white/30">
            {product.platform}
          </span>
          <span className="text-indigo-400 font-bold text-sm">{product.category}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-md">
          {product.name}
        </h2>
        
        <p className="text-sm text-gray-200 line-clamp-2 max-w-[80%]">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="text-3xl font-extrabold text-white">
            {product.price}
          </div>
          <button 
            onClick={handleRedirect}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-black font-bold rounded-full transition-transform active:scale-95 hover:bg-gray-200"
          >
            <span>View on {product.platform}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
