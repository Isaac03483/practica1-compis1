import {ValueType} from "./Value";

export class Variable{
  public id?: string;
  public type!: ValueType;
  public value?: any;
}
