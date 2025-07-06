import type {User} from "~/common/interfaces";
import {getUserFromStorage} from "~/common/auth";


export const useUser = () => {
    const user = useState<User | null>('user', () => null)

    const loadUser = () => {
        user.value = getUserFromStorage()
    }

    if (user.value === null) {
        loadUser()
    }

    return {
        user: readonly(user),
        loadUser
    }
}