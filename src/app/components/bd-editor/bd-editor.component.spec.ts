import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdEditorComponent } from './bd-editor.component';

describe('BdEditorComponent', () => {
  let component: BdEditorComponent;
  let fixture: ComponentFixture<BdEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
