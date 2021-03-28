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

    static async getStatisticByArea() {
        try {
            const cursor = await statistics.aggregate([
                {
                    '$lookup': {
                        'from': 'employee',
                        'localField': 'employee_id',
                        'foreignField': '_id',
                        'as': 'user'
                    }
                }, {
                    '$replaceRoot': {
                        'newRoot': {
                            '$mergeObjects': [
                                {
                                    '$arrayElemAt': [
                                        '$user', 0
                                    ]
                                }, '$$ROOT'
                            ]
                        }
                    }
                }, {
                    '$project': {
                        'id_area': 1,
                        'conocimiento': 1,
                        'saberEstar': 1,
                        'saberHacer': 1
                    }
                }, {
                    '$group': {
                        '_id': '$id_area',
                        'amountEmployees': {
                            '$sum': 1
                        },
                        'maxConocimiento': {
                            '$sum': {
                                '$multiply': [
                                    3, {
                                        '$size': '$conocimiento'
                                    }
                                ]
                            }
                        },
                        'maxSaberEstar': {
                            '$sum': {
                                '$multiply': [
                                    3, {
                                        '$size': '$saberEstar'
                                    }
                                ]
                            }
                        },
                        'maxSaberHacer': {
                            '$sum': {
                                '$multiply': [
                                    3, {
                                        '$size': '$saberHacer'
                                    }
                                ]
                            }
                        },
                        'totalConocimiento': {
                            '$sum': {
                                '$sum': '$conocimiento.value'
                            }
                        },
                        'totalSaberEstar': {
                            '$sum': {
                                '$sum': '$saberEstar.value'
                            }
                        },
                        'totalSaberHacer': {
                            '$sum': {
                                '$sum': '$saberHacer.value'
                            }
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'areas',
                        'localField': '_id',
                        'foreignField': '_id',
                        'as': 'area'
                    }
                }, {
                    '$replaceRoot': {
                        'newRoot': {
                            '$mergeObjects': [
                                {
                                    '$arrayElemAt': [
                                        '$area', 0
                                    ]
                                }, '$$ROOT'
                            ]
                        }
                    }
                }, {
                    '$project': {
                        'area': 0
                    }
                }
            ]);

            return await cursor.toArray();
        } catch (e) {
            console.log(e);
            return { error: e }
        }
    }

    static async getStatistics() {
        try {

            const cursor = await statistics.find();
            return cursor.toArray();

        } catch (e) {
            console.error(e);
            return { error: e };
        }
    }

    static async getLastStatisticByUser(id_user: string) {
        try {
            const cursor = await statistics.find(
                { employee_id: id_user }
            ).sort(
                { date: -1 }
            ).limit(1)

            return cursor.toArray();

        } catch (e) {
            console.error(e);
            return { error: e };
        }
    }

    static async getSingleStatisticByArea(id_area: string) {
        // TODO take the id_area an filter by the id
        try {
            const cursor = await statistics.aggregate([
                {
                    '$lookup': {
                        'from': 'employee',
                        'localField': 'employee_id',
                        'foreignField': '_id',
                        'as': 'user'
                    }
                }, {
                    '$replaceRoot': {
                        'newRoot': {
                            '$mergeObjects': [
                                {
                                    '$arrayElemAt': [
                                        '$user', 0
                                    ]
                                }, '$$ROOT'
                            ]
                        }
                    }
                }, {
                    '$project': {
                        'id_area': 1,
                        'conocimiento': 1,
                        'saberEstar': 1,
                        'saberHacer': 1
                    }
                }, {
                    '$group': {
                        '_id': '$id_area',
                        'amountEmployees': {
                            '$sum': 1
                        },
                        'maxConocimiento': {
                            '$sum': {
                                '$multiply': [
                                    3, {
                                        '$size': '$conocimiento'
                                    }
                                ]
                            }
                        },
                        'maxSaberEstar': {
                            '$sum': {
                                '$multiply': [
                                    3, {
                                        '$size': '$saberEstar'
                                    }
                                ]
                            }
                        },
                        'maxSaberHacer': {
                            '$sum': {
                                '$multiply': [
                                    3, {
                                        '$size': '$saberHacer'
                                    }
                                ]
                            }
                        },
                        'totalConocimiento': {
                            '$sum': {
                                '$sum': '$conocimiento.value'
                            }
                        },
                        'totalSaberEstar': {
                            '$sum': {
                                '$sum': '$saberEstar.value'
                            }
                        },
                        'totalSaberHacer': {
                            '$sum': {
                                '$sum': '$saberHacer.value'
                            }
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'areas',
                        'localField': '_id',
                        'foreignField': '_id',
                        'as': 'area'
                    }
                }, {
                    '$replaceRoot': {
                        'newRoot': {
                            '$mergeObjects': [
                                {
                                    '$arrayElemAt': [
                                        '$area', 0
                                    ]
                                }, '$$ROOT'
                            ]
                        }
                    }
                }, {
                    '$project': {
                        'area': 0
                    }
                }
            ]);

            return await cursor.toArray();

        } catch (e) {

            console.error(e)
            return { error: e };
        }

    }

    static async createStatistic(stat: Statistics) {
        try {
            /**
             * insert the stat
             */
            const resultOpe = await statistics.insertOne(stat);
            /**
             * return the result
             */
            return resultOpe;

        } catch (e) {
            console.error(e);
            return { error: e };
        }
    }

    static async updateStatistic(statistic_id: any, id_user: string, stats: Statistics) {
        try {
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

        } catch (e) {
            console.error(e);
            return { error: e };
        }
    }

    static async deleteStatistic(statistic_id: any, id_user: string) {

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