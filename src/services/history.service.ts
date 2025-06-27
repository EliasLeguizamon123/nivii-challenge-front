import axios from "axios";
import instance from "./instance.service";

export const getHistory = async () => {
    try {
        const { data } = await instance.get('/history')
        
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`API Error: ${error.message}`);
        } else {
            throw new Error(`Unexpected Error: ${error}`);
        }
    }
}

export const getQueryHistoryById = async (id: number) => {
    try {
        const { data } = await instance.get(`/history/${id}`)

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`API Error: ${error.message}`);
        } else {
            throw new Error(`Unexpected Error: ${error}`);
        }
    }
}