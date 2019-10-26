import { TestBed } from '@angular/core/testing';

import { LectorQrService } from './lector-qr.service';

describe('LectorQrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LectorQrService = TestBed.get(LectorQrService);
    expect(service).toBeTruthy();
  });
});
