import winston from 'winston'

const customFormat = winston.format.printf(({ level, message, timestamp, status, url, error }) => {
    let logMessage = `[${timestamp}] - ${level.toUpperCase()} - ${message}`

    // Add specific details we care about
    if (status) {
        logMessage += ` | Status: ${status}`
    }

    if (url) {
        logMessage += ` | URL: ${url}`
    }

    // Only add error name if it's meaningful
    if (error && error.name && error.name !== 'FetchError') {
        logMessage += ` | Error: ${error.name}`
    }

    return logMessage
})


const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS'
        }),
        winston.format.errors({stack: true}),
        // winston.format.json(),
        customFormat,

    ),
    transports: [
        new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
        new winston.transports.File({filename: 'logs/combined.log'}),
        ...(process.env.NODE_ENV !== 'production' ? [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.errors({ stack: true }),
                    winston.format.timestamp({
                                                 format: 'YYYY-MM-DD HH:mm:ss.SSS'
                                             }),
                    winston.format.colorize({ all: true }),

                )
            })
        ] : [])
    ]
})


export default logger