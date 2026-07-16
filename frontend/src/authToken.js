const tokenKey = 'chatworld_access_token'

export const getAuthToken = () => {
  try {
    return sessionStorage.getItem(tokenKey)
  } catch {
    return null
  }
}

export const setAuthToken = (token) => {
  try {
    sessionStorage.setItem(tokenKey, token)
  } catch {
    return undefined
  }
}

export const clearAuthToken = () => {
  try {
    sessionStorage.removeItem(tokenKey)
  } catch {
    return undefined
  }
}
