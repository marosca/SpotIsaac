import { TestBed, inject } from '@angular/core/testing';

import { BorrarService } from './borrar.service';

describe('BorrarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BorrarService]
    });
  });

  it('should be created', inject([BorrarService], (service: BorrarService) => {
    expect(service).toBeTruthy();
  }));
});
