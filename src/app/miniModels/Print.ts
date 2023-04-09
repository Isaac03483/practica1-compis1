import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";

export class Print extends Instruction{

  operations: Instruction[];


  constructor(line: number, column: number, operations: Instruction[]) {
    super(line, column);
    this.operations = operations;
  }

  execute(symbolTable: SymbolTable): any {
    let printContent = "";

    this.operations.forEach((it: Instruction) =>{
      const operation = it.execute(symbolTable);

      if(!operation){
        throw new Error(` semántico. No se pudo ejecutar la operación. Linea: ${this.line} Columna: ${this.column}`);
      }

      printContent+= operation.value;

    });

    console.log(printContent);
  }

}
