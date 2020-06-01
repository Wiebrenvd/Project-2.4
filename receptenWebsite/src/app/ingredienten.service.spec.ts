import { TestBed } from '@angular/core/testing';

import { IngredientenService } from './ingredienten.service';

describe('IngredientenService', () => {
  let service: IngredientenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
