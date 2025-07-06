import logger from '~/server/core/logger'
import {validateAuthToken} from "~/server/core/auth";

export default defineEventHandler(async (event) => {
    const accessToken = validateAuthToken(event)

    const identityURL = process.env.IDENTITY_URL || 'http://localhost:20000'
    const endpoint = `${identityURL}/api/v1/user`
    try {
        const response = await $fetch<GetUserResponse>(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })

        logger.info(`Identity Get User succeeded for ${response.username} (ApplicationID ${response.application_id}), response: ${response}`)
        return response
    } catch (error) {
        const fetchError = error as { status?: number; statusText?: string; data?: never }

        if (fetchError.status === 401) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            })
        }

        logger.error(`Identity Service error Get User ${JSON.stringify({
            status: fetchError.status,
            statusText: fetchError.statusText,
            endpoint: endpoint,
            timestamp: new Date().toISOString(),
            error: error
        }, null, 2)}`)

        // For other errors, throw a generic error
        throw createError({
            statusCode: fetchError.status || 500,
            statusMessage: fetchError.statusText || 'Get User Called failed'
        })
    }

})


interface GetUserResponse {
    id: number
    application_id: string
    username: string
    created: string
    updated: string
}
