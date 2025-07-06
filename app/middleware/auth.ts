import {isAuthenticated} from "~/common/auth";
import {redirectToLoginPage} from "~/common/redirects";

export default defineNuxtRouteMiddleware((_to, _from) => {
    if (!isAuthenticated()) {
        return redirectToLoginPage()
    }
})
