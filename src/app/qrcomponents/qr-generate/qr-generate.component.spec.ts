import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrGenerateComponent } from './qr-generate.component';

describe('QrGenerateComponent', () => {
  let component: QrGenerateComponent;
  let fixture: ComponentFixture<QrGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
