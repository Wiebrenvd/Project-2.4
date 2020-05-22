import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoekfunctieComponent } from './zoekfunctie.component';

describe('ZoekfunctieComponent', () => {
  let component: ZoekfunctieComponent;
  let fixture: ComponentFixture<ZoekfunctieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoekfunctieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoekfunctieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
