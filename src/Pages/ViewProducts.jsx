// import React, { useEffect, useState } from "react";
// import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Nav2 from "./Nav2";
// import { useLocation } from "react-router-dom";


// function ViewProducts() {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   const navigate = useNavigate();

// const location = useLocation();
// const storeName = location.state?.storeName || localStorage.getItem("storeName");

//   // useEffect(() => {
//   //   axios.get("http://localhost:3000/store")
//   //     .then((res) => {
//   //       const allProducts = res.data.products || [];
//   //       setProducts(allProducts);
//   //       setFiltered(allProducts);
//   //     })
//   //     .catch((err) => {
//   //       console.error("Error fetching products:", err);
//   //     });
//   // }, []);

//   useEffect(() => {
//   axios.get("http://localhost:3000/store")
//     .then((res) => {
//       const storeData = res.data;

//       // If you have multiple stores in db.json (array of stores)
//       // then find the correct store:
//       const currentStore = Array.isArray(storeData)
//         ? storeData.find((s) => s.storeName === storeName)
//         : storeData;

//       const allProducts = currentStore?.products || [];
//       setProducts(allProducts);
//       setFiltered(allProducts);
//     })
//     .catch((err) => {
//       console.error("Error fetching products:", err);
//     });
// }, [storeName]);


//   useEffect(() => {
//     let result = products.filter((p) => {
//       const nameMatch = p.productName.toLowerCase().includes(search.toLowerCase());
//       const categoryMatch = category ? (p.category || p.productProperties.brand)?.toLowerCase() === category.toLowerCase() : true;
//       const price = p.price || 0;
//       const minOk = minPrice === "" || price >= parseFloat(minPrice);
//       const maxOk = maxPrice === "" || price <= parseFloat(maxPrice);
//       return nameMatch && categoryMatch && minOk && maxOk;
//     });
//     setFiltered(result);
//   }, [search, category, minPrice, maxPrice, products]);

//   const handleAddToCart = (product) => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push(product);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert("Product added to cart!");
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Nav2 />
//       <div style={{ flexGrow: 1, padding: "20px" }}>
//         <Container fluid>
//           <h2 className="fw-bold mb-4" style={{ color: "#333" }}>View Products</h2>

//           {/* === Filters === */}
//           <Form className="mb-4 p-3 rounded bg-light border">
//             <Row className="g-2">
//               <Col md={3}>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search by name"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </Col>
//               <Col md={3}>
//                 <Form.Control
//                   type="text"
//                   placeholder="Filter by category"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 />
//               </Col>
//               <Col md={2}>
//                 <Form.Control
//                   type="number"
//                   placeholder="Min Price"
//                   value={minPrice}
//                   onChange={(e) => setMinPrice(e.target.value)}
//                 />
//               </Col>
//               <Col md={2}>
//                 <Form.Control
//                   type="number"
//                   placeholder="Max Price"
//                   value={maxPrice}
//                   onChange={(e) => setMaxPrice(e.target.value)}
//                 />
//               </Col>
//               <Col md={2}>
//                 <Button variant="secondary" onClick={() => {
//                   setSearch(""); setCategory(""); setMinPrice(""); setMaxPrice("");
//                 }}>
//                   Clear Filters
//                 </Button>
//               </Col>
//             </Row>
//           </Form>

//           {/* === Products === */}
//           <Row>
//             {filtered.length === 0 ? (
//               <p>No products match your filter.</p>
//             ) : (
//               filtered.map((product, index) => (
//                 <Col key={product.productId || index} xs={12} sm={6} md={4} className="mb-4">
//                   <Card className="h-100 shadow-sm">
//                     <Card.Img
//                       variant="top"
//                       src={"https://via.placeholder.com/300x200?text=" + encodeURIComponent(product.productName)}
//                       alt={product.productName}
//                       height="200"
//                       style={{ objectFit: "cover" }}
//                     />
//                     <Card.Body>
//                       <Card.Title>{product.productName}</Card.Title>
//                       <Card.Text>
//                         <strong>Brand:</strong> {product.productProperties.brand}<br />
//                         <strong>Color:</strong> {product.productProperties.color}<br />
//                         {product.productProperties.storage && (
//                           <><strong>Storage:</strong> {product.productProperties.storage}<br /></>
//                         )}
//                         {product.productProperties.screenSize && (
//                           <><strong>Screen Size:</strong> {product.productProperties.screenSize}<br /></>
//                         )}
//                         {product.productProperties.connectivity && (
//                           <><strong>Connectivity:</strong> {product.productProperties.connectivity}<br /></>
//                         )}
//                         {product.productProperties.batteryLife && (
//                           <><strong>Battery Life:</strong> {product.productProperties.batteryLife}<br /></>
//                         )}
//                         {product.price && (
//                           <><strong>Price:</strong> ₹{product.price.toLocaleString()}<br /></>
//                         )}
//                       </Card.Text>
//                       <Button
//                         variant="primary"
//                         onClick={() => handleAddToCart(product)}
//                        // variant="warning" onClick={() => navigate("/cart")}
//                       >
//                         Add to Cart
//                       </Button>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))
//             )}
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default ViewProducts;

import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Nav2 from "./Nav2";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const storeName = location.state?.storeName || localStorage.getItem("storeName");

  // Fetch products of current store
  useEffect(() => {
    axios.get("http://localhost:3000/store")
      .then((res) => {
        const storeData = res.data;
        
        const currentStore = Array.isArray(storeData)
          ? storeData.find((s) => s.storeName === storeName)
          : storeData;

        const allProducts = currentStore?.products || [];
        setProducts(allProducts);
        setFiltered(allProducts);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [storeName]);

  // Filtering logic
  useEffect(() => {
    let result = products.filter((p) => {
      const nameMatch = p.productName.toLowerCase().includes(search.toLowerCase());
      const categoryMatch = category
        ? (p.category || p.productProperties.brand)?.toLowerCase() === category.toLowerCase()
        : true;
      const price = p.price || 0;
      const minOk = minPrice === "" || price >= parseFloat(minPrice);
      const maxOk = maxPrice === "" || price <= parseFloat(maxPrice);
      return nameMatch && categoryMatch && minOk && maxOk;
    });
    setFiltered(result);
  }, [search, category, minPrice, maxPrice, products]);

  // Add to cart (save in db.json/cart)
  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:3000/cart", {
        ...product,
        storeName: storeName,   // add store info so we can filter later
        quantity: 1
      });
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Nav2 />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Container fluid>
          <h2 className="fw-bold mb-4" style={{ color: "#333" }}>View Products</h2>

          {/* === Filters === */}
          <Form className="mb-4 p-3 rounded bg-light border">
            <Row className="g-2">
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Search by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Filter by category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Button variant="secondary" onClick={() => {
                  setSearch(""); setCategory(""); setMinPrice(""); setMaxPrice("");
                }}>
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </Form>

          {/* === Products === */}
          <Row>
            {filtered.length === 0 ? (
              <p>No products match your filter.</p>
            ) : (
              filtered.map((product, index) => (
                <Col key={product.productId || index} xs={12} sm={6} md={4} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={"https://via.placeholder.com/300x200?text=" + encodeURIComponent(product.productName)}
                      alt={product.productName}
                      height="200"
                      style={{ objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{product.productName}</Card.Title>
                      <Card.Text>
                        <strong>Price:</strong> {product.productProperties.price}<br />
                        <strong>Category:</strong> {product.productProperties.category}<br />
                        {product.productProperties.storage && (
                          <><strong>Storage:</strong> {product.productProperties.storage}<br /></>
                        )}
                        {product.productProperties.screenSize && (
                          <><strong>Screen Size:</strong> {product.productProperties.screenSize}<br /></>
                        )}
                        {product.productProperties.connectivity && (
                          <><strong>Connectivity:</strong> {product.productProperties.connectivity}<br /></>
                        )}
                        {product.productProperties.batteryLife && (
                          <><strong>Battery Life:</strong> {product.productProperties.batteryLife}<br /></>
                        )}
                        {product.price && (
                          <><strong>Price:</strong> ₹{product.price.toLocaleString()}<br /></>
                        )}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        className="ms-2"
                        variant="warning"
                        onClick={() => navigate("/cart")}
                      >
                        Go to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ViewProducts;

