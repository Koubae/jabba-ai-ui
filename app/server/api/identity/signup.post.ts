import logger from '~/server/core/logger'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { application_id, username, password } = body

    if (!application_id || !username || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields: application_id, username, password'
        })
    }

    const identityURL = process.env.IDENTITY_URL || 'http://localhost:20000'
    const endpoint = `${identityURL}/api/v1/auth/signup`
    try {
        const response = await $fetch(endpoint, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        logger.info(`Identity Signup succeeded for ${username} (ApplicationID ${application_id}), response ${response}`)
        return {
            message: `User ${username} created successfully`
        }
    } catch (error) {
        const fetchError = error as { status?: number; statusText?: string; data?: never }
        
        const status = fetchError.status ? fetchError.status : 500;
        
        if (status > 399 && status < 500) {
            throw createError({
                statusCode: fetchError.status,
                statusMessage: 'Signup failed'
            })
        }

        logger.error(`Identity Service error during Signup for ${username} (ApplicationID ${application_id}) ${JSON.stringify({
            status: status,
            statusText: fetchError.statusText,
            endpoint: endpoint,
            timestamp: new Date().toISOString(),
            error: error
        }, null, 2)}`)

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during signup'
        })
    }
})