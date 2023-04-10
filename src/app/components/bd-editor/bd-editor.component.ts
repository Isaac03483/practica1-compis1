import {Component, OnInit} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {DbParser} from "../../parser/dbParser";
import {Table} from "../../dbModels/Table";
import {DataBase} from "../../dbModels/DataBase";
import {VariableType} from "../../miniModels/Variable";

@Component({
  selector: 'app-bd-editor',
  templateUrl: './bd-editor.component.html',
  styleUrls: ['./bd-editor.component.css']
})


export class BdEditorComponent implements OnInit{
  theme = 'vs-dark';

  tables: Table[] = [];
  messages: string[] = [];

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

    let dbParser = new DbParser(this.codeModel.value);
    dbParser.parse();
    this.messages = dbParser.getMessages();
  }

  ngOnInit(): void {

  }

  protected readonly DataBase = DataBase;
  protected readonly VariableType = VariableType;
}
