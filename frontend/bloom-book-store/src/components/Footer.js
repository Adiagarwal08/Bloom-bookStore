import { Link } from "react-router-dom";
import "../components/Footer.css";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";
import instagram from "../images/instagram.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/faq">FAQ</Link>
        <Link to="/return_policy">Shipping & Returns Policy</Link>
        <Link to="/about">About Us</Link>
        <Link to="/t&c">Terms and Conditions</Link>
        <div className="social-icons">
          <img src={instagram} alt="instagram" />
          <img src={facebook} alt="facebook" />
          <img src={twitter} alt="twitter" />
        </div>
      </div>
      <div>
        <p>Stay Updated</p>
        <input type="text" placeholder="Your Email..." />
        <button className="subscribe">SUBSCRIBE</button>
      </div>
    </footer>
  );
};

export default Footer;
