import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

// Product type definition
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
}

// Shopping cart item type
interface CartItem {
  product: Product;
  quantity: number;
}

// AI Recommendation response type
interface AIRecommendation {
  productId: number;
  reason: string;
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    price: 199.99,
    category: "Electronics",
    rating: 4.5
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Fitness tracker with heart rate monitor and smartphone notifications",
    price: 159.99,
    category: "Electronics",
    rating: 4.3
  },
  {
    id: 3,
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned soles for maximum comfort",
    price: 89.99,
    category: "Clothing",
    rating: 4.7
  },
  {
    id: 4,
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe to keep coffee hot",
    price: 79.99,
    category: "Home",
    rating: 4.2
  },
  {
    id: 5,
    name: "Yoga Mat",
    description: "Eco-friendly non-slip yoga mat with carrying strap",
    price: 29.99,
    category: "Fitness",
    rating: 4.6
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Waterproof portable speaker with 360° sound",
    price: 129.99,
    category: "Electronics",
    rating: 4.4
  }
];

// Product Card Component
const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="h-48 bg-muted rounded-md flex items-center justify-center overflow-hidden">
          <img 
            src={`https://placeholder-image-service.onrender.com/image/300x200?prompt=${encodeURIComponent(`Product image for ${product.name} in ${product.category} category`)}&id=${product.id}&customer_id=cus_T7IkLS9uCV5nlW`} 
            alt={`Product image of ${product.name} showing its features and design`}
            className="object-cover w-full h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
        <CardDescription className="mb-3">{product.description}</CardDescription>
        <div className="flex justify-between items-center">
          <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">{product.category}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

// Product Grid Component
const ProductGrid: React.FC<{ products: Product[]; onAddToCart: (product: Product) => void }> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

// Shopping Cart Component
const ShoppingCart: React.FC<{ cartItems: CartItem[]; onUpdateQuantity: (productId: number, quantity: number) => void }> = ({ cartItems, onUpdateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Shopping Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="w-full flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button className="w-full" disabled={cartItems.length === 0}>
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

// Recommendation Section Component
const RecommendationSection: React.FC<{ 
  recommendations: AIRecommendation[]; 
  products: Product[];
  onAddToCart: (product: Product) => void;
}> = ({ recommendations, products, onAddToCart }) => {
  const recommendedProducts = recommendations
    .map(rec => products.find(p => p.id === rec.productId))
    .filter(Boolean) as Product[];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
      {recommendedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedProducts.map(product => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="p-4">
                <div className="h-32 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://placeholder-image-service.onrender.com/image/300x150?prompt=${encodeURIComponent(`Recommended product ${product.name}`)}&id=rec-${product.id}&customer_id=cus_T7IkLS9uCV5nlW`} 
                    alt={`Recommended product ${product.name} based on your preferences`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="mt-2">
                  {recommendations.find(r => r.productId === product.id)?.reason}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full" onClick={() => onAddToCart(product)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No recommendations yet. Add items to your cart or chat with our AI assistant for personalized suggestions.</p>
      )}
    </div>
  );
};

// ChatBot Component
const ChatBot: React.FC<{ onSendMessage: (message: string) => void }> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: "Hi! I'm your shopping assistant. How can I help you today?" }
  ]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to chat history
    const userMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    try {
      // Call AI API for recommendations
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
              content: 'You are a helpful shopping assistant for an ecommerce store. Provide friendly, helpful advice about products and make recommendations based on user preferences. Keep responses concise and focused on shopping assistance.'
            },
            {
              role: 'user',
              content: `I need help with: ${message}. Our products include: ${products.map(p => p.name).join(', ')}.`
            }
          ]
        })
      });
      
      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      // Add AI response to chat history
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      
      // Pass the message to parent component for potential recommendations
      onSendMessage(message);
    } catch (error) {
      console.error('Error calling AI API:', error);
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to my recommendation system right now. Please try again later." 
      }]);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>AI Shopping Assistant</CardTitle>
        <CardDescription>Ask for product recommendations or help with your order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto mb-4 space-y-2 p-2 bg-muted rounded-md">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`p-2 rounded-md ${msg.role === 'user' ? 'bg-primary text-primary-foreground ml-8' : 'bg-background border mr-8'}`}>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question here..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Header Component
const Header: React.FC<{ cartItemCount: number }> = ({ cartItemCount }) => {
  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">AI Shop</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Products</Button>
          <Button variant="outline">Categories</Button>
          <Button variant="outline">Deals</Button>
          <div className="relative">
            <Button>
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Custom hook for AI recommendations
const useAIRecommendations = (cartItems: CartItem[], chatMessages: string[]) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

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

// Main App Component
const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  
  const recommendations = useAIRecommendations(cartItems, chatMessages);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleChatMessage = (message: string) => {
    setChatMessages(prev => [...prev, message]);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
            <ProductGrid products={products} onAddToCart={handleAddToCart} />
            
            <RecommendationSection 
              recommendations={recommendations} 
              products={products}
              onAddToCart={handleAddToCart}
            />
            
            <ChatBot onSendMessage={handleChatMessage} />
          </div>
          
          <div className="lg:col-span-1">
            <ShoppingCart 
              cartItems={cartItems} 
              onUpdateQuantity={handleUpdateQuantity} 
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2023 AI Shop. Powered by AI recommendations.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;