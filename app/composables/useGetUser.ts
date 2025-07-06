import {useLoggedIn} from "~/composables/useLoggedIn";
import {setUserInStorage} from "~/common/auth";

export const useGetUser = (redirectOnAuthFail = false) => {
    const { requireAuth, error: authError } = useLoggedIn()
    const loading = ref(false)
    const error = ref<string | null>(null)


    const fetchUser = async (access_token: string | null = null) => {
        let response = null

        try {
            loading.value = true
            error.value = null

            if (access_token === null) {
                const access_token = requireAuth(redirectOnAuthFail)
                if (!access_token) return null
            }

            response = await $fetch('/api/identity/user', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            setUserInStorage(response)

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