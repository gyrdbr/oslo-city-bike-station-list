import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BikesiteListComponent } from './bikesite-list.component';

describe('BikesiteListComponent', () => {
  let component: BikesiteListComponent;
  let fixture: ComponentFixture<BikesiteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ BikesiteListComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikesiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
