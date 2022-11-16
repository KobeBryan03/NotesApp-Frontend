import { TestBed } from '@angular/core/testing';

import { NotasServiceService } from './notas-service.service';

describe('NotasServiceService', () => {
  let service: NotasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
