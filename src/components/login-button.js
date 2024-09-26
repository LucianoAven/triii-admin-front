import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import {auth, db} from '../firebase'



const LoginButton = () => {
  return (
    <button
      className="btn btn-primary btn-block"      
    > 
      Iniciar sesion
    </button>
  );
};

export default LoginButton;
