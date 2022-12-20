

export class DBPesadas {
    static tableNamePesadas: string = "tpesada";

    //********* CAMPOS TABLA PESADAS ***********//
    static fpID: string       = "_id";         
    static fpFECHA: string    = "fecha";    
    static fpHORA: string     = "hora";      
    static fpLOTE: string     = "lote";
    static fpCARAVANA: string = "caravana";    
    static fpPESO: string     = "peso";
    static fpRAZA : string    = "raza";
    static fpTROPA : string   = "tropa";
    static fpESTADO : string  = "estado";
    static fpGENERO : string  = "genero";


    //************ CREAR TABLA PESADAS ***************//
    static createtTabPesadas: string = "CREATE TABLE IF NOT EXISTS " + this.tableNamePesadas + "(" +
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
    raza?: string;
    tropa?: string;
    estado?: string;
    genero?: string;

    constructor( fecha: string, hora: string, lote: string, caravana: string, peso: string, id?: string, raza?: string,
        tropa?: string,
        estado?: string,
        genero?: string)
    {
        this.fecha    = fecha;
        this.lote     = lote;
        this.caravana = caravana;
        this.peso     = peso;
        this.hora     = hora;
        this.raza     = raza;
        this.tropa    = tropa;
        this.estado   = estado;
        this.genero   = genero;
    }   
    

}