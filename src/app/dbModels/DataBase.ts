import {Table} from "./Table";

export class DataBase{
  private static database: DataBase|null = null;
  private tables: Table[];

  private constructor() {
    this.tables = [];
  }

  public static getInstance(): DataBase{
    if(this.database == null ){
      this.database = new DataBase();
    }

    return this.database;
  }

  public clear(){
    this.tables = [];
  }

  public addTable(table:Table){
    const isInDB = this.tables.find(t => t.name = table.name);
    if(isInDB){
      throw new Error("Tabla con nombre ya existente.");
    }

    for(let i = 0; i < table.properties.length-1; i++){
      for(let j = i+1; j < table.properties.length; j++){
        if(table.properties[i].propertyName == table.properties[j].propertyName){
          throw new Error("Una tabla no puede tener propiedades con el mismo nombre.");
        }
      }
    }

    this.tables.push(table);
  }

  public getTables(): Table[]{
    return this.tables;
  }

  public getTableByName(name: string):Table | undefined{
    return this.tables.find(table => table.name == name);
  }


}
