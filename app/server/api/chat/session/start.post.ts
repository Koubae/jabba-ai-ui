import logger from '~/server/core/logger'
import {validateAuthToken} from "~/server/core/auth";
import type {SessionConnection} from "~/common/interfaces";

export default defineEventHandler(async (event) => {
    const accessToken = validateAuthToken(event)

    const body = await readBody(event)
    const { session_name, member_id, channel } = body
    if (!session_name || !member_id || !channel) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields: session_name, member_id, channel'
        })
    }

    const URL = process.env.CHAT_ORCHESTRATOR_URL || 'http://localhost:20001'
    const endpoint = `${URL}/api/v1/session/connect/start`
    try {
        const response = await $fetch<Array<SessionConnection>>(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body
        })

        logger.info(`Started Session ${session_name}, response: ${response}`)
        return response
    } catch (error) {
        const fetchError = error as { status?: number; statusText?: string; data?: never }

        logger.error(`Start Session error ${JSON.stringify({
            status: fetchError.status,
            statusText: fetchError.statusText,
            endpoint: endpoint,
            timestamp: new Date().toISOString(),
            body: body,
            error: error
        }, null, 2)}`)

        // For other errors, throw a generic error
        throw createError({
            statusCode: fetchError.status || 500,
            statusMessage: fetchError.statusText || `Unexpected error while Start Session ${body}`
        })
    }

})
