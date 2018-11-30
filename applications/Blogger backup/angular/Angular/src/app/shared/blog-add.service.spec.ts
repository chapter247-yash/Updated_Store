import { TestBed } from '@angular/core/testing';

import { BlogAddService } from './blog-add.service';

describe('BlogAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogAddService = TestBed.get(BlogAddService);
    expect(service).toBeTruthy();
  });
});
