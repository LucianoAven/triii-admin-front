import React, { useState, Fragment, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./newClient.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiServer from "./apiServer";
import { ErrorSharp, NextWeekOutlined } from "@material-ui/icons";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


toast.configure();

const NewClient = () => {
  const [message, setMessage] = useState("");


  // const { getAccessTokenSilently } = useAuth0();


  


  var generator = require("generate-password");
  var pass = generator.generate({
    minLength: 12,
    numbers: true,
    symbols: true,
    uppercase: true,
  });

  const [isShown, setIsShown] = useState(false);
  const [form, setForm] = useState({
    tenantName: "",
    email: "",
    password: "",
  });

  const showPassword = () => {
    setIsShown(!isShown);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      password: pass,
      [name]: value,
    });
  };

  const { tenantName, email, password } = form;
  var formValues =
    "Tenant: " + tenantName + "\nemail: " + email + "\npassword: " + password;

  var isDisabled =
    tenantName.length > 3 &&
    email.length > 3 &&
    email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();
    // try {
    //   console.log('form JSON', JSON.stringify(form))
    //   const token = await getAccessTokenSilently();
    //   console.log('token', token)
    //   const requestOptions = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(form),
    //   };
    //   fetch(apiServer.account, requestOptions)
    //     .then((response) => {
    //       console.log("response", response);
    //       return response.json();
    //     })
    //     .then((res) => console.log("resultado", res));

    //   // axios.post(
    //   //   api.createClient,
    //   //   data,
    //   //   {
    //   //     headers: {
    //   //       'Content-Type': 'application/json' ,
    //   //       Authorization: Bearer ${token},
    //   //     }
    //   //   }
    //   //   ).then(res => {
    //   //     console.log('ok', res);
    //   //     //redirect to lista de clientes
    //   //   })
    //   //   .catch(
    //   //     err => console.log(err)
    //   //   );
    //   console.log(form);

    //   toast.success("Cambios guardados.");
    // } catch (error) {
    //   toast.error("error");
    //   setMessage(error.message);
    // }
    // clearForm(setForm);
  };

  return (
    <Fragment>
      <div className="centered">
        <div className="card ">
          <div className="card-body">
            <form id="formNewClient" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="dominio">Dominio:</label>
                <input
                  className="mb-3 form-control"
                  placeholder="dominio"
                  name="tenantName"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  className="mb-3 form-control"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contraseña">Contraseña:</label>
                <div className="input-container mb-3">
                  <input
                    className="form-control"
                    placeholder="contraseña"
                    name="password"
                    value={form.password}
                    type={isShown ? "text" : "password"}
                    onChange={handleChange}
                    />
                    <i className="d-flex align-items-center" onClick={showPassword}>
                    {isShown ? <VisibilityOffIcon></VisibilityOffIcon>:<VisibilityIcon ></VisibilityIcon>}
                      
                    </i>
                  </div>
                  <CopyToClipboard text={formValues}>
                    <button type="button" className="btn btn-primary mb-3 mr-3">
                      Copiar
                    </button>
                  </CopyToClipboard>
                  
                </div>
              
              <button
                className={
                  !isDisabled ? "btn btn-outline-danger" : "btn btn-secondary"
                }
                type="submit"
                disabled={!isDisabled}
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewClient;

// function clearForm(setForm) {
//   setForm({
//     tenantName: "",
//     email: "",
//     password: "",
//   });
// }
