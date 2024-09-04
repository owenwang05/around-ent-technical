import React, { useState, useEffect } from 'react';
import axios from "axios";

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

const ProductList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Implement the get products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      console.log("Fetched Products:", response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Implement the delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
    }
  };

  return (
    <Container>
      <h1 className="text-4xl font-semibold mt-12 mb-8 text-center">
        Product List
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((product, index) => (
          <Card key={index} className="flex flex-col shadow-sm w-72 rounded-lg overflow-hidden relative">
            <div className="h-40">
              <img alt={product.name} src={product.imageUrl} className="w-full h-full object-cover"/>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <h2 className="text-xl font-semibold">
                {product.name}
              </h2>
              <div className="flex flex-col">
                <h3 className="text-lg">
                  ${product.price}
                </h3>
                <p className="text-gray-500">
                  {product.description}
                </p>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(product.id)}
              className="absolute top-1 right-1"
            >
              <DeleteIcon sx={{ color: red[500] }}/>
            </button>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default ProductList;