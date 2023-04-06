import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {Variable, VariableType} from "./Variable";

export class Declare extends Instruction{

  ids: string[];
  variableType: VariableType;
  value?: Instruction;


  constructor(line: number, column: number, ids: string[],
              variableType: VariableType, value?: Instruction) {
    super(line, column);
    this.ids = ids;
    this.variableType = variableType;
    if(value){
      this.value = value;
    }
  }

  execute(symbolTable: SymbolTable): any {

    if(this.ids.length > 1 && this.value){
      throw new Error(`Error sintáctico, no puede asignar un valor a una declaración multiple Linea: ${this.line} Columna: ${this.column}`);
    }

    if(this.ids.length == 1){
      const isInTable = symbolTable.idInTable(this.ids[0]);

      if(isInTable){
        throw new Error(`Error semántico, nombre de variable definido anteriormente Linea: ${this.line} Columna: ${this.column}`);
      }

      let variable = new Variable();
      variable.id = this.ids[0];
      if(this.value){
        const operation = this.value.execute(symbolTable);

        if(!operation){
          throw new Error(`Error semántico, Algo ocurrió con la operación a asignar Linea: ${this.line} Columna: ${this.column}`);
        }

        if(this.variableType != operation.variableType){
          throw new Error(`Error semántico, Los tipos no coinciden Linea: ${this.line} Columna: ${this.column}`);
        }

        variable.value = operation.value;

      }

      variable.variableType = this.variableType;
      symbolTable.addVariable(variable);
      return;
    }

    this.ids.forEach((id: string)=>{
      const isInTable = symbolTable.idInTable(id);

      if(isInTable){
        throw new Error(`Error semántico, nombre de variable definido anteriormente Linea: ${this.line} Columna: ${this.column}`);
      }

      let newVariable = new Variable();
      newVariable.id = id;
      newVariable.variableType = this.variableType;
      symbolTable.addVariable(newVariable);
    });

  }



}
