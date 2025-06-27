import axios from "axios"
import instance from "./instance.service";
import { MessageRequest } from "@/models/Message.model";

export const sendMessageToHistory = async (queryMessageId: number | null, content: string) => {
  try {
    const body: MessageRequest = {
      content,
      type: 'user',
      ...(queryMessageId !== null && { history_id: queryMessageId }),
    };

    const { data } = await instance.post('/messages', body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.message}`);
    } else {
      throw new Error(`Unexpected Error: ${error}`);
    }
  }
};