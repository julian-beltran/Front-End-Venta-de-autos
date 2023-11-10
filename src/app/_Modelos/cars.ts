export interface Cars{
    Id :number;
    Marca:string; 
    Linea:string; 
    Modelo:number; 
    Carroseria:string; 
    Kilometraje:number; 
    Placa:string; 
    Precio:number;  
    Imagen1:string; 
    Imagen2:string; 
    Imagen3:string;
    descripcion:string;
    IdPersona:number;
}


export interface CarsRequest{
    Id?:number;
    Marca?:string; 
    Linea?:string; 
    Modelo?:number; 
    Carroseria?:string; 
    Kilometraje?:string; 
    Placa?:string; 
    Precio?:number;  
    Imagen1?:File; 
    Imagen2?:File; 
    Imagen3?:File;
    descripcion?:string;
    IdPersona?:number;
}

export interface Approval{
    aprovacion?: boolean;
}

export interface SaleState{
    estadoCompra?: boolean;
}

