/**
 * Main service of our chat app.
 * This service should encapsulate the logic of the chat only.
 * No auth, no transport (http, websocket ...).
 * Purely logic.
 */
export interface IChatService {

	/**
	 * Adds a new message to the chat
	 */
	addMessage(options: AddChatDTO): Promise<Chat>

	/**
	 * Get a list of messages from the chat
	 * @param options Fetching options
	 */
	getMessages(options: GetChatsDTO): Promise<Chat[]>

}

/**
 * EventBus
 */
export interface IEventBus {

	/**
	 * Send a new message through the message bus to be
	 * handled by some third party
	 */
	send(newMessage: NewChatMsg): Promise<void>

	/**
	 * Subscribe to incoming messages to be able to handle them
	 */
	subscribe(options: SubscriptionOptions, handler: ChatBusMsgHandler): Promise<Disposable>

}

/**
 * Representation a single message
 */
export type Chat = {
	id: string
	username: string
	message: string
	createdAt: Date
}

/**
 * Payload (or Data Transfer Object) for adding a new
 * message to the chat
 */
export type AddChatDTO = {
	username: string
	message: string
}

/**
 * DTO for fetching messages from  the service
 */
export type GetChatsDTO = {
	order?: 'desc' | 'asc'

	/**
	 * Number of messages to fetch
	 */
	take: number

	/**
	 * Number of messages to skip before selecting
	 */
	skip: number
}

/**
 * Object that can be disposed: useful to stop
 * event listeners that are not needed anymore
 */
export interface Disposable {
	dispose(): void
}

/**
 * Event message representing a new chat
 */
export type NewChatMsg = {
	payload: {
		chatId: string
	}

	date: Date
}

export type SubscriptionOptions = {}

export type ChatBusMsgHandler = (incomingMessage: NewChatMsg) => unknown
