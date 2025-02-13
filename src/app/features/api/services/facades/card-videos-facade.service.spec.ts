import { TestBed } from '@angular/core/testing';

import { CardVideosFacadeService } from './card-videos-facade.service';

describe('CardVideosFacadeService', () => {
  let service: CardVideosFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardVideosFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
