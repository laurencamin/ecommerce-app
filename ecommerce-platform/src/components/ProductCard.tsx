import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
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

