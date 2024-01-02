import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { useAuthSelector } from "../slices/auth/authSlice";

function CanActivate({ children, authentication = false }) {
  const navigate = useNavigate();

  const { user } = useAuthSelector();

  useEffect(() => {
    // console.log("Hii am activating...");
    if (authentication && !user) {
      navigate("/auth/login");
    }
  }, [authentication, user, navigate]);

  return children;
}

CanActivate.propTypes = {
  // children: propTypes.arrayOf(propTypes.element).isRequired,
  children: propTypes.any,
  authentication: propTypes.bool,
};

export default CanActivate;
