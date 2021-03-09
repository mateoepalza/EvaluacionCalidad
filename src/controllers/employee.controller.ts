import { Request, Response } from 'express';
import db from '../util/database';
import { Employee } from '../models/employee';

class EmployeeController {

    constructor() {
    }

    async getEmployees(req: Request, res: Response) {

        try {
            /**
             * Hacemos la búsqueda, tener en cuenta que obtenemos un Objeto cursor
             */
            const cursor = await db.db("evaluacion_calidad").collection("employee")
                .aggregate([
                    /**
                     * This is a inner join
                     */
                    {
                        $lookup: {
                            from: "areas",
                            localField: "id_area",
                            foreignField: "_id",
                            as: "area"
                        },
                    }, {
                        /**
                         * This tells mongodb to delete the [] element
                         */
                        $unwind: {
                            "path": "$area",
                            "preserveNullAndEmptyArrays": false
                        }
                    }
                ]);

            /**
             *  Convertimos esos elementos a un Array 
             */

            const resQuery = await cursor.toArray();
            
            if (resQuery.length > 0) {
                /**
                 * Devolvemos el resultado en caso de que la cantidad de elementos sea mayor a 0
                 */
                res.status(200).json({ data: resQuery });
            } else {
                /**
                 *  Devolvemos alerta de que los elementos no existen 
                 */
                res.status(400).json({ message: "No existen empleados registrados" });
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Ocurrió algo inesperado" });
        }
    }

    async getEmployee(req: Request, res: Response) {

        try {
            /**
             * Obtenemos el parámetro de URL
             */
            const { id } = req.params;

            /**
             * Realizamos la consulta, devuelve un elemento cursor
             */
            const resQuery = await db.db("evaluacion_calidad").collection("employee").aggregate([
                {
                    $match: {
                        _id: id
                    }
                },
                {
                    $lookup: {
                        from: "areas",
                        localField: "id_area",
                        foreignField: "_id",
                        as: "area"
                    }
                },
                {
                    $unwind: {
                        "path": "$area",
                        "preserveNullAndEmptyArrays": false
                    }
                },
                {
                    $project: {
                        id_area: 0
                    }
                }
            ]);

            /**
             * Convertimos el cursor a un array
             */
            const arrResultQuery = await resQuery.toArray();

            /***
             * Revisamos si hubo algun resultado
             */
            if (arrResultQuery) {
                /**
                 * Devolvemos el resultado
                 */
                res.status(200).json({
                    data: arrResultQuery
                });
            } else {
                /**
                 * Devolvemos un mensaje de alerta
                 */
                res.status(400).json({
                    message: "No se encontró ningun resultado"
                })
            }

        } catch (error) {
            /**
             * En caso de error devolvemos mensaje de alerta
             */
            console.error(error);
            res.status(400).json({
                message: "Ocurrió algo inesperado"
            });
        }

    }

    async newEmployee(req: Request, res: Response) {
        try {
            /**
             * Obtengo la informacion pasada por POST
             */
            const { _id, nombre, area, cargo, proceso, email, telefono, imagePath } = req.body;
            /**
             * Creo el objeto que deseo guardar
             */
            const employee: Employee = {
                _id: _id,
                nombre: nombre,
                id_area: area,
                cargo: cargo,
                proceso: proceso,
                email: email,
                telefono: telefono,
                imagePath: imagePath
            };

            /**
             * Realizo el query
             */
            const resQuery = await db.db("evaluacion_calidad").collection("employee").insertOne(employee);

            /**
             * Respondemos 
             */
            res.status(200).json({
                message: "Empleado almacenado correctamente"
            });

        } catch (e) {
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
        try {
            /**
             * Receive id from the URL
             */
            const { id } = req.params;

            /**
             * Receive body data
             */
            const { nombre, area, cargo, proceso, email, telefono, imagePath } = req.body;

            const employee: Employee = {
                _id: id,
                nombre: nombre,
                id_area: area,
                cargo: cargo,
                proceso: proceso,
                email: email,
                telefono: telefono,
                imagePath: imagePath
            }

            /**
             * Update the data
             */
            const resQuery = await db.db("evaluacion_calidad").collection("employee").updateOne({ _id: id }, { $set: employee });

            if (resQuery.modifiedCount > 0) {
                res.status(200).json({
                    message: "Los datos fueron actualizados correctamente"
                })
            } else {
                res.status(200).json({
                    message: "Ocurrió algo inesperado"
                });
            }

        } catch (error) {
            console.error(error);
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
            const resQuery = await db.db("evaluacion_calidad").collection("employee").deleteOne({ _id: id });

            if (resQuery.deletedCount > 0) {
                res.status(200).json({
                    message: "El elemento ha sido eliminado correctamente"
                })
            } else {
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