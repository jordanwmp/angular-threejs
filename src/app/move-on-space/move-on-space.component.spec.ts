import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveOnSpaceComponent } from './move-on-space.component';

describe('MoveOnSpaceComponent', () => {
  let component: MoveOnSpaceComponent;
  let fixture: ComponentFixture<MoveOnSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveOnSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveOnSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
