export interface PeliculaCreacionDTO{
    titulo:string;
    resumen:string;
    enCines:boolean;
    trailer:string;
    fechaLanzamiento:Date;
    poster:File;
}

export interface PeliculaDTO{
    titulo:string;
    resumen:string;
    enCines:boolean;
    trailer:string;
    fechaLanzamiento:Date;
    poster:string;
}