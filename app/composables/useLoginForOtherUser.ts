import type {UserAuth} from "~/common/interfaces";
import {useGetOtherUser} from "~/composables/useGetOtherUser";

export function useLoginForOtherUser() {
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function loginOther(application_id: string, username: string, password: string): Promise<null | UserAuth> {
        const { fetchOtherUser } = useGetOtherUser(false)
        loading.value = true
        error.value = null
        console.log('loginOther', application_id, username, password)

        let userAuth: null | UserAuth = null
        try {
            const data = await $fetch<LoginResponse>('/api/identity/login', {
                method: 'POST',
                body: { application_id, username, password }
            })

            const accessToken = data?.access_token
            if (accessToken) {
                try {
                    const user = await fetchOtherUser(accessToken)
                    if (!user) {
                        error.value = 'Failed Fetch User data'
                        return null
                    }
                    userAuth = {
                        access_token: accessToken,
                        ...user
                    }
                } catch (err: unknown) {
                    console.error(`Failed Fetch User data error ${err}`, {err: err})
                    error.value = err instanceof Error ? err.message : 'Failed Fetch User data'
                }
            }

        } catch (err: unknown) {
            error.value = err instanceof Error ? err.message : 'Login failed'
        } finally {
            loading.value = false
        }

        return userAuth;

    }

    return { loginOther, loading, error }
}

interface LoginResponse {
    access_token?: string
}
