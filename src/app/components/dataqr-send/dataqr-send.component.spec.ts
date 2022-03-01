import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataqrSendComponent } from './dataqr-send.component';

describe('DataqrSendComponent', () => {
  let component: DataqrSendComponent;
  let fixture: ComponentFixture<DataqrSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataqrSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataqrSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
