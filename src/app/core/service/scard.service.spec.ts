import { TestBed } from '@angular/core/testing';

import { ScardService } from './scard.service';

describe('ScardService', () => {
  let service: ScardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
