

import React from 'react'
import { enablePromise, openDatabase, ResultSet, SQLiteDatabase } from "react-native-sqlite-storage";
import { DBPesadas } from './DBpesadas';

enablePromise(true);

const DATA_BASE_NAME = 'dataBase.db';

export const getDBconection = async() => {    
    const db = await openDatabase({ name: DATA_BASE_NAME, location: 'default' });
    return db;
}

const createTables = async(db: SQLiteDatabase) => {
    const resp = await db.executeSql(DBPesadas.tabPesadas);
    return resp;
}

export const initDB  = async() => {
    const db = await getDBconection();
    const resp = await createTables(db);
    db.close();

}

export const insertPesada = async(db:SQLiteDatabase, dbPesada: DBPesadas) => {
    const insert = `INSERT INTO ${DBPesadas.tableNamePesadas} (
        '${DBPesadas.fpFECHA}',
        '${DBPesadas.fpHORA}',
        '${DBPesadas.fpLOTE}',
        '${DBPesadas.fpCARAVANA}',
        '${DBPesadas.fpPESO}'
    ) values (
        '${dbPesada.fecha}',
        '${dbPesada.hora}',
        '${dbPesada.lote}',
        '${dbPesada.caravana}',
        '${dbPesada.peso}'
    )`

    const resp = await db.executeSql(insert);
    return resp;
}







