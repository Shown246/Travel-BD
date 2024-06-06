import { useContext } from "react"
import { AuthContext } from "../AuthContextProvider"
import { Navigate,useLocation  } from "react-router-dom";
const ProtectedRoute = ({children}) => {
  const {user} = useContext(AuthContext);
  const location = useLocation();
  if(user !== null){
    return children;
  }
  return (
    <Navigate to="/logIn" state={location.pathname} />
  );
}

import PropTypes from 'prop-types';

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute