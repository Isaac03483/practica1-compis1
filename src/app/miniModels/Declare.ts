import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {ValueType} from "./Value";

export class Declare extends Instruction{
  variableType: ValueType;
  id: string;
  operation: Instruction | undefined;


  constructor(line: number, column: number, variableType: ValueType, id: string, operation?: Instruction) {
    super(line, column);
    this.variableType = variableType;
    this.id = id;
    if(operation){
      this.operation = operation;
    }
  }

  execute(table: SymbolTable): any {
  }


}
