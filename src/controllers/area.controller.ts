import { Request, response, Response } from "express";
import  db  from '../util/database';


class AreaController{

    constructor(){
        
    }
    
    async getAreas(req: Request, res: Response){
        try{
            const cursor = db.db("evaluacion_calidad").collection("areas").aggregate([
                {
                    $sort: {
                        "_id": -1
                    }
                }
            ]);

            /**
             *  convert the cursor to arrat 
             */
            let resArray = await cursor.toArray();

            /**
             * Elimino el primer elemento del array
             */
            resArray.splice(0,1);
            
            /**
             * Give a response
             */
            res.json({
                data: resArray
            });

        }catch(error){
            console.log(error);
            res.status(400).json({
                "message": "Ocurrió algo inesperado"
            })
        }  
    }
    

    async getArea(req: Request, res: Response){
        try {
            
            const { id } = req.params; 

            const cursor = db.db("evaluacion_calidad").collection("areas").aggregate([
                {
                    $match: {
                        "_id": id
                    }
                }
            ]);

            const resArray = cursor.toArray();
            
            res.status(200).json({
                data: resArray
            })

        } catch (error) {
            console.error(error);
            response.status(400).json({
                message: "Ocurrió algo inesperado"
            });
        }
    }
}

const area = new AreaController();
export default area;