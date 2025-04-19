export interface Iusers {
    _id?: string;
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