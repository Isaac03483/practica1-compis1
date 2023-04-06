import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {VariableType} from "./Variable";

export class Assignment extends Instruction{

  id: string;
  operation: Instruction;


  constructor(line: number, column: number, id: string, operation: Instruction) {
    super(line, column);
    this.id = id;
    this.operation = operation;
  }

  execute(symbolTable: SymbolTable): any {

    const varInTable = symbolTable.findById(this.id);

    if(!varInTable){
      throw new Error(`Error semántico. No se ha encontrado: ${this.id} en la tabla de simbolos Linea: ${this.line} Columna: ${this.column}`);
    }

    const operation = this.operation.execute(symbolTable);

    if(!operation){
      throw new Error(`Error semántico. Algo salió mal con la operacion Linea: ${this.line} Columna: ${this.column}`);
    }

    //TODO: VERIFICAR EL VALOR DE INPUT, VERIFICAR SI LA CADENA ES UN NÚMERO, VERIFICAR QUE SEAN INT O DECIMAL

    if(varInTable.variableType != operation.variableType){
      throw new Error(`Error semántico. Los tipos de variables no coinciden Linea: ${this.line} Columna: ${this.column}`);
    }

    varInTable.value = operation.value;
  }

}
