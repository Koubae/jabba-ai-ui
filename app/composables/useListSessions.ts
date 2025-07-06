import {useLoggedIn} from "~/composables/useLoggedIn";
import type {Session} from "~/common/interfaces";

export const useListSessions = (redirectOnAuthFail = true) => {
    const { requireAuth, error: authError } = useLoggedIn()
    const loading = ref(false)
    const error = ref<string | null>(null)


    const fetchSessions = async () : Promise<Array<Session>> => {
        let response: Array<Session> = []

        try {
            loading.value = true
            error.value = null

            const token = requireAuth(redirectOnAuthFail)
            if (!token) {
                return response
            }

            response = await $fetch('/api/chat/session/list-sessions', {
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
        fetchSessions
    }
}