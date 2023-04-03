import {OperationType} from "./OperationType";
import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";

export class UnaryOperation extends Instruction{
  operationType: OperationType;
  rightOperator: Instruction;


  constructor(line: number, column: number, operationType: OperationType, rightOperator: Instruction) {
    super(line, column);
    this.operationType = operationType;
    this.rightOperator = rightOperator;
  }

  execute(table: SymbolTable): any {

  }


}
