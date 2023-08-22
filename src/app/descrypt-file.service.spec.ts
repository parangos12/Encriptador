import { TestBed } from '@angular/core/testing';

import { DescryptFileService } from './descrypt-file.service';

describe('DescryptFileService', () => {
  let service: DescryptFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescryptFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
