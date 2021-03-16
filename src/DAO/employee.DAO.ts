
import config from '../config/configEnv';
import { Employee } from '../models/employee';

let employee;

export default class EmployeeDAO {
    /**
     *  This method injects the connection 
     * @param conn 
     * @returns 
     */
    static async injectDB(conn) {
        if (employee) {
            return;
        }

        try {
            employee = await conn.db(config.db).collection("employee");
        } catch (e) {
            console.error(
                `Enable to establish a collection handle in employees ${e}`
            );
        }
    }

    /**
     * Methods
     */
    static async getEmployees() {
        try {
            const pipeline = [
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
            ];

            /**
             * Hacemos la búsqueda, tener en cuenta que obtenemos un Objeto cursor
             */
            const cursor = await employee.aggregate(pipeline);

            /**
             *  Convertimos esos elementos a un Array 
             */
            const resQuery = await cursor.toArray();

            if (resQuery.length > 0) {
                /**
                 * Devolvemos el resultado en caso de que la cantidad de elementos sea mayor a 0
                 */
                return resQuery
            } else {
                /**
                 *  Devolvemos alerta de que los elementos no existen 
                 */
                return [];
            }
        } catch (e) {
            console.log(e);
            return { error: e };
        }
    }

    static async getEmployee(id: string) {
        try {

            const pipeline = [
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
            ];

            /**
             * Realizamos la consulta, devuelve un elemento cursor
             */
            const resQuery = employee.aggregate(pipeline);

            /**
             * Convertimos el cursor a un array
             */
            const arrResultQuery = await resQuery.toArray();

            /***
             * Revisamos si hubo algun resultado
             */
            if (arrResultQuery) {
                return arrResultQuery
            } else {
                return [];
            }

        } catch (e) {
            /**
             * En caso de error devolvemos mensaje de alerta
             */
            console.error(e);
            return { error: e };
        }
    }

    static async newEmployee(newEmployee:Employee) {
        try {
            /**
             * Realizo el query
             */
            const resQuery = await employee.insertOne(newEmployee);

            return resQuery;

        } catch (e) {
            console.error(e);
            return { error: e };
        }
    }
    
    static async updateEmployee(id: string, dataEmployee: Employee) {
        try {

            /**
             * Update the data
             */
            const resQuery = await employee.updateOne(
                { _id: id },
                { $set: dataEmployee }
            );

            return resQuery;

        } catch (e) {
            console.error(e);
            return { error: e }
        }
    }


    static async deleteEmployee(id: string) {
        try {
            /**
                 * Delete element
                 */
            const resQuery = await employee.deleteOne({ _id: id });

            return resQuery;
            
        } catch (e) {
            console.error(e);
            return { error: e } 
        }

    }
}