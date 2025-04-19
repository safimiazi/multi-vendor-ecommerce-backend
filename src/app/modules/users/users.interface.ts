export interface Iusers {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'admin' | 'vendor' | 'customer';
    isDelete?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    
}