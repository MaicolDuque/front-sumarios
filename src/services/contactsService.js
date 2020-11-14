import axios from "axios";
import All from "../config";

export const getContacts = async (data) => {
  const result = await axios(
    {
      method: "POST",
      baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
      url: `${process.env.REACT_APP_API_SEARCH_CONTACTS}`,
      data,
    }
  )
  return result
}

export const getContactsList = async (data) => {
  const result = await axios(
    {
      method: "POST",
      baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
      url: `${process.env.REACT_APP_API_SEARCH_CONTACTS_LIST}`,
      data,
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
      url: `${process.env.REACT_APP_API_CONTACTS}/${data.id}`,
    }
  )

  return result
}

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