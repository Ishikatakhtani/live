// //  import React, { useState, useEffect } from 'react';
// // import { Form, Button, Row, Col, Card } from 'react-bootstrap';
// // import { useNavigate, useLocation } from 'react-router-dom';

// // const ProductForm = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const storeName = location.state?.storeName || localStorage.getItem("storeName") || 'Your Store';

// //   useEffect(() => {
// //     if (location.state?.storeName && location.state.storeName !== 'Your Store') {
// //       localStorage.setItem("storeName", location.state.storeName);
// //     }
// //   }, [location.state]);

// //   const [product, setProduct] = useState({
// //     name: '',
// //     category: '',
// //     price: '',
// //     discountedPrice: '',
// //     description: '',
// //     media: [],
// //     quantity: '',
// //     sku: ''
// //   });

// //   const [variants, setVariants] = useState([]);
// //   const [variantName, setVariantName] = useState('');
// //   const [variantValues, setVariantValues] = useState('');

// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (name === "media") {
// //       // Convert image(s) to base64
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

// //   const addVariant = () => {
// //     if (!variantName || !variantValues) return;
// //     setVariants([...variants, {
// //       name: variantName,
// //       values: variantValues.split(',').map(v => v.trim())
// //     }]);
// //     setVariantName('');
// //     setVariantValues('');
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const newProduct = {
// //       ...product,
// //       variants,
// //       storeName
// //     };

// //     const existingProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
// //     existingProducts.push(newProduct);
// //     localStorage.setItem("allProducts", JSON.stringify(existingProducts));
// //     localStorage.setItem("productsStep", "completed");

// //     navigate('/catlog', { state: { storeName } });

// //     setProduct({
// //       name: '',
// //       category: '',
// //       price: '',
// //       discountedPrice: '',
// //       description: '',
// //       media: [],
// //       quantity: '',
// //       sku: ''
// //     });
// //     setVariants([]);
// //     setVariantName('');
// //     setVariantValues('');
// //   };

// //   return (
// //     <Card className="p-4 shadow-sm" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff' }}>
// //       <h3 className="mb-4 text-center fw-bold text-primary">Add New Product</h3>

// //       <Form onSubmit={handleSubmit}>
// //         <Form.Group className="mb-4">
// //           <Form.Label>Product Name *</Form.Label>
// //           <Form.Control
// //             type="text"
// //             name="name"
// //             value={product.name}
// //             onChange={handleChange}
// //             placeholder="e.g., Oreo Biscuit"
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
// //             placeholder="e.g., Snacks, Dairy, Beverages"
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
// //                 placeholder="₹ Enter price"
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
// //                 placeholder="₹ Enter discounted price"
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
// //             placeholder="Write something appealing..."
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
// //           <Form.Text className="text-muted">Recommended image size: 1000×1248px</Form.Text>
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

// //         {variants.map((v, i) => (
// //           <div key={i} className="alert alert-secondary p-2">
// //             <strong>{v.name}:</strong> {v.values.join(', ')}
// //           </div>
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
// //             <Button variant="secondary" onClick={addVariant}>Add</Button>
// //           </Col>
// //         </Row>

// //         <div className="text-center">
// //           <Button
// //             type="submit"
// //             variant="primary"
// //             size="lg"
// //             className="mt-3 px-5 rounded-pill"
// //           >
// //             ➕ Add Product
// //           </Button>
// //         </div>
// //       </Form>
// //     </Card>
// //   );
// // };

// // export default ProductForm;

// import React, { useState, useEffect } from 'react';
// import { Form, Button, Row, Col, Card } from 'react-bootstrap';
// import { useNavigate, useLocation } from 'react-router-dom';

// const ProductForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const storeName = location.state?.storeName || localStorage.getItem("storeName");

// useEffect(() => {
//   if (!storeName) {
//     alert("Store name not found. Please go back and select a store.");
//     navigate("/"); // redirect to home or store selector
//   }
// }, [storeName]);

//   // useEffect(() => {
//   //   if (location.state?.storeName && location.state.storeName !== 'Your Store') {
//   //     localStorage.setItem("storeName", location.state.storeName);
//   //   }
//   // }, [location.state]);

//   const [product, setProduct] = useState({
//     name: '',
//     category: '',
//     price: '',
//     discountedPrice: '',
//     description: '',
//     media: [],
//     quantity: '',
//     sku: ''
//   });

//   const [variants, setVariants] = useState([]);
//   const [variantName, setVariantName] = useState('');
//   const [variantValues, setVariantValues] = useState('');

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

//   const addVariant = () => {
//     if (!variantName || !variantValues) return;

//     const valueArray = variantValues.split(',').map(v => v.trim());
//     const valueObjects = valueArray.map(v => ({
//       value: v,
//       price: '',
//       quantity: ''
//     }));

//     setVariants([...variants, {
//       name: variantName,
//       values: valueObjects
//     }]);

//     setVariantName('');
//     setVariantValues('');
//   };

//   const handleVariantDetailChange = (variantIndex, valueIndex, field, value) => {
//     const updatedVariants = [...variants];
//     updatedVariants[variantIndex].values[valueIndex][field] = value;
//     setVariants(updatedVariants);
//   };

//   const deleteVariant = (variantIndex) => {
//     const updated = variants.filter((_, i) => i !== variantIndex);
//     setVariants(updated);
//   };

//   const deleteVariantValue = (variantIndex, valueIndex) => {
//     const updated = [...variants];
//     updated[variantIndex].values.splice(valueIndex, 1);
//     setVariants(updated);
//   };

 
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const newProduct = {
//     productId: `PROD${Date.now()}`, // generate unique ID
//     productName: product.name,
//     productProperties: {
//       category: product.category,
//       price: product.price,
//       discountedPrice: product.discountedPrice,
//       description: product.description,
//       sku: product.sku,
//       quantity: product.quantity,
//       variants: variants,
//       media: product.media
//     }
//   };

//   try {
//     // Step 1: Fetch all stores
//     const storeRes = await fetch("http://localhost:3000/store");
//     const stores = await storeRes.json();

//     // Step 2: Find the correct store by storeName
//     const targetStore = stores.find(s => s.storeName === storeName);

//     if (!targetStore) {
//       alert("Store not found!");
//       return;
//     }

//     const updatedStore = {
//       ...targetStore,
//       products: [...(targetStore.products || []), newProduct]
//     };

//     // Step 3: Update the correct store using its ID
//     const updateRes = await fetch(`http://localhost:3000/store/${targetStore.id || targetStore.storeId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(updatedStore)
//     });

//     if (updateRes.ok) {
//       alert("Product added successfully!");
//       //navigate('/catlog', { state: { storeName } });
//        navigate("/catlog", { state: { storeName } });
 
//       // Reset form
//       setProduct({
//         name: '',
//         category: '',
//         price: '',
//         discountedPrice: '',
//         description: '',
//         media: [],
//         quantity: '',
//         sku: ''
//       });
//       setVariants([]);
//       setVariantName('');
//       setVariantValues('');
//     } else {
//       console.error("Failed to update store with new product.");
//     }

//   } catch (error) {
//     console.error("Error while adding product:", error);
//   }
// };

//   return (
//     <Card className="p-4 shadow-sm"  style={{
//     maxWidth: '1200px',  // increased width
//     width: '100%',        // responsive
//     margin: '0 auto',
//     backgroundColor: '#fff'
//   }}>
//       <h3 className="mb-4 text-center fw-bold text-primary">Add New Product</h3>

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-4">
//           <Form.Label>Product Name *</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             placeholder="e.g., Oreo Biscuit"
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
//             placeholder="e.g., Snacks, Dairy, Beverages"
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
//                 placeholder="₹ Enter price"
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
//                 placeholder="₹ Enter discounted price"
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
//             placeholder="Write something appealing..."
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
//           <Form.Text className="text-muted">Recommended image size: 1000×1248px</Form.Text>
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

//         {variants.map((variant, variantIndex) => (
//           <div key={variantIndex} className="mb-4">
//             <div className="d-flex justify-content-between align-items-center">
//               <h6>{variant.name}</h6>
//               <Button variant="outline-danger" size="sm" onClick={() => deleteVariant(variantIndex)}>
//                  Delete Variant
//               </Button>
//             </div>
//             <table className="table table-bordered mt-2">
//               <thead>
//                 <tr>
//                   <th>Value</th>
//                   <th>Price (₹)</th>
//                   <th>Quantity</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {variant.values.map((valueObj, valueIndex) => (
//                   <tr key={valueIndex}>
//                     <td>{valueObj.value}</td>
//                     <td>
//                       <Form.Control
//                         type="number"
//                         value={valueObj.price}
//                         onChange={(e) =>
//                           handleVariantDetailChange(variantIndex, valueIndex, 'price', e.target.value)
//                         }
//                         placeholder="Price"
//                       />
//                     </td>
//                     <td>
//                       <Form.Control
//                         type="number"
//                         value={valueObj.quantity}
//                         onChange={(e) =>
//                           handleVariantDetailChange(variantIndex, valueIndex, 'quantity', e.target.value)
//                         }
//                         placeholder="Qty"
//                       />
//                     </td>
//                     <td>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => deleteVariantValue(variantIndex, valueIndex)}
//                       >
//                         Delete 
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
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
//             <Button variant="secondary" onClick={addVariant}>Add</Button>
//           </Col>
//         </Row>

//         <div className="text-center">
//           <Button
//             type="submit"
//             variant="primary"
//             size="lg"
//             className="mt-3 px-5 rounded-pill"
//           >
//             ➕ Add Product
//           </Button>
//         </div>
//       </Form>
//     </Card>
    
//   );
  
// };


// export default ProductForm;

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const storeName = location.state?.storeName || localStorage.getItem("storeName");

  useEffect(() => {
    if (!storeName) {
      alert("Store name not found. Please go back and select a store.");
      navigate("/"); // redirect to home or store selector
    }
  }, [storeName, navigate]);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    discountedPrice: '',
    description: '',
    media: [],
    quantity: '',
    sku: ''
  });

  const [variants, setVariants] = useState([]);
  const [variantName, setVariantName] = useState('');
  const [variantValues, setVariantValues] = useState('');

  const handleChange = (e) => {
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
        setProduct(prev => ({
          ...prev,
          media: images
        }));
      });
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addVariant = () => {
    if (!variantName || !variantValues) return;

    const valueArray = variantValues.split(',').map(v => v.trim());
    const valueObjects = valueArray.map(v => ({
      value: v,
      price: '',
      quantity: ''
    }));

    setVariants([...variants, {
      name: variantName,
      values: valueObjects
    }]);

    setVariantName('');
    setVariantValues('');
  };

  const handleVariantDetailChange = (variantIndex, valueIndex, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].values[valueIndex][field] = value;
    setVariants(updatedVariants);
  };

  const deleteVariant = (variantIndex) => {
    const updated = variants.filter((_, i) => i !== variantIndex);
    setVariants(updated);
  };

  const deleteVariantValue = (variantIndex, valueIndex) => {
    const updated = [...variants];
    updated[variantIndex].values.splice(valueIndex, 1);
    setVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      productId: `PROD${Date.now()}`, // generate unique ID
      productName: product.name,
      productProperties: {
        category: product.category,
        price: product.price,
        discountedPrice: product.discountedPrice,
        description: product.description,
        sku: product.sku,
        quantity: product.quantity,
        variants: variants,
        media: product.media
      }
    };

    try {
      const storeRes = await fetch("http://localhost:3000/store");
      const stores = await storeRes.json();
      const targetStore = stores.find(s => s.storeName === storeName);

      if (!targetStore) {
        alert("Store not found!");
        return;
      }

      const updatedStore = {
        ...targetStore,
        products: [...(targetStore.products || []), newProduct]
      };

      const updateRes = await fetch(`http://localhost:3000/store/${targetStore.id || targetStore.storeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedStore)
      });

      if (updateRes.ok) {
        alert("Product added successfully!");
        navigate("/catlog", { state: { storeName } });

        setProduct({
          name: '',
          category: '',
          price: '',
          discountedPrice: '',
          description: '',
          media: [],
          quantity: '',
          sku: ''
        });
        setVariants([]);
        setVariantName('');
        setVariantValues('');
      } else {
        console.error("Failed to update store with new product.");
      }

    } catch (error) {
      console.error("Error while adding product:", error);
    }
  };

  return (
    <Card
      className="p-4 shadow-sm"
      style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', backgroundColor: '#fff' }}
    >
      <h3 className="mb-4 text-center fw-bold text-primary">Add New Product</h3>

      <Form onSubmit={handleSubmit}>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Product Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="e.g., Oreo Biscuit"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Category *</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="e.g., Snacks"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Price *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="₹ Enter price"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control
                type="number"
                name="discountedPrice"
                value={product.discountedPrice}
                onChange={handleChange}
                placeholder="₹ Enter discounted price"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Qty"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>SKU</Form.Label>
              <Form.Control
                name="sku"
                value={product.sku}
                onChange={handleChange}
                placeholder="SKU ID"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Write something appealing..."
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Product Media</Form.Label>
              <Form.Control
                type="file"
                name="media"
                accept="image/*,video/*"
                onChange={handleChange}
                multiple
              />
              <Form.Text className="text-muted">Recommended image size: 1000×1248px</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <hr className="my-4" />
        <h5 className="mb-3">Variants</h5>

        {variants.map((variant, variantIndex) => (
          <div key={variantIndex} className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h6>{variant.name}</h6>
              <Button variant="outline-danger" size="sm" onClick={() => deleteVariant(variantIndex)}>
                 Delete Variant
              </Button>
            </div>
            <table className="table table-bordered mt-2">
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {variant.values.map((valueObj, valueIndex) => (
                  <tr key={valueIndex}>
                    <td>{valueObj.value}</td>
                    <td>
                      <Form.Control
                        type="number"
                        value={valueObj.price}
                        onChange={(e) =>
                          handleVariantDetailChange(variantIndex, valueIndex, 'price', e.target.value)
                        }
                        placeholder="Price"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={valueObj.quantity}
                        onChange={(e) =>
                          handleVariantDetailChange(variantIndex, valueIndex, 'quantity', e.target.value)
                        }
                        placeholder="Qty"
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteVariantValue(variantIndex, valueIndex)}
                      >
                        Delete 
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <Row className="align-items-end mb-3">
          <Col md={4}>
            <Form.Control
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              placeholder="e.g., Size or Color"
            />
          </Col>
          <Col md={6}>
            <Form.Control
              value={variantValues}
              onChange={(e) => setVariantValues(e.target.value)}
              placeholder="e.g., Red, Blue, Green"
            />
          </Col>
          <Col md={2}>
            <Button variant="secondary" onClick={addVariant}>Add</Button>
          </Col>
        </Row>

        <div className="text-center">
          <Button type="submit" variant="primary" size="lg" className="mt-3 px-5 rounded-pill">
            ➕ Add Product
          </Button>
        </div>

      </Form>
    </Card>
  );
};

export default ProductForm;
