import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulaireReceptenComponent } from './populaire-recepten.component';

describe('PopulaireReceptenComponent', () => {
  let component: PopulaireReceptenComponent;
  let fixture: ComponentFixture<PopulaireReceptenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulaireReceptenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulaireReceptenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
