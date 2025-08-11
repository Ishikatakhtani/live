// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StoreForm from './Pages/StoreForm';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout from './Layout';
import Home from './Pages/Home';
import AddProduct from './Pages/AddProduct';
import Payments from './Pages/Paymensts';
import Catlog from './Pages/Catlog';
import ProductDetails from './Pages/ProductDetails';
import EditProduct from './Pages/EditProduct';
import ServiceForm from './Pages/ServiceForm';
import ViewProducts from './Pages/ViewProducts';
import CustomerProduct from './Pages/CustomerProduct';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* All these pages will show Footer */}
          <Route index element={<StoreForm />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
           <Route path="Home" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
             <Route path="/add-service" element={<ServiceForm />} />
  <Route path="/payments" element={<Payments />} />
    <Route path="/catlog" element={<Catlog />} />
      <Route path="/viewproduct" element={<ViewProducts />} />
     <Route path="/product-details" element={<ProductDetails />} />
   <Route path="/customer-product" element={<CustomerProduct />} />
<Route path="/editProduct/:name" element={<EditProduct />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
