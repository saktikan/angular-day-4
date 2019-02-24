import { TestBed } from '@angular/core/testing';

import { AccoutService } from './accout.service';

describe('AccoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccoutService = TestBed.get(AccoutService);
    expect(service).toBeTruthy();
  });
});
