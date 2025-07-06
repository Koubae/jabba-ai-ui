export function useLogin() {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const cookie = useCookie('access_token')

    async function login(application_id: string, username: string, password: string): Promise<boolean> {
        loading.value = true
        error.value = null

        let authorized = false

        try {
            const data = await $fetch<LoginResponse>('/api/identity/login', {
                method: 'POST',
                body: { application_id, username, password }
            })

            const token = data?.access_token

            if (token) {
                cookie.value = token
            }
            authorized = true
        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message : 'Login failed'
        } finally {
            loading.value = false
        }

        return authorized;

    }

    return { login, loading, error }
}

interface LoginResponse {
    access_token?: string
}
