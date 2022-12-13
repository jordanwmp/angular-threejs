import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveCameraComponent } from './move-camera.component';

describe('MoveCameraComponent', () => {
  let component: MoveCameraComponent;
  let fixture: ComponentFixture<MoveCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
