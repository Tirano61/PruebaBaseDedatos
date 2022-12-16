




export class DBversion {
    static tableNameVersion: string = "tversion";

    //********* CAMPOS TABLA VERSIONES ***********//
    static fvID: string         = "_id";         
    static fvVERSION: string    = "version";    
    static fvOLDVERSION: string = "oldVersion";      

    //************ CREAR TABLA VERSIONES ***************//
    static createTabVersion: string = "CREATE TABLE IF NOT EXISTS " + this.tableNameVersion + "(" +
            this.fvID         + " integer primary key autoincrement, " +
            this.fvVERSION    + " text," +
            this.fvOLDVERSION + " text"+");";
   
    version: string;
    oldVersion: string; 

    constructor( version: string, oldVersion: string)
    {
        this.version    = version;
        this.oldVersion = oldVersion;
    }  

}