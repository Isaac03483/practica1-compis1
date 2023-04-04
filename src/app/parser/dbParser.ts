import {Table} from "../dbModels/Table";
import {Property, PropertyType} from "../dbModels/Property";
import {Attribute} from "../dbModels/Attribute";
import {DataBase} from "../dbModels/DataBase";
import {Row} from "../dbModels/Row";

declare var dbParser: any;

export class DbParser {

  private source: string;

  constructor(source: string) {
    DataBase.getInstance().clear();
    this.source = source;
    dbParser.yy.Table = Table;
    dbParser.yy.Row = Row;
    dbParser.yy.dataBase = DataBase.getInstance();
    dbParser.yy.Property = Property;
    dbParser.yy.PropertyType = PropertyType;
    dbParser.yy.Attribute = Attribute;

  }

  parse(){
    try {
      dbParser.parse(this.source);
    }catch (error){
      console.log(error);
      console.log("Error al intentar parsear desde DbParser");
    }
  }

}
