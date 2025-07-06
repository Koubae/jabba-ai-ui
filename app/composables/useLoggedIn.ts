export const useLoggedIn = () => {
    const error = ref<string | null>(null)
    const cookie = useCookie('access_token')

    const requireAuth = (redirectOnFail = false) => {
        if (!cookie.value) {
            error.value = 'Access token not found'

            if (redirectOnFail) {
                navigateTo('/login')
                return null
            }

            throw createError({
                statusCode: 403,
                statusMessage: 'Forbidden - Access token required'
            })
        }

        return cookie.value
    }

    return {
        error,
        accessToken: cookie,
        requireAuth,
        isAuthenticated: computed(() => !!cookie.value)
    }
}
