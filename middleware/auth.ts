//@ts-expect-error
export default defineNuxtRouteMiddleware((to, from) => {
    // Check if user is authenticated by looking for the auth token in cookies
    const authToken = useCookie('access_token')

    if (!authToken.value) {
        // If no token, redirect to login page
        alert("You must login first!")
        return navigateTo('/login')
    }
})