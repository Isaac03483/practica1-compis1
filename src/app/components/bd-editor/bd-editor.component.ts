import {Component, OnInit} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {DbParser} from "../../parser/dbParser";
import {Statement} from "../../dbModels/Statement";
import {Table} from "../../dbModels/Table";

@Component({
  selector: 'app-bd-editor',
  templateUrl: './bd-editor.component.html',
  styleUrls: ['./bd-editor.component.css']
})


export class BdEditorComponent implements OnInit{
  theme = 'vs-dark';

  tables: Table[] = [];

  codeModel: CodeModel = {
    language: 'SQL',
    uri: 'main.json',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  public onClick(){

    console.log("Entrando a click")
    let dbParser = new DbParser(this.codeModel.value);
    console.log("Creando nuevo Parser")
    dbParser.parse();
    const statements = dbParser.getStatements();
    if(!statements){
      console.log("Las instrucciones no han sido declaradas.");
      return;
    }
    statements.forEach((i: Statement) => {
      console.log(i);
    })
    console.log("Imprimiendo algo luego de parsear");
  }

  ngOnInit(): void {

  }
}
