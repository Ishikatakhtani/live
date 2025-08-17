// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { Container, Row, Col, Button, Card } from 'react-bootstrap';
// import Nav2 from './Nav2';

// function ProductDetails() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   //const { name } = useParams(); // get from URL like /productdetails/:name
//   const { productId } = useParams(); 
//   const [product, setProduct] = useState(location.state?.item || {});
//   const storeName = location.state?.storeName || 'Your Store';

//   useEffect(() => {
//   //   if (!product.name) {
//   //     // fetch from backend or localStorage
//   //     fetch(`http://localhost:3000/products?name=${encodeURIComponent(name)}`)
//   //       .then(res => res.json())
//   //       .then(data => {
//   //         if (data.length > 0) {
//   //           setProduct(data[0]);
//   //         }
//   //       })
//   //       .catch(err => console.error(err));
//   //   }
//   // }, [name, product.name]);
//     // You can fetch from your API here
//     fetch(`http://localhost:3000/products/${productId}`)
//       .then(res => res.json())
//       .then(data => setProduct(data))
//       .catch(err => console.error(err));
//   }, [productId]);

//   const handleEdit = () => {
//     navigate(`/editproduct/${product.name}`, {
//       state: { item: product, storeName, edit: true }
//     });
//   };

//   const productFields = {
//     name: 'Name',
//     category: 'Category',
//     type: 'Type',
//     description: 'Description',
//     price: 'Price',
//     discount: 'Discount',
//     stock: 'Stock',
//     quantity: 'Quantity',
//     sku: 'SKU',
//     variants: 'Variants'
//   };

//   const serviceFields = {
//     name: 'Name',
//     category: 'Category',
//     type: 'Type',
//     description: 'Description',
//     rate: 'Rate',
//     discountedRate: 'Discounted Rate',
//     duration: 'Duration'
//   };

//   const displayFields = product.type === 'Service' ? serviceFields : productFields;

//   return (
//     <div style={{ display: 'flex' }}>
//       <Nav2 />
//       <div style={{ flexGrow: 1, padding: '20px' }}>
//         <Container>
//           <Row className="mb-4">
//             <Col>
//               <h2 style={{ fontWeight: '600' }}>
//                 {storeName} - {product.name || 'Product/Service Details'}
//               </h2>
//             </Col>
//           </Row>

//           <Card className="p-4 shadow-sm border-0 position-relative" style={{ borderRadius: '12px' }}>
//             <Button
//               variant="primary"
//               onClick={handleEdit}
//               style={{
//                 position: 'absolute',
//                 top: '20px',
//                 right: '20px',
//                 zIndex: 1
//               }}
//             >
//               Edit
//             </Button>

//             <Row>
//               <Col md={5} className="d-flex align-items-center justify-content-center">
//                 <img
//                   src={product.media?.[0] || 'https://via.placeholder.com/300'}
//                   alt={product.name || 'No Image'}
//                   className="img-fluid rounded shadow-sm"
//                   style={{ maxHeight: '300px', objectFit: 'contain' }}
//                 />
//               </Col>
//               <Col md={7}>
//                 <div style={{ padding: '10px 20px' }}>
//                   {Object.keys(displayFields).map((key) => (
//                     <div key={key} style={{ marginBottom: '12px', fontSize: '16px' }}>
//                       <strong>{displayFields[key]}:</strong>{' '}
//                       {key === 'variants' ? (
//                         Array.isArray(product[key]) && product[key].length > 0 ? (
//                           <div className="mt-2">
//                             {product[key].map((variant, index) => (
//                               <div key={index} className="mb-3">
//                                 <strong>{variant.name}</strong>
//                                 <table className="table table-bordered table-sm mt-1">
//                                   <thead>
//                                     <tr>
//                                       <th>Value</th>
//                                       <th>Price (₹)</th>
//                                       <th>Quantity</th>
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     {variant.values.map((val, idx) => (
//                                       <tr key={idx}>
//                                         <td>{val.value}</td>
//                                         <td>{val.price || '-'}</td>
//                                         <td>{val.quantity || '-'}</td>
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           '-'
//                         )
//                       ) : (
//                         product[key] || '-'
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </Col>
//             </Row>
//           </Card>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;



import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import Nav2 from './Nav2';

function ProductDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();

  // Initial product from location.state for faster render if available
  const [product, setProduct] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!location.state?.item); // load only if no state
  const [error, setError] = useState(null);

  const storeName = location.state?.storeName || 'Your Store';

  useEffect(() => {
    // If no product data passed, fetch from API
    if (!product) {
     fetch(`http://localhost:3000/store`)
  .then(res => res.json())
  .then(stores => {
    // flatten all products from all stores
    const allProducts = stores.flatMap(store => store.products || []);
    const prod = allProducts.find(p => p.productId === productId);
    if (prod) setProduct({ ...prod.productProperties, name: prod.productName });
    else setError("Product not found");
    setLoading(false);
  })
  .catch(err => {
    setError("Failed to fetch product");
    setLoading(false);
  });
    }
  }, [productId, product]);

  const handleEdit = () => {
    //navigate(`/editproduct/${product?.name || productId}`, {
   
    //state: { item: product, storeName, edit: true }
    //});
    navigate(`/editproduct/${product.productId}`, {
    state: { item: product } // pass entire product object
  });
  };

  const productFields = {
    name: 'Name',
    category: 'Category',
    type: 'Type',
    description: 'Description',
    price: 'Price',
    discount: 'Discount',
    stock: 'Stock',
    quantity: 'Quantity',
    sku: 'SKU',
    variants: 'Variants'
  };

  const serviceFields = {
    name: 'Name',
    category: 'Category',
    type: 'Type',
    description: 'Description',
    rate: 'Rate',
    discountedRate: 'Discounted Rate',
    duration: 'Duration'
  };

  if (loading) {
    return (
      <div style={{ display: 'flex' }}>
        <Nav2 />
        <div style={{ flexGrow: 1, padding: '20px', textAlign: 'center' }}>
          <Spinner animation="border" /> <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex' }}>
        <Nav2 />
        <div style={{ flexGrow: 1, padding: '20px', textAlign: 'center', color: 'red' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ display: 'flex' }}>
        <Nav2 />
        <div style={{ flexGrow: 1, padding: '20px', textAlign: 'center' }}>
          <p>No product details found.</p>
        </div>
      </div>
    );
  }

  const displayFields = product.type === 'Service' ? serviceFields : productFields;

  return (
    <div style={{ display: 'flex' }}>
      <Nav2 />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 style={{ fontWeight: '600' }}>
                {storeName} - {product.name || 'Product/Service Details'}
              </h2>
            </Col>
          </Row>

          <Card className="p-4 shadow-sm border-0 position-relative" style={{ borderRadius: '12px' }}>
            <Button
              variant="primary"
              onClick={handleEdit}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 1
              }}
            >
              Edit
            </Button>

            <Row>
              <Col md={5} className="d-flex align-items-center justify-content-center">
                <img
                  src={product.media?.[0] || 'https://via.placeholder.com/300'}
                  alt={product.name || 'No Image'}
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
              </Col>
              <Col md={7}>
                <div style={{ padding: '10px 20px' }}>
                  {Object.keys(displayFields).map((key) => (
                    <div key={key} style={{ marginBottom: '12px', fontSize: '16px' }}>
                      <strong>{displayFields[key]}:</strong>{' '}
                      {key === 'variants' ? (
                        Array.isArray(product[key]) && product[key].length > 0 ? (
                          <div className="mt-2">
                            {product[key].map((variant, index) => (
                              <div key={index} className="mb-3">
                                <strong>{variant.name}</strong>
                                <table className="table table-bordered table-sm mt-1">
                                  <thead>
                                    <tr>
                                      <th>Value</th>
                                      <th>Price (₹)</th>
                                      <th>Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {variant.values.map((val, idx) => (
                                      <tr key={idx}>
                                        <td>{val.value}</td>
                                        <td>{val.price || '-'}</td>
                                        <td>{val.quantity || '-'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ))}
                          </div>
                        ) : (
                          '-'
                        )
                      ) : (
                        product[key] || '-'
                      )}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default ProductDetails;
