// Utility for managing Bearer tokens in localStorage/sessionStorage

const TOKEN_KEY = "authToken";

// Save token to sessionStorage
export function setAuthToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

// Get token from sessionStorage
export function getAuthToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

// Remove token from sessionStorage
export function removeAuthToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

// Get Bearer header for axios/fetch
export function getAuthHeader() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}