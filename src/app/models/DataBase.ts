import {Table} from "./Table";

export class DataBase{
  tables: Table[] = [];

  public addTable(table: Table){
    this.tables.push(table);
  }

}
