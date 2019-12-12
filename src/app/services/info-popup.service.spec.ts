import { TestBed } from '@angular/core/testing';

import { InfoPopupService } from './info-popup.service';

describe('InfoPopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoPopupService = TestBed.get(InfoPopupService);
    expect(service).toBeTruthy();
  });
});
