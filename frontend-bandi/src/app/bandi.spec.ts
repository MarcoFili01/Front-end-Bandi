import { TestBed } from '@angular/core/testing';

import { BandiService } from './bandi.service';

describe('BandiService', () => {
  let service: BandiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BandiService],
    });
    service = TestBed.inject(BandiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
