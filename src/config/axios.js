import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `https://realestate.bdata.asia/`
})

HTTP.interceptors.response.use(
  (response) => {
    if (response.data.status === 'token_expired') {
      // logout here
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
