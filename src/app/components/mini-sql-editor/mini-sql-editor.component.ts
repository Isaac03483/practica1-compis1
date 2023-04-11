import {Component, OnInit} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {MiniSQLParser} from "../../parser/miniSQLParser";
import {SymbolTable} from "../../miniModels/SymbolTable";
import {MiniError} from "../../miniModels/MiniError";
import {VariableType} from "../../miniModels/Variable";
import * as d3 from 'd3';
import {QueriesSingleton} from "../../miniModels/QueryResult";

@Component({
  selector: 'app-mini-sql-editor',
  templateUrl: './mini-sql-editor.component.html',
  styleUrls: ['./mini-sql-editor.component.css']
})
export class MiniSqlEditorComponent implements OnInit{

  protected readonly MiniError = MiniError;
  protected readonly VariableType = VariableType;
  theme = 'vs-white';
  symbolTable?: SymbolTable;
  data: any;

  codeModel: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  onClick() {
    try{
      let miniSQLParser = new MiniSQLParser(this.codeModel.value);
      this.symbolTable = miniSQLParser.parse();
      this.data = miniSQLParser.data;
      console.log("AST");
      console.log(this.data);

    } catch (error){
      console.error(error);
      console.log("Error al compilar la información.")
    }
  }

  ngOnInit(): void {
  }


  protected readonly QueriesSingleton = QueriesSingleton;
}
