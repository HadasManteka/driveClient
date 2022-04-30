import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFileToUploadComponent } from './single-file-to-upload.component';

describe('SingleFileToUploadComponent', () => {
  let component: SingleFileToUploadComponent;
  let fixture: ComponentFixture<SingleFileToUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleFileToUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFileToUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
