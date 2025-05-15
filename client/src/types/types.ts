import { JSX } from "react";
import { paths } from "../utils/consts";

export interface IRoute {
    component: () => JSX.Element,
    path: paths
}

export interface IHuman {
    email: string
    exp: number
    iat: number
    id: number
    role: string
}


export interface IUser {
    _isAuth: boolean,
    _user: IHuman | undefined
}

export type ModalType = 'device' | 'brand' | 'type'

export interface IInfo {
    title: string
    description: string
}

export interface IDevice {
    brandId: number | undefined
    typeId: number | undefined
    name: string
    price: number | null
    img: string
}

export interface IType {
    id: number,
    name: string
}