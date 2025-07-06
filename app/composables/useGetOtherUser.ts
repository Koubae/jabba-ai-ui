import {useLoggedIn} from "~/composables/useLoggedIn";
import type {User} from "~/common/interfaces";

export const useGetOtherUser = (redirectOnAuthFail = false) => {
    const { requireAuth, error: authError } = useLoggedIn()
    const loading = ref(false)
    const error = ref<string | null>(null)


    const fetchOtherUser = async (accessToken: string | null = null): Promise<null | User> => {
        let response: null | User = null

        try {
            loading.value = true
            error.value = null

            let token = accessToken
            if (token === null) {
                token = requireAuth(redirectOnAuthFail)
                if (!token) {
                    return null
                }
            }

            response = await $fetch('/api/identity/user', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

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
        fetchOtherUser
    }
}