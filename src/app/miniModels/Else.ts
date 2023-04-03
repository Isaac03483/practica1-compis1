import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";

export class Else extends Instruction{

  instructions: Instruction[];


  constructor(line: number, column: number, instructions: Instruction[]) {
    super(line, column);
    this.instructions = instructions;
  }

  execute(table: SymbolTable): any {
    this.instructions.forEach((it: Instruction) =>{
      it.execute(table);
    })

  }


}
