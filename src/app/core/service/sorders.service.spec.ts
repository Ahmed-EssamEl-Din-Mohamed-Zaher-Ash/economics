import { TestBed } from '@angular/core/testing';

import { SordersService } from './sorders.service';

describe('SordersService', () => {
  let service: SordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
