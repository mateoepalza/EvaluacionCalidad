export interface Employee{
    _id: string;
    nombre: string;
    id_area:{_id: string, nombre:string};
    cargo: string;
    proceso: string;
    email: string;
    telefono: string;
    imagePath: string;
    evaluacionCalidad?: [{
        idCalidad?: string
    },{
        idEquipo?: string
    }]
}