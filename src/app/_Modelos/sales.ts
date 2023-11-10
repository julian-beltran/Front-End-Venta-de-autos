export interface SalesFormat{
    name?:string;
    value?:string;
    usuario?:string;
    nombreTitular?:string;
    apellidoTitular?:string;
    correoPaypal?:string;
    
}


export interface SalesPost{
    idCliente?:number;
    idVehiculo?:number;
    idPago?:number;
    nombreTitular?:string;
    apellidoTitular?:string;
    correoPaypal?:string;
}