

import React from 'react'
import { enablePromise, openDatabase, ResultSet, SQLiteDatabase } from "react-native-sqlite-storage";
import { PesadasResponse, VersionResponse } from '../interfaces/appInterfaces';
import { DBPesadas } from './DBpesadas';
import { DBversion } from './DBversion';

enablePromise(true);


export class DBconection {
    private DATA_BASE_NAME = 'dataBase.db';
    private VERSION = 1;
    private static instance: DBconection;
    private constructor(){}
    static _database: SQLiteDatabase;
    public static db (): DBconection {
        
        if(!DBconection.instance){
            DBconection.instance = new DBconection ;
        }
        return DBconection.instance;
    }
    getDataBase = async(): Promise<SQLiteDatabase> => {
        if(DBconection._database !== undefined){
            console.log('La coneccion esta establecida',DBconection._database);
            return DBconection._database;
        } 
        
        console.log('La conexion no esta establecida');
        DBconection._database = await this.initDB();
        return DBconection._database;
    }

    
    initDB  = async() => {
        const db = await openDatabase({ name: this.DATA_BASE_NAME, location: 'default' });
        await db.executeSql(DBversion.createTabVersion);
        await db.executeSql(DBPesadas.tabPesadas);
        return db;
    }

    getPesadas = async() => {
        let pesadas: PesadasResponse[] = [];
        const db = await this.getDataBase();
        const result = await db.executeSql(`SELECT * FROM ${DBPesadas.tableNamePesadas}`);
        result.forEach((resultSet) => {
            for (let index = 0; index < resultSet.rows.length; index++) {
                pesadas.push(resultSet.rows.item(index));
            }
        });
        return pesadas;
    }

    insertPesada = async( dbPesada: DBPesadas ) => {
        const db = await this.getDataBase();
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



}





















