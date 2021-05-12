type accessToken = string

export const getAccessToken = (authorization: string): accessToken => {
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    return authorization.split(" ")[1]
  } else {
    return null
  }
}
