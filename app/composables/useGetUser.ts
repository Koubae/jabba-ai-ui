import {useLoggedIn} from "~/composables/useLoggedIn";

export const useGetUser = (redirectOnAuthFail = false) => {
    const { requireAuth, error: authError } = useLoggedIn()
    const loading = ref(false)
    const error = ref<string | null>(null)


    const fetchUser = async () => {
        let response = null

        try {
            loading.value = true
            error.value = null

            const access_token = requireAuth(redirectOnAuthFail)
            if (!access_token) return null

            response = await $fetch('/api/identity/user', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            localStorage.setItem('user', JSON.stringify(response))

        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message :  'Failed to fetch user'
            throw err
        } finally {
            loading.value = false
        }

        return response
    }

    return {
        loading,
        error,
        authError,
        fetchUser
    }
}