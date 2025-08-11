import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Nav2 from './Nav2';

function CustomerProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { item = {}, storeName = 'Your Store' } = location.state || {};

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(item);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Product added to cart!");
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

          <Card className="p-4 shadow-sm border-0" style={{ borderRadius: '12px' }}>
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

                  {/* Add to Cart Button */}
                  <div className="mt-4">
                    <Button variant="success" size="lg" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default CustomerProduct;
