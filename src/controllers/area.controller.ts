import { Request, response, Response } from "express";
import AreaDAO from "../DAO/area.DAO";


export default class AreaController{

    constructor(){}

    static async getAreas(req: Request, res: Response){
        try{
            const resAreas = await AreaDAO.getAreas();
            
            const { error } = resAreas;

            if(error){
                res.status(400).json(error);
            }

            res.json({
                data: resAreas
            });

        }catch(e){
            console.log(e);
            res.status(400).json(e);
        }  
    }
    

    static async getArea(req: Request, res: Response){
        try {
            
            const { id } = req.params; 
            
            const resArea = await AreaDAO.getArea(+id);            
            
            const { error } = resArea;
            if(error){
                res.status(400).json(error);
            }
            
            res.status(200).json({
                data: resArea
            })

        } catch (e) {
            console.error(e);
            response.status(400).json(e);
        }
    }
}
