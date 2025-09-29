import { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { products } from '../data/products';

export const useAIRecommendations = (cartItems: CartItem[], chatMessages: string[]) => {
  const [recommendations, setRecommendations] = useState<{ productId: number; reason: string }[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (cartItems.length === 0 && chatMessages.length === 0) return;
      
      try {
        // Prepare context for AI
        const cartContext = cartItems.length > 0 
          ? `User has these items in cart: ${cartItems.map(item => `${item.product.name} (qty: ${item.quantity})`).join(', ')}.`
          : '';
        
        const chatContext = chatMessages.length > 0
          ? `User has expressed interest in: ${chatMessages.join(', ')}.`
          : '';
        
        const response = await fetch('https://oi-server.onrender.com/chat/completions', {
          method: 'POST',
          headers: {
            'CustomerId': 'cus_T7IkLS9uCV5nlW',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer xxx'
          },
          body: JSON.stringify({
            model: 'openrouter/claude-sonnet-4',
            messages: [
              {
                role: 'system',
                content: `You are a product recommendation engine for an ecommerce store. 
                Analyze the user's cart and chat history to suggest relevant products.
                Return ONLY a JSON array of objects with productId and reason properties.
                Available products: ${JSON.stringify(products)}`
              },
              {
                role: 'user',
                content: `${cartContext} ${chatContext} Please recommend 3 products that would complement these interests.`
              }
            ]
          })
        });
        
        const data = await response.json();
        const content = data.choices[0].message.content;
        
        try {
          // Try to parse the JSON response
          const parsedRecs = JSON.parse(content);
          if (Array.isArray(parsedRecs)) {
            setRecommendations(parsedRecs.slice(0, 3));
          }
        } catch {
          // Fallback if JSON parsing fails
          console.log('AI returned non-JSON response, using fallback recommendations');
          setRecommendations([
            { productId: 2, reason: "Pairs well with electronics you're interested in" },
            { productId: 5, reason: "Great for active lifestyles based on your preferences" },
            { productId: 6, reason: "Popular accessory that complements your selections" }
          ]);
        }
      } catch (error) {
        console.error('Error fetching AI recommendations:', error);
        // Fallback recommendations
        setRecommendations([
          { productId: 1, reason: "Popular item frequently bought together with your selections" },
          { productId: 3, reason: "Based on your interest in active lifestyle products" },
          { productId: 4, reason: "Home essential that complements your order" }
        ]);
      }
    };

    fetchRecommendations();
  }, [cartItems, chatMessages]);

  return recommendations;
};

