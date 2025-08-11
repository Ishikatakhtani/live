import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from './Pages/Footer';

const Layout = () => (
  <>
   
    <main>
      <Outlet /> {/* This renders the child route */}
    </main>
   <Footer/>
  </>
);

export default Layout;
