import PropTypes from "prop-types";
import { FiCheck, FiX, FiEdit, FiTrash2, FiUpload } from "react-icons/fi";
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
      case "upload":
        return "icon-btn-upload";
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

  const renderIcon = () => {
    // Handle React Icons from Feather Icons
    switch (icon) {
      case "SaveIcon":
        return <FiCheck />;
      case "CancelIcon":
        return <FiX />;
      case "EditIcon":
        return <FiEdit />;
      case "DeleteIcon":
        return <FiTrash2 />;
      case "UploadIcon":
        return <FiUpload />;
      default:
        return <FiTrash2 />;
    }
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
      {icon && renderIcon()}
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
    "upload",
    "delete",
    "save",
    "cancel",
  ]), // Button style variant
  shape: PropTypes.oneOf(["rounded", "square"]), // Button shape
  size: PropTypes.oneOf(["small", "medium", "large"]), // Button size
  className: PropTypes.string, // Additional CSS classes
  title: PropTypes.string, // Tooltip text
  children: PropTypes.node, // Additional content
};

export default IconButton;
