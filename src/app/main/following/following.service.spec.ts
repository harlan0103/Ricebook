import { TestBed } from '@angular/core/testing';

import { FollowingService } from './following.service';
import { HttpClientModule } from '@angular/common/http';

describe('FollowingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: FollowingService = TestBed.get(FollowingService);
    expect(service).toBeTruthy();
  });
});
