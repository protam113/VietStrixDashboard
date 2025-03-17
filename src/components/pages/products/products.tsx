import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

// Fake data
const products = [
  {
    key: '1',
    name: 'Wireless Headphones',
    image: '/images/headphones.jpg',
    price: 99.99,
    buyers: 120,
  },
  {
    key: '2',
    name: 'Smart Watch',
    image: '/images/smartwatch.jpg',
    price: 199.99,
    buyers: 95,
  },
  {
    key: '3',
    name: 'Gaming Mouse',
    image: '/images/mouse.jpg',
    price: 49.99,
    buyers: 200,
  },
  {
    key: '4',
    name: 'Mechanical Keyboard',
    image: '/images/keyboard.jpg',
    price: 150.0,
    buyers: 180,
  },
];

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className="w-60 p-4 m-4 shadow-lg">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="rounded"
      />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>
      <p className="text-gray-500">Buyers: {product.buyers}</p>
    </Card>
  );
};

const ProductList = () => {
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <h1 className="text-2xl font-bold mb-4 col-span-full">Product List</h1>
      {products.map((product) => (
        <ProductCard key={product.key} product={product} />
      ))}
    </div>
  );
};
export default ProductList;
