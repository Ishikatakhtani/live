import React, { useEffect, useState } from "react";
import { Container, Table, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Nav2 from "./Nav2";

function Orders() {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const storeName = location.state?.storeName; // passed from Cart.jsx

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data) => {
        // filter orders for current store
        const filtered = data.filter((o) => o.storeName === storeName);
        setOrders(filtered);
          const storeOrders = data.filter((order) => order.storeName === storeName);
      setOrders(storeOrders);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [storeName]);

  return (
    <div style={{ display: "flex" }}>
      <Nav2 />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Container>
          <h2 className="fw-bold mb-4">My Orders ({storeName})</h2>

          {orders.length === 0 ? (
            <p>No orders found for this store.</p>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="p-3 mb-4 shadow-sm">
                <h5>Order #{order.id}</h5>
                <p>
                  Date: {new Date(order.date).toLocaleString()} <br />
                  Total: ₹{order.total.toLocaleString()}
                </p>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.productName}</td>
                        <td>{item.productProperties?.brand}</td>
                        <td>₹{item.productProperties?.price}</td>
                        <td>{item.quantity}</td>
                        <td>
                          ₹
                          {(item.productProperties?.price || 0) *
                            item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            ))
          )}
        </Container>
      </div>
    </div>
  );
}

export default Orders;
