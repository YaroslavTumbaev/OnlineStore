import { $AuthHost, $host } from ".";

export const createMessage = async (deviceId: number, text: string, rate: number) => {
    const data = await $AuthHost.post('api/message', {deviceId, text, rate})
    return data
}

export const checkMessage = async (deviceId: number) => {
    const data = await $host.get('api/message?deviceId=' + deviceId)
    return data
}