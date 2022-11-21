import { TestBed } from '@angular/core/testing';

import { SesionValidacionGuard } from './sesion-validacion.guard';

describe('SesionValidacionGuard', () => {
  let guard: SesionValidacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SesionValidacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
