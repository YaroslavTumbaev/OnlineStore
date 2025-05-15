import { $AuthHost, $host, } from "."

export interface IApiType {
    name: string
}

export const createType = async (type: IApiType) => {
    const { data } = await $AuthHost.post('api/type', type)
    return data
}

export const checkTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const createBrand = async (brand: IApiType) => {
    const { data } = await $AuthHost.post('api/brand', brand)
    return data
}

export const checkBrands = async () => {
    const { data } = await $host.get('api/brand')
    return data
}

export const createDevice = async (device: any) => {
    const { data } = await $AuthHost.post('api/device', device)
    return data
}

export const checkDevices = async () => {
    const { data } = await $host.get('api/device')
    return data
}

export const checkDevicesById = async (id: number) => {
    const { data } = await $host.get('api/device/' + id)
    return data
}

export const updateRating = async (id: number, rating: number) => {
    const { data } = await $host.put('api/device/rate/' + id, {"rating": rating})
    return data
}