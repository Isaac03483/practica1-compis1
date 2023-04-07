import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {VariableType} from "./Variable";

export class If  extends Instruction{

  operation: Instruction;
  trueBlock: Instruction[];
  falseBlock?: Instruction;


  constructor(line: number, column: number, operation: Instruction,
              trueBlock: Instruction[], falseBlock?: Instruction) {
    super(line, column);
    this.operation = operation;
    this.trueBlock = trueBlock;
    if(falseBlock){
      this.falseBlock = falseBlock;
    }
  }

  execute(symbolTable: SymbolTable): any {

    const operation = this.operation.execute(symbolTable);

    if(!operation){
      throw new Error("No se ejecutó la operación");
    }

    if(operation.variableType != VariableType.BOOLEAN){
      throw new Error("La sentencia if debe contener un valor booleano.");
    }

    if(operation.value == true){
      this.trueBlock.forEach((it: Instruction)=>{
        it.execute(symbolTable);
      })
      return;
    }

    this.falseBlock?.execute(symbolTable);

  }

}
