export interface User {
    id: number
    application_id: string
    username: string
    created: string
    updated: string
}


export interface Application {
    id: string
    name: string
    created: string
    updated: string
}

export interface Session {
    id: string
    application_id: string
    user_id: string
    name: string
    created: string
    updated: string
}

export interface SessionConnection {
    chat_url: string
    id: string
    application_id: string
    user_id: string
    name: string
    created: string
    updated: string
}

