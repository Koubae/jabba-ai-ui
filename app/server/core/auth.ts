import logger from '~/server/core/logger'
import type {EventHandlerRequest, H3Event} from "h3";

export function validateAuthToken(event:  H3Event<EventHandlerRequest>): string {
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.warning(`Attempt to access private endpoint without access token`)
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized - Missing Authorization header'
        })
    }

    return authHeader.substring(7) // Remove 'Bearer ' prefix
}
