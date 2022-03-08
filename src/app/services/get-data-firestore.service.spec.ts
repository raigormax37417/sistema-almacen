import { TestBed } from '@angular/core/testing';

import { GetDataFirestoreService } from './get-data-firestore.service';

describe('GetDataFirestoreService', () => {
  let service: GetDataFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
