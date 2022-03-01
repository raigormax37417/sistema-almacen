import { TestBed } from '@angular/core/testing';

import { GetDataFirebaseService } from './get-data-firebase.service';

describe('GetDataFirebaseService', () => {
  let service: GetDataFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
