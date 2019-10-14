import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsloBikeMapComponent } from './oslo-bike-map.component';

describe('OsloBikeMapComponent', () => {
  let component: OsloBikeMapComponent;
  let fixture: ComponentFixture<OsloBikeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsloBikeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsloBikeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
