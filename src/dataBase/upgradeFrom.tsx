import { SQLiteDatabase } from 'react-native-sqlite-storage';
import dbupgrade from  './db-upgrade.json';

export const upgradeFrom = async(db: SQLiteDatabase, previousVersion: string) => {
    let statements:  any = [];
    let version = dbupgrade.version - (dbupgrade.version - +previousVersion) + 1;
    let length = Object.keys(dbupgrade.upgrades).length;

    for (let i = 0; i < 1; i += 1) {
        
        //let version:string[][] = "to_v3";
      //let upgrade = dbupgrade.upgrades[`to_v${version}`];

      (Object.keys(dbupgrade.upgrades) as (keyof typeof dbupgrade.upgrades)[]).forEach((key,index) => {

         console.log("to_v" + version)
        if((key === `to_v${version}` ) && (version <= dbupgrade.version))
        {
            let upgrade = dbupgrade.upgrades[key];
            console.log(upgrade);
            statements = [...statements, ...upgrade];
        }
        version++;

      });

     /* if (upgrade) {
        statements = [...statements, ...upgrade];
      } else {
        break;
      }
*/
      

      
    }

    statements = [...statements, ...[[`REPLACE into tversion (version) VALUES (${dbupgrade.version});`]]];
     console.log(statements);
    return db.executeSql(statements)
                    .then(() => console.log('Success!'))
                    .catch(error => console.log('Error:', error));

}