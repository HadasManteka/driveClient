import { TestBed } from '@angular/core/testing';

import { AuthenticatGuard } from './authenticat.guard';

describe('AuthenticatGuard', () => {
  let guard: AuthenticatGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticatGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
