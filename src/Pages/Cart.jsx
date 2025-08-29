// import React, { useEffect, useState } from "react";
// import { Container, Card, Button, Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Nav2 from "./Nav2";

// function Cart() {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Fetch cart items from backend
//   useEffect(() => {
//     fetch("http://localhost:3000/cart")
//       .then((res) => res.json())
//       .then((data) => {
//         // Ensure quantity field exists
//            const storeCart = data.filter((item) => item.storeName === storeName);
//         const withQty = data.map((item) => ({
//           ...item,
//           quantity: item.quantity || 1,
//         }));
//         setCart(withQty);
//       })
//       .catch((err) => console.error("Error fetching cart:", err));
//   }, []);

//   // ✅ Update item in backend
//   const updateItem = async (id, updatedItem) => {
//     await fetch(`http://localhost:3000/cart/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedItem),
//     });
//   };

//   // ✅ Delete item from backend
//   const deleteItem = async (id) => {
//     await fetch(`http://localhost:3000/cart/${id}`, {
//       method: "DELETE",
//     });
//   };

//   // ✅ Handle Remove
//   const handleRemove = async (id) => {
//     await deleteItem(id);
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   // ✅ Handle Quantity Change
//   const handleQtyChange = async (id, change) => {
//     const newCart = cart.map((item) => {
//       if (item.id === id) {
//         const newQty = item.quantity + change;
//         const updatedItem = { ...item, quantity: newQty > 0 ? newQty : 1 };
//         updateItem(id, updatedItem); // sync with backend
//         return updatedItem;
//       }
//       return item;
//     });
//     setCart(newCart);
//   };
//   // ✅ Handle Checkout
// const handleCheckout = async () => {
//   try {
//     // Create order object
//     const order = {
//       id: Date.now(),
//       storeName: cart[0]?.storeName || "Unknown",
//       items: cart,
//       total: totalPrice,
//       date: new Date().toISOString(),
//     };

//     // Save order to backend
//     await fetch("http://localhost:3000/orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(order),
//     });

//     // Clear the cart in backend
//     for (const item of cart) {
//       await deleteItem(item.id);
//     }

//     setCart([]);

//     // Navigate to orders page
//     navigate("/orders", { state: { storeName: order.storeName } });
//   } catch (err) {
//     console.error("Checkout failed:", err);
//   }
// };


//   // ✅ Calculate total
//   const totalPrice = cart.reduce(
//     (sum, item) => sum + (item.productProperties?.price || 0) * item.quantity,
//     0
//   );

//   return (
//     <div style={{ display: "flex" }}>
//       <Nav2 />
//       <div style={{ flexGrow: 1, padding: "20px" }}>
//         <Container>
//           <h2 className="fw-bold mb-4">My Cart</h2>

//           {cart.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <>
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>Product</th>
//                     <th>Brand</th>
//                     <th>Price</th>
//                     <th>Quantity</th>
//                     <th>Subtotal</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cart.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.productName}</td>
//                       <td>{item.productProperties?.brand}</td>
//                       <td>₹{item.productProperties?.price?.toLocaleString()}</td>
//                       <td>
//                         <Button
//                           size="sm"
//                           variant="secondary"
//                           onClick={() => handleQtyChange(item.id, -1)}
//                         >
//                           -
//                         </Button>{" "}
//                         {item.quantity}{" "}
//                         <Button
//                           size="sm"
//                           variant="secondary"
//                           onClick={() => handleQtyChange(item.id, 1)}
//                         >
//                           +
//                         </Button>
//                       </td>
//                       <td>
//                         ₹
//                         {(
//                           (item.productProperties?.price || 0) * item.quantity
//                         ).toLocaleString()}
//                       </td>
//                       <td>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => handleRemove(item.id)}
//                         >
//                           Remove
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>

//               <Card className="p-3 shadow-sm mt-4">
//                 <h4>Total: ₹{totalPrice.toLocaleString()}</h4>
//                 <Button
//                   variant="success"
//                   //onClick={() => alert("Proceeding to checkout...")}
//                 onClick={handleCheckout}
//                 >
//                   Checkout
//                 </Button>
//               </Card>
//             </>
//           )}
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default Cart;

import React, { useEffect, useState } from "react";
import { Container, Card, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav2 from "./Nav2";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const storeName = localStorage.getItem("storeName"); // ✅ get current store

  // ✅ Fetch cart items from backend
  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => {
        // ✅ filter only this store’s items
        const storeCart = data.filter((item) => item.storeName === storeName);
        const withQty = storeCart.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCart(withQty);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [storeName]);

  // ✅ Update item in backend
  const updateItem = async (id, updatedItem) => {
    await fetch(`http://localhost:3000/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
  };

  // ✅ Delete item from backend
  const deleteItem = async (id) => {
    await fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
    });
  };

  // ✅ Handle Remove
  const handleRemove = async (id) => {
    await deleteItem(id);
    setCart(cart.filter((item) => item.id !== id));
  };

  // ✅ Handle Quantity Change
  const handleQtyChange = async (id, change) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + change;
        const updatedItem = { ...item, quantity: newQty > 0 ? newQty : 1 };
        updateItem(id, updatedItem); // sync with backend
        return updatedItem;
      }
      return item;
    });
    setCart(newCart);
  };

  // ✅ Calculate total
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.productProperties?.price || 0) * item.quantity,
    0
  );

  // ✅ Handle Checkout
  const handleCheckout = async () => {
    try {
      const order = {
        id: Date.now(),
        storeName: storeName || "Unknown", // ✅ use current store
        items: cart,
        total: totalPrice,
        date: new Date().toISOString(),
      };

      // Save order to backend
      await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      // Clear the cart in backend
      for (const item of cart) {
        await deleteItem(item.id);
      }

      setCart([]);

      // Navigate to orders page
      navigate("/orders", { state: { storeName: order.storeName } });
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Nav2 />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Container>
          <h2 className="fw-bold mb-4">My Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      {/* <td>{item.productProperties?.brand}</td> */}
                      <td>₹{item.productProperties?.price?.toLocaleString()}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleQtyChange(item.id, -1)}
                        >
                          -
                        </Button>{" "}
                        {item.quantity}{" "}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleQtyChange(item.id, 1)}
                        >
                          +
                        </Button>
                      </td>
                      <td>
                        ₹
                        {(
                          (item.productProperties?.price || 0) * item.quantity
                        ).toLocaleString()}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Card className="p-3 shadow-sm mt-4">
                <h4>Total: ₹{totalPrice.toLocaleString()}</h4>
                <Button variant="success" onClick={handleCheckout}>
                  Checkout
                </Button>
              </Card>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Cart;
