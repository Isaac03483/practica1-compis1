import { Component } from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";

@Component({
  selector: 'app-bd-editor',
  templateUrl: './bd-editor.component.html',
  styleUrls: ['./bd-editor.component.css']
})
export class BdEditorComponent {

  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: 'editor de bd'
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };
}
