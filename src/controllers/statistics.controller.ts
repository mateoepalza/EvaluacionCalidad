import { Response, Request } from "express";
import StatisticsDAO from "../DAO/statistics.DAO";
import { Statistics } from "../models/statistics";
import statistics from "../routes/statistics";

class StatisticsController {
    constructor() { }

    async getStatisticByArea(req: Request, res: Response) {
        try {
            const result = await StatisticsDAO.getStatisticByArea();

            const { error } = result;
            if (error) {
                res.status(400).json(error);
            }
            /**
             * Object that all the elements have
             */
            const obj = {
                "tituloGrafica": "",
                "leyend": ['Total de empleados']
            }
            
            let finalResult = [];
            for(let res of result){
                finalResult.push({...res, ...obj})
            }
            
            //console.log(finalResult);
            res.json({
                data: finalResult
            })

        } catch (e) {
            console.error(e);
            res.status(400).json(e);
        }
    }

    async getStatistics(req: Request, res: Response) {
        try {
            const result = await StatisticsDAO.getStatistics();

            const { error } = result;
            if (error) {
                res.status(400).json(error);
            }

            res.json(result);

        } catch (e) {
            console.error(e);
            res.status(400).status(e);
        }
    }

    async getSingleStatisticByArea(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await StatisticsDAO.getSingleStatisticByArea(id);

            const { error } = result;
            if (error) {
                res.status(400).json(error);
            }

            res.json(result);

        } catch (e) {
            console.error(e);
            res.status(400).json(e);
        }
    }
    
    async getStatisticByEmployee(req: Request, res: Response){
        try{
            const { id } = req.params;
            
            const result = await StatisticsDAO.getLastStatisticByUser(id);
            
            const { error } = result;
            if(error){
                res.status(400).json(error);
            }
            
            res.json({
                data: result
            });

        }catch(e){
            console.error(e);
            res.status(400).json(e);
        }
    }

    async createStatistic(req: Request, res: Response) {
        try {
            /**
             * Get the param form the url
             */
            const { id } = req.params;
            /**
             * Get the body of the request
             */
            const { Conocimiento, SaberEstar, SaberHacer } = req.body;

            console.log(Conocimiento);
            /**
             * Create the object
             */
            const stats: Statistics = {
                employee_id: id,
                date: new Date(),
                conocimiento: Conocimiento,
                saberEstar: SaberEstar,
                saberHacer: SaberHacer
            }

            const response = await StatisticsDAO.createStatistic(stats);

            const { error } = response;

            if (error) {
                res.status(400).json(error);
            }

            res.json({
                message: "La evaluacion de calidad se ha guardado correctamente"
            });

        } catch (e) {
            res.status(400).json(e);
        }
    }

    async deleteStatistic(req: Request, res: Response) {
        try {
            /**
             * This takes URL parameter /1026299996/
             */
            const { id } = req.params;
            /**
             * this takes a query parameter ?tag=5
             */
            const { statistic_id } = req.query;
            const response = await StatisticsDAO.deleteStatistic(statistic_id, id);

            const { error } = response;
            if (error) {
                res.status(400).json(error);
            }
            if (response.result.n == 0) {
                throw Error("No ha sido posible eliminar la estadistica");
            }

            res.json({
                message: "La evaluación de calidad ha sido eliminada correctamente"
            })
        } catch (e) {
            console.error(e);
            res.status(500).json(e);
        }
    }

    async updateStatistic(req: Request, res: Response) {
        try {
            /**
             * Get the param form the url
             */
            const { id } = req.params;
            /**
             * Get the query params
             */
            const { statistic_id } = req.query;
            /**
             * Get the body of the request
             */
            const {
                practico,
                teorico,
                calidad,
                productividad,
                puntualidad,
                orientacion,
                adaptabilidad,
                calidadTrabajo,
                autocontrol,
                compromiso,
                confianza,
                constancia,
                cooperacion,
                disciplina,
                honestidad,
                relaciones,
                responsabilidad,
                tolerancia
            } = req.body;

            /**
             * Create the object
             */
            const stats: Statistics = {
                employee_id: id,
                date: new Date(),
                conocimiento: [
                    { practico: practico },
                    { teorico: teorico }
                ],
                saberHacer: [
                    { calidad: calidad },
                    { productividad: productividad },
                    { puntualidad: puntualidad },
                    { orientacion: orientacion },
                ],
                saberEstar: [
                    { adaptabilidad: adaptabilidad },
                    { calidadTrabajo: calidadTrabajo },
                    { autocontrol: autocontrol },
                    { compromiso: compromiso },
                    { confianza: confianza },
                    { constancia: constancia },
                    { cooperacion: cooperacion },
                    { disciplina: disciplina },
                    { honestidad: honestidad },
                    { relaciones: relaciones },
                    { responsabilidad: responsabilidad },
                    { tolerancia: tolerancia },
                ]
            }
            console.log(stats);
            const response = await StatisticsDAO.updateStatistic(statistic_id, id, stats);

            const { error } = response;

            if (error) {
                res.status(400).json(error);
            }

            res.json({
                message: "La evaluacion de calidad se ha guardado correctamente"
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }

}

const objSC = new StatisticsController();
export default objSC;