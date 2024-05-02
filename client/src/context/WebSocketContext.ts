import { createContext } from "react";

type WebSocketContextType = {
  webSocket: WebSocket | null;
  setWebSocket: (ws: WebSocket | null) => void;
  send: (data: string) => void;
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
  onOpen: (callback: () => void) => void;
  onError: (callback: (event: Event) => void) => void;
  onClose: (callback: (event: CloseEvent) => void) => void;
};

const WebSocketContext = createContext<WebSocketContextType>({} as any);

export default WebSocketContext;