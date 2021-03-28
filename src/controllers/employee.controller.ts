import { Request, Response } from 'express';
import { Employee } from '../models/employee';
import EmployeeDAO from '../DAO/employee.DAO';

class EmployeeController {

    constructor() {
    }

    async getEmployees(req: Request, res: Response) {

        try {
            const resEmployees = await EmployeeDAO.getEmployees();

            let { error } = resEmployees;

            if (error) {
                res.status(400).json(error)
            }

            res.json({ data: resEmployees });

        } catch (e) {
            console.error(e);
            res.status(500).json(e);
        }

    }

    async getEmployee(req: Request, res: Response) {

        try {
            /**
             * Obtenemos el parámetro de URL
             */
            const { id } = req.params;

            const resEmployee = await EmployeeDAO.getEmployee(id);

            let { error } = resEmployee;

            if (error) {
                res.status(400).json(error);
            }

            res.json({ data: resEmployee });

        } catch (e) {
            console.error(e);
            res.status(400).json(e);
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
                id_area: area._id,
                cargo: cargo,
                proceso: proceso,
                email: email,
                telefono: telefono,
                imagePath: imagePath
            };

            const resEmployee = await EmployeeDAO.newEmployee(employee);

            let { error } = resEmployee;

            if (error) {
                res.status(400).json(error)
            }

            res.json({
                message: "El empleado ha sido creado satisfactoriamente"
            });

        } catch (e) {
            console.error(e);
            res.status(400).json(e);
        }
    }

    async updateEmployee(req: Request, res: Response) {

        try {

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

            const resEmployee = await EmployeeDAO.updateEmployee(id, employee);

            /**
             * Receive id from the URL
             */
            if (resEmployee.modifiedCount === 0) {
                new Error(
                    "La información del empleado no ha sido actualizada"
                )
            }

            res.json({
                message: "El empleado ha sido actualizado correctamente"
            });

        } catch (e) {
            res.status(500).json(e)
        }





    }

    async deleteEmployee(req: Request, res: Response) {
        try {
            /**
             * Receive id from the URL
             */
            const { id } = req.params;

            const resEmployee = await EmployeeDAO.deleteEmployee(id); 

            let { error } = resEmployee;
            if(error){
                res.status(400).json(error);
            }

            res.json({
                message: "El empleado ha sido eliminado correctamente"
            })

        } catch (e) {
            console.log(e);
            res.status(400).json(e);
        }
    }
}

const employeeController = new EmployeeController();
export default employeeController;