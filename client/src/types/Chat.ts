export enum MessageRole {
  Client = 1,
  Server = 2,
}

export interface MessageData {
  content: string;
}

export interface Message {
  role: MessageRole;
  data: MessageData;
  createdAt: number;
}
