
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchTrendingProducts = async (): Promise<Product[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 10 trending and diverse products across tech, fashion, and home categories. Provide realistic data including platform (Amazon, eBay, etc.), price, and a compelling description.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            products: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  price: { type: Type.STRING },
                  platform: { type: Type.STRING, enum: ['Amazon', 'eBay', 'Walmart', 'Shopify', 'Etsy'] },
                  imageUrl: { type: Type.STRING },
                  productUrl: { type: Type.STRING },
                  category: { type: Type.STRING }
                },
                required: ["id", "name", "description", "price", "platform", "imageUrl", "productUrl", "category"]
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '{"products": []}');
    
    // Supplement with high quality placeholder images as the AI might provide broken URLs or text descriptions
    return data.products.map((p: Product, index: number) => ({
      ...p,
      imageUrl: `https://picsum.photos/seed/${p.id || index}/800/1200`,
      productUrl: p.productUrl.startsWith('http') ? p.productUrl : `https://www.${p.platform.toLowerCase()}.com/s?k=${encodeURIComponent(p.name)}`
    }));
  } catch (error) {
    console.error("Error fetching products from Gemini:", error);
    // Fallback data
    return [
      {
        id: "1",
        name: "Eco-Friendly Water Bottle",
        description: "Stay hydrated with this premium insulated flask.",
        price: "$29.99",
        platform: "Amazon",
        imageUrl: "https://picsum.photos/seed/bottle/800/1200",
        productUrl: "https://amazon.com",
        category: "Lifestyle"
      },
      {
        id: "2",
        name: "Vintage Canvas Backpack",
        description: "Perfect for daily commuters and explorers.",
        price: "$45.00",
        platform: "Etsy",
        imageUrl: "https://picsum.photos/seed/bag/800/1200",
        productUrl: "https://etsy.com",
        category: "Fashion"
      }
    ];
  }
};
