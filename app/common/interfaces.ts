export interface User {
    id: number
    application_id: string
    username: string
    created: string
    updated: string
}

export interface UserAuth {
    access_token: string
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


export interface Member {
    role: 'user' | 'assistant' | 'system'
    user_id: number
    username: string
    member_id: string
    channel: string
}

/*
<code>
{
    "chat_url": "ws://localhost:20002",
    "id": "686aaf020fa3f726f9af1e67",
    "application_id": "application_001",
    "name": "session_125",
    "created": "2025-07-06T17:14:45.123020897Z",
    "updated": "2025-07-06T17:14:45.123020942Z",
    "owner": {
        "role": "user",
        "user_id": 1,
        "username": "user_1",
        "member_id": "device-samsung",
        "channel": "mobile"
    }
}
</code>
*/
export interface SessionConnection {
    chat_url: string
    id: string
    application_id: string
    name: string
    created: string
    updated: string
    owner: Member
}

/*

{
  "application_id": "application_001",
  "session_id": "686a11693691c0acb731838b",
  "message": "}\"b838137bca0c19639611a686\":\"di_noisses\",\"Z193.03:73:71T60-70-5202\":\"pmatsemit\",\"dsksfdsdffds dsths tahw\":\"tnetnoc\"{",
  "timestamp": 1751823450,
  "role": "assistant",
  "user_id": 0,
  "username": "AI Assistant",
  "member_id": "bot",
  "channel": "server"
}

*/
export interface ChatMessage {
    role: 'user' | 'assistant' | 'system'
    application_id: string
    session_id: string
    message: string
    timestamp: string
    user_id: number
    username: string
    member_id: string
    channel: string
}

