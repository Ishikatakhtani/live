import React from 'react';
import { Container } from 'react-bootstrap';
import Nav2 from './Nav2';

import "./Product.css";
import ProductForm from './ProductForm';
const AddProduct = () => (
   <div style={{display:"flex"}}>
   <Nav2/>
  <Container id='div1'  >

 <ProductForm/>
  </Container>
  </div>
);

export default AddProduct;
