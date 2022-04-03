import { TestBed } from '@angular/core/testing';

import { CompleteSignUpGuard } from './complete-sign-up.guard';

describe('CompleteSignUpGuard', () => {
  let guard: CompleteSignUpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompleteSignUpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
