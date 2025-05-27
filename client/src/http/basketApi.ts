import { $AuthHost} from '.'

export const addDeviceInBasket = async (deviceId: number ) => {
    const { data } = await $AuthHost.post('api/basket', {deviceId: deviceId})
    return data
}

export const checkBasket = async () => {
    const data = await $AuthHost.get('api/basket')
    return data
}

export const deleteDeviceOutBasket = async (deviceId: number ) => {
    const { data } = await $AuthHost.delete('api/basket/' + deviceId)
    return data
}