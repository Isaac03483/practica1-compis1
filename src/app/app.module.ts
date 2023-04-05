import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BdEditorComponent } from './components/bd-editor/bd-editor.component';
import { CodeEditorModule} from "@ngstack/code-editor";
import { MiniSqlEditorComponent } from './components/mini-sql-editor/mini-sql-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BdEditorComponent,
    MiniSqlEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodeEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
