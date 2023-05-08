export interface ResolvedData {
    message: string
}

export interface RequestData {
    firstName: string
    lastName: string
}

export interface TokenData {
    userId: number
    userLogin: string
}

export interface UserData {
    id: number
    login: string
}

export interface UserTable {
    login: string
    password: string
    firstName: string
    lastName: string
}