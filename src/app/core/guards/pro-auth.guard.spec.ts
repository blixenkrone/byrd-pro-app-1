import { TestBed, async, inject } from '@angular/core/testing';

import { ProAuthGuard } from './pro-auth.guard';

describe('ProAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProAuthGuard]
    });
  });

  it('should ...', inject([ProAuthGuard], (guard: ProAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
