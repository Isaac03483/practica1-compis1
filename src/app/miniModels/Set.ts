import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {VariableType} from "./Variable";

export class Set extends Instruction{

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
      throw new Error("No se ha encontrado la variable en la tabla de simbolos.");
    }

    const operation = this.operation.execute(symbolTable);

    if(!operation){
      throw new Error("Algo salió mal con la operación.");
    }

    //TODO: VERIFICAR EL CASO EN EL QUE LAS VARIABLES SEAN DECIMAL O INT

    if(varInTable.variableType != operation.variableType){
      throw new Error(`El tipo de la variable: ${varInTable.id} no coincide con el valor de la operación.`);
    }

    varInTable.value = operation.value;

  }
}
