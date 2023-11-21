import { TestBed } from '@angular/core/testing';

import { DateDebugService } from './date-debug.service';

describe('DateDebugService', () => {
  let service: DateDebugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateDebugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
