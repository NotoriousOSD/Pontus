import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterCardComponent } from './parameter-card.component';

describe('ParameterCardComponent', () => {
  let component: ParameterCardComponent;
  let fixture: ComponentFixture<ParameterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
