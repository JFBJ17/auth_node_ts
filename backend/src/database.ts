import { createPool, Pool } from 'mysql2/promise';
import config from './keys'

const connection = async (): Promise<Pool> => {
    const connect = await createPool({
        host: config.MYSQL_HOST,
        user: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE,
        connectionLimit: 10
    });

    return connect;

}

export default connection;