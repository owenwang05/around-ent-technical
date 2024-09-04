const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//implement the CORS config
const cors = require('cors'); 
app.use(cors());

//products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
    { id: 7, name: 'Product 7', description: 'description 7', price: 5000, imageUrl: '' }, 
    { id: 8, name: 'Product 8', description: 'description 8', price: 120, imageUrl: '' },
];

//function to generate a url for getting a random image from picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

//implement the get api for getting products
app.get('/api/products', (req, res) => {
  for(let i = 0; i < products.length; i++){
    if(products[i].imageUrl === ''){
      products[i].imageUrl = fetchImageUrl(); 
    }
    console.log(products[i].imageUrl)
  }
  res.status(200).json({"products": products});
});

//implement the delete api for deleting a product by Id
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(product => product.id !== id);
  res.status(202).json({ message: `Successfully deleted product with id: ${id}` });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
