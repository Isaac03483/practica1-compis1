import {Instruction} from "./Instruction";
import {OperationType} from "./OperationType";
import {SymbolTable} from "./SymbolTable";
import {Variable} from "./Variable";

export class BinaryOperation extends Instruction{

  operationType: OperationType;
  leftOperator: Instruction;
  rightOperator: Instruction;


  constructor(line: number, column: number, operationType: OperationType, leftOperator: Instruction, rightOperator: Instruction) {
    super(line, column);
    this.operationType = operationType;
    this.leftOperator = leftOperator;
    this.rightOperator = rightOperator;
  }

  execute(table: SymbolTable): Variable | undefined {
    let leftOperator = this.leftOperator.execute(table);
    let rightOperator = this.rightOperator.execute(table);

    if(leftOperator && rightOperator){
      switch (this.operationType){
        case OperationType.PLUS:
          return this.plus(leftOperator, rightOperator);
        case OperationType.MINUS:
        case OperationType.TIMES:
        case OperationType.DIVIDE:
        case OperationType.AND:
        case OperationType.OR:
        case OperationType.EQUALS:
        case OperationType.NOT_EQUALS:
        case OperationType.LESS_THAN:
        case OperationType.GREATER_THAN:
        case OperationType.LESS_EQUALS:
        case OperationType.GREATER_EQUALS:
      }
    }

    return undefined;
  }

  private plus(leftOperator: Variable, rightOperator: Variable):Variable | undefined{

    return undefined;
  }




}
