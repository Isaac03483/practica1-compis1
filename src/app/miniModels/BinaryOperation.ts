import {Instruction} from "./Instruction";
import {OperationType} from "./OperationType";
import {SymbolTable} from "./SymbolTable";
import {Variable} from "./Variable";
import {ValueType} from "./Value";

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
      let variable = new Variable();
      variable.type = leftOperator.operationType == ValueType.DECIMAL || rightOperator.operationType == ValueType.DECIMAL? ValueType.DECIMAL:ValueType.INT;
      switch (this.operationType){
        case OperationType.PLUS:
          variable.value = Number(leftOperator.value) + Number(rightOperator.value);
          return variable;
        case OperationType.MINUS:
          variable.value = Number(leftOperator.value) - Number(rightOperator.value);
          return variable;
        case OperationType.TIMES:
          variable.value = Number(leftOperator.value) * Number(rightOperator.value);
          return variable;
        case OperationType.DIVIDE:
          variable.type = ValueType.DECIMAL;
          variable.value = Number(leftOperator.value) / Number(rightOperator.value);
          return variable;
        case OperationType.AND:
          variable.value = Number(leftOperator.value) + Number(rightOperator.value);
          return variable;
        case OperationType.OR:
          variable.value = Number(leftOperator.value) + Number(rightOperator.value);
          return variable;
        case OperationType.EQUALS:
          variable.value = Number(leftOperator.value) + Number(rightOperator.value);
          return variable;
        case OperationType.NOT_EQUALS:
          variable.value = Number(leftOperator.value) + Number(rightOperator.value);
          return variable;
        case OperationType.LESS_THAN:
          variable.value = Number(leftOperator.value) + Number(rightOperator.value);
          return variable;
        case OperationType.GREATER_THAN:
          variable.value = Number(leftOperator.value) + Number(rightOperator.value);
          return variable;
        case OperationType.LESS_EQUALS:
          variable.value = Number(leftOperator.value) + Number(rightOperator.value);
          return variable;
        case OperationType.GREATER_EQUALS:
          variable.value = Number(leftOperator.value) + Number(rightOperator.value);
          return variable;
      }
    }

    return undefined;
  }

}
