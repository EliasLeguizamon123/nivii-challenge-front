export interface Message {
  id: string;
  history_id?: number;
  type: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface MessageRequest {
  content: string;
  type: "user";
  history_id?: number;
}