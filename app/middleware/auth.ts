import {isAuthenticated} from "~/common/auth";

export default defineNuxtRouteMiddleware((_to, _from) => {
    if (!isAuthenticated()) {
        alert("You must login first!")
        return navigateTo('/auth/login')
    }
})
