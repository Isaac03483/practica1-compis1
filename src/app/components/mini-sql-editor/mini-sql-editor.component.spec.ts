import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniSqlEditorComponent } from './mini-sql-editor.component';

describe('MiniSqlEditorComponent', () => {
  let component: MiniSqlEditorComponent;
  let fixture: ComponentFixture<MiniSqlEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniSqlEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniSqlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
