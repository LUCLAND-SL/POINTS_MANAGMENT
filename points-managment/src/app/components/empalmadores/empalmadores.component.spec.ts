import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpalmadoresComponent } from './empalmadores.component';

describe('EmpalmadoresComponent', () => {
  let component: EmpalmadoresComponent;
  let fixture: ComponentFixture<EmpalmadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpalmadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpalmadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
