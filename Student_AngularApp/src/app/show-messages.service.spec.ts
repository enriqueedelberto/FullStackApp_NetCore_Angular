import { TestBed } from '@angular/core/testing';

import { ShowMessagesService } from './show-messages.service';

describe('ShowMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowMessagesService = TestBed.get(ShowMessagesService);
    expect(service).toBeTruthy();
  });
});
