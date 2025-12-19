
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  platform: 'Amazon' | 'eBay' | 'Walmart' | 'Shopify' | 'Etsy';
  imageUrl: string;
  productUrl: string;
  category: string;
}

export interface ProductFeedResponse {
  products: Product[];
}
