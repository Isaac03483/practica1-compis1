import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {VariableType} from "./Variable";

export class Set extends Instruction{

  operation: Instruction[];
  constructor(line: number, column: number, operation: Instruction[]) {
    super(line, column);
    this.operation = operation;
  }

  execute(symbolTable: SymbolTable): any {

    this.operation.forEach((it: Instruction)=>{
      it.execute(symbolTable);
    });

  }
}
