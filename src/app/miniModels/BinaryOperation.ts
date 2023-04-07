import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {OperationType} from "./OperationType";
import {Variable, VariableType} from "./Variable";

export class BinaryOperation extends Instruction{

  operationType: OperationType;
  leftOperation: Instruction;
  rightOperation: Instruction;


  constructor(line: number, column: number, operationType: OperationType,
              leftOperation: Instruction, rightOperation: Instruction) {
    super(line, column);
    this.operationType = operationType;
    this.leftOperation = leftOperation;
    this.rightOperation = rightOperation;
  }

  execute(symbolTable: SymbolTable): Variable | undefined {
    const leftOperator = this.leftOperation.execute(symbolTable);
    const rightOperator = this.rightOperation.execute(symbolTable);
    if(!leftOperator || !rightOperator){
      throw new Error(`Algo pasó con las operaciones Linea: ${this.line} Columna: ${this.column}`);
    }

    let variable = new Variable();

    switch (this.operationType){
      case OperationType.PLUS:

        if(leftOperator.variableType == VariableType.TEXT || rightOperator.variableType == VariableType.TEXT
          || leftOperator.variableType == VariableType.BOOLEAN || rightOperator.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar operaciones aritmeticas entre tipos INT y DECIMAL.");
        }

        variable.variableType = (leftOperator.variableType == VariableType.DECIMAL || rightOperator.variableType == VariableType.DECIMAL)?
          VariableType.DECIMAL : VariableType.INT;

        variable.value = Number(leftOperator.value) + Number(rightOperator.value);
        return variable;

      case OperationType.MINUS:

        if(leftOperator.variableType == VariableType.TEXT || rightOperator.variableType == VariableType.TEXT
          || leftOperator.variableType == VariableType.BOOLEAN || rightOperator.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar operaciones aritmeticas entre tipos INT y DECIMAL.");
        }

        variable.variableType = (leftOperator.variableType == VariableType.DECIMAL || rightOperator.variableType == VariableType.DECIMAL)?
          VariableType.DECIMAL : VariableType.INT;

        variable.value = Number(leftOperator.value) - Number(rightOperator.value);
        return variable;

      case OperationType.TIMES:

        if(leftOperator.variableType == VariableType.TEXT || rightOperator.variableType == VariableType.TEXT
          || leftOperator.variableType == VariableType.BOOLEAN || rightOperator.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar operaciones aritmeticas entre tipos INT y DECIMAL.");
        }

        variable.variableType = (leftOperator.variableType == VariableType.DECIMAL || rightOperator.variableType == VariableType.DECIMAL)?
          VariableType.DECIMAL : VariableType.INT;

        variable.value = Number(leftOperator.value) * Number(rightOperator.value);
        return variable;

      case OperationType.DIVIDE:

        if(leftOperator.variableType == VariableType.TEXT || rightOperator.variableType == VariableType.TEXT
          || leftOperator.variableType == VariableType.BOOLEAN || rightOperator.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar operaciones aritmeticas entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.DECIMAL;

        variable.value = Number(leftOperator.value) / Number(rightOperator.value);
        return variable;

      case OperationType.EQUALS:

        variable.variableType = VariableType.BOOLEAN;

        variable.value = leftOperator.value == rightOperator.value;

        return variable;

      case OperationType.NOT_EQUALS:
        variable.variableType = VariableType.BOOLEAN;

        variable.value = leftOperator.value != rightOperator.value;

        return variable;

      case OperationType.LESS_THAN:

        if(leftOperator.variableType == VariableType.TEXT || rightOperator.variableType == VariableType.TEXT
          || leftOperator.variableType == VariableType.BOOLEAN || rightOperator.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación < entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Number(leftOperator.value) < Number(rightOperator.value);

        return variable;

      case OperationType.GREATER_THAN:
        if(leftOperator.variableType == VariableType.TEXT || rightOperator.variableType == VariableType.TEXT
          || leftOperator.variableType == VariableType.BOOLEAN || rightOperator.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación > entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Number(leftOperator.value) > Number(rightOperator.value);

        return variable;
      case OperationType.LESS_EQUALS:
        if(leftOperator.variableType == VariableType.TEXT || rightOperator.variableType == VariableType.TEXT
          || leftOperator.variableType == VariableType.BOOLEAN || rightOperator.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación <= entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Number(leftOperator.value) <= Number(rightOperator.value);

        return variable;
      case OperationType.GREATER_EQUALS:
        if(leftOperator.variableType == VariableType.TEXT || rightOperator.variableType == VariableType.TEXT
          || leftOperator.variableType == VariableType.BOOLEAN || rightOperator.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación >= entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Number(leftOperator.value) >= Number(rightOperator.value);

        return variable;
      case OperationType.AND:

        if(leftOperator.variableType != VariableType.BOOLEAN || rightOperator.variableType != VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación AND entre tipos BOOLEAN.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Boolean(leftOperator.value) && Boolean(rightOperator.value);

        return variable;
      case OperationType.OR:

        if(leftOperator.variableType != VariableType.BOOLEAN || rightOperator.variableType != VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación OR entre tipos BOOLEAN.");

        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Boolean(leftOperator.value) || Boolean(rightOperator.value);
        return variable;

    }

    return undefined;

  }

}
