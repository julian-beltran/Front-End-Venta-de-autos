export interface Register{
    id?:number;
    nombre?:string;
    apellido?:string;
    telefono?:string;
    ocupacion?:string;
    sexo?:string;
    direccion?:string;
    edad?: number;
    usuario1?: string;
    contraseña?:string;
    email?:string;
    rol?:string;
    imagen?:File;

}


export interface User{
    id?:number;
    nombre?:string;
    apellido?:string;
    telefono?:string;
    ocupacion?:string;
    sexo?:string;
    direccion?:string;
    edad?: number;
    usuario1?: string;
    contraseña?:string;
    email?:string;
    rol?:string;
    imagen?:string;

}