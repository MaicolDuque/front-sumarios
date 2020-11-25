import axios from "axios";
import All from '../config'


export const getAllUsersMagazine = async (token) => {
  return axios({
    method: "GET",
    baseURL: All.backend.url,
    url: `/users`,
    headers: {
      token
    }
  })
}

export const getAllVolumesMagazine = async (idUser, token) => {
  return axios({
    method: "GET",
    baseURL: All.backend.url,
    url: `/users/volumes/${idUser}`,
    headers: {
      token
    }
  })
}

export const postSolicitude = async(data) =>{
  const result = await axios({
      method: "POST",
      baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
      url: `${process.env.REACT_APP_API_CREATE_USER}`,
      data,
    })
  return result
}

export const getUserPending = async()=>{
  const result = await axios({
    method: "GET",
    baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
    url: `${process.env.REACT_APP_API_USER_PENDING}`
  })
  return result
}

export const updateStatus = async(idPublisher)=>{
  const result = await axios({
    method:"PUT",
    baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
    url: `${process.env.REACT_APP_API_ACTIVATE_USER}/${idPublisher}`
  })
  return result
}

export const getPerfil = (idPublisher, token)=>{
  const result = axios({
    method:"GET",
    baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
    url:`/api/users/${idPublisher}`,
    headers: {
      token
    }
  })
  return result

}

export const updatePerfil = (idPublisher, token, data)=>{
  const result = axios({
    method:"PUT",
    baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
    url:`/api/users/${idPublisher}`,
    headers: {
      token
    },
    data
  })
  return result

}
