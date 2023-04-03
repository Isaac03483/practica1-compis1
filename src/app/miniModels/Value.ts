import {Instruction} from "./Instruction";
import {SymbolTable} from "./SymbolTable";
import {Variable} from "./Variable";

export class Value extends Instruction{

  value: any;
  valueType: ValueType;
  constructor(line: number, column: number, value: any, valueType: ValueType) {
    super(line, column);
    this.value = value;
    this.valueType = valueType;
  }

  execute(table: SymbolTable): Variable | undefined {
    let newVar = new Variable();
    switch (this.valueType){
      case ValueType.INT:
        newVar.value = Number(this.value);
        newVar.type = ValueType.INT;
        return newVar;

      case ValueType.DECIMAL:
        newVar.value = Number(this.value);
        newVar.type = ValueType.DECIMAL;
        return newVar;
      case ValueType.TEXT_VALUE:
        newVar.value = String(this.value);
        newVar.type = ValueType.TEXT_VALUE;
        return newVar;
      case ValueType.BOOLEAN:
        newVar.value = Boolean(this.value);
        newVar.type = ValueType.BOOLEAN;
        return newVar;
      case ValueType.ID:
        const varInTable = table.getById(String(this.value));
        if(!varInTable){
          console.log("No se ha encontrado la variable en la tabla de simbolos");
          return;
        }

        Object.assign(newVar, varInTable);
        return newVar;

    }

    return undefined;
  }

}

export enum  ValueType{
  INT, DECIMAL, ID, BOOLEAN,TEXT_VALUE
}
