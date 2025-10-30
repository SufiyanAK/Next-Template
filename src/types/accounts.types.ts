export interface User {
    id: number;
    email: string;
}

export interface Account {
    id: number;
    provider: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}
