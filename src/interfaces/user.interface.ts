
export interface register {
    name: string,
    email: string,
    password: string
    confirmPassword: string
}
export interface login {
    email: string,
    password: string
}

export interface TasksUser{
    id:string
    task:string,
    description:string,
    status:boolean | number
}