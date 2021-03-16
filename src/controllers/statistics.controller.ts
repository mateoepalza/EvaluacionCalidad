import { Response, Request } from "express";
import StatisticsDAO from "../DAO/statistics.DAO";
import { Statistics } from "../models/statistics";

class StatisticsController {
    constructor() { }

    async getStatistics(req: Request, res: Response) {

    }

    async getStatistic(req: Request, res: Response) {

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
                conocimiento: {
                    practico: practico,
                    teorico: teorico
                },
                saberHacer: {
                    calidad: calidad,
                    productividad: productividad,
                    puntualidad: puntualidad,
                    orientacion: orientacion,
                },
                saberEstar: {
                    adaptabilidad: adaptabilidad,
                    calidadTrabajo: calidadTrabajo,
                    autocontrol: autocontrol,
                    compromiso: compromiso,
                    confianza: confianza,
                    constancia: constancia,
                    cooperacion: cooperacion,
                    disciplina: disciplina,
                    honestidad: honestidad,
                    relaciones: relaciones,
                    responsabilidad: responsabilidad,
                    tolerancia: tolerancia,
                }
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
            const { id } = req.params;
            const response = await StatisticsDAO.deleteStatistic(id);

            const { error } = response;
            if (error) {
                res.status(400).json(error);
            }
            
            res.json({
                message: "La evaluación de calidad ha sido eliminada correctamente"
            })
        } catch (e) {
            console.error(e);
            res.status(400).json(e);
        }
    }

    async updateStatistic(req: Request, res: Response) {
        try {
            /**
             * Get the param form the url
             */
            const { id } = req.params;
            /**
             * Get the body of the request
             */
            const {
                idStatistic,
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
                conocimiento: {
                    practico: practico,
                    teorico: teorico
                },
                saberHacer: {
                    calidad: calidad,
                    productividad: productividad,
                    puntualidad: puntualidad,
                    orientacion: orientacion,
                },
                saberEstar: {
                    adaptabilidad: adaptabilidad,
                    calidadTrabajo: calidadTrabajo,
                    autocontrol: autocontrol,
                    compromiso: compromiso,
                    confianza: confianza,
                    constancia: constancia,
                    cooperacion: cooperacion,
                    disciplina: disciplina,
                    honestidad: honestidad,
                    relaciones: relaciones,
                    responsabilidad: responsabilidad,
                    tolerancia: tolerancia,
                }
            }

            const response = await StatisticsDAO.updateStatistic(idStatistic, stats);

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