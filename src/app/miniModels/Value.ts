import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {Variable, VariableType} from "./Variable";

export class Value extends Instruction{

  valueType: ValueType;
  value: any;


  constructor(line: number, column: number, valueType: ValueType, value: any) {
    super(line, column);
    this.valueType = valueType;
    this.value = value;
  }

  execute(symbolTable: SymbolTable): Variable | undefined {
    let variable = new Variable();

    switch (this.valueType){
      case ValueType.INTEGER:
        variable.value = Number(this.value);
        variable.variableType = VariableType.INT;
        return variable;
      case ValueType.DOUBLE:
        variable.value = Number(this.value);
        variable.variableType = VariableType.DECIMAL;
        return variable;
      case ValueType.BOOLEAN:
        variable.value = Boolean(this.value);
        variable.variableType = VariableType.BOOLEAN;
        return variable;
      case ValueType.TEXT_VALUE:
        variable.value = String(this.value);
        variable.variableType = VariableType.TEXT_VALUE;
        return variable;
      case ValueType.ID:
        const varInTable = symbolTable.findById(String(this.value));
        if(!varInTable){
          throw new Error("No se ha encontrado la variable en la tabla de simbolos.");
        }

        Object.assign(variable, varInTable);
        return variable;
    }

    return undefined;

  }

}

export enum ValueType{
  INTEGER, DOUBLE, BOOLEAN, TEXT_VALUE, ID
}
