import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "/components/ui/card";
import { Button } from "/components/ui/button";
import { CartItem } from '../types';

interface ShoppingCartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, onUpdateQuantity }) => {
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
                    size="sm" 
                    variant="outline" 
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button 
                    size="sm" 
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


