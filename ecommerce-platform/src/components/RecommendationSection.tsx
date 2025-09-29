import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Product, AIRecommendation } from '../types';

interface RecommendationSectionProps {
  recommendations: AIRecommendation[];
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({ recommendations, products, onAddToCart }) => {
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


