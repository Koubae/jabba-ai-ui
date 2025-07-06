import {redirectToLoginPage} from "~/common/redirects";
import type {User} from "~/common/interfaces";

/**
 * Clear authentication data and redirect to login
 */
export function logout() {
    // Clear the auth token cookie
    const cookie = useCookie('access_token')
    cookie.value = null

    removeUserFromStorage()
    redirectToLoginPage()
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

export function getUserFromStorage(): User | null {
    if (typeof window === 'undefined' || !window.localStorage) {
        return null
    }

    const userRaw = localStorage.getItem("user");
    if (!userRaw) {
        return null
    }
    return JSON.parse(userRaw)

}

export function setUserInStorage(user: object): void {
    localStorage.setItem('user', JSON.stringify(user))
}

export function removeUserFromStorage(): void {
    localStorage.removeItem('user')
}