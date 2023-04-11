import {Table} from "../dbModels/Table";

export class Query{
  query: string;
  table: Table;


  constructor(query: string, table: Table) {
    this.query = query;
    this.table = table;
  }
}

export class QueriesSingleton{
  static singleton: QueriesSingleton|null;
  queries: Query[] = [];

  private constructor() {

  }

  static getInstance(){
    if(this.singleton == null){
      this.singleton = new QueriesSingleton();
    }

    return this.singleton;
  }

  addQuery(query: Query){
    this.queries.push(query);
  }

  clear(){
    this.queries = [];
  }

}
