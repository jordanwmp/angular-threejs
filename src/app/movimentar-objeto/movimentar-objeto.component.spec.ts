import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentarObjetoComponent } from './movimentar-objeto.component';

describe('MovimentarObjetoComponent', () => {
  let component: MovimentarObjetoComponent;
  let fixture: ComponentFixture<MovimentarObjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimentarObjetoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentarObjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
