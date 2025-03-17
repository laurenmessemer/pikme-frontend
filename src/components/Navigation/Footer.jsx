import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";
import pikmeLogo from "../../assets/logos/pikme-logo.png";
import "../../styles/nav/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={pikmeLogo} alt="PikMe Logo" className="footer-logo" />
        <nav className="footer-nav">
          <Link to="/about" className="text-dark bold"><h6>About</h6></Link>
          <Link to="/faq" className="text-dark bold"><h6>FAQ</h6></Link>
          <Link to="/terms" className="text-dark bold"><h6>Terms of Service</h6></Link>
          <Link to="/privacy" className="text-dark bold"><h6>Privacy Policy</h6></Link>
        </nav>
      </div>
      <div className="footer-right">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">x</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
      </div>
    </footer>
  );
};

export default Footer;
