import { useEffect } from "react";

export default function useWebSocket() {

    useEffect(() => {
        var ws = new WS('ws://localhost:3001', 'foo', 'http://example.com');

        ws.onopen = () => {
            // ...GET INITIAL DATA...
            console.log('WebSocket Client connected')
        }

        ws.onmessage = (message: any) => {
            console.log(message)
        }
    }, [])


}