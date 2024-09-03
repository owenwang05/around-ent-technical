import React, {useState, useEffect} from 'react';
import axios from "axios";

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const ProductList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  //implement the get products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  //implement the delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
    }
  };

  return (
    <Container >
      {products.map((product, index) => (
        <div key={index}>
          {product.name}

          <Button /> 
        </div>
      ))}
    </Container>
  );
};

export default ProductList;