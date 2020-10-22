import { apiFetch } from '../apiFetch';

const LoginService = async ({ cbSuccess, cbError }) => {
  apiFetch({
    URL: 'auth/google/success',
    options: {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    },
    cbSuccess: (data) => cbSuccess(data),
    cbError: (error) => cbError(error)
  })
}

export {
  LoginService
}