import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BereidingswijzeComponent } from './bereidingswijze.component';

describe('BereidingswijzeComponent', () => {
  let component: BereidingswijzeComponent;
  let fixture: ComponentFixture<BereidingswijzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BereidingswijzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BereidingswijzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
