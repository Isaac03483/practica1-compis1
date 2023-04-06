import {SymbolTable} from "./SymbolTable";

export abstract class Instruction{
  line: number;
  column: number;

  constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
  }

  abstract execute(symbolTable: SymbolTable):any;
}
