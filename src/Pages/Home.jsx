// // Home.jsx
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './Home.css';

// function Home() {
//   const location = useLocation();
//   const navigate = useNavigate();

// const storeName = location.state?.storeName || localStorage.getItem("storeName") || 'Your Store';

// useEffect(() => {
//   if (storeName && storeName !== 'Your Store') {
//     localStorage.setItem("storeName", storeName);
//   }
// }, [storeName]);

//   //const storeName = location.state?.storeName || 'Your Store';

//   const [stepsCompleted, setStepsCompleted] = useState({
//     store: false,
//     products: false,
//     payment: false,
//   });

//   useEffect(() => {
//     setStepsCompleted({
//       store: !!storeName?.trim(),
//       products: localStorage.getItem("productsStep") === "completed",
//       payment: localStorage.getItem("paymentStep") === "completed",
//     });
//   }, [storeName]);

//   return (
//     <div id="dashboard">
//       <aside id="side">
//         <div id="logo1">Local<span id='biz-color'>Scope</span></div>
//         <nav id="menu">
//           <span className="active">Home</span>
//          <span
//   onClick={() => {
//     console.log("Store being passed:", storeName);
//    navigate('/catlog', { state: { storeName } });
//   }}
  
// >
//   Catalog
// </span>

//     <span 
//       onClick={() => navigate("/add-product", { state: { storeName } })} 
//     >Add Products</span>
    
//           <span>Orders</span>
//           <span>Analytics</span>
//           <span>Reviews</span>
//           <hr />
       
//         </nav>
//       </aside>

//       <div id="main" style={{backgroundImage:`url('https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg')`}}>
//         <header id="topbar">
//           <div></div>
//           <div id="help1">
//             <button>Help</button>
//             <div className="avatar1">{storeName.charAt(0).toUpperCase()}</div>
//           </div>
//         </header>

//         <section className="content" >
//           <h1 style={{ marginBottom: "5%" }}>Welcome, {storeName}</h1>

//           <div className="main-grid"style={{ marginBottom: "5%" }}>
//             <div className="status-card">
//               {/* <h3>Your store is still offline</h3> */}
//               {/* <p>
//                 {
//                   stepsCompleted.payment
//                     ? "You're ready to go live!"
//                     : stepsCompleted.products
//                       ? "Just 1 more step to go!"
//                       : "Complete just 2 more steps to start selling!"
//                 }
//               </p> */}

//               <div className="progress-tracker">
//                 <div className={`step completed`}>
//                   <div className="circle">✔</div>
//                 </div>

//                 <div className="dots" />

//                 <div className={`step ${stepsCompleted.products ? 'completed' : stepsCompleted.store ? 'current' : ''}`}>
//                   <div className="circle">
//                     {stepsCompleted.products ? '✔' : ''}
//                   </div>
//                 </div>

//                 <div className="dots" />

//                 {/* <div className={`step ${stepsCompleted.payment ? 'completed' : (stepsCompleted.products ? 'current' : '')}`}>
//                   <div className="circle">
//                     {stepsCompleted.payment ? '✔' : ''}
//                   </div>
//                 </div> */}
//               </div>

//               <div className="steps">
//                 {/* PENDING Steps First */}
//                 {/* {!stepsCompleted.store && (
//                   <div className="step-row" onClick={() => navigate('/store-details')}>
//                     <span>🏬 Enter store details</span>
//                     <span className="arrow-icon">➔</span>
//                   </div>
//                 )} */}

//                 {!stepsCompleted.products && (
//                   <div className="step-row" onClick={() => navigate('/add-product')}>
//                     <span>🛒 Add your first product</span>
//                     <span className="arrow-icon">➔</span>
//                   </div>
//                 )}

//                 {/* {!stepsCompleted.payment && (
//                   <div className="step-row" onClick={() => navigate('/payments', { state: { storeName } })}>
//                     <span>💳 Setup Payments</span>
//                     <span className="arrow-icon">➔</span>
//                   </div>
//                 )} */}

//                 {/* COMPLETED Steps After */}
//                 {/* {stepsCompleted.store && (
//                   <div className="step-row completed">
//                     <span>🏬 Enter store details</span>
//                     <span className="check-icon">✔</span>
//                   </div>
//                 )} */}

//                 {stepsCompleted.products && (
//                   <div className="step-row completed">
//                     <span>🛒 Add your first product</span>
//                     <span className="check-icon">✔</span>
//                   </div>
//                 )}

//                 {/* {stepsCompleted.payment && (
//                   <div className="step-row completed">
//                     <span>💳 Setup Payments</span>
//                     <span className="check-icon">✔</span>
//                   </div>
//                 )} */}

//                 {/* Final Success Message */}
//                 {stepsCompleted.store && stepsCompleted.products && stepsCompleted.payment && (
//                   <div className="completion-message">
//                     <h4 style={{ marginTop: "20px", color: "var(--primary)" }}>
//                       🎉 Congratulations! Your store is now live and ready to sell.
//                     </h4>
//                     <div
//                       className="step-row"
//                       style={{ cursor: "pointer", marginTop: "12px" }}
//                       onClick={() => navigate('/catlog')}
//                     >
//                       <span>🛍️ View Your Products</span>
//                       <span className="arrow-icon">➔</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Home;


// Home.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import './Home.css';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const storeName =
    location.state?.storeName ||
    localStorage.getItem("storeName") ||
    'Your Store';

  const [stepsCompleted, setStepsCompleted] = useState({
    store: false,
    products: false,
    payment: false,
  });

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // Store name persistence
  useEffect(() => {
    if (storeName && storeName !== 'Your Store') {
      localStorage.setItem("storeName", storeName);
    }
  }, [storeName]);

  // Fetch store data + set steps
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/store`);
        const data = await res.json();
        const matchedStore = data.find(
          store => store.storeName?.toLowerCase() === storeName.toLowerCase()
        );

        const hasProducts = matchedStore?.products?.length > 0;
        setAllProducts(matchedStore?.products || []);

        setStepsCompleted({
          store: !!storeName?.trim(),
          products: hasProducts,
          payment: localStorage.getItem("paymentStep") === "completed",
        });
      } catch (error) {
        console.error("Error fetching store data:", error);
        setAllProducts([]);
        setStepsCompleted(prev => ({ ...prev, products: false }));
      }
    };

    fetchProducts();
  }, [storeName]);

  // Filtering logic
  useEffect(() => {
    setFilteredProducts(
      allProducts.filter(p => {
        const price = parseFloat(p.productProperties?.price) || 0;
        const textMatch =
          p.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.productProperties?.category?.toLowerCase().includes(searchQuery.toLowerCase());

        return price >= minPrice && price <= maxPrice && textMatch;
      })
    );
  }, [allProducts, minPrice, maxPrice, searchQuery]);

  const handleSelectAll = () => {
    const allIds = filteredProducts.map(p => p.productName);
    setSelectedItems(allIds);
  };

  const handleDeleteSelected = () => {
    const remaining = allProducts.filter(p => !selectedItems.includes(p.productName));
    setAllProducts(remaining);
    setSelectedItems([]);
    // Optional: Persist delete with backend PATCH/PUT
  };

  const toggleItem = (name) => {
    setSelectedItems(prev =>
      prev.includes(name) ? prev.filter(id => id !== name) : [...prev, name]
    );
  };

  return (
    <div id="dashboard">
      <aside id="side">
        <div id="logo1">Local<span id='biz-color'>Scope</span></div>
        <nav id="menu">
          <span className="active">Home</span>
          <span onClick={() => navigate('/catlog', { state: { storeName } })}>Catalog</span>
          <span onClick={() => navigate("/add-product", { state: { storeName } })}>Add Products</span>
          <span>Orders</span>
          <span>Analytics</span>
          <span>Reviews</span>
          <hr />
        </nav>
      </aside>

      <div
        id="main"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg')`,
          backgroundSize: "cover"
        }}
      >
        <header id="topbar">
          <div></div>
          <div id="help1">
            <button>Help</button>
            <div className="avatar1">{storeName.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <section className="content" >
          {stepsCompleted.products ? (
            // ✅ Catalog View
            <>
              <h2 className="fw-bold mb-4">{storeName} Catalog</h2>

              {/* Filters */}
              <Row className="mb-3 align-items-center">
                <h4 className="text-muted mb-3">Products</h4>
                <Col xs={12} md={3} className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Search by name or category"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </Col>
                <Col xs={6} md={2} className="mb-2">
                  <Form.Control
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={e => setMinPrice(Number(e.target.value))}
                  />
                </Col>
                <Col xs={6} md={2} className="mb-2">
                  <Form.Control
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                  />
                </Col>
                <Col xs="auto" className="me-2" style={{ minWidth: "80px" }}>
                  <Button
                    variant="outline-secondary"
                    className="w-100"
                    onClick={() => {
                      setSearchQuery('');
                      setMinPrice(0);
                      setMaxPrice(10000);
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>

              {/* Actions */}
              <Row className="mb-2">
                <Col>
                  <Button variant="secondary" onClick={handleSelectAll}>Select All</Button>{' '}
                  <Button variant="danger" onClick={handleDeleteSelected}>Delete Selected</Button>
                </Col>
              </Row>

              {/* Products Table */}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No products found.</td>
                    </tr>
                  ) : (
                    filteredProducts.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={selectedItems.includes(item.productName)}
                            onChange={() => toggleItem(item.productName)}
                          />
                        </td>
                        <td>
                          <img
                            src={item.productProperties?.media?.[0] || "https://via.placeholder.com/80"}
                            alt=""
                            width="80"
                            height="80"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/product-details', { state: { storeName, item } })}
                          />
                        </td>
                        <td
                          style={{ cursor: 'pointer' }}
                          onClick={() => navigate('/product-details', { state: { storeName, item } })}
                        >
                          {item.productName}
                        </td>
                        <td>{item.productProperties?.category}</td>
                        <td>₹{item.productProperties?.price}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </>
          ) : (
            // 🚀 Onboarding View
            <>
              <h1 style={{ marginBottom: "5%" }}>Welcome, {storeName}</h1>
              <div className="main-grid" style={{ marginBottom: "5%" }}>
                <div className="status-card">
                  <div className="progress-tracker">
                    <div className={`step completed`}>
                      <div className="circle">✔</div>
                    </div>
                    <div className="dots" />
                    <div className={`step ${stepsCompleted.store ? 'current' : ''}`}>
                      <div className="circle"></div>
                    </div>
                    <div className="dots" />
                  </div>

                  <div className="steps">
                    <div className="step-row" onClick={() => navigate('/add-product', { state: { storeName } })}>
                      <span>🛒 Add your first product</span>
                      <span className="arrow-icon">➔</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
