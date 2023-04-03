import {Instruction} from "../miniModels/Instruction";
import {Value, ValueType} from "../miniModels/Value";

declare var miniSQLParser: any;
export class MiniSQLParser{

  private instructions : Instruction[] = [];
  private source: string;


  constructor(source: string) {
    this.source = source;
    miniSQLParser.yy.Value = Value;
    miniSQLParser.yy.ValueType = ValueType;
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
