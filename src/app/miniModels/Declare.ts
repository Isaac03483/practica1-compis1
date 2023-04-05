import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {ValueType} from "./Value";
import {Variable} from "./Variable";

export class Declare extends Instruction{
  variableType: ValueType;
  id: string[];
  operation: Instruction | undefined;


  constructor(line: number, column: number, variableType: ValueType, id: string[], operation?: Instruction) {
    super(line, column);
    this.variableType = variableType;
    this.id = id;
    if(operation){
      this.operation = operation;
    }
  }

  execute(table: SymbolTable): any {
    if(this.id.length > 1 && this.operation){
      throw new Error(`Error: SEMANTICO Linea: ${this.line} Columna: ${this.column}
      no puede asignar un valor cuando se definen varias variables a la vez`);
    }

    if(this.id.length == 1){
      const operation = this.operation?.execute(table);
      if(!operation){
        throw new Error(`Error: SEMÁNTICO Linea ${this.line} Columna: ${this.column} Algo salió mal con la operación.`);
      }

      const varInTable = table.contains(this.id[0]);

      if(varInTable){
        throw new Error(`Error: SEMANTICO Linea ${this.line} Columna ${this.column}
        variable con nombre ${this.id[0]} ya declarada anteriormente`);
      }

      let variable = new Variable();
      if(operation.type != this.variableType){
        throw new Error(`Error: SEMANTICO Linea ${this.line} Columna: ${this.column} el tipo de la variable no coincide con el tipo de la operación.`);
      }

      variable.type = this.variableType;
      variable.id = this.id[0];
      variable.value = operation.value;

      table.add(variable);
    } else {
      this.id.forEach((it: string) =>{

        const varInTable = table.contains(it);

        if(varInTable){
          throw new Error(`Error: SEMANTICO Linea ${this.line} Columna ${this.column}
          variable con nombre ${it} ya declarada anteriormente`);
        }

        let varId = new Variable();
        varId.type = this.variableType;
        varId.id = it;
        table.add(varId);
      });
    }

  }


}
