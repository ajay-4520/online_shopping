
import React, { useEffect, useState, useRef } from 'react';
import { fetchTrendingProducts } from './services/geminiService';
import { Product } from './types';
import { ProductCard } from './components/ProductCard';
import { Sparkles, Loader2, Home, Search, PlusCircle, User, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchTrendingProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-lg font-medium animate-pulse">Curating your AI feed...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-black flex justify-center">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-indigo-500 w-6 h-6" />
          <h1 className="text-xl font-black tracking-tighter italic">SHOPREEL</h1>
        </div>
        <div className="flex space-x-4 text-sm font-semibold">
          <button className="border-b-2 border-white pb-1">For You</button>
          <button className="text-gray-400">Following</button>
        </div>
        <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Main Reel Container */}
      <main 
        ref={containerRef}
        className="w-full max-w-lg h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar border-x border-white/5"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {/* End of Feed Footer */}
        <div className="h-screen flex flex-col items-center justify-center snap-start bg-neutral-900 p-8 text-center">
          <Sparkles className="w-16 h-16 text-indigo-500 mb-6" />
          <h2 className="text-2xl font-bold mb-2">You're all caught up!</h2>
          <p className="text-gray-400 mb-8">Our AI is finding more trending deals just for you.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-indigo-600 rounded-full font-bold hover:bg-indigo-700 transition-colors"
          >
            Refresh Feed
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full max-w-lg left-1/2 -translate-x-1/2 flex items-center justify-between px-8 py-4 bg-black border-t border-white/10 z-50">
        <button className="flex flex-col items-center text-white">
          <Home className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <MessageCircle className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center text-white">
          <div className="p-1 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500">
             <PlusCircle className="w-7 h-7" />
          </div>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Search className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <User className="w-6 h-6" />
        </button>
      </nav>

      {/* Desktop Helper */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col space-y-4 max-w-xs">
        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            AI Curator
          </h3>
          <p className="text-sm text-gray-400">
            Welcome to ShopReel! We've aggregated top products from across the web. 
            Scroll down to explore, double tap to like, and click "View" to visit the store.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
