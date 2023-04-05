import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";

export class Set extends Instruction{

  id: string;
  operation: Instruction;


  constructor(line: number, column: number, id: string, operation: Instruction) {
    super(line, column);
    this.id = id;
    this.operation = operation;
  }

  execute(table: SymbolTable): any {

    const varInTable = table.getById(this.id);

    if(!varInTable){
      throw new Error(`Error: SEMÁNTICO Linea: ${this.line} Columna: ${this.column}
      No se ha encontrado la variable en la tabla de simbolos.`);
    }

    const operation = this.operation.execute(table);
    if(!operation){
      throw new Error(`Error: SEMÁNTICO Linea: ${this.line} Columna: ${this.column} Algo falló con la operación.`);
    }

    if(operation.type != varInTable.type){
      throw new Error(`Error: SEMÁNTICO Linea: ${this.line} Columna: ${this.column} Los tipos no coinciden.`);
    }

    varInTable.value = operation.value;

  }

}
