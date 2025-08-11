// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Button, Card } from 'react-bootstrap';
// import Nav2 from './Nav2';

// function ProductDetails() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { item = {}, storeName = 'Your Store', edit = false } = location.state || {};

//   const handleEdit = () => {
//     navigate(`/editproduct/${item.name}`, { state: { item, storeName, edit: true } });
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

//   const displayFields = item.type === 'Service' ? serviceFields : productFields;

//   return (
//     <div style={{ display: 'flex' }}>
//       <Nav2 />
//       <div style={{ flexGrow: 1, padding: '20px' }}>
//         <Container>
//           <Row className="mb-4">
//             <Col>
//               <h2 style={{ fontWeight: '600' }}>
//                 {storeName} - {item.name || 'Product/Service Details'}
//               </h2>
//             </Col>
//           </Row>

//           <Card className="p-4 shadow-sm border-0 position-relative" style={{ borderRadius: '12px' }}>
//             {/* Edit Button at Top-Right */}
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
//                   src={item.media?.[0] || 'https://via.placeholder.com/300'}
//                   alt={item.name || 'No Image'}
//                   className="img-fluid rounded shadow-sm"
//                   style={{ maxHeight: '300px', objectFit: 'contain' }}
//                 />
//               </Col>
//               <Col md={7}>
//                 <div style={{ padding: '10px 20px' }}>
//                   {Object.keys(displayFields).map((key) => (
//                     <div key={key} style={{ marginBottom: '12px', fontSize: '16px' }}>
//                       <strong>{displayFields[key]}:</strong>{' '}
//                       {key === 'variants'
//                         ? Array.isArray(item[key])
//                           ? item[key].map(v => `${v.name}: ${v.values.join(', ')}`).join('; ')
//                           : '-'
//                         : item[key] || '-'}
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



import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Nav2 from './Nav2';

function ProductDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { item = {}, storeName = 'Your Store', edit = false } = location.state || {};

  const handleEdit = () => {
    navigate(`/editproduct/${item.name}`, { state: { item, storeName, edit: true } });
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

  const displayFields = item.type === 'Service' ? serviceFields : productFields;

  return (
    <div style={{ display: 'flex' }}>
      <Nav2 />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 style={{ fontWeight: '600' }}>
                {storeName} - {item.name || 'Product/Service Details'}
              </h2>
            </Col>
          </Row>

          <Card className="p-4 shadow-sm border-0 position-relative" style={{ borderRadius: '12px' }}>
            {/* Edit Button at Top-Right */}
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
                  src={item.media?.[0] || 'https://via.placeholder.com/300'}
                  alt={item.name || 'No Image'}
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
                        Array.isArray(item[key]) && item[key].length > 0 ? (
                          <div className="mt-2">
                            {item[key].map((variant, index) => (
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
                        item[key] || '-'
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
