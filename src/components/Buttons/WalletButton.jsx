import PropTypes from "prop-types";
import "./WalletButton.css";

const WalletButton = ({ text }) => {
  return <button className="wallet-button">{text}</button>;
};

WalletButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default WalletButton;
