export class Variable{
  id?: string;
  variableType!: VariableType;
  value?: any;
}

export enum VariableType{
  INT, DECIMAL, TEXT, BOOLEAN
}
