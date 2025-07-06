
export function useSignup() {
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function signup(application_id: string, username: string, password: string): Promise<boolean> {
        loading.value = true
        error.value = null

        let success = false

        try {
            await $fetch<SignupResponse>('/api/identity/signup', {
                method: 'POST',
                body: { application_id, username, password }
            })

            success = true
        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message : 'Signup failed'
        } finally {
            loading.value = false
        }

        return success
    }

    return { signup, loading, error }
}

interface SignupResponse {
    message?: string
}