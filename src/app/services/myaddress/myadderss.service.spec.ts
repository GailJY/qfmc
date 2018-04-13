import { TestBed, inject } from '@angular/core/testing';

import { MyadderssService } from './myadderss.service';

describe('MyadderssService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyadderssService]
    });
  });

  it('should be created', inject([MyadderssService], (service: MyadderssService) => {
    expect(service).toBeTruthy();
  }));
});
