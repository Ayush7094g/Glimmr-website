// src/components/ProductDetail.js
import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>Price: {product.price}</p>
      <button className="mt-2 bg-blue-500 text-white p-2"></button>
    </div>
  );
};

export default ProductDetail;