import { TestBed } from '@angular/core/testing';

import { HeadlineService } from './headline.service';
import { HttpClientModule } from '@angular/common/http';

describe('HeadlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  /*
  it('should be created', () => {
    const service: HeadlineService = TestBed.get(HeadlineService);
    expect(service).toBeTruthy();
  });
  */
});
