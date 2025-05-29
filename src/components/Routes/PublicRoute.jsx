import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../context/UseAuth";

/**
 * PublicRoute component that redirects authenticated users away from routes like login and signup
 *
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - The component to render if user is not authenticated
 * @returns {JSX.Element} - Either the children component or a redirect to home page
 */
const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  // if (token) {
  //   return <Navigate to="/" replace />;
  // }

  // Otherwise, render the requested component (login/signup)
  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
