import { LoginResponse } from "../pages/auth/auth-type"

const authTokensKey = "authTokens"

export function setAuthTokenAtLocal(data: LoginResponse) {
  localStorage.setItem(authTokensKey, JSON.stringify(data))
}

export function getAuthTokenFromLocal(): LoginResponse | null {
  const tokens = localStorage.getItem(authTokensKey)
  if (tokens) {
    return JSON.parse(tokens)
  }
  return null
}

export function clearLocalStorage() {
  localStorage.clear()
}
