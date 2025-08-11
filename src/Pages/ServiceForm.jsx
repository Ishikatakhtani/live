// import React, { useState, useEffect } from 'react';
// import { Form, Button, Row, Col, Card } from 'react-bootstrap';
// import { useNavigate, useLocation } from 'react-router-dom';

// const ServiceForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const storeName = location.state?.storeName || localStorage.getItem("storeName") || 'Your Store';

//   useEffect(() => {
//     if (location.state?.storeName && location.state.storeName !== 'Your Store') {
//       localStorage.setItem("storeName", location.state.storeName);
//     }
//   }, [location.state]);

//   const [service, setService] = useState({
//     name: '',
//     category: '',
//     rate: '',
//     discountedRate: '',
//     description: '',
//     media: [],
//     duration: '',
//     serviceCode: ''
//   });

//   const [addons, setAddons] = useState([]);
//   const [addonName, setAddonName] = useState('');
//   const [addonDetails, setAddonDetails] = useState('');

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
//         setService(prev => ({
//           ...prev,
//           media: images
//         }));
//       });
//     } else {
//       setService(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const addAddon = () => {
//     if (!addonName || !addonDetails) return;
//     setAddons([...addons, { name: addonName, details: addonDetails }]);
//     setAddonName('');
//     setAddonDetails('');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newService = {
//       ...service,
//       addons,
//       storeName
//     };

//     const existingServices = JSON.parse(localStorage.getItem("allServices")) || [];
//     existingServices.push(newService);
//     localStorage.setItem("allServices", JSON.stringify(existingServices));
//     localStorage.setItem("servicesStep", "completed");

//     navigate('/catlog', { state: { storeName } });

//     setService({
//       name: '',
//       category: '',
//       rate: '',
//       discountedRate: '',
//       description: '',
//       media: [],
//       duration: '',
//       serviceCode: ''
//     });
//     setAddons([]);
//     setAddonName('');
//     setAddonDetails('');
//   };

//   return (
//     <Card className="p-4 shadow-sm" style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff' }}>
//       <h3 className="mb-4 text-center fw-bold text-primary">Add New Service</h3>

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-4">
//           <Form.Label>Service Name *</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={service.name}
//             onChange={handleChange}
//             placeholder="e.g., Haircut, Plumbing"
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Label>Service Category *</Form.Label>
//           <Form.Control
//             type="text"
//             name="category"
//             value={service.category}
//             onChange={handleChange}
//             placeholder="e.g., Beauty, Home Services"
//             required
//           />
//         </Form.Group>

//         <Row>
//           <Col>
//             <Form.Group className="mb-4">
//               <Form.Label>Rate *</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="rate"
//                 value={service.rate}
//                 onChange={handleChange}
//                 placeholder="₹ Enter service rate"
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group className="mb-4">
//               <Form.Label>Discounted Rate</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="discountedRate"
//                 value={service.discountedRate}
//                 onChange={handleChange}
//                 placeholder="₹ Enter discounted rate"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group className="mb-4">
//           <Form.Label>Service Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="description"
//             value={service.description}
//             onChange={handleChange}
//             placeholder="Write a detailed description"
//           />
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Label>Service Media (images/videos)</Form.Label>
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
//           <Form.Label>Additional Info</Form.Label>
//           <Row>
//             <Col>
//               <Form.Control
//                 type="text"
//                 name="duration"
//                 value={service.duration}
//                 onChange={handleChange}
//                 placeholder="Duration (e.g., 30 mins)"
//               />
//             </Col>
//             <Col>
//               <Form.Control
//                 name="serviceCode"
//                 value={service.serviceCode}
//                 onChange={handleChange}
//                 placeholder="Service Code (e.g., SRV001)"
//               />
//             </Col>
//           </Row>
//         </Form.Group>

//         <hr className="my-4" />
//         <h5 className="mb-3">Add-ons</h5>

//         {addons.map((a, i) => (
//           <div key={i} className="alert alert-secondary p-2">
//             <strong>{a.name}:</strong> {a.details}
//           </div>
//         ))}

//         <Row className="align-items-end mb-3">
//           <Col md={5}>
//             <Form.Control
//               value={addonName}
//               onChange={e => setAddonName(e.target.value)}
//               placeholder="Addon name (e.g., Hair Wash)"
//             />
//           </Col>
//           <Col md={5}>
//             <Form.Control
//               value={addonDetails}
//               onChange={e => setAddonDetails(e.target.value)}
//               placeholder="Details (e.g., ₹50 extra)"
//             />
//           </Col>
//           <Col md={2}>
//             <Button variant="secondary" onClick={addAddon}>Add</Button>
//           </Col>
//         </Row>

//         <div className="text-center">
//           <Button
//             type="submit"
//             variant="primary"
//             size="lg"
//             className="mt-3 px-5 rounded-pill"
//           >
//             ➕ Add Service
//           </Button>
//         </div>
//       </Form>
//     </Card>
//   );
// };

// export default ServiceForm;



import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const ServiceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const storeName = location.state?.storeName || localStorage.getItem("storeName") || 'Your Store';

  useEffect(() => {
    if (location.state?.storeName && location.state.storeName !== 'Your Store') {
      localStorage.setItem("storeName", location.state.storeName);
    }
  }, [location.state]);

  const [service, setService] = useState({
    name: '',
    category: '',
    rate: '',
    discountedRate: '',
    description: '',
    media: [],
    duration: '',
    serviceCode: ''
  });

  const [addons, setAddons] = useState([]);
  const [addonName, setAddonName] = useState('');
  const [addonDetails, setAddonDetails] = useState('');

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
        setService(prev => ({
          ...prev,
          media: images
        }));
      });
    } else {
      setService(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addAddon = () => {
    if (!addonName || !addonDetails) return;
    setAddons([...addons, { name: addonName, details: addonDetails }]);
    setAddonName('');
    setAddonDetails('');
  };

  const addVariant = () => {
    if (!variantName || !variantValues) return;

    const values = variantValues.split(',').map(v => ({
      value: v.trim(),
      price: '',
      quantity: ''
    }));

    setVariants([...variants, { name: variantName, values }]);
    setVariantName('');
    setVariantValues('');
  };

  const updateVariantDetail = (variantIndex, valueIndex, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].values[valueIndex][field] = value;
    setVariants(updatedVariants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = {
      ...service,
      addons,
      variants,
      storeName
    };

    const existingServices = JSON.parse(localStorage.getItem("allServices")) || [];
    existingServices.push(newService);
    localStorage.setItem("allServices", JSON.stringify(existingServices));
    localStorage.setItem("servicesStep", "completed");

    navigate('/catlog', { state: { storeName } });

    setService({
      name: '',
      category: '',
      rate: '',
      discountedRate: '',
      description: '',
      media: [],
      duration: '',
      serviceCode: ''
    });
    setAddons([]);
    setVariants([]);
    setAddonName('');
    setAddonDetails('');
    setVariantName('');
    setVariantValues('');
  };

  return (
    <Card className="p-4 shadow-sm" style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff' }}>
      <h3 className="mb-4 text-center fw-bold text-primary">Add New Service</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Service Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
            placeholder="e.g., Haircut, Plumbing"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Service Category *</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={service.category}
            onChange={handleChange}
            placeholder="e.g., Beauty, Home Services"
            required
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Rate *</Form.Label>
              <Form.Control
                type="number"
                name="rate"
                value={service.rate}
                onChange={handleChange}
                placeholder="₹ Enter service rate"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Discounted Rate</Form.Label>
              <Form.Control
                type="number"
                name="discountedRate"
                value={service.discountedRate}
                onChange={handleChange}
                placeholder="₹ Enter discounted rate"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Service Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={service.description}
            onChange={handleChange}
            placeholder="Write a detailed description"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Service Media (images/videos)</Form.Label>
          <Form.Control
            type="file"
            name="media"
            accept="image/*,video/*"
            onChange={handleChange}
            multiple
          />
          <Form.Text className="text-muted">Recommended image size: 1000×1248px</Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Additional Info</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="duration"
                value={service.duration}
                onChange={handleChange}
                placeholder="Duration (e.g., 30 mins)"
              />
            </Col>
            <Col>
              <Form.Control
                name="serviceCode"
                value={service.serviceCode}
                onChange={handleChange}
                placeholder="Service Code (e.g., SRV001)"
              />
            </Col>
          </Row>
        </Form.Group>

        <hr className="my-4" />
        <h5 className="mb-3">Add-ons</h5>

        {addons.map((a, i) => (
          <div key={i} className="alert alert-secondary p-2 d-flex justify-content-between align-items-center">
            <span><strong>{a.name}:</strong> {a.details}</span>
            <Button size="sm" variant="outline-danger" onClick={() => {
              const updated = [...addons];
              updated.splice(i, 1);
              setAddons(updated);
            }}>Delete</Button>
          </div>
        ))}

        <Row className="align-items-end mb-4">
          <Col md={5}>
            <Form.Control
              value={addonName}
              onChange={e => setAddonName(e.target.value)}
              placeholder="Addon name (e.g., Hair Wash)"
            />
          </Col>
          <Col md={5}>
            <Form.Control
              value={addonDetails}
              onChange={e => setAddonDetails(e.target.value)}
              placeholder="Details (e.g., ₹50 extra)"
            />
          </Col>
          <Col md={2}>
            <Button variant="secondary" onClick={addAddon}>Add</Button>
          </Col>
        </Row>

        <hr className="my-4" />
        <h5 className="mb-3">Variants</h5>

        <Row className="align-items-end mb-4">
          <Col md={4}>
            <Form.Control
              value={variantName}
              onChange={e => setVariantName(e.target.value)}
              placeholder="Variant name (e.g., Size)"
            />
          </Col>
          <Col md={6}>
            <Form.Control
              value={variantValues}
              onChange={e => setVariantValues(e.target.value)}
              placeholder="Values (e.g., S,M,L)"
            />
          </Col>
          <Col md={2}>
            <Button variant="secondary" onClick={addVariant}>Add</Button>
          </Col>
        </Row>

        {variants.map((variant, variantIndex) => (
          <div key={variantIndex} className="mb-4">
            <h6 className="fw-bold">{variant.name}</h6>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Action</th>
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
                        onChange={e =>
                          updateVariantDetail(variantIndex, valueIndex, 'price', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={val.quantity}
                        onChange={e =>
                          updateVariantDetail(variantIndex, valueIndex, 'quantity', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          const updated = [...variants];
                          updated[variantIndex].values.splice(valueIndex, 1);
                          setVariants(updated);
                        }}
                      >
                        ❌
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}

        <div className="text-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-3 px-5 rounded-pill"
          >
            ➕ Add Service
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ServiceForm;
