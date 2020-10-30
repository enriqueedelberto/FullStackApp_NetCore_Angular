import { TestBed } from '@angular/core/testing';

import { StudentStateService } from './student-state.service';

describe('StudentStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentStateService = TestBed.get(StudentStateService);
    expect(service).toBeTruthy();
  });
});
