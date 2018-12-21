import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageempComponent } from './manageemp.component';

describe('ManageempComponent', () => {
  let component: ManageempComponent;
  let fixture: ComponentFixture<ManageempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
