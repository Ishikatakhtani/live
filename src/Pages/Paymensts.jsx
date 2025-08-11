import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Nav2 from './Nav2';

const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const storeName = location.state?.storeName || localStorage.getItem("storeName") || 'Your Store';

  //const storeName = location.state?.storeName || 'Your Store';
useEffect(() => {
  if (storeName && storeName !== 'Your Store') {
    localStorage.setItem("storeName", storeName);
  }
}, [storeName]);


  console.log("Payments page received storeName:", storeName); // ✅ Debug
  return (
    <>
    <div style={{display:"flex"}}>
<Nav2/>
      <h1>Payments</h1> <br /> <br />
      <span
        onClick={() => {
          console.log("Navigating to catalog with storeName:", storeName);
          navigate('/catlog', { state: { storeName } }); // ✅ Fixed typo from /catlog
        }}
        
        style={{ cursor: 'pointer', color: '#0066ff' }}
      >
        Catalog
      </span>
       </div>
    </>
  );
};

export default Payments;
