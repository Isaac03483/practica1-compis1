import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {OperationType} from "./OperationType";
import {Variable, VariableType} from "./Variable";

export class UnaryOperation extends Instruction{

  operationType: OperationType;
  rightOperation:Instruction;


  constructor(line: number, column: number, operationType: OperationType, rightOperation: Instruction) {
    super(line, column);
    this.operationType = operationType;
    this.rightOperation = rightOperation;
  }

  execute(symbolTable: SymbolTable): Variable|undefined {
    const right = this.rightOperation.execute(symbolTable);

    if(!right){
      throw new  Error("No se pudo obtener el resultado de la operación");
    }

    let variable = new Variable();
    console.log("Ejecutando operación unaria.");

    switch (this.operationType){
      case OperationType.MINUS:

        if(right.variableType != VariableType.INT && right.variableType != VariableType.DECIMAL){
          throw new Error("Solo se puede obtener el negativo de tipos INT y DECIMAL.");
        }

        variable.variableType = right.variableType;
        variable.value = -1 * Number(right.value);
        return variable;

      case OperationType.NOT:
        if(right.variableType != VariableType.BOOLEAN){
          throw new Error("Solo se puede obtener la negación de tipos BOOLEAN.");
        }

        variable.variableType = VariableType.BOOLEAN;
        variable.value = !Boolean(right.value);

        return variable;

    }


    return undefined;
  }

}
