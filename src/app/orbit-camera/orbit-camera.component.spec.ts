import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitCameraComponent } from './orbit-camera.component';

describe('OrbitCameraComponent', () => {
  let component: OrbitCameraComponent;
  let fixture: ComponentFixture<OrbitCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrbitCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrbitCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
