import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import pikmeLogo from "../../assets/logos/pikme-logo.png";
import "../../styles/nav/Footer.css";

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={pikmeLogo} alt="PikMe Logo" className="footer-logo" />
        <nav className="footer-nav">
          <Link to="/about" className="text-dark bold">
            <h6>About</h6>
          </Link>
          <Link to="/faq" className="text-dark bold">
            <h6>FAQ</h6>
          </Link>
          <Link to="/terms" className="text-dark bold">
            <h6>Terms of Service</h6>
          </Link>
          <Link to="/privacy" className="text-dark bold">
            <h6>Privacy Policy</h6>
          </Link>
        </nav>
      </div>
      <div className="footer-right">
        {/* <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://d38a0fe14bafg9.cloudfront.net/icons/x.webp"
            alt="X (formerly Twitter)"
            style={{ width: "15px", height: "15px", marginBottom: "1px" }}
          />
        </a> */}
        <a
          href="https://www.instagram.com/pikmeofficial/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.tiktok.com/@playpikme?lang=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
