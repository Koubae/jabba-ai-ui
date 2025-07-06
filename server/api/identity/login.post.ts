export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const externalAuthURL = 'http://localhost:20000/api/v1/auth/login'
    return await $fetch(externalAuthURL, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },

    })
})
