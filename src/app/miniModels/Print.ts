import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";

export class Print extends Instruction{

  operations: Instruction[];


  constructor(line: number, column: number, operations: Instruction[]) {
    super(line, column);
    this.operations = operations;
  }

  execute(symbolTable: SymbolTable): any {
  }

}
