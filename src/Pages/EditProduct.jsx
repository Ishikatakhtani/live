// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Container, Form, Row, Col, Button, Card, Alert } from "react-bootstrap";

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
//     const updatedVariants = [...product.variants, {
//       name: variantName,
//       values: variantValues.split(',').map(v => v.trim())
//     }];
//     setProduct(prev => ({ ...prev, variants: updatedVariants }));
//     setVariantName('');
//     setVariantValues('');
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

//         {product.variants.map((v, i) => (
//           <Alert key={i} variant="secondary" className="p-2">
//             <strong>{v.name}:</strong> {v.values.join(', ')}
//           </Alert>
//         ))}

//         <Row className="align-items-end mb-3">
//           <Col md={4}>
//             <Form.Control
//               value={variantName}
//               onChange={e => setVariantName(e.target.value)}
//               placeholder="e.g., Size or Color"
//             />
//           </Col>
//           <Col md={6}>
//             <Form.Control
//               value={variantValues}
//               onChange={e => setVariantValues(e.target.value)}
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
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Row, Col, Button, Card, Table } from "react-bootstrap";

const EditProduct = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    discountedPrice: "",
    description: "",
    media: [],
    quantity: "",
    sku: "",
    variants: []
  });

  const [variantName, setVariantName] = useState("");
  const [variantValues, setVariantValues] = useState("");

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("allProducts")) || [];
    const found = products.find(p => p.name === name);
    if (found) {
      setProduct(found);
    }
  }, [name]);

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

  const updateVariant = () => {
    if (!variantName || !variantValues) return;

    const values = variantValues.split(',').map(v => ({
      value: v.trim(),
      price: '',
      quantity: ''
    }));

    setProduct(prev => ({
      ...prev,
      variants: [...prev.variants, { name: variantName, values }]
    }));

    setVariantName('');
    setVariantValues('');
  };

  const handleVariantValueChange = (variantIndex, valueIndex, field, value) => {
    const updated = { ...product };
    updated.variants[variantIndex].values[valueIndex][field] = value;
    setProduct(updated);
  };

  const deleteVariantValue = (variantIndex, valueIndex) => {
    const updated = { ...product };
    updated.variants[variantIndex].values.splice(valueIndex, 1);
    setProduct(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("allProducts")) || [];
    const index = products.findIndex(p => p.name === name);
    if (index !== -1) {
      products[index] = product;
      localStorage.setItem("allProducts", JSON.stringify(products));
    }
    navigate("/catlog");
  };

  return (
    <Card className="p-4 shadow-sm" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff' }}>
      <h3 className="mb-4 text-center fw-bold text-primary">✏️ Edit Product</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Product Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Product Category *</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Price *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control
                type="number"
                name="discountedPrice"
                value={product.discountedPrice}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Product Media (images/videos)</Form.Label>
          <Form.Control
            type="file"
            name="media"
            accept="image/*,video/*"
            onChange={handleChange}
            multiple
          />
          <Form.Text className="text-muted">Uploading new files will replace existing media.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Inventory</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Quantity"
              />
            </Col>
            <Col>
              <Form.Control
                name="sku"
                value={product.sku}
                onChange={handleChange}
                placeholder="SKU ID (e.g., 1000000001)"
              />
            </Col>
          </Row>
        </Form.Group>

        <hr className="my-4" />
        <h5 className="mb-3">Variants</h5>

        {product.variants.map((variant, variantIndex) => (
          <div key={variantIndex} className="mb-4">
            <h6>{variant.name}</h6>
            <Table bordered responsive size="sm">
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {variant.values.map((val, valueIndex) => (
                  <tr key={valueIndex}>
                    <td>{val.value}</td>
                    <td>
                      <Form.Control
                        type="number"
                        value={val.price}
                        onChange={(e) =>
                          handleVariantValueChange(variantIndex, valueIndex, "price", e.target.value)
                        }
                        placeholder="Price"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={val.quantity}
                        onChange={(e) =>
                          handleVariantValueChange(variantIndex, valueIndex, "quantity", e.target.value)
                        }
                        placeholder="Quantity"
                      />
                    </td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteVariantValue(variantIndex, valueIndex)}
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
            <Button variant="secondary" onClick={updateVariant}>Add</Button>
          </Col>
        </Row>

        <div className="text-center">
          <Button type="submit" variant="success" size="lg" className="mt-3 px-5 rounded-pill">
            💾 Update Product
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EditProduct;
