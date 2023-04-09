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
      throw new  Error(` semántico. No se pudo obtener el resultado de la operación. Linea: ${this.line} Columna: ${this.column}`);
    }

    let variable = new Variable();

    switch (this.operationType){
      case OperationType.MINUS:

        if(right.variableType != VariableType.INT && right.variableType != VariableType.DECIMAL){
          throw new Error(` semántico. Solo se puede obtener el negativo de tipos INT y DECIMAL. Linea: ${this.line} Columna: ${this.column}`);
        }

        variable.variableType = right.variableType;
        variable.value = -1 * Number(right.value);
        return variable;

      case OperationType.NOT:
        if(right.variableType != VariableType.BOOLEAN){
          throw new Error(` semántico. Solo se puede obtener la negación de tipos BOOLEAN. Linea: ${this.line} Columna: ${this.column}`);
        }

        variable.variableType = VariableType.BOOLEAN;
        variable.value = !Boolean(right.value);

        return variable;

    }


    return undefined;
  }

}
