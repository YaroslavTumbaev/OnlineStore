import Admin from "./pages/Admin/Admin"
import Auth from "./pages/Auth/Auth"
import Basket from "./pages/Basket/Basket"
import Device from "./pages/DevicePage/DevicePage"
import Shop from "./pages/Shop/Shop"
import { paths } from "./utils/consts"
import { IRoute } from "./types/types"

export const authRoutes: IRoute[] = [
    {path: paths.ADMIN_PATH, component: Admin},
    {path: paths.BASKET_PATH, component: Basket},
]

export const publicRoutes = [
    {path: paths.LOGIN_PATH, component: Auth},
    {path: paths.REGISTRATION_PATH, component: Auth},
    {path: paths.SHOP_PATH, component: Shop},
    {path: `${paths.DEVICE_PATH}/:id`, component: Device},
]