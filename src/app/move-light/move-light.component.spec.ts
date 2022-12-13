import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveLightComponent } from './move-light.component';

describe('MoveLightComponent', () => {
  let component: MoveLightComponent;
  let fixture: ComponentFixture<MoveLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
