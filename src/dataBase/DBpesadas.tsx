

export class DBPesadas {
    static tableNamePesadas: string = "tpesada";

    //********* CAMPOS TABLA PESADAS ***********//
    static fpID: string       = "_id";         
    static fpFECHA: string    = "fecha";    
    static fpHORA: string     = "hora";      
    static fpLOTE: string     = "lote";
    static fpCARAVANA: string = "caravana";    
    static fpPESO: string     = "peso";


    //************ CREAR TABLA PESADAS ***************//
    static tabPesadas: string = "CREATE TABLE IF NOT EXISTS " + this.tableNamePesadas + "(" +
            this.fpID       + " integer primary key autoincrement, " +
            this.fpFECHA    + " text," +
            this.fpHORA     + " text," +
            this.fpLOTE     + " text," +
            this.fpCARAVANA + " text," +
            this.fpPESO     + " text"+");";

    fecha: string;
    hora: string; 
    lote: string; 
    caravana: string; 
    peso: string;

    constructor(fecha: string, hora: string, lote: string, caravana: string, peso: string)
    {
        this.fecha    = fecha;
        this.lote     = lote;
        this.caravana = caravana;
        this.peso     = peso;
        this.hora     = hora;
    }   

}