export interface User{
    _id ?: string;
    nombre ?: string;
    rol ?: string;
    email : string;
    hash : string;
    salt : string;
    telefono ?: string;
}