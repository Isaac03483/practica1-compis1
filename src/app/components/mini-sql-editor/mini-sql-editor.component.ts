import { Component } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";

@Component({
  selector: 'app-mini-sql-editor',
  templateUrl: './mini-sql-editor.component.html',
  styleUrls: ['./mini-sql-editor.component.css']
})
export class MiniSqlEditorComponent {

  theme = 'hc-black';

  codeModel: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: 'editor de miniSQL'
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

}
