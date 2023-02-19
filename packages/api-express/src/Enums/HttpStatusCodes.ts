const HttpStatusCodes = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 400,
  SERVER_ERROR: 500,
})

export type HttpStatus = keyof typeof HttpStatusCodes

export default HttpStatusCodes
