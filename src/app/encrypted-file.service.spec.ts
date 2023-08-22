import { TestBed } from '@angular/core/testing';

import { EncryptedFileService } from './encrypted-file.service';

describe('EncryptedFileService', () => {
  let service: EncryptedFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptedFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
