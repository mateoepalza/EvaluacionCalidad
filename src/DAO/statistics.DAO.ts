import config from '../config/configEnv';
import { Statistics } from '../models/statistics';
import { ObjectId } from 'mongodb';

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

           const cursor = await statistics.find();
           return cursor.toArray();

        } catch (e) {
           console.error(e);
           return { error : e }; 
        }
    }

    static async getLastStatisticByUser(id_user: string){
        try {
           const cursor = await statistics.find(
               { employee_id: id_user }
           ).sort(
               { date : -1}
           ).limit(1)
           
           return cursor.toArray();

        } catch (e) {
            console.error(e);
            return { error : e };
        }
    }
    
    static async createStatistic(stat: Statistics){
        try{
            /**
             * insert the stat
             */
            const resultOpe = await statistics.insertOne(stat);
            /**
             * return the result
             */
            return resultOpe;

        }catch(e){
            console.error(e);
            return { error: e };
        }
    }
    
    static async updateStatistic(statistic_id: string, id_user: string, stats: Statistics){
        try{
            /**
             * Update elements 
             */
            const resultOpe = await statistics.updateOne(
                { 
                    _id: ObjectId(statistic_id),
                    employee_id: id_user
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
    
    static async deleteStatistic(statistic_id: string, id_user: string){
        
        try {
            const resultOpe = await statistics.deleteOne({
                _id: ObjectId(statistic_id),
                employee_id: id_user
            })         
            
            return resultOpe;
        } catch (e) {
            console.error(e);
            return { error: e };
        }
    }
}