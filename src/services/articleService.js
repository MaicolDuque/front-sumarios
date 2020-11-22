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

export const indexarVolumeService = async (idVolume, token) => {
  return axios({
    method: "POST",
    baseURL: All.backend.url,
    url: `/scraping/indexar`,
    data: { idVolume },
    headers: {
      token
    }
  })
}

export const refreshVolumesMagazineService = async (data, token) => {
  return axios({
    method: "POST",
    baseURL: All.backend.url,
    url: `/scraping/volumes-magazine`,
    data,
    headers: {
      token
    }
  })
}
