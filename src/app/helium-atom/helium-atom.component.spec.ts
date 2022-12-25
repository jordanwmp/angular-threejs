import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliumAtomComponent } from './helium-atom.component';

describe('HeliumAtomComponent', () => {
  let component: HeliumAtomComponent;
  let fixture: ComponentFixture<HeliumAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeliumAtomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeliumAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
