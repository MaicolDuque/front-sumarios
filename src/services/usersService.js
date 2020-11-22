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
