// import React from "react";
import axios from 'axios';



const APIresult = {
    status: 0,
    data: null
}



const GET_client = async (url, token) => {

    // const { getAccessTokenSilently } = useAuth0();

    let result = APIresult;

    try {
        // const token = await getAccessTokenSilently();

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };

        const response = await fetch(url, requestOptions);

        result.status = response.status;

        if (response.status === 200) {
            result.data = await response.json();
        }
        else {
            result.data = await response.text();
        }

        return result;

    } catch (error) {
        result.data = error.toString()
    }
    return result;
}

const POST_client = async (url, token, jsonData) => {

    //const { getAccessTokenSilently } = useAuth0();

    let result = APIresult;

    try {
        //const token = await getAccessTokenSilently();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(jsonData),
        };
        const response = await fetch(url, requestOptions)


        result.status = response.status;

        if (response.status === 200) {
            result.data = await response.json();
        }
        else {
            result.data = await response.text();
        }

        return result;

    } catch (error) {
        result.data = error.toString()
    }
    return result;
}
const PUT_client = async (url, token, jsonData) => {

    //const { getAccessTokenSilently } = useAuth0();

    let result = APIresult;

    try {
        //const token = await getAccessTokenSilently();
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(jsonData),
        };
        const response = await fetch(url, requestOptions)


        result.status = response.status;

        if (response.status === 200) {
            result.data = await response.json();
        }
        else {
            result.data = await response.text();
        }

        return result;

    } catch (error) {
        result.data = error.toString()
    }
    return result;
}
const POST_media = async (url, token, formData) => {

    let result = APIresult;

    try {
        let response = await axios.post(url, 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
          }
        })
      console.log(response.data);
      return response.data;

    } catch (error) {
        result.data = error.toString()
    }
    return result;
}
//#region Region1

const EmpresaFunctions = {
    apiServer: 'https://api.trii.app',
    saveOnServer: async function(token, name, phone, address, email, logo){
        let url = EmpresaFunctions.apiServer + '/api/v1/business';
        let data={
            name: name,
            email: email,
            address: address,
            phone: phone,
            logo: logo
        }
        let res = await POST_client(url, token, data)
        if (res.status === 200) {
            return true;
        }
        else {
            return false;
        }
    },
    updateOnServer: async function(token, id, name, phone, address, email, logo){
        let url = EmpresaFunctions.apiServer + '/api/v1/business/' + id;
        let data={
            name: name,
            email: email,
            address: address,
            phone: phone,
            logo: logo
        }
        let res = await PUT_client(url, token, data)
        if (res.status === 200) {
            return true;
        }
        else {
            return false;
        }
    },
    updateLogoOnServer: async function(token, id, logo){
        let url = EmpresaFunctions.apiServer + '/api/v1/business/' + id;
        let data={
            logo: logo
        }
        let res = await PUT_client(url, token, data)
        if (res.status === 200) {
            return true;
        }
        else {
            return false;
        }
    },    
    updateLogo: async function(token, formData){
        let url = EmpresaFunctions.apiServer + '/api/v1/media/upload';

        let res = await POST_media(url, token, formData)
console.log(res)
console.log(res)
        if (res.url) {
            return res.url;
        }
        else {
            return "";
        }
    },
    get: async function(token){
        let url = EmpresaFunctions.apiServer + '/api/v1/business/tenant';
        let res = await GET_client(url, token)
        
        if (res.status === 200) {
            return res.data[0];
        }
        else {
            return null;
        }


    },

}
const TriiFunctions = {

    getDomain: function(){

        try {
            let host = window.location.hostname.toString().split('.')[0].replace("localhost", "develop");
            return host;
        }
        catch { }
        return ""
    }
}
//#endregion


export { GET_client, POST_client, TriiFunctions, EmpresaFunctions };