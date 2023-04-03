import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";

export class If extends Instruction{

  operation: Instruction;
  trueBlock: Instruction[];
  falseBlock: Instruction | undefined;


  constructor(line: number, column: number, operation: Instruction, trueBlock: Instruction[], falseBlock?: Instruction) {
    super(line, column);
    this.operation = operation;
    this.trueBlock = trueBlock;
    if(falseBlock){
      this.falseBlock = falseBlock;
    }
  }

  execute(table: SymbolTable): any {

  }

}