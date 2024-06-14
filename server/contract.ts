/**
 * Main service of our chat app.
 * This service should encapsulate the logic of the chat only.
 * No auth, no transport (http, websocket ...).
 * Purely logic.
 */

//@
//@ Chat Service Interface
//@
export interface IChatService {
	//* Add a new message to the chat
	addMessage(options: AddChatDTO): Promise<Chat>

	//* Get all messages of a chat with
	getMessages(options: GetChatsDTO): Promise<Chat[]>

	//* Get a chat by its ID
	getByID(options: GetChatByIdDTO): Promise<Chat | undefined>
}

//@
//@ Event Bus Interface
//@
export interface IEventBus {
	//* Send a new message through the message bus to be
	//* handled by some third party
	notify(newMessage: EvntBusAction): Promise<void>

	//*Subscribe to incoming messages to be able to handle them
	subscribe(options: SubscriptionOptions, handler: ChatBusMsgHandler): Promise<Disposable>
}

//>
//> Exports
//>

//>
//> Room Type
export type Room = {
  ID: string
  name: string
}

//>
//> Chat Type
export type Chat = {
	ID: string
	username: string
	message: string
	roomName: string
	createdAt: Date
}

//>
//> DTOs
//>

//>
//> Add Chat DTO
export type AddChatDTO = {
	username: string
	message: string
	roomName: string
}

//>
//> Get Chats DTO
export type GetChatsDTO = {
	//* Order of the messages
	order?: 'desc' | 'asc'

	//* Number of messages to take
	take: number

	//* Number of messages to skip
	skip: number

}

//>
//> Get Chat By ID DTO
export type GetChatByIdDTO = {
	ID: string;
}

//>
//> Interfaces
//>

//>
//> Disposable
export interface Disposable {
	//* Dispose the user
	dispose(): void
}
export type ChatBusMsgHandler = (incomingMessage: EvntBusAction) => unknown


//>
//> Event Bus Actions
//>

//>
//> New Chat Message
export type NewChatMsg = {
	type: 'newChat',
	payload: {
		chatID: string
		roomName: string
	}
	date: Date
}

//>
//> User Connected Notification
export type UserConnectedMsg = {
	type: 'userConnected'
	payload: {
		username: string
	}
}

//>
//> User Connected Notification
export type UserJoinRoomNotification = {
	type: 'userJoinedRoom'
	payload: {
		roomName: string
		username: string
	}
}

//>
//> User Disconnected Notification
export type UserDisconnectedMsg = {
	type: 'userDisconnected'
	payload: {
		username: string
	}
}

//>
//> Event Bus Actions Union
export type EvntBusAction =
			NewChatMsg
			|
			UserJoinRoomNotification
			|
			UserConnectedMsg
			|
			UserDisconnectedMsg

export type SubscriptionOptions = {}