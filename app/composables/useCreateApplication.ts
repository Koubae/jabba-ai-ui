import {useLoggedIn} from "~/composables/useLoggedIn";

export const useCreateApplications = (redirectOnAuthFail = false) => {
    const { requireAuth, error: authError } = useLoggedIn()
    const loading = ref(false)
    const error = ref<string | null>(null)


    const createApplication = async (name: string) => {
        let response = null

        try {
            loading.value = true
            error.value = null

            const token = requireAuth(redirectOnAuthFail)
            if (!token) {
                return null
            }

            response = await $fetch('/api/chat/application/create', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: { name }
            })

        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message :  'Failed to create application'
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
        createApplication
    }
}