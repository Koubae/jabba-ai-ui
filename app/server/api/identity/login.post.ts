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
    const endpoint = `${identityURL}/api/v1/auth/login`
    try {
        const response = await $fetch(endpoint, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        logger.info(`Identity Login succeeded for ${username} (ApplicationID ${application_id})`)
        return response
    } catch (error) {
        const fetchError = error as { status?: number; statusText?: string; data?: never }

        if (fetchError.status === 401) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            })
        }

        logger.error(`Identity Service error during Login ${username} (ApplicationID ${application_id}) ${JSON.stringify({
            status: fetchError.status,
            statusText: fetchError.statusText,
            endpoint: endpoint,
            timestamp: new Date().toISOString(),
            error: error
        }, null, 2)}`)

        // For other errors, throw a generic error
        throw createError({
            statusCode: fetchError.status || 500,
            statusMessage: fetchError.statusText || 'Authentication failed'
        })
    }

    
})

