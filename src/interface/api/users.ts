
export interface UsersResponse {
    id: number
    name: string
    email: string
    age: string
    city: string
}

export interface UserForm {
    name: string
    email: string
    age: number
    city: string
    id?: number
}

export interface StoreUserSchema {
    name: string
    email: string
    age: string
    city: string
}