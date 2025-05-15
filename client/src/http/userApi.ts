import { jwtDecode } from "jwt-decode"
import { $AuthHost, $host, } from "."

export const registration = async (email: string, password: string) => {
    const { data } = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    // useLocalStorage('token', data.token)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email: string, password: string) => {
    const { data } = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

interface DecodedUser {
    id: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }
  
  export const check = async (): Promise<DecodedUser> => {
    const { data } = await $AuthHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
  
    const decoded = jwtDecode<DecodedUser>(data.token);
    return decoded;
  };