import {Property} from "./Property";
import {Row} from "./Row";

export class Table{
  name: string;
  properties: Property[];
  rows: Row[] = [];


  constructor(name: string, properties: Property[]) {
    this.name = name;
    this.properties = properties;
  }

  addRow(row: Row){
    this.rows.push(row);
  }

}
