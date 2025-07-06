import logger from '~/server/core/logger'
import {validateAuthToken} from "~/server/core/auth";
import type {Session} from "~/common/interfaces";

export default defineEventHandler(async (event) => {
    const accessToken = validateAuthToken(event)

    const URL = process.env.CHAT_ORCHESTRATOR_URL || 'http://localhost:20001'
    const endpoint = `${URL}/api/v1/session/list`
    try {
        const response = await $fetch<Array<Session>>(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })

        logger.info(`List Sessions, response: ${response}`)
        return response
    } catch (error) {
        const fetchError = error as { status?: number; statusText?: string; data?: never }

        if (fetchError.status === 400) {
            logger.warn(`List Sessions not found, error: ${error}`)
            return []
        }

        logger.error(`List Sessions error ${JSON.stringify({
            status: fetchError.status,
            statusText: fetchError.statusText,
            endpoint: endpoint,
            timestamp: new Date().toISOString(),
            error: error
        }, null, 2)}`)

        // For other errors, throw a generic error
        throw createError({
            statusCode: fetchError.status || 500,
            statusMessage: fetchError.statusText || 'Unexpected error while getting Sessions'
        })
    }

})
