import config from '../config/configEnv';
import { Statistics } from '../models/statistics';
import { objectId } from 'bson';

let statistics;

export default class StatisticsDAO {

    static async injectDB(conn) {
        if (statistics) {
            return;
        }

        try {
            statistics = conn.db(config.db).collection("statistics");
        } catch (e) {
            console.error(`Enable to establish a connection handle in statistics ${e}`);
        }

    }
    
    static async getStatistics(){
        try {
            
        } catch (e) {
            
        }
    }

    static async getStatistic(){
        try {
            
        } catch (e) {
            
        }
    }
    
    static async createStatistic(stat: Statistics){
        try{
            /**
             * insert the stat
             */
            const resultOpe = statistics.insertOne(stat);
            /**
             * return the result
             */
            return resultOpe;

        }catch(e){
            console.error(e);
            return { error: e };
        }
    }
    
    static async updateStatistic(id: string, stats: Statistics){
        try{
            /**
             * Update elements 
             */
            const resultOpe = await statistics.updateOne(
                { 
                    _id: objectId(id),
                    employee_id: stats.employee_id
                },
                {
                   $set: stats
                }
                
            );
            /**
             * return the result
             */
            return resultOpe;

        }catch(e){
            console.error(e);
            return { error: e };
        }
    }
    
    static async deleteStatistic(id: string){
        
        try {
            const resultOpe = await statistics.deleteOne({
                _id: objectId(id)
            })         
            
            return resultOpe;
        } catch (e) {
            console.error(e);
            return { error: e };
        }
    }
}