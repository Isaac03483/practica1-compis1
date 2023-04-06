import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {OperationType} from "./OperationType";
import {Variable, VariableType} from "./Variable";

export class BinaryOperation extends Instruction{

  operationType: OperationType;
  leftOperation: Instruction;
  rightOperation: Instruction;


  constructor(line: number, column: number, operationType: OperationType, leftOperation: Instruction, rightOperation: Instruction) {
    super(line, column);
    this.operationType = operationType;
    this.leftOperation = leftOperation;
    this.rightOperation = rightOperation;
  }

  execute(symbolTable: SymbolTable): Variable | undefined {
    const left = this.leftOperation.execute(symbolTable);
    const right = this.rightOperation.execute(symbolTable);

    if(!left || !right){
      throw new Error(`Algo pasó con las operaciones Linea: ${this.line} Columna: ${this.column}`);
    }

    let variable = new Variable();
    switch (this.operationType){
      case OperationType.PLUS:

        if(left.variableType == VariableType.TEXT_VALUE || right.variableType == VariableType.TEXT_VALUE
          || left.variableType == VariableType.BOOLEAN || right.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar operaciones aritmeticas entre tipos INT y DECIMAL.");
        }

        variable.variableType = (left.variableType == VariableType.DECIMAL || right.variableType == VariableType.DECIMAL)?
          VariableType.DECIMAL : VariableType.INT;

        variable.value = Number(left.value) + Number(right.value);
        return variable;

      case OperationType.MINUS:

        if(left.variableType == VariableType.TEXT_VALUE || right.variableType == VariableType.TEXT_VALUE
          || left.variableType == VariableType.BOOLEAN || right.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar operaciones aritmeticas entre tipos INT y DECIMAL.");
        }

        variable.variableType = (left.variableType == VariableType.DECIMAL || right.variableType == VariableType.DECIMAL)?
          VariableType.DECIMAL : VariableType.INT;

        variable.value = Number(left.value) - Number(right.value);
        return variable;

      case OperationType.TIMES:

        if(left.variableType == VariableType.TEXT_VALUE || right.variableType == VariableType.TEXT_VALUE
          || left.variableType == VariableType.BOOLEAN || right.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar operaciones aritmeticas entre tipos INT y DECIMAL.");
        }

        variable.variableType = (left.variableType == VariableType.DECIMAL || right.variableType == VariableType.DECIMAL)?
          VariableType.DECIMAL : VariableType.INT;

        variable.value = Number(left.value) * Number(right.value);
        return variable;

      case OperationType.DIVIDE:

        if(left.variableType == VariableType.TEXT_VALUE || right.variableType == VariableType.TEXT_VALUE
          || left.variableType == VariableType.BOOLEAN || right.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar operaciones aritmeticas entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.DECIMAL;

        variable.value = Number(left.value) / Number(right.value);
        return variable;

      case OperationType.EQUALS:

        variable.variableType = VariableType.BOOLEAN;

        variable.value = left.value == right.value;

        return variable;

      case OperationType.NOT_EQUALS:
        variable.variableType = VariableType.BOOLEAN;

        variable.value = left.value == right.value;

        return variable;

      case OperationType.LESS_THAN:

        if(left.variableType == VariableType.TEXT_VALUE || right.variableType == VariableType.TEXT_VALUE
          || left.variableType == VariableType.BOOLEAN || right.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación < entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Number(left.value) < Number(right.value);

        return variable;

      case OperationType.GREATER_THAN:
        if(left.variableType == VariableType.TEXT_VALUE || right.variableType == VariableType.TEXT_VALUE
          || left.variableType == VariableType.BOOLEAN || right.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación > entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Number(left.value) > Number(right.value);

        return variable;
      case OperationType.LESS_EQUALS:
        if(left.variableType == VariableType.TEXT_VALUE || right.variableType == VariableType.TEXT_VALUE
          || left.variableType == VariableType.BOOLEAN || right.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación <= entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Number(left.value) <= Number(right.value);

        return variable;
      case OperationType.GREATER_EQUALS:
        if(left.variableType == VariableType.TEXT_VALUE || right.variableType == VariableType.TEXT_VALUE
          || left.variableType == VariableType.BOOLEAN || right.variableType == VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación >= entre tipos INT y DECIMAL.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Number(left.value) >= Number(right.value);

        return variable;
      case OperationType.AND:

        if(left.variableType != VariableType.BOOLEAN || right.variableType != VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación AND entre tipos BOOLEAN.");
        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Boolean(left.value) && Boolean(right.value);

        return variable;
      case OperationType.OR:

        if(left.variableType != VariableType.BOOLEAN || right.variableType != VariableType.BOOLEAN){
          throw new Error("Solo puede realizar la operación OR entre tipos BOOLEAN.");

        }

        variable.variableType = VariableType.BOOLEAN;

        variable.value = Boolean(left.value) || Boolean(right.value);
        return variable;

    }

    return undefined;

  }

}
