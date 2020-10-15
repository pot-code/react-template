import Axios from 'axios'

// RESTError reponse error
export interface RESTError {
  code: number
  message: string
  errors?: RESTInnerError[]
}

// RESTInnerError nested error as response.error.errors
export interface RESTInnerError {
  domain: string
  reason: string
  message?: string
}

let baseURL = '127.0.0.1' // prod
switch (process.env.NODE_ENV) {
  case 'production':
    baseURL = '127.0.0.1'
    break
  case 'development':
    baseURL = '127.0.0.1:8080'
    break
  case 'union':
    baseURL = '127.0.0.1:8081'
    break
  default:
    baseURL = '127.0.0.1'
}
const mockPrefix = 'http://' + baseURL

enum HttpStatus {
  StatusBadRequest = 400, // RFC 7231, 6.5.1
  StatusUnauthorized = 401, // RFC 7235, 3.1
  StatusForbidden = 403, // RFC 7231, 6.5.3
  StatusNotFound = 404, // RFC 7231, 6.5.4
  StatusInternalServerError = 500, // RFC 7231, 6.6.1
  StatusServiceUnavailable = 503 // RFC 7231, 6.6.
}

Axios.defaults.baseURL = 'http://' + baseURL
Axios.defaults.withCredentials = true
Axios.defaults.timeout = 30 * 1e3 // 30 sec to timeout
Axios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err.response) {
      const response = err.response
      // rest error
      return Promise.reject(response.data.error)
    } else if (err.request) {
      //
    }
    return Promise.reject({
      message: err.message,
      meta: err
    })
  }
)

const AxiosWithRedirect = Axios.create()
AxiosWithRedirect.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err.response) {
      const response = err.response
      if (response.status === HttpStatus.StatusUnauthorized) {
        window.location.assign('/login.html')
        return null
      }
      return Promise.reject(response.data.error)
    } else if (err.request) {
      //
    }
    return Promise.reject({
      message: err.message,
      meta: err
    })
  }
)

export { baseURL, mockPrefix, HttpStatus, AxiosWithRedirect }
