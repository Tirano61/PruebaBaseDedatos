import { SQLiteDatabase } from 'react-native-sqlite-storage';
import dbupgrade from  './db-upgrade.json';

export const upgradeFrom = async(db: SQLiteDatabase, previousVersion: string) => {
    let statements:  any = [];
    let version = dbupgrade.version - (dbupgrade.version - +previousVersion) + 1;
    let length = Object.keys(dbupgrade.upgrades).length;

    for (let i = 0; i < length ; i += 1) {



        console.log("to_v" + version)
        
        const ins = `to_v'${version}'`
         
        let upgrade =  dbupgrade.upgrades[`to_v${version}` as keyof typeof dbupgrade.upgrades ];

        console.log(upgrade);
        if(upgrade){
            statements = [...upgrade];
            db.executeSql(statements);
            db.executeSql(`INSERT INTO tversion ('_id', 'version') VALUES ('${dbupgrade.version}', '${dbupgrade.version}')`)
            .then(() => console.log('success'))
            .catch(error => console.log(error));
        }else {
            break;
        }
        
        
        version++;

      
    }

}