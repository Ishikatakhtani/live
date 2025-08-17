// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
// import Nav2 from './Nav2';

// function Catlog() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const storeName = location.state?.storeName || localStorage.getItem("storeName") || 'Your Store';

//   const [activeTab, setActiveTab] = useState("products");
//   const [allProducts, setAllProducts] = useState([]);
//   const [allServices, setAllServices] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(10000);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     const productList = JSON.parse(localStorage.getItem("allProducts")) || [];
//     const serviceList = JSON.parse(localStorage.getItem("allServices")) || [];

//     const storeProducts = productList.filter(p => p.storeName === storeName);
//     const storeServices = serviceList.filter(s => s.storeName === storeName);

//     setAllProducts(storeProducts);
//     setAllServices(storeServices);
//   }, [storeName]);

//   useEffect(() => {
//     setFilteredProducts(
//       allProducts.filter(p =>
//         p.price >= minPrice &&
//         p.price <= maxPrice &&
//         Object.values(p).some(val => typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase()))
//       )
//     );
//     setFilteredServices(
//       allServices.filter(s =>
//         s.rate >= minPrice &&
//         s.rate <= maxPrice &&
//         Object.values(s).some(val => typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase()))
//       )
//     );
//   }, [allProducts, allServices, minPrice, maxPrice, searchQuery]);

//   const handleSelectAll = () => {
//     const allIds = activeTab === "products"
//       ? filteredProducts.map(p => p.name)
//       : filteredServices.map(s => s.name);
//     setSelectedItems(allIds);
//   };

//   const handleDeleteSelected = () => {
//     if (activeTab === "products") {
//       const remaining = allProducts.filter(p => !selectedItems.includes(p.name));
//       setAllProducts(remaining);
//       localStorage.setItem("allProducts", JSON.stringify(remaining));
//     } else {
//       const remaining = allServices.filter(s => !selectedItems.includes(s.name));
//       setAllServices(remaining);
//       localStorage.setItem("allServices", JSON.stringify(remaining));
//     }
//     setSelectedItems([]);
//   };

//   const toggleItem = (name) => {
//     setSelectedItems(prev =>
//       prev.includes(name) ? prev.filter(id => id !== name) : [...prev, name]
//     );
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <Nav2 />
//       <div style={{ flexGrow: 1, padding: '20px' }}>
//         <Container fluid>
//           <Row className="mb-3">
//             <Col><h2 className="fw-bold">{storeName} Catalog</h2></Col>
//           </Row>

//           <Row className="mb-3 align-items-center">
//             <h4 className="text-muted mb-3">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h4>
//             <Col xs={12} md={3} className="mb-2">
//               <Form.Control
//                 type="text"
//                 placeholder="Search by name, category, etc."
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//               />
//             </Col>
//             <Col xs={6} md={2} className="mb-2">
//               <Form.Control
//                 type="number"
//                 placeholder="Min Price"
//                 value={minPrice}
//                 onChange={e => setMinPrice(Number(e.target.value))}
//               />
//             </Col>
//             <Col xs={6} md={2} className="mb-2">
//               <Form.Control
//                 type="number"
//                 placeholder="Max Price"
//                 value={maxPrice}
//                 onChange={e => setMaxPrice(Number(e.target.value))}
//               />
//             </Col>
          
//             <Col xs={6} md={2} className="mb-2">
//               <Form.Range
//                 min={0}
//                 max={10000}
//                 value={maxPrice}
//                 onChange={e => setMaxPrice(Number(e.target.value))}
//               />
//             </Col>
//             <Col xs={6} md={2} className="mb-2">
//               <Form.Range
//                 min={0}
//                 max={10000}
//                 value={minPrice}
//                 onChange={e => setMinPrice(Number(e.target.value))}
//               />
           
//             </Col>
//           <Col xs="auto" className="me-2" style={{ minWidth: "80px", paddingBottom:"2%" }}>
//     <Button
//       variant="outline-secondary"
//       className="w-100"
//       onClick={() => {
//         setSearchQuery('');
//         setMinPrice(0);
//         setMaxPrice(10000);
//       }}
//     >
//       Clear
//     </Button>
//   </Col>
//           </Row>

//           <Row className="justify-content-center mb-3">
//             <Col md="auto">
//               <Button variant={activeTab === "products" ? "primary" : "outline-primary"} onClick={() => setActiveTab("products")}>Products</Button>{' '}
//               <Button variant={activeTab === "services" ? "primary" : "outline-primary"} onClick={() => setActiveTab("services")}>Services</Button>
//             </Col>
//           </Row>

//           <Row className="mb-2">
//             <Col>
//               <Button variant="secondary" onClick={handleSelectAll}>Select All</Button>{' '}
//               <Button variant="danger" onClick={handleDeleteSelected}>Delete Selected</Button>
//             </Col>
//           </Row>

//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Select</th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>{activeTab === "products" ? "Price" : "Rate"}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {(activeTab === "products" ? filteredProducts : filteredServices).length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center text-muted">
//                     No {activeTab} found.
//                   </td>
//                 </tr>
//               ) : (
//                 (activeTab === "products" ? filteredProducts : filteredServices).map((item, index) => (
//                   <tr key={index}>
//                     <td>
//                       <Form.Check
//                         type="checkbox"
//                         checked={selectedItems.includes(item.name)}
//                         onChange={() => toggleItem(item.name)}
//                       />
//                     </td>
//                     <td>
//                       <img
//                         src={item.media?.[0] || "https://via.placeholder.com/80"}
//                         alt=""
//                         width="80"
//                         height="80"
//                         style={{ cursor: 'pointer' }}
//                         onClick={() => navigate('/product-details', { state: { storeName, item } })}
//                       />
//                     </td>
//                     <td
//                       style={{ cursor: 'pointer' }}
//                       onClick={() => navigate('/product-details', { state: { storeName, item } })}
//                     >
//                       {item.name}
//                     </td>
//                     <td>{item.category}</td>
//                     <td>₹{activeTab === "products" ? item.price : item.rate}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default Catlog;


import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import Nav2 from './Nav2';

function Catlog() {
  const navigate = useNavigate();
  const location = useLocation();
  const storeName = location.state?.storeName || localStorage.getItem("storeName") || 'Your Store';

  const [activeTab, setActiveTab] = useState("products");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/store`);
        const data = await res.json();

        const matchedStore = data.find(
          store => store.storeName?.toLowerCase() === storeName.toLowerCase()
        );

        if (matchedStore) {
          setAllProducts(matchedStore.products || []);
        } else {
          setAllProducts([]);
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
        setAllProducts([]);
      }
    };

    fetchStoreData();
  }, [storeName]);

  useEffect(() => {
    setFilteredProducts(
      allProducts.filter(p => {
        const price = parseFloat(p.productProperties?.price) || 0;
        const textMatch = p.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    // To persist delete, you would PATCH the backend here (not shown)
  };

  const toggleItem = (name) => {
    setSelectedItems(prev =>
      prev.includes(name) ? prev.filter(id => id !== name) : [...prev, name]
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <Nav2 />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Container fluid>
          <Row className="mb-3">
            <Col><h2 className="fw-bold">{storeName} Catalog</h2></Col>
          </Row>

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
            <Col xs={6} md={2} className="mb-2">
              <Form.Range
                min={0}
                max={10000}
                value={minPrice}
                onChange={e => setMinPrice(Number(e.target.value))}
              />
            </Col>
            <Col xs={6} md={2} className="mb-2">
              <Form.Range
                min={0}
                max={10000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
              />
            </Col>
            <Col xs="auto" className="me-2" style={{ minWidth: "80px", paddingBottom: "2%" }}>
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

          <Row className="mb-2">
            <Col>
              <Button variant="secondary" onClick={handleSelectAll}>Select All</Button>{' '}
              {/* <Button variant="danger" onClick={handleDeleteSelected}>Delete Selected</Button> */}
            </Col>
          </Row>

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
                  <td colSpan="5" className="text-center text-muted">
                    No products found.
                  </td>
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
                       // onClick={() => navigate('/product-details', { state: { storeName, item } })}
                      onClick={() => navigate(`/product-details/${item.productId}`)}

                      />
                    </td>
                    <td
                      style={{ cursor: 'pointer' }}
                    //  onClick={() => navigate('/product-details', { state: { storeName, item } })}
                  onClick={() => navigate(`/product-details/${item.productId}`)}

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
           <Row className="mb-3">
            <Col className="d-flex justify-content-end">
             
              <Button variant="danger" onClick={handleDeleteSelected}>
                Delete Selected
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Catlog;
