import logger from '~/server/core/logger'


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const externalAuthURL = 'http://localhost:20000/api/v1/auth/login'
    
    try {
        const response = await $fetch(externalAuthURL, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        logger.info(`Identity Login succeeded for ${body.username} (ApplicationID ${body.application_id})`)
        return response
    } catch (error) {
        const fetchError = error as { status?: number; statusText?: string; data?: never }

        if (fetchError.status === 401) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            })
        }

        logger.error(`Identity Service error during Login ${JSON.stringify({
            status: fetchError.status,
            statusText: fetchError.statusText,
            url: externalAuthURL,
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

