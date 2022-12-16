

import React from 'react'
import { enablePromise, openDatabase, ResultSet, SQLiteDatabase } from "react-native-sqlite-storage";
import { PesadasResponse, VersionResponse } from '../interfaces/appInterfaces';
import { DBPesadas } from './DBpesadas';
import { DBversion } from './DBversion';

enablePromise(true);

const DATA_BASE_NAME = 'dataBase.db';
const VERSION = 1;

export const getDBconection = async() => {    
    const db = await openDatabase({ name: DATA_BASE_NAME, location: 'default' });
    return db;
}

const createTables = async(db: SQLiteDatabase) => {
    const version = await db.executeSql(DBversion.createTabVersion);
    const resp = await db.executeSql(DBPesadas.tabPesadas);
    
    compraberVersiones(db);
    
    return resp;
}
const compraberVersiones = async(db: SQLiteDatabase) => {
    let versiones: VersionResponse[] = [];
    const result = await db.executeSql(`SELECT * FROM ${ DBversion.tableNameVersion }`);
    result.forEach((resultSet) => {
        for (let index = 0; index < resultSet.rows.length; index++) {
            versiones.push(resultSet.rows.item(index));
        }
    });
    console.log(versiones);

    if( versiones.length === 0 ){
        const versionNumber = await db.executeSql(`INSERT INTO ${ DBversion.tableNameVersion } (
            '${ DBversion.fvVERSION }',
            '${ DBversion.fvOLDVERSION }'
            ) values (
                '${ VERSION }',
                '${ VERSION }'
            )`
        )
        
    }
    console.log('Version length : ', versiones.length );
    console.log('Version Seleccionada : ', versiones);
}

export const initDB  = async() => {
    const db = await getDBconection();
    await createTables(db);
    
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

export const getPesadas = async(db: SQLiteDatabase) => {
    let pesadas: PesadasResponse[] = [];
    const result = await db.executeSql(`SELECT * FROM ${DBPesadas.tableNamePesadas}`);
    result.forEach((resultSet) => {
        for (let index = 0; index < resultSet.rows.length; index++) {
            pesadas.push(resultSet.rows.item(index));
        }
    });
    return pesadas;
}






