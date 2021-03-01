import { Request, Response } from 'express';
import db from '../util/database';
import { Employee } from '../models/employee' ;
import { ObjectID } from 'mongodb';

class EmployeeController {

    constructor() {
    }

    async getEmployees(req: Request, res: Response) {
        
        try {
            /**
             * Hacemos la búsqueda, tener en cuenta que obtenemos un Objeto cursor
             */
            const cursor = await db.db("evaluacion_calidad").collection("employee")
                .find()
                .limit(10);

            /**
             *  Convertimos esos elementos a un Array 
             */

            const resQuery = await cursor.toArray();

            if(resQuery.length > 0){
                /**
                 * Devolvemos el resultado en caso de que la cantidad de elementos sea mayor a 0
                 */
                res.status(200).json({data: resQuery});
            }else{
                /**
                 *  Devolvemos alerta de que los elementos no existen 
                 */
                res.status(401).json({message: "No existen empleados registrados"});
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({message: "Ocurrió algo inesperado"});
        }
    }

    async getEmployee(req: Request, res: Response) {

        try{
            /**
             * Obtenemos el parámetro de URL
             */
            const { id } = req.params;

            /**
             * Realizamos la consulta, devuelve un elemento cursor
             */
            const resQuery = await db.db("evaluacion_calidad").collection("employee").findOne({_id: ObjectID(id)});
            
            /**
             * Revisamos si hubo algun resultado
             */
            if(resQuery){
                /**
                 * Devolvemos el resultado
                 */
                res.status(200).json({
                    data: resQuery
                });
            }else{
                /**
                 * Devolvemos un mensaje de alerta
                 */
                res.status(400).json({
                    message: "No se encontró ningun resultado"
                })
            }

        }catch(error){
            /**
             * En caso de error devolvemos mensaje de alerta
             */
            res.status(400).json({
                message: "Ocurrió algo inesperado"
            });
        }

    }

    async newEmployee(req: Request, res: Response) {
       try{
           /**
            * Obtengo la informacion pasada por POST
            */
           const { nombre, area } = req.body;
           /**
            * Creo el objeto que deseo guardar
            */
           const employee: Employee = {
               nombre: nombre,
               area: area
           };

           /**
            * Realizo el query
            */
           const resQuery = await db.db("evaluacion_calidad").collection("employee").insertOne(employee);

           console.log(resQuery.insertedId);

           /**
            * Respondemos 
            */
           res.status(200).json({
                message: "Empleado almacenado correctamente"
           });

       }catch(e){
            console.error(e);
            /**
             * Respondemos error
             */
            res.status(400).json({
                message: "Ocurrió algo inesperado"
            })
       } 
    }

    async updateEmployee(req: Request, res: Response) {
        try{
            /**
             * Receive id from the URL
             */
            const { id } = req.params;
            
            /**
             * Receive body data
             */
            const { nombre, area } = req.body;

            const employee: Employee = {
                nombre: nombre,
                area: area
            }

            console.log(employee);

            /**
             * Update the data
             */
            const resQuery = await db.db("evaluacion_calidad").collection("employee").updateOne({_id: ObjectID(id)}, { $set: employee});

            if(resQuery.modifiedCount > 0){
                res.status(200).json({
                    message: "Los datos fueron actualizados correctamente"
                })
            }else{
                res.status(200).json({
                    message: "Ocurrió algo inesperado"
                });
            }

        }catch(error){
            res.status(400).json({
                message: "Ocurrió algo inesperado"
            });
        }
    }

    async deleteEmployee(req: Request, res: Response) {
        try {
            /**
             * Receive id from the URL
             */
            const { id } = req.params;

            /**
             * Delete element
             */
            const resQuery = await db.db("evaluacion_calidad").collection("employee").deleteOne({_id : ObjectID(id)});

            if(resQuery.deletedCount > 0){
                res.status(200).json({
                    message: "El elemento ha sido eliminado correctamente"
                })
            }else{
                res.status(400).json({
                    message: "No fue posible eliminar el usuario"
                })
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const employeeController = new EmployeeController();
export default employeeController;