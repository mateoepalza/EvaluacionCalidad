export interface Employee{
    nombre: string;
    area: string;
    evaluacionCalidad?: [{
        idCalidad?: string
    },{
        idEquipo?: string
    }]
}