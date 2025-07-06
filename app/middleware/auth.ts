export default defineNuxtRouteMiddleware((_to, _from) => {
    const access_token = useCookie('access_token')

    if (!access_token.value) {
        alert("You must login first!")
        return navigateTo('/login')
    }
})
