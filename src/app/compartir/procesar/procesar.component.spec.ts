import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesarComponent } from './procesar.component';

describe('ProcesarComponent', () => {
  let component: ProcesarComponent;
  let fixture: ComponentFixture<ProcesarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
