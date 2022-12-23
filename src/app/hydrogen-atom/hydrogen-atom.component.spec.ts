import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrogenAtomComponent } from './hydrogen-atom.component';

describe('HydrogenAtomComponent', () => {
  let component: HydrogenAtomComponent;
  let fixture: ComponentFixture<HydrogenAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydrogenAtomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HydrogenAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
