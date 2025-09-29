import React from 'react';
import { Button } from "../components/ui/button";

interface HeaderProps {
  cartItemCount: number;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
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
