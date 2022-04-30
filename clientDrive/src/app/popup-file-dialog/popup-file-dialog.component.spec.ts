import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFileDialogComponent } from './popup-file-dialog.component';

describe('PopupFileDialogComponent', () => {
  let component: PopupFileDialogComponent;
  let fixture: ComponentFixture<PopupFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupFileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
