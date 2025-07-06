export function useLogin() {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const cookie = useCookie('auth_token')

    async function login(application_id: string, username: string, password: string) {
        loading.value = true
        error.value = null

        try {
            const { data } = await useFetch<LoginResponse>('/api/identity/login', {
                method: 'POST',
                body: { application_id, username, password }
            })

            const token = data.value?.access_token

            if (token) {
                cookie.value = token
            }

            return data.value
        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message : 'Login failed'
            return null
        } finally {
            loading.value = false
        }
    }

    return { login, loading, error }
}

interface LoginResponse {
    access_token?: string
}
