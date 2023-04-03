import {SymbolTable} from "./SymbolTable";
import {Variable} from "./Variable";


export abstract class Instruction{
  line: number;
  column: number;


  protected constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
  }

  abstract execute(table: SymbolTable): any;
}
