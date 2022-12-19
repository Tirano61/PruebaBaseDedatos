

import React from 'react'
import { enablePromise, openDatabase, SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import { PesadasResponse, VersionResponse } from '../interfaces/appInterfaces';
import { DBPesadas } from './DBpesadas';
import { DBversion } from './DBversion';
import dbUpgrade from './db-upgrade.json';
import { upgradeFrom } from './upgradeFrom';

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
        db.transaction    
        await db.executeSql( DBversion.createTabVersion );
        await db.executeSql( DBPesadas.createtTabPesadas );

        let version: VersionResponse[] = await  this.buscarVersion(db);

        console.log( 'SE OBTUBO LA VERSION : ', version );

        if(!version[0].version){
            this.insertarVersion(this.VERSION);
            console.log( 'SE INSERTO LA VERSION UNO' );
            version[0].version = '1';
        }

        if(+version[0].version < dbUpgrade.version){
            upgradeFrom(db, version[0].version);
            console.log( 'VERSION PARA ACTUALIZAR' );
        }
            
        
        return db;
    }

    buscarVersion = async(db: SQLiteDatabase) =>{
        const result = await db.executeSql(`SELECT MAX(tversion.version) AS 'version' FROM ${DBversion.tableNameVersion}`);

        let version: VersionResponse[] = [];
        result.forEach((resultSet) => {
            for (let index = 0; index < resultSet.rows.length; index++) {
                version.push(resultSet.rows.item(index));
            }
        });
        return version;
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
            '${DBPesadas.fpPESO}',
            '${DBPesadas.fpRAZA}',
            '${DBPesadas.fpTROPA}',
            '${DBPesadas.fpESTADO}',
            '${DBPesadas.fpGENERO}'
        ) values (
            '${dbPesada.fecha}',
            '${dbPesada.hora}',
            '${dbPesada.lote}',
            '${dbPesada.caravana}',
            '${dbPesada.peso}',
            '${dbPesada.raza}',
            '${dbPesada.tropa}',
            '${dbPesada.estado}',
            '${dbPesada.genero}'
        )`
        const resp = await db.executeSql(insert);
        return resp;
    }

    insertarVersion = async(version: number) => {
        const db = await this.getDataBase();
        const ins = `INSERT INTO ${DBversion.tableNameVersion} 
        (
            '${DBversion.fvVERSION}'
        ) values (
            ${version}
        )`;
        const resp = await db.executeSql(ins);
        console.log(resp);
        return resp; 
    } 

    

}






