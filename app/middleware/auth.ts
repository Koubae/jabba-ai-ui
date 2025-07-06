export default defineNuxtRouteMiddleware((_to, _from) => {
    const authToken = useCookie('access_token')

    if (!authToken.value) {
        alert("You must login first!")
        return navigateTo('/login')
    }
})
