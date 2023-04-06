import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {VariableType} from "./Variable";

export class Declare extends Instruction{

  ids: string[];
  variableType: VariableType;
  value?: Instruction;


  constructor(line: number, column: number, ids: string[], variableType: VariableType, value?: Instruction) {
    super(line, column);
    this.ids = ids;
    this.variableType = variableType;
    if(value){
      this.value = value;
    }
  }

  execute(symbolTable: SymbolTable): any {
  }



}
