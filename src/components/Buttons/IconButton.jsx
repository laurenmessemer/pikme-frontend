import PropTypes from "prop-types";
import CustomSvgIcon from "../../constant/CustomSvgIcons";
import "./IconButton.scss";

const IconButton = ({
  icon,
  onClick,
  disabled = false,
  variant = "primary",
  shape = "rounded", // "rounded" or "square"
  size = "medium", // "small", "medium", "large"
  className = "",
  title = "",
  children,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "edit":
        return "icon-btn-edit";
      case "delete":
        return "icon-btn-delete";
      case "save":
        return "icon-btn-save";
      case "cancel":
        return "icon-btn-cancel";
      case "secondary":
        return "icon-btn-secondary";
      default:
        return "icon-btn-primary";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "icon-btn-small";
      case "large":
        return "icon-btn-large";
      default:
        return "icon-btn-medium";
    }
  };

  const getShapeClass = () => {
    return shape === "square" ? "icon-btn-square" : "icon-btn-rounded";
  };

  return (
    <button
      className={`icon-button ${getVariantClass()} ${getSizeClass()} ${getShapeClass()} ${
        disabled ? "icon-btn-disabled" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {icon && <CustomSvgIcon icon={icon} />}
      {children}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string, // Icon name from CustomSvgIcons
  onClick: PropTypes.func, // Function to execute on click
  disabled: PropTypes.bool, // Whether button is disabled
  variant: PropTypes.oneOf([
    "primary",
    "secondary", 
    "edit",
    "delete",
    "save",
    "cancel"
  ]), // Button style variant
  shape: PropTypes.oneOf(["rounded", "square"]), // Button shape
  size: PropTypes.oneOf(["small", "medium", "large"]), // Button size
  className: PropTypes.string, // Additional CSS classes
  title: PropTypes.string, // Tooltip text
  children: PropTypes.node, // Additional content
};

export default IconButton;
