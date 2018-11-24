import { TestBed } from '@angular/core/testing';
import { userProfile } from '../user_profile';
import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  /*
  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
  */
});
