import axios from "axios";
import All from '../config'

export const getArticlesByKeyword = async (data) => {
  const result = await axios(
    {
      method: "POST",
      baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
      url: `${process.env.REACT_APP_API_ARTICLES}`,
      data,
    }
  )
  return result
}

export const createSummary = async (data, token) => {
  return axios({
    method: "POST",
    baseURL: All.backend.url,
    url: '/summaries',
    data,
    headers: {
      token
    }
  })
}

export const getAllSummaries = async (idUSer, token) => {
  return axios({
    method: "GET",
    baseURL: All.backend.url,
    url: `/summaries/user/${idUSer}`,
    headers: {
      token
    }
  })
}

export const getAllArticlesBySummary = async (idSummary, token) => {
  return axios({
    method: "GET",
    baseURL: All.backend.url,
    url: `/summaries/${idSummary}`,
    headers: {
      token
    }
  })
}

export const updatesArticlesBySummary = async (idSummary, data, token) => {
  return axios({
    method: "PUT",
    baseURL: All.backend.url,
    url: `/summaries/${idSummary}`,
    data,
    headers: {
      token
    }
  })
}

export const sendEmailSummary = async (data, token) => {
  return axios({
    method: "POST",
    baseURL: All.backend.url,
    url: '/email/send-email',
    data,
    headers: {
      token
    }
  })
}

export const updatesInfoSummaryById = async (idSummary, data, token) => {
  return axios({
    method: "PUT",
    baseURL: All.backend.url,
    url: `/summaries/info/${idSummary}`,
    data,
    headers: {
      token
    }
  })
}