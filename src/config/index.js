
const All = {
  google: {
    clientID: `${process.env.CLIENTE_GOOGLE}`,
    clientSecret: `${process.env.CLIENTE_GOOGLE_SECRET}`,
  },
  backend: {
    protocol: `${process.env.REACT_APP_PROTOCOL_BACKEND}`,
    host: `${process.env.REACT_APP_HOST_BACKEND}`,
    port: `${process.env.REACT_APP_PORT_BACKEND}`,
    api: `${process.env.REACT_APP_API}`,
    url: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}/api`
  }
}

export default All;