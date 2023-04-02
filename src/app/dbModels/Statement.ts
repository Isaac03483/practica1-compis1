import {Property} from "./Property";

export enum StatementType {
  TABLE, ROW
}

export class Statement{
  statementType: StatementType;
  value: any;


  constructor(statementType: StatementType, value: any) {
    this.statementType = statementType;
    this.value = value;
  }
}
