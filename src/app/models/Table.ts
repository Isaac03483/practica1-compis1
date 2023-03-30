import {Property} from "./Property";
import {Row} from "./Row";

export class Table{
  tableName: String;
  properties: Property[] = [];
  rows: Row[] = [];

  constructor(tableName: String, properties: Property[]) {
    this.tableName = tableName;
    this.properties = properties;
  }

  public addRow(){

  }
}
