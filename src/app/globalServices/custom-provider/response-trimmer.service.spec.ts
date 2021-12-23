import { TestBed } from '@angular/core/testing';

import { ResponseTrimmerService } from './response-trimmer.service';

describe('ResponseTrimmerService', () => {
  let service: ResponseTrimmerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseTrimmerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
