export interface Message {
  id: string;
  history_id: number;
  type: "user" | "assistant";
  content: string;
  created_at: Date;
  has_chart?: boolean;
}
