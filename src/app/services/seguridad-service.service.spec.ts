import { TestBed } from '@angular/core/testing';

import { SeguridadServiceService } from './seguridad-service.service';

describe('SeguridadServiceService', () => {
  let service: SeguridadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguridadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
