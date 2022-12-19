




export class DBversion {
    static tableNameVersion: string = "tversion";

    //********* CAMPOS TABLA VERSIONES ***********//
    static fvID: string         = "_id";         
    static fvVERSION: string    = "version";    
   

    //************ CREAR TABLA VERSIONES ***************//
    static createTabVersion: string = "CREATE TABLE IF NOT EXISTS " + this.tableNameVersion + "(" +
            this.fvID         + " integer primary key autoincrement, " +
            this.fvVERSION + " NUMERIC"+");";
   
    version: string;

    constructor( version: string )
    {
        this.version    = version;
        
    }  

}