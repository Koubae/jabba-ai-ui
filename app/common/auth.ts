/**
 * Clear authentication data and redirect to login
 */
export function logout() {
    // Clear the auth token cookie
    const cookie = useCookie('access_token')
    cookie.value = null

    removeUserFromStorage()

    // Redirect to login page
    navigateTo('/auth/login')
}

/**
 * Check if the user is authenticated
 */
export function isAuthenticated(): boolean {
    const cookie = useCookie('access_token')
    return !!cookie.value
}

/**
 * Get current user token
 */
export function getAuthToken(): string | null {
    const cookie = useCookie('access_token')
    return cookie.value || null
}

/**
 * Set authentication token
 */
export function setAuthToken(token: string) {
    const cookie = useCookie('access_token')
    cookie.value = token
}

export function setUserInStorage(user: object): void {
    localStorage.setItem('user', JSON.stringify(user))
}

export function removeUserFromStorage(): void {
    localStorage.removeItem('user')
}