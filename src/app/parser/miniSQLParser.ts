
declare var miniSQLParser: any;
export class MiniSQLParser{

  private source: string;


  constructor(source: string) {
    this.source = source;
  }

  parse(){
    try{
      miniSQLParser.parse(this.source);
    } catch (error){
      console.log(error);
      console.log("Algo salió mal a la hora de parsear en miniSQLParser");
    }
  }
}
