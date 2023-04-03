import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";

export class Print extends Instruction {

    instructions: Instruction[];

  constructor(line: number, column: number, instructions: Instruction[]) {
    super(line, column);
    this.instructions = instructions;
  }

  execute(table: SymbolTable): any {
    let printContent = "";
    this.instructions.forEach((i: Instruction) =>{
      const variable = i.execute(table);
      if(variable){
        printContent+= variable.value;
      } else {
        console.log("No se pudo ejecutar la instrucción  en print");
      }

    });

    console.log(printContent);
  }


}
