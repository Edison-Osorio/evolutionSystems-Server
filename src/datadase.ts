import mysql from 'promise-mysql';

import keys from './keys';

const pool = mysql.createPool(keys.database);


pool.getConnection()
    .then((connection) => {
        pool.releaseConnection(connection);
        console.log('DB is connected');
    }).catch((errr)=>{
        console.log('No se pudo conectar a la base de datos \n', errr);  
    })
export default pool;
