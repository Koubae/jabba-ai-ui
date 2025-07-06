import {isAuthenticated as checkIfIsAuthenticated, logout as doLogout} from "~/common/auth";

export const useAuth = () => {
    const isAuthenticated = computed(checkIfIsAuthenticated)

    const logout = () => {
        doLogout()
    }

    return {
        isAuthenticated,
        logout,
    }
}