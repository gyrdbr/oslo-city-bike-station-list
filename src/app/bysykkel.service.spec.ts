import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BysykkelService } from './bysykkel.service';

describe('BysykkelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: BysykkelService = TestBed.get(BysykkelService);
    expect(service).toBeTruthy();
  });
});
