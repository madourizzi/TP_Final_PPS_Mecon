import { TestBed } from '@angular/core/testing';

import { ServicioGeneralService } from './servicio-general.service';

describe('ServicioGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioGeneralService = TestBed.get(ServicioGeneralService);
    expect(service).toBeTruthy();
  });
});
