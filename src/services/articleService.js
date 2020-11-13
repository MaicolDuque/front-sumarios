import axios from "axios";
import All from '../config'

export const getArticlesByVolume = async (idUSer, token) => {
  return axios({
    method: "GET",
    baseURL: All.backend.url,
    url: `/articles/volume/${idUSer}`,
    headers: {
      token
    }
  })
}