import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BereidingsweizeComponent } from './bereidingsweize.component';

describe('BereidingsweizeComponent', () => {
  let component: BereidingsweizeComponent;
  let fixture: ComponentFixture<BereidingsweizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BereidingsweizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BereidingsweizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
