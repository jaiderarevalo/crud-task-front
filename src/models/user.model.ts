export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    created_at: Date;
    updated_at: Date;
}
