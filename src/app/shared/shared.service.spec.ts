import { TestBed } from '@angular/core/testing';

import { StepperService } from './shared.service';

describe('SharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepperService = TestBed.get(StepperService);
    expect(service).toBeTruthy();
  });
});
