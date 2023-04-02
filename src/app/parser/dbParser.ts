import {Table} from "../dbModels/Table";
import {Statement, StatementType} from "../dbModels/Statement";
import {Property, PropertyType} from "../dbModels/Property";
import {Attribute} from "../dbModels/Attribute";

declare var dbParser: any;

export class DbParser {

  private statements: Statement[] = [];
  private source: string;

  constructor(source: string) {
    this.source = source;
    dbParser.yy.Table = Table;
    dbParser.yy.Statement = Statement;
    dbParser.yy.StatementType = StatementType;
    dbParser.yy.Property = Property;
    dbParser.yy.PropertyType = PropertyType;
    dbParser.yy.Attribute = Attribute;

  }

  parse(){
    try {
      this.statements = dbParser.parse(this.source);
    }catch (error){
      console.log(error);
      console.log("Error al intentar parsear desde DbParser");
    }
  }

  getStatements(): Statement[] {
    return this.statements;
  }

}
