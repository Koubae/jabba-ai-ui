import logger from '~/server/core/logger'
import type {EventHandlerRequest, H3Event} from "h3";

export function validateAuthToken(event:  H3Event<EventHandlerRequest>): string {
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.warn(`Attempt to access private endpoint without access token`)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized - Missing Authorization header'
        })
    }

    const accessToken = authHeader.substring(7) // Remove 'Bearer ' prefix
    if (!accessToken) {
        logger.warn(`AccessToken not found or empty, headers: ${authHeader}`)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized - AccessToken not found or empty'
        })
    } else if (accessToken == "null") {
        logger.warn(`AccessToken has wrong format, headers: ${authHeader}`)
        throw createError({
            statusCode: 401,
            statusMessage: 'AccessToken has wrong format'
        })
    }
    return accessToken
}
