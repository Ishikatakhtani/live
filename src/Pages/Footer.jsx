import './Footer.css';
function Footer() { 
    
    return(
        <>
       
<footer class="footer">
  <div class="footer-container">
    <div class="footer-logo">
      <h2>Local Scope</h2>
      <p>Connecting you to your neighborhood marketplace.</p>
    </div>

    <div class="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/stores">Stores</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>

    <div class="footer-contact">
      <h4>Contact Us</h4>
      <p>Email: support@localscope.in</p>
      <p>Phone: +91 98765 43210</p>
      <p>Location:  India</p>
    </div>

    <div class="footer-social">
      <h4>Follow Us</h4>
      <div class="social-icons">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 Local Scope. All rights reserved.</p>
  </div>
</footer>
 </>
    )
}
export default Footer;
