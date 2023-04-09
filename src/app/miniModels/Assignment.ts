import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {VariableType} from "./Variable";
import {Input} from "./Input";

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
      throw new Error(` semántico. No se ha encontrado: ${this.id} en la tabla de simbolos. Linea: ${this.line} Columna: ${this.column}`);
    }

    const operation = this.operation.execute(symbolTable);

    if(!operation){
      throw new Error(` semántico. Algo salió mal con la operacion. Linea: ${this.line} Columna: ${this.column}`);
    }

    //TODO: VERIFICAR EL VALOR DE INPUT, VERIFICAR SI LA CADENA ES UN NÚMERO, VERIFICAR QUE SEAN INT O DECIMAL
    if(this.operation instanceof Input){
      if(varInTable.variableType == VariableType.INT || varInTable.variableType == VariableType.DECIMAL){
        if(Number.isNaN(Number(operation.value))){

          throw new Error(` semántico. Se esperaba un valor ${VariableType[varInTable.variableType]}. Linea: ${this.line} Columna: ${this.column}`);
        }

        varInTable.value = varInTable.variableType == VariableType.INT? Math.floor(Number(operation.value)) : Number(operation.value);
        return;
      }

      if(varInTable.variableType == VariableType.BOOLEAN){

        if(String(operation.value).trim().toLowerCase() != "true" && String(operation.value).trim().toLowerCase() != "false"){
          throw new Error(` semántico. Se esperaba un valor booleano. Linea: ${this.line} Columna: ${this.column}`);
        }

        varInTable.value = Boolean(String(operation.value).toLowerCase());

        return;
      }

      varInTable.value = operation.value;

    }

    if(varInTable.variableType == VariableType.INT || varInTable.variableType == VariableType.DECIMAL){
      if(operation.variableType != VariableType.INT && operation.variableType != VariableType.DECIMAL){

        throw new Error(` semántico. Se esperaba un valor ${VariableType[varInTable.variableType]}. Linea: ${this.line} Columna: ${this.column}`);
      }

      varInTable.value = varInTable.variableType == VariableType.INT? Math.floor(Number(operation.value)) : Number(operation.value);
      return;
    }


    if(varInTable.variableType != operation.variableType){
      throw new Error(` semántico. Se esperaba un valor ${VariableType[varInTable.variableType]}. Linea: ${this.line} Columna: ${this.column}`);
    }

    varInTable.value = operation.value;
  }

}
