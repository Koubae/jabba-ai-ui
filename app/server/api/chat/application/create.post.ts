import logger from '~/server/core/logger'
import {validateAuthToken} from "~/server/core/auth";
import type {Application} from "~/common/interfaces";

export default defineEventHandler(async (event) => {
    const accessToken = validateAuthToken(event)

    const body = await readBody(event)
    const { name, } = body

    const URL = process.env.CHAT_ORCHESTRATOR_URL || 'http://localhost:20001'
    const endpoint = `${URL}/api/v1/application/${name}`
    try {
        const response = await $fetch<Array<Application>>(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })

        logger.info(`Create Application ${name}, response: ${response}`)
        return response
    } catch (error) {
        const fetchError = error as { status?: number; statusText?: string; data?: never }

        logger.error(`List Applications error ${JSON.stringify({
            status: fetchError.status,
            statusText: fetchError.statusText,
            endpoint: endpoint,
            timestamp: new Date().toISOString(),
            error: error
        }, null, 2)}`)

        // For other errors, throw a generic error
        throw createError({
            statusCode: fetchError.status || 500,
            statusMessage: fetchError.statusText || `Unexpected error while Create Application ${name}`
        })
    }

})
