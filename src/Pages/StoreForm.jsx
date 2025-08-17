import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountrySelect, StateSelect, CitySelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import './StoreForm.css';
import './ProductSelection.css';

const categories = [
  "Appliances", "Baby", "Beauty and Personal Care", "Books and Stationery", "Clothing",
  "Electronics", "Food and Grocery", "Footwear", "Furniture", "General",
  "Health Supplements", "Home and Kitchen", "Home Care", "Jewelry",
  "Lawn and Garden", "Luggage and Bags", "Multipurpose", "Pet Products",
  "Sports and Fitness", "Toys and games", "Watches", "Other"
];

function StoreForm() {
  const navigate = useNavigate();
  const [storeDescription, setStoreDescription] = useState('');

  const [storeName, setStoreName] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [otherInput, setOtherInput] = useState('');

   const [businessOwned, setBusinessOwned] = useState('');
  const [businessSize, setBusinessSize] = useState('');
  const [platforms, setPlatforms] = useState([]);

  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    setPlatforms((prev) =>
      checked ? [...prev, value] : prev.filter((p) => p !== value)
    );
  };

  // ✅ ONLY THIS SECTION IS UPDATED
const checkAvailability = async () => {
  const trimmed = storeName.trim().toLowerCase();
    if (!trimmed) {
      alert('Please enter a store name first.');
      return;
    }

     try {
      const res = await fetch(`http://localhost:3000/store?storeName=${storeName}`);
      const data = await res.json();

      if (data.length > 0) {
        setIsAvailable(false);
     
        // alert("Store name not available");
      } else {
      setIsAvailable(data.length === 0);
        // alert("Store name is available");
      }
    } catch (err) {
      console.error("Error verifying store name:", err);
      alert("Error checking store name");
    }
  };
  



  const toggleCategory = (category) => {
    if (category === "Other") {
      if (!selected.includes("Other")) setSelected([...selected, "Other"]);
      else setSelected(selected.filter(c => c !== "Other"));
    } else {
      setSelected(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  return (
    <div className="m1">
   
      <div id="navbar">
        <span id="logo">Local<span id="biz-color">Scope</span></span>
        <div id="nav-links">
          <span>Help</span>
          <span onClick={() => navigate('/login')}>Logout</span>
        </div>
      </div>

     
      <div className="s1">
        <div className="left s1left">
          {/* <h1 id="form-title">What should we call your store?</h1>
          <p id="form-subtitle">Store name can't be edited!</p> */}

          <label style={{ fontWeight: "bold", fontSize: "16px" }}>Store Name*</label>
<div className="input-button-group"> 
  <input
    type="text"
    className="store-name-input"
    value={storeName}
    onChange={(e) => {
      setStoreName(e.target.value);
      setIsAvailable(null);
    }}
    placeholder="Enter your store name"
  />
  <button
   id="check-button"   
     
    onClick={checkAvailability}
  >
    Verify Store Name
  </button>
</div>
          {isAvailable === true && (
            <p id="available" style={{ color: 'green', marginTop: '-10px' }}>
              Store name is available
            </p>
          )}
          {isAvailable === false && (
            <p style={{ color: 'red', marginTop: '-10px' }}>
              Store name is taken
            </p>
          )}

          <label style={{fontWeight:"bold", fontSize:"16px"}}>Store Link</label>
          <input
            type="text"
            value={storeName ? `www.localScope.in/${storeName.toLowerCase()}` : ''}
            readOnly
          />
          <p id="storelink">This is your store link that customers will use.</p>
          <div className="form-group">
        <label htmlFor="storeDescription">Store Description</label>
        <textarea
          id="storeDescription"
          name="storeDescription"
          maxLength="250"
          value={storeDescription}
          onChange={(e) => setStoreDescription(e.target.value)}
          placeholder="Tell us about your store (max 250 characters)"
          rows={4}
        />
        <small>{storeDescription.length}/250 characters</small> <br />
      </div>
          <div className="productform">
          <h1 id="form-title">Product Category</h1>
          {/* <p id="form-subtitle">Select as many as you like. You can change them later.</p> */}

          <div id="categories">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-tag ${selected.includes(category) ? 'selected' : ''}`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {selected.includes("Other") && (
            <input
              id="other-category-input"
              type="text"
              placeholder="Specify other product"
              value={otherInput}
              onChange={(e) => setOtherInput(e.target.value)}
            />
          )}

         
        </div>
        </div>

        <div className="right s1left">
          <h1 id="form-title">Store Address</h1>
          {/* <p id="form-subtitle">You can update your location anytime.</p> */}

          <label style={{fontWeight:"bold", fontSize:"15px"}}>  Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Store No, Building, Apartment"
            maxLength={100}
           
          />

          <label style={{fontWeight:"bold", fontSize:"15px"}}>Area / Street</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Area, Street, Sector, Village"
          />

          <label style={{fontWeight:"bold", fontSize:"15px"}}>Landmark (optional)</label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Landmark"
          />

          <label style={{fontWeight:"bold", fontSize:"15px"}}>Pincode*</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
             maxLength={6}
            required
          />

          <div className="location-selects">
            <div style={{ flex: 1 }}>
              <label>Country*</label>
              <CountrySelect
                countryid={countryId}
                onChange={(country) => {
                  setCountryId(country.id);
                  setStateId(null);
                  setCityId(null);
                }}
                placeHolder="Country"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>State*</label>
              <StateSelect
                countryid={countryId}
                stateid={stateId}
                onChange={(state) => {
                  setStateId(state.id);
                  setCityId(null);
                }}
                placeHolder="State"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>City*</label>
              <CitySelect
                countryid={countryId}
                stateid={stateId}
                cityid={cityId}
                onChange={(city) => {
                  setCityId(city.id);
                }}
                placeHolder="City"
              />
            </div>
          </div>
         <button
            id="next-button"
           
            onClick={async () => {
  if (!storeName || !pincode || selected.length === 0 || !isAvailable) {
    alert('Please fill all required fields and verify store name.');
    return;
  }

  const newStore = {
    storeName: storeName.trim(),
    storeDescription,
    storeAddress: {
      address,
      area,
      landmark,
      pinCode: pincode,
      countryId,
      stateId,
      cityId
    },
    productCategories: selected.includes("Other") ? [...selected, otherInput] : selected
  };

  try {
    const res = await fetch('http://localhost:3000/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStore)
    });

    if (res.ok) {
      navigate('/Home', { state: { storeName } });
    } else {
      alert('Failed to save store. Please try again.');
    }
  } catch (error) {
    console.error("Error saving store:", error);
    alert('Error saving store.');
  }
}}

          >
            Next
          </button>
        </div>
        
      </div>

    </div>
  );
}

export default StoreForm;
