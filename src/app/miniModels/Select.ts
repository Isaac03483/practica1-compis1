import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {DataBase} from "../dbModels/DataBase";
import {QueriesSingleton, Query} from "./QueryResult";

export class Select extends Instruction{

  ids: string[];
  tableName: string;


  constructor(line: number, column: number, ids: string[], tableName: string) {
    super(line, column);
    this.ids = ids;
    this.tableName = tableName;
  }

  execute(symbolTable: SymbolTable): any {
    if(this.ids.length > 1 && this.ids[0] == "*"){
      throw new Error(` sintáctico. Solo se esperaba "*". Linea: ${this.line} Columna: ${this.column}`);
    }

    if(this.ids.length == 1 && this.ids[0] == "*"){

      const table = DataBase.getInstance().getTables().find(t => t.name == this.tableName);

      if(!table){
        throw new Error(` semántico. No se encontró la tabla con nombre: ${this.tableName}. Linea: ${this.line} Columna: ${this.column}`);
      }

      const query = new Query(`SELECT * FROM ${this.tableName}`, table);
      QueriesSingleton.getInstance().addQuery(query);
      return;
    }

  }

}
