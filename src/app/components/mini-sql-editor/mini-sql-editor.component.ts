import {Component, OnInit} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";


declare var miniSQL: any;

@Component({
  selector: 'app-mini-sql-editor',
  templateUrl: './mini-sql-editor.component.html',
  styleUrls: ['./mini-sql-editor.component.css']
})
export class MiniSqlEditorComponent implements OnInit{

  theme = 'vs-white';

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
      const value = miniSQL.parse(this.codeModel.value);
      console.log("Imprimiendo algo luego de parsear");
    } catch (error){
      console.error(error);
      console.log("Error al compilar la información.")
    }
  }

  ngOnInit(): void {
  }
}
