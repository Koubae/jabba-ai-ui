import {useLoggedIn} from "~/composables/useLoggedIn";

export const useListApplications = (redirectOnAuthFail = true) => {
    const { requireAuth, error: authError } = useLoggedIn()
    const loading = ref(false)
    const error = ref<string | null>(null)


    const fetchApplications = async () => {
        let response = null

        try {
            loading.value = true
            error.value = null

            const token = requireAuth(redirectOnAuthFail)
            if (!token) {
                return null
            }

            response = await $fetch('/api/chat/application/list-applications', {
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
        fetchApplications
    }
}