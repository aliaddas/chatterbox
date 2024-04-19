export interface IChatClient {
  addMessage(): Promise<boolean>;

  getMessages(): Promise<ChatMessage[]>;
}

type ChatMessage = {
  username: string;
  message: string;
};
