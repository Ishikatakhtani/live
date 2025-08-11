// Nav2.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Nav2.css';

const Nav2 = () => {
 const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const storeName =
    location.state?.storeName ||
    localStorage.getItem('storeName') ||
    'Your Store';

  return (
    <aside id="side">
      <div id="logo1">
        Local<span id="biz-color">Scope</span>
      </div>
      <nav id="menu">
        <span
          className={currentPath === '/home' ? 'active' : ''}
          onClick={() => navigate('/home', { state: { storeName } })}
        >
          Home
        </span>
        <span
          className={currentPath === '/catlog' ? 'active' : ''}
          onClick={() => navigate('/catlog', { state: { storeName } })}
        >
          Catalog
        </span>
        <span
          className={currentPath === '/add-product' ? 'active' : ''}
          onClick={() => navigate('/add-product', { state: { storeName } })}
        >
          Add Products
        </span>
         <span
          className={currentPath === '/add-service' ? 'active' : ''}
          onClick={() => navigate('/add-service', { state: { storeName } })}
        >
          Add services
        </span>
        <span
          className={currentPath === '/viewproduct' ? 'active' : ''}
          onClick={() => navigate('/viewproduct', { state: { storeName } })}
        >
          View Product
        </span>
        {/* <span
          className={currentPath === '/analytics' ? 'active' : ''}
          onClick={() => navigate('/analytics', { state: { storeName } })}
        >
          Analytics
        </span>
        <span
          className={currentPath === '/reviews' ? 'active' : ''}
          onClick={() => navigate('/reviews', { state: { storeName } })}
        >
          Reviews
        </span> */}
        <hr />
      </nav>
    </aside>
  );
};

export default Nav2;
