import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoEmpComponent } from './historico-emp.component';

describe('HistoricoEmpComponent', () => {
  let component: HistoricoEmpComponent;
  let fixture: ComponentFixture<HistoricoEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
