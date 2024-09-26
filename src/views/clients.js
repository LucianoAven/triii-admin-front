import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import { Button, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { FormGroup } from "@material-ui/core";
import api from "./apiServer";
import "./clients.css";
import SpinnerT from "../components/Spinner";

const Clients = () => {
  // const { user } = useAuth0();
  const { name, picture, email } = "user@trii.com.ar";
  const [post, setPost] = useState(null);

  const [message, setMessage] = useState("");

  const [usuarios, setUsuarios] = useState([]);
  // useEffect(() => {
  //   axios
  //       .get(api.apiServerTres)
  //       .then( res => {
  //           setUsuarios(res.data)
  //       })
  //       .catch( err => {
  //           console.log(err)
  //       })
  // }, []);

  // const { getAccessTokenSilently } = useAuth0();

  // const callApi = async () => {
  //   try {
  //     const response = await fetch(api.getAccounts);

  //     const responseData = await response.json();
  //     setUsuarios(responseData)
  //     console.log(responseData)
  //   } catch (error) {
  //     setMessage(error.message);
  //   }
  // };

  const callSecureApi = async () => {
    // try {
    //   const token = await getAccessTokenSilently();
    //   console.log("token", token);
    //   const response = await fetch(api.account, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   const responseData = await response.json();
    //   setPost(true);
    //   setUsuarios(responseData);
    //   //setMessage(responseData.message);
    // } catch (error) {
    //   setPost(false);
    //   setMessage(error.message);
    // }
  };

  useEffect(() => {
    callSecureApi();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleShow = (register) => {
    setShow(true);
    setForm({ ...register });
  };

  const deleteUser = async (usuario) => {
    const deleteUser = {
      accountId: usuario._id,
    };
    // try {
    //   const token = await getAccessTokenSilently();
    //   const requestOptions = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(deleteUser),
    //   };
    //   fetch(api.accountDelete, requestOptions)
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
    // } catch (error) {
    //   setMessage(error.message);
    // }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-4 mb-0">Table</h1>
      <div className="row align-items-center pt-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {post ? (
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.tenantId}>
                  <th scope="row">{usuario.tenantId}</th>
                  <td>
                    <a href={`https://${usuario.tenantName}.trii.app`}>
                      {usuario.tenantName}
                    </a>
                  </td>
                  <td>{usuario.email}</td>
                  <td>{usuario.phone}</td>
                  <td>
                    <IconButton onClick={() => handleShow(usuario)}>
                      <VisibilityIcon></VisibilityIcon>
                    </IconButton>
                    <IconButton onClick={() => deleteUser(usuario)}>
                      <DeleteForeverIcon></DeleteForeverIcon>
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <SpinnerT />
          )}
        </table>
      </div>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-fullscr">
        <Modal.Header closeButton>
          <Modal.Title>Editar registro con ID: {form.tenantId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <label>Name:</label>
            <input
              readOnly
              className="form-control"
              name="name"
              type="text"
              value={form.tenantName}
            />
          </FormGroup>
          <FormGroup>
            <label>Username: </label>
            <input
              readOnly
              className="form-control"
              name="phone"
              type="text"
              value={form.username}
            />
          </FormGroup>
          <FormGroup>
            <label>Email:</label>
            <input
              readOnly
              className="form-control"
              name="email"
              type="text"
              value={form.email}
            />
          </FormGroup>
          <FormGroup>
            <label>Phone: </label>
            <input
              readOnly
              className="form-control"
              name="phone"
              type="text"
              value={form.phone}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Clients;
