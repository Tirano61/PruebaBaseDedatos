import { SQLiteDatabase } from 'react-native-sqlite-storage';
import dbupgrade from  './db-upgrade.json';

export const upgradeFrom = async(db: SQLiteDatabase, previousVersion: string) => {
    let statements:  any = [];
    let version = dbupgrade.version - (dbupgrade.version - +previousVersion) + 1;
    let length = Object.keys(dbupgrade.upgrades).length;

    for (let i = 0; i < 1; i += 1) {
        
      (Object.keys(dbupgrade.upgrades) as (keyof typeof dbupgrade.upgrades)[]).forEach((key,index) => {

         console.log("to_v" + version)
        if((key === `to_v${version}` ) && (version <= dbupgrade.version))
        {
          let upgrade = dbupgrade.upgrades[key];
          console.log(upgrade);
          
          statements = [...upgrade];
          db.executeSql(statements);
          db.executeSql(`INSERT INTO tversion ('_id', 'version') VALUES ('${dbupgrade.version}', '${dbupgrade.version}')`)
            .then(() => console.log('success'))
            .catch(error => console.log(error));
        }
        version++;

      });
    }

}