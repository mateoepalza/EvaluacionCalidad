import employeeController from '../controllers/employee.controller';
import { Router } from 'express';
import db from '../util/database';


class Employee{

    router;

    constructor(){
        /**
         * Utilizamos Router para definir nuestras rutas modulares
         */
        this.router  = Router();
        this.config();
    }
    
    config(){
        /**
         * Obtengo todos los empleados
         */
        this.router.get('/', employeeController.getEmployees);
        /**
         * Obtengo empleado por Identificador
         */
        this.router.get('/:id', employeeController.getEmployee);
        /**
         * Guardo un empleado 
         */
        this.router.post('/', employeeController.newEmployee);
        /**
         * Actualizar un empleado
         */
        this.router.put('/:id', employeeController.updateEmployee);
        /**
         * Borrar un empleado
         */
        this.router.delete('/:id', employeeController.deleteEmployee);
    }

}

const employee = new Employee();
/**
 * Be aware that we are exporting the router 
 */
export default employee. router;