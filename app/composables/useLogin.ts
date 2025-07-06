import {useGetUser} from "~/composables/useGetUser";
import {setAuthToken} from "~/common/auth";

export function useLogin() {
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function login(application_id: string, username: string, password: string): Promise<boolean | null> {
        const { fetchUser } = useGetUser(true)
        loading.value = true
        error.value = null

        let authorized = false
        try {
            const data = await $fetch<LoginResponse>('/api/identity/login', {
                method: 'POST',
                body: { application_id, username, password }
            })

            const accessToken = data?.access_token
            if (accessToken) {
                setAuthToken(accessToken)

                try {
                    const result = await fetchUser(accessToken)
                    if (!result) {
                        error.value = 'Failed Fetch User data'
                        return null
                    }
                    authorized = true
                } catch (err: unknown) {
                    authorized = false
                    console.error(`Failed Fetch User data error ${err}`, {err: err})
                    error.value = err instanceof Error ? err.message : 'Failed Fetch User data'
                }
            }

        } catch (err: unknown) {
            authorized = false
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
