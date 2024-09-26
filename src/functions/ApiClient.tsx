// import { getSuggestedQuery } from "@testing-library/react";
import React from 'react';

class APIResult {
  status: number;
  data: object;

  constructor() {
    this.status = 400;
    this.data = [];
  }
}

const GET_client = async (url: string) => {
  let result = new APIResult();
  try {
    // const token = await getAccessTokenSilently();
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, requestOptions);

    result.status = response.status;

    if (response.status === 200) {
      result.data = await response.json();
    } else {
      let dataString = JSON.stringify(result.data);
      dataString = await response.text(); // eslint-disable-line
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
  return result;
};
const POST_client = async (url: string, jsonData: object) => {
  let result = new APIResult();

  try {
    // let token = await auth.currentUser.getIdToken();
    //const token = await getAccessTokenSilently();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    };
    const response = await fetch(url, requestOptions);

    result.status = response.status;

    if (response.status === 200) {
      result.data = await response.json();
    } else {
      let dataString = JSON.stringify(result.data);
      dataString = await response.text(); // eslint-disable-line
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
  return result;
};
const PUT_client = async (url: string, jsonData: object) => {
  let result = new APIResult();

  try {
    // let token = await auth.currentUser.getIdToken();
    //const token = await getAccessTokenSilently();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    };
    const response = await fetch(url, requestOptions);

    result.status = response.status;

    if (response.status === 200) {
      result.data = await response.json();
    } else {
      let dataString = JSON.stringify(result.data);
      dataString = await response.text(); // eslint-disable-line
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
  return result;
};
const DELETE_client = async (url: string) => {
  let result = new APIResult();

  try {
    // let token = await auth.currentUser.getIdToken();
    //const token = await getAccessTokenSilently();
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(jsonData),
    };
    const response = await fetch(url, requestOptions);

    result.status = response.status;

    if (response.status === 200) {
      result.data = await response.json();
    } else {
      let dataString = JSON.stringify(result.data);
      dataString = await response.text(); // eslint-disable-line
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
  return result;
};

// const userName_POST = async (url: string, jsonData: object) => {
//   let result = new APIResult();

//   try {
//     if(auth.currentUser == null){
//       return result;
//     }
//     let token = await auth.currentUser.getIdToken();
//     //const token = await getAccessTokenSilently();
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(jsonData),
//     };
//     const response = await fetch(url, requestOptions)

//     result.status = response.status;

//     if (response.status === 200) {
//       result.data = await response.json();
//     }
//     else {
//       let dataString = JSON.stringify(result.data)
//       dataString = await response.text();
//     }

//     return result;

//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//     } else {
//       console.log('Unexpected error', error);
//     }
//   }
//   return result;
// }
// const userPhoto_PUT = async (url: string, jsonData: object) => {
//   let result = new APIResult();

//   try {
//     if(auth.currentUser == null){
//       return result;
//     }
//     let token = await auth.currentUser.getIdToken();
//     //const token = await getAccessTokenSilently();
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(jsonData),
//     };
//     const response = await fetch(url, requestOptions)

//     result.status = response.status;

//     if (response.status === 200) {
//       result.data = await response.json();
//     }
//     else {
//       let dataString = JSON.stringify(result.data)
//       dataString = await response.text();
//     }

//     return result;

//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//     } else {
//       console.log('Unexpected error', error);
//     }
//   }
//   return result;
// }
// const userName_PUT = async (url: string, jsonData: object) => {
//   let result = new APIResult();

//   try {
//     if(auth.currentUser == null){
//       return result;
//     }
//     let token = await auth.currentUser.getIdToken();
//     //const token = await getAccessTokenSilently();
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(jsonData),
//     };
//     const response = await fetch(url, requestOptions)

//     result.status = response.status;

//     if (response.status === 200) {
//       result.data = await response.json();
//     }
//     else {
//       let dataString = JSON.stringify(result.data)
//       dataString = await response.text();
//     }

//     return result;

//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//     } else {
//       console.log('Unexpected error', error);
//     }
//   }
//   return result;
// }

class APIPagos extends React.Component {
  obtenerListaPagos = async () => {
    let url = 'https://jsonplaceholder.typicode.com/users';
    let list = await GET_client(url);
    return list;
  };
  añadirListaPagos = async (name: string) => {
    let url = 'https://jsonplaceholder.typicode.com/users';

    let jsonData = {
      name: name,
    };
    let list = await POST_client(url, jsonData);

    return list;
  };
  actualizarListaPagos = async (name: string) => {
    let url = 'https://jsonplaceholder.typicode.com/users';

    let jsonData = {
      name: name,
    };
    let list = await PUT_client(url, jsonData);
    return list;
  };
  borrarListaPagos = async () => {
    let url = 'https://jsonplaceholder.typicode.com/users';

    let list = await DELETE_client(url);
    return list;
  };
  // obtenerListaPagos = async () => {
  //   let list = await GET_client('/usuarios')
  //   let a = new APIResult()
  //   a.id = list.id
  //   return a
  // }
}
let url = 'https://server.api-qr.com/';
// url = 'http://localhost:5000/'
const APICuentas = {
  getCuentas: async () => {
    let list = await GET_client(url + 'v1/accounts');

    return list;
  },
  añadirCuenta: async (qraccount: any) => {
    let result = await POST_client(url + 'v1/accounts', qraccount);
    return result;
  },
  actualizarCuenta: async (id: string, qraccount: any) => {
    let list = await PUT_client(url + `v1/accounts/${id}`, qraccount);
    return list;
  },
  borrarCuenta: async (id: string) => {
    let list = await DELETE_client(url + `v1/accounts/${id}`);
    return list;
  },
};

const APIUserAccount = {
  inicializarUsuario: async (UserAccount: any) => {
    let list = await POST_client(url + 'v1/user', UserAccount);
    return list;
  },
  // editarUserName: async ()=> {
  //   let list = await userName_PUT("https://jsonplaceholder.typicode.com/users", [])
  //   console.log('obtenbetlista', list)
  //   return list
  // },
  // editarUserPhoto: async ()=> {
  //   let list = await userPhoto_PUT("https://jsonplaceholder.typicode.com/users", [])
  //   console.log('obtenbetlista', list)
  //   return list
  // },
  actualizarImagenPerfil: async (uid: string, imgProfile: string) => {
    let list = await PUT_client(url + `v1/user/${uid}`, { imgProfile: imgProfile });
    return list;
  },
  actualizarNombrePerfil: async (uid: string, name: string) => {
    let list = await PUT_client(url + `v1/user/${uid}`, { name: name });
    return list;
  },
  actualizarFacturaPerfil: async (
    uid: string,
    billing_name: string,
    billing_direction: string,
    billing_cuit: string
  ) => {
    let list = await PUT_client(url + `v1/user/${uid}`, {
      billing: {
        name: billing_name,
        direction: billing_direction,
        cuit: billing_cuit,
      },
    });
    return list;
  },
  eliminarCuentaPerfil: async (uid: string) => {
    let list = await DELETE_client(url + `v1/user/${uid}`);
    return list;
  },
};

export { APIPagos, APICuentas, APIUserAccount };
