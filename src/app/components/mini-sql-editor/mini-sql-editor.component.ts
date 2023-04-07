import {Component, OnInit} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {MiniSQLParser} from "../../parser/miniSQLParser";
import {SymbolTable} from "../../miniModels/SymbolTable";
import {VariableType} from "../../miniModels/Variable";
import {MiniError} from "../../miniModels/MiniError";

@Component({
  selector: 'app-mini-sql-editor',
  templateUrl: './mini-sql-editor.component.html',
  styleUrls: ['./mini-sql-editor.component.css']
})
export class MiniSqlEditorComponent implements OnInit{

  theme = 'vs-white';
  symbolTable?: SymbolTable;

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
      console.log("Imprimiendo algo luego de parsear");
    } catch (error){
      console.error(error);
      console.log("Error al compilar la información.")
    }
  }

  ngOnInit(): void {
  }

  protected readonly VariableType = VariableType;
  protected readonly MiniError = MiniError;
}
