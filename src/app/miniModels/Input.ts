import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {Variable, VariableType} from "./Variable";

export class Input extends Instruction{

  value: Instruction;

  constructor(line: number, column: number, value: Instruction) {
    super(line, column);
    this.value = value;
  }

  execute(symbolTable: SymbolTable): any {

    const result = this.value.execute(symbolTable);
    if(!result){
      throw new Error("Algo malo pasó con el valor de la instrucción.");
    }

    let variable = new Variable();
    variable.value = prompt(result.value);
    variable.variableType = VariableType.TEXT;

    return variable;
  }

}
