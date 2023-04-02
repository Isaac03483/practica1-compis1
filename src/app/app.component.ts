import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-sql';
  dbEditor: boolean = false;
  miniSQLEditor: boolean = false;

  showBDEditor() {
    console.log("mostrando editor de base de datos.");
  }


  openDBEditor() {
      this.dbEditor = true;
      this.miniSQLEditor = false;
  }

  openMiniSQLEditor() {
    this.dbEditor = false;
    this.miniSQLEditor = true;


  }
}
