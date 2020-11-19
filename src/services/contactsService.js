import axios from "axios";
import All from "../config";

//---------------------------------------- Contact services ------------------------------------------------------------------------------//
export const getListsByEditor = async (idUSer, token) => {
  return axios({
    method: "GET",
    baseURL: All.backend.url,
    url: `/contact-list/${idUSer}`,
    headers: {
      token
    }
  })
}

export const getContacts = async (data) => {    
  const result = await axios(
      {
        method: "GET",
        baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_SEARCH_CONTACTS}/${data}`,
      }
    )
    return result
  }

  export const addContact = async (data) => {
    const result = await axios(
      {
        method: "POST",
        baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_CONTACTS}`,
        data,
      }
    )
    
    return result
  }

  export const deleteContact = async (data) => {
    const result = await axios(
      {
        method: "DELETE",
        baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_CONTACTS}/${data.id_lista}`,
      }
    )
    
    return result
  }

  export const updateContact = async (data, idContact) =>{
    const result = await axios (
      {
        method: "PUT",
        baseURL:  `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_CONTACTS}/${idContact.id}`,
        data
      }
    )
    return result
  }

//---------------------------------------- Contact services ------------------------------------------------------------------------------//
  export const getContactsList = async (data) => {
    const result = await axios(
      {
        method: "GET",
        baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_CONTACTSLIST}/${data}`,
      }
    )
    return result
  }

  export const createContactList = async (data) => {
    console.log(data)
    const result = await axios(
      {
        method: "POST",
        baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_CONTACTSLIST}`,
        data,
      }
    )
    
    return result
  }

  export const deleteContactList = async (data) => {
    const result = await axios(
      {
        method: "DELETE",
        baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_CONTACTSLIST}/${data}`,
      }
    )
    
    return result
  }

  export const updateContactList = async (data, idContact) =>{
    const result = await axios (
      {
        method: "PUT",
        baseURL:  `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_CONTACTSLIST}/${idContact}`,
        data
      }
    )
    return result
  }
