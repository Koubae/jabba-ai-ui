
import type { SessionConnection, ChatMessage } from "~/common/interfaces";
import {getAuthToken} from "~/common/auth";

export class WebSocketChat {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;
    private isConnecting = false;

    constructor(
        private sessionConnection: SessionConnection,
        private onMessage: (message: ChatMessage) => void,
        private onConnectionChange: (connected: boolean) => void,
        private onError: (error: string) => void
    ) {}

    connect(): void {
        if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
            return;
        }

        this.isConnecting = true;
        const sessionID = this.sessionConnection.id;
        const memberID = this.sessionConnection.owner.member_id;
        const channel = this.sessionConnection.owner.channel;
        const accessToken = getAuthToken();
        const endpoint = `${this.sessionConnection.chat_url}/api/v1/chat/ws/bot/create-connection/${sessionID}?member_id=${memberID}&channel=${channel}&access_token=${accessToken}`
        console.debug(`WebSocket endpoint: ${sessionID}?member_id=${memberID}&channel=${channel}`)
        try {
            this.ws = new WebSocket(endpoint);

            this.ws.onopen = () => {
                this.isConnecting = false;
                this.reconnectAttempts = 0;
                this.onConnectionChange(true);
            };

            this.ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data) as ChatMessage;
                    this.onMessage(message);
                } catch (error) {
                    console.error('Failed to parse WebSocket message:', error);
                    this.onError('Failed to parse message');
                }
            };

            this.ws.onclose = (event) => {
                this.isConnecting = false;
                this.onConnectionChange(false);

                if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.scheduleReconnect();
                }
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.isConnecting = false;
                this.onError('WebSocket connection error');
            };

        } catch (error) {
            this.isConnecting = false;
            this.onError(`Failed to create WebSocket connection ${error}`);
        }
    }

    private scheduleReconnect(): void {
        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

        setTimeout(() => {
            console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
            this.connect();
        }, delay);
    }

    sendMessage(content: string): void {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.onError('WebSocket is not connected');
            return;
        }
        this.ws.send(content);
    }

    disconnect(): void {
        if (this.ws) {
            this.ws.close(1000, 'User disconnected');
            this.ws = null;
        }
    }

    isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }
}

export const useWebSocketChat = (sessionConnection: SessionConnection) => {
    const messages = ref<ChatMessage[]>([]);
    const isConnected = ref(false);
    const connectionError = ref<string | null>(null);

    let chatInstance: WebSocketChat | null = null;

    const addMessage = (message: ChatMessage) => {
        messages.value.push(message);
    };

    const setConnectionStatus = (connected: boolean) => {
        isConnected.value = connected;
    };

    const setError = (error: string) => {
        connectionError.value = error;
    };

    const connect = () => {
        if (!chatInstance) {
            chatInstance = new WebSocketChat(
                sessionConnection,
                addMessage,
                setConnectionStatus,
                setError
            );
        }
        chatInstance.connect();
    };

    const sendMessage = (content: string) => {
        if (!chatInstance) return;
        chatInstance.sendMessage(content);
    };

    const disconnect = () => {
        if (chatInstance) {
            chatInstance.disconnect();
            chatInstance = null;
        }
    };

    // Cleanup on component unmount
    onUnmounted(() => {
        disconnect();
    });

    return {
        messages: readonly(messages),
        isConnected: readonly(isConnected),
        connectionError: readonly(connectionError),
        connect,
        sendMessage,
        disconnect
    };
};