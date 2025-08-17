// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { Container, Form, Row, Col, Button, Card, Alert } from "react-bootstrap";

// // const EditProduct = () => {
// //   const { name } = useParams();
// //   const navigate = useNavigate();

// //   const [product, setProduct] = useState({
// //     name: "",
// //     category: "",
// //     price: "",
// //     discountedPrice: "",
// //     description: "",
// //     media: [],
// //     quantity: "",
// //     sku: "",
// //     variants: []
// //   });

// //   const [variantName, setVariantName] = useState("");
// //   const [variantValues, setVariantValues] = useState("");

// //   useEffect(() => {
// //     const products = JSON.parse(localStorage.getItem("allProducts")) || [];
// //     const found = products.find(p => p.name === name);
// //     if (found) {
// //       setProduct(found);
// //     }
// //   }, [name]);

// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (name === "media") {
// //       const fileArray = Array.from(files);
// //       const readers = fileArray.map(file => {
// //         return new Promise((resolve, reject) => {
// //           const reader = new FileReader();
// //           reader.onloadend = () => resolve(reader.result);
// //           reader.onerror = reject;
// //           reader.readAsDataURL(file);
// //         });
// //       });

// //       Promise.all(readers).then(images => {
// //         setProduct(prev => ({
// //           ...prev,
// //           media: images
// //         }));
// //       });
// //     } else {
// //       setProduct(prev => ({
// //         ...prev,
// //         [name]: value
// //       }));
// //     }
// //   };

// //   const updateVariant = () => {
// //     if (!variantName || !variantValues) return;
// //     const updatedVariants = [...product.variants, {
// //       name: variantName,
// //       values: variantValues.split(',').map(v => v.trim())
// //     }];
// //     setProduct(prev => ({ ...prev, variants: updatedVariants }));
// //     setVariantName('');
// //     setVariantValues('');
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const products = JSON.parse(localStorage.getItem("allProducts")) || [];
// //     const index = products.findIndex(p => p.name === name);
// //     if (index !== -1) {
// //       products[index] = product;
// //       localStorage.setItem("allProducts", JSON.stringify(products));
// //     }
// //     navigate("/catlog");
// //   };

// //   return (
// //     <Card className="p-4 shadow-sm" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff' }}>
// //       <h3 className="mb-4 text-center fw-bold text-primary">✏️ Edit Product</h3>

// //       <Form onSubmit={handleSubmit}>
// //         <Form.Group className="mb-4">
// //           <Form.Label>Product Name *</Form.Label>
// //           <Form.Control
// //             type="text"
// //             name="name"
// //             value={product.name}
// //             onChange={handleChange}
// //             required
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-4">
// //           <Form.Label>Product Category *</Form.Label>
// //           <Form.Control
// //             type="text"
// //             name="category"
// //             value={product.category}
// //             onChange={handleChange}
// //             required
// //           />
// //         </Form.Group>

// //         <Row>
// //           <Col>
// //             <Form.Group className="mb-4">
// //               <Form.Label>Price *</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 name="price"
// //                 value={product.price}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </Form.Group>
// //           </Col>
// //           <Col>
// //             <Form.Group className="mb-4">
// //               <Form.Label>Discounted Price</Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 name="discountedPrice"
// //                 value={product.discountedPrice}
// //                 onChange={handleChange}
// //               />
// //             </Form.Group>
// //           </Col>
// //         </Row>

// //         <Form.Group className="mb-4">
// //           <Form.Label>Product Description</Form.Label>
// //           <Form.Control
// //             as="textarea"
// //             rows={3}
// //             name="description"
// //             value={product.description}
// //             onChange={handleChange}
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-4">
// //           <Form.Label>Product Media (images/videos)</Form.Label>
// //           <Form.Control
// //             type="file"
// //             name="media"
// //             accept="image/*,video/*"
// //             onChange={handleChange}
// //             multiple
// //           />
// //           <Form.Text className="text-muted">Uploading new files will replace existing media.</Form.Text>
// //         </Form.Group>

// //         <Form.Group className="mb-4">
// //           <Form.Label>Inventory</Form.Label>
// //           <Row>
// //             <Col>
// //               <Form.Control
// //                 type="number"
// //                 name="quantity"
// //                 value={product.quantity}
// //                 onChange={handleChange}
// //                 placeholder="Quantity"
// //               />
// //             </Col>
// //             <Col>
// //               <Form.Control
// //                 name="sku"
// //                 value={product.sku}
// //                 onChange={handleChange}
// //                 placeholder="SKU ID (e.g., 1000000001)"
// //               />
// //             </Col>
// //           </Row>
// //         </Form.Group>

// //         <hr className="my-4" />
// //         <h5 className="mb-3">Variants</h5>

// //         {product.variants.map((v, i) => (
// //           <Alert key={i} variant="secondary" className="p-2">
// //             <strong>{v.name}:</strong> {v.values.join(', ')}
// //           </Alert>
// //         ))}

// //         <Row className="align-items-end mb-3">
// //           <Col md={4}>
// //             <Form.Control
// //               value={variantName}
// //               onChange={e => setVariantName(e.target.value)}
// //               placeholder="e.g., Size or Color"
// //             />
// //           </Col>
// //           <Col md={6}>
// //             <Form.Control
// //               value={variantValues}
// //               onChange={e => setVariantValues(e.target.value)}
// //               placeholder="e.g., Red, Blue, Green"
// //             />
// //           </Col>
// //           <Col md={2}>
// //             <Button variant="secondary" onClick={updateVariant}>Add</Button>
// //           </Col>
// //         </Row>

// //         <div className="text-center">
// //           <Button type="submit" variant="success" size="lg" className="mt-3 px-5 rounded-pill">
// //             💾 Update Product
// //           </Button>
// //         </div>
// //       </Form>
// //     </Card>
// //   );
// // };

// // export default EditProduct;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Container, Form, Row, Col, Button, Card, Table } from "react-bootstrap";

// const EditProduct = () => {
//   const { name } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState({
//     name: "",
//     category: "",
//     price: "",
//     discountedPrice: "",
//     description: "",
//     media: [],
//     quantity: "",
//     sku: "",
//     variants: []
//   });

//   const [variantName, setVariantName] = useState("");
//   const [variantValues, setVariantValues] = useState("");

//   useEffect(() => {
//     const products = JSON.parse(localStorage.getItem("allProducts")) || [];
//     const found = products.find(p => p.name === name);
//     if (found) {
//       setProduct(found);
//     }
//   }, [name]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "media") {
//       const fileArray = Array.from(files);
//       const readers = fileArray.map(file => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//       });

//       Promise.all(readers).then(images => {
//         setProduct(prev => ({
//           ...prev,
//           media: images
//         }));
//       });
//     } else {
//       setProduct(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const updateVariant = () => {
//     if (!variantName || !variantValues) return;

//     const values = variantValues.split(',').map(v => ({
//       value: v.trim(),
//       price: '',
//       quantity: ''
//     }));

//     setProduct(prev => ({
//       ...prev,
//       variants: [...prev.variants, { name: variantName, values }]
//     }));

//     setVariantName('');
//     setVariantValues('');
//   };

//   const handleVariantValueChange = (variantIndex, valueIndex, field, value) => {
//     const updated = { ...product };
//     updated.variants[variantIndex].values[valueIndex][field] = value;
//     setProduct(updated);
//   };

//   const deleteVariantValue = (variantIndex, valueIndex) => {
//     const updated = { ...product };
//     updated.variants[variantIndex].values.splice(valueIndex, 1);
//     setProduct(updated);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const products = JSON.parse(localStorage.getItem("allProducts")) || [];
//     const index = products.findIndex(p => p.name === name);
//     if (index !== -1) {
//       products[index] = product;
//       localStorage.setItem("allProducts", JSON.stringify(products));
//     }
//     navigate("/catlog");
//   };

//   return (
//     <Card className="p-4 shadow-sm" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff' }}>
//       <h3 className="mb-4 text-center fw-bold text-primary">✏️ Edit Product</h3>

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-4">
//           <Form.Label>Product Name *</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Label>Product Category *</Form.Label>
//           <Form.Control
//             type="text"
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Row>
//           <Col>
//             <Form.Group className="mb-4">
//               <Form.Label>Price *</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group className="mb-4">
//               <Form.Label>Discounted Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="discountedPrice"
//                 value={product.discountedPrice}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group className="mb-4">
//           <Form.Label>Product Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Label>Product Media (images/videos)</Form.Label>
//           <Form.Control
//             type="file"
//             name="media"
//             accept="image/*,video/*"
//             onChange={handleChange}
//             multiple
//           />
//           <Form.Text className="text-muted">Uploading new files will replace existing media.</Form.Text>
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Label>Inventory</Form.Label>
//           <Row>
//             <Col>
//               <Form.Control
//                 type="number"
//                 name="quantity"
//                 value={product.quantity}
//                 onChange={handleChange}
//                 placeholder="Quantity"
//               />
//             </Col>
//             <Col>
//               <Form.Control
//                 name="sku"
//                 value={product.sku}
//                 onChange={handleChange}
//                 placeholder="SKU ID (e.g., 1000000001)"
//               />
//             </Col>
//           </Row>
//         </Form.Group>

//         <hr className="my-4" />
//         <h5 className="mb-3">Variants</h5>

//         {product.variants.map((variant, variantIndex) => (
//           <div key={variantIndex} className="mb-4">
//             <h6>{variant.name}</h6>
//             <Table bordered responsive size="sm">
//               <thead>
//                 <tr>
//                   <th>Value</th>
//                   <th>Price (₹)</th>
//                   <th>Quantity</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {variant.values.map((val, valueIndex) => (
//                   <tr key={valueIndex}>
//                     <td>{val.value}</td>
//                     <td>
//                       <Form.Control
//                         type="number"
//                         value={val.price}
//                         onChange={(e) =>
//                           handleVariantValueChange(variantIndex, valueIndex, "price", e.target.value)
//                         }
//                         placeholder="Price"
//                       />
//                     </td>
//                     <td>
//                       <Form.Control
//                         type="number"
//                         value={val.quantity}
//                         onChange={(e) =>
//                           handleVariantValueChange(variantIndex, valueIndex, "quantity", e.target.value)
//                         }
//                         placeholder="Quantity"
//                       />
//                     </td>
//                     <td className="text-center">
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => deleteVariantValue(variantIndex, valueIndex)}
//                       >
//                         🗑️
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         ))}

//         <Row className="align-items-end mb-3">
//           <Col md={4}>
//             <Form.Control
//               value={variantName}
//               onChange={(e) => setVariantName(e.target.value)}
//               placeholder="e.g., Size or Color"
//             />
//           </Col>
//           <Col md={6}>
//             <Form.Control
//               value={variantValues}
//               onChange={(e) => setVariantValues(e.target.value)}
//               placeholder="e.g., Red, Blue, Green"
//             />
//           </Col>
//           <Col md={2}>
//             <Button variant="secondary" onClick={updateVariant}>Add</Button>
//           </Col>
//         </Row>

//         <div className="text-center">
//           <Button type="submit" variant="success" size="lg" className="mt-3 px-5 rounded-pill">
//             💾 Update Product
//           </Button>
//         </div>
//       </Form>
//     </Card>
//   );
// };

// export default EditProduct;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Form, Row, Col, Button, Table, Alert } from "react-bootstrap";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!location.state?.item);
  const [error, setError] = useState("");
  const [variantName, setVariantName] = useState("");
  const [variantValues, setVariantValues] = useState("");

  // Fetch product if not passed via state
  useEffect(() => {
    if (!product) {
      fetch(`http://localhost:3000/products/${productId}`)
        .then(res => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError("Product not found");
          setLoading(false);
        });
    }
  }, [product, productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return null;

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "media") {
      const fileArray = Array.from(files);
      const readers = fileArray.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers).then(images => {
        setProduct(prev => ({ ...prev, media: images }));
      });
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  
// const handleSubmit = async e => {
//   e.preventDefault();

//   try {
//     // JSON Server expects the resource id in the URL
//     await fetch(`http://localhost:3000/products/${product.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product)
//     });

//     alert("Product updated successfully!");
//     navigate("/catlog");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to update product");
//   }
// };


const handleSubmit = async e => {
  e.preventDefault();

  try {
    // 1. Fetch the store that contains this product
    const storeRes = await fetch(`http://localhost:3000/stores`);
    const stores = await storeRes.json();
    const store = stores.find(s => s.products?.some(p => p.productId === product.productId));
    if (!store) throw new Error("Store not found");

    // 2. Update the product in the store's products array
    const updatedProducts = store.products.map(p =>
      p.productId === product.productId ? product : p
    );

    const updatedStore = { ...store, products: updatedProducts };

    // 3. PUT the whole store back
    await fetch(`http://localhost:3000/stores/${store.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStore),
    });

    alert("Product updated successfully!");
    navigate("/catlog");
  } catch (err) {
    console.error(err);
    alert("Failed to update product: " + err.message);
  }
};


  return (
    <Card className="p-4 shadow-sm" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h3 className="mb-4 text-center text-primary">✏️ Edit Product</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Product Name *</Form.Label>
          <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Category *</Form.Label>
          <Form.Control type="text" name="category" value={product.category} onChange={handleChange} required />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Price *</Form.Label>
              <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control type="number" name="discountedPrice" value={product.discountedPrice} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Media</Form.Label>
          <Form.Control type="file" name="media" accept="image/*,video/*" onChange={handleChange} multiple />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Inventory</Form.Label>
          <Row>
            <Col>
              <Form.Control type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" />
            </Col>
            <Col>
              <Form.Control type="text" name="sku" value={product.sku} onChange={handleChange} placeholder="SKU" />
            </Col>
          </Row>
        </Form.Group>

        {/* Variants */}
        <hr />
        <h5>Variants</h5>
        {product.variants?.map((variant, vi) => (
          <div key={vi} className="mb-3">
            <h6>{variant.name}</h6>
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {variant.values.map((val, vj) => (
                  <tr key={vj}>
                    <td>{val.value}</td>
                    <td><Form.Control type="number" value={val.price} onChange={e => {
                      const updated = {...product};
                      updated.variants[vi].values[vj].price = e.target.value;
                      setProduct(updated);
                    }}/></td>
                    <td><Form.Control type="number" value={val.quantity} onChange={e => {
                      const updated = {...product};
                      updated.variants[vi].values[vj].quantity = e.target.value;
                      setProduct(updated);
                    }}/></td>
                    <td><Button variant="danger" size="sm" onClick={()=>{
                      const updated = {...product};
                      updated.variants[vi].values.splice(vj,1);
                      setProduct(updated);
                    }}>🗑️</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}

        {/* Add Variant */}
        <Row className="align-items-end mb-3">
          <Col md={4}><Form.Control value={variantName} onChange={e => setVariantName(e.target.value)} placeholder="Variant Name" /></Col>
          <Col md={6}><Form.Control value={variantValues} onChange={e => setVariantValues(e.target.value)} placeholder="Values (comma separated)" /></Col>
          <Col md={2}><Button variant="secondary" onClick={()=>{
            if(!variantName || !variantValues) return;
            const values = variantValues.split(",").map(v=>({value:v.trim(),price:"",quantity:""}));
            setProduct({...product, variants:[...(product.variants||[]), {name:variantName, values}]});
            setVariantName(""); setVariantValues("");
          }}>Add</Button></Col>
        </Row>

        <div className="text-center"><Button type="submit" variant="success" className="mt-3 px-5 rounded-pill">💾 Update Product</Button></div>
      </Form>
    </Card>
  );
};

export default EditProduct;
