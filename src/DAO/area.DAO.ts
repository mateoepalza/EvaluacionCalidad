import config from '../config/configEnv';

let area;

export default class AreaDAO{
    static async injectDB(conn){
        if(area){
            return ;
        }
        
        try {
            area = await conn.db(config.db).collection('areas');
        } catch (e) {
           console.error(`Enable to stablish the connectio with area ${e}`); 
        }
    }
    
    static async getAreas(){
        try {
            const cursor = await area.aggregate([
                {
                    $sort: {
                        "_id": -1
                    }
                },
                {
                    $skip: 1
                }
            ]);

            /**
             *  convert the cursor to arrat 
             */
            return await cursor.toArray();
            
        } catch (e) {
            console.error(e)
            return { error : e}
        }
    } 
    
    static async getArea(id: number){
        try {
            const cursor = await area.aggregate([
                {
                    $match: {
                        "_id": id
                    }
                }
            ]);

            return await cursor.toArray();

        } catch (e) {
            console.error(e);
            return { error: e};
        }
    }
}