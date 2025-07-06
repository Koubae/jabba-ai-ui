import {useLoggedIn} from "~/composables/useLoggedIn";
import type {SessionConnection} from "~/common/interfaces";

export const useStartSessions = (redirectOnAuthFail = true) => {
    const { requireAuth, error: authError } = useLoggedIn()
    const loading = ref(false)
    const error = ref<string | null>(null)


    const startSession = async (name: string, member_id: string, channel: string, accessToken: string | null = null): Promise<SessionConnection | null> => {
        let response: SessionConnection | null = null

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

            response = await $fetch('/api/chat/session/start', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: { session_name: name, member_id: member_id, channel: channel }
            })

        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message :  'Failed to start session'
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
        startSession
    }
}