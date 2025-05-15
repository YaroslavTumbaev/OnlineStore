import { createContext, FC, useState } from 'react'
import { IUser } from '../types/types'
import { ReactElement } from 'react';
import { IType } from '../types/types';

interface UserContextProviderProps {
  children: ReactElement;
}
// {id: 1, name: 'Iphone 16 pro', price: 800, rating: 5, img: 'https://s3p.kattabozor.uz/ri/f2e5dc48fb5442b3ad69f854d874780e573082d0bd3d061b62650cd1af03fc9c_WZqjAE_640l.jpg'},


interface UserContextType {
    user: IUser
    setUser: React.Dispatch<React.SetStateAction<IUser>>
    types: IType[]
    setTypes: React.Dispatch<React.SetStateAction<IType[]>>
    brands: IType[]
    setBrands: React.Dispatch<React.SetStateAction<IType[]>>
    devices: IDevice[],
    setDevices: React.Dispatch<React.SetStateAction<IDevice[]>>
    setBasket: React.Dispatch<React.SetStateAction<IBasketDevice[] | undefined>>
    basket: IBasketDevice[] | undefined
}

interface IDevice {
    id: number
    name: string
    price: number | null
    rating: number
    img: string
    brandId: number | undefined
    typeId: number | undefined
}

interface IBasketDevice {
    basketId: number
    createdAt: string
    device: IDevice
    deviceId: number
    id: number
    updatedAt: string
}


export const UserContext = createContext<UserContextType | undefined>(undefined)

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {

const [user, setUser] = useState<IUser>({
    _isAuth: false,
    _user: undefined
})


const [types, setTypes] = useState<IType[]>([])
const [brands, setBrands] = useState<IType[]>([])
const [devices, setDevices] = useState<IDevice[]>([])
const [basket, setBasket] = useState<IBasketDevice[] | undefined>(undefined)

return (<UserContext.Provider value={{user, setUser, types, setTypes, brands, setBrands, devices, setDevices, basket, setBasket}}>{ children }</UserContext.Provider>)
}

export default UserContextProvider